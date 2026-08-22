const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tokenBlacklistModel = require("../models/blacklist.model");
const logger = require("../logger/logger");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * @name registerUserController
 * @description Register a new user
 * @access public
 */

async function registerUserController(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const existingUsername = await userModel.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info("New user registered");

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @name loginUserController
 * @description Login user
 * @access public
 */

async function loginUserController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      logger.warn("Failed login attempt");

      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn("Failed login attempt");

      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info("User logged in successfully");

    return res.status(200).json({
      message: "User loggedIn Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @name logoutUserController
 * @description Logout user and blacklist token
 * @access public
 */

async function logoutUserController(req, res, next) {
  try {
    const token = req.cookies.token;

    if (token) {
      const hashedToken = hashToken(token);

      await tokenBlacklistModel.create({
        token: hashedToken,
      });
    }

    res.clearCookie("token");

    logger.info("User logged out");

    return res.status(200).json({
      message: "User logout Successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @name getMeController
 * @description Get current logged-in user
 * @access private
 */

async function getMeController(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    logger.info("User profile fetched");

    return res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};

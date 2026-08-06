const express = require("express");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");
const cors = require("cors");

const app = express();
const logger = require("./logger/logger");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  pinoHttp({
    logger,
  }),
);

// required routes
const authRouter = require("./routes/auth.routes");

// all routes usage
app.use("/api/auth", authRouter);

module.exports = app;

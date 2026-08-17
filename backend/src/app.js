const express = require("express");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");
const cors = require("cors");

const app = express();
const logger = require("./logger/logger");

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
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
const noteRouter = require("./routes/note.routes");

// all routes usage
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

module.exports = app;

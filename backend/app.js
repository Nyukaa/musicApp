require("dotenv").config();
const express = require("express");
const cors = require("cors");

const songsRouter = require("./controllers/songs");
const exercisesRouter = require("./controllers/exercises");
const usersRouter = require("./controllers/users");
const progressRouter = require("./controllers/progress");
const loginRouter = require("./controllers/login");
const registerRouter = require("./controllers/register");

const userExtractor = require("./middleware/userExtractor");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.send("ok");
});

// public routes (без токена)
app.use("/api/songs", songsRouter);
app.use("/api/exercises", exercisesRouter);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

// protected routes (с токеном)
app.use("/api/progress", userExtractor, progressRouter);

// 👉 SPA fallback (ВАЖНО!)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
module.exports = app;

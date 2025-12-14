// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/health", (req, res) => {
//   res.send("ok");
// });

// module.exports = app;
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const songsRouter = require("./controllers/songs");
const exercisesRouter = require("./controllers/exercises");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.send("ok");
});

// routes
app.use("/api/songs", songsRouter);
app.use("/api/exercises", exercisesRouter);

module.exports = app;

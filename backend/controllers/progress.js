const progressRouter = require("express").Router();
const Progress = require("../models/progress");

progressRouter.get("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const progress = await Progress.findOne({ user: req.user.id });

  res.json(
    progress || {
      completedSongs: [],
      completedExercises: [],
    }
  );
});

progressRouter.post("/song", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const { file } = req.body;

  let progress = await Progress.findOne({ user: req.user.id });

  if (!progress) {
    progress = new Progress({
      user: req.user.id,
      completedSongs: [],
      completedExercises: [],
    });
  }

  if (!progress.completedSongs.includes(file)) {
    progress.completedSongs.push(file);
  }

  await progress.save();
  res.json(progress);
});

progressRouter.post("/exercise", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const { file } = req.body;

  let progress = await Progress.findOne({ user: req.user.id });

  if (!progress) {
    progress = new Progress({
      user: req.user.id,
      completedSongs: [],
      completedExercises: [],
    });
  }

  if (!progress.completedExercises.includes(file)) {
    progress.completedExercises.push(file);
  }

  await progress.save();
  res.json(progress);
});

module.exports = progressRouter;

const progressRouter = require("express").Router();
const Progress = require("../models/progress");
const userExtractor = require("../middleware/userExtractor");

// GET progress
progressRouter.get("/", userExtractor, async (req, res) => {
  const user = req.user;
  const userId = req.user.id; // <- важно
  let progress = await Progress.findOne({ user: userId });

  if (!progress) {
    progress = new Progress({
      user: userId,
      completedSongs: [],
      completedExercises: [],
    });
    await progress.save();
  }

  res.json(progress);
});

// POST completed song
progressRouter.post("/song", userExtractor, async (req, res) => {
  const user = req.user;
  const { file } = req.body;
  const userId = req.user.id; // <- важно
  let progress = await Progress.findOne({ user: userId });

  if (!progress) {
    progress = new Progress({
      user: userId,
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

// POST completed exercise
progressRouter.post("/exercise", userExtractor, async (req, res) => {
  const user = req.user;
  const { file } = req.body;
  const userId = req.user.id; // <- важно
  let progress = await Progress.findOne({ user: userId });

  if (!progress) {
    progress = new Progress({
      user: userId,
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

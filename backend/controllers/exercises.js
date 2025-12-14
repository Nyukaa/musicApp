const express = require("express");
const fs = require("fs");
const path = require("path");

const exercisesRouter = express.Router();

exercisesRouter.get("/", (req, res) => {
  const dir = path.join(__dirname, "..", "data", "exercises");

  const files = fs.readdirSync(dir);

  const exercises = files.map((file, index) => {
    const json = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));

    return {
      id: index + 1,
      title: json.title,
      file,
    };
  });

  res.json(exercises);
});

exercisesRouter.get("/:file", (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "exercises",
      req.params.file
    );
    const json = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(json));
  } catch {
    res.status(500).json({ error: "Failed to load exercise" });
  }
});

module.exports = exercisesRouter;

const express = require("express");
const fs = require("fs");
const path = require("path");

const songsRouter = express.Router();

const songsDir = path.join(__dirname, "..", "data", "songs");

// список песен
songsRouter.get("/", (req, res) => {
  const files = fs.readdirSync(songsDir);

  const songs = files
    .filter((f) => f.endsWith(".json"))
    .map((file, index) => {
      const json = JSON.parse(
        fs.readFileSync(path.join(songsDir, file), "utf-8")
      );

      return {
        id: index + 1,
        title: json.title,
        file,
      };
    });

  res.json(songs);
});

// одна песня
songsRouter.get("/:file", (req, res) => {
  try {
    const filePath = path.join(songsDir, req.params.file);
    const json = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(json));
  } catch (err) {
    res.status(500).json({ error: "Failed to load song" });
  }
});

module.exports = songsRouter;

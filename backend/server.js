const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/songs", (req, res) => {
  const dataDir = path.join(__dirname, "data");

  const files = fs.readdirSync(dataDir);

  // Фильтруем только json
  const songs = files
    .filter((f) => f.endsWith(".json"))
    .map((file, index) => {
      const fullPath = path.join(dataDir, file);
      const json = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

      return {
        id: index + 1,
        title: json.title,
        file: file,
      };
    });

  res.json(songs);
});

// only for one song
app.get("/api/song/:file", (req, res) => {
  const filename = req.params.file; // // song1.json
  const filePath = path.join(__dirname, "data", filename);

  try {
    const json = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(json);
    res.json(data);
  } catch (err) {
    console.error("Error reading song file:", err);
    res.status(500).json({ error: "Failed to load song" });
  }
});

app.listen(3001, () => console.log("BACKEND running on 3001"));

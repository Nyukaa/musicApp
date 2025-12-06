const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// ---------------------------
// SONGS LIST
// ---------------------------
app.get("/api/songs", (req, res) => {
  const dataDir = path.join(__dirname, "data");

  const files = fs.readdirSync(dataDir);

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

// ---------------------------
// ONE SONG
// ---------------------------
app.get("/api/song/:file", (req, res) => {
  const filename = req.params.file;
  const filePath = path.join(__dirname, "data", filename);

  try {
    const json = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(json));
  } catch (err) {
    res.status(500).json({ error: "Failed to load song" });
  }
});

// ---------------------------
// EXERCISES LIST
// ---------------------------
app.get("/api/exercises", (req, res) => {
  const exerciseDir = path.join(__dirname, "data", "exercises");

  const files = fs.readdirSync(exerciseDir);

  const exercises = files
    .filter((f) => f.endsWith(".json"))
    .map((file, index) => {
      const fullPath = path.join(exerciseDir, file);
      const json = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

      return {
        id: index + 1,
        title: json.title,
        file: file,
      };
    });

  res.json(exercises);
});

// ---------------------------
// ONE EXERCISE
// ---------------------------
app.get("/api/exercises/:file", (req, res) => {
  const filename = req.params.file;
  const filePath = path.join(__dirname, "data", "exercises", filename);

  try {
    const json = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(json));
  } catch (err) {
    res.status(500).json({ error: "Failed to load exercise" });
  }
});

app.listen(3001, () => console.log("BACKEND running on 3001"));
// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// app.get("/api/songs", (req, res) => {
//   const dataDir = path.join(__dirname, "data");

//   const files = fs.readdirSync(dataDir);

//   // Фильтруем только json
//   const songs = files
//     .filter((f) => f.endsWith(".json"))
//     .map((file, index) => {
//       const fullPath = path.join(dataDir, file);
//       const json = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

//       return {
//         id: index + 1,
//         title: json.title,
//         file: file,
//       };
//     });

//   res.json(songs);
// });

// // only for one song
// app.get("/api/song/:file", (req, res) => {
//   const filename = req.params.file; // // song1.json
//   const filePath = path.join(__dirname, "data", filename);

//   try {
//     const json = fs.readFileSync(filePath, "utf-8");
//     const data = JSON.parse(json);
//     res.json(data);
//   } catch (err) {
//     console.error("Error reading song file:", err);
//     res.status(500).json({ error: "Failed to load song" });
//   }
// });

// app.listen(3001, () => console.log("BACKEND running on 3001"));

# 🎹 Piano Trainer — Full-Stack Melody & Ear-Training App

A simple and interactive full-stack application designed to help beginners practice melodies, scales, and pitch accuracy.  
The app includes **microphone pitch detection**, **melody playback**, and **visual sheet-music rendering** — all running in the browser.

---

## ✅ Features

- 🎵 **Songs & Exercises Library**  
  Choose between beginner melodies and step-by-step exercises.

- 🎧 **Listen to the Melody**  
  Full playback using **Tone.js Sampler** with realistic piano sound.

- 🎤 **Pitch Detection Training**  
  The app listens through your microphone and checks whether you play/sing the correct note.

- 🎼 **Sheet Music Rendering**  
  Beautiful notation and bar highlighting powered by **VexFlow**.

- 🧠 **Bar-by-Bar Learning Mode**  
  The trainer waits until you play the correct note before moving to the next bar.

- ⚙️ **Backend API**  
  Exercises and songs served as clean JSON through Express.

- ⚡ **Fast Frontend**  
  Built with **React + Vite**, optimized for real-time audio and rendering.

---

## 📁 Project Structure

```
/backend → Express server + JSON data
/data
/songs → song1.json … song5.json
/exercises → step exercises, scales, intervals
/frontend → React + Vite app
```

---

## 🚀 Setup & Installation

### 🟦 Backend (Express API)

1. Open the backend folder:  
   `cd backend`
2. Install dependencies:  
   `npm install`
3. Start the server:  
   `npm start`

📌 Runs on **http://localhost:3001**

### API Endpoints

- `GET /api/songs` — list all songs
- `GET /api/songs/:file` — load one song
- `GET /api/exercises` — list all exercises
- `GET /api/exercises/:file` — load one exercise

📂 Data folders:

- Songs → `backend/data/songs/*.json`
- Exercises → `backend/data/exercises/*.json`

(_Note:_ There are old folders with typos like `exercies`, `exersicies`; real data is in `data/exercises`.)

---

### 🟩 Frontend (React + Vite)

1. Enter the frontend folder:  
   `cd frontend`
2. Install:  
   `npm install`
3. Run dev server:  
   `npm run dev`

Open the URL shown by Vite (usually `http://localhost:5173`).

⚠️ Make sure the backend is running on **port 3001**.

---

## 🎛 How It Works

### 🎧 Listen Mode

Plays the entire melody using Tone.js Sampler at the defined tempo.

### 🎤 Training Mode

- Displays the current bar
- Listens to your microphone (Pitchy)
- Moves to the next bar only when you play the correct note

### 🎼 Sheet Rendering

VexFlow draws all notes, beams, staves and highlights the active bar during training.

### 🎹 Audio Engine

Tone.js loads Salamander piano samples (CDN), providing realistic sound.

---

## 🧰 Technologies Used

- **Node.js + Express** — backend API
- **React + Vite** — frontend
- **Tone.js** — audio playback
- **Pitchy** — real-time pitch detection
- **VexFlow** — music notation
- **Web Audio API** — microphone access

---

## 🛠 Troubleshooting

- 🎙 **Microphone permission**  
  Allow permissions in the browser and refresh.

- 🔥 **CORS errors**  
  Backend must run at `localhost:3001`.

- 🎵 **No sound**  
  Piano samples require Internet connection (loaded from Tone.js CDN).

- 🎼 **Sheet not rendering**  
  Notes must follow correct format:
  - Pitch: `C4`, `F#5`
  - Duration: `w`, `h`, `q`, `8`
  - Bars must have numeric IDs.

---

## 📜 Scripts

### Backend

- `npm start`

### Frontend

- `npm run dev`
- `npm run build`
- `npm run preview`

---

## 👤 Author

Portfolio: **https://nyukaa.github.io/BCNew/Portfolio/index.html**  
GitHub: **https://github.com/Nyukaa**

---

# 🎹 Piano Trainer – React + Vite + Express

A **junior-friendly full-stack piano training application** built with **React + Vite** and **Express**.  
The project demonstrates **frontend–backend interaction**, real-time audio processing, authentication, and clean state management using **React Context**.

The app helps beginners practice melodies and exercises with **sheet music**, **melody playback**, and **microphone-based pitch detection**.

🌐 [Live demo](https://musicapp-1-983j.onrender.com/)

💻 [GitHub](https://github.com/Nyukaa/musicApp/)

---

## 👩‍💻 Author

**Nyukaa**  
[GitHub](https://github.com/Nyukaa) | [Portfolio](https://nyukaa.github.io/BCNew/Portfolio/index.html)

<!-----

 ## 🎯 Project Goals

This project was created to practice and demonstrate:

- Full-stack development (React + Express)
- REST API design and usage
- Authentication with JWT
- Audio playback and microphone input
- State management with Context + Reducer
- Clean and scalable project structure
- Real-time user interaction in the browser -->

---

## 🛠 Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tone.js-ff9800?style=for-the-badge" />
  <img src="https://img.shields.io/badge/VexFlow-4a148c?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Pitchy-0288d1?style=for-the-badge" />
</p>

---

## 🎛 How It Works

- **Listen Mode** — Plays the full melody using Tone.js Sampler.
- **Training Mode** — Highlights current bar in sheet music and waits for correct note (Pitchy microphone input).
- **Sheet Rendering** — VexFlow renders notes, beams, staves, and active bar highlighting.
- **Audio Engine** — Tone.js loads Salamander piano samples via CDN for realistic piano sound.

### ⭐ Progress & User Modes

- **Guest Mode**

  - No login required
  - All songs and exercises are playable
  - Earned ⭐ stars are stored in `localStorage`

- **Authenticated Mode**

  - Progress is saved in MongoDB and linked to the user
  - Stars are loaded from the backend after login
  - Progress is automatically updated on completion

- **Seamless Switching**
  - Logging out keeps the app fully usable
  - Authentication affects **only progress persistence**, not access to content

---

## 🧭 Architecture Overview

- **Frontend**: React + Vite
- **Backend**: Express API
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Audio**:
  - Tone.js — melody playback
  - Pitchy — real-time pitch detection
- **Sheet Music**: VexFlow

### State Management

- AuthContext: login/logout, JWT handling

- ProgressContext (useReducer): completed songs & exercises, guest vs auth users

---

## 🚀 Quick Start

### Backend (Express API)

```
cd backend
npm install
npm start
```

### API Endpoints

- `GET /api/songs` — list all songs
- `GET /api/songs/:file` — load one song
- `GET /api/exercises` — list all exercises
- `GET /api/exercises/:file` — load one exercise

---

### 🟩 Frontend (React + Vite)

```
cd frontend
npm install
npm run dev
```

### Frontend components:

- LoginForm.jsx / RegisterForm.jsx
- AuthContext.jsx (user session & JWT)
- ProgressContext.jsx (completed content state)
- SongList.jsx / ExerciseList.jsx
- SongTrainer.jsx (training & playback logic)

## 🔐 Authentication

- Login & Register forms in frontend
- JWT stored in `localStorage`
- Protected routes require valid token

Frontend:

- `LoginForm.jsx`
- `RegisterForm.jsx`
- `AuthContext.jsx`

Backend:

- `/api/login`
- `/api/register`
- JWT middleware for protected routes

---

## 📄 Data Model

Song / Exercise JSON includes:

- `title`, `tempo`, `timeSignature`
- `notes`: `{ pitch: "C4", duration: "q", bar: 1 }`

Supported durations: `w`, `h`, `q`, `8`  
Pitch format: `C4`, `F#4`, `C#5`

---

## 📚 What I Learned

- Full-stack React + Express workflow
- JWT authentication
- Managing global state with Context + Reducer
- Working with audio APIs in the browser
- Real-time user interaction
- Structuring scalable React projects

---

## 🧰 Technologies Used

- **Node.js + Express** — backend API
- **React + Vite** — frontend
- **Tone.js** — audio playback
- **Pitchy** — real-time pitch detection
- **VexFlow** — music notation
- **Web Audio API** — microphone access

---

## 👩‍💻 Author

**Nyukaa**  
[GitHub](https://github.com/Nyukaa) | [Portfolio](https://nyukaa.github.io/BCNew/Portfolio/index.html)

---

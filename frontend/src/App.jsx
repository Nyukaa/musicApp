import { useEffect, useState } from "react";
import axios from "axios";
import SongList from "./components/SongList";
import ExerciseList from "./components/ExerciseList";
import SongTrainer from "./components/SongTrainer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import logo from "./notes.png";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSongs, setShowSongs] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { user, login, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  // Загрузка песен и упражнений
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/songs`);
        setSongs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchExercises = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/exercises`);
        setExercises(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSongs();
    fetchExercises();
  }, [user]);

  const handleSelectSong = async (song) => {
    try {
      const res = await axios.get(`${API_URL}/api/songs/${song.file}`, {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });
      setSelectedSong({ ...res.data, file: song.file, id: song.id });
      setShowSongs(false);
      setShowExercises(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectExercise = async (ex) => {
    try {
      const res = await axios.get(`${API_URL}/api/exercises/${ex.file}`, {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });
      setSelectedSong({ ...res.data, file: ex.file, id: ex.id });
      setShowSongs(false);
      setShowExercises(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (userData) => {
    login(userData);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    logout(null);
  };

  if (selectedSong) {
    return (
      <SongTrainer
        song={selectedSong}
        onExit={() => setSelectedSong(null)}
        user={user}
      />
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <div>
        {user ? (
          <div className="authButtons">
            <span className="userLogged">{user.username} logged in</span>
            <button onClick={handleLogout} className="authBtn loginBtn">
              Logout
            </button>
          </div>
        ) : (
          <div className="authButtons">
            <button
              onClick={() => setShowLoginForm(true)}
              className="authBtn loginBtn"
            >
              Login{" "}
            </button>
            <button
              onClick={() => setShowRegisterForm(true)}
              className="authBtn registerBtn"
            >
              Register
            </button>
          </div>
        )}
        {showLoginForm && !user && (
          <LoginForm
            onLogin={handleLogin}
            onCancel={() => setShowLoginForm(false)}
          />
        )}
        {showRegisterForm && !user && (
          <RegisterForm
            onRegister={(data) => {
              console.log("Registered:", data);
              setShowRegisterForm(false);
            }}
            onCancel={() => setShowRegisterForm(false)}
          />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} className="appLogo" alt="logo" />
      </div>

      <h1 className="listTitle" onClick={() => setShowSongs(!showSongs)}>
        Choose a song
      </h1>
      {showSongs && <SongList songs={songs} onSelectSong={handleSelectSong} />}

      <h1
        className="listTitle"
        onClick={() => setShowExercises(!showExercises)}
      >
        Choose an exercise
      </h1>
      {showExercises && (
        <ExerciseList
          exercises={exercises}
          onSelectExercise={handleSelectExercise}
        />
      )}
    </div>
  );
}

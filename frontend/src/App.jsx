import { useEffect, useState } from "react";
import SongList from "./components/SongList";
import ExerciseList from "./components/ExerciseList";
import SongTrainer from "./components/SongTrainer";
import logo from "./notes.png";
export default function App() {
  const [songs, setSongs] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [selectedSong, setSelectedSong] = useState(null);

  // Показывать ли списки?
  const [showSongs, setShowSongs] = useState(false);
  const [showExercises, setShowExercises] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/songs")
      .then((res) => res.json())
      .then(setSongs);

    fetch("http://localhost:3001/api/exercises")
      .then((res) => res.json())
      .then(setExercises);
  }, []);

  async function handleSelectSong(song) {
    const res = await fetch(`http://localhost:3001/api/song/${song.file}`);
    const fullSong = await res.json();
    setSelectedSong(fullSong);
    setShowSongs(false);
    setShowExercises(false);
  }

  async function handleSelectExercise(ex) {
    const res = await fetch(`http://localhost:3001/api/exercises/${ex.file}`);
    const fullSong = await res.json();
    setSelectedSong(fullSong);
    setShowExercises(false);
    setShowSongs(false);
  }

  if (selectedSong)
    return (
      <SongTrainer song={selectedSong} onExit={() => setSelectedSong(null)} />
    );

  return (
    <div>
      {/* Заголовки-кнопки */}
      <div className="image">
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

import { useEffect, useState } from "react";
import SongList from "./components/SongList";
import SongTrainer from "./components/SongTrainer";
// import "./App.css";
import "./index.css";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loadingSong, setLoadingSong] = useState(false);

  // fetch songs list on mount
  useEffect(() => {
    fetch("http://localhost:3001/api/songs")
      .then((res) => res.json())
      .then(setSongs);
  }, []);

  // when user selects a song load its full data
  async function handleSelectSong(songMeta) {
    setLoadingSong(true);

    const res = await fetch(`http://localhost:3001/api/song/${songMeta.file}`);
    const fullSong = await res.json();

    setSelectedSong(fullSong);
    setLoadingSong(false);
  }

  if (loadingSong) {
    return <div>Loading song...</div>;
  }

  //
  if (selectedSong) {
    return (
      <SongTrainer song={selectedSong} onExit={() => setSelectedSong(null)} />
    );
  }

  return <SongList songs={songs} onSelectSong={handleSelectSong} />;
}

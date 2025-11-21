import { useEffect, useState } from "react";
import SongList from "./components/SongList";
import SongTrainer from "./components/SongTrainer";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/songs")
      .then((res) => res.json())
      .then(setSongs);
  }, []);

  // Если выбрана песня → запускаем тренажёр
  if (selectedSong) {
    return (
      <SongTrainer song={selectedSong} onExit={() => setSelectedSong(null)} />
    );
  }

  return <SongList songs={songs} onSelectSong={setSelectedSong} />;
}

// import { useEffect, useState } from "react";
// import Sheet from "./components/Sheet";
// import PitchDetector from "./components/PitchDetector";
// import { playNote } from "./components/PianoSound";

// export default function App() {
//   const [song, setSong] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:3001/api/song")
//       .then((res) => res.json())
//       .then(setSong);
//   }, []);

//   if (!song) return <div>Loading...</div>;
//   const notes = song.notes;
//   const isFinished = currentIndex >= song.notes.length;
//   //  Проверяем сразу — до чтения currentNote
//   if (isFinished) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           fontSize: "32px",
//           marginTop: "100px",
//           color: "#4CAF50",
//           fontWeight: "bold",
//         }}
//       >
//         🎉 You are awesome! You played everything perfectly! 🎉
//       </div>
//     );
//   }
//   const currentNote = song.notes[currentIndex];
//   const currentBar = currentNote.bar;

//   // Ноты только текущего бара
//   const barNotes = notes.filter((n) => n.bar === currentBar);

//   // Глобальный индекс первой ноты этого бара
//   const barStartIndex = notes.findIndex((n) => n.bar === currentBar);

//   // Локальный индекс внутри бара
//   const barIndex = currentIndex - barStartIndex;

//   function handleNoteDetected() {
//     if (isFinished) return;
//     // playing the note when detected
//     // playNote(song.notes[currentIndex].pitch);

//     // Мгновенный переход к следующей ноте
//     // Переходим к следующей ноте
//     setCurrentIndex((i) => i + 1);
//   }

//   return (
//     <div>
//       <h1>{song.title}</h1>

//       <Sheet
//         notes={barNotes} // ← ноты одного бара
//         currentIndex={barIndex} // ← индекс внутри бара
//       />

//       <h2>Сыграй: {song.notes[currentIndex].pitch}</h2>

//       <PitchDetector
//         onNoteDetected={handleNoteDetected}
//         currentNote={currentNote}
//       />
//     </div>
//   );
// }

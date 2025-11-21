import { useState } from "react";
import Sheet from ".//Sheet";
import PitchDetector from "./PitchDetector";

export default function SongTrainer({ song, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notes = song.notes;
  const isFinished = currentIndex >= notes.length;

  if (isFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>🎉 You are awesome! 🎉</h1>
        <button onClick={onExit}>Back to list</button>
      </div>
    );
  }

  const currentNote = notes[currentIndex];
  const currentBar = currentNote.bar;

  const barNotes = notes.filter((n) => n.bar === currentBar);
  const barStartIndex = notes.findIndex((n) => n.bar === currentBar);
  const barIndex = currentIndex - barStartIndex;

  function handleNoteDetected() {
    setCurrentIndex((i) => i + 1);
  }

  return (
    <div>
      <button onClick={onExit}>← Back</button>
      <h1>{song.title}</h1>

      <Sheet notes={barNotes} currentIndex={barIndex} />
      <h2>Play: {currentNote.pitch}</h2>

      <PitchDetector
        onNoteDetected={handleNoteDetected}
        currentNote={currentNote}
      />
    </div>
  );
}

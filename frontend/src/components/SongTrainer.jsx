import { useState } from "react";
import Sheet from "./Sheet";
import PitchDetector from "./PitchDetector";
import "../index.css";
import styles from "./SongTrainer.module.css";

export default function SongTrainer({ song, onExit }) {
  //for saifty check
  if (!song) {
    return <div>Loading song...</div>;
  }

  if (!song.notes || !Array.isArray(song.notes)) {
    console.log("Song has no notes:", song);
    return <div>Error: song has no notes.</div>;
  }

  // Index of the current note the user must play
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shortcut for notes array
  const notes = song.notes;

  // If user played all notes — finish screen
  const isFinished = currentIndex >= notes.length;
  if (isFinished) {
    return (
      <div className={styles.finishScreen}>
        <h1 className={styles.finishTitle}>🎉 You are awesome! 🎉</h1>
        <button className={styles.finishButton} onClick={onExit}>
          Back to list
        </button>
      </div>
    );
  }

  // Current note the user must play
  const currentNote = notes[currentIndex];

  // Its bar number
  const currentBar = currentNote.bar;

  // All notes inside the same bar
  const barNotes = notes.filter((n) => n.bar === currentBar);

  // Start index of this bar in the whole song
  const barStartIndex = notes.findIndex((n) => n.bar === currentBar);

  // Index of current note inside the bar
  const barIndex = currentIndex - barStartIndex;

  // Called when PitchDetector detects the correct pitch
  function handleNoteDetected() {
    setCurrentIndex((i) => i + 1);
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onExit}>
        ← Back
      </button>

      <h1 className={styles.title}>{song.title}</h1>

      <Sheet notes={barNotes} currentIndex={barIndex} />

      <h2 className={styles.playNote}>Play: {currentNote.pitch}</h2>

      <PitchDetector
        onNoteDetected={handleNoteDetected}
        currentNote={currentNote}
      />
    </div>
  );
}

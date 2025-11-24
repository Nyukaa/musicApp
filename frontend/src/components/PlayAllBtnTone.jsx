import { useState, useRef } from "react";
import * as Tone from "tone";
import styles from "./PlayAllBtnTone.module.css";

export default function PlayAllButtonTone({ notes, tempo = 120, onNote }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);

  const playAll = async () => {
    if (!notes || notes.length === 0) return;

    await Tone.start(); // for mobile compatibility
    Tone.Transport.stop();
    Tone.Transport.cancel();

    const synth =
      synthRef.current ||
      new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.2,
          release: 0.3,
        },
      }).toDestination();

    synthRef.current = synth;

    Tone.Transport.bpm.value = tempo;

    setIsPlaying(true);

    notes.forEach((n, i) => {
      const time = getNoteStartTime(notes, i);

      Tone.Transport.schedule((time) => {
        if (onNote) onNote(i);
        synth.triggerAttackRelease(n.pitch, durationToTone(n.duration), time);
      }, time);
    });

    // after last note, stop transport and reset state
    const totalTime = getNoteStartTime(notes, notes.length) + 1;

    Tone.Transport.scheduleOnce(() => {
      setIsPlaying(false);
      if (onNote) onNote(-1); // indicate finished
    }, totalTime);

    Tone.Transport.start();
  };

  //    converting → Tone.js note duration
  const durationToTone = (dur) => {
    switch (dur) {
      case "w":
        return "1n"; // целая
      case "h":
        return "2n"; // половинная
      case "q":
        return "4n"; // четвертная
      case "8":
        return "8n"; // восьмая
      default:
        return "4n";
    }
  };

  // counting start time of note at endIndex
  const getNoteStartTime = (notes, endIndex) => {
    let total = 0;
    for (let i = 0; i < endIndex; i++) {
      total += Tone.Time(durationToTone(notes[i].duration)).toSeconds();
    }
    return total;
  };

  return (
    <button
      className={styles.button}
      disabled={isPlaying}
      onClick={playAll}
      style={{
        backgroundColor: isPlaying ? "#999" : "#4a6bff",
        cursor: isPlaying ? "not-allowed" : "pointer",
      }}
    >
      {isPlaying ? "Playing..." : "Play all melody 🎵"}
    </button>
  );
}

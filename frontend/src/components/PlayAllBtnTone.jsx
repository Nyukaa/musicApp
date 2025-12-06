import { useState, useRef } from "react";
import * as Tone from "tone";
import styles from "./PlayAllBtnTone.module.css";

export default function PlayAllButtonTone({ notes, tempo = 120, onNote }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const samplerRef = useRef(null);

  const loadSampler = () => {
    if (!samplerRef.current) {
      samplerRef.current = new Tone.Sampler({
        urls: {
          A0: "A0.mp3",
          C1: "C1.mp3",
          "D#1": "Ds1.mp3",
          "F#1": "Fs1.mp3",
          A1: "A1.mp3",
          C2: "C2.mp3",
          "D#2": "Ds2.mp3",
          "F#2": "Fs2.mp3",
          A2: "A2.mp3",
          C3: "C3.mp3",
          "D#3": "Ds3.mp3",
          "F#3": "Fs3.mp3",
          A3: "A3.mp3",
          C4: "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          A4: "A4.mp3",
          C5: "C5.mp3",
          "D#5": "Ds5.mp3",
          "F#5": "Fs5.mp3",
          A5: "A5.mp3",
          C6: "C6.mp3",
          "D#6": "Ds6.mp3",
          "F#6": "Fs6.mp3",
          A6: "A6.mp3",
          C7: "C7.mp3",
          "D#7": "Ds7.mp3",
          "F#7": "Fs7.mp3",
          A7: "A7.mp3",
          C8: "C8.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).toDestination();
    }
    return samplerRef.current;
  };

  const playAll = async () => {
    if (!notes || notes.length === 0) return;

    await Tone.start();

    const piano = loadSampler();

    // ждать загрузки сэмплов
    await Tone.loaded();

    Tone.Transport.stop();
    Tone.Transport.cancel();

    Tone.Transport.bpm.value = tempo;

    setIsPlaying(true);

    notes.forEach((n, i) => {
      const time = getNoteStartTime(notes, i);

      Tone.Transport.schedule((startTime) => {
        if (onNote) onNote(i);

        const dur = durationToTone(n.duration);
        piano.triggerAttackRelease(n.pitch, dur, startTime);
      }, time);
    });

    const totalTime = getNoteStartTime(notes, notes.length) + 1;

    Tone.Transport.scheduleOnce(() => {
      setIsPlaying(false);
      if (onNote) onNote(-1);
    }, totalTime);

    Tone.Transport.start();
  };

  const durationToTone = (dur) => {
    switch (dur) {
      case "w":
        return "1n";
      case "h":
        return "2n";
      case "q":
        return "4n";
      case "8":
        return "8n";
      default:
        return "4n";
    }
  };

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
      {isPlaying ? "Playing..." : "👂 Listen melody"}
    </button>
  );
}

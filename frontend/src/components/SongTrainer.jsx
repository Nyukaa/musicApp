// src/SongTrainer.jsx
import { useState } from "react";
import Sheet from "./Sheet";
import PitchDetector from "./PitchDetector";
import PlayAllButtonTone from "./PlayAllBtnTone";
import styles from "./SongTrainer.module.css";

export default function SongTrainer({ song, onExit }) {
  // Safety: если song ещё не загружен
  if (!song) return <div>Loading song...</div>;
  if (!song.notes || !Array.isArray(song.notes))
    return <div>Error: song has no notes.</div>;

  const notes = song.notes;

  // currentIndex:
  // -1 = режим ожидания (ничего не подсвечено, можно нажать Play All или Start)
  // 0..N-1 = реальная тренировка (индекс по всей песне)
  // N и выше = завершено (показываем экран завершения)
  const [currentIndex, setCurrentIndex] = useState(-1);

  // === 1) Финальный экран (когда индекс >= длины нот) ===
  if (currentIndex >= notes.length) {
    return (
      <div className={styles.finishScreen}>
        <h1 className={styles.finishTitle}>🎉 You are awesome! 🎉</h1>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            className={styles.finishButton}
            onClick={() => setCurrentIndex(-1)}
          >
            Start again
          </button>

          <button
            className={styles.finishButton}
            onClick={onExit}
            style={{ background: "#999" }}
          >
            Back to list
          </button>
        </div>
      </div>
    );
  }

  // === 2) Экран ожидания (currentIndex === -1) ===
  if (currentIndex === -1) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={onExit}>
          ← Back
        </button>

        <h1 className={styles.title}>{song.title}</h1>

        <div className={styles.main}>
          {/* Play all — он будет вызывать onNote(i) во время проигрывания */}
          <PlayAllButtonTone
            notes={notes}
            tempo={song.tempo || 120}
            onNote={(i) => {
              // Когда player сообщает индекс ноты — устанавливаем его.
              // Когда player сообщает -1 — оставляем экран ожидания.
              setCurrentIndex(i);
            }}
          />

          {/* Start training — сразу в нулевую ноту */}
          <button
            className={styles.finishButton}
            onClick={() => setCurrentIndex(0)}
          >
            🎹 Start training
          </button>
        </div>

        {/* Показываем первый такт (или бар 1) для предварительного просмотра */}
        <div style={{ marginTop: 24 }}>
          {/* вычислим bar 1 notes, безопасно */}
          {notes.length > 0 && (
            <Sheet
              notes={notes.filter((n) => n.bar === (notes[0].bar || 1))}
              currentIndex={-1}
            />
          )}
        </div>

        <p className={styles.comment}>
          Press "Listen melody” or “Start training” to begin.
        </p>
      </div>
    );
  }

  // === 3) SAFE ZONE: currentIndex валиден (0 .. notes.length-1) ===
  const currentNote = notes[currentIndex];

  // Ещё дополнительная защита (теоретически currentNote должен существовать)
  if (!currentNote) {
    // если вдруг currentNote undefined — возвращаем экран ожидания
    // (это защитный замок, чтобы не рендерить ошибку)
    setTimeout(() => setCurrentIndex(-1), 0);
    return <div>Preparing...</div>;
  }

  // определяем текущий бар и ноты этого бара
  const currentBar = currentNote.bar || 1;
  const barNotes = notes.filter((n) => n.bar === currentBar);

  // вычисляем индекс первой ноты текущего бара в общей последовательности
  const barStartIndex = notes.findIndex((n) => n.bar === currentBar);
  const barIndex = currentIndex - barStartIndex; // индекс внутри бара (для Sheet)

  // обработчик — вызывается, когда PitchDetector подтвердил ноту
  function handleNoteDetected() {
    setCurrentIndex((i) => i + 1);
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onExit}>
        ← Back
      </button>

      <h1 className={styles.title}>{song.title}</h1>

      <div className={styles.main}>
        <PlayAllButtonTone
          notes={notes}
          tempo={song.tempo || 120}
          onNote={(i) => setCurrentIndex(i)}
        />
        <button
          className={styles.finishButton}
          onClick={() => setCurrentIndex(-1)}
          style={{ background: "#666666" }}
          title="Stop / Reset to start"
        >
          Reset
        </button>
      </div>
      <div className={styles.sheetNotes}>
        <Sheet notes={barNotes} currentIndex={barIndex} />
      </div>
      <h2 className={styles.playNote}>Play: {currentNote.pitch}</h2>

      <PitchDetector
        onNoteDetected={handleNoteDetected}
        currentNote={currentNote}
      />
    </div>
  );
}

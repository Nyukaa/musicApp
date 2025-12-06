import styles from "./SongList.module.css";

export default function ExerciseList({ exercises, onSelectExercise }) {
  return (
    <div>
      {/* <h1>Choose an exercise</h1> */}

      <div className={styles.songListCards}>
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className={styles.songCard}
            onClick={() => onSelectExercise(ex)}
          >
            {ex.title}
          </div>
        ))}
      </div>
    </div>
  );
}

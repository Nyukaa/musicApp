import styles from "./SongList.module.css";
import { useProgress } from "../context/ProgressContext";
export default function ExerciseList({ exercises, onSelectExercise }) {
  const { state } = useProgress();
  return (
    <div>
      {/* <h1>Choose an exercise</h1> */}

      <div className={styles.songListCards}>
        {exercises.map((ex) => {
          const done = state.completedSongs[ex.file];
          return (
            <div
              key={ex.id}
              className={styles.songCard}
              onClick={() => onSelectExercise(ex)}
            >
              {ex.title}
              {done && <span className={styles.star}>⭐</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

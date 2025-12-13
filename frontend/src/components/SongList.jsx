import styles from "./SongList.module.css";
import { useProgress } from "../context/ProgressContext";
export default function SongList({ songs, onSelectSong }) {
  const { state } = useProgress();
  return (
    <div className={styles.songListCards}>
      {songs.map((s) => {
        const done = state.completedSongs[s.file];

        return (
          <div
            key={s.id}
            className={styles.songCard}
            onClick={() => onSelectSong(s)}
          >
            {s.title}
            {done && <span className={styles.star}>⭐</span>}
          </div>
        );
      })}
    </div>
  );
}

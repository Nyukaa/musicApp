import styles from "./SongList.module.css";

export default function SongList({ songs, onSelectSong }) {
  return (
    <div>
      <div className={styles.songListCards}>
        {songs.map((s) => (
          <div
            key={s.id}
            className={styles.songCard}
            onClick={() => onSelectSong(s)}
          >
            {s.title}
          </div>
        ))}
      </div>
    </div>
  );
}

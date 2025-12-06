import styles from "./SongList.module.css";

export default function SongList({ songs, onSelectSong }) {
  return (
    <div>
      <h1>Choose a song</h1>

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

import styles from "./SongList.module.css";

export default function SongList({ songs, onSelectSong }) {
  return (
    <div>
      <h1>🎵 Choose a song</h1>

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

// export default function SongList({ songs, onSelectSong }) {
//   return (
//     <div>
//       <h1>Choose song for playing</h1>

//       {songs.map((song) => (
//         <div
//           key={song.id}
//           style={{
//             padding: "12px",
//             margin: "8px 0",
//             border: "1px solid #ccc",
//             cursor: "pointer",
//           }}
//           onClick={() => onSelectSong(song)}
//         >
//           {song.title}
//         </div>
//       ))}
//     </div>
//   );
// }

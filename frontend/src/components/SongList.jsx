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
// import { useState } from "react";
// import styles from "./SongList.module.css";
// import PlayAllButtonTone from "./PlayAllBtnTone";

// export default function SongList({ songs, onSelectSong }) {
//   // чтобы хранить, какая песня сейчас играет
//   const [playingSongId, setPlayingSongId] = useState(null);

//   return (
//     <div>
//       <h1>🎵 Choose a song</h1>

//       <div className={styles.songListCards}>
//         {songs.map((s) => (
//           <div key={s.id} className={styles.songCard}>
//             <div
//               style={{ cursor: "pointer", marginBottom: "8px" }}
//               onClick={() => onSelectSong(s)}
//             >
//               {s.title}
//             </div>

//             {/* Кнопка Play для этой песни */}
//             <PlayAllButtonTone
//               notes={s.notes}
//               tempo={s.tempo || 120}
//               onNote={() => {}}
//               onStart={() => setPlayingSongId(s.id)}
//               onStop={() => setPlayingSongId(null)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

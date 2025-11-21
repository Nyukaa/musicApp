export default function SongList({ songs, onSelectSong }) {
  return (
    <div>
      <h1>Songs</h1>

      {songs.map((song) => (
        <div
          key={song.id}
          style={{
            padding: "12px",
            margin: "8px 0",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => onSelectSong(song)}
        >
          {song.title}
        </div>
      ))}
    </div>
  );
}

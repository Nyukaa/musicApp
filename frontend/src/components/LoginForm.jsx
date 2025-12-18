import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLogin, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      const userData = res.data; // { token, username, name, id }
      onLogin(userData); // прокидываем в App.jsx
      setError(null);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">Login</h2>
        <form className="authForm" onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="authInput"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="authInput"
            />
          </div>
          <button className="authButton" type="submit">
            Login
          </button>
          <button
            className="authButton secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
        {error && <p className="authError">{error}</p>}
      </div>
    </div>
  );
}

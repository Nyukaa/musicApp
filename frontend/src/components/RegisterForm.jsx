import { useState } from "react";
import axios from "axios";

export default function RegisterForm({ onRegister, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        username,
        password,
      });
      setSuccess("User created successfully!");
      setError(null);
      setUsername("");
      setPassword("");
      if (onRegister) onRegister(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      setSuccess(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

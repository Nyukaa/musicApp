import { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

export default function RegisterForm({ onRegister, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/register`, {
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
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">Register</h2>
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
          <button type="submit" className="authButton">
            Register
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
        {success && <p className="authSuccess">{success}</p>}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Login gagal, periksa email atau password!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login Aman 🔐</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Masuk</button>
        {error && <p style={styles.error}>{error}</p>}
        <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" },
  title: { fontSize: "28px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", width: "300px" },
  input: { marginBottom: "10px", padding: "10px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" },
  error: { color: "red" }
};

export default Login;

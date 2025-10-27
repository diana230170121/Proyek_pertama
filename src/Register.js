import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
 // pastikan nama file sesuai
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Buat akun baru di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      // Pindah ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Pendaftaran gagal, coba email lain!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daftar Akun 🔑</h2>
      <form onSubmit={handleRegister} style={styles.form}>
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
        <button type="submit" style={styles.button}>Daftar</button>
        {error && <p style={styles.error}>{error}</p>}
        <p>Sudah punya akun? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" },
  title: { fontSize: "28px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", width: "300px" },
  input: { marginBottom: "10px", padding: "10px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "#2196F3", color: "white", border: "none", cursor: "pointer" },
  error: { color: "red" }
};

export default Register;

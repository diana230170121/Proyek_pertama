import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek user login
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Simpan data user ke Firestore (jika belum ada)
        setDoc(
          doc(db, "users", currentUser.uid),
          {
            email: currentUser.email,
            lastLogin: new Date().toLocaleString(),
          },
          { merge: true }
        );
      } else {
        navigate("/"); // balik ke login jika belum login
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard Aman 🔒</h2>
        {user ? (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Login Terakhir:</strong> {new Date().toLocaleString()}</p>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <p>Memuat data pengguna...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #4A90E2, #50E3C2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  logoutButton: {
    marginTop: "20px",
    backgroundColor: "#FF5252",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Dashboard;

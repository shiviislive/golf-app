import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchScores();
  }, []);

  // 🔹 Get scores
  const fetchScores = async () => {
    try {
      const res = await API.get("/scores");
      setScores(res.data.scores);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Add score
  const addScore = async () => {
    if (!newScore) return alert("Enter score");

    try {
      await API.post("/scores", {
        score: Number(newScore)
      });

      setNewScore("");
      fetchScores();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // 🔹 Subscribe
  const subscribe = async () => {
    try {
      await API.post("/payment/subscribe");
      alert("Subscribed successfully 🎉");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      {/* 🔹 Subscription */}
      <button onClick={subscribe}>Subscribe</button>

      <br /><br />

      {/* 🔹 Add Score */}
      <input
        placeholder="Enter score (1-45)"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />

      <button onClick={addScore}>Add Score</button>

      <h3>Your Scores</h3>

      {scores.length === 0 ? (
        <p>No scores yet</p>
      ) : (
        scores.map((s, i) => <p key={i}>{s}</p>)
      )}
    </div>
  );
}
import { useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [draw, setDraw] = useState(null);

  // 🔹 Run draw
  const runDraw = async () => {
    try {
      const res = await API.post("/draw");
      setDraw(res.data.draw);
    } catch (err) {
      alert("Only admin can run draw ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      <button onClick={runDraw}>Run Draw</button>

      <br /><br />

      {draw && (
        <div>
          <h3>Draw Numbers:</h3>
          <p>{draw.numbers.join(", ")}</p>

          <h3>Winners:</h3>

          {draw.winners.length === 0 ? (
            <p>No winners</p>
          ) : (
            draw.winners.map((w, i) => (
              <p key={i}>
                User ID: {w.user} → Matches: {w.matchCount}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}
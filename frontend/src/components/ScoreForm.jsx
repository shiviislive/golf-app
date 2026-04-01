import { useState } from "react";

export default function ScoreForm({ onAdd }) {
  const [score, setScore] = useState("");

  const handleSubmit = () => {
    if (!score) {
      alert("Enter score");
      return;
    }

    onAdd(Number(score));
    setScore("");
  };

  return (
    <div>
      <input
        placeholder="Enter score (1-45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Score</button>
    </div>
  );
}
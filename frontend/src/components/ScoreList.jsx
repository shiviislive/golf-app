export default function ScoreList({ scores }) {
  if (!scores || scores.length === 0) {
    return <p>No scores yet</p>;
  }

  return (
    <div>
      <h3>Your Scores</h3>

      {scores.map((s, i) => (
        <p key={i}>{s}</p>
      ))}
    </div>
  );
}
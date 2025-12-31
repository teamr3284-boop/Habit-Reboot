import "../stylings/Mood.css";

export default function MoodCheckin({ onSubmit }) {
  const moods = [
    { emoji: "😄", value: 5 },
    { emoji: "🙂", value: 4 },
    { emoji: "😐", value: 3 },
    { emoji: "😔", value: 2 },
    { emoji: "😞", value: 1 },
  ];

  return (
    <div className="mood-checkin">
      {moods.map(m => (
        <button
          key={m.value}
          className="mood-btn"
          onClick={() => onSubmit(m.value)}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}

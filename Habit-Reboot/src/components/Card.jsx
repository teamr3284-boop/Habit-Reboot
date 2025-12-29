import "../stylings/Card.css";

export default function HabitCard({ habit, onToggle, onDelete }) {
  return (
    <div className="habit-card">
      <div>
        <h3 className="title">{habit.name}</h3>
        <p className="streak"> Streak: {habit.streak}</p>
      </div>

      <div className="actions">
        <button className="toggle" 
        onClick={onToggle}>✔</button>
        <button className="delete" onClick={onDelete}>🗑</button>
      </div>
    </div>
  );
}

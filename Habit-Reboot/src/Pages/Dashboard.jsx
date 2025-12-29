import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcon";
import { getHabits, completeHabit } from "../firebase/firestore";
import "../stylings/Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (user) {
      getHabits(user.uid).then(setHabits);
    }
  }, [user]);

  return (<>
    <h1>Welcome Back 👋</h1>

<p>
  Small habits, done daily, lead to big changes.
</p>

<hr />

<h2>📊 Your Progress</h2>

<p>Total Habits: {habits.length}</p>

<p>
  Longest Streak:{" "}
  {habits.length > 0
    ? Math.max(...habits.map(h => h.streak))
    : 0} days
</p>

<hr />

<h2>🔥 Today’s Habits</h2>

    <div className="dashboard">
      <h1>Your Habits</h1>

      {habits.length === 0 && <p>No habits yet.</p>}

      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          <p><strong>{habit.name}</strong></p>
          <p>Streak: {habit.streak}</p>

          <button
            onClick={() => completeHabit(habit.id, habit.streak)}
          >
            Mark Done
          </button>
           <button className = "Land" onClick={()=>navigate("/")}>Landing Page</button>
        </div>
      ))}
    </div>
    </>
  );
  
}

   
    
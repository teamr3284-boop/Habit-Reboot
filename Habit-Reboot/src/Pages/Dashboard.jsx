import { useEffect, useState } from "react";
import { listenHabits,
  addHabit,
  toggleHabit,
  deleteHabit,
  logDailyData,} from "../firebase/firestore";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/Card";
import "../stylings/Dashboard.css";
export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const user = auth.currentUser;
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    return listenHabits(user.uid, snap => {
      setHabits(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const handleMoodSubmit = (mood) => {
    const completed = habits.filter(h => h.done).length;

    logDailyData(user.uid, today, {
      date: today,
      mood,
      habitsCompleted: completed,
      totalHabits: habits.length,
      completionRate:
        habits.length === 0 ? 0 : completed / habits.length,
    });
  };
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome Back 👋</h1>

      <MoodCheckin onSubmit={handleMoodSubmit} />

      <AddHabit
        onAdd={name =>
          addHabit(user.uid, {
            name,
            streak: 0,
            done: false,
          })
        }
      />

      <div className="habit-list">
        {habits.map(h => (
          <HabitCard
            key={h.id}
            habit={h}
            onToggle={() =>
              toggleHabit(
                user.uid,
                h.id,
                !h.done,
                h.done ? h.streak : h.streak + 1
              )
            }
            onDelete={() => deleteHabit(user.uid, h.id)}
          />
        ))}
      </div>
    </div>
  );
}

   
    
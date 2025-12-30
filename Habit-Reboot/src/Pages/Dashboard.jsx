import { useEffect, useState } from "react";
import {auth} from "../firebase/firebase";
import { listenHabits,
  addHabit,
  toggleHabit,
  deleteHabit,
  logDailyData,} from "../firebase/firestore";
import AddHabit from "../components/AddHabit";
import Card from "../components/Card";
import "../stylings/Dashboard.css";
import { onAuthStateChanged } from "firebase/auth";
export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });

    return unsub;
  }, []);

 useEffect(() => {
    if (!user) return;

    const completed = habits.filter(h => h.done).length;

    logDailyData(user.uid, today, {
      date: today,
      habitsCompleted: completed,
      totalHabits: habits.length,
      completionRate:
        habits.length === 0 ? 0 : completed / habits.length,
    });
  }, [habits, user, today]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dash">
      <h1 className="dashboard-title">Welcome Back </h1>

      <AddHabit
        onAdd={name =>
          addHabit(user.uid, {
            name,  streak: 0,
            done: false,
          })
        }
      />

      <div className="habit-list">
        {habits.map(h => (
          <Card key={h.id} habit={h}
            onToggle={() =>
              toggleHabit(
                user.uid, h.id, !h.done,
                h.done ? h.streak : h.streak + 1
              )}
            onDelete={() => deleteHabit(user.uid, h.id)} />   ))}
      </div>
    </div>
  );
}
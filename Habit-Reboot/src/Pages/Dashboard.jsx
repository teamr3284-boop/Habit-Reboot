import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  listenHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  logDailyData,
  fetchRecentLogs,
} from "../firebase/firestore";
import AddHabit from "../components/AddHabit";
import Card from "../components/Card";
import Mood from "../components/Mood";
import { todayStr, yesterdayStr } from "../utils/date";
import { getMoodAwareAdvice } from "../ai/gemini";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [aiText, setAiText] = useState("");
  const user = auth.currentUser;
  const today = todayStr();

  useEffect(() => {
    if (!user) return;

    return listenHabits(user.uid, (snap) => {
      setHabits(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user]);
  const handleToggle = (habit) => {
    let updates = { done: !habit.done };
    if (!habit.done) {
      if (habit.lastCompleted !== today) {
        updates.streak = habit.streak + 1;
        updates.lastCompleted = today;
      }
    }

    updateHabit(user.uid, habit.id, updates);
  };
  useEffect(() => {
    if (!user) return;

    habits.forEach(habit => {
      if (
        habit.lastCompleted &&
        habit.lastCompleted === yesterdayStr() &&
        !habit.done
      ) {
        updateHabit(user.uid, habit.id, {
          streak: 0,
          missedCount: (habit.missedCount || 0) + 1,
        });
      }
    });
  }, [habits, user]);

  const handleMoodSubmit = async (mood) => {
    const completed = habits.filter(h => h.done).length;

    await logDailyData(user.uid, today, {
      date: today,
      mood,
      habitsCompleted: completed,
      totalHabits: habits.length,
      completionRate:
        habits.length === 0 ? 0 : completed / habits.length,
    });
  };

  const askAI = async () => {
    const logs = await fetchRecentLogs(user.uid);
    const text = await getMoodAwareAdvice(logs, habits);
    setAiText(text);
  };

  if (!user) return <p>Please log in</p>;

  return (
    <div>
      <h1>Welcome Back</h1>

      <Mood onSubmit={handleMoodSubmit} />

      <AddHabit onAdd={(name) => addHabit(user.uid, name)} />

      {habits.map(h => (
        <Card
          key={h.id}
          habit={h}
          onToggle={() => handleToggle(h)}
          onDelete={() => deleteHabit(user.uid, h.id)}
        />
      ))}
<div className="Ai">
      <button onClick={askAI}>Ask AI Coach</button>

      {aiText && <p>🤖 {aiText}</p>}
    </div>
    </div>
  );
}

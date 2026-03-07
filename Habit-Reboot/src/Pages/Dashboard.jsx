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
import "../stylings/Dashboard.css";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [aiText, setAiText] = useState("");

  const user = auth.currentUser;
  const today = todayStr();
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenHabits(user.uid, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setHabits(data);
    });

    return unsubscribe;
  }, [user]);
  useEffect(() => {
    if (!user) return;

    habits.forEach((habit) => {
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

  /* -------------------- MOOD SUBMIT -------------------- */

  const handleMoodSubmit = async (mood) => {
    const completed = habits.filter((h) => h.done).length;

    await logDailyData(user.uid, today, {
      date: today,
      mood,
      habitsCompleted: completed,
      totalHabits: habits.length,
      completionRate: habits.length === 0 ? 0 : completed / habits.length,
    });
  };
  const askAI = async () => {
    const logs = await fetchRecentLogs(user.uid);
    const text = await getMoodAwareAdvice(logs, habits);

    setAiText(text);
  };
  const completed = habits.filter((h) => h.done).length;

  const percent = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;
  if (!user) return <p>Please log in</p>;
   return (
    <div className="dashboard-container">
      <h1>Welcome Back 👋</h1>

      {/* Mood Tracker */}
      <Mood onSubmit={handleMoodSubmit} />

      {/* Add Habit */}
      <AddHabit onAdd={(name) => addHabit(user.uid, name)} />

      {/* Progress Bar */}
      <div className="progress-section">
        <p>Daily Progress</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <span>{percent}% completed</span>
      </div>

      {/* Habit Cards */}
      <div className="habit-list">
        {habits.map((h) => (
          <Card
            key={h.id}
            habit={h}
            onToggle={() => handleToggle(h)}
            onDelete={() => deleteHabit(user.uid, h.id)}
          />
        ))}
      </div>
      <div className="Ai">
        <button onClick={askAI}>Ask AI Coach</button>

        {aiText && <p>🤖 {aiText}</p>}
      </div>
    </div>
  );
}
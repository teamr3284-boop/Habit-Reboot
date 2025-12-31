import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  listenHabits,
  addHabit,
  toggleHabit,
  deleteHabit,
  logDailyData,
  listenDailyLogs,
} from "../firebase/firestore";

import AddHabit from "../components/AddHabit";
import Card from "../components/Card";
import Mood from "../components/Mood";
import { getMoodAwareAdvice } from "../ai/gemini";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const [aiText, setAiText] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const user = auth.currentUser;
  const today = new Date().toISOString().slice(0, 10);

 
  useEffect(() => {
    if (!user) return;

    const unsubHabits = listenHabits(user.uid, (snap) => {
      setHabits(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubLogs = listenDailyLogs(user.uid, (snap) => {
      setLogs(snap.docs.map((d) => d.data()));
    });

    return () => {
      unsubHabits();
      unsubLogs();
    };
  }, [user]);

 
  const handleMoodSubmit = (mood) => {
    const completed = habits.filter((h) => h.done).length;

    logDailyData(user.uid, today, {
      date: today,
      mood,
      habitsCompleted: completed,
      totalHabits: habits.length,
      completionRate:
        habits.length === 0 ? 0 : completed / habits.length,
    });
  };

 
  const askAI = async () => {
    try {
      setLoadingAI(true);
      const text = await getMoodAwareAdvice(logs, habits);
      setAiText(text);
    } catch (err) {
      console.error(err);
      setAiText(
        "Take things one step at a time — consistency matters more than perfection."
      );
    } finally {
      setLoadingAI(false);
    }
  };

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h1>Welcome Back 👋</h1>

      <Mood onSubmit={handleMoodSubmit} />

      <AddHabit
        onAdd={(name) =>
          addHabit(user.uid, {
            name,
            streak: 0,
            done: false,
          })
        }
      />

      <div>
        {habits.map((h) => (
          <Card
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

      <button onClick={askAI} disabled={loadingAI}>
        {loadingAI ? "Thinking..." : "Ask AI Coach"}
      </button>

      {aiText && (
        <div>
          🤖 {aiText}
        </div>
      )}
    </div>
  );
}

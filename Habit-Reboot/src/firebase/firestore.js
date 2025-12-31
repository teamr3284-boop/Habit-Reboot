import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/* ===========================
   HABITS
=========================== */

/* 🔄 Listen to habits */
export function listenHabits(uid, callback) {
  const ref = collection(db, "users", uid, "habits");
  return onSnapshot(ref, callback);
}

/* ➕ Add habit */
export async function addHabit(uid, habit) {
  const ref = collection(db, "users", uid, "habits");
  await addDoc(ref, {
    ...habit,
    createdAt: serverTimestamp(),
  });
}

/* ✅ Toggle habit + update streak */
export async function toggleHabit(uid, habitId, done, streak) {
  const ref = doc(db, "users", uid, "habits", habitId);
  await updateDoc(ref, {
    done,
    streak,
    updatedAt: serverTimestamp(),
  });
}

/* ❌ Delete habit */
export async function deleteHabit(uid, habitId) {
  const ref = doc(db, "users", uid, "habits", habitId);
  await deleteDoc(ref);
}

/* ===========================
   DAILY MOOD + HABIT LOGS
=========================== */

/* 📝 Save daily mood + stats */
export async function logDailyData(uid, date, data) {
  const ref = doc(db, "users", uid, "dailyLogs", date);

  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/* 🔄 Listen to daily logs */
export function listenDailyLogs(uid, callback) {
  const q = query(
    collection(db, "users", uid, "dailyLogs"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, callback);
}

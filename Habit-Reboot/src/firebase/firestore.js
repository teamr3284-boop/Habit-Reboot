import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "./firebase";
export const listenHabits = (uid, callback) => {
  const habitsRef = collection(db, "users", uid, "habits");
  return onSnapshot(habitsRef, callback);
};

export const addHabit = (uid, name) => {
  return addDoc(collection(db, "users", uid, "habits"), {
    name,
    streak: 0,
    done: false,
    lastCompleted: null,
    missedCount: 0,
  });
};

export const updateHabit = (uid, habitId, data) => {
  const ref = doc(db, "users", uid, "habits", habitId);
  return updateDoc(ref, data);
};

export const deleteHabit = (uid, habitId) => {
  const ref = doc(db, "users", uid, "habits", habitId);
  return deleteDoc(ref);
};

export const fetchRecentLogs = async (uid) => {
  const logsRef = collection(db, "users", uid, "dailyLogs");

  const q = query(
    logsRef,
    orderBy("date", "desc"),
    limit(7)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

export const logDailyData = (uid, date, data) => {
  const ref = doc(db, "users", uid, "dailyLogs", date);
  return setDoc(ref, data, { merge: true });
};

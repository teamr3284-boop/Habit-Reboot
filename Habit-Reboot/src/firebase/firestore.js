import { db } from "./firebase";
import {
  query,
where,
getDocs,
Timestamp,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";



export const getHabits = async (uid) => {
  const q = query(collection(db, "habits"), where("uid", "==", uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

export const completeHabit = async (id, streak) => {
  await updateDoc(doc(db, "habits", id), {
    streak: streak + 1,
    lastCompleted: Timestamp.now()
  });
};

export const fetchHabits = async () => {
  const snapshot = await getDocs(collection(db, "habits"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const habitsRef = (uid) =>
  collection(db, "users", uid, "habits");

export const dailyLogRef = (uid, date) =>
  doc(db, "users", uid, "dailyLogs", date);

export const addHabit = (uid, habit) =>
  addDoc(habitsRef(uid), habit);

export const deleteHabit = (uid, id) =>
  deleteDoc(doc(db, "users", uid, "habits", id));

export const toggleHabit = (uid, id, done, streak) =>
  updateDoc(doc(db, "users", uid, "habits", id), {
    done,
    streak,
    lastUpdated: new Date(),
  });

export const listenHabits = (uid, cb) =>
  onSnapshot(habitsRef(uid), cb);

export const logDailyData = (uid, date, data) =>
  setDoc(
    dailyLogRef(uid, date),
    {
      ...data,
      timestamp: serverTimestamp(),
    },
    { merge: true }
  );
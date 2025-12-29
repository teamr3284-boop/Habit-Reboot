import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  Timestamp
} from "firebase/firestore";

export const addHabit = async (uid, habit) => {
  await addDoc(collection(db, "habits"), {
    uid,
    habit,
    streak: 0,
    lastCompleted: null,
    createdAt: Timestamp.now()
  });
};


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

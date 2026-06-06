/*
Orders API helpers (Firestore)
*/

import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const handleError = (err) => {
  const message = err?.message || "Firestore request failed";
  const e = new Error(message);
  if (err?.code) e.code = err.code;
  throw e;
};

export const createOrder = async (userId, order) => {
  try {
    const ref = await addDoc(collection(db, "orders"), {
      userId,
      ...order,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (err) {
    handleError(err);
  }
};

export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleError(err);
  }
};

export const getOrderById = async (id) => {
  try {
    const ref = doc(db, "orders", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Order not found");
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    handleError(err);
  }
};

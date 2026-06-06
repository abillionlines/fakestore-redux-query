/*
Products API helpers
*/





/*
Firestore-backed products API
- Replaces Axios/FakeStore with Firestore reads/writes.
*/

import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const handleError = (err) => {
  const message = err?.message || "Firestore request failed";
  const e = new Error(message);
  if (err?.code) e.code = err.code;
  throw e;
};

export const getProducts = async () => {
  try {
    const snap = await getDocs(collection(db, "products"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleError(err);
  }
};

export const getProduct = async (id) => {
  try {
    const ref = doc(db, "products", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Product not found");
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    handleError(err);
  }
};

export const createProduct = async (data) => {
  try {
    const ref = await addDoc(collection(db, "products"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (err) {
    handleError(err);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const ref = doc(db, "products", id);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
    return id;
  } catch (err) {
    handleError(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    const ref = doc(db, "products", id);
    await deleteDoc(ref);
    return id;
  } catch (err) {
    handleError(err);
  }
};

export const getCategories = async () => {
  try {
    // derive categories from products
    const snap = await getDocs(collection(db, "products"));
    const set = new Set();
    snap.docs.forEach((d) => {
      const c = d.data()?.category;
      if (c) set.add(c);
    });
    return Array.from(set);
  } catch (err) {
    handleError(err);
  }
};

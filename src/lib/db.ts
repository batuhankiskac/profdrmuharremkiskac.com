import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";

// Check if Firebase is configured (simple check based on one key)
const IS_FIREBASE_ENABLED =
  !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "";

// --- Interface ---
export interface BaseEntity {
  id: string;
  createdAt?: any;
  [key: string]: any;
}

// --- Mock Implementation (LocalStorage) ---
const getMockData = (collectionName: string): any[] => {
  if (typeof window === "undefined") return [];
  const startData = localStorage.getItem(collectionName);
  return startData ? JSON.parse(startData) : [];
};

const setMockData = (collectionName: string, data: any[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(collectionName, JSON.stringify(data));
};

// --- Adapter Functions ---

export const getDocuments = async (collectionName: string) => {
  if (IS_FIREBASE_ENABLED) {
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (e) {
      console.error("Firebase Connect Error, falling back to mock:", e);
      return getMockData(collectionName);
    }
  } else {
    // Mock Mode
    return getMockData(collectionName).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
};

export const getDocument = async (collectionName: string, id: string) => {
  if (IS_FIREBASE_ENABLED) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (e) {
      console.error("Firebase Connect Error:", e);
      return null;
    }
  } else {
    // Mock Mode
    const items = getMockData(collectionName);
    return items.find((item) => item.id === id) || null;
  }
};

export const addDocument = async (collectionName: string, data: any) => {
  const dataWithDate = {
    ...data,
    createdAt: new Date().toISOString(), // Use string for better serialization
  };

  if (IS_FIREBASE_ENABLED) {
    try {
      // Firebase prefers serverTimestamp usually, but sticking to ISO string for consistency between modes for now
      // or we can convert Date objects.
      await addDoc(collection(db, collectionName), dataWithDate);
      return true;
    } catch (e) {
      console.error("Firebase Add Error:", e);
      throw e;
    }
  } else {
    // Mock Mode
    const items = getMockData(collectionName);
    const newItem = { id: Date.now().toString(), ...dataWithDate };
    items.push(newItem);
    setMockData(collectionName, items);
    return newItem;
  }
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  const dataWithDate = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (IS_FIREBASE_ENABLED) {
    await updateDoc(doc(db, collectionName, id), dataWithDate);
  } else {
    // Mock Mode
    const items = getMockData(collectionName);
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...dataWithDate };
      setMockData(collectionName, items);
    }
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  if (IS_FIREBASE_ENABLED) {
    await deleteDoc(doc(db, collectionName, id));
  } else {
    // Mock Mode
    const items = getMockData(collectionName);
    const filtered = items.filter((item) => item.id !== id);
    setMockData(collectionName, filtered);
  }
};

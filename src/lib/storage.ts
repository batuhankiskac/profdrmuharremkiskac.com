import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

const IS_FIREBASE_ENABLED =
  !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "";

export const uploadImage = async (file: File, path: string) => {
  if (IS_FIREBASE_ENABLED) {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (e) {
      console.error("Firebase Storage Error:", e);
      throw e;
    }
  } else {
    // Mock Mode: Return a fake URL or a blob URL to see it locally immediately
    console.warn("Mock Storage: Uploading file locally (blob)");
    return URL.createObjectURL(file);
  }
};

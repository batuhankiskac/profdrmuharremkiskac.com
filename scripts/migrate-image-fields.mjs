import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const projectId =
  process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL ve FIREBASE_PRIVATE_KEY zorunludur.",
  );
}

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
  projectId,
});
const db = getFirestore(app);
const collections = ["articles", "services", "videos"];

for (const collectionName of collections) {
  const snapshot = await db.collection(collectionName).get();
  const updates = snapshot.docs.filter((document) => {
    const data = document.data();
    return !data.imageUrl && typeof data.image === "string" && data.image;
  });

  for (let index = 0; index < updates.length; index += 400) {
    const batch = db.batch();
    for (const document of updates.slice(index, index + 400)) {
      batch.update(document.ref, {
        imageUrl: document.data().image,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    await batch.commit();
  }

  console.log(`${collectionName}: ${updates.length} kayıt güncellendi.`);
}

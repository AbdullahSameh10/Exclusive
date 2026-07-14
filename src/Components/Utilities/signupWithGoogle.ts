import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@Authentication/firebase";

const provider = new GoogleAuthProvider();

export default async function signUpWithGoogle() {
  const cred = await signInWithPopup(auth, provider);
  const user = cred.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  // Create Firestore profile only once
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      username: user.displayName ?? "User",
      email: user.email,
      photoURL: user.photoURL,
      provider: "google",
      createdAt: serverTimestamp(),
    });
  }

  return user;
}
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Authentication/firebase";

export default async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
}

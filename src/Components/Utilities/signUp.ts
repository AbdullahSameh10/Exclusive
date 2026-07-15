import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@Authentication/firebase";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export default async function signUp(props: SignUpData) {
  const { username, email, password } = props;

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = cred.user;

  await updateProfile(firebaseUser, {
    displayName: username,
  });

  await sendEmailVerification(auth.currentUser!, {
    url:
      "http://localhost:5173/verify-email?mode=verifyEmail&oobCode=" +
      firebaseUser.uid,
    handleCodeInApp: false,
  });

  await setDoc(doc(db, "users", firebaseUser.uid), {
    uid: firebaseUser.uid,
    name: username,
    email: firebaseUser.email,
    avatar: firebaseUser.photoURL,
    phoneNumber: null,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

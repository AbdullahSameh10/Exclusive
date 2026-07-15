import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "@Authentication/firebase";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

export default async function loginWithGoogleOnly() {
  const result = await signInWithPopup(auth, provider);

  const user = {
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
    uid: result.user.uid,
  };
  const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

  if (isNewUser) {
    toast.success("Account created successfully!");
  } else {
    toast.success("Logged in successfully!");
  }

  return user;
}

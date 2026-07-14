import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Authentication/firebase";
import { toast } from "react-toastify";

export default async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  if (!cred.user.emailVerified) {
    toast.error("The Email Is Not verified, Please Check Your Email Spam");
    await signOut(auth);
    throw new Error("Email not verified");
  }

  return cred.user;
}

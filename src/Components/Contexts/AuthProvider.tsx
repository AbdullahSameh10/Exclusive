import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import AuthContext, { type UserTypes } from "./AuthContext";
import { auth, db } from "@Authentication/firebase";
import UserContext, { type PaymentMethod } from "./UserContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import avatarImg from "@Assets/Avatar.png";

export default function AuthProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [user, setUser] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const { preferredPayment } = useContext(UserContext);

  const { setVerified } = useContext(UserContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setVerified(false);
          setLoading(false);
          return;
        }

        
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        const data = userSnap.exists() ? userSnap.data() : {};
        updateProfile(firebaseUser, {
          photoURL:
            (data.photoURL as string | undefined) ??
            firebaseUser.photoURL ??
            avatarImg,
        });
        if (firebaseUser && userSnap) {
          setVerified(firebaseUser.emailVerified);

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              name: firebaseUser.displayName ?? "Guest User",
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL ?? avatarImg,
              phoneNumber: firebaseUser.phoneNumber ?? null,
              preferredPayment: preferredPayment ?? null,
              emailVerified: firebaseUser.emailVerified,
              createdAt: Date.now(),
            });
          } else {
            await updateDoc(userRef, {
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              preferredPayment:
                (data.preferredPayment as PaymentMethod | undefined) ??
                preferredPayment ??
                null,
            });
          }
        }
        setUser({
          uid: firebaseUser.uid,

          name:
            (data.name as string | undefined) ??
            firebaseUser.displayName ??
            "Guest User",

          email: (data.email as string | undefined) ?? firebaseUser.email ?? "",

          avatar:
            (data.photoURL as string | undefined) ??
            firebaseUser.photoURL ??
            avatarImg,

          phoneNumber: (data.phoneNumber as string | undefined) ?? null,

          provider: firebaseUser.providerData[0]?.providerId ?? "unknown",

          preferredPayment:
            (data.preferredPayment as PaymentMethod | undefined) ||
            preferredPayment ||
            null,
        });

        setVerified(firebaseUser.emailVerified);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [setVerified]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

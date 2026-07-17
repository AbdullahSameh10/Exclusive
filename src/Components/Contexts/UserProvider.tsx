import { useEffect, useState } from "react";
import UserContext, { type PaymentMethod } from "./UserContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@Hooks/index";
import { db } from "@Authentication/firebase";
import { toast } from "react-toastify";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [verified, setVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [preferredPayment, setPreferredPayment] =
    useState<PaymentMethod>("Cash On Delivery");
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const { user } = useAuth();
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setUserWishlist([]);
      return;
    }

    let cancelled = false;
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (cancelled) return;
        const data = userSnap.exists() ? userSnap.data() : {};
        if (data.verified !== undefined) setVerified(Boolean(data.verified));
        if (data.phoneVerified !== undefined)
          setPhoneVerified(Boolean(data.phoneVerified));
        if (data.preferredPayment)
          setPreferredPayment(data.preferredPayment as PaymentMethod);
        if (Array.isArray(data.wishlist)) {
          setUserWishlist(data.wishlist);
        }
        setWishlistLoaded(true);
      } catch (error) {
        toast.error((error as Error).message || "Failed to fetch user data");
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user?.uid || !wishlistLoaded) return;

    const syncWishlist = async () => {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            wishlist: userWishlist,
          },
          {
            merge: true,
          },
        );
      } catch (error) {
        toast.error((error as Error).message || "Failed to sync wishlist");
      }
    };

    syncWishlist();
  }, [user, userWishlist]);

  return (
    <UserContext.Provider
      value={{
        verified,
        setVerified,

        phoneVerified,
        setPhoneVerified,

        preferredPayment,
        setPreferredPayment,

        userWishlist,
        setUserWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

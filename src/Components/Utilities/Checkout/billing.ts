import { db } from "@/Authentication/firebase";
import type { BillingDetails } from "@Types/Checkout.types";
import type { UserTypes } from "@Contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";

export const saveBillingInformation = async (
  user: UserTypes | null,
  billingDetails: BillingDetails,
) => {
  if (!user) return;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      billingInfo: billingDetails,
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to save billing information.");
  }
};

export const loadBillingInfo = async (
  user: UserTypes | null,
  setBillingDetails: Dispatch<SetStateAction<BillingDetails>>,
) => {
  try {
    if (!user) return;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    setBillingDetails(userDoc.data()?.billingInfo);
  } catch (err: any) {
    toast.error(err?.message ?? String(err));
  }
};

export default {
  saveBillingInformation,
  loadBillingInfo,
};

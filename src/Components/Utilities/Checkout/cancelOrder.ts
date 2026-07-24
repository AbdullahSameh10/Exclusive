import { doc, updateDoc } from "firebase/firestore";
import { db } from "@Authentication/firebase";

export default async function cancelOrder(orderId: string) {
  await updateDoc(doc(db, "orders", orderId), {
    status: "Cancelled",
  });
}

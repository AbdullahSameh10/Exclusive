import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@Authentication/firebase";
import type { Order } from "@Types/Order.types";

export default async function getOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Order),
    id: doc.id,
  }));
}

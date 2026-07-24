import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@Authentication/firebase";
import type { Order } from "@Types/Order.types";

export default async function createOrder(order: Order) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

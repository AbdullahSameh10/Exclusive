import { useEffect } from "react";
import useRouteTransition from "../Hooks/useRouteTransition";

export default function Cart() {
  const transition = useRouteTransition();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);
  return (
    <h1>Cart</h1>
  );
}
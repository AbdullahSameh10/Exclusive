import { useEffect } from "react";
import useRouteTransition from "../Hooks/useRouteTransition";

export default function Wishlist() {
  const transition = useRouteTransition();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  return (
    <h1>Wishlist</h1>
  );
}
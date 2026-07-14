import { useContext } from "react";
import { RouteTransitionContext } from "../Contexts";

export default function useRouteTransition() {
  return useContext(RouteTransitionContext);
}
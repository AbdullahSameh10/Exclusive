import { createContext } from "react";

type RouteTransitionContextType = {
  start: () => void;
  end: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextType>({
  start: () => {},
  end: () => {},
});

export default RouteTransitionContext;

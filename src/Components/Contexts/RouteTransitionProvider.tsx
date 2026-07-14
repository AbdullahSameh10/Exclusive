import { useState } from "react";
import RouteTransitionContext from "./RouteTransitionContext";

export default function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transitioning, setTransitioning] = useState(false);

  return (
    <RouteTransitionContext.Provider
      value={{
        start: () => setTransitioning(true),
        end: () => setTimeout(() => setTransitioning(false), 1000),
      }}
    >
      {transitioning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-[#DB4444]" />
        </div>
      )}
      {children}
    </RouteTransitionContext.Provider>
  );
}

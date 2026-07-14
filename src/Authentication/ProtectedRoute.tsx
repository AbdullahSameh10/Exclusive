import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useAuth } from "../Components/Hooks";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) {
    return (
      <div className="p-80 text-center text-4xl font-bold text-[#DB4444]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}

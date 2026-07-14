import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

export default function Loader() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      const visible = setTimeout(() => {
        setVisible(true);
      }, 0);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000); // minimum duration

      return () => {
        clearTimeout(timer);
        clearTimeout(visible);
      }
    }
  }, [navigation.state]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-[#DB4444]" />
    </div>
  );
}
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Hash yoksa en üste git
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // Hash varsa (örn: #contact) - scroll davranışı zaten çalışacak
  }, [pathname, hash]);

  return null;
}

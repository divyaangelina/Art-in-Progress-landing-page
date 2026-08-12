import { useEffect, useState } from "react";

// Single source of truth for "should this browser animate at all".
// Every JS-driven effect in v2 (parallax, scroll rails, cursor spotlight)
// checks this and bails out to a static final state — CSS-only transitions
// are already neutralised by the media query in global.css.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

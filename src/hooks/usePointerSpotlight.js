import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Tracks the pointer inside an element and writes its position as `--px` /
// `--py` percentages. A radial gradient in CSS reads those two numbers, so
// the "spotlight follows your cursor" effect costs one rAF write per frame
// and zero React renders.
//
// Ignored entirely on touch (no hover) and under reduced-motion, where the
// gradient stays parked at its default centre position.
export function usePointerSpotlight() {
  const ref = useRef(null);
  const frame = useRef(0);
  const next = useRef({ x: 50, y: 50 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    function write() {
      frame.current = 0;
      node.style.setProperty("--px", `${next.current.x}%`);
      node.style.setProperty("--py", `${next.current.y}%`);
    }

    function onMove(event) {
      const rect = node.getBoundingClientRect();
      next.current = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      if (frame.current) return;
      frame.current = requestAnimationFrame(write);
    }

    function onLeave() {
      next.current = { x: 50, y: 50 };
      if (frame.current) return;
      frame.current = requestAnimationFrame(write);
    }

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return ref;
}

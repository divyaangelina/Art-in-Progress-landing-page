import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

// ============================================================================
// Scroll drivers for v2.
//
// Both hooks share one rule: they never write to React state on every scroll
// event. Scroll fires far faster than React can usefully re-render, so each
// hook coalesces events into a single requestAnimationFrame tick, and the
// element-level hook writes its value straight to a CSS custom property
// instead of re-rendering at all.
// ============================================================================

// Whole-document progress, 0 → 1. Drives the thin gold rail at the top of
// the page. Cheap enough to keep in state: at most one update per frame, and
// only one element subscribes to it.
export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    function measure() {
      frame.current = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    }

    function onScroll() {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

// Where the 0% and 100% lines sit, expressed as the element's top offset
// (in px from the viewport top) at that moment. Splitting it out this way
// keeps the measure loop below to plain arithmetic.
function anchorToTop(anchor, viewport, height) {
  switch (anchor) {
    case "enter": // element's top edge at the bottom of the viewport
      return viewport;
    case "center": // element centred in the viewport
      return viewport / 2 - height / 2;
    case "exit": // element's bottom edge at the top of the viewport
      return -height;
    case "readThrough": // element's bottom edge 40% up from the viewport bottom
      return -height + viewport * 0.6;
    default:
      return viewport;
  }
}

// Progress of a single element travelling through the viewport, written to
// `--progress` as a unitless 0 → 1 number. CSS then does the actual
// animating (parallax offsets, the timeline rail's scaleY), which keeps the
// work on the compositor and out of React's render path.
//
// Returns [measureRef, writeRef]. Attach measureRef to the element whose
// travel defines the progress; attach writeRef to the (usually much smaller)
// element that actually consumes the variable. Keeping them separate matters
// for performance: a custom property set on an element invalidates style for
// its whole subtree, so writing to a tall section containing dozens of nodes
// forces a full-subtree recalc every frame. Omit writeRef and the value is
// written to the measured element itself.
export function useElementScrollProgress({
  from = "enter",
  to = "exit",
} = {}) {
  const ref = useRef(null);
  const writeRef = useRef(null);
  const frame = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = writeRef.current || node;

    // Reduced motion: pin everything to its finished state and never listen.
    if (reducedMotion) {
      target.style.setProperty("--progress", "1");
      return;
    }

    function measure() {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;

      const startTop = anchorToTop(from, viewport, rect.height);
      const endTop = anchorToTop(to, viewport, rect.height);
      const span = startTop - endTop;

      const raw = span === 0 ? 1 : (startTop - rect.top) / span;
      const clamped = Math.min(1, Math.max(0, raw));
      target.style.setProperty("--progress", clamped.toFixed(4));
    }

    function onScroll() {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [from, to, reducedMotion]);

  return [ref, writeRef];
}

import { usePageScrollProgress } from "../../../hooks/useScrollProgress";
import "../styles/ScrollRail.css";

// A hairline of gold across the top of the page tracking read position.
// Decorative only — hidden from assistive tech, since the scrollbar already
// communicates this to anyone who needs it announced.
export default function ScrollRail() {
  const progress = usePageScrollProgress();

  return (
    <div className="v2-scroll-rail" aria-hidden="true">
      <span
        className="v2-scroll-rail__fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

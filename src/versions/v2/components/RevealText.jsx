import { Fragment } from "react";
import { useInView } from "../../../hooks/useInView";
import { theme } from "../../../theme/theme";
import "../styles/RevealText.css";

// Splits a string into words, wraps each in an overflow-hidden mask, and
// slides them up from below one after another — the headline assembling
// itself rather than fading in. Every word keeps its own <span> so text
// still selects, copies, and reads to a screen reader as one string.
//
// `trigger` decides when it plays: "inView" (default) waits for a scroll
// intersection; "immediate" plays as soon as `active` flips true, which the
// hero uses to chain the headline behind its spotlight.
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = theme.motion.stagger.base,
  trigger = "inView",
  active = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const played = trigger === "immediate" ? active : inView;

  const words = text.split(" ");

  return (
    <Tag
      ref={trigger === "inView" ? ref : undefined}
      className={`reveal-text ${played ? "is-played" : ""} ${className}`}
    >
      {words.map((word, index) => (
        // The space must sit OUTSIDE the mask — inside an overflow-hidden
        // inline-block it collapses and the words run together.
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-text__mask">
            <span
              className="reveal-text__word"
              style={{ transitionDelay: `${delay + index * stagger}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

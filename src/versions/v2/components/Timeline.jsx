import RevealText from "./RevealText";
import { useInView } from "../../../hooks/useInView";
import { useElementScrollProgress } from "../../../hooks/useScrollProgress";
import { content } from "../content";
import "../styles/Timeline.css";

// A single milestone. Owns its own intersection observer so each entry
// lights up as it reaches you rather than all five firing at once — the
// rail arrives first, then the node ignites, then the card slides in from
// its side of the corridor.
function Milestone({ milestone, index }) {
  const [ref, inView] = useInView({ threshold: 0.4, rootMargin: "-10% 0px" });
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <li
      ref={ref}
      className={[
        "v2-milestone",
        `v2-milestone--${side}`,
        `v2-milestone--${milestone.status}`,
        inView ? "is-visible" : "",
      ].join(" ")}
    >
      <div className="v2-milestone__node" aria-hidden="true">
        <span className="v2-milestone__node-core" />
        {milestone.status === "current" && (
          <span className="v2-milestone__node-pulse" />
        )}
      </div>

      <article className="v2-milestone__card">
        <header className="v2-milestone__meta">
          <span className="v2-milestone__marker">{milestone.marker}</span>
          <span className="v2-milestone__date">{milestone.date}</span>
          {milestone.status === "current" && (
            <span className="v2-milestone__badge">In progress</span>
          )}
        </header>

        <h3 className="v2-milestone__title">{milestone.title}</h3>
        <p className="v2-milestone__description">{milestone.description}</p>
      </article>
    </li>
  );
}

// The progress corridor. The gold rail down the middle is drawn by scroll
// position (--progress → scaleY), so the line literally fills in as the
// visitor walks the timeline. Milestones alternate sides on desktop and
// stack to one side on mobile.
export default function Timeline() {
  const [headerRef, headerInView] = useInView({ threshold: 0.4 });
  // "readThrough" finishes the rail when the last milestone is comfortably
  // on screen, rather than when the section has fully scrolled past.
  //
  // The track defines the travel, but --progress is written to the 2px rail
  // inside it. Writing to the track would invalidate style for every
  // milestone in the list on each scroll frame; the rail has two children.
  const [trackRef, railRef] = useElementScrollProgress({
    from: "enter",
    to: "readThrough",
  });

  return (
    <section className="v2-timeline section" id="progress">
      <div className="container">
        <div
          className={`v2-timeline__header ${headerInView ? "is-visible" : ""}`}
          ref={headerRef}
        >
          <p className="eyebrow">{content.timeline.eyebrow}</p>
          <RevealText
            as="h2"
            className="v2-timeline__heading"
            text={content.timeline.heading}
          />
          <p className="v2-timeline__subhead">{content.timeline.subhead}</p>
        </div>

        <div className="v2-timeline__track" ref={trackRef}>
          <div className="v2-timeline__rail" aria-hidden="true" ref={railRef}>
            <span className="v2-timeline__rail-fill" />
            <span className="v2-timeline__rail-head" />
          </div>

          <ol className="v2-timeline__list">
            {content.timeline.milestones.map((milestone, index) => (
              <Milestone
                key={milestone.marker}
                milestone={milestone}
                index={index}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import RevealText from "./RevealText";
import { galleryImages } from "../../../theme/assets";
import { usePointerSpotlight } from "../../../hooks/usePointerSpotlight";
import { useElementScrollProgress } from "../../../hooks/useScrollProgress";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { content } from "../content";
import "../styles/Hero.css";

// The hero plays as a staged sequence rather than a single fade:
//   1. the room is black
//   2. a spotlight rises on the empty wall
//   3. the painting drops in under it
//   4. the headline assembles word by word
//   5. the scroll cue appears last, once the room has settled
//
// After that it stays interactive: the light follows the cursor, and the
// painting drifts against the copy as you scroll away from it.
export default function Hero({ onJoinWaitlist }) {
  const [lit, setLit] = useState(false);
  const reducedMotion = useReducedMotion();
  const spotlightRef = usePointerSpotlight();
  const [parallaxRef] = useElementScrollProgress({ from: "center", to: "exit" });

  useEffect(() => {
    const delay = reducedMotion ? 0 : 400;
    const timer = setTimeout(() => setLit(true), delay);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <section
      className={`v2-hero ${lit ? "is-lit" : ""}`}
      ref={spotlightRef}
    >
      {/* Two lights: a fixed key light on the artwork, and a softer one
          that tracks the pointer so the room feels physically lit. */}
      <div className="v2-hero__keylight" aria-hidden="true" />
      <div className="v2-hero__pointerlight" aria-hidden="true" />
      <div className="v2-hero__vignette" aria-hidden="true" />

      <div className="v2-hero__content container">
        <div className="v2-hero__copy">
          <p className="eyebrow v2-hero__eyebrow">{content.hero.eyebrow}</p>

          <RevealText
            as="h1"
            className="v2-hero__headline"
            text={content.hero.headline}
            trigger="immediate"
            active={lit}
            delay={900}
          />

          <p className="v2-hero__subhead">{content.hero.subhead}</p>

          <button className="v2-hero__cta" onClick={onJoinWaitlist}>
            <span className="v2-hero__cta-label">{content.hero.cta}</span>
          </button>
        </div>

        {/* The parallax wrapper owns --progress; the frame inside reads it.
            Keeping them separate means the drift never fights the entrance
            animation, which lives on the frame itself. */}
        <div className="v2-hero__artwork" ref={parallaxRef}>
          <figure className="v2-hero__frame">
            <img
              src={galleryImages.heroPainting.src}
              alt={galleryImages.heroPainting.alt}
            />
            <figcaption className="v2-hero__plaque">
              <span>Untitled</span>
              <span>In progress</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="v2-hero__cue" aria-hidden="true">
        <span className="v2-hero__cue-label">{content.hero.scrollCue}</span>
        <span className="v2-hero__cue-line" />
      </div>
    </section>
  );
}

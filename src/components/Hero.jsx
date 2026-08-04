import { useEffect, useState } from "react";
import FramedArtwork from "./FramedArtwork";
import { galleryImages } from "../theme/assets";
import "../styles/Hero.css";

// The hero establishes the museum aesthetic in one orchestrated sequence:
// the room is dim, a spotlight slowly rises on the framed artwork, and the
// headline fades in after — like walking into a gallery just as the lights
// come up on the first piece.
export default function Hero({ onJoinWaitlist }) {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = prefersReduced ? 0 : 300;
    const timer = setTimeout(() => setLit(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${lit ? "hero--lit" : ""}`}>
      <div className="hero__spotlight" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Art in Progress</p>
          <h1 className="hero__headline">
            A gallery for artists who aren&rsquo;t finished yet.
          </h1>
          <p className="hero__subhead">
            Targeted networking, curated opportunities, and structured
            feedback — replacing the feed with a room worth walking into.
          </p>
          <button className="hero__cta" onClick={onJoinWaitlist}>
            Join Waitlist
          </button>
        </div>

        <div className="hero__artwork">
          <FramedArtwork image={galleryImages.heroPainting} size="large" />
        </div>
      </div>
    </section>
  );
}

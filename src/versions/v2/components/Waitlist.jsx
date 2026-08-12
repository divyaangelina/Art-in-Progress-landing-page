import { useState, forwardRef } from "react";
import RevealText from "./RevealText";
import { usePointerSpotlight } from "../../../hooks/usePointerSpotlight";
import { useInView } from "../../../hooks/useInView";
import { content } from "../content";
import "../styles/Waitlist.css";

// The closing room. Same lighting language as the hero so the page ends
// where it started — dark, lit, and waiting — with the form itself as the
// only bright object on the wall.
const Waitlist = forwardRef(function Waitlist(_props, ref) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const spotlightRef = usePointerSpotlight();
  const [innerRef, inView] = useInView({ threshold: 0.35 });

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError(content.waitlist.error);
      return;
    }
    setError("");
    // Wire this up to your waitlist provider of choice.
    setSubmitted(true);
  }

  return (
    <section className="v2-waitlist section" ref={ref} id="waitlist">
      <div className="v2-waitlist__light" ref={spotlightRef} aria-hidden="true">
        <div className="v2-waitlist__pointerlight" />
      </div>

      <div
        className={`container v2-waitlist__inner ${inView ? "is-visible" : ""}`}
        ref={innerRef}
      >
        <p className="eyebrow">{content.waitlist.eyebrow}</p>

        <RevealText
          as="h2"
          className="v2-waitlist__heading"
          text={content.waitlist.heading}
        />

        <p className="v2-waitlist__subhead">{content.waitlist.subhead}</p>

        {!submitted ? (
          <form className="v2-waitlist__form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="v2-waitlist-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="v2-waitlist-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={content.waitlist.placeholder}
              className="v2-waitlist__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "v2-waitlist-error" : undefined}
            />
            <button type="submit" className="v2-waitlist__button">
              <span className="v2-waitlist__button-label">
                {content.waitlist.cta}
              </span>
            </button>
          </form>
        ) : (
          <p className="v2-waitlist__thankyou" role="status">
            {content.waitlist.success}
          </p>
        )}

        {error && (
          <p id="v2-waitlist-error" className="v2-waitlist__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
});

export default Waitlist;

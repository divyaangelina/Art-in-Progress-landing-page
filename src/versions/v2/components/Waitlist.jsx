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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const spotlightRef = usePointerSpotlight();
  const [innerRef, inView] = useInView({ threshold: 0.35 });

  // Posts to /api/waitlist, which is the only part of this project that runs
  // on a server. It holds the Buttondown key so this component never has to
  // — see the header comment in api/waitlist.js.
  async function handleSubmit(event) {
    event.preventDefault();
    if (pending) return; // guard against a double-click mid-request

    if (!email.trim() || !email.includes("@")) {
      setError(content.waitlist.error);
      return;
    }

    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      // The endpoint answers with JSON on both success and failure, but a
      // proxy or a crash can return HTML instead — so never assume it parses.
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error || content.waitlist.networkError);
        return;
      }

      // Swapping the form out for the thank-you happens only here, once the
      // address is genuinely stored.
      setSubmitted(true);
    } catch {
      // fetch itself rejected: no network, DNS failure, request blocked.
      setError(content.waitlist.networkError);
    } finally {
      setPending(false);
    }
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
              disabled={pending}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "v2-waitlist-error" : undefined}
            />
            <button
              type="submit"
              className="v2-waitlist__button"
              disabled={pending}
              aria-busy={pending}
            >
              <span className="v2-waitlist__button-label">
                {pending ? content.waitlist.ctaPending : content.waitlist.cta}
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

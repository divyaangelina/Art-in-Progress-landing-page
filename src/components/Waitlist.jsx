import { useState, forwardRef } from "react";
import "../styles/Waitlist.css";

const Waitlist = forwardRef(function Waitlist(_props, ref) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email to join the waitlist.");
      return;
    }
    setError("");
    // Wire this up to your waitlist provider of choice.
    setSubmitted(true);
  }

  return (
    <section className="waitlist section" ref={ref} id="waitlist">
      <div className="container waitlist__inner">
        <p className="eyebrow">Now accepting names</p>
        <h2 className="waitlist__heading">The gallery opens soon.</h2>
        <p className="waitlist__subhead">
          Be among the first artists through the door.
        </p>

        {!submitted ? (
          <form className="waitlist__form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="waitlist-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your@email.com"
              className="waitlist__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "waitlist-error" : undefined}
            />
            <button type="submit" className="waitlist__button">
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="waitlist__thankyou" role="status">
            You&rsquo;re on the list. We&rsquo;ll be in touch before the doors
            open.
          </p>
        )}

        {error && (
          <p id="waitlist-error" className="waitlist__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
});

export default Waitlist;

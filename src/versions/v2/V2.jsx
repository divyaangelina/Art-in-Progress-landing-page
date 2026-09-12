import { useRef } from "react";
import ScrollRail from "./components/ScrollRail";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Pillars from "./components/Pillars";
import Timeline from "./components/Timeline";
import Waitlist from "./components/Waitlist";
import PrivacyPolicy from "./components/PrivacyPolicy";

// v2 — the dramatic cut.
//
// Section order is deliberate: the page alternates dark → light → dark so
// each transition is a change of room, and the timeline sits in darkness
// right before the waitlist, so "here's how far we've got" leads straight
// into "get in before the doors open."
export default function V2() {
  const waitlistRef = useRef(null);

  function scrollToWaitlist() {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ScrollRail />

      <Hero onJoinWaitlist={scrollToWaitlist} />

      <Manifesto />

      <Pillars />

      <Timeline />

      <Waitlist ref={waitlistRef} />

      <footer className="site-footer">
        {/* Left: Copyright */}
        <p className="site-footer__copyright">
          © 2026 Art in Progress. All rights reserved.
        </p>

        {/* Center: Socials */}
        <div className="site-footer__social-area">
          <p className="site-footer__social-heading">
            Welcome to the Community!
          </p>

          <div className="site-footer__socials" aria-label="Social media">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/_art__in_progress/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Art in Progress on Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  className="social-icon-fill"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@Artin-Progress"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Art in Progress on YouTube"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  className="social-icon-cut"
                  d="M20.2 8.1a2.2 2.2 0 0 0-1.5-1.5C17.4 6.2 12 6.2 12 6.2s-5.4 0-6.7.4a2.2 2.2 0 0 0-1.5 1.5C3.4 9.4 3.4 12 3.4 12s0 2.6.4 3.9a2.2 2.2 0 0 0 1.5 1.5c1.3.4 6.7.4 6.7.4s5.4 0 6.7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-3.9.4-3.9s0-2.6-.4-3.9Z"
                />
                <path
                  className="social-icon-cut"
                  d="m10.2 9.6 4.2 2.4-4.2 2.4V9.6Z"
                />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@_artinprogress?_r=1&_t=ZP-99fthjJ6zZG"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Art in Progress on TikTok"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  className="social-icon-cut"
                  d="M14 4v10.2a3.3 3.3 0 1 1-2.8-3.25M14 4c.5 2.2 2 3.5 4.5 3.8"
                />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1ESrYp6BGS/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Art in Progress on Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  className="social-icon-cut"
                  d="M13.5 20v-7h2.4l.4-2.7h-2.8V8.6c0-.8.3-1.4 1.5-1.4h1.5V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v1.8H8.1V13h2.5v7"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/art-in-progress3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Art in Progress on LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path
                  className="social-icon-cut"
                  d="M8 10v6M8 7.5v.01M11.5 16v-3.2c0-1.4.8-2.3 2-2.3s2 .9 2 2.3V16M11.5 10.7V16"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Privacy Policy */}
        <div className="site-footer__privacy">
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>

      {window.location.hash === "#privacy" && <PrivacyPolicy />}
    </>
  );
}
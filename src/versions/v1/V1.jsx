import { useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Waitlist from "./components/Waitlist";

// v1 — the original landing page, preserved exactly as built.
// Reachable at /?v=1 while v2 is the default. Nothing here should change;
// it exists as a reference point for comparing layout decisions.
export default function V1() {
  const waitlistRef = useRef(null);

  function scrollToWaitlist() {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Hero onJoinWaitlist={scrollToWaitlist} />
      <About />
      <Features />
      <Waitlist ref={waitlistRef} />
      <footer className="site-footer">
        <p>Art in Progress — the gallery opens soon.</p>
      </footer>
    </>
  );
}

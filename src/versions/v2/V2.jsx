import { useRef } from "react";
import ScrollRail from "./components/ScrollRail";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Pillars from "./components/Pillars";
import Timeline from "./components/Timeline";
import Waitlist from "./components/Waitlist";
import { content } from "./content";

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
        <p>{content.footer}</p>
      </footer>
    </>
  );
}

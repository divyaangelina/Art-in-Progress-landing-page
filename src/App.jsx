import { useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Waitlist from "./components/Waitlist";
import { useThemeVars } from "./hooks/useThemeVars";
import "./styles/global.css";

export default function App() {
  useThemeVars();
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

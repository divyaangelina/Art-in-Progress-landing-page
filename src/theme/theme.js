// ============================================================================
// theme.js — Art in Progress design tokens
// ----------------------------------------------------------------------------
// This file is the single source of truth for the visual identity of the
// site: a modern museum — cream walls, marble, charcoal, museum-lit gold.
// Tweak values here to restyle the entire page. No component should
// hardcode a color, font, spacing value, or timing — everything is pulled
// from this object.
// ============================================================================

export const theme = {
  colors: {
    // Walls & surfaces
    wall: "#F5F1E8", // primary cream wall
    wallDeep: "#EEE8DA", // slightly deeper cream, for section alternation
    marble: "#FAF8F3", // near-white marble surface (cards, plaques backing)
    marbleVein: "#E4DED0", // subtle marble vein / hairline on light surfaces

    // Ink & text
    ink: "#1C1B19", // primary charcoal text
    inkSoft: "#4A4740", // secondary charcoal, supporting copy
    inkFaint: "#8A8478", // tertiary, captions on light surfaces

    // Museum night (used sparingly — footer, spotlight backdrop)
    night: "#141311",
    nightSoft: "#26241F",

    // Gold — the single accent, used with restraint
    gold: "#B08D57",
    goldDeep: "#8C6D3F", // hover / active state
    goldFaint: "#D9C398", // gold on dark backgrounds, low-emphasis

    // Spotlight (radial highlight only — not a general gradient system)
    spotlightWarm: "#FFF4DC",

    // Feedback
    success: "#5B7A5B",
  },

  typography: {
    fontDisplay: '"Fraunces", "Iowan Old Style", Georgia, serif',
    fontBody:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontPlaque: '"Space Mono", "SFMono-Regular", monospace', // wall-label / caption typography

    scale: {
      // fluid clamp() sizes: min, preferred(vw), max
      display: "clamp(2.75rem, 6vw, 5.5rem)", // hero headline
      h1: "clamp(2.25rem, 4vw, 3.5rem)",
      h2: "clamp(1.75rem, 3vw, 2.5rem)",
      h3: "clamp(1.25rem, 2vw, 1.5rem)",
      body: "clamp(1rem, 1.1vw, 1.125rem)",
      bodyLarge: "clamp(1.125rem, 1.4vw, 1.375rem)",
      caption: "0.75rem",
      plaque: "0.6875rem",
    },

    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.1,
      snug: 1.3,
      normal: 1.6,
      relaxed: 1.8,
    },

    tracking: {
      tight: "-0.02em",
      normal: "0",
      wide: "0.08em", // plaque / eyebrow letterspacing
      wider: "0.16em", // small-caps labels
    },
  },

  spacing: {
    // Base-8 scale, generous by design — this site prioritizes whitespace
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2.5rem",
    xl: "4rem",
    "2xl": "6rem",
    "3xl": "9rem",
    "4xl": "13rem",

    sectionPaddingY: "clamp(5rem, 12vw, 9rem)",
    sectionPaddingX: "clamp(1.5rem, 6vw, 6rem)",
    containerMaxWidth: "1240px",
  },

  radius: {
    none: "0",
    sm: "2px",
    md: "4px",
    lg: "8px",
    frame: "2px", // artwork frames stay nearly square-edged — museum, not app UI
    pill: "999px",
  },

  shadows: {
    // Soft, physical, gallery-lit shadows — never harsh drop shadows
    frame:
      "0 1px 2px rgba(28, 27, 25, 0.06), 0 24px 48px -16px rgba(28, 27, 25, 0.22)",
    frameHover:
      "0 1px 2px rgba(28, 27, 25, 0.08), 0 32px 64px -20px rgba(28, 27, 25, 0.28)",
    plaque: "0 1px 0 rgba(28, 27, 25, 0.08)",
    card: "0 1px 3px rgba(28, 27, 25, 0.05), 0 12px 32px -12px rgba(28, 27, 25, 0.18)",
    focusRing: "0 0 0 3px rgba(176, 141, 87, 0.35)",

    // Dramatic lighting (v2) — a hung painting under a real gallery spot
    frameLit:
      "0 2px 4px rgba(0, 0, 0, 0.4), 0 48px 88px -32px rgba(0, 0, 0, 0.75), 0 0 120px -40px rgba(255, 244, 220, 0.45)",
    glowGold: "0 0 0 1px rgba(176, 141, 87, 0.4), 0 0 32px rgba(176, 141, 87, 0.28)",
    glowGoldStrong:
      "0 0 0 1px rgba(176, 141, 87, 0.6), 0 0 56px rgba(176, 141, 87, 0.45)",
    nodeLit: "0 0 0 6px rgba(176, 141, 87, 0.14), 0 0 24px rgba(176, 141, 87, 0.55)",
  },

  motion: {
    duration: {
      instant: "120ms",
      fast: "240ms",
      base: "420ms",
      slow: "800ms",
      spotlight: "2400ms", // hero spotlight illumination sequence
      curtain: "1400ms",

      // v2 — longer, more cinematic beats
      reveal: "1100ms", // masked word / line reveals
      drift: "1800ms", // slow parallax settle
      ignite: "600ms", // a timeline node coming alight
    },
    easing: {
      standard: "cubic-bezier(0.22, 1, 0.36, 1)", // gentle deceleration
      enter: "cubic-bezier(0.16, 1, 0.3, 1)",
      exit: "cubic-bezier(0.7, 0, 0.84, 0)",
      linear: "linear",

      // v2 — a heavier, more theatrical curve for masked reveals
      curtain: "cubic-bezier(0.19, 1, 0.22, 1)",
    },
    // Delay between each item in a staggered sequence (words, cards, nodes)
    stagger: {
      tight: 45,
      base: 90,
      loose: 150,
    },
  },

  // Timeline (v2) — the progress rail and its milestone nodes
  timeline: {
    railWidth: "2px",
    railTrack: "rgba(176, 141, 87, 0.16)",
    nodeSize: "14px",
    nodeSizeCurrent: "20px",
  },

  // Frame styles for framed artwork throughout the site (hero, feature cards)
  frames: {
    border: "10px solid #FAF8F3",
    borderInner: "1px solid rgba(28, 27, 25, 0.12)",
    matWidth: "clamp(10px, 1.4vw, 22px)", // "mat board" between art and frame edge
    background: "#FAF8F3",
  },

  // Spotlight settings for the hero illumination sequence
  spotlight: {
    radialGradient:
      "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255, 244, 220, 0.55) 0%, rgba(255, 244, 220, 0) 70%)",
    dimOpacity: 0.15,
    litOpacity: 1,
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1080px",
    wide: "1440px",
  },
};

export default theme;

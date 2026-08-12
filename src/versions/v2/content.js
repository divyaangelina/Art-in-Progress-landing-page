// ============================================================================
// content.js — every word on the v2 page, in one place.
//
// The layout is the deliverable here; the copy is placeholder. Rewrite any
// string in this file and the page updates — no component contains prose.
// Milestone entries drive the timeline: change `status` to move where the
// gold rail stops filling ("done" and "current" are lit, "next" is dim).
// ============================================================================

export const content = {
  hero: {
    eyebrow: "Art in Progress",
    // Rendered word by word from behind a mask. Keep it short — long
    // headlines fight the stagger.
    headline: "A gallery for artists who aren't finished yet.",
    subhead:
      "Targeted networking, curated opportunities, and structured feedback — replacing the feed with a room worth walking into.",
    cta: "Join the waitlist",
    scrollCue: "Scroll to enter",
  },

  manifesto: {
    eyebrow: "Why we exist",
    heading: "Not every piece worth seeing is finished.",
    // Each paragraph reveals as its own line-block on scroll.
    paragraphs: [
      "A sketch left mid-line. A palette that didn't work. Three attempts before the fourth one lands. This is what making actually looks like — and almost none of it survives on a feed built for polish and scroll.",
      "Art in Progress is a room for the work in between: the drafts, the experiments, the honest misses. A place to be seen by people who understand what growth costs, and who are building alongside you rather than just watching.",
    ],
    // Oversized quiet statement that wipes in between sections.
    interstitial: "The unfinished deserves a wall too.",
  },

  pillars: {
    eyebrow: "The pillars",
    heading: "Three rooms, one gallery.",
    items: [
      {
        numeral: "I",
        imageKey: "discoverImage",
        title: "Targeted Networking",
        description:
          "Meet the artists, mentors, and collaborators working in your medium — not a global feed of strangers.",
      },
      {
        numeral: "II",
        imageKey: "connectImage",
        title: "Curated Opportunities",
        description:
          "Open calls, residencies, and commissions selected for where you actually are in your practice.",
      },
      {
        numeral: "III",
        imageKey: "feedbackImage",
        title: "Structured Feedback",
        description:
          "Critique built for growth — specific, actionable, and from people who understand the craft.",
      },
    ],
  },

  timeline: {
    eyebrow: "The build",
    heading: "Where we are.",
    subhead:
      "We are building this in the open — the same way we are asking artists to work.",
    // status: "done" | "current" | "next"
    milestones: [
      {
        marker: "01",
        date: "Autumn 2025",
        title: "The idea takes shape",
        description:
          "Conversations with art students and early-career artists about what the feed was costing them. The shape of the problem got clear.",
        status: "done",
      },
      {
        marker: "02",
        date: "Winter 2025",
        title: "First prototype",
        description:
          "A rough build of the critique loop — post an unfinished piece, get structured feedback back. Ugly, but it worked.",
        status: "done",
      },
      {
        marker: "03",
        date: "Spring 2026",
        title: "The gallery model",
        description:
          "Rebuilt around rooms instead of a feed. Networking, opportunities, and feedback became three deliberate spaces.",
        status: "done",
      },
      {
        marker: "04",
        date: "Now",
        title: "Private studio beta",
        description:
          "A small group of artists using it daily while we sand down the edges. This is where the waitlist starts feeding in.",
        status: "current",
      },
      {
        marker: "05",
        date: "Next",
        title: "Opening night",
        description:
          "Doors open to everyone on the list. First public exhibition of work in progress.",
        status: "next",
      },
    ],
  },

  waitlist: {
    eyebrow: "Now accepting names",
    heading: "The gallery opens soon.",
    subhead: "Be among the first artists through the door.",
    placeholder: "your@email.com",
    cta: "Join the waitlist",
    success: "You're on the list. We'll be in touch before the doors open.",
    error: "Enter a valid email to join the waitlist.",
  },

  footer: "Art in Progress — the gallery opens soon.",
};

export default content;

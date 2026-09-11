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
    headline: "A platform for artists to turn potential into progress.",
    subhead:
      "Targeted networking, curated opportunities, and structured feedback. We’re replacing the feed with a path worth walking through.",
    cta: "Join the waitlist",
    scrollCue: "Scroll to enter",
  },

  manifesto: {
    eyebrow: "Why we exist",
    heading: "When your creative journey becomes your career.",
    // Each paragraph reveals as its own line-block on scroll.
    paragraphs: [
      "Art in Progress is more than a portfolio, it's a community that helps you build your future. Too many times, artists have heard that they can't make a living from their art. That's not true.",
      "In this digital age, we strive to provide every artist with the opportunity to turn their passion into a career and make an impact on the world.",
    ],
    // Oversized quiet statement that wipes in between sections.
    interstitial: "Your art. Your journey. Your career.",
  },

  pillars: {
    eyebrow: "The pillars",
    heading: "Three rooms. One gallery.",
    items: [
      {
        numeral: "I",
        imageKey: "discoverImage",
        title: "Targeted Networking",
        description:
          "Find your people. Collaborating with others can take your art to the next level in unexpected ways.",
      },
      {
        numeral: "II",
        imageKey: "connectImage",
        title: "Curated Opportunities",
        description:
          "Challenges, Scholarships, and Auditions. More opportunities means more chances to grow.",
      },
      {
        numeral: "III",
        imageKey: "feedbackImage",
        title: "Structured Feedback",
        description:
          "Grow deliberately. Get feedback that helps you improve, not just applause for what you already do well.",
      },
    ],
  },

  timeline: {
    eyebrow: "The build",
    heading: "Where we are.",
    subhead:
    "A work in progress, built alongside the artists it’s for.",
    // status: "done" | "current" | "next"
    milestones: [
      {
        marker: "01",
        date: "Spring 2026",
        title: "The idea takes shape",
        description:
          "We started by listening. Conversations with artists revealed a gap worth solving.",
        status: "done",
      },
      {
        marker: "02",
        date: "Summer 2026",
        title: "Artist Interviews",
        description:
          "30+ conversations with artists on their experiences and needs to pinpoint issues and pain points.",
        status: "done",
      },
      {
        marker: "03",
        date: "Summer 2026",
        title: "Initial Launch",
        description:
          "Received feedback from 20 early adopters. Found the right balance of features and solutions.",
        status: "done",
      },
      {
        marker: "04",
        date: "Now",
        title: "Landing Page",
        description:
          "Get a glimpse of what's coming. A Landing page to grow our waitlist and share our vision with the world.",
        status: "current",
      },
      {
        marker: "05",
        date: "Next",
        title: "Launch Platform",
        description:
          "Platform opens to everyone. First exhibition of Art in Progress. Be the first to know. Join the waitlist.",
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
    // Button label while the request is in flight.
    ctaPending: "Adding you…",
    success: "You're on the list. We'll be in touch before the doors open.",
    // Shown when the address itself is the problem.
    error: "Enter a valid email to join the waitlist.",
    // Shown when the address was fine but the request failed — a dropped
    // connection, or the waitlist service being down. Deliberately distinct
    // from `error`: retrying makes sense here, retyping does not.
    networkError: "Something went wrong on our end. Please try again.",
  },

  footer: "Art in Progress",
};

export default content;

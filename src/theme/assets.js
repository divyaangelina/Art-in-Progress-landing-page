// ============================================================================
// assets.js — Art in Progress image registry
// ----------------------------------------------------------------------------
// Every image used on the landing page is exported from here, and nowhere
// else. To swap an image, change its value in this file only — no component
// should ever contain a hardcoded image path.
//
// Final photography lives in public/images/ and is referenced by
// root-relative path. Source files are kept in new_photos/ at the project
// root; that folder is not served, so a new photo must be copied into
// public/images/ before its path here will resolve.
// ============================================================================

export const galleryImages = {
  // Hero — the brand mark, hung as the featured piece on the gallery wall.
  // The file is square with a solid black backdrop baked in; the .is-logo
  // frame variant in Hero.css strips the cream mat and blends that black
  // into the dark wall rather than the file being re-exported transparent.
  logo: {
    src: "/logo.png",
    alt:
      "The Art in Progress mark — an ornate gilt frame holding the words " +
      "'Art in Progress', with unfinished sketch lines spilling past its edge",
  },

  // Unused — the hero shows the logo above instead. Kept as a reference for
  // the framed-artwork treatment if a photograph ever returns to this slot.
  heroPainting: {
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=80",
    alt: "An abstract expressionist painting in warm ochre and charcoal tones, lit as if hanging in a gallery",
  },

  // Manifesto — the single large image beside the "Why we exist" copy
  aboutImage: {
    src: "/images/why_we_exist.jpg",
    alt:
      "A sweeping carved staircase curving upward through a sunlit hall, " +
      "its ornate ironwork balustrade climbing out of frame",
  },

  // Pillars — one image per pillar, framed as a small gallery painting.
  // Key names predate the current pillar titles; content.js maps them by
  // `imageKey`, so the pairing is: discover -> Targeted Networking,
  // connect -> Curated Opportunities, feedback -> Structured Feedback.
  discoverImage: {
    src: "/images/targeted_networking.jpg",
    alt:
      "A close circle of people stretching their hands up to meet above " +
      "their heads, lit from directly overhead",
  },
  connectImage: {
    src: "/images/curated_opportunities.jpg",
    alt:
      "A station platform billboard reading \"Dreams don't work until you " +
      "do\", two commuters passing it in motion blur",
  },
  feedbackImage: {
    src: "/images/structured_feedback.jpg",
    alt:
      "A mosaic stop sign whose tiles have been reset so the word reads " +
      "START in place of STOP",
  },
};

export default galleryImages;

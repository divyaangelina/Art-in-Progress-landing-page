// ============================================================================
// assets.js — Art in Progress image registry
// ----------------------------------------------------------------------------
// Every image used on the landing page is exported from here, and nowhere
// else. To swap an image, change its value in this file only — no component
// should ever contain a hardcoded image path.
//
// Placeholder images are sourced from Unsplash for now. Replace each value
// with a final asset path (e.g. "/images/hero-painting.jpg") when ready.
// ============================================================================

export const galleryImages = {
  // Hero — the featured "painting" behind the headline
  heroPainting: {
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=80",
    alt: "An abstract expressionist painting in warm ochre and charcoal tones, lit as if hanging in a gallery",
  },

  // About — the large single image beside the philosophy copy
  aboutImage: {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    alt: "A young artist's open sketchbook covered in charcoal studies and studio notes",
  },

  // Features — one image per pillar, framed as a small gallery painting
  discoverImage: {
    src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    alt: "A wall of framed artworks arranged in a curated gallery hang",
  },
  connectImage: {
    src: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?auto=format&fit=crop&w=900&q=80",
    alt: "Two artists in quiet conversation in front of a hung painting",
  },
  feedbackImage: {
    src: "https://images.unsplash.com/photo-1579762593175-20226054cad0?auto=format&fit=crop&w=900&q=80",
    alt: "A close, focused view of hands annotating a printed artwork proof",
  },
};

export default galleryImages;

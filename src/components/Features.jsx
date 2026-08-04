import FeatureCard from "./FeatureCard";
import { galleryImages } from "../theme/assets";
import "../styles/Features.css";

const pillars = [
  {
    numeral: "I",
    image: galleryImages.discoverImage,
    title: "Targeted Networking",
    description:
      "Meet the artists, mentors, and collaborators working in your medium — not a global feed of strangers.",
  },
  {
    numeral: "II",
    image: galleryImages.connectImage,
    title: "Curated Opportunities",
    description:
      "Open calls, residencies, and commissions selected for where you actually are in your practice.",
  },
  {
    numeral: "III",
    image: galleryImages.feedbackImage,
    title: "Structured Feedback",
    description:
      "Critique built for growth — specific, actionable, and from people who understand the craft.",
  },
];

export default function Features() {
  return (
    <section className="features section">
      <div className="container">
        <div className="features__header">
          <p className="eyebrow">The pillars</p>
          <h2 className="features__heading">Three rooms, one gallery.</h2>
        </div>

        <div className="features__grid">
          {pillars.map((pillar, index) => (
            <FeatureCard key={pillar.title} {...pillar} delay={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

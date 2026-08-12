import { useInView } from "../../../hooks/useInView";
import "../styles/FeatureCard.css";

// A single "exhibit": a small framed image with a bronze plaque beneath it,
// set typographically like a real museum wall label — numeral, title, and
// a one-line description in place of "medium."
export default function FeatureCard({ numeral, image, title, description, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`feature-card ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feature-card__frame">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>

      <div className="feature-card__plaque">
        <span className="feature-card__numeral">{numeral}</span>
        <div className="feature-card__plaque-text">
          <h3 className="feature-card__title">{title}</h3>
          <p className="feature-card__description">{description}</p>
        </div>
      </div>
    </div>
  );
}

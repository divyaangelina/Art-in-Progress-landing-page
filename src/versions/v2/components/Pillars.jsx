import RevealText from "./RevealText";
import { galleryImages } from "../../../theme/assets";
import { useInView } from "../../../hooks/useInView";
import { theme } from "../../../theme/theme";
import { content } from "../content";
import "../styles/Pillars.css";

// One exhibit: a framed image whose mat "opens" upward to uncover the art,
// with a museum wall label beneath. Each card carries its own observer plus
// a stagger delay, so the three read left-to-right like a hang.
function Pillar({ item, delay }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const image = galleryImages[item.imageKey];

  return (
    <article
      ref={ref}
      className={`v2-pillar ${inView ? "is-visible" : ""}`}
      style={{ "--stagger": `${delay}ms` }}
    >

      <div className="v2-pillar__frame">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>

      <div className="v2-pillar__plaque">
        <h3 className="v2-pillar__title">{item.title}</h3>
        <p className="v2-pillar__description">{item.description}</p>
      </div>
    </article>
  );
}

export default function Pillars() {
  const [headerRef, headerInView] = useInView({ threshold: 0.4 });

  return (
    <section className="v2-pillars section">
      <div className="container">
        <div
          className={`v2-pillars__header ${headerInView ? "is-visible" : ""}`}
          ref={headerRef}
        >
          <p className="eyebrow">{content.pillars.eyebrow}</p>
          <RevealText
            as="h2"
            className="v2-pillars__heading"
            text={content.pillars.heading}
          />
        </div>

        <div className="v2-pillars__grid">
          {content.pillars.items.map((item, index) => (
            <Pillar
              key={item.title}
              item={item}
              delay={index * theme.motion.stagger.loose}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

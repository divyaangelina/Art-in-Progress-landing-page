import RevealText from "./RevealText";
import { galleryImages } from "../../../theme/assets";
import { useInView } from "../../../hooks/useInView";
import { useElementScrollProgress } from "../../../hooks/useScrollProgress";
import { content } from "../content";
import "../styles/Manifesto.css";

// The philosophy section, staged in two beats:
//   1. an oversized statement that wipes in on a gold curtain — the visual
//      breath between the dark hero and the light gallery below
//   2. the two-column argument, where the image drifts against the copy
export default function Manifesto() {
  const [copyRef, copyInView] = useInView({ threshold: 0.25 });
  const [interstitialRef, interstitialInView] = useInView({ threshold: 0.6 });
  const [parallaxRef] = useElementScrollProgress({ from: "enter", to: "exit" });

  return (
    <>
      <div
        className={`v2-interstitial ${interstitialInView ? "is-visible" : ""}`}
        ref={interstitialRef}
      >
        <div className="container">
          <p className="v2-interstitial__text">
            {content.manifesto.interstitial}
          </p>
        </div>
      </div>

      <section className="v2-manifesto section">
        <div
          className={`v2-manifesto__grid container ${copyInView ? "is-visible" : ""}`}
          ref={copyRef}
        >
          <div className="v2-manifesto__image" ref={parallaxRef}>
            <figure className="v2-manifesto__frame">
              <img
                src={galleryImages.aboutImage.src}
                alt={galleryImages.aboutImage.alt}
                loading="lazy"
              />
            </figure>
          </div>

          <div className="v2-manifesto__copy">
            <p className="eyebrow">{content.manifesto.eyebrow}</p>

            <RevealText
              as="h2"
              className="v2-manifesto__heading"
              text={content.manifesto.heading}
            />

            {content.manifesto.paragraphs.map((paragraph, index) => (
              <p
                className="v2-manifesto__text"
                key={index}
                style={{ transitionDelay: `${400 + index * 160}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

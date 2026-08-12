import FramedArtwork from "./FramedArtwork";
import { galleryImages } from "../../../theme/assets";
import { useInView } from "../../../hooks/useInView";
import "../styles/About.css";

// Two-column philosophy statement. Talks less about the company and more
// about why it exists — the unfinished, the sketch, the draft, the failed
// attempt — as the real material of an artist's growth.
export default function About() {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section className="about section" ref={ref}>
      <div className={`about__grid container ${inView ? "is-visible" : ""}`}>
        <div className="about__image">
          <FramedArtwork image={galleryImages.aboutImage} size="large" />
        </div>

        <div className="about__copy">
          <p className="eyebrow">Why we exist</p>
          <h2 className="about__heading">
            Not every piece worth seeing is finished.
          </h2>
          <p className="about__text">
            A sketch left mid-line. A palette that didn&rsquo;t work. Three
            attempts before the fourth one lands. This is what making
            actually looks like — and almost none of it survives on a feed
            built for polish and scroll.
          </p>
          <p className="about__text">
            Art in Progress is a room for the work in between: the drafts,
            the experiments, the honest misses. A place to be seen by people
            who understand what growth costs, and who are building alongside
            you rather than just watching.
          </p>
        </div>
      </div>
    </section>
  );
}

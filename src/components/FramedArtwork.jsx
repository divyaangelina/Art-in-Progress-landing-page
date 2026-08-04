import "../styles/FramedArtwork.css";

// A single reusable "frame" — a mat, a border, and an image — used by the
// hero painting and every feature card, so every piece of art on the site
// hangs in a visually identical frame. Reads its border/mat/shadow tokens
// entirely from CSS variables set from theme.js.
export default function FramedArtwork({
  image,
  size = "large", // "large" | "small"
  className = "",
}) {
  return (
    <div className={`framed-artwork framed-artwork--${size} ${className}`}>
      <div className="framed-artwork__frame">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>
    </div>
  );
}

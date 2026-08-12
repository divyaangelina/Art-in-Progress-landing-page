import { useEffect, useState } from "react";
import V1 from "./versions/v1/V1";
import V2 from "./versions/v2/V2";
import { useThemeVars } from "./hooks/useThemeVars";
import "./styles/global.css";
import "./styles/VersionSwitch.css";

// Which landing page renders. v2 is the default; /?v=1 shows the original
// so the two layouts can be compared without switching branches. Remove
// this file's switcher (and versions/v1) once a direction is settled on.
function readVersion() {
  const requested = new URLSearchParams(window.location.search).get("v");
  return requested === "1" ? 1 : 2;
}

export default function App() {
  useThemeVars();
  const [version, setVersion] = useState(readVersion);

  // Keep the URL and the rendered version in step, including via the
  // browser's back button.
  useEffect(() => {
    const onPop = () => setVersion(readVersion());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function choose(next) {
    if (next === version) return;
    const url = next === 1 ? "?v=1" : window.location.pathname;
    window.history.pushState({}, "", url);
    setVersion(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <>
      {version === 1 ? <V1 /> : <V2 />}

      <div className="version-switch" role="group" aria-label="Page version">
        <button
          type="button"
          className={version === 1 ? "is-active" : ""}
          aria-pressed={version === 1}
          onClick={() => choose(1)}
        >
          v1
        </button>
        <button
          type="button"
          className={version === 2 ? "is-active" : ""}
          aria-pressed={version === 2}
          onClick={() => choose(2)}
        >
          v2
        </button>
      </div>
    </>
  );
}

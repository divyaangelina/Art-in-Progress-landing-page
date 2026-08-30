import V2 from "./versions/v2/V2";
import { useThemeVars } from "./hooks/useThemeVars";
import "./styles/global.css";

// Projects theme.js onto CSS custom properties, then hands off to the page.
// Everything visual is configured in src/theme/ — this file just wires it up.
export default function App() {
  useThemeVars();
  return <V2 />;
}

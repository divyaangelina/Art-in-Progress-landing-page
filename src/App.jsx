import V2 from "./versions/v2/V2";
import { useThemeVars } from "./hooks/useThemeVars";
import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./versions/v2/components/PrivacyPolicy";

// Projects theme.js onto CSS custom properties, then hands off to the page.
// Everything visual is configured in src/theme/ — this file just wires it up.
export default function App() {
  useThemeVars();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<V2 />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
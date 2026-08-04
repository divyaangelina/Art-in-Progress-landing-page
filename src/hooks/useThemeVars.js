import { useEffect } from "react";
import { theme } from "../theme/theme";

// Flattens theme.js into CSS custom properties on :root once, at mount.
// This is the ONLY place theme.js is translated into CSS — components
// consume tokens via var(--...) in their .css files, or by importing
// `theme` directly in JS when a raw value is needed (e.g. motion durations
// passed to a JS animation).
export function useThemeVars() {
  useEffect(() => {
    const root = document.documentElement;
    const vars = {
      "--color-wall": theme.colors.wall,
      "--color-wall-deep": theme.colors.wallDeep,
      "--color-marble": theme.colors.marble,
      "--color-marble-vein": theme.colors.marbleVein,
      "--color-ink": theme.colors.ink,
      "--color-ink-soft": theme.colors.inkSoft,
      "--color-ink-faint": theme.colors.inkFaint,
      "--color-night": theme.colors.night,
      "--color-night-soft": theme.colors.nightSoft,
      "--color-gold": theme.colors.gold,
      "--color-gold-deep": theme.colors.goldDeep,
      "--color-gold-faint": theme.colors.goldFaint,
      "--color-spotlight-warm": theme.colors.spotlightWarm,
      "--color-success": theme.colors.success,

      "--font-display": theme.typography.fontDisplay,
      "--font-body": theme.typography.fontBody,
      "--font-plaque": theme.typography.fontPlaque,

      "--scale-display": theme.typography.scale.display,
      "--scale-h1": theme.typography.scale.h1,
      "--scale-h2": theme.typography.scale.h2,
      "--scale-h3": theme.typography.scale.h3,
      "--scale-body": theme.typography.scale.body,
      "--scale-body-lg": theme.typography.scale.bodyLarge,
      "--scale-caption": theme.typography.scale.caption,
      "--scale-plaque": theme.typography.scale.plaque,

      "--weight-light": theme.typography.weight.light,
      "--weight-regular": theme.typography.weight.regular,
      "--weight-medium": theme.typography.weight.medium,
      "--weight-semibold": theme.typography.weight.semibold,

      "--line-tight": theme.typography.lineHeight.tight,
      "--line-snug": theme.typography.lineHeight.snug,
      "--line-normal": theme.typography.lineHeight.normal,
      "--line-relaxed": theme.typography.lineHeight.relaxed,

      "--tracking-tight": theme.typography.tracking.tight,
      "--tracking-wide": theme.typography.tracking.wide,
      "--tracking-wider": theme.typography.tracking.wider,

      "--space-xs": theme.spacing.xs,
      "--space-sm": theme.spacing.sm,
      "--space-md": theme.spacing.md,
      "--space-lg": theme.spacing.lg,
      "--space-xl": theme.spacing.xl,
      "--space-2xl": theme.spacing["2xl"],
      "--space-3xl": theme.spacing["3xl"],
      "--space-4xl": theme.spacing["4xl"],
      "--section-py": theme.spacing.sectionPaddingY,
      "--section-px": theme.spacing.sectionPaddingX,
      "--container-max": theme.spacing.containerMaxWidth,

      "--radius-sm": theme.radius.sm,
      "--radius-md": theme.radius.md,
      "--radius-lg": theme.radius.lg,
      "--radius-frame": theme.radius.frame,
      "--radius-pill": theme.radius.pill,

      "--shadow-frame": theme.shadows.frame,
      "--shadow-frame-hover": theme.shadows.frameHover,
      "--shadow-plaque": theme.shadows.plaque,
      "--shadow-card": theme.shadows.card,
      "--shadow-focus-ring": theme.shadows.focusRing,

      "--duration-fast": theme.motion.duration.fast,
      "--duration-base": theme.motion.duration.base,
      "--duration-slow": theme.motion.duration.slow,
      "--duration-spotlight": theme.motion.duration.spotlight,
      "--duration-curtain": theme.motion.duration.curtain,
      "--ease-standard": theme.motion.easing.standard,
      "--ease-enter": theme.motion.easing.enter,

      "--frame-border": theme.frames.border,
      "--frame-border-inner": theme.frames.borderInner,
      "--frame-mat": theme.frames.matWidth,
      "--frame-bg": theme.frames.background,

      "--spotlight-gradient": theme.spotlight.radialGradient,
    };

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);
}

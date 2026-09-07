import { I } from "./_icons.js";

/**
 * UI / Button — the live site button system. Variants: primary (ink),
 * ghost (outline), accent (violet, the hero-register register), wa-solid
 * (WhatsApp green). Size modifiers: --sm, --lg.
 * DSL audit, 2026-09-07: .btn--wa (plain outline) removed here and from
 * styles.css — zero markup references left anywhere on the live site
 * (confirmed live at productlab.studio/styles.css + app.js). .btn--accent
 * added — it shipped live 2026-09 and was never documented.
 */
export default {
  title: "UI/Button",
};

export const Primary = {
  render: () => `<div class="sb-pad"><button class="btn btn--primary">Talk to me</button></div>`,
};

export const Ghost = {
  render: () => `<div class="sb-pad"><button class="btn btn--ghost">Student entrance</button></div>`,
};

export const Accent = {
  name: "Accent (violet)",
  render: () => `<div class="sb-pad"><button class="btn btn--accent btn--lg">Start</button></div>
    <p class="ss-note" style="margin-top:var(--space-4);text-align:start;max-width:34rem">
      The register CTA on fixed-scene heroes (#/fleet S0, hero__cta). --pl-accent fill, white text and icon,
      hovers to --pl-accent-hover. Reserve for the one register-moving action on a screen.
    </p>`,
};

export const WhatsAppSolid = {
  name: "WhatsApp (solid)",
  render: () => `<div class="sb-pad"><a class="btn btn--wa-solid" href="#">${I.wa}<span class="btn__label">Talk to me</span></a></div>`,
};

export const Small = {
  name: "Small (--sm)",
  render: () => `<div class="sb-pad sb-row">
    <button class="btn btn--primary btn--sm">Primary</button>
    <button class="btn btn--ghost btn--sm">Ghost</button>
  </div>`,
};

export const AllVariants = {
  render: () => `<div class="sb-pad sb-row">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--accent">Accent</button>
    <a class="btn btn--wa-solid" href="#">${I.wa}<span class="btn__label">WhatsApp</span></a>
  </div>`,
};

import { I } from "./_icons.js";

/**
 * UI / Button — the live site button system. Variants: primary (ink),
 * ghost (outline), wa-solid (WhatsApp green), wa (outline). Size modifier: --sm.
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

export const WhatsAppSolid = {
  name: "WhatsApp (solid)",
  render: () => `<div class="sb-pad"><a class="btn btn--wa-solid" href="#">${I.wa}<span class="btn__label">Talk to me</span></a></div>`,
};

export const WhatsAppOutline = {
  name: "WhatsApp (outline)",
  render: () => `<div class="sb-pad"><a class="btn btn--wa" href="#">${I.wa}<span class="btn__label">Talk to me</span></a></div>`,
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
    <a class="btn btn--wa-solid" href="#">${I.wa}<span class="btn__label">WhatsApp</span></a>
    <a class="btn btn--wa" href="#">${I.wa}<span class="btn__label">WhatsApp</span></a>
  </div>`,
};

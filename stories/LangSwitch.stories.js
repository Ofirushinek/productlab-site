/**
 * Components / LangSwitch — the header language control. DESKTOP: a secondary,
 * square globe button (same look as Student entrance) that opens a dropdown to
 * pick English / עברית. MOBILE tray: a quiet text toggle that flips the language
 * on each tap. Here we show the desktop globe + its open dropdown. 2026-08-12.
 */
export default {
  title: "Components/LangSwitch",
};

const globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9Z"/></svg>';

const switcher = ({ open, current }) =>
  `<div class="langswitch${open ? " is-open" : ""}" style="margin:2rem">
     <button class="btn btn--ghost btn--sm btn--icon langswitch__btn" type="button" aria-haspopup="menu" aria-expanded="${open}" aria-label="Choose language">${globe}</button>
     <div class="langswitch__menu" role="menu" aria-label="Choose language"${open ? "" : " hidden"}>
       <button class="langswitch__item" type="button" role="menuitem"${current === "en" ? ' aria-current="true"' : ""}>English</button>
       <button class="langswitch__item" type="button" role="menuitem"${current === "he" ? ' aria-current="true"' : ""}>עברית</button>
     </div>
   </div>`;

export const Closed = {
  render: () => `<div class="sb-pad">${switcher({ open: false, current: "he" })}</div>`,
};

export const OpenHebrewActive = {
  name: "Open — Hebrew active",
  render: () => `<div class="sb-pad" style="min-height:220px">${switcher({ open: true, current: "he" })}</div>`,
};

export const OpenEnglishActive = {
  name: "Open — English active",
  render: () => `<div class="sb-pad" style="min-height:220px">${switcher({ open: true, current: "en" })}</div>`,
};

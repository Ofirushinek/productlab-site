/**
 * Components / Working-canvas cursors: the colorful tool-tagged collaborator
 * cursors that wander the WHY NOW section like a live multiplayer file — the
 * visual story of one person with a whole team's output. Each cursor = a
 * brand-colored arrow + a white chip carrying a real tool logo. On the live
 * site they drift on curved, hand-held paths (see app.js wireWhyCursors); this
 * story documents the static component + the five tools. DS tokens only.
 */
export default { title: "Components/WorkingCanvas" };

const LOGOS = {
  figma: `<svg viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>`,
  claude: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#CC785C"><path d="M12 2.2c.55 2.9 1.2 4.2 3.05 4.2 0 0-2.1 1.15-2.1 1.15L18 4.35l-3.4 4.6 5.55-2.1-5 3.3 5.85.05-5.85.9 4.9 3.2-5.4-2.35 3 5.05-3.85-4.05.55 5.85-1.9-5.55-1.9 5.55.55-5.85-3.85 4.05 3-5.05-5.4 2.35 4.9-3.2-5.85-.9 5.85-.05-5-3.3 5.55 2.1L4 4.35l5.05 3.2L5.65 2.95 9.7 6.4C11.55 6.4 11.45 5.1 12 2.2z"/></svg>`,
  gdocs: `<svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M6.5 2h7L18 6.5V20a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
      <path fill="#A1C2FA" d="M13.5 2 18 6.5h-4.5z"/>
      <rect x="7.3" y="11" width="9.4" height="1.3" rx=".65" fill="#fff"/>
      <rect x="7.3" y="14" width="9.4" height="1.3" rx=".65" fill="#fff"/>
      <rect x="7.3" y="17" width="6.4" height="1.3" rx=".65" fill="#fff"/></svg>`,
  lovable: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#FF4D67" d="M12 21s-6.9-4.3-9.3-8.4C1 9.4 2.6 6 6 6c2 0 3.2 1.2 4 2.3C10.8 7.2 12 6 14 6c3.4 0 5 3.4 3.3 6.6C18.9 16.7 12 21 12 21z"/></svg>`,
  gemini: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#6C7BF0" d="M12 2c.5 4.6 3.4 7.5 8 8-4.6.5-7.5 3.4-8 8-.5-4.6-3.4-7.5-8-8 4.6-.5 7.5-3.4 8-8z"/></svg>`,
};
const COLORS = { figma: "#F24E1E", claude: "#CC785C", gdocs: "#4285F4", lovable: "#FF4D67", gemini: "#6C7BF0" };
const ARROW = `<svg class="pcursor__arrow" viewBox="0 0 24 24" width="22" height="22"><path d="M5 2.5 5 20.5 9.7 16 12.7 22.5 15.5 21.2 12.5 14.8 19 14.8Z"/></svg>`;

const cursor = (id) =>
  `<span class="pcursor" data-tool="${id}" style="position:relative;display:inline-block;--pc:${COLORS[id]}">
     ${ARROW}<span class="pcursor__tag">${LOGOS[id]}</span>
   </span>`;

export const AllCursors = {
  name: "All five tool-cursors",
  render: () =>
    `<div class="sb-pad sb-row" style="gap:52px;background:var(--pl-bg-alt)">
       ${Object.keys(LOGOS).map((id) => `<span style="display:inline-block;width:48px;height:44px">${cursor(id)}</span>`).join("")}
     </div>`,
};

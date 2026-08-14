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
  claude: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#CC785C" stroke-width="1.7" stroke-linecap="round"><path d="M12 2.5V21.5M2.5 12H21.5M20.2 7.25 3.8 16.75M16.75 3.8 7.25 20.2M7.25 3.8 16.75 20.2M3.8 7.25 20.2 16.75"/></svg>`,
  gdocs: `<svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M7 2h6.5L19 6.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
      <path fill="#A1C2FA" d="M13.5 2 19 6.5h-5.5z"/>
      <rect x="8" y="11" width="8" height="1.4" rx=".7" fill="#fff"/>
      <rect x="8" y="14" width="8" height="1.4" rx=".7" fill="#fff"/>
      <rect x="8" y="17" width="5.5" height="1.4" rx=".7" fill="#fff"/></svg>`,
  chatgpt: `<svg viewBox="0 0 24 24" fill="#10A37F" aria-hidden="true"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.5-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.5 2.9A5.98 5.98 0 0 0 13.26 22a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zm-9.02 12.6a4.48 4.48 0 0 1-2.88-1.03l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17.02.06v5.58a4.5 4.5 0 0 1-4.49 4.21zM3.6 18.3a4.47 4.47 0 0 1-.54-3.02l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33l-.03.06L9.74 20.5A4.5 4.5 0 0 1 3.6 18.3zM2.34 7.9a4.48 4.48 0 0 1 2.34-1.97v5.68a.77.77 0 0 0 .39.68l5.82 3.35-2.02 1.17-.07-.01-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86-5.83-3.4L15.12 7.2l.07-.01 4.83 2.78a4.5 4.5 0 0 1-.68 8.12v-5.68a.78.78 0 0 0-.4-.66zm2.01-3.02-.14-.09-4.77-2.77a.78.78 0 0 0-.79 0L9.42 9.24V6.9l.03-.06 4.83-2.78a4.5 4.5 0 0 1 6.68 4.66zM8.32 12.86l-2.02-1.16-.02-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.78.78 0 0 0-.39.68zm1.1-2.36 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z"/></svg>`,
  gemini: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#6C7BF0" d="M12 2c.4 5.2 4.8 9.6 10 10-5.2.4-9.6 4.8-10 10-.4-5.2-4.8-9.6-10-10 5.2-.4 9.6-4.8 10-10z"/></svg>`,
};
const COLORS = { figma: "#F24E1E", claude: "#CC785C", gdocs: "#4285F4", chatgpt: "#10A37F", gemini: "#6C7BF0" };
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

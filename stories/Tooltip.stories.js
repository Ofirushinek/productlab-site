import { I } from "./_icons.js";

/**
 * UI / Tooltip — dark bubble for ICON-ONLY controls.
 * RULE: any button/link that shows only an icon MUST carry `data-tooltip="Label"`
 * (label matches its aria-label). Shows on hover AND keyboard focus.
 * Add `data-tip-pos="top"` to flip the bubble above.
 */
export default {
  title: "UI/Tooltip",
};

// A generic, always-visible icon button (the live nav icon buttons are
// conditionally shown, so we use a neutral one here to demo the tooltip).
const iconBtn = (label, svg, extra = "") =>
  `<button type="button" aria-label="${label}" data-tooltip="${label}" ${extra}
     style="width:40px;height:40px;display:grid;place-items:center;cursor:pointer;
            border:1px solid var(--pl-border-strong);border-radius:var(--radius-md);
            background:var(--pl-surface);color:var(--pl-fg)">
     <span style="width:20px;height:20px;display:inline-flex">${svg}</span>
   </button>`;

export const Bottom = {
  name: "Default (below)",
  render: () => `<div class="sb-pad" style="padding-top:24px">${iconBtn("Menu", I.menu)}</div>`,
};

export const Top = {
  name: "Above (data-tip-pos)",
  render: () => `<div class="sb-pad" style="padding-top:64px">${iconBtn("Menu", I.menu, 'data-tip-pos="top"')}</div>`,
};

export const IconOnlyControls = {
  name: "Icon-only controls (the rule)",
  render: () =>
    `<div class="sb-pad sb-row" style="padding-top:24px; gap:32px">
       ${iconBtn("Menu", I.menu)}
       ${iconBtn("Account", I.user)}
       ${iconBtn("Close", I.x)}
     </div>`,
};

export const AlwaysOpenPreview = {
  name: "Always open (docs)",
  parameters: {
    docs: { description: { story: "Forced-open so Chromatic/docs capture the bubble; not for production." } },
  },
  render: () => {
    const wrap = document.createElement("div");
    wrap.className = "sb-pad";
    wrap.style.paddingTop = "72px";
    wrap.innerHTML = iconBtn("LinkedIn", I.linkedin, 'data-tip-pos="top"');
    const style = document.createElement("style");
    style.textContent =
      '[data-tooltip]::after,[data-tooltip]::before{opacity:1 !important;transform:translateX(-50%) translateY(0)!important}';
    wrap.appendChild(style);
    return wrap;
  },
};

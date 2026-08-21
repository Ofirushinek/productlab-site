import { tokensByPrefix, resolve, swatches, tokenTable, note, card, mono, rootTokens } from "./_tokens.js";

/**
 * Foundations — the alphabet of the system: color, type, space, radius, shadow,
 * the control ladder, motion and the layout frame. Every value on these pages is
 * read live out of styles.css at render time, so this section cannot drift from
 * what ships.
 */
export default {
  title: "Foundations",
  parameters: { layout: "padded" },
};

/* Tokens that are not flat colors need a painted stand-in. */
const FILL = {
  "--pl-surface": (v) => `background:${v};border-bottom:1px solid var(--pl-border)`,
  "--pl-elevated": (v) => `background:${v};box-shadow:var(--shadow-pl-md)`,
  "--pl-border": (v) => `background:var(--pl-bg);box-shadow:inset 0 0 0 5px ${v}`,
  "--pl-border-strong": (v) => `background:var(--pl-bg);box-shadow:inset 0 0 0 5px ${v}`,
  "--pl-grid-dot": (v) => `background:radial-gradient(${v} 1px, var(--pl-surface) 1px);background-size:12px 12px`,
};

const paint = ([name, value]) => [name, value, FILL[name] ? FILL[name](value) : `background:${value}`];

export const Color = {
  name: "Color",
  render: () =>
    note(`The ground is warm paper, the ink is near black, and exactly one violet carries every action.
      Content ink is <code>--pl-fg-body</code>; the two lighter grays are for true meta only, never for text
      somebody has to read.`) +
    swatches(
      tokensByPrefix("--pl-bg", "--pl-surface", "--pl-elevated", "--pl-fg", "--pl-border", "--pl-accent", "--pl-illo", "--pl-grid", "--pl-tooltip")
        .map(paint)
    ),
};

export const CrewPalette = {
  name: "Crew palette",
  render: () =>
    note(`The felt cast colors. Playful accents only: never text, never controls, never status.
      Role mapping is final: purple = Designer, orange = Strategist, teal = Architect, yellow stays unassigned.`) +
    swatches(tokensByPrefix("--pl-crew-").map(paint)),
};

export const Status = {
  name: "Status",
  render: () =>
    note(`Semantic funnel-stage tokens for the students table. Three of the six alias into the palette on
      purpose, so a brand change carries through; only blue, green and red are new hues a six-stage funnel needs.
      Referenced by <code>.roster__stage--*</code> and nowhere else.`) +
    swatches(tokensByPrefix("--pl-stage-").map(([n, v]) => [n, v, `background:${resolve(n)}`])),
};

export const Typography = {
  name: "Typography",
  render: () => {
    const weight = (n) => (n === "--text-caption" ? 600 : n.includes("h1") || n.includes("h2") || n.includes("display") ? 700 : 500);
    const rows = tokensByPrefix("--text-").map(([name, value]) => `
      <div style="display:flex;align-items:baseline;gap:20px;padding:12px 0;border-bottom:1px dashed var(--pl-border)">
        <span style="min-width:260px;flex:none;${mono};font-weight:500;color:var(--pl-fg-secondary)">${name}<br>${value}</span>
        <span style="font-size:${value};font-weight:${weight(name)};color:var(--pl-fg);line-height:1.15;
          ${name === "--text-caption" ? "letter-spacing:.06em;text-transform:uppercase" : ""}">Product Lab</span>
      </div>`).join("");
    return (
      note(`Inter carries Latin, Heebo carries Hebrew, both at 400 to 700. Body is medium 500 and headings are
        bold 700: there is no thin text in this system. The four display sizes are fluid clamps, so the scale
        compresses on a phone instead of wrapping.`) +
      card(rows, "2px 18px")
    );
  },
};

export const Spacing = {
  name: "Spacing",
  render: () => {
    const bars = tokensByPrefix("--space-").map(([name, value]) => `
      <div style="text-align:center">
        <div style="width:72px;height:${value};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);
          border-radius:var(--radius-sm)"></div>
        <div style="${mono};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">${value}</div>
      </div>`).join("");
    return (
      note(`An 8 px grid with a single 4 px half-step for tight optical gaps. Gap, padding and margin come from
        this scale; an ad hoc rem value is a bug, not a decision.`) +
      `<div style="display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap">${bars}</div>` +
      `<div style="margin-top:22px">${tokenTable(tokensByPrefix("--space-"))}</div>`
    );
  },
};

export const RadiusAndShadow = {
  name: "Radius and shadow",
  render: () => {
    const radii = tokensByPrefix("--radius-").map(([name, value]) => `
      <div style="width:104px;height:78px;background:var(--pl-surface);border:1.5px solid var(--pl-border-strong);
        border-radius:${value};display:flex;align-items:center;justify-content:center;${mono}">${value}</div>`).join("");
    const shadows = tokensByPrefix("--shadow-pl-").map(([name, value]) => `
      <div style="width:156px;height:88px;background:var(--pl-surface);border-radius:var(--radius-md);
        box-shadow:${value};display:flex;align-items:center;justify-content:center;${mono};text-align:center">
        ${name.replace("--shadow-pl-", "")}</div>`).join("");
    return (
      note(`A corner is one of the radius rungs, nothing in between. Elevation is four steps of the same soft,
        low-contrast shadow: paper lifting off paper, never a hard drop.`) +
      `<div style="display:flex;gap:14px;flex-wrap:wrap">${radii}</div>
       <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:30px">${shadows}</div>`
    );
  },
};

export const ControlLadder = {
  name: "Control ladder",
  render: () => {
    const use = {
      "--ctl-xs": "quiet inline toggles",
      "--ctl-sm": "header and secondary buttons",
      "--ctl-md": "primary buttons, form fields",
      "--ctl-lg": "hero-scale CTA",
    };
    const rungs = tokensByPrefix("--ctl-").map(([name, value]) => `
      <div style="text-align:center">
        <div style="width:104px;height:${value};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);
          border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;${mono}">${value}</div>
        <div style="${mono};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">${name.replace("--ctl-", "")}</div>
      </div>`).join("");
    const icons = tokensByPrefix("--icon-").map(([name, value]) => `
      <span style="display:inline-flex;align-items:center;gap:8px;${mono};font-weight:500;color:var(--pl-fg-secondary)">
        <span style="width:${value};height:${value};background:var(--pl-fg);border-radius:var(--radius-sm);display:inline-block"></span>
        ${name} ${value}</span>`).join("");
    return (
      note(`Every interactive control is one of four heights and nothing between them, so controls always line up
        with each other and with the spacing scale. An icon-only control is a square at its own rung. Adding a
        fifth rung is a design-system decision, not a local override.`) +
      `<div style="display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap">${rungs}</div>
       <p class="section-lead" style="margin:26px 0 10px">Icons pair to the rungs: 16 on xs and sm, 20 on md, 24 on lg.</p>
       <div style="display:flex;gap:26px;flex-wrap:wrap;align-items:center">${icons}</div>` +
      `<div style="margin-top:22px">${tokenTable(tokensByPrefix("--ctl-"), {
        head: "Used for",
        cell: (n) => use[n] || "",
      })}</div>`
    );
  },
};

export const Motion = {
  name: "Motion",
  render: () => `
    <style>
      .sb-ease { display:flex;align-items:center;gap:14px;padding:26px;background:var(--pl-surface);
        border:1px solid var(--pl-border);border-radius:var(--radius-md) }
      .sb-ease__ball { width:22px;height:22px;border-radius:99px;background:var(--pl-accent);
        animation:sb-slide 2.4s var(--ease-pl) infinite alternate }
      @keyframes sb-slide { from { transform:translateX(0) } to { transform:translateX(240px) } }
      @media (prefers-reduced-motion: reduce) { .sb-ease__ball { animation:none } }
    </style>
    ${note(`One easing token drives every transition in the product: a fast start that settles rather than
      bounces. Presses scale to 0.975, reveals fade and rise. Nothing loops, this demo excepted.`)}
    <div class="sb-ease"><span class="sb-ease__ball"></span></div>
    <div style="margin-top:18px">${tokenTable(tokensByPrefix("--ease-"))}</div>`,
};

export const Layout = {
  name: "Layout",
  render: () =>
    note(`The page frame. Content sits in a 1120 px measure, prose narrows to 760, and the horizontal pad is
      fluid so a phone never gets a 48 px gutter. The header is one small control plus 12 px of breathing on
      each side, which is where 64 px comes from.`) +
    tokenTable(tokensByPrefix("--pad-x", "--maxw", "--nav-h")),
};

export const AllTokens = {
  name: "All tokens",
  render: () => {
    const all = rootTokens();
    return (
      note(`Every custom property declared on <code>:root</code> in the production stylesheet, in declaration
        order. ${all.length} tokens. This table is generated from the stylesheet itself at render time, so it is
        the index, not a copy of one.`) +
      tokenTable(all, {
        head: "Computed",
        cell: (n, v) => {
          const r = resolve(n);
          return r === v ? "" : `<span style="${mono};font-weight:500;color:var(--pl-fg-secondary)">${r}</span>`;
        },
      })
    );
  },
};

/* Live token reader.
 *
 * Every foundations story reads its values from the REAL stylesheet at runtime
 * (the :root block of styles.css, which preview.ts imports), never from values
 * re-typed into this file. Add a token to styles.css and it shows up here on the
 * next reload; change one and this page changes with it. A design-system doc that
 * carries its own copy of the values is a second source of truth, and it rots.
 */

/* Ordered [name, value] pairs of every custom property declared on :root. */
export function rootTokens() {
  const out = [];
  const seen = new Set();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin (the font stylesheet)
    }
    for (const rule of Array.from(rules || [])) {
      // Chrome gives every rule a truthy .cssRules, so branch on the type.
      if (!(rule instanceof CSSStyleRule)) continue;
      if (!/(^|,)\s*:root\s*$/.test(rule.selectorText)) continue;
      for (const prop of Array.from(rule.style)) {
        if (!prop.startsWith('--') || seen.has(prop)) continue;
        seen.add(prop);
        out.push([prop, rule.style.getPropertyValue(prop).trim()]);
      }
    }
  }
  return out;
}

/* Tokens whose name starts with any of the given prefixes, in declaration order. */
export function tokensByPrefix(...prefixes) {
  return rootTokens().filter(([name]) => prefixes.some((p) => name.startsWith(p)));
}

/* Resolve a token through the cascade (follows var() aliases like --pl-stage-*). */
export function resolve(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* ---- shared story chrome -------------------------------------------------- */

/* Token names and CSS values are code, not prose: they stay LTR and left-aligned
 * even when the story is previewed in Hebrew, or bidi mirrors them into nonsense. */
export const mono =
  'font:600 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;unicode-bidi:isolate;text-align:left';

export function note(text) {
  return `<p class="section-lead" style="max-width:76ch;margin:0 0 16px">${text}</p>`;
}

export function card(inner, pad = '18px') {
  return `<div style="background:var(--pl-surface);border:1px solid var(--pl-border);
    border-radius:var(--radius-md);padding:${pad}">${inner}</div>`;
}

/* Swatch grid. `fill` is the CSS painted into the chip, so a token that is not a
 * flat color (a border, a dotted grid) can still show what it actually does. */
export function swatches(items) {
  const cell = ([name, value, fill]) => `
    <figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
      overflow:hidden;background:var(--pl-surface)">
      <div style="height:60px;${fill || `background:${value}`}"></div>
      <figcaption style="padding:8px 10px;${mono};color:var(--pl-fg)">${name}
        <span style="display:block;font-weight:500;color:var(--pl-fg-secondary)">${value}</span>
      </figcaption>
    </figure>`;
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(184px,1fr));gap:10px">
    ${items.map(cell).join('')}</div>`;
}

/* Two-column token table: name, live value. */
export function tokenTable(pairs, extra) {
  const head = `<tr style="background:var(--pl-bg)">
    ${['Token', 'Value', extra && extra.head].filter(Boolean)
      .map((h) => `<th style="text-align:start;padding:8px 12px;border-bottom:1px solid var(--pl-border);${mono}">${h}</th>`)
      .join('')}</tr>`;
  const rows = pairs.map(([name, value]) => `<tr>
    <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${mono};white-space:nowrap">${name}</td>
    <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${mono};font-weight:500;color:var(--pl-fg-secondary);white-space:nowrap">${value}</td>
    ${extra ? `<td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08)">${extra.cell(name, value)}</td>` : ''}
  </tr>`).join('');
  return `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
    background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
    ${head}${rows}</table></div>`;
}

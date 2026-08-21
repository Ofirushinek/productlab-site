/**
 * Overview — what this system is, the laws that hold it together, and the
 * standing consistency audit. Read this page before adding anything.
 */
export default {
  title: "Overview",
  parameters: { layout: "padded" },
};

export const TheSystem = {
  name: "The system",
  render: () => `
  <div style="max-width:72ch">
    <span class="eyebrow">Single source of truth</span>
    <h1 class="section-title" style="font-size:2rem;margin-top:.4rem">The Product Lab design system</h1>
    <p class="section-lead">One visual language: warm paper, near-black ink, a single violet accent, and a small
      cast of felt colors used only for playful moments. The system is plain CSS custom properties in
      <code>styles.css</code>, the same file productlab.studio serves. This Storybook imports that stylesheet
      directly and lifts its markup from the live site, so a story physically cannot drift from what ships.</p>
    <p class="section-lead">The site is bilingual with Hebrew as the default, so every story has to hold in both
      directions. Use the <strong>Direction</strong> control in the toolbar and check RTL before you call
      anything done.</p>
    <p class="section-lead"><strong>Rule of engagement: reuse before creating.</strong> If a token or a component
      here covers the need, use it. If it genuinely does not exist, it enters the system here first, then it
      ships. A one-off stays a one-off; it does not get a token.</p>
    <p class="section-lead" style="color:var(--pl-fg-secondary)">Foundations are generated from the stylesheet at
      render time. Components are the site's own markup. Neither carries a second copy of a value.</p>
  </div>`,
};

export const SystemLaws = {
  name: "System laws",
  render: () => {
    const law = (title, body, src) => `
      <li style="background:var(--pl-surface);border:1px solid var(--pl-border);
        border-inline-start:3px solid var(--pl-accent);border-radius:var(--radius-md);
        padding:11px 15px;font-size:14px;list-style:none">
        <strong style="color:var(--pl-fg)">${title}</strong> ${body}
        <span style="display:block;font:500 11px/1.6 ui-monospace,Menlo,monospace;color:var(--pl-fg-muted);margin-top:4px;direction:ltr;unicode-bidi:isolate;text-align:left">${src}</span>
      </li>`;
    return `<ul style="display:grid;gap:8px;padding:0;margin:0;max-width:78ch">
      ${law("A button is never narrower than its height.", "min-width equals height on every control, so an icon-only button is a perfect square.", ".btn { min-width: var(--ctl-md) } and .btn--icon")}
      ${law("Four control heights, no fifth.", "Every interactive control sits on the ladder: 32, 40, 48 or 56.", "--ctl-xs / --ctl-sm / --ctl-md / --ctl-lg")}
      ${law("No thin text.", "Body is medium 500 and headings are bold 700. Weights under 500 do not exist here.", "body { font-weight: 500 } and h1 to h4 { font-weight: 700 }")}
      ${law("Content ink is near black.", "Gray is reserved for true meta: kickers, captions, roles. Never for text somebody has to read.", "--pl-fg-body for content, --pl-fg-secondary for meta")}
      ${law("Crisp edges.", "Borders are visible and distinct. Nothing washed out.", "--pl-border and --pl-border-strong")}
      ${law("Never show a tooltip while its own menu is open.", "Suppressed once, globally, not patched per component.", "[data-tooltip][aria-expanded=true] pseudo-elements")}
      ${law("Every clickable thing says so.", "Pointer cursor set once as a global base rule; disabled shows not-allowed.", "one global cursor rule")}
      ${law("8 px spacing grid,", "with a single 4 px half-step for tight optical gaps. No ad hoc rem values.", "--space-1 to --space-7")}
      ${law("A corner is a radius rung.", "4, 8, 16, 24 or 32. Nothing in between.", "--radius-sm to --radius-2xl")}
      ${law("The wordmark never wraps.", "Product Lab is one unbreakable unit everywhere, and never mirrors in RTL.", "white-space:nowrap and width:max-content")}
      ${law("Hebrew and English ship together.", "Any component or copy change lands in both languages, and the layout holds in both directions.", "I18N.he plus I18N.en, logical properties")}
      ${law("No long dashes, anywhere.", "Separation is a small accent dot. This one is a ship gate.", "eyebrow dot, house law 2026-08-06")}
    </ul>`;
  },
};

export const ButtonAudit = {
  name: "Button audit",
  render: () => {
    const VERDICT = { SYSTEM: "#15803d", KEEP: "#15803d", DEPRECATE: "#b4443a", EXCEPTION: "#8a5f14", WATCH: "#8a5f14" };
    const rows = [
      [".btn", "Base: 48 high, radius 8, weight 600, min-width equals height", "SYSTEM"],
      [".btn--primary", "Ink fill. The one strong action on a surface", "KEEP"],
      [".btn--ghost", "Outline. Secondary actions", "KEEP"],
      [".btn--accent", "Violet fill. The hero registration CTA", "KEEP"],
      [".btn--wa-solid", "WhatsApp green. The booking CTA", "KEEP"],
      [".btn--wa", "Old WhatsApp outline. No markup references it any more; only the CTA-band override keeps it alive", "DEPRECATE"],
      [".login__google", "Google sign-in only. A third-party logo needs neutral ground", "EXCEPTION"],
      [".btn--sm / .btn--lg", "Ladder size modifiers, 40 and 56", "SYSTEM"],
      [".btn--icon", "Any icon-only control. Square at its own rung", "SYSTEM"],
      [".hero__cta .btn", "Fluid clamp height in container units, so the hero CTA sits off the ladder by design", "WATCH"],
    ];
    return `
  <div style="max-width:82ch">
    <span class="eyebrow">Consistency audit</span>
    <h2 style="font-size:1.4rem;margin-top:.4rem">One base, four intents, one dead variant</h2>
    <div style="overflow-x:auto;margin-top:1rem">
    <table style="width:100%;border-collapse:collapse;background:var(--pl-surface);
      border:1px solid var(--pl-border);border-radius:var(--radius-md);font-size:13.5px">
      <tr style="background:var(--pl-bg)">
        ${["Variant", "Used for", "Verdict"].map((h) => `<th style="text-align:start;padding:8px 12px;border-bottom:1px solid var(--pl-border)">${h}</th>`).join("")}
      </tr>
      ${rows.map((r) => `<tr>
        <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);font:600 12px ui-monospace,Menlo,monospace;white-space:nowrap;direction:ltr;unicode-bidi:isolate;text-align:left">${r[0]}</td>
        <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08)">${r[1]}</td>
        <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);font-weight:700;color:${VERDICT[r[2]]}">${r[2]}</td>
      </tr>`).join("")}
    </table></div>
    <p class="section-lead" style="margin-top:1rem"><strong>Verdict.</strong> The geometry is disciplined: one base
      class, ladder sizes, the min-width law. Two things are open. <code>.btn--wa</code> is dead markup-side and
      should be deleted along with its CTA-band override, leaving exactly four intents plus the Google exception.
      And the hero CTA overrides the ladder with container-query clamps: deliberate for a hero that has to fit a
      fixed scene, but it is the one place a control height is not a token, so it stays on the watch list.</p>
  </div>`;
  },
};

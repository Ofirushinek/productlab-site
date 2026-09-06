// Components / Fleet controls - the three additions the #/fleet page brought
// into the system (Design System Lead ruling, 2026-09-05).
// Same convention as every other story here: markup lifted from app.js render
// functions, rendered against the production styles.css, no values re-typed.
//
//   .field__hint   EXTEND of .field  - quiet meta line under a control (char counter)
//   .chip--choice  EXTEND of .chip   - selectable single-choice chip on the control ladder (sm, 40px)
//   .skel          NEW primitive     - loading skeleton line, opacity pulse, reduced-motion aware
//
// Canonical selection state for .chip--choice is [aria-checked="true"] on a
// role="radio" button inside role="radiogroup". aria-pressed is NOT used
// (a radio cannot be pressed; two selection attributes on one control is a bug).

export default { title: 'Components/Fleet controls' };

export const FieldHint = () => `
  <div style="max-width:34rem">
    <div class="field">
      <label class="field__label" for="fh-demo">Your answer</label>
      <textarea class="reg__note" id="fh-demo" rows="4" maxlength="300" dir="auto">Every screen before it goes to dev.</textarea>
      <div class="field__hint"><span class="ltr-iso" dir="ltr">37/300</span></div>
    </div>
    <div class="field" style="margin-top:var(--space-5)">
      <label class="field__label" for="fh-max">At the limit (.is-max)</label>
      <textarea class="reg__note" id="fh-max" rows="2" maxlength="300" dir="auto"></textarea>
      <div class="field__hint is-max"><span class="ltr-iso" dir="ltr">300/300</span></div>
    </div>
    <p class="ss-note" style="margin-top:var(--space-5);text-align:start">
      Caption size (--text-caption, 500), --pl-fg-secondary, text-align:end so it sits at the
      reading-end edge in both directions. Numbers stay LTR via .ltr-iso. .is-max = --pl-stage-dropped.
    </p>
  </div>`;

export const ChipChoice = () => `
  <div class="cta-row" role="radiogroup" aria-label="Have you tried yet?" style="justify-content:center;max-width:34rem">
    <button type="button" class="chip chip--choice" role="radio" aria-checked="false">Chat</button>
    <button type="button" class="chip chip--choice" role="radio" aria-checked="false">No</button>
    <button type="button" class="chip chip--choice" role="radio" aria-checked="true">Claude Code, and something broke</button>
  </div>
  <p class="ss-note" style="margin-top:var(--space-5);text-align:start;max-width:34rem">
    Builds on .chip (surface, --pl-border-strong, 600, --text-sm). Height --ctl-sm (40px), min-width
    --ctl-sm, padding-inline --space-4. Hover border --pl-fg (= .btn--ghost:hover). Focus ring = .input:focus
    (accent 22%). Selected = accent 12% tint over --pl-surface, accent border, accent text - the same
    tint pill as .agentcard__tag / .pcrumb__chip--target. Single-select only; multi-select is a new variant, ask first.
  </p>`;

export const Skeleton = () => `
  <div class="grid grid--3">
    ${['', '', ''].map(() => `
    <div class="card" aria-hidden="true">
      <span class="skel skel--tag"></span><span class="skel skel--h"></span>
      <span class="skel"></span><span class="skel"></span><span class="skel skel--short"></span>
    </div>`).join('')}
  </div>
  <p class="ss-note" style="margin-top:var(--space-5);text-align:start">
    Shaped like the content it waits for (tag, heading, three lines). --pl-bg-alt, --radius-sm,
    opacity pulse 1.4s on --ease-pl, no gradient shimmer, animation:none under prefers-reduced-motion.
    Sizes: line 0.9em · --skel--tag height --space-5 · --skel--h height --text-h3 (canonical; the first
    build shipped 1.4rem / 1.25rem raw, PD fix pending). Wrap in role="status" aria-live="polite" aria-busy="true".
  </p>`;

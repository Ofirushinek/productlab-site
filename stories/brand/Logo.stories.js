import {
  spec, measured, G, ORDER, A, mono, lead, h, card, stage, figure, grid, rule, facts, chip,
} from './_brand.js';

/**
 * Brand / Logo - the Product Lab identity, approved by Ofir on 2026-08-22.
 *
 * The Marketing Designer owns the mark and the brand book. This section is the
 * design system's copy of record: it renders the real exports and states the
 * construction rules, so nobody has to guess a ratio or eyeball a size.
 *
 * Every value on these pages comes out of spec.json or measured.json (see
 * _brand.js). To refresh after a new logo export:
 *     python3 scripts/build_brand_assets.py ~/ofir-agents-cloud
 */
export default {
  title: 'Brand/Logo',
  parameters: { layout: 'padded' },
};

const M = measured.mark;
const pct = (n) => `${(n * 100).toFixed(1)}%`;

/* Clear-space diagram. Percentage padding resolves against the containing block's
 * width in both axes, which is exactly what "one head width on all four sides"
 * means, so the box is solved rather than eyeballed:
 *   pad = outer * r / (1 + 2r),  r = clear space as a fraction of the mark width. */
const clearOuter = 0.92;
const clearPad = (clearOuter * M.clear_space_of_mark_width) / (1 + 2 * M.clear_space_of_mark_width);

/* ---------------------------------------------------------------- 01 overview */

export const Overview = {
  name: 'Overview',
  render: () =>
    lead(`The logo is the four heads. Nothing else is required for it to be the logo: no frame, no
      container, no plate, and no words. It reads as a team because the four share one face language,
      the same eye, the same nose, the same smile, the same light. It reads as four people because each
      one owns a single unmistakable feature. Approved by Ofir on ${measured.approval.date}; the mark and
      the brand book are the Marketing Designer's, this section is the system's copy of record.`) +
    grid([
      figure(`<img src="${A('mark-master.webp')}" alt="The Product Lab mark: four felt heads in a 2x2"
        style="width:78%;max-width:340px;display:block">`, 'On brand cream - the default', 'cream'),
      figure(`<img src="${A('mark-master.webp')}" alt="The Product Lab mark on a dark ground"
        style="width:78%;max-width:340px;display:block">`, 'On dark - unchanged, no outline added', 'dark'),
    ]) +
    h('The three legal grounds') +
    grid([
      chip('cream', G.cream, 'the default ground'),
      chip('paper', G.paper, 'documents, decks'),
      chip('dark', G.dark, 'the mark is unchanged on it'),
    ], '200px', '10px') +
    h('Provenance') +
    card(`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Source of truth.</b> The masters, the generator and every export live in
      <code>ofir-agents-cloud/assets/logo/</code>, owned by the Marketing Designer. This Storybook carries
      downsized copies plus a generated <code>measured.json</code>. It is not the master and must never be
      edited as if it were.</p>
      <p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Refresh.</b> <code style="${mono}">python3 scripts/build_brand_assets.py</code>
      re-pulls the artwork, re-measures it and rewrites every number on these pages. Nothing here is typed by
      hand, so a new export cannot leave this section describing an old logo.</p>
      <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Approved</b> by Ofir on ${measured.approval.date}, on the primary lockup.
      The approval artefact is <code>reference/APPROVED-lockup-${measured.approval.date}.jpg</code> in the
      source folder; it is a typeface study sheet, so it is deliberately not reproduced here - a page of
      options does not belong in the section that says what the answer is.</p>`),
};

/* ------------------------------------------------------------ 02 construction */

export const Construction = {
  name: 'Construction',
  render: () =>
    lead(`The obvious way to build a 2x2 is to give every head an equal cell and centre it. It reads loose
      and lopsided, because a tall narrow head leaves slack inside its own cell. So the proximity is a
      <b>measurement, not a taste call</b>: it was read off Ofir's own approved artwork. The two gutters are
      deliberately different. The rows interlock and the columns keep just enough air to separate four faces.`) +
    grid([
      figure(`<div style="position:relative;width:78%;max-width:320px">
          <img src="${A('mark-master.webp')}" alt="The mark with its two channels marked"
            style="width:100%;display:block">
          <div style="position:absolute;top:0;bottom:0;left:${pct(M.column_channel_left_of_mark_width)};
            width:${pct(M.column_channel_of_mark_width)};background:rgb(124 58 237 / .34);
            outline:1px solid var(--pl-accent)"></div>
          <div style="position:absolute;left:0;right:0;top:${pct(M.row_channel_top_of_mark_height)};
            height:max(2px,${pct(M.row_channel_of_mark_width * M.aspect)});background:rgb(124 58 237 / .34);
            outline:1px solid var(--pl-accent)"></div>
        </div>`,
        `Channels: ${M.column_channel_px}px across, ${M.row_channel_px}px down, on a ${M.master_px[0]}px mark`,
        'cream'),
      figure(`<div style="width:${pct(clearOuter)};position:relative;
          outline:2px dashed var(--pl-accent);padding:${pct(clearPad)}">
          <img src="${A('mark-master.webp')}" alt="The mark inside its clear space"
            style="width:100%;display:block">
        </div>`,
        `Clear space: one head width, ${pct(M.clear_space_of_mark_width)} of the mark width, all four sides`,
        'cream', '28px'),
    ]) +
    h('The numbers') +
    facts([
      ['Column gutter (authored)', `${M.gap_cols_authored} head widths`,
        'Read off the reference: the bounding boxes sit 19-24px apart on a 141px head.'],
      ['Row gutter (authored)', `${M.gap_rows_authored} head widths`,
        'Effectively touching. The rows interlock, and that is what makes the four read as one block.'],
      ['Column channel (rendered)', `${M.column_channel_px}px = ${pct(M.column_channel_of_mark_width)} of mark width`,
        'What the authored ratio actually measures on the master.'],
      ['Row channel (rendered)', `${M.row_channel_px}px = ${pct(M.row_channel_of_mark_width)} of mark width`,
        'Twenty times tighter than the columns. That asymmetry is the design.'],
      ['Master aspect', `${M.aspect} : 1`,
        `${M.master_px[0]} x ${M.master_px[1]}. Taller than wide - the top row carries tufts and a beanie.`],
      ['Clear space', `one head width (${pct(M.clear_space_of_mark_width)} of mark width)`,
        'All four sides. Simple to eyeball, and it scales with the mark.'],
      ['Row alignment', 'shared baseline',
        'Crowns differ between characters, chins do not. Rows are baseline-aligned, not box-aligned.'],
      ['Normalisation', 'ink area, not bounding box',
        'A beard or a tuft distorts a box but not a mass, so the heads are matched on area.'],
      ['Shadow', 'none, ever',
        'Reads as craft at 512px and as dirt at 32px.'],
    ]) +
    h('Why not equal gutters') +
    card(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">The first build solved for an
      <i>equal empty channel in both directions</i>. It is defensible on paper and it reads loose on the page,
      and Ofir asked three separate times for the heads to sit closer. The answer was in his own artwork all
      along. Any rebuild re-solves itself from the two ratios above, so a redrawn character never breaks the
      packing. Generated by <code style="${mono}">build_system.py</code> - never packed by hand.</p>`),
};

/* ---------------------------------------------------------------- 03 the cast */

export const Cast = {
  name: 'The cast',
  render: () => {
    const cells = ORDER.map((name) => {
      const c = spec.characters[name];
      const img = measured.heads[name];
      return `<figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
        overflow:hidden;background:var(--pl-surface)">
        <div style="background:${G.cream};padding:18px;display:grid;place-items:center;min-height:150px">
          <img src="${A(img.file)}" alt="The ${name} character" style="height:112px;width:auto;display:block">
        </div>
        <figcaption style="padding:12px 14px">
          <b style="display:block;text-transform:capitalize">${name}</b>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin:2px 0 8px">
            ${c.cell.replace('-', ' ')} &middot; position ${c.order} in the reading order</span>
          <span style="display:block;font-size:.9rem">${c.feature}</span>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin-top:6px">${c.read}</span>
          <span style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;${mono};
            color:var(--pl-fg-secondary)">
            <i style="width:12px;height:12px;border-radius:3px;background:${c.body};display:inline-block"></i>
            ${c.body}</span>
        </figcaption></figure>`;
    });
    const face = spec.shared_face_language;
    const shared = Object.entries(face).filter(([k]) => k !== '_').map(([k, v]) =>
      `<tr><td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${mono};white-space:nowrap;
        text-transform:capitalize">${k}</td>
       <td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);font-size:.9rem;
        color:var(--pl-fg-secondary)">${v}</td></tr>`).join('');

    return (
      lead(`Four characters, one feature each. The feature is what survives reduction: remove it and the
        character dies at small size, which is why none of them can be simplified into a plain coloured blob.
        The heads below are cut straight out of the master mark, so they are at exactly the scale the mark
        gives them. Reading order is fixed and it is never rearranged: ${ORDER.join(', ')}.`) +
      grid(cells, '220px') +
      h('One face language') +
      `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
        background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
        ${shared}</table></div>` +
      h('The hexes the brand owns') +
      grid([
        ...ORDER.map((n) => chip(n, spec.characters[n].body, spec.characters[n].feature.split(',')[0])),
        chip('ground', measured.palette.ground, 'brand cream'),
        chip('ink', measured.palette.ink, 'type beside the mark'),
        chip('beanie navy', measured.palette.beanie_navy, 'the only accent that is not a body'),
      ], '190px', '10px') +
      h('Open: these are not the site tokens') +
      card(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">The four character hexes above are
        the <b style="color:var(--pl-fg)">logo</b> colours. The site ships four different ones under
        <code>--pl-crew-*</code>, and the brand cream and ink have no token at all. Compared live below - the
        left chip in each pair is the token in <code>styles.css</code>, the right one is the logo.
        Reconciling them is a palette decision for Ofir, not a silent edit, so nothing in
        <code>styles.css</code> was touched to build this page.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:14px">
          ${ORDER.map((n) => `<div style="border:1px solid var(--pl-border);border-radius:var(--radius-md);
            overflow:hidden">
            <div style="display:flex;height:46px">
              <div style="flex:1;background:var(--pl-crew-${n})"></div>
              <div style="flex:1;background:${spec.characters[n].body}"></div></div>
            <div style="padding:7px 9px;${mono};color:var(--pl-fg-secondary)">
              --pl-crew-${n} vs ${spec.characters[n].body}</div></div>`).join('')}
        </div>`)
    );
  },
};

/* ------------------------------------------------------------------- 04 sizes */

export const Sizes = {
  name: 'Sizes',
  render: () => {
    const dead = (px) => px < 48;
    const rungs = measured.ladder.map(({ px, file, w, h: hh }) => `
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;
        ${dead(px) ? 'opacity:.45' : ''}">
        <div style="min-height:150px;display:grid;place-items:end center">
          <img src="${A(file)}" width="${w}" height="${hh}" alt="the mark at ${px}px"
            style="display:block"></div>
        <div style="width:104px;height:104px;background:${G.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="${A(file)}" alt="" style="width:104px;image-rendering:pixelated;display:block"></div>
        <small style="${mono};color:var(--pl-fg-secondary)">${px}px</small>
      </div>`).join('');

    const favs = measured.favicon.map(({ px, file, w, h: hh }) => `
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="min-height:60px;display:grid;place-items:end center">
          <img src="${A(file)}" width="${w}" height="${hh}" alt="the single character at ${px}px"
            style="display:block"></div>
        <div style="width:88px;height:88px;background:${G.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="${A(file)}" alt="" style="width:88px;image-rendering:pixelated;display:block"></div>
        <small style="${mono};color:var(--pl-fg-secondary)">${px}px</small>
      </div>`).join('');

    return (
      lead(`True pixel size on the top row, magnified underneath so nothing can hide. Read the small end.
        The greyed rungs are the ones you must not ship.`) +
      `<div style="display:flex;gap:28px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:${G.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">${rungs}</div>` +
      h('The hard rules') +
      grid([
        rule('yes', '128px and up', 'Full mark. This is where it belongs and where the felt actually reads.'),
        rule('yes', '64px', 'Minimum for the four-head mark. Faces still carry their features.'),
        rule('no', '48px - borderline', 'Only on a surface where nothing smaller exists. Do not design toward it.'),
        rule('no', 'Never below 48px - use one character',
          `A 2x2 gives every head a quarter of the width, so a 32px mark renders 16px faces. This is arithmetic,
           not draughtsmanship: no redraw fixes it. No four-head 2x2 survives 24px.`),
      ], '260px', '16px', 'start') +
      h('Below 48px it is one character') +
      lead(`One head gets four times the pixels of a quarter tile. <b>Orange is the one</b>: a navy beanie over a
        light face over cream gives three values, and three values is exactly what survives when texture is gone.
        Teal's glasses vanish, purple's curls collapse into a crown, and yellow is the lowest-contrast pairing so
        it disappears first.`) +
      `<div style="display:flex;gap:24px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:${G.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">${favs}</div>` +
      `<p style="margin:10px 0 0;font-size:.9rem;color:var(--pl-fg-secondary)">
        ${spec.icons ? spec.icons.single_character.honest_limit : ''}</p>` +
      h('Which tier, and which platform icon') +
      facts([
        ...Object.entries(spec.tiers).filter(([k]) => k !== '_')
          .map(([name, t]) => [`Tier: ${name}`, t.sizes, `${t.detail}. Use: ${t.use}.`]),
        ...(spec.icons ? [
          ['Platform icon: full mark', 'above 48px', spec.icons.full_mark.use],
          ['Platform icon: one character', '48px and below', spec.icons.single_character.use],
        ] : []),
      ]) +
      (spec.icons ? card(`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">iOS caching.</b> ${spec.icons.ios_caching_warning}</p>
        <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">One boundary is still ambiguous in the spec.</b> The tier table puts
        <i>signal</i> at 32px and below and <i>working</i> from 48px, while the icon rules and the hard rules
        above both cut at 48px. <b style="color:var(--pl-fg)">Use 48px.</b> It is the number Ofir's rule and the
        platform-icon rule agree on, and it is the conservative one. Flagged to the Marketing Designer to settle
        in <code>spec.json</code>.</p>`) : '')
    );
  },
};

/* ----------------------------------------------------------------- 05 lockups */

export const Lockups = {
  name: 'Lockups',
  render: () => {
    const w = spec.wordmark;
    const p = w.lockups.primary;
    const c = w.lockups.compact;
    return (
      lead(`The mark stands alone wherever the name is not needed, and it carries no type of its own. Where the
        name <i>is</i> needed there are exactly two arrangements, both set in <b>${w.face.split(' (')[0]}</b>.
        A round face and not a restrained one, on Ofir's call: the roundness should <i>echo</i> the characters so
        the identity speaks one language, instead of counterweighting them and making the heads look like a
        decoration bolted onto somebody else's wordmark.`) +
      h('Primary - horizontal, two lines, vertically centred') +
      grid([
        figure(`<img src="${A('primary.webp')}" alt="The primary lockup on cream"
          style="width:92%;max-width:460px;display:block">`, 'On cream', 'cream', '32px'),
        figure(`<img src="${A('primary-light.webp')}" alt="The primary lockup on dark"
          style="width:92%;max-width:460px;display:block">`, 'On dark - type flips to cream, the heads never change',
          'dark', '32px'),
      ], '320px') +
      `<div style="margin-top:16px">${facts([
        ['Structure', 'mark left, name right', p.structure],
        ['Name cap height', p.name_cap_height, 'Measured against the mark, so it holds at any size.'],
        ['Gap, mark to name', p.gap, 'Of the mark height, same reason.'],
        ['Leading', String(p.leading), 'The two lines of type answer the two rows of heads.'],
        ['Vertical alignment', 'CENTRED, never top-aligned', p.alignment_note],
        ['Minimum', '64px mark height', `Below that the mark goes alone. Smallest authored rung:
          ${measured.lockups['primary-160.webp'].w} x ${measured.lockups['primary-160.webp'].h}px.`],
      ])}</div>` +
      `<div style="margin-top:12px">${figure(
        `<img src="${A('primary-160.webp')}" alt="The primary lockup at its 64px minimum" style="display:block">`,
        `The minimum, at true size: ${measured.lockups['primary-160.webp'].w}px wide = a 64px mark`, 'cream', '28px')}</div>` +
      h('Compact - mark above, name on two lines under') +
      grid([
        figure(`<img src="${A('compact.webp')}" alt="The compact lockup on cream"
          style="width:56%;max-width:190px;display:block">`, 'On cream', 'cream', '28px'),
        figure(`<img src="${A('compact-light.webp')}" alt="The compact lockup on dark"
          style="width:56%;max-width:190px;display:block">`, 'On dark', 'dark', '28px'),
        figure(`<img src="${A('compact-120.webp')}" alt="The compact lockup at its 120px minimum"
          style="display:block">`,
          `The minimum, at true size: ${measured.lockups['compact-120.webp'].w}px wide`, 'cream', '28px'),
      ], '210px') +
      `<div style="margin-top:16px">${facts([
        ['Structure', 'mark above, name under', c.structure],
        ['When', 'the horizontal will not fit', 'A narrow column, a mobile header, a square slot.'],
        ['Sizing rule', '"Product" measures to the mark', c.sizing_rule],
        ['Alignment', '"Lab" centred under "Product"', c.alignment],
        ['Leading', String(c.leading), 'Same as primary.'],
        ['Gap, mark to name', c.gap, 'Of the mark height.'],
        ['Minimum', '120px wide', c.minimum],
      ])}</div>` +
      h('Colour') +
      grid([
        chip('type on light', measured.palette.type_on_light),
        chip('type on dark', measured.palette.type_on_dark),
      ], '200px', '10px') +
      `<div style="margin-top:16px">${rule('no', 'Never hand-set a lockup',
        `Both are generated from the live mark by <code>export_lockups.py</code>, so every ratio holds at any
         size. Setting the name next to the mark by eye is exactly how a lockup drifts, and it is how the
         first build ended up top-aligned.`)}</div>`
    );
  },
};


/* A counter-example tile. Struck through, so a screenshot of it can never be
 * mistaken for the mark even with the caption cropped off. */
function dont(file, title, why) {
  return `<figure style="margin:0;border:1px solid var(--pl-border);
    border-inline-start:3px solid var(--pl-stage-dropped);border-radius:var(--radius-md);overflow:hidden;
    background:var(--pl-surface)">
    <div style="position:relative;background:${G.cream};padding:16px;display:grid;place-items:center">
      <img src="${A(file)}" alt="Wrong: ${title}" style="width:82%;display:block">
      <div style="position:absolute;inset:0;background:
        linear-gradient(to bottom right,transparent calc(50% - 1.5px),var(--pl-stage-dropped) calc(50% - 1.5px),
        var(--pl-stage-dropped) calc(50% + 1.5px),transparent calc(50% + 1.5px));opacity:.85"></div>
    </div>
    <figcaption style="padding:10px 12px">
      <b style="display:block;color:var(--pl-stage-dropped)">Never: ${title.toLowerCase()}</b>
      <span style="font-size:.86rem;color:var(--pl-fg-secondary)">${why}</span>
    </figcaption></figure>`;
}

/* ------------------------------------------------------------ 06 do and don't */

export const DoAndDont = {
  name: "Do and Don't",
  render: () =>
    lead(`Six prohibitions and one standing instruction. Every one of them is measured or decided, none of
      them is preference.`) +
    grid([
      rule('no', 'Never add a shadow',
        `Not under the heads, not under the beard. It reads as craft at 512px and as dirt at 32px, and it is
         the single thing that makes the mark look cheap when it shrinks.`),
      rule('no', 'Never put it in a container',
        `No plate, no circle, no rounded square behind it. The heads hold together on their own; a frame turns
         a mark into a sticker. The one exception is a platform tile that requires an opaque square, and even
         there the ground is brand cream, not a shape.`),
      rule('no', 'Never rearrange the four',
        `The reading order is fixed: ${ORDER.join(', ')}. A row is not this logo, and neither is a trio.`),
      rule('no', 'Never stretch, recolour or outline',
        `The four colours are the brand. On dark the mark is unchanged - do not add a keyline to help it.`),
      rule('no', 'Never use the four heads below 48px',
        `Use the single character. This is arithmetic, not preference: at 32px each face gets 16px.`),
      rule('no', 'Never hand-set the lockup',
        `Both lockups are generated. Placing the name beside the mark by eye breaks ratios that were measured.`),
      rule('yes', 'Always let it breathe',
        `One head width of clear space on every side, all four sides. Nothing crops it, nothing overlaps it.`),
    ], '280px', '16px', 'start') +
    h('The four you can see') +
    lead(`Deliberately wrong renders, generated from the master by the same script so they cannot go stale.
      Nothing below is artwork. The files are named <code>dont-*</code> for that reason.`) +
    grid([
      dont('dont-shadow.webp', 'Shadow', 'Craft at 512px, dirt at 32px.'),
      dont('dont-container.webp', 'Container', 'A frame turns a mark into a sticker.'),
      dont('dont-rearranged.webp', 'Rearranged', `The order is ${ORDER.join(', ')}.`),
      dont('dont-stretched.webp', 'Stretched', `The aspect is ${M.aspect} : 1 and it is fixed.`),
    ], '210px', '16px', 'start') +
    h('Known weakness, stated plainly') +
    card(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">The one-colour mark is not finished.</b> ${spec.known_weakness.monochrome}
      Until that redraw exists, do not ship a monochrome Product Lab mark: use the colour mark, or the single
      character.</p>`),
};

/* --------------------------------------------------------------- 07 adoption */

export const Adoption = {
  name: 'Adoption status',
  render: () =>
    lead(`What the live site ships today is <b>not</b> this logo. Recording that here rather than quietly
      fixing it: the site UI is out of scope for this branch, and both items below are decisions, not chores.`) +
    grid([
      figure(`<div class="sb-row" style="justify-content:center">
          <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
          <img src="assets/favicon.png" alt="the favicon the site ships today" width="48" height="48"
            style="border-radius:12px">
        </div>`, 'Live today: a text wordmark and the old favicon', 'paper', '28px'),
      figure(`<img src="${A('primary.webp')}" alt="The approved primary lockup"
        style="width:92%;max-width:380px;display:block">`, 'Approved 2026-08-22: the primary lockup', 'cream', '28px'),
    ], '320px') +
    h('Open items') +
    grid([
      rule('no', 'The site header has not adopted the lockup',
        `<code>.nav__brand--text</code> still sets the name as plain type. Ofir was explicit on 2026-08-22 that
         nothing changes in the website UI, so this is a separate Product Designer change on its own branch,
         not part of the Brand section.`),
      rule('yes', 'The favicon IS authorised',
        `<code>assets/favicon.png</code> predates the mark. The one carve-out Ofir gave on 2026-08-22 was
         "also update the favicon". The single-character set is built at
         <code>ofir-agents-cloud/assets/logo/out/favicon/</code>; wiring it is the Product Designer's, on this
         same branch. Sizes and the tier rule are in Brand/Logo, Sizes.`),
      rule('no', 'The crew tokens do not match the logo',
        `All four <code>--pl-crew-*</code> values differ from the character hexes, and brand cream and ink have
         no token at all. One palette or two is Ofir's call; see Brand/Logo, The cast.`),
      rule('no', 'The monochrome mark needs a redraw, not a desaturation',
        `Open with the Marketing Designer. Nothing monochrome ships until it exists.`),
    ], '280px', '16px', 'start'),
};

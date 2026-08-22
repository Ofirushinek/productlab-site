import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s,c,l,u,d;function f(){return(f=e((()=>{t=`Product Lab logo system - measured off assets/logo/reference/SOURCE-OF-TRUTH-logo-v2-chatgpt.webp (1448x1086), Ofir's approved logo v2. THE LOGO IS THE ICON: the four heads, nothing else. Do not re-derive these values by eye.`,n=`#FBEAD9`,r=`#402D1F`,i={yellow:{order:1,cell:`top-left`,body:`#E79B27`,feature:`three soft leaf-shaped tufts standing up on the crown`,read:`friendly, calm, open. The plainest face - it is the one that carries the palette, not a prop.`,site_cast_link:`the mustard-yellow crew member (deliberately no assigned role)`},orange:{order:2,cell:`top-right`,body:`#D15C05`,skin:`#E8994C`,beanie:`#164F6E`,feature:`full round curly beard framing the whole face, plus a ribbed knit beanie`,read:`grounded, steady, trustworthy. The most complex silhouette in the set.`,site_cast_link:`the ginger Strategist / product manager`},purple:{order:3,cell:`bottom-left`,body:`#78618A`,curls:`#765E87`,feature:`a crown of round bobble curls`,read:`intelligent, a little creative, a little wry. Not feminine, not childish.`,site_cast_link:`the purple Designer`},teal:{order:4,cell:`bottom-right`,body:`#4D8F8F`,feature:`round wire glasses with a warm brown rim, short spiky tufts on the crown`,read:`clever, warm, slightly quirky`,site_cast_link:`the teal Architect / CTO`}},a={_:`Every head obeys all of these. This is what makes four characters read as one cast.`,silhouette:`a soft rounded dome - wide, flat-bottomed, shoulders of the shape rounded. NOT an egg, NOT a circle.`,crop:`head only. No neck, no shoulders, no body, no clothing. The beanie is part of the head.`,facing:`dead front, symmetrical, looking straight at the viewer. Never at each other.`,eyes:`two large white ovals with big round black pupils, same size and same spacing on all four, sitting on a shared eye line`,nose:`one soft rounded blob in the centre, same body colour, slightly proud of the face, overlapping the top of the smile`,mouth:`a single thin curved smile line. Same curve on all four.`,brows:`two short soft strokes in a warmer, slightly deeper tone than the body`,texture:`a fine felt / embroidered stitch pattern inside the flat colour, low contrast - present but never noisy`,lighting:`one soft key from upper-left, gentle ambient fill, soft edge shading, a faint contact shadow under the head. No rim light, no gloss, no reflection, no scene.`},o={layout:`2x2 grid. NOT a row. NOT a container - the four heads float on the ground with no plate, no frame, no outer edge.`,reading_order:[`yellow`,`orange`,`purple`,`teal`],measured_block:{w:305,h:400,note:`at reference scale; taller than wide because the top row's tufts and beanie add height`},status:`THIS IS THE LOGO and it still stands alone wherever the name is not needed. As of 2026-08-22 there are also two approved LOCKUPS pairing it with the name - see 'wordmark'.`},s={_:`Each tier is AUTHORED at its own detail budget. They are siblings, not exports of each other. Downsampling tier 1 to 24px gives a smudge with the right silhouette.`,expressive:{sizes:`256px and up`,detail:`full felt stitch texture, soft shading, contact shadow`,use:`hero, brand sheet, social, deck title, merch`},working:{sizes:`48-128px`,detail:`form and shading only, texture removed - at this size stitch becomes noise`,use:`site header, deck corner, PDF, email signature`},signal:{sizes:`32px and below`,detail:`solid single-colour silhouette, eyes knocked out, one identifying feature only`,use:`favicon, app icon, tiny UI`}},c={monochrome:`The monochrome heads in the reference is the weakest part of it. The faces turn into dark blobs with hairline knockouts, the beard and curls read as noise, and the treatment is inconsistent - some features are line, some are solid mass. A one-colour mark cannot be a desaturated version of the colour art; it has to be REDRAWN as a deliberate reduction: solid silhouette, eyes knocked out, one feature per character, nothing else. Flagged to Ofir 2026-08-21.`},l={in_scope:!0,ruling:`APPROVED 2026-08-22, and this REVERSES the 2026-08-21 'text is not relevant' note. Ofir picked the Fredoka two-line lockup on sight: 'I love this as the official logo. The fact that the text is one above the other, it suits the logo.' He also overruled my recommendation of a restrained geometric face - his call is that the roundness should ECHO the characters rather than counterweight them, so the whole identity speaks one language. Reference image of the approved lockup: reference/APPROVED-lockup-2026-08-22.jpg`,face:`Fredoka (Google Fonts), fonts/Fredoka.ttf`,colour:`#402D1F on light, #F7EFE2 on dark. The heads never change.`,lockups:{primary:{structure:`mark left, name right on TWO LINES (Product / Lab), vertically CENTRED on the mark`,why_two_lines:`the two lines of type answer the two rows of heads - that is the idea in it`,alignment_note:`Ofir caught the first build cap-aligning the type to the TOP of the mark. The type block is shorter than the mark, so aligning tops floats the name high and leaves a hole beneath it. It is CENTRED.`,name_cap_height:`0.28 of mark height (band 0.26-0.30)`,gap:`0.14 of mark height`,leading:.92,file:`out/lockups/primary-master.png`},compact:{structure:`mark ABOVE, name underneath on TWO lines - 'Product' then 'Lab', centred`,when:`Ofir 2026-08-22: 'a version when it's rising - the text should be rising when there is not enough space.' Use wherever the horizontal lockup will not fit: a narrow column, a mobile header, a square slot.`,sizing_rule:`'PRODUCT' alone is measured to the mark's width, and 'Lab' is set at that SAME type size underneath. The long word does the measuring. The first build set the whole name on one line sized to the mark's width and Ofir rejected it - fitting two words across a narrow mark makes the type tiny. Letting the longer word set the scale locks the block to the mark instead of shrinking to fit it.`,alignment:`'Lab' is CENTRED under 'Product'. The mark is symmetrical, so the whole lockup keeps one vertical axis; flush-left introduces an edge the mark does not have. A flush-left variant exists in lockups.py as 'vertical-left' if a surface ever needs it.`,leading:.92,gap:`0.10 of mark height`,minimum:`120px wide - verified, the type is still legible there and tight at 96`,file:`out/lockups/compact-master.png`}},minimum:`Primary lockup: 64px mark height. Compact lockup: 120px wide. Below that the mark goes alone; below 32px, one character.`},u={_:`The tier is chosen by the size the icon is SEEN at, not by the word 'icon'. A browser tab is 16-32px and needs the single character; an iOS home-screen tile is ~180px, four times the 48px floor, and should carry the whole mark. Built 2026-08-22 after Ofir showed his home screen and I noticed I had made every platform icon from the one head.`,full_mark:{files:`apple-touch-icon.png (180), android-chrome-192/512.png, app-icon-1024.png, mark-tile-256/512.png`,build:`the four-head mark centred on brand cream #FBEAD9, 11% padding, square. Opaque ground is required - iOS composites a transparent icon onto black.`,use:`iOS/Android home screen, app tile, PWA manifest, store listing, anywhere the icon renders above 48px`},single_character:{files:`favicon.ico (16/32/48), favicon-16/32/48/64/96/128.png`,build:`the orange character, squared with even margin, per-size unsharp below 64px - a plain Lanczos downsample of a soft felt head goes mushy where the beanie meets the face`,use:`browser tab and anything at or below 48px`,honest_limit:`at 16px this is a beanie and a colour, not a readable face. The authored signal-tier redraw is still open.`},ios_caching_warning:`An iOS home-screen shortcut caches its icon AT THE MOMENT IT WAS PINNED. Shipping a new apple-touch-icon does NOT update an already-pinned shortcut - the user has to delete it and re-add it from Safari. Tell them this or they will think the deploy failed.`},d={_:t,ground:n,ink:r,characters:i,shared_face_language:a,icon:o,tiers:s,known_weakness:c,wordmark:l,icons:u}})))()}var p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{p=`GENERATED by scripts/build_brand_assets.py - do not edit. Every number here is measured off the master artwork in ofir-agents-cloud/assets/logo/out/.`,m=`ofir-agents-cloud/assets/logo`,h={master_px:[1600,2006],aspect:.7976,gap_cols_authored:.15,gap_rows_authored:.01,column_channel_px:99,row_channel_px:5,column_channel_of_mark_width:.0619,row_channel_of_mark_width:.0031,column_channel_left_of_mark_width:.4369,row_channel_top_of_mark_height:.5364,column_width_px:750,clear_space_of_mark_width:.4691,files:[{file:`mark-master.webp`,w:760,h:953,kb:127}]},g={yellow:{file:`head-yellow.webp`,w:340,h:530,kb:32},orange:{file:`head-orange.webp`,w:340,h:457,kb:31},purple:{file:`head-purple.webp`,w:340,h:477,kb:35},teal:{file:`head-teal.webp`,w:340,h:419,kb:30}},_={shadow:{file:`dont-shadow.webp`,w:300,h:365,kb:27},container:{file:`dont-container.webp`,w:300,h:362,kb:12},rearranged:{file:`dont-rearranged.webp`,w:300,h:376,kb:29},stretched:{file:`dont-stretched.webp`,w:300,h:300,kb:25}},v=[{px:128,file:`logo-128.png`,w:128,h:160},{px:64,file:`logo-64.png`,w:64,h:80},{px:48,file:`logo-48.png`,w:48,h:60},{px:32,file:`logo-32.png`,w:32,h:40},{px:24,file:`logo-24.png`,w:24,h:30},{px:16,file:`logo-16.png`,w:16,h:20}],y=[{px:48,file:`favicon-48.png`,w:48,h:48},{px:32,file:`favicon-32.png`,w:32,h:32},{px:16,file:`favicon-16.png`,w:16,h:16}],b={primary:{file:`primary.webp`,w:1100,h:437,kb:56,master_px:[2264,900],aspect:2.5156},primary_light:{file:`primary-light.webp`,w:1100,h:437,kb:55,master_px:[2264,900],aspect:2.5156},compact:{file:`compact.webp`,w:460,h:848,kb:67,master_px:[718,1323],aspect:.5427},compact_light:{file:`compact-light.webp`,w:460,h:848,kb:66,master_px:[718,1323],aspect:.5427},"primary-160.webp":{file:`primary-160.webp`,w:160,h:64},"compact-120.webp":{file:`compact-120.webp`,w:120,h:221}},x={artefact:`reference/APPROVED-lockup-2026-08-22.jpg`,date:`2026-08-22`,shown_in_storybook:!1},S={cream:`#FBEAD9`,paper:`#F7EFE2`,dark:`#1C1713`},C={ground:`#FBEAD9`,ink:`#402D1F`,characters:{yellow:`#E79B27`,orange:`#D15C05`,purple:`#78618A`,teal:`#4D8F8F`},beanie_navy:`#164F6E`,type_on_light:`#402D1F`,type_on_dark:`#F7EFE2`},w={_:`The tier is chosen by the size the icon is SEEN at, not by the word 'icon'. A browser tab is 16-32px and needs the single character; an iOS home-screen tile is ~180px, four times the 48px floor, and should carry the whole mark. Built 2026-08-22 after Ofir showed his home screen and I noticed I had made every platform icon from the one head.`,full_mark:{files:`apple-touch-icon.png (180), android-chrome-192/512.png, app-icon-1024.png, mark-tile-256/512.png`,build:`the four-head mark centred on brand cream #FBEAD9, 11% padding, square. Opaque ground is required - iOS composites a transparent icon onto black.`,use:`iOS/Android home screen, app tile, PWA manifest, store listing, anywhere the icon renders above 48px`},single_character:{files:`favicon.ico (16/32/48), favicon-16/32/48/64/96/128.png`,build:`the orange character, squared with even margin, per-size unsharp below 64px - a plain Lanczos downsample of a soft felt head goes mushy where the beanie meets the face`,use:`browser tab and anything at or below 48px`,honest_limit:`at 16px this is a beanie and a colour, not a readable face. The authored signal-tier redraw is still open.`},ios_caching_warning:`An iOS home-screen shortcut caches its icon AT THE MOMENT IT WAS PINNED. Shipping a new apple-touch-icon does NOT update an already-pinned shortcut - the user has to delete it and re-add it from Safari. Tell them this or they will think the deploy failed.`},T={_:p,source:m,mark:h,heads:g,donts:_,ladder:v,favicon:y,lockups:b,approval:x,grounds:S,palette:C,icons:w}})))()}function D(e){return`<p class="section-lead" style="max-width:76ch;margin:0 0 20px">${e}</p>`}function O(e){return`<h3 style="font-size:var(--text-h3,1.15rem);font-weight:700;margin:28px 0 10px">${e}</h3>`}function k(e,t=`18px`){return`<div style="background:var(--pl-surface);border:1px solid var(--pl-border);
    border-radius:var(--radius-md);padding:${t}">${e}</div>`}function ee(e,t=`cream`,n=`40px`){return`<div style="background:${F[t]};border:1px solid var(--pl-border);
    border-radius:var(--radius-md);padding:${n};display:grid;place-items:center">${e}</div>`}function A(e,t,n=`cream`,r=`40px`){return`<figure style="margin:0">${ee(e,n,r)}
    <figcaption style="${R};font-weight:500;color:var(--pl-fg-secondary);margin-top:8px">${t}</figcaption>
  </figure>`}function j(e,t=`280px`,n=`16px`,r=`stretch`){return`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${t},1fr));
    gap:${n};align-items:${r}">${e.join(``)}</div>`}function M(e,t,n){return`<div style="background:var(--pl-surface);border:1px solid var(--pl-border);
    border-inline-start:3px solid ${e===`no`?`var(--pl-stage-dropped)`:d.characters.teal.body};border-radius:var(--radius-md);padding:14px 16px">
    <b style="display:block;font-weight:700;margin-bottom:4px">${t}</b>
    <p style="margin:0;font-size:.9rem;color:var(--pl-fg-secondary)">${n}</p></div>`}function N(e){let t=(e,t=``)=>`<td style="padding:9px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${t}">${e}</td>`;return`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
    background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
    <tr style="background:var(--pl-bg)">${[`Property`,`Value`,`Why it is that`].map(e=>`<th style="text-align:start;padding:9px 12px;border-bottom:1px solid var(--pl-border);${R}">${e}</th>`).join(``)}</tr>
    ${e.map(([e,n,r])=>`<tr>${t(e)}${t(n,`font:600 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;unicode-bidi:isolate;text-align:left;white-space:nowrap`)}
      ${t(r,`color:var(--pl-fg-secondary);font-size:.9rem`)}</tr>`).join(``)}
  </table></div>`}function P(e,t,n=``){return`<figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
    overflow:hidden;background:var(--pl-surface)">
    <div style="height:56px;background:${t}"></div>
    <figcaption style="padding:8px 10px;${R};color:var(--pl-fg)">${e}
      <span style="display:block;font-weight:500;color:var(--pl-fg-secondary)">${t}</span>
      ${n?`<span style="display:block;font:500 11px/1.4 inherit;font-family:inherit;color:var(--pl-fg-secondary);margin-top:4px">${n}</span>`:``}
    </figcaption></figure>`}var F,I,L,R;function z(){return(z=e((()=>{f(),E(),F=T.grounds,I=d.icon.reading_order,L=e=>`brand/${e}`,R=`font:600 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;unicode-bidi:isolate;text-align:left`})))()}function B(e,t,n){return`<figure style="margin:0;border:1px solid var(--pl-border);
    border-inline-start:3px solid var(--pl-stage-dropped);border-radius:var(--radius-md);overflow:hidden;
    background:var(--pl-surface)">
    <div style="position:relative;background:${F.cream};padding:16px;display:grid;place-items:center">
      <img src="${L(e)}" alt="Wrong: ${t}" style="width:82%;display:block">
      <div style="position:absolute;inset:0;background:
        linear-gradient(to bottom right,transparent calc(50% - 1.5px),var(--pl-stage-dropped) calc(50% - 1.5px),
        var(--pl-stage-dropped) calc(50% + 1.5px),transparent calc(50% + 1.5px));opacity:.85"></div>
    </div>
    <figcaption style="padding:10px 12px">
      <b style="display:block;color:var(--pl-stage-dropped)">Never: ${t.toLowerCase()}</b>
      <span style="font-size:.86rem;color:var(--pl-fg-secondary)">${n}</span>
    </figcaption></figure>`}var V,H,U,W,G,K,q,J,Y,X,Z,Q,$;function te(){return(te=e((()=>{z(),V={title:`Brand/Logo`,parameters:{layout:`padded`,docs:{description:{component:`Brand / Logo - the Product Lab identity, approved by Ofir on 2026-08-22.

The Marketing Designer owns the mark and the brand book. This section is the
design system's copy of record: it renders the real exports and states the
construction rules, so nobody has to guess a ratio or eyeball a size.

Every value on these pages comes out of spec.json or measured.json (see
_brand.js). To refresh after a new logo export:
    python3 scripts/build_brand_assets.py ~/ofir-agents-cloud`}}}},H=T.mark,U=e=>`${(e*100).toFixed(1)}%`,W=.92,G=W*H.clear_space_of_mark_width/(1+2*H.clear_space_of_mark_width),K={name:`Overview`,render:()=>D(`The logo is the four heads. Nothing else is required for it to be the logo: no frame, no
      container, no plate, and no words. It reads as a team because the four share one face language,
      the same eye, the same nose, the same smile, the same light. It reads as four people because each
      one owns a single unmistakable feature. Approved by Ofir on ${T.approval.date}; the mark and
      the brand book are the Marketing Designer's, this section is the system's copy of record.`)+j([A(`<img src="${L(`mark-master.webp`)}" alt="The Product Lab mark: four felt heads in a 2x2"
        style="width:78%;max-width:340px;display:block">`,`On brand cream - the default`,`cream`),A(`<img src="${L(`mark-master.webp`)}" alt="The Product Lab mark on a dark ground"
        style="width:78%;max-width:340px;display:block">`,`On dark - unchanged, no outline added`,`dark`)])+O(`The three legal grounds`)+j([P(`cream`,F.cream,`the default ground`),P(`paper`,F.paper,`documents, decks`),P(`dark`,F.dark,`the mark is unchanged on it`)],`200px`,`10px`)+O(`Provenance`)+k(`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Source of truth.</b> The masters, the generator and every export live in
      <code>ofir-agents-cloud/assets/logo/</code>, owned by the Marketing Designer. This Storybook carries
      downsized copies plus a generated <code>measured.json</code>. It is not the master and must never be
      edited as if it were.</p>
      <p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Refresh.</b> <code style="${R}">python3 scripts/build_brand_assets.py</code>
      re-pulls the artwork, re-measures it and rewrites every number on these pages. Nothing here is typed by
      hand, so a new export cannot leave this section describing an old logo.</p>
      <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Approved</b> by Ofir on ${T.approval.date}, on the primary lockup.
      The approval artefact is <code>reference/APPROVED-lockup-${T.approval.date}.jpg</code> in the
      source folder; it is a typeface study sheet, so it is deliberately not reproduced here - a page of
      options does not belong in the section that says what the answer is.</p>`)},q={name:`Construction`,render:()=>D(`The obvious way to build a 2x2 is to give every head an equal cell and centre it. It reads loose
      and lopsided, because a tall narrow head leaves slack inside its own cell. So the proximity is a
      <b>measurement, not a taste call</b>: it was read off Ofir's own approved artwork. The two gutters are
      deliberately different. The rows interlock and the columns keep just enough air to separate four faces.`)+j([A(`<div style="position:relative;width:78%;max-width:320px">
          <img src="${L(`mark-master.webp`)}" alt="The mark with its two channels marked"
            style="width:100%;display:block">
          <div style="position:absolute;top:0;bottom:0;left:${U(H.column_channel_left_of_mark_width)};
            width:${U(H.column_channel_of_mark_width)};background:rgb(124 58 237 / .34);
            outline:1px solid var(--pl-accent)"></div>
          <div style="position:absolute;left:0;right:0;top:${U(H.row_channel_top_of_mark_height)};
            height:max(2px,${U(H.row_channel_of_mark_width*H.aspect)});background:rgb(124 58 237 / .34);
            outline:1px solid var(--pl-accent)"></div>
        </div>`,`Channels: ${H.column_channel_px}px across, ${H.row_channel_px}px down, on a ${H.master_px[0]}px mark`,`cream`),A(`<div style="width:${U(W)};position:relative;
          outline:2px dashed var(--pl-accent);padding:${U(G)}">
          <img src="${L(`mark-master.webp`)}" alt="The mark inside its clear space"
            style="width:100%;display:block">
        </div>`,`Clear space: one head width, ${U(H.clear_space_of_mark_width)} of the mark width, all four sides`,`cream`,`28px`)])+O(`The numbers`)+N([[`Column gutter (authored)`,`${H.gap_cols_authored} head widths`,`Read off the reference: the bounding boxes sit 19-24px apart on a 141px head.`],[`Row gutter (authored)`,`${H.gap_rows_authored} head widths`,`Effectively touching. The rows interlock, and that is what makes the four read as one block.`],[`Column channel (rendered)`,`${H.column_channel_px}px = ${U(H.column_channel_of_mark_width)} of mark width`,`What the authored ratio actually measures on the master.`],[`Row channel (rendered)`,`${H.row_channel_px}px = ${U(H.row_channel_of_mark_width)} of mark width`,`Twenty times tighter than the columns. That asymmetry is the design.`],[`Master aspect`,`${H.aspect} : 1`,`${H.master_px[0]} x ${H.master_px[1]}. Taller than wide - the top row carries tufts and a beanie.`],[`Clear space`,`one head width (${U(H.clear_space_of_mark_width)} of mark width)`,`All four sides. Simple to eyeball, and it scales with the mark.`],[`Row alignment`,`shared baseline`,`Crowns differ between characters, chins do not. Rows are baseline-aligned, not box-aligned.`],[`Normalisation`,`ink area, not bounding box`,`A beard or a tuft distorts a box but not a mass, so the heads are matched on area.`],[`Shadow`,`none, ever`,`Reads as craft at 512px and as dirt at 32px.`]])+O(`Why not equal gutters`)+k(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">The first build solved for an
      <i>equal empty channel in both directions</i>. It is defensible on paper and it reads loose on the page,
      and Ofir asked three separate times for the heads to sit closer. The answer was in his own artwork all
      along. Any rebuild re-solves itself from the two ratios above, so a redrawn character never breaks the
      packing. Generated by <code style="${R}">build_system.py</code> - never packed by hand.</p>`)},J={name:`The cast`,render:()=>{let e=I.map(e=>{let t=d.characters[e],n=T.heads[e];return`<figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
        overflow:hidden;background:var(--pl-surface)">
        <div style="background:${F.cream};padding:18px;display:grid;place-items:center;min-height:150px">
          <img src="${L(n.file)}" alt="The ${e} character" style="height:112px;width:auto;display:block">
        </div>
        <figcaption style="padding:12px 14px">
          <b style="display:block;text-transform:capitalize">${e}</b>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin:2px 0 8px">
            ${t.cell.replace(`-`,` `)} &middot; position ${t.order} in the reading order</span>
          <span style="display:block;font-size:.9rem">${t.feature}</span>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin-top:6px">${t.read}</span>
          <span style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;${R};
            color:var(--pl-fg-secondary)">
            <i style="width:12px;height:12px;border-radius:3px;background:${t.body};display:inline-block"></i>
            ${t.body}</span>
        </figcaption></figure>`}),t=d.shared_face_language,n=Object.entries(t).filter(([e])=>e!==`_`).map(([e,t])=>`<tr><td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${R};white-space:nowrap;
        text-transform:capitalize">${e}</td>
       <td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);font-size:.9rem;
        color:var(--pl-fg-secondary)">${t}</td></tr>`).join(``);return D(`Four characters, one feature each. The feature is what survives reduction: remove it and the
        character dies at small size, which is why none of them can be simplified into a plain coloured blob.
        The heads below are cut straight out of the master mark, so they are at exactly the scale the mark
        gives them. Reading order is fixed and it is never rearranged: ${I.join(`, `)}.`)+j(e,`220px`)+O(`One face language`)+`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
        background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
        ${n}</table></div>`+O(`The hexes the brand owns`)+j([...I.map(e=>P(e,d.characters[e].body,d.characters[e].feature.split(`,`)[0])),P(`ground`,T.palette.ground,`brand cream`),P(`ink`,T.palette.ink,`type beside the mark`),P(`beanie navy`,T.palette.beanie_navy,`the only accent that is not a body`)],`190px`,`10px`)+O(`Open: these are not the site tokens`)+k(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">The four character hexes above are
        the <b style="color:var(--pl-fg)">logo</b> colours. The site ships four different ones under
        <code>--pl-crew-*</code>, and the brand cream and ink have no token at all. Compared live below - the
        left chip in each pair is the token in <code>styles.css</code>, the right one is the logo.
        Reconciling them is a palette decision for Ofir, not a silent edit, so nothing in
        <code>styles.css</code> was touched to build this page.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:14px">
          ${I.map(e=>`<div style="border:1px solid var(--pl-border);border-radius:var(--radius-md);
            overflow:hidden">
            <div style="display:flex;height:46px">
              <div style="flex:1;background:var(--pl-crew-${e})"></div>
              <div style="flex:1;background:${d.characters[e].body}"></div></div>
            <div style="padding:7px 9px;${R};color:var(--pl-fg-secondary)">
              --pl-crew-${e} vs ${d.characters[e].body}</div></div>`).join(``)}
        </div>`)}},Y={name:`Sizes`,render:()=>{let e=e=>e<48,t=T.ladder.map(({px:t,file:n,w:r,h:i})=>`
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;
        ${e(t)?`opacity:.45`:``}">
        <div style="min-height:150px;display:grid;place-items:end center">
          <img src="${L(n)}" width="${r}" height="${i}" alt="the mark at ${t}px"
            style="display:block"></div>
        <div style="width:104px;height:104px;background:${F.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="${L(n)}" alt="" style="width:104px;image-rendering:pixelated;display:block"></div>
        <small style="${R};color:var(--pl-fg-secondary)">${t}px</small>
      </div>`).join(``),n=T.favicon.map(({px:e,file:t,w:n,h:r})=>`
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="min-height:60px;display:grid;place-items:end center">
          <img src="${L(t)}" width="${n}" height="${r}" alt="the single character at ${e}px"
            style="display:block"></div>
        <div style="width:88px;height:88px;background:${F.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="${L(t)}" alt="" style="width:88px;image-rendering:pixelated;display:block"></div>
        <small style="${R};color:var(--pl-fg-secondary)">${e}px</small>
      </div>`).join(``);return D(`True pixel size on the top row, magnified underneath so nothing can hide. Read the small end.
        The greyed rungs are the ones you must not ship.`)+`<div style="display:flex;gap:28px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:${F.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">${t}</div>`+O(`The hard rules`)+j([M(`yes`,`128px and up`,`Full mark. This is where it belongs and where the felt actually reads.`),M(`yes`,`64px`,`Minimum for the four-head mark. Faces still carry their features.`),M(`no`,`48px - borderline`,`Only on a surface where nothing smaller exists. Do not design toward it.`),M(`no`,`Never below 48px - use one character`,`A 2x2 gives every head a quarter of the width, so a 32px mark renders 16px faces. This is arithmetic,
           not draughtsmanship: no redraw fixes it. No four-head 2x2 survives 24px.`)],`260px`,`16px`,`start`)+O(`Below 48px it is one character`)+D(`One head gets four times the pixels of a quarter tile. <b>Orange is the one</b>: a navy beanie over a
        light face over cream gives three values, and three values is exactly what survives when texture is gone.
        Teal's glasses vanish, purple's curls collapse into a crown, and yellow is the lowest-contrast pairing so
        it disappears first.`)+`<div style="display:flex;gap:24px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:${F.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">${n}</div><p style="margin:10px 0 0;font-size:.9rem;color:var(--pl-fg-secondary)">
        ${d.icons?d.icons.single_character.honest_limit:``}</p>`+O(`Which tier, and which platform icon`)+N([...Object.entries(d.tiers).filter(([e])=>e!==`_`).map(([e,t])=>[`Tier: ${e}`,t.sizes,`${t.detail}. Use: ${t.use}.`]),...d.icons?[[`Platform icon: full mark`,`above 48px`,d.icons.full_mark.use],[`Platform icon: one character`,`48px and below`,d.icons.single_character.use]]:[]])+(d.icons?k(`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">iOS caching.</b> ${d.icons.ios_caching_warning}</p>
        <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">One boundary is still ambiguous in the spec.</b> The tier table puts
        <i>signal</i> at 32px and below and <i>working</i> from 48px, while the icon rules and the hard rules
        above both cut at 48px. <b style="color:var(--pl-fg)">Use 48px.</b> It is the number Ofir's rule and the
        platform-icon rule agree on, and it is the conservative one. Flagged to the Marketing Designer to settle
        in <code>spec.json</code>.</p>`):``)}},X={name:`Lockups`,render:()=>{let e=d.wordmark,t=e.lockups.primary,n=e.lockups.compact;return D(`The mark stands alone wherever the name is not needed, and it carries no type of its own. Where the
        name <i>is</i> needed there are exactly two arrangements, both set in <b>${e.face.split(` (`)[0]}</b>.
        A round face and not a restrained one, on Ofir's call: the roundness should <i>echo</i> the characters so
        the identity speaks one language, instead of counterweighting them and making the heads look like a
        decoration bolted onto somebody else's wordmark.`)+O(`Primary - horizontal, two lines, vertically centred`)+j([A(`<img src="${L(`primary.webp`)}" alt="The primary lockup on cream"
          style="width:92%;max-width:460px;display:block">`,`On cream`,`cream`,`32px`),A(`<img src="${L(`primary-light.webp`)}" alt="The primary lockup on dark"
          style="width:92%;max-width:460px;display:block">`,`On dark - type flips to cream, the heads never change`,`dark`,`32px`)],`320px`)+`<div style="margin-top:16px">${N([[`Structure`,`mark left, name right`,t.structure],[`Name cap height`,t.name_cap_height,`Measured against the mark, so it holds at any size.`],[`Gap, mark to name`,t.gap,`Of the mark height, same reason.`],[`Leading`,String(t.leading),`The two lines of type answer the two rows of heads.`],[`Vertical alignment`,`CENTRED, never top-aligned`,t.alignment_note],[`Minimum`,`64px mark height`,`Below that the mark goes alone. Smallest authored rung:
          ${T.lockups[`primary-160.webp`].w} x ${T.lockups[`primary-160.webp`].h}px.`]])}</div><div style="margin-top:12px">${A(`<img src="${L(`primary-160.webp`)}" alt="The primary lockup at its 64px minimum" style="display:block">`,`The minimum, at true size: ${T.lockups[`primary-160.webp`].w}px wide = a 64px mark`,`cream`,`28px`)}</div>`+O(`Compact - mark above, name on two lines under`)+j([A(`<img src="${L(`compact.webp`)}" alt="The compact lockup on cream"
          style="width:56%;max-width:190px;display:block">`,`On cream`,`cream`,`28px`),A(`<img src="${L(`compact-light.webp`)}" alt="The compact lockup on dark"
          style="width:56%;max-width:190px;display:block">`,`On dark`,`dark`,`28px`),A(`<img src="${L(`compact-120.webp`)}" alt="The compact lockup at its 120px minimum"
          style="display:block">`,`The minimum, at true size: ${T.lockups[`compact-120.webp`].w}px wide`,`cream`,`28px`)],`210px`)+`<div style="margin-top:16px">${N([[`Structure`,`mark above, name under`,n.structure],[`When`,`the horizontal will not fit`,`A narrow column, a mobile header, a square slot.`],[`Sizing rule`,`"Product" measures to the mark`,n.sizing_rule],[`Alignment`,`"Lab" centred under "Product"`,n.alignment],[`Leading`,String(n.leading),`Same as primary.`],[`Gap, mark to name`,n.gap,`Of the mark height.`],[`Minimum`,`120px wide`,n.minimum]])}</div>`+O(`Colour`)+j([P(`type on light`,T.palette.type_on_light),P(`type on dark`,T.palette.type_on_dark)],`200px`,`10px`)+`<div style="margin-top:16px">${M(`no`,`Never hand-set a lockup`,`Both are generated from the live mark by <code>export_lockups.py</code>, so every ratio holds at any
         size. Setting the name next to the mark by eye is exactly how a lockup drifts, and it is how the
         first build ended up top-aligned.`)}</div>`}},Z={name:`Do and Don't`,render:()=>D(`Six prohibitions and one standing instruction. Every one of them is measured or decided, none of
      them is preference.`)+j([M(`no`,`Never add a shadow`,`Not under the heads, not under the beard. It reads as craft at 512px and as dirt at 32px, and it is
         the single thing that makes the mark look cheap when it shrinks.`),M(`no`,`Never put it in a container`,`No plate, no circle, no rounded square behind it. The heads hold together on their own; a frame turns
         a mark into a sticker. The one exception is a platform tile that requires an opaque square, and even
         there the ground is brand cream, not a shape.`),M(`no`,`Never rearrange the four`,`The reading order is fixed: ${I.join(`, `)}. A row is not this logo, and neither is a trio.`),M(`no`,`Never stretch, recolour or outline`,`The four colours are the brand. On dark the mark is unchanged - do not add a keyline to help it.`),M(`no`,`Never use the four heads below 48px`,`Use the single character. This is arithmetic, not preference: at 32px each face gets 16px.`),M(`no`,`Never hand-set the lockup`,`Both lockups are generated. Placing the name beside the mark by eye breaks ratios that were measured.`),M(`yes`,`Always let it breathe`,`One head width of clear space on every side, all four sides. Nothing crops it, nothing overlaps it.`)],`280px`,`16px`,`start`)+O(`The four you can see`)+D(`Deliberately wrong renders, generated from the master by the same script so they cannot go stale.
      Nothing below is artwork. The files are named <code>dont-*</code> for that reason.`)+j([B(`dont-shadow.webp`,`Shadow`,`Craft at 512px, dirt at 32px.`),B(`dont-container.webp`,`Container`,`A frame turns a mark into a sticker.`),B(`dont-rearranged.webp`,`Rearranged`,`The order is ${I.join(`, `)}.`),B(`dont-stretched.webp`,`Stretched`,`The aspect is ${H.aspect} : 1 and it is fixed.`)],`210px`,`16px`,`start`)+O(`Known weakness, stated plainly`)+k(`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">The one-colour mark is not finished.</b> ${d.known_weakness.monochrome}
      Until that redraw exists, do not ship a monochrome Product Lab mark: use the colour mark, or the single
      character.</p>`)},Q={name:`Adoption status`,render:()=>D(`What the live site ships today is <b>not</b> this logo. Recording that here rather than quietly
      fixing it: the site UI is out of scope for this branch, and both items below are decisions, not chores.`)+j([A(`<div class="sb-row" style="justify-content:center">
          <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
          <img src="assets/favicon.png" alt="the favicon the site ships today" width="48" height="48"
            style="border-radius:12px">
        </div>`,`Live today: a text wordmark and the old favicon`,`paper`,`28px`),A(`<img src="${L(`primary.webp`)}" alt="The approved primary lockup"
        style="width:92%;max-width:380px;display:block">`,`Approved 2026-08-22: the primary lockup`,`cream`,`28px`)],`320px`)+O(`Open items`)+j([M(`no`,`The site header has not adopted the lockup`,`<code>.nav__brand--text</code> still sets the name as plain type. Ofir was explicit on 2026-08-22 that
         nothing changes in the website UI, so this is a separate Product Designer change on its own branch,
         not part of the Brand section.`),M(`yes`,`The favicon IS authorised`,`<code>assets/favicon.png</code> predates the mark. The one carve-out Ofir gave on 2026-08-22 was
         "also update the favicon". The single-character set is built at
         <code>ofir-agents-cloud/assets/logo/out/favicon/</code>; wiring it is the Product Designer's, on this
         same branch. Sizes and the tier rule are in Brand/Logo, Sizes.`),M(`no`,`The crew tokens do not match the logo`,`All four <code>--pl-crew-*</code> values differ from the character hexes, and brand cream and ink have
         no token at all. One palette or two is Ofir's call; see Brand/Logo, The cast.`),M(`no`,`The monochrome mark needs a redraw, not a desaturation`,`Open with the Marketing Designer. Nothing monochrome ships until it exists.`)],`280px`,`16px`,`start`)},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Overview',
  render: () => lead(\`The logo is the four heads. Nothing else is required for it to be the logo: no frame, no
      container, no plate, and no words. It reads as a team because the four share one face language,
      the same eye, the same nose, the same smile, the same light. It reads as four people because each
      one owns a single unmistakable feature. Approved by Ofir on \${measured.approval.date}; the mark and
      the brand book are the Marketing Designer's, this section is the system's copy of record.\`) + grid([figure(\`<img src="\${A('mark-master.webp')}" alt="The Product Lab mark: four felt heads in a 2x2"
        style="width:78%;max-width:340px;display:block">\`, 'On brand cream - the default', 'cream'), figure(\`<img src="\${A('mark-master.webp')}" alt="The Product Lab mark on a dark ground"
        style="width:78%;max-width:340px;display:block">\`, 'On dark - unchanged, no outline added', 'dark')]) + h('The three legal grounds') + grid([chip('cream', G.cream, 'the default ground'), chip('paper', G.paper, 'documents, decks'), chip('dark', G.dark, 'the mark is unchanged on it')], '200px', '10px') + h('Provenance') + card(\`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Source of truth.</b> The masters, the generator and every export live in
      <code>ofir-agents-cloud/assets/logo/</code>, owned by the Marketing Designer. This Storybook carries
      downsized copies plus a generated <code>measured.json</code>. It is not the master and must never be
      edited as if it were.</p>
      <p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Refresh.</b> <code style="\${mono}">python3 scripts/build_brand_assets.py</code>
      re-pulls the artwork, re-measures it and rewrites every number on these pages. Nothing here is typed by
      hand, so a new export cannot leave this section describing an old logo.</p>
      <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
      <b style="color:var(--pl-fg)">Approved</b> by Ofir on \${measured.approval.date}, on the primary lockup.
      The approval artefact is <code>reference/APPROVED-lockup-\${measured.approval.date}.jpg</code> in the
      source folder; it is a typeface study sheet, so it is deliberately not reproduced here - a page of
      options does not belong in the section that says what the answer is.</p>\`)
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:"{\n  name: 'Construction',\n  render: () => lead(`The obvious way to build a 2x2 is to give every head an equal cell and centre it. It reads loose\n      and lopsided, because a tall narrow head leaves slack inside its own cell. So the proximity is a\n      <b>measurement, not a taste call</b>: it was read off Ofir's own approved artwork. The two gutters are\n      deliberately different. The rows interlock and the columns keep just enough air to separate four faces.`) + grid([figure(`<div style=\"position:relative;width:78%;max-width:320px\">\n          <img src=\"${A('mark-master.webp')}\" alt=\"The mark with its two channels marked\"\n            style=\"width:100%;display:block\">\n          <div style=\"position:absolute;top:0;bottom:0;left:${pct(M.column_channel_left_of_mark_width)};\n            width:${pct(M.column_channel_of_mark_width)};background:rgb(124 58 237 / .34);\n            outline:1px solid var(--pl-accent)\"></div>\n          <div style=\"position:absolute;left:0;right:0;top:${pct(M.row_channel_top_of_mark_height)};\n            height:max(2px,${pct(M.row_channel_of_mark_width * M.aspect)});background:rgb(124 58 237 / .34);\n            outline:1px solid var(--pl-accent)\"></div>\n        </div>`, `Channels: ${M.column_channel_px}px across, ${M.row_channel_px}px down, on a ${M.master_px[0]}px mark`, 'cream'), figure(`<div style=\"width:${pct(clearOuter)};position:relative;\n          outline:2px dashed var(--pl-accent);padding:${pct(clearPad)}\">\n          <img src=\"${A('mark-master.webp')}\" alt=\"The mark inside its clear space\"\n            style=\"width:100%;display:block\">\n        </div>`, `Clear space: one head width, ${pct(M.clear_space_of_mark_width)} of the mark width, all four sides`, 'cream', '28px')]) + h('The numbers') + facts([['Column gutter (authored)', `${M.gap_cols_authored} head widths`, 'Read off the reference: the bounding boxes sit 19-24px apart on a 141px head.'], ['Row gutter (authored)', `${M.gap_rows_authored} head widths`, 'Effectively touching. The rows interlock, and that is what makes the four read as one block.'], ['Column channel (rendered)', `${M.column_channel_px}px = ${pct(M.column_channel_of_mark_width)} of mark width`, 'What the authored ratio actually measures on the master.'], ['Row channel (rendered)', `${M.row_channel_px}px = ${pct(M.row_channel_of_mark_width)} of mark width`, 'Twenty times tighter than the columns. That asymmetry is the design.'], ['Master aspect', `${M.aspect} : 1`, `${M.master_px[0]} x ${M.master_px[1]}. Taller than wide - the top row carries tufts and a beanie.`], ['Clear space', `one head width (${pct(M.clear_space_of_mark_width)} of mark width)`, 'All four sides. Simple to eyeball, and it scales with the mark.'], ['Row alignment', 'shared baseline', 'Crowns differ between characters, chins do not. Rows are baseline-aligned, not box-aligned.'], ['Normalisation', 'ink area, not bounding box', 'A beard or a tuft distorts a box but not a mass, so the heads are matched on area.'], ['Shadow', 'none, ever', 'Reads as craft at 512px and as dirt at 32px.']]) + h('Why not equal gutters') + card(`<p style=\"margin:0;font-size:.92rem;color:var(--pl-fg-secondary)\">The first build solved for an\n      <i>equal empty channel in both directions</i>. It is defensible on paper and it reads loose on the page,\n      and Ofir asked three separate times for the heads to sit closer. The answer was in his own artwork all\n      along. Any rebuild re-solves itself from the two ratios above, so a redrawn character never breaks the\n      packing. Generated by <code style=\"${mono}\">build_system.py</code> - never packed by hand.</p>`)\n}",...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'The cast',
  render: () => {
    const cells = ORDER.map(name => {
      const c = spec.characters[name];
      const img = measured.heads[name];
      return \`<figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
        overflow:hidden;background:var(--pl-surface)">
        <div style="background:\${G.cream};padding:18px;display:grid;place-items:center;min-height:150px">
          <img src="\${A(img.file)}" alt="The \${name} character" style="height:112px;width:auto;display:block">
        </div>
        <figcaption style="padding:12px 14px">
          <b style="display:block;text-transform:capitalize">\${name}</b>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin:2px 0 8px">
            \${c.cell.replace('-', ' ')} &middot; position \${c.order} in the reading order</span>
          <span style="display:block;font-size:.9rem">\${c.feature}</span>
          <span style="display:block;font-size:.86rem;color:var(--pl-fg-secondary);margin-top:6px">\${c.read}</span>
          <span style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;\${mono};
            color:var(--pl-fg-secondary)">
            <i style="width:12px;height:12px;border-radius:3px;background:\${c.body};display:inline-block"></i>
            \${c.body}</span>
        </figcaption></figure>\`;
    });
    const face = spec.shared_face_language;
    const shared = Object.entries(face).filter(([k]) => k !== '_').map(([k, v]) => \`<tr><td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);\${mono};white-space:nowrap;
        text-transform:capitalize">\${k}</td>
       <td style="padding:8px 12px;border-bottom:1px solid rgb(10 10 10 / .08);font-size:.9rem;
        color:var(--pl-fg-secondary)">\${v}</td></tr>\`).join('');
    return lead(\`Four characters, one feature each. The feature is what survives reduction: remove it and the
        character dies at small size, which is why none of them can be simplified into a plain coloured blob.
        The heads below are cut straight out of the master mark, so they are at exactly the scale the mark
        gives them. Reading order is fixed and it is never rearranged: \${ORDER.join(', ')}.\`) + grid(cells, '220px') + h('One face language') + \`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
        background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
        \${shared}</table></div>\` + h('The hexes the brand owns') + grid([...ORDER.map(n => chip(n, spec.characters[n].body, spec.characters[n].feature.split(',')[0])), chip('ground', measured.palette.ground, 'brand cream'), chip('ink', measured.palette.ink, 'type beside the mark'), chip('beanie navy', measured.palette.beanie_navy, 'the only accent that is not a body')], '190px', '10px') + h('Open: these are not the site tokens') + card(\`<p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">The four character hexes above are
        the <b style="color:var(--pl-fg)">logo</b> colours. The site ships four different ones under
        <code>--pl-crew-*</code>, and the brand cream and ink have no token at all. Compared live below - the
        left chip in each pair is the token in <code>styles.css</code>, the right one is the logo.
        Reconciling them is a palette decision for Ofir, not a silent edit, so nothing in
        <code>styles.css</code> was touched to build this page.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:14px">
          \${ORDER.map(n => \`<div style="border:1px solid var(--pl-border);border-radius:var(--radius-md);
            overflow:hidden">
            <div style="display:flex;height:46px">
              <div style="flex:1;background:var(--pl-crew-\${n})"></div>
              <div style="flex:1;background:\${spec.characters[n].body}"></div></div>
            <div style="padding:7px 9px;\${mono};color:var(--pl-fg-secondary)">
              --pl-crew-\${n} vs \${spec.characters[n].body}</div></div>\`).join('')}
        </div>\`);
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Sizes',
  render: () => {
    const dead = px => px < 48;
    const rungs = measured.ladder.map(({
      px,
      file,
      w,
      h: hh
    }) => \`
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;
        \${dead(px) ? 'opacity:.45' : ''}">
        <div style="min-height:150px;display:grid;place-items:end center">
          <img src="\${A(file)}" width="\${w}" height="\${hh}" alt="the mark at \${px}px"
            style="display:block"></div>
        <div style="width:104px;height:104px;background:\${G.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="\${A(file)}" alt="" style="width:104px;image-rendering:pixelated;display:block"></div>
        <small style="\${mono};color:var(--pl-fg-secondary)">\${px}px</small>
      </div>\`).join('');
    const favs = measured.favicon.map(({
      px,
      file,
      w,
      h: hh
    }) => \`
      <div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="min-height:60px;display:grid;place-items:end center">
          <img src="\${A(file)}" width="\${w}" height="\${hh}" alt="the single character at \${px}px"
            style="display:block"></div>
        <div style="width:88px;height:88px;background:\${G.paper};border:1px solid var(--pl-border);
          border-radius:var(--radius-sm);display:grid;place-items:center;overflow:hidden">
          <img src="\${A(file)}" alt="" style="width:88px;image-rendering:pixelated;display:block"></div>
        <small style="\${mono};color:var(--pl-fg-secondary)">\${px}px</small>
      </div>\`).join('');
    return lead(\`True pixel size on the top row, magnified underneath so nothing can hide. Read the small end.
        The greyed rungs are the ones you must not ship.\`) + \`<div style="display:flex;gap:28px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:\${G.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">\${rungs}</div>\` + h('The hard rules') + grid([rule('yes', '128px and up', 'Full mark. This is where it belongs and where the felt actually reads.'), rule('yes', '64px', 'Minimum for the four-head mark. Faces still carry their features.'), rule('no', '48px - borderline', 'Only on a surface where nothing smaller exists. Do not design toward it.'), rule('no', 'Never below 48px - use one character', \`A 2x2 gives every head a quarter of the width, so a 32px mark renders 16px faces. This is arithmetic,
           not draughtsmanship: no redraw fixes it. No four-head 2x2 survives 24px.\`)], '260px', '16px', 'start') + h('Below 48px it is one character') + lead(\`One head gets four times the pixels of a quarter tile. <b>Orange is the one</b>: a navy beanie over a
        light face over cream gives three values, and three values is exactly what survives when texture is gone.
        Teal's glasses vanish, purple's curls collapse into a crown, and yellow is the lowest-contrast pairing so
        it disappears first.\`) + \`<div style="display:flex;gap:24px;align-items:flex-end;overflow-x:auto;padding:18px 14px 14px;
        background:\${G.cream};border:1px solid var(--pl-border);border-radius:var(--radius-md)">\${favs}</div>\` + \`<p style="margin:10px 0 0;font-size:.9rem;color:var(--pl-fg-secondary)">
        \${spec.icons ? spec.icons.single_character.honest_limit : ''}</p>\` + h('Which tier, and which platform icon') + facts([...Object.entries(spec.tiers).filter(([k]) => k !== '_').map(([name, t]) => [\`Tier: \${name}\`, t.sizes, \`\${t.detail}. Use: \${t.use}.\`]), ...(spec.icons ? [['Platform icon: full mark', 'above 48px', spec.icons.full_mark.use], ['Platform icon: one character', '48px and below', spec.icons.single_character.use]] : [])]) + (spec.icons ? card(\`<p style="margin:0 0 10px;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">iOS caching.</b> \${spec.icons.ios_caching_warning}</p>
        <p style="margin:0;font-size:.92rem;color:var(--pl-fg-secondary)">
        <b style="color:var(--pl-fg)">One boundary is still ambiguous in the spec.</b> The tier table puts
        <i>signal</i> at 32px and below and <i>working</i> from 48px, while the icon rules and the hard rules
        above both cut at 48px. <b style="color:var(--pl-fg)">Use 48px.</b> It is the number Ofir's rule and the
        platform-icon rule agree on, and it is the conservative one. Flagged to the Marketing Designer to settle
        in <code>spec.json</code>.</p>\`) : '');
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Lockups',
  render: () => {
    const w = spec.wordmark;
    const p = w.lockups.primary;
    const c = w.lockups.compact;
    return lead(\`The mark stands alone wherever the name is not needed, and it carries no type of its own. Where the
        name <i>is</i> needed there are exactly two arrangements, both set in <b>\${w.face.split(' (')[0]}</b>.
        A round face and not a restrained one, on Ofir's call: the roundness should <i>echo</i> the characters so
        the identity speaks one language, instead of counterweighting them and making the heads look like a
        decoration bolted onto somebody else's wordmark.\`) + h('Primary - horizontal, two lines, vertically centred') + grid([figure(\`<img src="\${A('primary.webp')}" alt="The primary lockup on cream"
          style="width:92%;max-width:460px;display:block">\`, 'On cream', 'cream', '32px'), figure(\`<img src="\${A('primary-light.webp')}" alt="The primary lockup on dark"
          style="width:92%;max-width:460px;display:block">\`, 'On dark - type flips to cream, the heads never change', 'dark', '32px')], '320px') + \`<div style="margin-top:16px">\${facts([['Structure', 'mark left, name right', p.structure], ['Name cap height', p.name_cap_height, 'Measured against the mark, so it holds at any size.'], ['Gap, mark to name', p.gap, 'Of the mark height, same reason.'], ['Leading', String(p.leading), 'The two lines of type answer the two rows of heads.'], ['Vertical alignment', 'CENTRED, never top-aligned', p.alignment_note], ['Minimum', '64px mark height', \`Below that the mark goes alone. Smallest authored rung:
          \${measured.lockups['primary-160.webp'].w} x \${measured.lockups['primary-160.webp'].h}px.\`]])}</div>\` + \`<div style="margin-top:12px">\${figure(\`<img src="\${A('primary-160.webp')}" alt="The primary lockup at its 64px minimum" style="display:block">\`, \`The minimum, at true size: \${measured.lockups['primary-160.webp'].w}px wide = a 64px mark\`, 'cream', '28px')}</div>\` + h('Compact - mark above, name on two lines under') + grid([figure(\`<img src="\${A('compact.webp')}" alt="The compact lockup on cream"
          style="width:56%;max-width:190px;display:block">\`, 'On cream', 'cream', '28px'), figure(\`<img src="\${A('compact-light.webp')}" alt="The compact lockup on dark"
          style="width:56%;max-width:190px;display:block">\`, 'On dark', 'dark', '28px'), figure(\`<img src="\${A('compact-120.webp')}" alt="The compact lockup at its 120px minimum"
          style="display:block">\`, \`The minimum, at true size: \${measured.lockups['compact-120.webp'].w}px wide\`, 'cream', '28px')], '210px') + \`<div style="margin-top:16px">\${facts([['Structure', 'mark above, name under', c.structure], ['When', 'the horizontal will not fit', 'A narrow column, a mobile header, a square slot.'], ['Sizing rule', '"Product" measures to the mark', c.sizing_rule], ['Alignment', '"Lab" centred under "Product"', c.alignment], ['Leading', String(c.leading), 'Same as primary.'], ['Gap, mark to name', c.gap, 'Of the mark height.'], ['Minimum', '120px wide', c.minimum]])}</div>\` + h('Colour') + grid([chip('type on light', measured.palette.type_on_light), chip('type on dark', measured.palette.type_on_dark)], '200px', '10px') + \`<div style="margin-top:16px">\${rule('no', 'Never hand-set a lockup', \`Both are generated from the live mark by <code>export_lockups.py</code>, so every ratio holds at any
         size. Setting the name next to the mark by eye is exactly how a lockup drifts, and it is how the
         first build ended up top-aligned.\`)}</div>\`;
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:"{\n  name: \"Do and Don't\",\n  render: () => lead(`Six prohibitions and one standing instruction. Every one of them is measured or decided, none of\n      them is preference.`) + grid([rule('no', 'Never add a shadow', `Not under the heads, not under the beard. It reads as craft at 512px and as dirt at 32px, and it is\n         the single thing that makes the mark look cheap when it shrinks.`), rule('no', 'Never put it in a container', `No plate, no circle, no rounded square behind it. The heads hold together on their own; a frame turns\n         a mark into a sticker. The one exception is a platform tile that requires an opaque square, and even\n         there the ground is brand cream, not a shape.`), rule('no', 'Never rearrange the four', `The reading order is fixed: ${ORDER.join(', ')}. A row is not this logo, and neither is a trio.`), rule('no', 'Never stretch, recolour or outline', `The four colours are the brand. On dark the mark is unchanged - do not add a keyline to help it.`), rule('no', 'Never use the four heads below 48px', `Use the single character. This is arithmetic, not preference: at 32px each face gets 16px.`), rule('no', 'Never hand-set the lockup', `Both lockups are generated. Placing the name beside the mark by eye breaks ratios that were measured.`), rule('yes', 'Always let it breathe', `One head width of clear space on every side, all four sides. Nothing crops it, nothing overlaps it.`)], '280px', '16px', 'start') + h('The four you can see') + lead(`Deliberately wrong renders, generated from the master by the same script so they cannot go stale.\n      Nothing below is artwork. The files are named <code>dont-*</code> for that reason.`) + grid([dont('dont-shadow.webp', 'Shadow', 'Craft at 512px, dirt at 32px.'), dont('dont-container.webp', 'Container', 'A frame turns a mark into a sticker.'), dont('dont-rearranged.webp', 'Rearranged', `The order is ${ORDER.join(', ')}.`), dont('dont-stretched.webp', 'Stretched', `The aspect is ${M.aspect} : 1 and it is fixed.`)], '210px', '16px', 'start') + h('Known weakness, stated plainly') + card(`<p style=\"margin:0;font-size:.92rem;color:var(--pl-fg-secondary)\">\n      <b style=\"color:var(--pl-fg)\">The one-colour mark is not finished.</b> ${spec.known_weakness.monochrome}\n      Until that redraw exists, do not ship a monochrome Product Lab mark: use the colour mark, or the single\n      character.</p>`)\n}",...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Adoption status',
  render: () => lead(\`What the live site ships today is <b>not</b> this logo. Recording that here rather than quietly
      fixing it: the site UI is out of scope for this branch, and both items below are decisions, not chores.\`) + grid([figure(\`<div class="sb-row" style="justify-content:center">
          <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
          <img src="assets/favicon.png" alt="the favicon the site ships today" width="48" height="48"
            style="border-radius:12px">
        </div>\`, 'Live today: a text wordmark and the old favicon', 'paper', '28px'), figure(\`<img src="\${A('primary.webp')}" alt="The approved primary lockup"
        style="width:92%;max-width:380px;display:block">\`, 'Approved 2026-08-22: the primary lockup', 'cream', '28px')], '320px') + h('Open items') + grid([rule('no', 'The site header has not adopted the lockup', \`<code>.nav__brand--text</code> still sets the name as plain type. Ofir was explicit on 2026-08-22 that
         nothing changes in the website UI, so this is a separate Product Designer change on its own branch,
         not part of the Brand section.\`), rule('yes', 'The favicon IS authorised', \`<code>assets/favicon.png</code> predates the mark. The one carve-out Ofir gave on 2026-08-22 was
         "also update the favicon". The single-character set is built at
         <code>ofir-agents-cloud/assets/logo/out/favicon/</code>; wiring it is the Product Designer's, on this
         same branch. Sizes and the tier rule are in Brand/Logo, Sizes.\`), rule('no', 'The crew tokens do not match the logo', \`All four <code>--pl-crew-*</code> values differ from the character hexes, and brand cream and ink have
         no token at all. One palette or two is Ofir's call; see Brand/Logo, The cast.\`), rule('no', 'The monochrome mark needs a redraw, not a desaturation', \`Open with the Marketing Designer. Nothing monochrome ships until it exists.\`)], '280px', '16px', 'start')
}`,...Q.parameters?.docs?.source}}},$=[`Overview`,`Construction`,`Cast`,`Sizes`,`Lockups`,`DoAndDont`,`Adoption`]})))()}te();export{Q as Adoption,J as Cast,q as Construction,Z as DoAndDont,X as Lockups,K as Overview,Y as Sizes,$ as __namedExportsOrder,V as default};
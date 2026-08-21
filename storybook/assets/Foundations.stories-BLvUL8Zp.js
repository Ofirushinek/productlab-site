import{t as e}from"./rolldown-runtime-Dh6celcD.js";function t(){let e=[],t=new Set;for(let n of Array.from(document.styleSheets)){let r;try{r=n.cssRules}catch{continue}for(let n of Array.from(r||[]))if(n instanceof CSSStyleRule&&/(^|,)\s*:root\s*$/.test(n.selectorText))for(let r of Array.from(n.style))!r.startsWith(`--`)||t.has(r)||(t.add(r),e.push([r,n.style.getPropertyValue(r).trim()]))}return e}function n(...e){return t().filter(([t])=>e.some(e=>t.startsWith(e)))}function r(e){return getComputedStyle(document.documentElement).getPropertyValue(e).trim()}function i(e){return`<p class="section-lead" style="max-width:76ch;margin:0 0 16px">${e}</p>`}function a(e,t=`18px`){return`<div style="background:var(--pl-surface);border:1px solid var(--pl-border);
    border-radius:var(--radius-md);padding:${t}">${e}</div>`}function o(e){return`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(184px,1fr));gap:10px">
    ${e.map(([e,t,n])=>`
    <figure style="margin:0;border:1px solid var(--pl-border);border-radius:var(--radius-md);
      overflow:hidden;background:var(--pl-surface)">
      <div style="height:60px;${n||`background:${t}`}"></div>
      <figcaption style="padding:8px 10px;${c};color:var(--pl-fg)">${e}
        <span style="display:block;font-weight:500;color:var(--pl-fg-secondary)">${t}</span>
      </figcaption>
    </figure>`).join(``)}</div>`}function s(e,t){return`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;
    background:var(--pl-surface);border:1px solid var(--pl-border);border-radius:var(--radius-md)">
    ${`<tr style="background:var(--pl-bg)">
    ${[`Token`,`Value`,t&&t.head].filter(Boolean).map(e=>`<th style="text-align:start;padding:8px 12px;border-bottom:1px solid var(--pl-border);${c}">${e}</th>`).join(``)}</tr>`}${e.map(([e,n])=>`<tr>
    <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${c};white-space:nowrap">${e}</td>
    <td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08);${c};font-weight:500;color:var(--pl-fg-secondary);white-space:nowrap">${n}</td>
    ${t?`<td style="padding:7px 12px;border-bottom:1px solid rgb(10 10 10 / .08)">${t.cell(e,n)}</td>`:``}
  </tr>`).join(``)}</table></div>`}var c;function l(){return(l=e((()=>{c=`font:600 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;unicode-bidi:isolate;text-align:left`})))()}var u,d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{l(),u={title:`Foundations`,parameters:{layout:`padded`,docs:{description:{component:`Foundations — the alphabet of the system: color, type, space, radius, shadow,
the control ladder, motion and the layout frame. Every value on these pages is
read live out of styles.css at render time, so this section cannot drift from
what ships.`}}}},d={"--pl-surface":e=>`background:${e};border-bottom:1px solid var(--pl-border)`,"--pl-elevated":e=>`background:${e};box-shadow:var(--shadow-pl-md)`,"--pl-border":e=>`background:var(--pl-bg);box-shadow:inset 0 0 0 5px ${e}`,"--pl-border-strong":e=>`background:var(--pl-bg);box-shadow:inset 0 0 0 5px ${e}`,"--pl-grid-dot":e=>`background:radial-gradient(${e} 1px, var(--pl-surface) 1px);background-size:12px 12px`},f=([e,t])=>[e,t,d[e]?d[e](t):`background:${t}`],p={name:`Color`,render:()=>i(`The ground is warm paper, the ink is near black, and exactly one violet carries every action.
      Content ink is <code>--pl-fg-body</code>; the two lighter grays are for true meta only, never for text
      somebody has to read.`)+o(n(`--pl-bg`,`--pl-surface`,`--pl-elevated`,`--pl-fg`,`--pl-border`,`--pl-accent`,`--pl-illo`,`--pl-grid`,`--pl-tooltip`).map(f))},m={name:`Crew palette`,render:()=>i(`The felt cast colors. Playful accents only: never text, never controls, never status.
      Role mapping is final: purple = Designer, orange = Strategist, teal = Architect, yellow stays unassigned.`)+o(n(`--pl-crew-`).map(f))},h={name:`Status`,render:()=>i(`Semantic funnel-stage tokens for the students table. Three of the six alias into the palette on
      purpose, so a brand change carries through; only blue, green and red are new hues a six-stage funnel needs.
      Referenced by <code>.roster__stage--*</code> and nowhere else.`)+o(n(`--pl-stage-`).map(([e,t])=>[e,t,`background:${r(e)}`]))},g={name:`Typography`,render:()=>{let e=e=>e===`--text-caption`?600:e.includes(`h1`)||e.includes(`h2`)||e.includes(`display`)?700:500,t=n(`--text-`).map(([t,n])=>`
      <div style="display:flex;align-items:baseline;gap:20px;padding:12px 0;border-bottom:1px dashed var(--pl-border)">
        <span style="min-width:260px;flex:none;${c};font-weight:500;color:var(--pl-fg-secondary)">${t}<br>${n}</span>
        <span style="font-size:${n};font-weight:${e(t)};color:var(--pl-fg);line-height:1.15;
          ${t===`--text-caption`?`letter-spacing:.06em;text-transform:uppercase`:``}">Product Lab</span>
      </div>`).join(``);return i(`Inter carries Latin, Heebo carries Hebrew, both at 400 to 700. Body is medium 500 and headings are
        bold 700: there is no thin text in this system. The four display sizes are fluid clamps, so the scale
        compresses on a phone instead of wrapping.`)+a(t,`2px 18px`)}},_={name:`Spacing`,render:()=>{let e=n(`--space-`).map(([e,t])=>`
      <div style="text-align:center">
        <div style="width:72px;height:${t};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);
          border-radius:var(--radius-sm)"></div>
        <div style="${c};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">${t}</div>
      </div>`).join(``);return i(`An 8 px grid with a single 4 px half-step for tight optical gaps. Gap, padding and margin come from
        this scale; an ad hoc rem value is a bug, not a decision.`)+`<div style="display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap">${e}</div><div style="margin-top:22px">${s(n(`--space-`))}</div>`}},v={name:`Radius and shadow`,render:()=>{let e=n(`--radius-`).map(([e,t])=>`
      <div style="width:104px;height:78px;background:var(--pl-surface);border:1.5px solid var(--pl-border-strong);
        border-radius:${t};display:flex;align-items:center;justify-content:center;${c}">${t}</div>`).join(``),t=n(`--shadow-pl-`).map(([e,t])=>`
      <div style="width:156px;height:88px;background:var(--pl-surface);border-radius:var(--radius-md);
        box-shadow:${t};display:flex;align-items:center;justify-content:center;${c};text-align:center">
        ${e.replace(`--shadow-pl-`,``)}</div>`).join(``);return i(`A corner is one of the radius rungs, nothing in between. Elevation is four steps of the same soft,
        low-contrast shadow: paper lifting off paper, never a hard drop.`)+`<div style="display:flex;gap:14px;flex-wrap:wrap">${e}</div>
       <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:30px">${t}</div>`}},y={name:`Control ladder`,render:()=>{let e={"--ctl-xs":`quiet inline toggles`,"--ctl-sm":`header and secondary buttons`,"--ctl-md":`primary buttons, form fields`,"--ctl-lg":`hero-scale CTA`},t=n(`--ctl-`).map(([e,t])=>`
      <div style="text-align:center">
        <div style="width:104px;height:${t};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);
          border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;${c}">${t}</div>
        <div style="${c};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">${e.replace(`--ctl-`,``)}</div>
      </div>`).join(``),r=n(`--icon-`).map(([e,t])=>`
      <span style="display:inline-flex;align-items:center;gap:8px;${c};font-weight:500;color:var(--pl-fg-secondary)">
        <span style="width:${t};height:${t};background:var(--pl-fg);border-radius:var(--radius-sm);display:inline-block"></span>
        ${e} ${t}</span>`).join(``);return i(`Every interactive control is one of four heights and nothing between them, so controls always line up
        with each other and with the spacing scale. An icon-only control is a square at its own rung. Adding a
        fifth rung is a design-system decision, not a local override.`)+`<div style="display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap">${t}</div>
       <p class="section-lead" style="margin:26px 0 10px">Icons pair to the rungs: 16 on xs and sm, 20 on md, 24 on lg.</p>
       <div style="display:flex;gap:26px;flex-wrap:wrap;align-items:center">${r}</div><div style="margin-top:22px">${s(n(`--ctl-`),{head:`Used for`,cell:t=>e[t]||``})}</div>`}},b={name:`Motion`,render:()=>`
    <style>
      .sb-ease { display:flex;align-items:center;gap:14px;padding:26px;background:var(--pl-surface);
        border:1px solid var(--pl-border);border-radius:var(--radius-md) }
      .sb-ease__ball { width:22px;height:22px;border-radius:99px;background:var(--pl-accent);
        animation:sb-slide 2.4s var(--ease-pl) infinite alternate }
      @keyframes sb-slide { from { transform:translateX(0) } to { transform:translateX(240px) } }
      @media (prefers-reduced-motion: reduce) { .sb-ease__ball { animation:none } }
    </style>
    ${i(`One easing token drives every transition in the product: a fast start that settles rather than
      bounces. Presses scale to 0.975, reveals fade and rise. Nothing loops, this demo excepted.`)}
    <div class="sb-ease"><span class="sb-ease__ball"></span></div>
    <div style="margin-top:18px">${s(n(`--ease-`))}</div>`},x={name:`Layout`,render:()=>i(`The page frame. Content sits in a 1120 px measure, prose narrows to 760, and the horizontal pad is
      fluid so a phone never gets a 48 px gutter. The header is one small control plus 12 px of breathing on
      each side, which is where 64 px comes from.`)+s(n(`--pad-x`,`--maxw`,`--nav-h`))},S={name:`All tokens`,render:()=>{let e=t();return i(`Every custom property declared on <code>:root</code> in the production stylesheet, in declaration
        order. ${e.length} tokens. This table is generated from the stylesheet itself at render time, so it is
        the index, not a copy of one.`)+s(e,{head:`Computed`,cell:(e,t)=>{let n=r(e);return n===t?``:`<span style="${c};font-weight:500;color:var(--pl-fg-secondary)">${n}</span>`}})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "Color",
  render: () => note(\`The ground is warm paper, the ink is near black, and exactly one violet carries every action.
      Content ink is <code>--pl-fg-body</code>; the two lighter grays are for true meta only, never for text
      somebody has to read.\`) + swatches(tokensByPrefix("--pl-bg", "--pl-surface", "--pl-elevated", "--pl-fg", "--pl-border", "--pl-accent", "--pl-illo", "--pl-grid", "--pl-tooltip").map(paint))
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "Crew palette",
  render: () => note(\`The felt cast colors. Playful accents only: never text, never controls, never status.
      Role mapping is final: purple = Designer, orange = Strategist, teal = Architect, yellow stays unassigned.\`) + swatches(tokensByPrefix("--pl-crew-").map(paint))
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "Status",
  render: () => note(\`Semantic funnel-stage tokens for the students table. Three of the six alias into the palette on
      purpose, so a brand change carries through; only blue, green and red are new hues a six-stage funnel needs.
      Referenced by <code>.roster__stage--*</code> and nowhere else.\`) + swatches(tokensByPrefix("--pl-stage-").map(([n, v]) => [n, v, \`background:\${resolve(n)}\`]))
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "Typography",
  render: () => {
    const weight = n => n === "--text-caption" ? 600 : n.includes("h1") || n.includes("h2") || n.includes("display") ? 700 : 500;
    const rows = tokensByPrefix("--text-").map(([name, value]) => \`
      <div style="display:flex;align-items:baseline;gap:20px;padding:12px 0;border-bottom:1px dashed var(--pl-border)">
        <span style="min-width:260px;flex:none;\${mono};font-weight:500;color:var(--pl-fg-secondary)">\${name}<br>\${value}</span>
        <span style="font-size:\${value};font-weight:\${weight(name)};color:var(--pl-fg);line-height:1.15;
          \${name === "--text-caption" ? "letter-spacing:.06em;text-transform:uppercase" : ""}">Product Lab</span>
      </div>\`).join("");
    return note(\`Inter carries Latin, Heebo carries Hebrew, both at 400 to 700. Body is medium 500 and headings are
        bold 700: there is no thin text in this system. The four display sizes are fluid clamps, so the scale
        compresses on a phone instead of wrapping.\`) + card(rows, "2px 18px");
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:'{\n  name: "Spacing",\n  render: () => {\n    const bars = tokensByPrefix("--space-").map(([name, value]) => `\n      <div style="text-align:center">\n        <div style="width:72px;height:${value};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);\n          border-radius:var(--radius-sm)"></div>\n        <div style="${mono};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">${value}</div>\n      </div>`).join("");\n    return note(`An 8 px grid with a single 4 px half-step for tight optical gaps. Gap, padding and margin come from\n        this scale; an ad hoc rem value is a bug, not a decision.`) + `<div style="display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap">${bars}</div>` + `<div style="margin-top:22px">${tokenTable(tokensByPrefix("--space-"))}</div>`;\n  }\n}',..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:'{\n  name: "Radius and shadow",\n  render: () => {\n    const radii = tokensByPrefix("--radius-").map(([name, value]) => `\n      <div style="width:104px;height:78px;background:var(--pl-surface);border:1.5px solid var(--pl-border-strong);\n        border-radius:${value};display:flex;align-items:center;justify-content:center;${mono}">${value}</div>`).join("");\n    const shadows = tokensByPrefix("--shadow-pl-").map(([name, value]) => `\n      <div style="width:156px;height:88px;background:var(--pl-surface);border-radius:var(--radius-md);\n        box-shadow:${value};display:flex;align-items:center;justify-content:center;${mono};text-align:center">\n        ${name.replace("--shadow-pl-", "")}</div>`).join("");\n    return note(`A corner is one of the radius rungs, nothing in between. Elevation is four steps of the same soft,\n        low-contrast shadow: paper lifting off paper, never a hard drop.`) + `<div style="display:flex;gap:14px;flex-wrap:wrap">${radii}</div>\n       <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:30px">${shadows}</div>`;\n  }\n}',...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Control ladder",
  render: () => {
    const use = {
      "--ctl-xs": "quiet inline toggles",
      "--ctl-sm": "header and secondary buttons",
      "--ctl-md": "primary buttons, form fields",
      "--ctl-lg": "hero-scale CTA"
    };
    const rungs = tokensByPrefix("--ctl-").map(([name, value]) => \`
      <div style="text-align:center">
        <div style="width:104px;height:\${value};background:rgb(124 58 237 / .16);border:1px solid var(--pl-accent);
          border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;\${mono}">\${value}</div>
        <div style="\${mono};font-weight:500;color:var(--pl-fg-secondary);margin-top:6px">\${name.replace("--ctl-", "")}</div>
      </div>\`).join("");
    const icons = tokensByPrefix("--icon-").map(([name, value]) => \`
      <span style="display:inline-flex;align-items:center;gap:8px;\${mono};font-weight:500;color:var(--pl-fg-secondary)">
        <span style="width:\${value};height:\${value};background:var(--pl-fg);border-radius:var(--radius-sm);display:inline-block"></span>
        \${name} \${value}</span>\`).join("");
    return note(\`Every interactive control is one of four heights and nothing between them, so controls always line up
        with each other and with the spacing scale. An icon-only control is a square at its own rung. Adding a
        fifth rung is a design-system decision, not a local override.\`) + \`<div style="display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap">\${rungs}</div>
       <p class="section-lead" style="margin:26px 0 10px">Icons pair to the rungs: 16 on xs and sm, 20 on md, 24 on lg.</p>
       <div style="display:flex;gap:26px;flex-wrap:wrap;align-items:center">\${icons}</div>\` + \`<div style="margin-top:22px">\${tokenTable(tokensByPrefix("--ctl-"), {
      head: "Used for",
      cell: n => use[n] || ""
    })}</div>\`;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "Motion",
  render: () => \`
    <style>
      .sb-ease { display:flex;align-items:center;gap:14px;padding:26px;background:var(--pl-surface);
        border:1px solid var(--pl-border);border-radius:var(--radius-md) }
      .sb-ease__ball { width:22px;height:22px;border-radius:99px;background:var(--pl-accent);
        animation:sb-slide 2.4s var(--ease-pl) infinite alternate }
      @keyframes sb-slide { from { transform:translateX(0) } to { transform:translateX(240px) } }
      @media (prefers-reduced-motion: reduce) { .sb-ease__ball { animation:none } }
    </style>
    \${note(\`One easing token drives every transition in the product: a fast start that settles rather than
      bounces. Presses scale to 0.975, reveals fade and rise. Nothing loops, this demo excepted.\`)}
    <div class="sb-ease"><span class="sb-ease__ball"></span></div>
    <div style="margin-top:18px">\${tokenTable(tokensByPrefix("--ease-"))}</div>\`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: "Layout",
  render: () => note(\`The page frame. Content sits in a 1120 px measure, prose narrows to 760, and the horizontal pad is
      fluid so a phone never gets a 48 px gutter. The header is one small control plus 12 px of breathing on
      each side, which is where 64 px comes from.\`) + tokenTable(tokensByPrefix("--pad-x", "--maxw", "--nav-h"))
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "All tokens",
  render: () => {
    const all = rootTokens();
    return note(\`Every custom property declared on <code>:root</code> in the production stylesheet, in declaration
        order. \${all.length} tokens. This table is generated from the stylesheet itself at render time, so it is
        the index, not a copy of one.\`) + tokenTable(all, {
      head: "Computed",
      cell: (n, v) => {
        const r = resolve(n);
        return r === v ? "" : \`<span style="\${mono};font-weight:500;color:var(--pl-fg-secondary)">\${r}</span>\`;
      }
    });
  }
}`,...S.parameters?.docs?.source}}},C=[`Color`,`CrewPalette`,`Status`,`Typography`,`Spacing`,`RadiusAndShadow`,`ControlLadder`,`Motion`,`Layout`,`AllTokens`]})))()}w();export{S as AllTokens,p as Color,y as ControlLadder,m as CrewPalette,x as Layout,b as Motion,v as RadiusAndShadow,_ as Spacing,h as Status,g as Typography,C as __namedExportsOrder,u as default};
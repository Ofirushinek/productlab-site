import{n as e,t}from"./_icons-BFdY0ZHI.js";import{t as n}from"./rolldown-runtime-Dh6celcD.js";var r,i,a,o,s,c,l,u;function d(){return(d=n((()=>{e(),r={title:`UI/Button`,parameters:{docs:{description:{component:`UI / Button — the live site button system. Variants: primary (ink),
ghost (outline), accent (violet, the hero-register register), wa-solid
(WhatsApp green). Size modifiers: --sm, --lg.
DSL audit, 2026-09-07: .btn--wa (plain outline) removed here and from
styles.css — zero markup references left anywhere on the live site
(confirmed live at productlab.studio/styles.css + app.js). .btn--accent
added — it shipped live 2026-09 and was never documented.`}}}},i={render:()=>`<div class="sb-pad"><button class="btn btn--primary">Talk to me</button></div>`},a={render:()=>`<div class="sb-pad"><button class="btn btn--ghost">Student entrance</button></div>`},o={name:`Accent (violet)`,render:()=>`<div class="sb-pad"><button class="btn btn--accent btn--lg">Start</button></div>
    <p class="ss-note" style="margin-top:var(--space-4);text-align:start;max-width:34rem">
      The register CTA on fixed-scene heroes (#/fleet S0, hero__cta). --pl-accent fill, white text and icon,
      hovers to --pl-accent-hover. Reserve for the one register-moving action on a screen.
    </p>`},s={name:`WhatsApp (solid)`,render:()=>`<div class="sb-pad"><a class="btn btn--wa-solid" href="#">${t.wa}<span class="btn__label">Talk to me</span></a></div>`},c={name:`Small (--sm)`,render:()=>`<div class="sb-pad sb-row">
    <button class="btn btn--primary btn--sm">Primary</button>
    <button class="btn btn--ghost btn--sm">Ghost</button>
  </div>`},l={render:()=>`<div class="sb-pad sb-row">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--accent">Accent</button>
    <a class="btn btn--wa-solid" href="#">${t.wa}<span class="btn__label">WhatsApp</span></a>
  </div>`},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><button class="btn btn--primary">Talk to me</button></div>\`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><button class="btn btn--ghost">Student entrance</button></div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Accent (violet)",
  render: () => \`<div class="sb-pad"><button class="btn btn--accent btn--lg">Start</button></div>
    <p class="ss-note" style="margin-top:var(--space-4);text-align:start;max-width:34rem">
      The register CTA on fixed-scene heroes (#/fleet S0, hero__cta). --pl-accent fill, white text and icon,
      hovers to --pl-accent-hover. Reserve for the one register-moving action on a screen.
    </p>\`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "WhatsApp (solid)",
  render: () => \`<div class="sb-pad"><a class="btn btn--wa-solid" href="#">\${I.wa}<span class="btn__label">Talk to me</span></a></div>\`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Small (--sm)",
  render: () => \`<div class="sb-pad sb-row">
    <button class="btn btn--primary btn--sm">Primary</button>
    <button class="btn btn--ghost btn--sm">Ghost</button>
  </div>\`
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad sb-row">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--accent">Accent</button>
    <a class="btn btn--wa-solid" href="#">\${I.wa}<span class="btn__label">WhatsApp</span></a>
  </div>\`
}`,...l.parameters?.docs?.source}}},u=[`Primary`,`Ghost`,`Accent`,`WhatsAppSolid`,`Small`,`AllVariants`]})))()}d();export{o as Accent,l as AllVariants,a as Ghost,i as Primary,c as Small,s as WhatsAppSolid,u as __namedExportsOrder,r as default};
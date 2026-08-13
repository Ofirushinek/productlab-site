import{n as e,t}from"./_icons-BFdY0ZHI.js";import{t as n}from"./rolldown-runtime-Dh6celcD.js";var r,i,a,o,s,c,l,u;function d(){return(d=n((()=>{e(),r={title:`UI/Button`,parameters:{docs:{description:{component:`UI / Button — the live site button system. Variants: primary (ink),
ghost (outline), wa-solid (WhatsApp green), wa (outline). Size modifier: --sm.`}}}},i={render:()=>`<div class="sb-pad"><button class="btn btn--primary">Talk to me</button></div>`},a={render:()=>`<div class="sb-pad"><button class="btn btn--ghost">Student entrance</button></div>`},o={name:`WhatsApp (solid)`,render:()=>`<div class="sb-pad"><a class="btn btn--wa-solid" href="#">${t.wa}<span class="btn__label">Talk to me</span></a></div>`},s={name:`WhatsApp (outline)`,render:()=>`<div class="sb-pad"><a class="btn btn--wa" href="#">${t.wa}<span class="btn__label">Talk to me</span></a></div>`},c={name:`Small (--sm)`,render:()=>`<div class="sb-pad sb-row">
    <button class="btn btn--primary btn--sm">Primary</button>
    <button class="btn btn--ghost btn--sm">Ghost</button>
  </div>`},l={render:()=>`<div class="sb-pad sb-row">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--ghost">Ghost</button>
    <a class="btn btn--wa-solid" href="#">${t.wa}<span class="btn__label">WhatsApp</span></a>
    <a class="btn btn--wa" href="#">${t.wa}<span class="btn__label">WhatsApp</span></a>
  </div>`},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><button class="btn btn--primary">Talk to me</button></div>\`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><button class="btn btn--ghost">Student entrance</button></div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "WhatsApp (solid)",
  render: () => \`<div class="sb-pad"><a class="btn btn--wa-solid" href="#">\${I.wa}<span class="btn__label">Talk to me</span></a></div>\`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "WhatsApp (outline)",
  render: () => \`<div class="sb-pad"><a class="btn btn--wa" href="#">\${I.wa}<span class="btn__label">Talk to me</span></a></div>\`
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
    <a class="btn btn--wa-solid" href="#">\${I.wa}<span class="btn__label">WhatsApp</span></a>
    <a class="btn btn--wa" href="#">\${I.wa}<span class="btn__label">WhatsApp</span></a>
  </div>\`
}`,...l.parameters?.docs?.source}}},u=[`Primary`,`Ghost`,`WhatsAppSolid`,`WhatsAppOutline`,`Small`,`AllVariants`]})))()}d();export{l as AllVariants,a as Ghost,i as Primary,c as Small,s as WhatsAppOutline,o as WhatsAppSolid,u as __namedExportsOrder,r as default};
import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s;function c(){return(c=e((()=>{t={title:`Components/LangSwitch`,parameters:{docs:{description:{component:`Components / LangSwitch — the header language control. DESKTOP: a secondary,
square globe button (same look as Student entrance) that opens a dropdown to
pick English / עברית. MOBILE tray: a quiet text toggle that flips the language
on each tap. Here we show the desktop globe + its open dropdown. 2026-08-12.`}}}},n=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9Z"/></svg>`,r=({open:e,current:t})=>`<div class="langswitch${e?` is-open`:``}" style="margin:2rem">
     <button class="btn btn--ghost btn--sm langswitch__btn" type="button" aria-haspopup="menu" aria-expanded="${e}" aria-label="Choose language">${n}</button>
     <div class="langswitch__menu" role="menu" aria-label="Choose language"${e?``:` hidden`}>
       <button class="langswitch__item" type="button" role="menuitem"${t===`en`?` aria-current="true"`:``}>English</button>
       <button class="langswitch__item" type="button" role="menuitem"${t===`he`?` aria-current="true"`:``}>עברית</button>
     </div>
   </div>`,i={render:()=>`<div class="sb-pad">${r({open:!1,current:`he`})}</div>`},a={name:`Open — Hebrew active`,render:()=>`<div class="sb-pad" style="min-height:220px">${r({open:!0,current:`he`})}</div>`},o={name:`Open — English active`,render:()=>`<div class="sb-pad" style="min-height:220px">${r({open:!0,current:`en`})}</div>`},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad">\${switcher({
    open: false,
    current: "he"
  })}</div>\`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Open — Hebrew active",
  render: () => \`<div class="sb-pad" style="min-height:220px">\${switcher({
    open: true,
    current: "he"
  })}</div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Open — English active",
  render: () => \`<div class="sb-pad" style="min-height:220px">\${switcher({
    open: true,
    current: "en"
  })}</div>\`
}`,...o.parameters?.docs?.source}}},s=[`Closed`,`OpenHebrewActive`,`OpenEnglishActive`]})))()}c();export{i as Closed,o as OpenEnglishActive,a as OpenHebrewActive,s as __namedExportsOrder,t as default};
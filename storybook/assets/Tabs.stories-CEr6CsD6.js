import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s;function c(){return(c=e((()=>{t={title:`Components/Tabs`,parameters:{docs:{description:{component:`Components / Tabs — the student-area tab bar (Course content / Students / …).
A flex row that aligns to the reading-start edge via flex-start (honors dir:
right in Hebrew RTL, left in English LTR). Active tab uses the accent underline.
Data-driven in app.js so more tabs can be added later. 2026-08-12.`}}}},n=(e,t)=>`<div class="tabs" role="tablist">
     ${e.map(e=>`<button type="button" class="tabs__btn" role="tab" aria-selected="${e===t?`true`:`false`}">${e}</button>`).join(``)}
   </div>`,r={render:()=>`<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${n([`Course content`,`Students`],`Course content`)}</div>`},i={name:`Hebrew (RTL)`,render:()=>`<div class="sb-pad" dir="rtl" style="max-width:720px;margin:auto">${n([`תוכן הסדנה`,`תלמידים`],`תוכן הסדנה`)}</div>`},a={name:`Second tab active`,render:()=>`<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${n([`Course content`,`Students`],`Students`)}</div>`},o={name:`Extensible — more tabs later`,render:()=>`<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${n([`Course content`,`Students`,`Resources`],`Course content`)}</div>`},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:'{\n  render: () => `<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${bar(["Course content", "Students"], "Course content")}</div>`\n}',...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: "Hebrew (RTL)",
  render: () => \`<div class="sb-pad" dir="rtl" style="max-width:720px;margin:auto">\${bar(["תוכן הסדנה", "תלמידים"], "תוכן הסדנה")}</div>\`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Second tab active",
  render: () => \`<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">\${bar(["Course content", "Students"], "Students")}</div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Extensible — more tabs later",
  render: () => \`<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">\${bar(["Course content", "Students", "Resources"], "Course content")}</div>\`
}`,...o.parameters?.docs?.source}}},s=[`English`,`Hebrew`,`StudentsActive`,`ThreeTabs`]})))()}c();export{r as English,i as Hebrew,a as StudentsActive,o as ThreeTabs,s as __namedExportsOrder,t as default};
import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o;function s(){return(s=e((()=>{t={title:`Sections/Hero`,parameters:{layout:`fullscreen`,docs:{description:{component:`Sections / Hero — the current live homepage hero (.hero--oneview): a
full-bleed room photo as the background, title/sub/CTA over it, no
separate media column.
DSL, 2026-09-07: replaces the old .hero--scene version (a two-column
cozy-cafe layout on assets/hero-even-2.webp) — that structure and asset
have zero references left in app.js/styles.css, superseded live. Markup
lifted verbatim from app.js's render(), copy from its I18N block.
⚠️ Carried over from app.js's own comment, unchanged by this fix: the
background photo is still flagged there as a PLACEHOLDER pending a
generated image (blocked on an OpenAI billing gate) — ask Marketing
Designer whether assets/hero-room.webp is meant to ship as final.`}}}},n={t1:`From idea to reality.`,t2a:`A new world of working with `,mark:`AI agents`,b:`.`,sub:[`In 3 hours, set up your own AI agent team with Claude,`,`and start building your first product with it.`,`In real time.`],cta:`Register for the next cohort`},r={t1:`מרעיון למציאות.`,t2a:`עולם חדש של עבודה עם `,mark:`סוכני AI`,b:`.`,sub:[`ב-3 שעות תקימו עם Claude צוות סוכני AI משלכם,`,`ותתחילו לבנות איתו את המוצר הראשון שלכם.`,`בזמן אמת.`],cta:`הרשמה למחזור הבא`},i=e=>`
  <section class="hero hero--oneview">
    <div class="hero__content">
      <h1 class="hero__title"><span class="ht1">${e.t1}</span><span class="ht2">${e.t2a}<span class="mark">${e.mark}</span>${e.b}</span></h1>
      <p class="hero__sub">${e.sub.map(e=>`<span class="sd">${e}</span>`).join(``)}</p>
      <div class="hero__cta"><button class="btn btn--accent" type="button">${e.cta}</button></div>
    </div>
    <picture class="hero__bg">
      <source type="image/webp" media="(max-width: 760px)" srcset="assets/hero-room-mobile.webp?v=1" />
      <source type="image/webp" srcset="assets/hero-room.webp?v=1" />
      <img class="hero__img is-loaded" src="assets/hero-room.webp?v=1" alt="" width="2560" height="1440" />
    </picture>
  </section>`,a={render:(e,t)=>i(t?.globals?.dir===`rtl`?r:n)},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: (_args, ctx) => hero(ctx?.globals?.dir === "rtl" ? HE : EN)
}`,...a.parameters?.docs?.source}}},o=[`English`]})))()}s();export{a as English,o as __namedExportsOrder,t as default};
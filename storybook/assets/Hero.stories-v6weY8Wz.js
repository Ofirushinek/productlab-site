import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o;function s(){return(s=e((()=>{t={title:`Sections/Hero`,parameters:{layout:`fullscreen`,docs:{description:{component:`Sections / Hero — the full-bleed cozy-cafe scene with the headline over it.
English (LTR) gets the smaller size + forced line break; switch the toolbar
"Direction" to RTL to preview the Hebrew hero.`}}}},n={a:`Build your first project with an `,mark:`team of AI agents`,b:` you created yourself.`,sub:`In one hands-on workshop you'll create your own team of AI agents, learn to run it, and start working on your project during the workshop itself.`,points:[`A 3-hour workshop`,`A team of AI agents`,`Builder superpower`]},r={a:`לבנות את הפרויקט הראשון שלך עם `,mark:`צוות סוכני AI`,b:` שיצרת בעצמך.`,sub:`בסדנה מעשית אחת תיצרו צוות סוכני AI אישי, תלמדו לנהל אותו, ותתחילו לעבוד על הפרויקט שלכם כבר במהלך הסדנה.`,points:[`מפגש בן שלוש שעות`,`צוות סוכני AI`,`כוח-על של בנייה`]},i=e=>`
  <section class="hero hero--scene">
    <div class="wrap hero__inner">
      <h1 class="hero__title">${e.a}<br class="hero__br"><span class="mark">${e.mark}</span>${e.b}</h1>
      <p class="hero__sub">${e.sub}</p>
      <ul class="hero__points">${e.points.map(e=>`<li>${e}</li>`).join(``)}</ul>
    </div>
    <div class="hero__media">
      <picture>
        <source type="image/webp" srcset="assets/hero-even-2.webp?v=1" />
        <img class="hero__img is-loaded" src="assets/hero-even-2.webp?v=1" alt="" width="1536" height="1024" />
      </picture>
    </div>
  </section>`,a={render:(e,t)=>i(t?.globals?.dir===`rtl`?r:n)},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: (_args, ctx) => hero(ctx?.globals?.dir === "rtl" ? HE : EN)
}`,...a.parameters?.docs?.source}}},o=[`English`]})))()}s();export{a as English,o as __namedExportsOrder,t as default};
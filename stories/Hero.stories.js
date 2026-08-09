/**
 * Sections / Hero — the full-bleed cozy-cafe scene with the headline over it.
 * English (LTR) gets the smaller size + forced line break; switch the toolbar
 * "Direction" to RTL to preview the Hebrew hero.
 */
export default {
  title: "Sections/Hero",
  parameters: { layout: "fullscreen" },
};

const EN = {
  a: "Build your first project with an ",
  mark: "AI team",
  b: " you created yourself.",
  sub: "In one hands-on workshop you'll create your own AI team, learn to run it, and start working on your project during the workshop itself.",
  points: ["A 3-hour workshop", "A team of AI agents", "Builder superpower"],
};
const HE = {
  a: "לבנות את הפרויקט הראשון שלך עם ",
  mark: "צוות AI",
  b: " שיצרת בעצמך.",
  sub: "בסדנה מעשית אחת תיצרו צוות AI אישי, תלמדו לנהל אותו, ותתחילו לעבוד על הפרויקט שלכם כבר במהלך הסדנה.",
  points: ["מפגש בן שלוש שעות", "צוות סוכני AI", "כוח-על של בנייה"],
};

const hero = (t) => `
  <section class="hero hero--scene">
    <div class="wrap hero__inner">
      <h1 class="hero__title">${t.a}<br class="hero__br"><span class="mark">${t.mark}</span>${t.b}</h1>
      <p class="hero__sub">${t.sub}</p>
      <ul class="hero__points">${t.points.map((p) => `<li>${p}</li>`).join("")}</ul>
    </div>
    <div class="hero__media">
      <picture>
        <source type="image/webp" srcset="assets/hero-even-2.webp?v=1" />
        <img class="hero__img is-loaded" src="assets/hero-even-2.webp?v=1" alt="" width="1536" height="1024" />
      </picture>
    </div>
  </section>`;

export const English = {
  render: (_args, ctx) => hero(ctx?.globals?.dir === "rtl" ? HE : EN),
};

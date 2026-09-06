/**
 * Components / AgentCard — a crew member card from the "meet the team" section.
 * Structure: character illustration on top, then the body with the archetype
 * BADGE (tinted-purple pill, reuses the system accent-12% recipe), the role
 * TITLE beneath it, and the description. The badge/title split replaced the old
 * single "Archetype - Role" line (which wrapped inconsistently). 2026-08-12.
 */
export default {
  title: "Components/AgentCard",
};

const card = ({ img, tag, role, b }) =>
  `<div class="agentcard">
     <div class="agentcard__illo"><img src="assets/${img}.png?v=3" alt="" /></div>
     <div class="agentcard__body">
       <span class="agentcard__tag">${tag}</span>
       <div class="agentcard__role">${role}</div>
       <p>${b}</p>
     </div>
   </div>`;

const HE = [
  { img: "agent-pd", tag: "המעצב", role: "מעצב המוצר", b: "כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System ושומר על עקביות." },
  { img: "agent-cpo", tag: "האסטרטג", role: "מנהל המוצר", b: "כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף ולאתגר הנחות יסוד." },
  { img: "agent-cto", tag: "הארכיטקט", role: "המהנדס הראשי", b: "כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה ולוודא שכל פתרון ניתן למימוש." },
];

const EN = [
  { img: "agent-pd", tag: "The Designer", role: "The product designer", b: "When it's time to design, he's my first partner. He works from the Design System and keeps things consistent." },
  { img: "agent-cpo", tag: "The Strategist", role: "The product manager", b: "When I'm not sure what to build first, I check with him. He sharpens ideas, prioritizes, and challenges assumptions." },
  { img: "agent-cto", tag: "The Architect", role: "The lead engineer", b: "When I hit a technical dilemma, I start with him. He helps me choose the right approach and keep every solution buildable." },
];

const grid = (items, dir) =>
  `<div class="sb-pad" dir="${dir}"><div class="team__agents" style="max-width:960px;margin:auto">${items.map(card).join("")}</div></div>`;

export const Single = {
  render: () => `<div class="sb-pad" style="max-width:320px;margin:auto">${card(EN[2])}</div>`,
};

export const CrewEN = {
  name: "Crew — English",
  render: () => grid(EN, "ltr"),
};

export const CrewHE = {
  name: "Crew — Hebrew (RTL)",
  render: () => grid(HE, "rtl"),
};

/* Avatar stack — overlapping crew circles (molecule, DSL 2026-09-06). Buttons at
   --ctl-sm, --space-3 overlap via margin-inline-start (mirrors in RTL), light
   tooltip above (nickname / role), tap pins it with data-tip-open on touch.
   First use: #/fleet S0. */
const CREW = [
  { img: "crew-strategist", tag: "האסטרטג", role: "מנהל המוצר" },
  { img: "crew-designer", tag: "המעצב", role: "מעצב המוצר" },
  { img: "crew-architect", tag: "הארכיטקט", role: "המהנדס הראשי" },
];
const stack = (items, dir) =>
  `<div class="sb-pad" dir="${dir}" style="padding-top:72px;text-align:center">
     <div class="avatar-stack" role="group" aria-label="שלושת הסוכנים שבכל הרכב">
       ${items.map((c) => `<button type="button" class="avatar-stack__item" data-tooltip="${c.tag}&#10;${c.role}" data-tip-theme="light" data-tip-pos="top" aria-label="${c.tag}, ${c.role}"><img src="assets/${c.img}.webp?v=2" alt="" /></button>`).join("")}
     </div>
   </div>`;

export const AvatarStackHE = {
  name: "Avatar stack — Hebrew (RTL)",
  render: () => stack(CREW, "rtl"),
};

export const AvatarStackPinned = {
  name: "Avatar stack — pinned (touch)",
  render: () => stack(CREW, "rtl").replace('data-tip-pos="top" aria-label="המעצב', 'data-tip-pos="top" data-tip-open aria-label="המעצב'),
};

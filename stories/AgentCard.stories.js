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
  { img: "agent-cto", tag: "הארכיטקט", role: "המהנדס הראשי", b: "כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה ולוודא שכל פתרון ניתן למימוש." },
  { img: "agent-cpo", tag: "האסטרטג", role: "מנהל המוצר", b: "כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף ולאתגר הנחות יסוד." },
  { img: "agent-pd", tag: "המעצב", role: "מעצב המוצר", b: "כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System ושומר על עקביות." },
];

const EN = [
  { img: "agent-cto", tag: "The Architect", role: "The lead engineer", b: "When I hit a technical dilemma, I start with him. He helps me choose the right approach and keep every solution buildable." },
  { img: "agent-cpo", tag: "The Strategist", role: "The product manager", b: "When I'm not sure what to build first, I check with him. He sharpens ideas, prioritizes, and challenges assumptions." },
  { img: "agent-pd", tag: "The Designer", role: "The product designer", b: "When it's time to design, he's my first partner. He works from the Design System and keeps things consistent." },
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

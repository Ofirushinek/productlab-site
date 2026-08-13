import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s,c,l;function u(){return(u=e((()=>{t={title:`Components/AgentCard`,parameters:{docs:{description:{component:`Components / AgentCard — a crew member card from the "meet the team" section.
Structure: character illustration on top, then the body with the archetype
BADGE (tinted-purple pill, reuses the system accent-12% recipe), the role
TITLE beneath it, and the description. The badge/title split replaced the old
single "Archetype - Role" line (which wrapped inconsistently). 2026-08-12.`}}}},n=({img:e,tag:t,role:n,b:r})=>`<div class="agentcard">
     <div class="agentcard__illo"><img src="assets/${e}.png?v=3" alt="" /></div>
     <div class="agentcard__body">
       <span class="agentcard__tag">${t}</span>
       <div class="agentcard__role">${n}</div>
       <p>${r}</p>
     </div>
   </div>`,r=[{img:`agent-pd`,tag:`המעצב`,role:`מעצב המוצר`,b:`כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System ושומר על עקביות.`},{img:`agent-cpo`,tag:`האסטרטג`,role:`מנהל המוצר`,b:`כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף ולאתגר הנחות יסוד.`},{img:`agent-cto`,tag:`הארכיטקט`,role:`המהנדס הראשי`,b:`כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה ולוודא שכל פתרון ניתן למימוש.`}],i=[{img:`agent-pd`,tag:`The Designer`,role:`The product designer`,b:`When it's time to design, he's my first partner. He works from the Design System and keeps things consistent.`},{img:`agent-cpo`,tag:`The Strategist`,role:`The product manager`,b:`When I'm not sure what to build first, I check with him. He sharpens ideas, prioritizes, and challenges assumptions.`},{img:`agent-cto`,tag:`The Architect`,role:`The lead engineer`,b:`When I hit a technical dilemma, I start with him. He helps me choose the right approach and keep every solution buildable.`}],a=(e,t)=>`<div class="sb-pad" dir="${t}"><div class="team__agents" style="max-width:960px;margin:auto">${e.map(n).join(``)}</div></div>`,o={render:()=>`<div class="sb-pad" style="max-width:320px;margin:auto">${n(i[2])}</div>`},s={name:`Crew — English`,render:()=>a(i,`ltr`)},c={name:`Crew — Hebrew (RTL)`,render:()=>a(r,`rtl`)},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:'{\n  render: () => `<div class="sb-pad" style="max-width:320px;margin:auto">${card(EN[2])}</div>`\n}',...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Crew — English",
  render: () => grid(EN, "ltr")
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Crew — Hebrew (RTL)",
  render: () => grid(HE, "rtl")
}`,...c.parameters?.docs?.source}}},l=[`Single`,`CrewEN`,`CrewHE`]})))()}u();export{s as CrewEN,c as CrewHE,o as Single,l as __namedExportsOrder,t as default};
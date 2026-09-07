import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{t={title:`Components/AgentCard`,parameters:{docs:{description:{component:`Components / AgentCard — a crew member card from the "meet the team" section.
Structure: character illustration on top, then the body with the archetype
BADGE (tinted-purple pill, reuses the system accent-12% recipe), the role
TITLE beneath it, and the description. The badge/title split replaced the old
single "Archetype - Role" line (which wrapped inconsistently). 2026-08-12.

DSL, 2026-09-07 (per Marketing Designer, consulted after Ofir flagged stale
Storybook visuals): this story pointed at agent-pd.png/agent-cpo.png/
agent-cto.png, the cast from before the 2026-08-22 redesign. Zero references
left in app.js or content.js; deleted the orphaned files from assets/. Live
markup uses crew-designer/crew-strategist/crew-architect.webp - swapped in,
copy refreshed to the live full bios (app.js's own were trimmed here before).`}}}},n=({img:e,tag:t,role:n,b:r})=>`<div class="agentcard">
     <div class="agentcard__illo"><img src="assets/${e}.webp?v=2" alt="" /></div>
     <div class="agentcard__body">
       <span class="agentcard__tag">${t}</span>
       <div class="agentcard__role">${n}</div>
       <p>${r}</p>
     </div>
   </div>`,r=[{img:`crew-designer`,tag:`המעצב`,role:`מעצב המוצר`,b:`כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System, שומר על עקביות, מציע פתרונות UX ומוודא שכל מסך ברור, שימושי ומוכן לבנייה.`},{img:`crew-strategist`,tag:`האסטרטג`,role:`מנהל המוצר`,b:`כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף משימות, לאתגר הנחות יסוד ולשמור שכל החלטה מקדמת את המוצר בכיוון הנכון.`},{img:`crew-architect`,tag:`הארכיטקט`,role:`המהנדס הראשי`,b:`כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה, לחשוב על הארכיטקטורה ולוודא שכל פתרון שנבחר באמת ניתן למימוש, יציב ומוכן לגדול יחד עם המוצר.`}],i=[{img:`crew-designer`,tag:`The Designer`,role:`The product designer`,b:`When it's time to design, he's my first partner. He works from the Design System, keeps things consistent, suggests UX solutions, and makes sure every screen is clear, usable, and ready to build.`},{img:`crew-strategist`,tag:`The Strategist`,role:`The product manager`,b:`When I'm not sure what to build first, I check with him. He helps sharpen ideas, prioritize, challenge assumptions, and keep every decision moving the product in the right direction.`},{img:`crew-architect`,tag:`The Architect`,role:`The lead engineer`,b:`When I hit a technical dilemma, I start with him. He helps me choose the right approach, think through the architecture, and make sure every solution we pick is actually buildable, stable, and ready to grow with the product.`}],a=(e,t)=>`<div class="sb-pad" dir="${t}"><div class="team__agents" style="max-width:960px;margin:auto">${e.map(n).join(``)}</div></div>`,o={render:()=>`<div class="sb-pad" style="max-width:320px;margin:auto">${n(i[2])}</div>`},s={name:`Crew — English`,render:()=>a(i,`ltr`)},c={name:`Crew — Hebrew (RTL)`,render:()=>a(r,`rtl`)},l=[{img:`crew-strategist`,tag:`האסטרטג`,role:`מנהל המוצר`},{img:`crew-designer`,tag:`המעצב`,role:`מעצב המוצר`},{img:`crew-architect`,tag:`הארכיטקט`,role:`המהנדס הראשי`}],u=(e,t)=>`<div class="sb-pad" dir="${t}" style="padding-top:72px;text-align:center">
     <div class="avatar-stack" role="group" aria-label="שלושת הסוכנים שבכל הרכב">
       ${e.map(e=>`<button type="button" class="avatar-stack__item" data-tooltip="${e.tag}&#10;${e.role}" data-tip-theme="light" data-tip-pos="top" aria-label="${e.tag}, ${e.role}"><img src="assets/${e.img}.webp?v=2" alt="" /></button>`).join(``)}
     </div>
   </div>`,d={name:`Avatar stack — Hebrew (RTL)`,render:()=>u(l,`rtl`)},f={name:`Avatar stack — pinned (touch)`,render:()=>u(l,`rtl`).replace(`data-tip-pos="top" aria-label="המעצב`,`data-tip-pos="top" data-tip-open aria-label="המעצב`)},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:'{\n  render: () => `<div class="sb-pad" style="max-width:320px;margin:auto">${card(EN[2])}</div>`\n}',...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Crew — English",
  render: () => grid(EN, "ltr")
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Crew — Hebrew (RTL)",
  render: () => grid(HE, "rtl")
}`,...c.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Avatar stack — Hebrew (RTL)",
  render: () => stack(CREW, "rtl")
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "Avatar stack — pinned (touch)",
  render: () => stack(CREW, "rtl").replace('data-tip-pos="top" aria-label="המעצב', 'data-tip-pos="top" data-tip-open aria-label="המעצב')
}`,...f.parameters?.docs?.source}}},p=[`Single`,`CrewEN`,`CrewHE`,`AvatarStackHE`,`AvatarStackPinned`]})))()}m();export{d as AvatarStackHE,f as AvatarStackPinned,s as CrewEN,c as CrewHE,o as Single,p as __namedExportsOrder,t as default};
import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s,c,l;function u(){return(u=e((()=>{t={title:`Components/AuthNotice`,parameters:{docs:{description:{component:`Components / AuthNotice — the invite-only auth popup. Two instances share one
panel (the purple-tinted .noacct callout, accent recipe) inside a .modal:
  • Denied — a signed-in Google user who isn't on the confirmed allowlist. The
    app signs them out and shows this "not registered" note.
  • Register — placeholder shown from the sign-in modal (registration isn't
    open yet; invite-only).
Both carry a direct WhatsApp CTA. Copy mirrors app.js I18N. 2026-08-12.`}}}},n=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>`,r=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg>`,i=({title:e,body:t,cta:i})=>`<div class="noacct" style="margin:0">
     <div class="noacct__ico">${n}</div>
     <h2 class="noacct__title">${e}</h2>
     <p class="noacct__body">${t}</p>
     <div class="cta-row" style="margin-top:1.5rem">
       <a class="btn btn--wa-solid" href="#">${r} ${i}</a>
     </div>
   </div>`,a={name:`Denied — English`,render:()=>`<div class="sb-pad" dir="ltr">${i({title:`You don't have access yet`,body:`This area is for approved workshop participants. You're signed in with Google, but your account isn't registered yet. If you registered and it isn't working, talk to me and I'll open it up for you.`,cta:`Talk to me`})}</div>`},o={name:`Denied — Hebrew (RTL)`,render:()=>`<div class="sb-pad" dir="rtl">${i({title:`עדיין אין לכם גישה`,body:`האזור הזה פתוח למשתתפי הסדנה שאושרו. נכנסתם עם Google אבל החשבון עדיין לא רשום. אם נרשמתם וזה לא עובד, דברו איתי ואפתח לכם גישה.`,cta:`דברו איתי`})}</div>`},s={name:`Register placeholder — English`,render:()=>`<div class="sb-pad" dir="ltr">${i({title:`Registration isn't open yet`,body:`Joining the workshop is invite-only for now. Want a seat? Talk to me and we'll sort it out.`,cta:`Talk to me`})}</div>`},c={name:`Register placeholder — Hebrew (RTL)`,render:()=>`<div class="sb-pad" dir="rtl">${i({title:`ההרשמה עדיין לא פתוחה`,body:`ההצטרפות לסדנה היא בהזמנה בלבד כרגע. רוצים מקום? דברו איתי ונסדר לכם.`,cta:`דברו איתי`})}</div>`},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Denied — English",
  render: () => \`<div class="sb-pad" dir="ltr">\${notice({
    title: "You don't have access yet",
    body: "This area is for approved workshop participants. You're signed in with Google, but your account isn't registered yet. If you registered and it isn't working, talk to me and I'll open it up for you.",
    cta: "Talk to me"
  })}</div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Denied — Hebrew (RTL)",
  render: () => \`<div class="sb-pad" dir="rtl">\${notice({
    title: "עדיין אין לכם גישה",
    body: "האזור הזה פתוח למשתתפי הסדנה שאושרו. נכנסתם עם Google אבל החשבון עדיין לא רשום. אם נרשמתם וזה לא עובד, דברו איתי ואפתח לכם גישה.",
    cta: "דברו איתי"
  })}</div>\`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Register placeholder — English",
  render: () => \`<div class="sb-pad" dir="ltr">\${notice({
    title: "Registration isn't open yet",
    body: "Joining the workshop is invite-only for now. Want a seat? Talk to me and we'll sort it out.",
    cta: "Talk to me"
  })}</div>\`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Register placeholder — Hebrew (RTL)",
  render: () => \`<div class="sb-pad" dir="rtl">\${notice({
    title: "ההרשמה עדיין לא פתוחה",
    body: "ההצטרפות לסדנה היא בהזמנה בלבד כרגע. רוצים מקום? דברו איתי ונסדר לכם.",
    cta: "דברו איתי"
  })}</div>\`
}`,...c.parameters?.docs?.source}}},l=[`DeniedEnglish`,`DeniedHebrew`,`RegisterEnglish`,`RegisterHebrew`]})))()}u();export{a as DeniedEnglish,o as DeniedHebrew,s as RegisterEnglish,c as RegisterHebrew,l as __namedExportsOrder,t as default};
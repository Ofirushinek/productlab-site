import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{t={title:`Components/Roster`,parameters:{docs:{description:{component:`Components / Roster: the admin-only invite list / student mini-CRM on #/prep.
One admin_roster() call merges the allowlist (invited + confirmed + CRM fields)
with profiles (who actually signed in). Each row is a scannable card that expands
to an inline editor.
  - Access pill (can they sign in): Confirmed (accent) / Pending (neutral) /
    Not invited (orange warn) is SEPARATE from the CRM funnel stage.
  - Stage pill = a native select styled as a colored pill, 6 funnel stages:
    Invited (gray) / Interested (blue) / Call booked (purple) / Confirmed (green) /
    Attended (teal) / Dropped (muted red). Colors = --pl-stage-* tokens.
  - A lead can exist with a NAME ONLY (email optional / nullable).
DS tokens only. Copy mirrors app.js I18N. 2026-08-13.`}}}},n=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,r=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,i=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,a=[`invited`,`interested`,`call_booked`,`confirmed`,`attended`,`dropped`],o={en:{name_ph:`Student name`,add_placeholder:`Email (optional)`,add_cta:`Add user`,hint:`A lead can be added with a name only; email is optional. Adding does not grant access. After adding, hit "Confirm" to grant access.`,col:{email:`Email`,name:`Name`,status:`Status`,signedin:`Signed in?`,stage:`Stage`,source:`Source`,next:`Next action`,actions:`Actions`,notes:`Notes`,phone:`Phone`},pill:{confirmed:`Confirmed`,pending:`Pending`,uninvited:`Not invited`},stages:{invited:`Invited`,interested:`Interested`,call_booked:`Call booked`,confirmed:`Confirmed`,attended:`Attended`,dropped:`Dropped`},no:`Not yet`,confirm:`Confirm`,unconfirm:`Unconfirm`,addToList:`Add to list`,details:`Details`,save:`Save`,saved:`Saved`},he:{name_ph:`שם התלמיד`,add_placeholder:`אימייל (לא חובה)`,add_cta:`הוספת תלמיד`,hint:`אפשר להוסיף ליד עם שם בלבד; אימייל לא חובה. הוספה לא מאשרת גישה. אחרי ההוספה, לחצו "אישור" כדי לפתוח גישה.`,col:{email:`אימייל`,name:`שם`,status:`סטטוס`,signedin:`נכנס?`,stage:`שלב`,source:`מקור`,next:`צעד הבא`,actions:`פעולות`,notes:`הערות`,phone:`טלפון`},pill:{confirmed:`מאושר`,pending:`ממתין`,uninvited:`לא מוזמן`},stages:{invited:`הוזמן`,interested:`מתעניין`,call_booked:`נקבעה שיחה`,confirmed:`אושר`,attended:`השתתף`,dropped:`לא רלוונטי`},no:`עדיין לא`,confirm:`אישור`,unconfirm:`ביטול אישור`,addToList:`הוספה לרשימה`,details:`פרטים`,save:`שמירה`,saved:`נשמר`}},s=(e,t)=>t===`uninvited`?`<span class="roster__badge roster__badge--warn">${e.pill.uninvited}</span>`:t===`confirmed`?`<span class="roster__badge roster__badge--ok">${e.pill.confirmed}</span>`:`<span class="roster__badge">${e.pill.pending}</span>`,c=(e,t)=>t?`<span class="roster__yes">${n} 12 Aug 2026</span>`:`<span class="roster__no">${e.no}</span>`,l=(e,t)=>`<select class="roster__stage roster__stage--${t}" aria-label="${e.col.stage}">
     ${a.map(n=>`<option value="${n}"${n===t?` selected`:``}>${e.stages[n]}</option>`).join(``)}
   </select>`,u=(e,t)=>t.state===`uninvited`?`<button type="button" class="btn btn--ghost btn--sm">${e.addToList}</button>`:`${t.email?`<button type="button" class="btn ${t.state===`confirmed`?`btn--ghost`:`btn--primary`} btn--sm">${t.state===`confirmed`?e.unconfirm:e.confirm}</button>`:``}
       <button type="button" class="btn btn--ghost btn--sm roster__remove">${r}</button>`,d=(e,t)=>`
  <tr class="roster__detailrow"${t.open?``:` hidden`}>
    <td colspan="9">
      <div class="roster__detail">
        <label class="roster__field"><span class="roster__fieldlbl">${e.col.source}</span>
          <input class="roster__input roster__input--sm" type="text" value="${t.source||``}" /></label>
        <label class="roster__field"><span class="roster__fieldlbl">${e.col.next}</span>
          <input class="roster__input roster__input--sm" type="text" value="${t.next||``}" /></label>
        <label class="roster__field"><span class="roster__fieldlbl">${e.col.phone}</span>
          <input class="roster__input roster__input--sm" type="tel" value="${t.phone||``}" /></label>
        <label class="roster__field roster__field--wide"><span class="roster__fieldlbl">${e.col.notes}</span>
          <textarea class="roster__notes" rows="3">${t.notes||``}</textarea></label>
        <div class="roster__detailbar">
          <button type="button" class="btn btn--primary btn--sm">${e.save}</button>
          <span class="roster__savemsg roster__savemsg--ok">${t.open?e.saved:``}</span>
        </div>
      </div>
    </td>
  </tr>`,f=(e,t)=>`<tr class="roster__row">
     <td class="roster__expandcell"><button type="button" class="roster__expand${t.open?` is-open`:``}" aria-label="${e.details}">${i}</button></td>
     <td data-label="${e.col.name}">${t.name||`-`}</td>
     <td data-label="${e.col.email}" class="roster__emailcell">${t.email||`-`}</td>
     <td data-label="${e.col.status}">${s(e,t.state)}</td>
     <td data-label="${e.col.signedin}">${c(e,t.signedIn)}</td>
     <td data-label="${e.col.stage}">${l(e,t.stage)}</td>
     <td data-label="${e.col.source}" class="roster__cellclamp">${t.source||`-`}</td>
     <td data-label="${e.col.next}" class="roster__cellclamp">${t.next||`-`}</td>
     <td class="roster__actions" data-label="${e.col.actions}">${u(e,t)}</td>
   </tr>
   ${d(e,t)}`,p=e=>{let t=o[e];return`<div class="sb-pad" dir="${e===`he`?`rtl`:`ltr`}" style="max-width:980px;margin:auto">
    <form class="roster__add" onsubmit="return false">
      <input class="roster__input" type="text" placeholder="${t.name_ph}" aria-label="${t.name_ph}" />
      <input class="roster__input" type="email" placeholder="${t.add_placeholder}" aria-label="${t.add_placeholder}" />
      <button class="btn btn--primary roster__addbtn" type="submit">${n}<span>${t.add_cta}</span></button>
    </form>
    <p class="roster__hint">${t.hint}</p>
    <div class="roster" style="margin-top:1.5rem"><div class="roster__scroll">
      <table class="roster__table roster__table--crm">
        <thead><tr>
          <th aria-hidden="true"></th>
          <th>${t.col.name}</th><th>${t.col.email}</th><th>${t.col.status}</th>
          <th>${t.col.signedin}</th><th>${t.col.stage}</th><th>${t.col.source}</th>
          <th>${t.col.next}</th><th>${t.col.actions}</th>
        </tr></thead>
        <tbody>${[{name:`Yael Holzinger`,email:`yaelholz@gmail.com`,state:`pending`,signedIn:!1,stage:`call_booked`,source:`LinkedIn DM`,next:`Intro call tomorrow 12:00`,notes:`Interested; wants to understand where it fits her. Booked a call.`,open:!0},{name:`Ron Yosef`,email:`yosefron@gmail.com`,state:`confirmed`,signedIn:!0,stage:`interested`,source:`LinkedIn DM`,next:`Awaiting reply to schedule a call`,phone:`0545878255`,notes:`Reviewed the syllabus, looks great for beginners.`},{name:`Adi Lev Trulia`,email:``,state:`pending`,signedIn:!1,stage:`call_booked`,source:`WhatsApp`,next:`Intro call tomorrow ~14:00`,notes:`Cyber-content person, boutique studio. Name-only lead (no email yet).`},{name:`Curious Person`,email:`crasher@example.com`,state:`uninvited`,signedIn:!0,stage:`dropped`,source:``,next:``}].map(e=>f(t,e)).join(``)}</tbody>
      </table>
    </div></div>
  </div>`},m={render:()=>p(`en`)},h={name:`Hebrew (RTL)`,render:()=>p(`he`)},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => panel("en")
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "Hebrew (RTL)",
  render: () => panel("he")
}`,...h.parameters?.docs?.source}}},g=[`English`,`Hebrew`]})))()}_();export{m as English,h as Hebrew,g as __namedExportsOrder,t as default};
/**
 * Components / Roster: the admin-only invite list / student mini-CRM on #/prep.
 * One admin_roster() call merges the allowlist (invited + confirmed + CRM fields)
 * with profiles (who actually signed in). Each row is a scannable card that expands
 * to an inline editor.
 *   - Access pill (can they sign in): Confirmed (accent) / Pending (neutral) /
 *     Not invited (orange warn) is SEPARATE from the CRM funnel stage.
 *   - Stage pill = a native select styled as a colored pill, 6 funnel stages:
 *     Invited (gray) / Interested (blue) / Call booked (purple) / Confirmed (green) /
 *     Attended (teal) / Dropped (muted red). Colors = --pl-stage-* tokens.
 *   - A lead can exist with a NAME ONLY (email optional / nullable).
 * DS tokens only. Copy mirrors app.js I18N. 2026-08-13.
 */
export default {
  title: "Components/Roster",
};

const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const x = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
const chev = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

const STAGES = ["invited", "interested", "call_booked", "confirmed", "attended", "dropped"];

// { name, email, state, signedIn, stage, source, next, notes, phone, open }
const T = {
  en: {
    name_ph: "Student name", add_placeholder: "Email (optional)", add_cta: "Add user",
    hint: "A lead can be added with a name only; email is optional. Adding does not grant access. After adding, hit \"Confirm\" to grant access.",
    col: { email: "Email", name: "Name", status: "Status", signedin: "Signed in?", stage: "Stage", source: "Source", next: "Next action", notes: "Notes", phone: "Phone" },
    pill: { confirmed: "Confirmed", pending: "Pending", uninvited: "Not invited" },
    stages: { invited: "Invited", interested: "Interested", call_booked: "Call booked", confirmed: "Confirmed", attended: "Attended", dropped: "Dropped" },
    no: "Not yet", confirm: "Confirm", unconfirm: "Unconfirm", addToList: "Add to list",
    details: "Details", save: "Save", saved: "Saved",
  },
  he: {
    name_ph: "שם התלמיד", add_placeholder: "אימייל (לא חובה)", add_cta: "הוספת תלמיד",
    hint: "אפשר להוסיף ליד עם שם בלבד; אימייל לא חובה. הוספה לא מאשרת גישה. אחרי ההוספה, לחצו \"אישור\" כדי לפתוח גישה.",
    col: { email: "אימייל", name: "שם", status: "סטטוס", signedin: "נכנס?", stage: "שלב", source: "מקור", next: "צעד הבא", notes: "הערות", phone: "טלפון" },
    pill: { confirmed: "מאושר", pending: "ממתין", uninvited: "לא מוזמן" },
    stages: { invited: "הוזמן", interested: "מתעניין", call_booked: "נקבעה שיחה", confirmed: "אושר", attended: "השתתף", dropped: "לא רלוונטי" },
    no: "עדיין לא", confirm: "אישור", unconfirm: "ביטול אישור", addToList: "הוספה לרשימה",
    details: "פרטים", save: "שמירה", saved: "נשמר",
  },
};

const pill = (t, state) =>
  state === "uninvited" ? `<span class="roster__badge roster__badge--warn">${t.pill.uninvited}</span>`
  : state === "confirmed" ? `<span class="roster__badge roster__badge--ok">${t.pill.confirmed}</span>`
  : `<span class="roster__badge">${t.pill.pending}</span>`;

const signedIn = (t, on) =>
  on ? `<span class="roster__yes">${check} 12 Aug 2026</span>` : `<span class="roster__no">${t.no}</span>`;

const stageSel = (t, cur) =>
  `<select class="roster__stage roster__stage--${cur}" aria-label="${t.col.stage}">
     ${STAGES.map((s) => `<option value="${s}"${s === cur ? " selected" : ""}>${t.stages[s]}</option>`).join("")}
   </select>`;

const actions = (t, r) =>
  r.state === "uninvited"
    ? `<button type="button" class="btn btn--ghost btn--sm">${t.addToList}</button>`
    : `${r.email ? `<button type="button" class="btn ${r.state === "confirmed" ? "btn--ghost" : "btn--primary"} btn--sm">${r.state === "confirmed" ? t.unconfirm : t.confirm}</button>` : ""}
       <button type="button" class="btn btn--ghost btn--sm roster__remove">${x}</button>`;

const detail = (t, r) => `
  <tr class="roster__detailrow"${r.open ? "" : " hidden"}>
    <td colspan="9">
      <div class="roster__detail">
        <label class="roster__field"><span class="roster__fieldlbl">${t.col.source}</span>
          <input class="roster__input roster__input--sm" type="text" value="${r.source || ""}" /></label>
        <label class="roster__field"><span class="roster__fieldlbl">${t.col.next}</span>
          <input class="roster__input roster__input--sm" type="text" value="${r.next || ""}" /></label>
        <label class="roster__field"><span class="roster__fieldlbl">${t.col.phone}</span>
          <input class="roster__input roster__input--sm" type="tel" value="${r.phone || ""}" /></label>
        <label class="roster__field roster__field--wide"><span class="roster__fieldlbl">${t.col.notes}</span>
          <textarea class="roster__notes" rows="3">${r.notes || ""}</textarea></label>
        <div class="roster__detailbar">
          <button type="button" class="btn btn--primary btn--sm">${t.save}</button>
          <span class="roster__savemsg roster__savemsg--ok">${r.open ? t.saved : ""}</span>
        </div>
      </div>
    </td>
  </tr>`;

const row = (t, r) =>
  `<tr class="roster__row">
     <td class="roster__expandcell"><button type="button" class="roster__expand${r.open ? " is-open" : ""}" aria-label="${t.details}">${chev}</button></td>
     <td data-label="${t.col.name}">${r.name || "-"}</td>
     <td data-label="${t.col.email}" class="roster__emailcell">${r.email || "-"}</td>
     <td data-label="${t.col.status}">${pill(t, r.state)}</td>
     <td data-label="${t.col.signedin}">${signedIn(t, r.signedIn)}</td>
     <td data-label="${t.col.stage}">${stageSel(t, r.stage)}</td>
     <td data-label="${t.col.source}" class="roster__cellclamp">${r.source || "-"}</td>
     <td data-label="${t.col.next}" class="roster__cellclamp">${r.next || "-"}</td>
     <td class="roster__actions">${actions(t, r)}</td>
   </tr>
   ${detail(t, r)}`;

const panel = (lang) => {
  const t = T[lang];
  const rows = [
    { name: "Yael Holzinger", email: "yaelholz@gmail.com", state: "pending", signedIn: false,
      stage: "call_booked", source: "LinkedIn DM", next: "Intro call tomorrow 12:00",
      notes: "Interested; wants to understand where it fits her. Booked a call.", open: true },
    { name: "Ron Yosef", email: "yosefron@gmail.com", state: "confirmed", signedIn: true,
      stage: "interested", source: "LinkedIn DM", next: "Awaiting reply to schedule a call",
      phone: "0545878255", notes: "Reviewed the syllabus, looks great for beginners." },
    { name: "Adi Lev Trulia", email: "", state: "pending", signedIn: false,
      stage: "call_booked", source: "WhatsApp", next: "Intro call tomorrow ~14:00",
      notes: "Cyber-content person, boutique studio. Name-only lead (no email yet)." },
    { name: "Curious Person", email: "crasher@example.com", state: "uninvited", signedIn: true,
      stage: "dropped", source: "", next: "" },
  ];
  return `<div class="sb-pad" dir="${lang === "he" ? "rtl" : "ltr"}" style="max-width:980px;margin:auto">
    <form class="roster__add" onsubmit="return false">
      <input class="roster__input" type="text" placeholder="${t.name_ph}" aria-label="${t.name_ph}" />
      <input class="roster__input" type="email" placeholder="${t.add_placeholder}" aria-label="${t.add_placeholder}" />
      <button class="btn btn--primary roster__addbtn" type="submit">${check}<span>${t.add_cta}</span></button>
    </form>
    <p class="roster__hint">${t.hint}</p>
    <div class="roster" style="margin-top:1.5rem"><div class="roster__scroll">
      <table class="roster__table roster__table--crm">
        <thead><tr>
          <th aria-hidden="true"></th>
          <th>${t.col.name}</th><th>${t.col.email}</th><th>${t.col.status}</th>
          <th>${t.col.signedin}</th><th>${t.col.stage}</th><th>${t.col.source}</th>
          <th>${t.col.next}</th><th></th>
        </tr></thead>
        <tbody>${rows.map((r) => row(t, r)).join("")}</tbody>
      </table>
    </div></div>
  </div>`;
};

export const English = { render: () => panel("en") };
export const Hebrew = { name: "Hebrew (RTL)", render: () => panel("he") };

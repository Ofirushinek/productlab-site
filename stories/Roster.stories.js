/**
 * Components / Roster — the admin-only invite list / student CRM on #/prep.
 * One admin_roster() call merges the allowlist (invited + confirmed) with
 * profiles (who actually signed in). Add an email (step 1 = added, not approved),
 * Confirm it (step 2 = access granted), remove, or add a gate-crasher to the list.
 * Status pills: Confirmed (accent) · Pending (neutral) · Not invited (orange warn).
 * DS tokens only. Copy mirrors app.js I18N. 2026-08-12.
 */
export default {
  title: "Components/Roster",
};

const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const x = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

// { email, name, state: 'confirmed'|'pending'|'uninvited', signedIn }
const T = {
  en: {
    add_placeholder: "Student email", add_cta: "Add user",
    hint: 'Adding does not approve. After adding, hit "Confirm" to grant access.',
    col: { email: "Email", name: "Name", status: "Status", signedin: "Signed in?" },
    pill: { confirmed: "Confirmed", pending: "Pending", uninvited: "Not invited" },
    no: "Not yet", confirm: "Confirm", unconfirm: "Unconfirm", addToList: "Add to list",
  },
  he: {
    add_placeholder: "אימייל של תלמיד", add_cta: "הוספת תלמיד",
    hint: 'הוספה לא מאשרת אוטומטית. אחרי ההוספה, לחצו "אישור" כדי לפתוח גישה.',
    col: { email: "אימייל", name: "שם", status: "סטטוס", signedin: "נכנס?" },
    pill: { confirmed: "מאושר", pending: "ממתין", uninvited: "לא מוזמן" },
    no: "עדיין לא", confirm: "אישור", unconfirm: "ביטול אישור", addToList: "הוספה לרשימה",
  },
};

const pill = (t, state) =>
  state === "uninvited" ? `<span class="roster__badge roster__badge--warn">${t.pill.uninvited}</span>`
  : state === "confirmed" ? `<span class="roster__badge roster__badge--ok">${t.pill.confirmed}</span>`
  : `<span class="roster__badge">${t.pill.pending}</span>`;

const signedIn = (t, on) =>
  on ? `<span class="roster__yes">${check} 12 Aug 2026</span>` : `<span class="roster__no">${t.no}</span>`;

const actions = (t, state) =>
  state === "uninvited"
    ? `<button type="button" class="btn btn--ghost btn--sm">${t.addToList}</button>`
    : `<button type="button" class="btn ${state === "confirmed" ? "btn--ghost" : "btn--primary"} btn--sm">${state === "confirmed" ? t.unconfirm : t.confirm}</button>
       <button type="button" class="btn btn--ghost btn--sm roster__remove">${x}</button>`;

const row = (t, r) =>
  `<tr>
     <td data-label="${t.col.email}">${r.email}</td>
     <td data-label="${t.col.name}">${r.name || "-"}</td>
     <td data-label="${t.col.status}">${pill(t, r.state)}</td>
     <td data-label="${t.col.signedin}">${signedIn(t, r.signedIn)}</td>
     <td class="roster__actions">${actions(t, r.state)}</td>
   </tr>`;

const panel = (lang) => {
  const t = T[lang];
  const rows = [
    { email: "dana@example.com", name: "Dana Levi", state: "confirmed", signedIn: true },
    { email: "yossi@example.com", name: "", state: "pending", signedIn: false },
    { email: "crasher@example.com", name: "Curious Person", state: "uninvited", signedIn: true },
  ];
  return `<div class="sb-pad" dir="${lang === "he" ? "rtl" : "ltr"}" style="max-width:820px;margin:auto">
    <form class="roster__add" onsubmit="return false">
      <input class="roster__input" type="email" placeholder="${t.add_placeholder}" aria-label="${t.add_placeholder}" />
      <button class="btn btn--primary roster__addbtn" type="submit">${check}<span>${t.add_cta}</span></button>
    </form>
    <p class="roster__hint">${t.hint}</p>
    <div class="roster" style="margin-top:1.5rem"><div class="roster__scroll">
      <table class="roster__table">
        <thead><tr>
          <th>${t.col.email}</th><th>${t.col.name}</th><th>${t.col.status}</th><th>${t.col.signedin}</th><th></th>
        </tr></thead>
        <tbody>${rows.map((r) => row(t, r)).join("")}</tbody>
      </table>
    </div></div>
  </div>`;
};

export const English = { render: () => panel("en") };
export const Hebrew = { name: "Hebrew (RTL)", render: () => panel("he") };

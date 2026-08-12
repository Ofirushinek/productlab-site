/**
 * Components / AuthNotice — the invite-only auth popup. Two instances share one
 * panel (the purple-tinted .noacct callout, accent recipe) inside a .modal:
 *   • Denied — a signed-in Google user who isn't on the confirmed allowlist. The
 *     app signs them out and shows this "not registered" note.
 *   • Register — placeholder shown from the sign-in modal (registration isn't
 *     open yet; invite-only).
 * Both carry a direct WhatsApp CTA. Copy mirrors app.js I18N. 2026-08-12.
 */
export default {
  title: "Components/AuthNotice",
};

const info = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>';
const wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg>';

const notice = ({ title, body, cta }) =>
  `<div class="noacct" style="margin:0">
     <div class="noacct__ico">${info}</div>
     <h2 class="noacct__title">${title}</h2>
     <p class="noacct__body">${body}</p>
     <div class="cta-row" style="margin-top:1.5rem">
       <a class="btn btn--wa-solid" href="#">${wa} ${cta}</a>
     </div>
   </div>`;

export const DeniedEnglish = {
  name: "Denied — English",
  render: () =>
    `<div class="sb-pad" dir="ltr">${notice({
      title: "You don't have access yet",
      body: "This area is for approved workshop participants. You're signed in with Google, but your account isn't registered yet. If you registered and it isn't working, talk to me and I'll open it up for you.",
      cta: "Talk to me",
    })}</div>`,
};

export const DeniedHebrew = {
  name: "Denied — Hebrew (RTL)",
  render: () =>
    `<div class="sb-pad" dir="rtl">${notice({
      title: "עדיין אין לכם גישה",
      body: "האזור הזה פתוח למשתתפי הסדנה שאושרו. נכנסתם עם Google אבל החשבון עדיין לא רשום. אם נרשמתם וזה לא עובד, דברו איתי ואפתח לכם גישה.",
      cta: "דברו איתי",
    })}</div>`,
};

export const RegisterEnglish = {
  name: "Register placeholder — English",
  render: () =>
    `<div class="sb-pad" dir="ltr">${notice({
      title: "Registration isn't open yet",
      body: "Joining the workshop is invite-only for now. Want a seat? Talk to me and we'll sort it out.",
      cta: "Talk to me",
    })}</div>`,
};

export const RegisterHebrew = {
  name: "Register placeholder — Hebrew (RTL)",
  render: () =>
    `<div class="sb-pad" dir="rtl">${notice({
      title: "ההרשמה עדיין לא פתוחה",
      body: "ההצטרפות לסדנה היא בהזמנה בלבד כרגע. רוצים מקום? דברו איתי ונסדר לכם.",
      cta: "דברו איתי",
    })}</div>`,
};

/**
 * Components / NoAccess — the "no access yet" notice shown on #/prep to a
 * signed-in Google user who isn't a registered student (visitor tier). The
 * workshop area is invite-only, so instead of content they get a purple-tinted
 * callout (accent recipe, brand-consistent) with a direct WhatsApp CTA. 2026-08-12.
 */
export default {
  title: "Components/NoAccess",
};

// Minimal inline copies of the icons the live notice uses (info + WhatsApp).
const info = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>';
const wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg>';

const notice = ({ title, body, cta }) =>
  `<div class="noacct">
     <div class="noacct__ico">${info}</div>
     <h1 class="noacct__title">${title}</h1>
     <p class="noacct__body">${body}</p>
     <div class="cta-row" style="margin-top:1.5rem">
       <a class="btn btn--wa-solid" href="#">${wa} ${cta}</a>
     </div>
   </div>`;

export const English = {
  render: () =>
    `<div class="sb-pad" dir="ltr">${notice({
      title: "You don't have access yet",
      body: "This area is for registered workshop participants. You're signed in with Google, but your account isn't connected to the workshop yet. If you registered and it isn't working, or anything else is off, talk to me and I'll open it up for you.",
      cta: "Talk to me",
    })}</div>`,
};

export const Hebrew = {
  name: "Hebrew (RTL)",
  render: () =>
    `<div class="sb-pad" dir="rtl">${notice({
      title: "עדיין אין לכם גישה",
      body: "האזור הזה נפתח למשתתפי הסדנה שנרשמו. נכנסתם עם Google אבל החשבון עדיין לא מחובר לסדנה. אם נרשמתם וזה לא עובד, או שיש כל בעיה אחרת, דברו איתי ואפתח לכם גישה.",
      cta: "דברו איתי",
    })}</div>`,
};

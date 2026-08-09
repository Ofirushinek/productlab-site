/* =============================================================================
   PRODUCT LAB — one-pager render + EN/HE toggle + RTL.
   ALL copy lives in the I18N object below (final copy from Copywriter,
   productlab-onepager-copy.md, 2026-08-03). To update copy, edit strings here.
   OPEN: Section 7 bio ([X years]/role) + Section 8 testimonials are labeled
   placeholders for OFIR to fill. Contact is WhatsApp-only (no booking funnel);
   WA number is live: 054-2259730.
   ========================================================================== */

// WhatsApp only — no booking funnel. Ofir wants direct contact.
const WA_URL   = "https://wa.me/972542259730";                    // Ofir: 054-2259730

// When a gated redirect bounces a signed-out visitor home, this asks wireStudent
// to auto-open the sign-in modal on the next render.
let pendingStudentOpen = false;

/* ---- Cohort gate (client-side, no backend) ------------------------------- *
   The student prep page is gated by a single shared cohort password. There is
   NO per-user auth today: the entered password is SHA-256 hashed in the browser
   and compared to the digest below. To change the cohort password, hash the new
   one (`printf '%s' 'newpassword' | shasum -a 256`) and paste the hex here.
   The email field in the sign-in modal is intentionally hidden (not deleted) so
   per-user email auth can be re-enabled later without a rebuild.                */
// COHORT_PW_SHA256 — swap to change the cohort password. (temp password: "productlab")
const COHORT_PW_SHA256 = "a995d8e42770381fd158706d638eb5061ab56173beba0358f2de9c92113d4168";

/* SHA-256 → lowercase hex, via the Web Crypto API. */
async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* The ONE isolated auth check. Today: hash the password, compare to the cohort
   digest. Swap the body later (e.g. per-user email + backend) without touching
   callers. Resolves { ok, token } — token is stored on success, checked as the
   prep-page guard flag (the check itself never guards the page). */
async function authenticate(creds) {
  const hex = await sha256hex((creds && creds.password) || "");
  const ok = hex === COHORT_PW_SHA256;
  const token = ok ? (crypto.randomUUID ? crypto.randomUUID() : hex) : null;
  return { ok, token };
}

/* ---- Icons (inline, currentColor) --------------------------------------- */
const I = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.05c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43l-.48-.01c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.19 3.7.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  chev: '<svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.99.14 4 4 0 0 0-1.66 6.16A3.5 3.5 0 0 0 6 18a3 3 0 0 0 6 0V5ZM12 5a3 3 0 1 1 5.99.14 4 4 0 0 1 1.66 6.16A3.5 3.5 0 0 1 18 18a3 3 0 0 1-6 0"/></svg>',
  flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M7 15l4-4 3 3 5-6"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8ZM3.3 7 12 12l8.7-5M12 22V12"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/></svg>',
  laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9M2 20h20"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.3 6.3 3.5 3.5M20.5 20.5l-2.8-2.8M17.7 6.3l2.8-2.8M3.5 20.5l2.8-2.8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  seat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M5 9a2 2 0 0 0-2 2v5h18v-5a2 2 0 0 0-2-2M5 16v3M19 16v3"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-7.4-4.9L3 15"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  claude: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7v10l10 5 10-5V7L12 2ZM2 7l10 5 10-5M12 22V12"/></svg>',
  login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.2-5.6 7-5.6s7 2 7 5.6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
};

/* ---- COPY (final, Copywriter 2026-08-03) -------------------------------- */
const I18N = {
  he: {
    cta_wa: "דברו איתי",
    nav_student: "כניסת תלמידים",
    nav_signout: "יציאה",
    nav_account: "התפריט שלך",
    hero_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    hero_title_a: "לבנות את הפרויקט הראשון שלך עם ",
    hero_title_mark: "צוות AI",
    hero_title_b: " שיצרת בעצמך.",
    hero_sub: "בסדנה מעשית אחת תיצרו צוות AI אישי, תלמדו לנהל אותו, ותתחילו לעבוד על הפרויקט שלכם כבר במהלך הסדנה.",
    hero_points: ["מפגש בן שלוש שעות", "צוות סוכני AI", "כוח־על של בנייה"],
    session: {
      badge: "המחזור הראשון",
      when_label: "מתי?",
      when_value: ["יום ה׳, 3 בספטמבר", "17:30-20:30", "מפגש יחיד, 3 שעות"],
      where_label: "איפה?",
      where_value: ["אונליין בזום", "מכל מקום בעולם"],
      cta: "דברו איתי",
      limited_note: "מקומות מוגבלים",
    },

    why_eyebrow: "למה עכשיו",
    why_title: "הדרך שבה בונים מוצר משתנה. אתם יכולים להוביל אותה.",
    why_body: "לפני שנה, לבנות עם צוות של סוכני AI היה הדגמה של חוקרים. היום זו כבר הדרך שבה יותר ויותר אנשי מוצר עובדים באמת, וכמעט אף אחד עדיין לא הפך את זה למשהו שאפשר ללמוד בתוך אחר צהריים אחד. זה בדיוק אחר הצהריים הזה. תיכנסו עכשיו, כל עוד זה עדיין יתרון.",

    walk_eyebrow: "מה לוקחים הביתה",
    walk_title: "עם מה יוצאים מפה",
    walk_items: [
      { t: "צוות AI אישי שבנית בעצמך", b: "תיצרו צוות סוכני AI שמותאם בדיוק לאופן שבו אתם עובדים, עם תפקידים ברורים וידע משותף." },
      { t: "זיכרון משותף שכל הצוות עובד ממנו", b: "כל הסוכנים עובדים מאותו מקור ידע, מכירים את הפרויקט ומשתפים ביניהם הקשר ומידע לאורך כל העבודה." },
      { t: "הפרויקט הראשון שכבר התחלתם לבנות", b: "כבר במהלך הסדנה תתחילו לעבוד עם הצוות שבניתם על הפרויקט שלכם, במקום לצאת רק עם ידע תיאורטי." },
      { t: "שיטת עבודה שתמשיך איתכם גם אחרי הסדנה", b: "תצאו עם צוות, זיכרון ותהליך עבודה שתוכלו להמשיך לפתח ולהשתמש בהם גם בפרויקטים הבאים." },
    ],

    who_eyebrow: "למי זה מתאים",
    who_for_title: "אם אתם רוצים לבנות בעצמכם, אבל לא לבד.",
    who_intro: "לא משנה אם אתם אנשי מוצר ועיצוב, יזמים, בוני מוצרים או אנשי מקצוע שרוצים לעבוד אחרת. אם אתם רוצים להפוך את ה-AI לשותף אמיתי בתהליך העבודה שלכם, אתם במקום הנכון.",
    who_tiles: [
      { t: "אנשי מוצר ועיצוב", b: "בין אם אתם מעצבי מוצר, מובילי עיצוב או מנהלי מוצר, הסדנה תראה לכם איך לעבוד עם צוות AI שמרחיב את היכולות שלכם ומשאיר אתכם להתמקד במה שאף כלי לא עושה: לחשוב, להחליט ולהוביל." },
      { t: "בונים ויזמים", b: "יש לכם רעיון, מוצר או עסק שאתם רוצים לבנות או לקדם. בסדנה תבנו צוות AI שחושב איתכם, מתכנן, מאתגר רעיונות ועוזר להפוך אותם למוצר אמיתי." },
      { t: "מרחיבי אופקים", b: "אם אתם מרגישים שהדרך שבה עובדים משתנה, ורוצים להבין איך באמת עובדים עם AI, לא רק לשאול שאלות אלא לבנות תהליך עבודה שלם, הסדנה הזו בשבילכם." },
    ],
    who_not: "מתאים פחות למי שמחפש כפתור קסם. אם בא לך להפשיל שרוולים ולבנות בעצמך, יש לך מקום סביב השולחן.",

    agenda_eyebrow: "שלושה שלבים",
    agenda_title: "שלוש שעות. בסוף הסדנה תצאו עם צוות AI שעובד איתכם.",
    agenda_intro: "בשלושה שלבים נבנה יחד את מערכת העבודה החדשה שלכם, מהיכרות עם השיטה, דרך הקמת צוות AI אישי ועד לבניית הפרויקט הראשון שלכם.",
    agenda_phases: [
      { time: "שלב ראשון", t: "מתחילים", b: "מבינים את שיטת העבודה, מכירים את הכלים שנשתמש בהם ומניחים את היסודות לצוות שנבנה בהמשך." },
      { time: "שלב שני", t: "מקימים את הצוות", b: "בונים את צוות ה-AI הראשון שלכם, מחברים אותו לזיכרון משותף ומתאימים אותו בדיוק לאופן שבו אתם עובדים." },
      { time: "שלב שלישי", t: "בונים עם הצוות", b: "מפעילים את הצוות שבניתם ומתחילים לעבוד יחד על הפרויקט הראשון שלכם." },
    ],
    agenda_toggle: "מה יש בפנים",
    agenda_p1_items: [
      { t: "מבינים את התמונה הגדולה", b: "מה השתנה בעולם ה-AI, למה סוכני AI הפכו לכלי עבודה אמיתי ואיך זה משפיע על הדרך שבה בונים מוצרים." },
      { t: "מכירים את כלי העבודה", b: "מתי משתמשים ב-Claude, מתי ב-ChatGPT, מתי ב-Gemini, ואיך כל כלי משתלב בתהליך העבודה." },
      { t: "חושבים כמו צוות", b: "למה מתחילים מתפקיד ברור, ממשיכים לכישורים ולכלים, ורק אחר כך בונים את הזיכרון המשותף." },
      { t: "מקימים את המוח המשותף", b: "יוצרים בסיס ידע משותף שמאפשר לכל הסוכנים לעבוד מאותו הקשר ולהשתפר לאורך הדרך." },
      { t: "מבינים את הדרך", b: "מכירים את שלבי הסדנה ומבינים איך כל חלק מתחבר לתהליך עבודה אחד." },
    ],
    agenda_p2_items: [
      { t: "מקימים את סביבת העבודה", b: "מחברים את Claude למוח המשותף ומקימים את סביבת העבודה שתלווה אתכם גם אחרי הסדנה." },
      { t: "בונים את הסוכן הראשון", b: "יוצרים את ה-CTO שלכם מתוך פרומפט מוכן, עם תפקיד ברור, כישורים וכלי העבודה הנכונים." },
      { t: "מרחיבים את הצוות", b: "מוסיפים מנהל מוצר ומעצב מוצר, כדי ליצור צוות שיודע לחשוב, לקבל החלטות ולעבוד יחד." },
      { t: "מחברים את כולם", b: "מחברים את כל הסוכנים לזיכרון משותף, כך שכל הידע, ההחלטות והתובנות נשמרים במקום אחד." },
      { t: "הופכים את הצוות לשלכם", b: "מתאימים תפקידים, מוסיפים יכולות ובונים צוות שמתאים בדיוק לדרך שבה אתם עובדים." },
    ],
    agenda_p3_items: [
      { t: "נותנים בריף", b: "מסבירים למנהל המוצר מה רוצים לבנות, והוא מתחיל לתעדף, לכוון ולתזמר את העבודה." },
      { t: "רואים את הצוות בפעולה", b: "צופים במעצב, במנהל המוצר וב-CTO עובדים יחד, מתייעצים ומקבלים החלטות בזמן אמת." },
      { t: "בונים את הפרויקט הראשון", b: "הופכים את הרעיון שלכם לעמוד נחיתה עובד, יחד עם צוות ה-AI שבניתם." },
      { t: "ממשיכים גם אחרי הסדנה", b: "יוצאים עם צוות AI אישי שתוכלו להמשיך להתייעץ איתו, לבנות איתו ולהרחיב אותו גם אחרי שהמפגש מסתיים." },
    ],

    proof_eyebrow: "לא מצגת. מוצרים אמיתיים.",
    proof_title: "כל מה שאתם רואים כאן נבנה באותה שיטה.",
    proof_lead: "כל פרויקט בעמוד הזה נבנה בעזרת צוות AI, זיכרון משותף ותהליך העבודה שתלמדו בסדנה.",
    proof_self_tag: "הדף הזה",
    proof_self_t: "הדף הזה",
    proof_self_b: "עוצב ונבנה על ידי אותו סוג של צוות AI שתקימו, בעבודה משותפת עם אופיר.",
    proof_glimps_tag: "מוצר אמיתי",
    proof_glimps_t: "Glimps",
    proof_glimps_b: "מוצר אמיתי, שנבנה ככה. תראו בעצמכם.",
    proof_glimps_link: "לצפייה ב-Glimps",

    ofir_eyebrow: "מי תכירו בסדנה",
    roster_title: "תכירו את הצוות שאיתו אני עובד בכל יום.",
    lead_label: "מוביל הסדנה",
    crew_label: "השותפים שלי לעבודה",
    crew_title: "אלה השותפים שאיתם אני בונה כל מוצר.",
    crew_intro: "לכל אחד מהשותפים שלי יש תחום אחריות אחר. יחד הם עוזרים לי לחשוב, לקבל החלטות, לעצב ולבנות מוצרים. במהלך הסדנה תבנו גרסה משלכם לאותו צוות, שתותאם בדיוק לאופן שבו אתם עובדים.\n\nבסוף הסדנה, אלה כבר לא יהיו רק השותפים שלי. הם יהיו גם שלכם.",
    crew_close: "כשתצאו מכאן, יהיה גם לכם צוות כזה. וכבר לא תבנו לבד.",
    ofir_name: "אופיר רושינק",
    ofir_role: "ראש הצוות",
    agents: [
      { img: "agent-cto", role: "הארכיטקט - המהנדס הראשי", b: "כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה, לחשוב על הארכיטקטורה ולוודא שכל פתרון שנבחר באמת ניתן למימוש, יציב ומוכן לגדול יחד עם המוצר." },
      { img: "agent-cpo", role: "האסטרטג - מנהל המוצר", b: "כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף משימות, לאתגר הנחות יסוד ולשמור שכל החלטה מקדמת את המוצר בכיוון הנכון." },
      { img: "agent-pd", role: "המעצב - מעצב המוצר", b: "כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System, שומר על עקביות, מציע פתרונות UX ומוודא שכל מסך ברור, שימושי ומוכן לבנייה." },
    ],
    ofir_bio: "במשך שנים בניתי מוצרים דיגיטליים והובלתי צוותי Product Design. אבל השינוי המשמעותי ביותר שעברתי לא היה תפקיד חדש, אלא דרך עבודה חדשה.\n\nהיום אני כבר לא בונה מוצרים לבד. אני עובד עם צוות AI שבניתי לעצמי - שותפים לחשיבה, לתכנון, לעיצוב ולבנייה. יחד בנינו את Product Lab, את Glimps, את האתר שאתם נמצאים בו עכשיו, ואפילו חלקים מהסדנה עצמה.",
    ofir_why: "עכשיו אני רוצה לעזור גם לכם לבנות לעצמכם צוות כזה.",

    quotes_eyebrow: "המלצות",
    quotes_title: "ממי שכבר עבר את זה",
    quotes: [
      { q: "יצאתי מצוידת עם אנשי צוות (agents) מקצועיים ברמה הכי גבוהה, הצלחתי ליצור תוצרים משלי ישר אחרי המפגש ולקבל אינפוט שלא הצלחתי לקבל לפני. ממליצה בחום.", n: "Ella Cohen", m: "Lead Product Designer", img: "testimonial-ella" },
      { q: "אופיר לימד אותי לבנות ולנהל צוות של סוכני בינה מלאכותית (AI Agents) אוטונומיים, ללא צורך בכתיבת קוד. בעבודה משותפת הוא עזר לי לבנות בסיס עבודה מוצק לרעיון שליווה אותי הרבה זמן ולא הצלחתי להוציא לפועל, ומשם כבר יצאתי לדרך. ממליצה בחום למי שרוצה ללמוד איך באמת להשתמש ב-AI כדי לבנות דברים, לא רק לדבר עליהם.", n: "Rona Galezer", m: "Venture Builder & Impact Investor", img: "testimonial-rona" },
    ],

    incl_eyebrow: "הפרטים",
    incl_title: "כל מה שצריך לדעת",
    // ONE unified accordion. `open:true` = logistics facts shown by default.
    detail_items: [
      { ico: "video",    q: "איפה ואיך זה מתנהל?", a: "מפגש חי בזום, בקבוצה קטנה, כדי שלכל אחד תהיה תשומת לב אישית." },
      { ico: "clock",    q: "כמה זמן זה לוקח?", a: "כשלוש שעות רצופות עם הפסקה אחת. מגיעים בלי צוות AI, יוצאים עם אחד." },
      { ico: "hand",     q: "אני בונה בעצמי או צופה?", a: "בונה לאורך כל הדרך, לא צופה מהצד. יוצאים עם משהו אמיתי שבנית בעצמך." },
      { ico: "laptop",   q: "צריך לדעת לתכנת?", a: "לא. אם יודעים לכתוב בריף ברור, אפשר לעשות את זה. בונים על Claude, בשפה רגילה, בלי קוד." },
      { ico: "box",      q: "מה צריך להביא?", a: "לפטופ, חשבון Claude, וחיבור אינטרנט יציב. כדאי גם פינה שקטה שבה תוכלו להתרכז. נגיד לכם מה עוד להכין לפני המפגש." },
      { ico: "spark",    q: "זה באמת מפגש אחד?", a: "כן. יוצאים עם צוות AI עובד ועם משהו אמיתי שבניתם. לאן לוקחים את זה משם, כבר תלוי בכם." },
      { ico: "users",    q: "זה לצוותים או ליחידים?", a: "לשניהם. אפשר לבוא לבד, או להביא כמה אנשים מהצוות." },
      { ico: "calendar", q: "ומה אם התאריך לא מתאים לי?", a: "נדבר על זה בשיחה. הקבוצות קטנות והמפגשים חוזרים על עצמם, אז נמצא מועד שמתאים לכם." },
    ],

    final_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    final_title: "בואו נבנה ביחד",
    final_sub: "אחר צהריים אחד, קבוצה קטנה, וצוות משלכם שבונה אותו איתכם ונשאר שלכם גם אחרי. הצעד הראשון הוא שיחה איתי.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "אזור התלמידים",
    login_title: "כניסה עם הקוד שלך",
    login_sub: "האזור הזה נועד למשתתפי הסדנה. הזינו את קוד הגישה ששלחתי לכם.",
    login_pass_label: "קוד גישה",
    login_pass_ph: "הקוד ששלחתי לך",
    login_submit: "כניסה",
    login_soon: "הקוד לא נכון. תבדקו את ההודעה ששלחתי לכם. אם זה לא מסתדר, פשוט תענו לי עליה.",

    // ---- Student prep page (gated by pl_auth). Teaching copy lives in
    // content.js (WORKSHOP_CONTENT). These keys are the two used by the
    // defensive no-content fallback plus the bilingual Help/WhatsApp block.
    prep_page_title: "אזור התלמידים",
    prep_welcome_title: "אתם בפנים. ברוכים הבאים למחזור הראשון של Product Lab.",
    prep_help_title: "שאלה, או תקועים?",
    prep_help_body: "תקועים בהכנות או שיש שאלה? כתבו לי בוואטסאפ. עדיף לסדר את זה עכשיו ולא ב-17:30 ביום המפגש.",

    // ---- Legal: Privacy (privacy_*) — copy Copywriter 2026-08-05
    privacy_title: "מדיניות פרטיות",
    privacy_intro: "בקצרה: אנחנו אוספים כמה שפחות, ולעולם לא מוכרים את המידע שלכם. הנה התמונה המלאה.",
    privacy_items: [
      { t: "מה אנחנו אוספים", b: "הכניסה לאזור התלמידים לא אוספת ממכם שום מידע אישי. אם נבקש מכם אימייל, בהרשמה או בשאלון קצר, תדעו בדיוק מתי אתם מוסרים אותו." },
      { t: "למה אנחנו משתמשים בו", b: "כל פרט שתמסרו משמש רק כדי להריץ את הסדנה: ליצור אתכם קשר לגבי המפגש, לשלוח חומרים, ולעקוב אחרי מה שצריך. זהו." },
      { t: "מה אנחנו לא עושים", b: "אנחנו לא מוכרים את המידע שלכם, ולא משתפים אותו עם אף אחד מחוץ לסדנה." },
      { t: "יצירת קשר", b: "שאלה לגבי המידע שלכם? כתבו לי בוואטסאפ ואענה." },
    ],
    privacy_updated: "עודכן לאחרונה: 5 באוגוסט 2026",

    // ---- Legal: Terms (terms_*) — copy Copywriter 2026-08-05
    terms_title: "תנאי שימוש",
    terms_intro: "בקצרה: זו סדנה בהזמנה בלבד, החומרים שלכם לשימוש אישי אבל לא להעברה, והתוכן הוא שלי. הנה הפירוט.",
    terms_items: [
      { t: "בהזמנה בלבד", b: "הגישה לסדנה ולאזור התלמידים היא בהזמנה. אל תשתפו את פרטי הכניסה שלכם." },
      { t: "החומרים", b: "הפרומפטים, התבניות והחומרים שנשתף הם לשימוש אישי שלכם. אל תפיצו, תמכרו או תפרסמו אותם מחדש." },
      { t: "התוכן", b: "כל תוכן הסדנה הוא © אופיר רושינק / Product Lab." },
      { t: "יצירת קשר", b: "משהו לא ברור? כתבו לי בוואטסאפ." },
    ],
    terms_updated: "עודכן לאחרונה: 5 באוגוסט 2026",

    footer_privacy: "מדיניות פרטיות",
    footer_terms: "תנאי שימוש",

    footer_line: "סדנאות בהזמנה על עיצוב מוצר בהובלת AI.",
    footer_contact: "יצירת קשר",
  },

  en: {
    cta_wa: "Talk to me",
    nav_student: "Student entrance",
    nav_signout: "Sign out",
    nav_account: "Your menu",
    hero_chip: "Invite-only. Small groups.",
    hero_title_a: "Build your first project with an ",
    hero_title_mark: "AI team",
    hero_title_b: " you created yourself.",
    hero_sub: "In one hands-on workshop you'll create your own AI team, learn to run it, and start working on your project during the workshop itself.",
    hero_points: ["A 3-hour workshop", "A team of AI agents", "Builder superpower"],
    session: {
      badge: "First cohort",
      when_label: "When?",
      when_value: ["Thursday, 3 September", "17:30-20:30", "One session, 3 hours"],
      where_label: "Where?",
      where_value: ["Online, over Zoom", "From anywhere"],
      cta: "Talk to me",
      limited_note: "Spots are limited",
    },

    why_eyebrow: "Why now",
    why_title: "The way product gets built is changing. You can lead it.",
    why_body: "A year ago, building with a team of AI agents was a research demo. Today it is how a growing number of product people actually work, and almost nobody has turned it into something you can learn in an afternoon. This is that afternoon. Get in while it is still an edge.",

    walk_eyebrow: "What you take home",
    walk_title: "What you leave with",
    walk_items: [
      { t: "A personal AI team you built yourself", b: "You'll create a team of AI agents tuned to exactly how you work, with clear roles and shared knowledge." },
      { t: "A shared memory the whole team works from", b: "Every agent works from the same source of knowledge, knows the project, and shares context and information across the entire process." },
      { t: "Your first project, already underway", b: "During the workshop itself you'll start working with the team you built on your own project, instead of leaving with only theory." },
      { t: "A way of working that stays with you after the workshop", b: "You'll leave with a team, a memory, and a workflow you can keep developing and using on your next projects too." },
    ],

    who_eyebrow: "Who it is for",
    who_for_title: "If you want to build on your own, but not alone.",
    who_intro: "It doesn't matter if you're in product and design, a founder, a product builder, or a professional who wants to work differently. If you want to make AI a real partner in the way you work, you're in the right place.",
    who_tiles: [
      { t: "Product and design people", b: "Whether you're a product designer, a design lead, a product manager, or the person who owns the product in your company, the workshop shows you how to work with an AI team that extends what you can do, speeds up the work, and frees you to focus on what no tool can: thinking, deciding, and leading." },
      { t: "Builders and founders", b: "You have an idea, a product, or a business you want to build or grow. In the workshop you'll build an AI team that thinks with you, plans, challenges ideas, and helps turn them into a real product." },
      { t: "Expanding your horizons", b: "If you feel the way we work is changing, and you want to understand how to really work with AI, not just ask it questions but build a whole way of working, this workshop is for you." },
    ],
    who_not: "Less of a fit for anyone after a magic button. If you'd rather roll up your sleeves and build it yourself, there's a chair at the table.",

    agenda_eyebrow: "Three stages",
    agenda_title: "Three hours. By the end you'll walk out with an AI team that works with you.",
    agenda_intro: "In three stages we'll build your new way of working together, from learning the method, through setting up your own AI team, to building your first project.",
    agenda_phases: [
      { time: "Stage one", t: "Getting started", b: "You'll understand the method, get to know the tools we'll use, and lay the foundations for the team you'll build next." },
      { time: "Stage two", t: "Building the team", b: "You'll build your first AI team, connect it to a shared memory, and tune it to exactly how you work." },
      { time: "Stage three", t: "Building with the team", b: "You'll put the team you built to work and start building your first project together." },
    ],
    agenda_toggle: "What's inside",
    agenda_p1_items: [
      { t: "See the big picture", b: "What's changed in the AI world, why AI agents became a real working tool, and how that shifts the way products get built." },
      { t: "Get to know the tools", b: "When to use Claude, when ChatGPT, when Gemini, and how each one fits into your workflow." },
      { t: "Think like a team", b: "Why you start from a clear role, move on to skills and tools, and only then build the shared memory." },
      { t: "Set up the shared brain", b: "You'll create a shared knowledge base that lets every agent work from the same context and improve along the way." },
      { t: "See the path ahead", b: "Get to know the stages of the workshop and how each part connects into one way of working." },
    ],
    agenda_p2_items: [
      { t: "Set up your workspace", b: "Connect Claude to the shared brain and set up the workspace that stays with you after the workshop." },
      { t: "Build your first agent", b: "Create your CTO from a ready-made prompt, with a clear role, the right skills, and the right tools." },
      { t: "Grow the team", b: "Add a product manager and a product designer, to create a team that can think, decide, and work together." },
      { t: "Connect everyone", b: "Connect all the agents to a shared memory, so all the knowledge, decisions, and insights live in one place." },
      { t: "Make the team yours", b: "Adjust roles, add capabilities, and build a team that fits exactly the way you work." },
    ],
    agenda_p3_items: [
      { t: "Give the brief", b: "Tell your product manager what you want to build, and it starts prioritizing, steering, and orchestrating the work." },
      { t: "See the team in action", b: "Watch the designer, the product manager, and the CTO work together, consult each other, and make decisions in real time." },
      { t: "Build your first project", b: "Turn your idea into a working landing page, together with the AI team you built." },
      { t: "Keep going after the workshop", b: "Walk out with your own AI team you can keep consulting, building with, and expanding long after the session ends." },
    ],

    proof_eyebrow: "Not a slide deck. Real products.",
    proof_title: "Everything you see here was built the same way.",
    proof_lead: "Every project on this page was built with an AI team, shared memory, and the workflow you'll learn in the workshop.",
    proof_self_tag: "This page",
    proof_self_t: "This page",
    proof_self_b: "Designed and built by the same kind of AI team you will set up, working with Ofir.",
    proof_glimps_tag: "A real product",
    proof_glimps_t: "Glimps",
    proof_glimps_b: "A real product, built this way. See it for yourself.",
    proof_glimps_link: "See Glimps",

    ofir_eyebrow: "Who you'll meet in the workshop",
    roster_title: "Meet the team I work with every day.",
    lead_label: "Leads the workshop",
    crew_label: "My work partners",
    crew_title: "These are the partners I build every product with.",
    crew_intro: "Each of my partners owns a different area. Together they help me think, make decisions, design, and build products.\n\nDuring the workshop you'll build your own version of this team, tuned to exactly how you work.\n\nBy the end, these won't just be my partners. They'll be yours too.",
    crew_close: "When you leave here, you'll have a team like this too. And you won't build alone anymore.",
    ofir_name: "Ofir Rushinek",
    ofir_role: "The operator",
    agents: [
      { img: "agent-cto", role: "The Architect - the lead engineer", b: "When I hit a technical dilemma, I start with him. He helps me choose the right approach, think through the architecture, and make sure every solution we pick is actually buildable, stable, and ready to grow with the product." },
      { img: "agent-cpo", role: "The Strategist - the product manager", b: "When I'm not sure what to build first, I check with him. He helps sharpen ideas, prioritize, challenge assumptions, and keep every decision moving the product in the right direction." },
      { img: "agent-pd", role: "The Designer - the product designer", b: "When it's time to design, he's my first partner. He works from the Design System, keeps things consistent, suggests UX solutions, and makes sure every screen is clear, usable, and ready to build." },
    ],
    ofir_bio: "For years I built digital products and led Product Design teams. But the biggest shift I went through wasn't a new title, it was a new way of working.\n\nToday I don't build products alone anymore. I work with an AI team I built for myself - partners in thinking, planning, design, and building.\n\nTogether we built Product Lab, Glimps, the site you're on right now, and even parts of the workshop itself.",
    ofir_why: "Now I want to help you build a team like that for yourself too.",

    quotes_eyebrow: "Testimonials",
    quotes_title: "From people who've done it",
    quotes: [
      { q: "I came away with a top-tier professional team (agents), created my own work right after the session, and got input I couldn't get before. Highly recommend.", n: "Ella Cohen", m: "Lead Product Designer", img: "testimonial-ella" },
      { q: "Ofir taught me to build and manage a team of autonomous AI agents, with no code required. Working together, he helped me build a solid foundation for an idea I'd carried for a long time and hadn't managed to execute, and from there I was off and running. Highly recommend to anyone who wants to learn how to really use AI to build things, not just talk about them.", n: "Rona Galezer", m: "Venture Builder & Impact Investor", img: "testimonial-rona" },
    ],

    incl_eyebrow: "The details",
    incl_title: "Everything you need to know",
    detail_items: [
      { ico: "video",    q: "Where and how does it run?", a: "A live session over Zoom, in a small group, so everyone gets real personal attention." },
      { ico: "clock",    q: "How long does it take?", a: "About three hours straight, with one break. You come in without an AI team and leave with one." },
      { ico: "hand",     q: "Do I build it myself or watch?", a: "You build the whole way through, not watch from the side. You leave with something real you made yourself." },
      { ico: "laptop",   q: "Do I need to know how to code?", a: "No. If you can write a clear brief, you can do this. We build on Claude, in plain language, no code." },
      { ico: "box",      q: "What do I need to bring?", a: "A laptop, a Claude account, and a stable internet connection. A quiet spot to focus helps too. We'll tell you what else to set up before the session." },
      { ico: "spark",    q: "Is it really just one session?", a: "Yes. You leave with a working AI team and something real you built. Where you take it from there is up to you." },
      { ico: "users",    q: "Is this for teams or individuals?", a: "Both. Come solo, or bring a couple of people from your team." },
      { ico: "calendar", q: "What if I can't make the date?", a: "Tell me on the call. The groups are small and sessions run regularly, so we'll find one that fits." },
    ],

    final_chip: "Invite-only. Small groups.",
    final_title: "Let's build together",
    final_sub: "One afternoon, a small group, and a team of your own that builds it with you, and stays yours long after. The first step is a call with me.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "Student area",
    login_title: "Enter with your code",
    login_sub: "This area is for workshop participants. Enter the access code I sent you.",
    login_pass_label: "Access code",
    login_pass_ph: "The code I sent you",
    login_submit: "Enter",
    login_soon: "That code isn't right. Check the message I sent you. If you're still stuck, just reply to it.",

    // ---- Student prep page (gated by pl_auth). Teaching copy lives in
    // content.js (WORKSHOP_CONTENT). These keys are the two used by the
    // defensive no-content fallback plus the bilingual Help/WhatsApp block.
    prep_page_title: "Student area",
    prep_welcome_title: "You're in. Welcome to cohort #1 of Product Lab.",
    prep_help_title: "Questions, or stuck?",
    prep_help_body: "Stuck on the setup, or have a question? Message me on WhatsApp. Better to sort it now than at 17:30 on the day.",

    // ---- Legal: Privacy (privacy_*) — copy Copywriter 2026-08-05
    privacy_title: "Privacy Policy",
    privacy_intro: "Short version: we collect as little as possible, and we never sell your data. Here's the full picture.",
    privacy_items: [
      { t: "What we collect", b: "Signing in to the student area collects no personal information from you. If we ever ask for your email, whether to sign up or in a short survey, you'll know exactly when you're giving it." },
      { t: "How we use it", b: "Anything you share is used only to run the workshop: to reach you about your session, send materials, and follow up. That's it." },
      { t: "What we don't do", b: "We never sell your information, and we never share it with anyone outside the workshop." },
      { t: "Contact", b: "Questions about your data? Message me on WhatsApp and I'll answer." },
    ],
    privacy_updated: "Last updated: 5 August 2026",

    // ---- Legal: Terms (terms_*) — copy Copywriter 2026-08-05
    terms_title: "Terms of Use",
    terms_intro: "Short version: this is an invite-only workshop, the materials are yours to use but not to pass on, and the content is mine. Here's the detail.",
    terms_items: [
      { t: "Invite-only", b: "Access to the workshop and this student area is by invitation. Please don't share your sign-in details." },
      { t: "The materials", b: "The prompts, templates, and materials we share are for your personal use. Please don't redistribute, resell, or republish them." },
      { t: "The content", b: "All workshop content is © Ofir Rushinek / Product Lab." },
      { t: "Contact", b: "Anything unclear? Message me on WhatsApp." },
    ],
    terms_updated: "Last updated: 5 August 2026",

    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",

    footer_line: "Invite-only workshops on AI-led product design.",
    footer_contact: "Get in touch",
  },
};

/* ---- Templates ----------------------------------------------------------- */
// WhatsApp only — Ofir wants people to reach him directly, no booking funnel.
const ctaRow = (t) => `
  <div class="cta-row">
    <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
  </div>`;

const ctaBand = (t, title, sub) => `
  <section class="section"><div class="wrap">
    <div class="ctaband reveal">
      <h2>${title}</h2>
      <p>${sub}</p>
      ${ctaRow(t)}
    </div>
  </div></section>`;

/* ---- Shared chrome (nav + student modal + footer), used on every page ----- */
// NAV — logo hidden for now (decide later); wordmark text + WhatsApp only.
// Brand links to "#/" (home route) so it works from sub-pages too.
// opts.account = true renders the SIGNED-IN student-area variant (only used by
// renderPrep, i.e. the #/prep path): the WhatsApp contact button is replaced by
// a user-avatar button that opens a Sign out dropdown, and the hamburger tray
// holds ONLY the language toggle. Everywhere else (main page, legal pages) the
// header is untouched (WhatsApp + full tray as today).
const navHeader = (t, lang, opts = {}) => {
  const langToggle = `<button class="langtoggle" data-toggle-lang aria-label="Switch language"><span class="lang-full">${lang === "he" ? "English" : "עברית"}</span><span class="lang-short">${lang === "he" ? "EN" : "עב"}</span></button>`;

  if (opts.account) {
    // Student-area header: avatar (icon-only) opens a menu; on mobile the label
    // lives inside the menu since the avatar is icon-only in the bar.
    return `
  <header class="nav"><div class="wrap nav__in nav__in--account">
    <!-- MOBILE layout: avatar left · wordmark center · hamburger right.
         The hamburger tray below holds the language toggle only. -->
    <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
    <div class="nav__menu" id="navMenu">
      ${langToggle}
    </div>
    <div class="nav__account" data-account>
      <button class="nav__avatar" type="button" data-account-toggle aria-haspopup="menu" aria-expanded="false" aria-label="${t.nav_account}">${I.user}</button>
      <div class="nav__accmenu" role="menu" aria-label="${t.nav_account}" data-account-menu hidden>
        <button class="nav__accmenu-item" type="button" role="menuitem" data-signout>${t.nav_signout}</button>
      </div>
    </div>
    <button class="nav__burger" type="button" data-nav-toggle aria-label="${lang === "he" ? "תפריט" : "Menu"}" aria-expanded="false" aria-controls="navMenu">${I.menu}</button>
  </div></header>`;
  }

  // Public / signed-out header (unchanged). Signed-in participants who land on
  // the main page still get a text Sign out action here in place of the gate.
  let authed = false;
  try { authed = !!sessionStorage.getItem("pl_auth"); } catch (e) {}
  const studentBtn = authed
    ? `<button class="btn btn--ghost btn--sm nav__student" type="button" data-signout aria-label="${t.nav_signout}"><span class="btn__label">${t.nav_signout}</span></button>`
    : `<button class="btn btn--ghost btn--sm nav__student" type="button" data-student-open aria-label="${t.nav_student}"><span class="btn__label">${t.nav_student}</span></button>`;
  return `
  <header class="nav"><div class="wrap nav__in">
    <!-- MOBILE layout: WhatsApp left · wordmark center · hamburger right.
         The hamburger opens .nav__menu as a tray below (language + student). -->
    <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
    <div class="nav__menu" id="navMenu">
      ${langToggle}
      <!-- Entrance gate when signed out; Sign out when pl_auth is set. Text-only, no icon. -->
      ${studentBtn}
    </div>
    <a class="btn btn--wa-solid btn--sm nav__book" href="${WA_URL}" target="_blank" rel="noopener" aria-label="${t.cta_wa}">${I.wa}<span class="btn__label">${t.cta_wa}</span></a>
    <button class="nav__burger" type="button" data-nav-toggle aria-label="${lang === "he" ? "תפריט" : "Menu"}" aria-expanded="false" aria-controls="navMenu">${I.menu}</button>
  </div></header>`;
};

// Student sign-in MODAL. The email field is intentionally HIDDEN (not deleted)
// so per-user email auth can be re-enabled later without a rebuild. Submit runs
// authenticate(): on success it stores the pl_auth guard flag and routes to #/prep.
const studentModal = (t) => `
  <div class="modal" data-student-modal hidden>
    <div class="modal__overlay" data-student-close></div>
    <div class="modal__card" role="dialog" aria-modal="true" aria-label="${t.login_title}">
      <button class="modal__close" type="button" data-student-close aria-label="Close">${I.x}</button>
      <div class="login__ico">${I.login}</div>
      <span class="eyebrow">${t.login_eyebrow}</span>
      <h2 class="login__title">${t.login_title}</h2>
      <p class="login__sub">${t.login_sub}</p>
      <form class="login__form" data-student-form novalidate>
        <div class="field">
          <label class="field__label" for="student-pass">${t.login_pass_label}</label>
          <input class="input" id="student-pass" name="password" type="password" placeholder="${t.login_pass_ph}" autocomplete="off" />
        </div>
        <button class="btn btn--primary login__submit" type="submit">${t.login_submit}</button>
        <p class="login__note" data-student-note hidden>${I.info}<span>${t.login_soon}</span></p>
      </form>
    </div>
  </div>`;

// FOOTER — now carries the Privacy + Terms routes alongside contact.
const siteFooter = (t) => `
  <footer class="footer"><div class="wrap footer__in">
    <div class="footer__brand"><span class="footer__wordmark">Product Lab</span></div>
    <div class="footer__meta">${t.footer_line}</div>
    <nav class="footer__links">
      <a href="#/privacy">${t.footer_privacy}</a>
      <a href="#/terms">${t.footer_terms}</a>
      <a href="${WA_URL}" target="_blank" rel="noopener">${t.footer_contact}</a>
    </nav>
  </div></footer>`;

function render(lang) {
  const t = I18N[lang];

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang)}

  <main id="top">
  <!-- 1 HERO — full-bleed COZY CAFE SCENE as the background (the visual IS the bg).
       Title sits over it, no separate graphic. Background photo is a PLACEHOLDER
       (warm gradient) until the generated cafe image lands (OpenAI billing gate). -->
  <section class="hero hero--scene">
    <div class="wrap hero__inner reveal">
      <h1 class="hero__title">${t.hero_title_a}<span class="mark">${t.hero_title_mark}</span>${t.hero_title_b}</h1>
      <p class="hero__sub">${t.hero_sub}</p>
      <ul class="hero__points">
        ${t.hero_points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </div>
    <div class="hero__media">
      <picture>
        <source type="image/webp" media="(max-width: 760px)" srcset="assets/hero-mobile-2.webp?v=1" />
        <source type="image/webp" srcset="assets/hero-even-2.webp?v=1" />
        <source type="image/jpeg" media="(max-width: 760px)" srcset="assets/hero-mobile-2.jpg?v=1" />
        <img class="hero__img" src="assets/hero-even-2.jpg?v=1" alt="" width="1536" height="1024" fetchpriority="high" decoding="async" onload="this.classList.add('is-loaded')" />
      </picture>
    </div>
  </section>

  <!-- 1b NEXT SESSION — a FLAT full-width STRIP (like the site's other section bands),
       flush below the hero so a hint peeks above the fold. NOT a floating/rounded card.
       Same structure/content: badge + when/where columns divided by hairlines + CTA. -->
  <section class="session-strip-band">
    <div class="wrap">
      <div class="session-strip reveal">
        <span class="ss-badge">${I.spark} ${t.session.badge}</span>
        <div class="ss-col">
          <div class="ss-label">${t.session.when_label}</div>
          <div class="ss-val">
            <strong>${t.session.when_value[0]}</strong>
            <span>${t.session.when_value[1]}, ${t.session.when_value[2]}</span>
          </div>
        </div>
        <div class="ss-div"></div>
        <div class="ss-col">
          <div class="ss-label">${t.session.where_label}</div>
          <div class="ss-val">
            <strong>${t.session.where_value[0]}</strong>
            <span>${t.session.where_value[1]}</span>
          </div>
        </div>
        <div class="ss-div"></div>
        <div class="ss-col ss-col--cta">
          <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.session.cta}</a>
          <div class="ss-note">${t.session.limited_note}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 WHY NOW -->
  <section class="section section--alt"><div class="wrap narrow why">
    <div class="reveal">
      <span class="eyebrow">${t.why_eyebrow}</span>
      <h2 class="section-title why__title">${t.why_title}</h2>
      <p class="section-lead why__body">${t.why_body}</p>
    </div>
  </div></section>

  <!-- 3 WALK AWAY -->
  <section class="section"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.walk_eyebrow}</span>
      <h2 class="section-title">${t.walk_title}</h2>
    </div>
    <div class="grid grid--2" style="margin-top:2rem">
      ${t.walk_items.map((d, i) => `
        <div class="card reveal">
          <div class="card__ico">${[I.users, I.brain, I.box, I.repeat][i] || I.check}</div>
          <h3>${d.t}</h3><p>${d.b}</p>
        </div>`).join("")}
    </div>
  </div></section>

  <!-- 4 WHO — three tiles (icon on top, like Three-hats cards) -->
  <section class="section section--alt"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.who_eyebrow}</span>
      <h2 class="section-title">${t.who_for_title}</h2>
      <p class="section-lead">${t.who_intro}</p>
    </div>
    <div class="grid grid--3" style="margin-top:2rem">
      ${t.who_tiles.map((x, i) => `
        <div class="tilecard reveal">
          <div class="tilecard__illo"><img src="assets/${["tile-designer", "tile-builder", "tile-nextai"][i]}.png?v=3" alt="" /></div>
          <div class="tilecard__body"><h3>${x.t}</h3><p>${x.b}</p></div>
        </div>`).join("")}
    </div>
    <p class="who__not reveal">${t.who_not}</p>
  </div></section>

  <!-- 5 AGENDA -->
  <section class="section"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.agenda_eyebrow}</span>
      <h2 class="section-title">${t.agenda_title}</h2>
      <p class="section-lead">${t.agenda_intro}</p>
    </div>
    <div class="agenda" style="margin-top:2rem">
      ${t.agenda_phases.map((p, i) => {
        const items = [t.agenda_p1_items, t.agenda_p2_items, t.agenda_p3_items][i] || [];
        return `
        <details class="aphase reveal" open>
          <summary class="aphase__head">
            <span class="phase__time">${p.time}</span>
            <div class="aphase__intro"><h3>${p.t}</h3><p>${p.b}</p></div>
            <span class="aphase__toggle">${t.agenda_toggle}${I.chev}</span>
          </summary>
          <div class="aphase__items">
            ${items.map((it) => `
            <div class="aphase__item"><h4>${it.t}</h4><p>${it.b}</p></div>`).join("")}
          </div>
        </details>`;
      }).join("")}
    </div>
  </div></section>

  <!-- 6 PROOF OF CRAFT -->
  <section class="section section--alt"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.proof_eyebrow}</span>
      <h2 class="section-title">${t.proof_title}</h2>
      <p class="section-lead">${t.proof_lead}</p>
    </div>
    <div class="proof" style="margin-top:2rem">
      <div class="proof__block reveal">
        <div class="proof__shot"><img src="assets/thispage.png" alt="" /></div>
        <div class="proof__body">
          <h3>${t.proof_self_t}</h3><p>${t.proof_self_b}</p>
        </div>
      </div>
      <div class="proof__block reveal">
        <div class="proof__shot"><img src="assets/glimps.png" alt="Glimps" /></div>
        <div class="proof__body">
          <h3>${t.proof_glimps_t}</h3><p>${t.proof_glimps_b}</p>
          <a class="linkline" href="https://glimps.design" target="_blank" rel="noopener">${t.proof_glimps_link} ${I.arrow}</a>
        </div>
      </div>
    </div>
  </div></section>

  <!-- 7 THE TEAM ROSTER — Ofir (operator) on top, his 3 AI agents beneath -->
  <section class="section"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.ofir_eyebrow}</span>
      <h2 class="section-title">${t.roster_title}</h2>
    </div>
    <!-- ONE bounded panel: leader on top, the AI crew grouped in a band below -->
    <div class="team reveal">
      <div class="team__lead">
        <div class="team__photo"><img src="assets/ofir.jpeg" alt="${t.ofir_name}" /></div>
        <div class="team__leadtext">
          <span class="team__kicker">${t.lead_label}</span>
          <div class="team__name">${t.ofir_name}</div>
          ${t.ofir_bio.split("\n\n").map((p) => `<p>${p}</p>`).join("")}<p>${t.ofir_why}</p>
        </div>
      </div>
      <div class="team__crew">
        <span class="eyebrow">${t.crew_label}</span>
        <div class="team__name">${t.crew_title}</div>
        ${t.crew_intro.split("\n\n").map((p) => `<p class="section-lead">${p}</p>`).join("")}
        <div class="team__agents">
          ${t.agents.map((a) => `
            <div class="agentcard">
              <div class="agentcard__illo"><img src="assets/${a.img}.png?v=3" alt="" /></div>
              <div class="agentcard__body">
                <div class="agentcard__role">${a.role}</div>
                <p>${a.b}</p>
              </div>
            </div>`).join("")}
        </div>
        <p class="section-lead">${t.crew_close}</p>
      </div>
    </div>
  </div></section>

  <!-- 8 TESTIMONIALS — shown as intentional PLACEHOLDER cards (dashed) so people
       reviewing the page see where their quote will go. Swap q/n/m in I18N for real. -->
  <section class="section section--alt"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.quotes_eyebrow}</span>
      <h2 class="section-title">${t.quotes_title}</h2>
    </div>
    <div class="quote-grid" style="margin-top:2rem">
      ${t.quotes.map((qt) => `
        <figure class="quote-card reveal">
          <figcaption class="quote-card__head">
            <span class="quote-card__avatar">${qt.img ? `<img src="assets/${qt.img}.jpg?v=1" alt="${qt.n}" loading="lazy" />` : I.user}</span>
            <span class="quote-card__who"><strong>${qt.n}</strong><span>${qt.m}</span></span>
          </figcaption>
          <blockquote>${qt.q}</blockquote>
        </figure>`).join("")}
    </div>
  </div></section>

  <!-- 9 DETAILS — ONE unified accordion (logistics + FAQ), icon on every row -->
  <section class="section"><div class="wrap narrow">
    <div class="reveal">
      <span class="eyebrow">${t.incl_eyebrow}</span>
      <h2 class="section-title">${t.incl_title}</h2>
    </div>
    <div class="faq" style="margin-top:1.75rem">
      ${t.detail_items.map((d) => `
        <details class="reveal"${d.open ? " open" : ""}>
          <summary><span class="faq__q">${I[d.ico] || I.check}${d.q}</span>${I.chev}</summary>
          <div class="faq__a">${d.a}</div>
        </details>`).join("")}
    </div>
  </div></section>

  <!-- 10 FINAL CTA -->
  ${ctaBand(t, t.final_title, t.final_sub)}

  </main>

  ${studentModal(t)}
  ${siteFooter(t)}`;

  afterRender();
}

/* ---- Student PREP page — gated by the pl_auth sessionStorage flag --------- */
/* The single guard: no pl_auth token → bounce home and pop the sign-in modal.
   authenticate() sets pl_auth on success; this page only reads it.
   CONTENT: rendered from window.WORKSHOP_CONTENT (content.js). This is the
   POST-workshop content vault. Teaching copy is BILINGUAL: renderPrep reads
   WORKSHOP_CONTENT[lang] (fallback en) and sets the vault <main> direction to
   match the toggle (rtl for HE, ltr for EN). Prompts are technical and stay
   English in both toggle states; the copyable prompt body is forced dir="ltr"
   so the English prompt renders correctly even inside an RTL page. */

/* Copyable prompt card: label + intro + Copy button (copies only the raw text
   below the divider) + a monospace prompt frame. Restyled to the current DS. */
function promptCard(p) {
  const src = (window.WORKSHOP_CONTENT && window.WORKSHOP_CONTENT.prompts) || {};
  const text = src[p.key] || "";
  return `
    <div class="prompt">
      <div class="prompt__head">
        <div class="prompt__row">
          <span class="prompt__label">${p.label}</span>
          <button type="button" class="prompt__copy" data-copy-key="${p.key}" aria-live="polite">
            <span class="prompt__copy-ico">${I.copy}</span><span class="prompt__copy-label">Copy</span>
          </button>
        </div>
        <p class="prompt__intro">${p.intro}</p>
      </div>
      <pre class="prompt__text" data-prompt="${p.key}" dir="ltr">${escapeHtml(text)}</pre>
    </div>`;
}

/* Minimal HTML-escape so prompt text renders literally inside <pre>. */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* One collapsible plan step: number + title header over the body (checklist
   and/or copyable prompt cards). Step 01 open by default. Native <details>. */
function planStep(step, open) {
  const checklist = step.checklist ? `
    <ul class="pchecklist">
      ${step.checklist.map((c) => `
        <li class="pchecklist__item">
          <span class="pchecklist__dot" aria-hidden="true"></span>
          <div class="pchecklist__body">
            <div class="pchecklist__top">
              <span class="pchecklist__name">${c.name}</span>
              ${c.tag ? `<span class="pchecklist__tag">${c.tag}</span>` : ""}
            </div>
            <p class="pchecklist__note">${c.note}</p>
          </div>
        </li>`).join("")}
    </ul>` : "";
  const note = step.note ? `
    <div class="pnote"><span class="pnote__dot" aria-hidden="true"></span><p>${step.note}</p></div>` : "";
  const prompts = step.prompts ? `
    <div class="prompts">${step.prompts.map(promptCard).join("")}</div>` : "";
  return `
    <details class="pstep reveal"${open ? " open" : ""}>
      <summary class="pstep__head">
        <span class="pstep__num">${step.n}</span>
        <span class="pstep__title">${step.title}</span>
        <span class="pstep__chev">${I.chev}</span>
      </summary>
      <div class="pstep__body">
        <p class="pstep__lead">${step.body}</p>
        ${note}
        ${checklist}
        ${prompts}
      </div>
    </details>`;
}

/* The narrowing-focus funnel - general AI narrowed, tier by tier, to one sharp
   agent. Tokenized (fills use --pl-accent). Labels tie to the numbered stages.
   RTL: SVG coordinates do not follow dir, so we mirror every x around the 520
   viewBox (X helper) and flip the label anchor to end. In HE the funnel sits on
   the right and the tier labels read out to the left, so it reads correctly. */
function focusFunnel(tiers, pointLabel, lang) {
  const mirror = lang === "he";
  const W = 520;
  const X = (v) => (mirror ? W - v : v);
  const cx = 190, h = 66, gap = 12;
  const geo = [
    { top: 360, bot: 300 },
    { top: 300, bot: 234 },
    { top: 234, bot: 166 },
    { top: 166, bot: 92 },
  ];
  const anchor = mirror ? "end" : "start";
  const rows = tiers.map((t, i) => {
    const g = geo[i]; const y = 16 + i * (h + gap);
    const x1t = cx - g.top / 2, x2t = cx + g.top / 2;
    const x1b = cx - g.bot / 2, x2b = cx + g.bot / 2;
    const midY = y + h / 2; const rightMid = cx + (g.top + g.bot) / 4;
    const op = 0.22 + i * 0.24;
    return `
      <polygon points="${X(x1t)},${y} ${X(x2t)},${y} ${X(x2b)},${y + h} ${X(x1b)},${y + h}"
        fill="var(--pl-accent)" fill-opacity="${op}" stroke="var(--pl-accent)" stroke-opacity="0.55" stroke-width="1.5" />
      <text x="${X(cx)}" y="${midY + 6}" text-anchor="middle" font-size="17" font-weight="700" fill="var(--pl-fg)">${i + 1}</text>
      <line x1="${X(rightMid)}" y1="${midY}" x2="${X(404)}" y2="${midY}" stroke="var(--pl-border-strong)" stroke-width="1" />
      <circle cx="${X(rightMid)}" cy="${midY}" r="2.5" fill="var(--pl-accent)" />
      <text x="${X(410)}" y="${midY + 5}" text-anchor="${anchor}" font-size="15" font-weight="700" fill="var(--pl-fg-secondary)">${t.label}</text>`;
  }).join("");
  const neckY = 16 + 4 * (h + gap) - gap;
  return `
    <svg viewBox="0 0 520 384" class="funnel" role="img" aria-label="A general AI narrowed stage by stage into one sharp, accurate agent">
      ${rows}
      <polygon points="${X(cx - 46)},${neckY} ${X(cx + 46)},${neckY} ${X(cx)},${neckY + 40}" fill="var(--pl-accent)" />
      <text x="${X(cx)}" y="${neckY + 62}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--pl-fg)">${pointLabel}</text>
    </svg>`;
}

function renderPrep(lang) {
  const t = I18N[lang];
  let authed = false;
  try { authed = !!sessionStorage.getItem("pl_auth"); } catch (e) {}
  if (!authed) { pendingStudentOpen = true; location.hash = "#/"; return; }

  const W = window.WORKSHOP_CONTENT;
  // Defensive: if content.js failed to load, keep the page usable.
  if (!W) {
    document.getElementById("app").innerHTML = `
    ${navHeader(t, lang, { account: true })}
    <main id="top" class="page"><section class="section"><div class="wrap narrow">
      <span class="eyebrow">${t.prep_page_title}</span>
      <h1 class="section-title">${t.prep_welcome_title}</h1>
      <p class="section-lead">Content is loading. If this persists, refresh the page.</p>
    </div></section></main>
    ${studentModal(t)}${siteFooter(t)}`;
    afterRender();
    return;
  }
  // Bilingual content model: pick the toggled language, fall back to English.
  const C = W[lang] || W.en;

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang, { account: true })}

  <main id="top" class="page vault" dir="${lang === "he" ? "rtl" : "ltr"}">
    <!-- 1 — The promise (hero) -->
    <section class="section"><div class="wrap narrow">
      <div class="reveal">
        <span class="eyebrow">${C.hero.kicker}</span>
        <h1 class="section-title prep__title">${C.hero.titleBefore}<span class="mark">${C.hero.titleMark}</span>${C.hero.titleAfter}</h1>
        <p class="section-lead">${C.hero.body}</p>
      </div>
    </div></section>

    <!-- 2 — By the end of today (three parts) -->
    <section class="section section--alt"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.end.kicker}</span>
        <h2 class="section-title">${C.end.title}</h2>
        <p class="section-lead">${C.end.subtitle}</p>
      </div>
      <div class="grid grid--3" style="margin-top:2rem">
        <div class="card reveal">
          <div class="card__ico">${I.users}</div>
          <span class="card__kicker">${C.end.team.kicker}</span>
          <h3>${C.end.team.title}</h3>
          <ul class="teammates">
            ${C.end.team.teammates.map((m) => `
              <li><span class="teammates__name">${m.name}</span> <span class="teammates__charter">${m.charter}</span><p>${m.body}</p></li>`).join("")}
          </ul>
        </div>
        <div class="card reveal">
          <div class="card__ico">${I.box}</div>
          <span class="card__kicker">${C.end.foundation.kicker}</span>
          <h3>${C.end.foundation.title}</h3>
          <p>${C.end.foundation.body}</p>
        </div>
        <div class="card card--feature reveal">
          <div class="card__ico">${I.repeat}</div>
          <span class="card__tag">${C.end.home.tag}</span>
          <h3>${C.end.home.title}</h3>
          <p>${C.end.home.body}</p>
        </div>
      </div>
    </div></section>

    <!-- 3 — Technical overview (mental model + funnel) -->
    <section class="section"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.technical.kicker}</span>
        <h2 class="section-title">${C.technical.title}</h2>
        <p class="section-lead">${C.technical.subtitle}</p>
      </div>
      <div class="tech" style="margin-top:2rem">
        <ol class="stage-list reveal">
          ${C.technical.stages.map((s, i) => `
            <li class="stage"><span class="stage__num">${i + 1}</span><div><h3>${s.title}</h3><p>${s.body}</p></div></li>`).join("")}
        </ol>
        <div class="tech__figure reveal">${focusFunnel(C.technical.funnelTiers, C.technical.funnelPoint, lang)}</div>
      </div>
      <p class="tech__closing reveal">${C.technical.closing}</p>
    </div></section>

    <!-- 4 — Choosing your stack (two tools) -->
    <section class="section section--alt"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.tools.kicker}</span>
        <h2 class="section-title">${C.tools.title}</h2>
        <p class="section-lead">${C.tools.subtitle}</p>
      </div>
      <div class="grid grid--2" style="margin-top:2rem">
        ${C.tools.options.map((o) => `
          <div class="card ${o.featured ? "card--feature" : ""} reveal">
            <div class="card__ico">${I[o.icon] || I.box}</div>
            <span class="card__kicker">${o.kicker}</span>
            <h3>${o.title}</h3>
            <p class="tool__lede">${o.lede}</p>
            <ul class="tool__benefits">
              ${o.benefits.map((b) => `<li><span class="tool__dot" aria-hidden="true"></span><span>${b}</span></li>`).join("")}
            </ul>
            <div class="tool__note">
              <span class="tool__notelabel">${o.noteLabel}</span>
              <p>${o.note}</p>
            </div>
          </div>`).join("")}
      </div>
      <p class="tech__closing reveal">${C.tools.closing}</p>
    </div></section>

    <!-- 5 — The plan (numbered steps with copyable prompt cards) -->
    <section class="section"><div class="wrap narrow">
      <div class="reveal">
        <span class="eyebrow">${C.plan.kicker}</span>
        <h2 class="section-title">${C.plan.title}</h2>
        <p class="section-lead">${C.plan.subtitle}</p>
      </div>
      <div class="plan" style="margin-top:2rem">
        ${C.plan.steps.map((s, i) => planStep(s, i === 0)).join("")}
      </div>
      <p class="tech__closing reveal">${C.plan.closing}</p>
    </div></section>

    <!-- Help + WhatsApp (site copy - bilingual, inherits the main dir) -->
    <section class="section section--alt"><div class="wrap narrow">
      <div class="reveal">
        <h2 class="prep__h">${t.prep_help_title}</h2>
        <p class="section-lead" style="margin-top:.5rem">${t.prep_help_body}</p>
        <div class="cta-row" style="margin-top:1.25rem">
          <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
        </div>
      </div>
    </div></section>
  </main>

  ${studentModal(t)}
  ${siteFooter(t)}`;

  afterRender();
}

/* ---- Legal pages (Privacy / Terms) — shared template --------------------- */
function renderLegal(lang, kind) {
  const t = I18N[lang];
  const isP = kind === "privacy";
  const title = isP ? t.privacy_title : t.terms_title;
  const intro = isP ? t.privacy_intro : t.terms_intro;
  const items = isP ? t.privacy_items : t.terms_items;
  const updated = isP ? t.privacy_updated : t.terms_updated;
  const eyebrow = isP ? t.footer_privacy : t.footer_terms;

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang)}

  <main id="top" class="page">
    <section class="section"><div class="wrap narrow">
      <div class="reveal">
        <span class="eyebrow">${eyebrow}</span>
        <h1 class="section-title">${title}</h1>
        <p class="section-lead">${intro}</p>
      </div>
      <div class="legal reveal">
        ${items.map((x) => `<section class="legal__item"><h2>${x.t}</h2><p>${x.b}</p></section>`).join("")}
      </div>
      <p class="legal__updated reveal">${updated}</p>
    </div></section>
  </main>

  ${studentModal(t)}
  ${siteFooter(t)}`;

  afterRender();
}

/* ---- Mobile nav tray (hamburger) ---------------------------------------- */
function wireNav() {
  const burger = document.querySelector("[data-nav-toggle]");
  const menu = document.getElementById("navMenu");
  if (!burger || !menu) return;
  const setOpen = (o) => {
    menu.classList.toggle("is-open", o);
    burger.setAttribute("aria-expanded", o ? "true" : "false");
  };
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains("is-open"));
  });
  // selecting student closes the tray (language switch re-renders, closing it)
  menu.querySelectorAll("[data-student-open]").forEach((b) =>
    b.addEventListener("click", () => setOpen(false)));
  // close on outside click / Escape
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("is-open") && !menu.contains(e.target) && !burger.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---- Copyable prompt cards (gated vault) --------------------------------- */
/* Each Copy button copies the raw prompt text from window.WORKSHOP_CONTENT
   (the single source of truth), shows a 2s "Copied" confirmation, then resets.
   Reads from the data model, not the DOM, so whitespace is preserved exactly. */
function wirePrompts() {
  const src = (window.WORKSHOP_CONTENT && window.WORKSHOP_CONTENT.prompts) || {};
  document.querySelectorAll("[data-copy-key]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = src[btn.getAttribute("data-copy-key")] || "";
      const label = btn.querySelector(".prompt__copy-label");
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add("is-copied");
        if (label) label.textContent = "Copied";
        setTimeout(() => {
          btn.classList.remove("is-copied");
          if (label) label.textContent = "Copy";
        }, 2000);
      } catch (e) {
        /* clipboard blocked (e.g. non-secure context) — no-op */
      }
    });
  });
}

/* ---- Account menu (student-area avatar dropdown) ------------------------- */
/* Only present on the #/prep header variant. The avatar toggles a small menu
   whose single item is Sign out (wired separately via [data-signout]). Closes
   on outside-click and Escape; keeps aria-expanded in sync. */
function wireAccountMenu() {
  const wrap = document.querySelector("[data-account]");
  if (!wrap) return;
  const btn = wrap.querySelector("[data-account-toggle]");
  const menu = wrap.querySelector("[data-account-menu]");
  if (!btn || !menu) return;
  const setOpen = (o) => {
    menu.hidden = !o;
    wrap.classList.toggle("is-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
  };
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); }
  });
}

/* ---- Sign out ------------------------------------------------------------ */
/* When pl_auth is set, the nav student button becomes a sign-out action.
   Clicking clears pl_auth and returns to the main page. If already on home
   (no hashchange to trigger), we re-render manually so the nav flips back to
   the entrance label; otherwise navigating to #/ re-renders via hashchange. */
function wireSignout() {
  document.querySelectorAll("[data-signout]").forEach((b) =>
    b.addEventListener("click", () => {
      try { sessionStorage.removeItem("pl_auth"); } catch (e) {}
      const lang = document.documentElement.lang || "he";
      if (location.hash === "#/" || location.hash === "") route(lang);
      else location.hash = "#/";
    }));
}

/* Post-render wiring shared by every page. */
function afterRender() {
  wireLang();
  wireReveal();
  wireHeroImage();
  wireStudent();
  wireNav();
  wireAccountMenu();
  wireSignout();
  wirePrompts();
}

/* ---- Router — hash routes: #/prep, #/privacy, #/terms, else home ---------- */
function currentRoute() {
  const h = (location.hash || "").replace(/^#\/?/, "");
  if (h === "prep") return "prep";
  if (h === "privacy") return "privacy";
  if (h === "terms") return "terms";
  return "home";
}
function route(lang) {
  const r = currentRoute();
  if (r === "prep") renderPrep(lang);
  else if (r === "privacy") renderLegal(lang, "privacy");
  else if (r === "terms") renderLegal(lang, "terms");
  else render(lang);
}

/* ---- Student sign-in (cohort gate) --------------------------------------- */
/* Submit runs the isolated authenticate() check. On success we store the
   pl_auth token (the prep-page guard flag) and route to #/prep. On failure we
   reveal the note. If a gated redirect asked for it, auto-open on render. */
function wireStudent() {
  const modal = document.querySelector("[data-student-modal]");
  if (!modal) return;
  const open = () => { modal.hidden = false; document.body.classList.add("modal-open"); };
  const close = () => { modal.hidden = true; document.body.classList.remove("modal-open"); };
  document.querySelectorAll("[data-student-open]").forEach((b) => b.addEventListener("click", open));
  modal.querySelectorAll("[data-student-close]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  const form = modal.querySelector("[data-student-form]");
  const note = form && form.querySelector("[data-student-note]");
  const pass = form && form.querySelector('[name="password"]');
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (note) note.hidden = true;
    const { ok, token } = await authenticate({ password: pass ? pass.value : "" });
    if (ok) {
      try { sessionStorage.setItem("pl_auth", token); } catch (er) {}
      close();
      location.hash = "#/prep";
    } else if (note) {
      note.hidden = false;
    }
  });

  if (pendingStudentOpen) { pendingStudentOpen = false; open(); }
}

/* ---- Language ------------------------------------------------------------ */
function setLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "he" ? "rtl" : "ltr";
  try { localStorage.setItem("pl_lang", lang); } catch (e) {}
  route(lang);
}
function wireLang() {
  const lt = document.querySelector("[data-toggle-lang]");
  if (lt) lt.addEventListener("click", () =>
    setLang(document.documentElement.lang === "he" ? "en" : "he")
  );
}

/* ---- Hero image fade-in -------------------------------------------------- */
/* The onload handler covers a fresh load; this catches the cached case, where
   the image is already complete before the handler is attached. The LQIP blur
   sits behind until .is-loaded fades the sharp image in (see styles.css). */
function wireHeroImage() {
  document.querySelectorAll(".hero__img").forEach((img) => {
    if (img.complete && img.naturalWidth > 0) img.classList.add("is-loaded");
  });
}

/* ---- Reveal on scroll ---------------------------------------------------- */
function wireReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
}

/* ---- Boot ---------------------------------------------------------------- */
// Re-render on hash route changes, scrolling to top on navigation.
window.addEventListener("hashchange", () => {
  route(document.documentElement.lang || "he");
  window.scrollTo(0, 0);
});
(function () {
  let lang = "he";
  try { lang = localStorage.getItem("pl_lang") || "he"; } catch (e) {}
  setLang(lang);
})();

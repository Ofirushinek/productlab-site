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
};

/* ---- COPY (final, Copywriter 2026-08-03) -------------------------------- */
const I18N = {
  he: {
    cta_wa: "דברו איתי",
    nav_student: "כניסת תלמידים",
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
    who_for_title: "מתאים ל",
    who_tiles: [
      { t: "מעצבי מוצר", b: "מעצבים שמרגישים שהם מאבדים אחיזה במשחק ה-AI ורוצים להיות צעד קדימה, עם הכלים והבסיס להמשיך משם. גם מובילי עיצוב, וגם המעצב היחיד שהוא כל צוות העיצוב." },
      { t: "בונים ויזמים", b: "כל מי שרוצה לבנות משהו, אבל מרגישים שחסר להם הבסיס, עם מי להתייעץ, ואיך לנהל את זה בצורה בת-קיימא." },
      { t: "מרחיבי אופקים", b: "כל מי שרוצה להוציא את המרב ממה ש-AI מציע היום. לנהל עסק עצמאי, לאטמט משימות, או לצמצם עבודה ידנית שחוזרת על עצמה." },
    ],
    who_not: "מתאים פחות למי שמחפש כפתור קסם. אם בא לך להפשיל שרוולים ולבנות בעצמך, יש לך מקום סביב השולחן.",

    agenda_eyebrow: "שלוש שעות",
    agenda_title: "שלוש שעות, מהתחלה עד הסוף",
    agenda_phases: [
      { time: "30 דקות", t: "להבין את השטח", b: "מה בונים, למה דווקא הכלים האלה, ואיפה הטכנולוגיה עומדת בדיוק עכשיו." },
      { time: "כ-90 דקות", t: "להקים את הצוות", b: "מרימים את צוות ה-AI שלך מפרומפטים מוכנים, מחוברים לזיכרון משותף." },
      { time: "כ-60 דקות", t: "לבנות תוצר אמיתי", b: "מפעילים את הצוות ומוציאים לפועל תוצר אחד, ביחד." },
    ],
    agenda_toggle: "מה יש בפנים",
    agenda_p1_items: [
      { t: "מבט־על טכנולוגי", b: "מה השתנה השנה, ולמה לבנות עם סוכנים זה כבר אמיתי." },
      { t: "כלי vibe-coding מול Claude, ChatGPT ו-Gemini", b: "למה כל אחד טוב, ולמה אנחנו בונים על Claude." },
      { t: "AI חכם יותר דווקא כשממקדים אותו", b: "קודם תפקיד, אחר כך כישורים וכלים, ואז זיכרון." },
      { t: "המוח המשותף (Obsidian)", b: "צוות שנשאר מסונכרן ומתחדד ככל שעובדים." },
      { t: "המפה לשעתיים וחצי הקרובות", b: "איך שאר המפגש מתנהל." },
    ],
    agenda_p2_items: [
      { t: "מקימים את סביבת העבודה", b: "Claude, מחובר למוח המשותף שלכם." },
      { t: "בונים את הסוכן הראשון: ה-CTO", b: "מתחילים מפרומפט מוכן: תפקיד, כישורים, כלים." },
      { t: "מוסיפים CPO ומעצב מוצר", b: "צוות שמחליט מה לבנות, וגם דואג שזה ייראה נכון." },
      { t: "מחברים אותם למוח המשותף", b: "זיכרון אחד, ששום דבר לא ילך לאיבוד ביניהם." },
      { t: "עושים את זה שלכם", b: "משנים תפקיד, מוסיפים כישור, מקימים סוכן חדש." },
    ],
    agenda_p3_items: [
      { t: "נותנים בריף", b: "אומרים ל-CPO מה אתם רוצים לבנות, והוא מתעדף, מנהל ומתזמר את העבודה, כמו מנהל מוצר." },
      { t: "רואים את הצוות עובד", b: "המעצב מתייעץ עם ה-CPO וה-CTO, התזמור בזמן אמת." },
      { t: "בונים את העמוד שלכם", b: "רעיון המוצר שלכם, בתצוגה מקדימה." },
      { t: "מעכשיו אתם עצמאיים", b: "צוות להתייעץ איתו מתי שבא לכם, ואני כאן גם. לכו תבנו." },
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

    ofir_eyebrow: "למה שיחה איתי",
    roster_title: "אני והחבר׳ה",
    lead_label: "מוביל הסדנה",
    crew_label: "צוות סוכני ה-AI שמלווה אותך",
    ofir_name: "אופיר רושינק",
    ofir_role: "ראש הצוות",
    agents: [
      { img: "agent-cto", role: "CTO", b: "אחראי על הבסיס הטכני, ולוקח רעיון גולמי והופך אותו למשהו שבאמת רץ." },
      { img: "agent-cpo", role: "CPO", b: "אחראי על המוצר, ומחליט מה שווה לבנות וממה לוותר." },
      { img: "agent-pd", role: "מעצב מוצר", b: "אחראי על הקראפט, וגורם לכל החלטה להיראות ולהרגיש נכון עד הפרט האחרון." },
    ],
    ofir_bio: "אני אופיר. שתים עשרה שנה בעיצוב מוצר, רובן בהובלת צוותי עיצוב שהקמתי מאפס, בסייבר, בשירות שטח, במדיה ועוד. בזמן האחרון אני בונה עם צוותי AI כל יום, וככה בניתי את Glimps, מוצר חי, וגם את האתר הזה ואת הסדנה שלפניכם. כשנדבר, לא תקבלו תיאוריה, אלא איך אני עובד באמת היום.",
    ofir_why: "המפגש בהזמנה בלבד וקטן בכוונה. לפני שמצטרפים, אני רוצה שנדבר. מה אתם בונים, ואם זה מתאים לכם. בלי פיץ'. שלחו לי הודעה ונדבר.",

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
    final_title: "בואו תבנו משהו אמיתי.",
    final_sub: "אחר צהריים אחד, קבוצה קטנה, וצוות משלכם שבונה אותו איתכם ונשאר שלכם גם אחרי. הצעד הראשון הוא שיחה איתי.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "אזור התלמידים",
    login_title: "כניסת תלמידים",
    login_sub: "כניסה לאזור התלמידים עם הפרטים שקיבלת.",
    login_email_label: "אימייל",
    login_email_ph: "you@email.com",
    login_pass_label: "סיסמה",
    login_pass_ph: "הסיסמה שלך",
    login_submit: "כניסה",
    login_soon: "הפרטים לא תואמים. אם אתם משתתפים ולא מצליחים להיכנס, כתבו לי.",

    // ---- Student prep page (gated by pl_auth) — copy Copywriter 2026-08-05
    prep_page_title: "אזור התלמידים",
    prep_welcome_title: "אתם בפנים. ברוכים הבאים למחזור הראשון של Product Lab.",
    prep_welcome_body: "הדף הזה הוא נקודת הבית שלכם למפגש. כל מה שצריך נמצא כאן, והוא יתמלא ככל שהתאריך מתקרב.",
    prep_facts_title: "פרטי המפגש",
    prep_facts: [
      { l: "מתי", v: "יום ה׳, 3 בספטמבר, 17:30-20:30" },
      { l: "כמה זמן", v: "מפגש יחיד, שלוש שעות" },
      { l: "איפה", v: "אונליין בזום" },
      { l: "מי", v: "בהזמנה בלבד, קבוצה קטנה" },
    ],
    prep_setup_title: "מה להכין לפני שמתחילים",
    prep_setup: [
      { t: "לפטופ", b: "לפטופ, לא טלפון או טאבלט. אתם הולכים לבנות, וצריך מסך מלא ומקלדת." },
      { t: "חשבון Claude Pro", b: "חשבון Claude בתוכנית Pro (בערך 17$ לחודש). כדאי להקים אותו מראש. זה מה שמאפשר לסוכנים לרוץ חלק לאורך שלוש השעות. זה נדרש, וזה מהיר להקמה." },
      { t: "זום מותקן ובדוק", b: "התקינו את זום ובדקו שהוא עובד. הקישור למפגש יופיע בדף הזה לפני התאריך." },
      { t: "אינטרנט, שקט ואוזניות", b: "חיבור אינטרנט יציב, פינה שקטה, ואוזניות. שלוש שעות של בנייה מרוכזת עוברות טוב יותר בלי הפרעות." },
    ],
    prep_expect_title: "איך נראות שלוש השעות",
    prep_expect_lead: "נכנסים בלי כלום. יוצאים עם צוות AI עובד, ועם הדבר האמיתי הראשון שבניתם איתו.",
    prep_expect: [
      { time: "30 דקות", t: "להבין את השטח", b: "איפה הטכנולוגיה עומדת עכשיו, מה בונים, ולמה דווקא הכלים האלה." },
      { time: "כ-90 דקות", t: "להקים את צוות ה-AI שלכם", b: "מקימים צוות סוכנים משלכם, מכוון לעבוד בשיטה שלכם." },
      { time: "כ-60 דקות", t: "לבנות תוצר אמיתי ביחד", b: "מפעילים את הצוות ומוציאים לפועל דבר אמיתי אחד, בשידור חי." },
    ],
    prep_help_title: "שאלה, או תקועים?",
    prep_help_body: "תקועים בהכנות או שיש שאלה? כתבו לי בוואטסאפ. עדיף לסדר את זה עכשיו ולא ב-17:30 ביום המפגש.",
    prep_note: "הקישור לזום והחומרים יופיעו בדף הזה קרוב לתאריך. תבדקו כאן שוב לפני שמתחילים.",

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
    who_for_title: "Who this is for",
    who_tiles: [
      { t: "Product designers", b: "Designers who feel they're losing their grip on the AI game and want to be a step ahead, with the tools and the base to take it from there. Design leaders too, and the solo designer who is the whole design team." },
      { t: "Builders & founders", b: "Anyone who wants to build something but feels they lack the base, someone to consult with, and a sustainable way to manage it." },
      { t: "The AI-curious", b: "Anyone who wants to get the most out of what AI offers now. Run your own business, automate specific tasks, or cut the manual work you still do by hand." },
    ],
    who_not: "Less of a fit for anyone after a magic button. If you'd rather roll up your sleeves and build it yourself, there's a chair at the table.",

    agenda_eyebrow: "Three hours",
    agenda_title: "Three hours, start to finish",
    agenda_phases: [
      { time: "30 min", t: "The lay of the land", b: "What we are building, why these tools, and where the technology actually stands right now." },
      { time: "about 90 min", t: "Build your team", b: "Stand up your AI team from ready-made prompts, wired to a shared memory." },
      { time: "about 60 min", t: "Build a finished piece", b: "Put the team to work and ship one finished piece, together." },
    ],
    agenda_toggle: "What's inside",
    agenda_p1_items: [
      { t: "Technology overview", b: "What changed this year, and why building with agents is real now." },
      { t: "Vibe-coding tools vs. Claude, ChatGPT, or Gemini", b: "What each is good for, and why we build on Claude." },
      { t: "Make an AI smarter by narrowing it", b: "A role first, then skills and tools, then memory." },
      { t: "The shared brain (Obsidian)", b: "A team that stays in sync and gets sharper as you work." },
      { t: "The map of the next 2.5 hours", b: "How the rest of the session runs." },
    ],
    agenda_p2_items: [
      { t: "Set up your workspace", b: "Claude, connected to your shared brain." },
      { t: "Build your first agent: the CTO", b: "Start from a ready-made prompt: role, skills, tools." },
      { t: "Add the CPO and Product Designer", b: "A team that decides what to build, and makes it look right." },
      { t: "Wire them to the shared brain", b: "One memory, so nothing gets lost between them." },
      { t: "Make it yours", b: "Adjust a role, add a skill, spin up a new agent." },
    ],
    agenda_p3_items: [
      { t: "Brief it", b: "Tell your CPO what you want to build, and it prioritizes, manages, and orchestrates the work, like a product manager." },
      { t: "Watch the team work", b: "The designer consults the CPO and CTO, the orchestration in real time." },
      { t: "Build your one-pager", b: "Your own product idea, live in preview." },
      { t: "You're independent now", b: "A team to consult whenever, and I'm here too. Go build." },
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

    ofir_eyebrow: "Why a call with me",
    roster_title: "Me, and the team I built",
    lead_label: "Leads the workshop",
    crew_label: "The AI crew that comes with you",
    ofir_name: "Ofir Rushinek",
    ofir_role: "The operator",
    agents: [
      { img: "agent-cto", role: "CTO", b: "Owns the technical foundation, and turns a rough idea into something that actually runs." },
      { img: "agent-cpo", role: "CPO", b: "Owns the product calls, and decides what's worth building and what to cut." },
      { img: "agent-pd", role: "Product Designer", b: "Owns the craft, and makes every decision look and feel right down to the last detail." },
    ],
    ofir_bio: "I'm Ofir. Twelve years in product design, most of them leading design teams I built from scratch, across cyber, field service, media and more. Lately I build with AI teams every day, and that's how I built Glimps, a live product, and this very site and the workshop you're looking at. When we talk, you won't get theory, you'll get how I actually work now.",
    ofir_why: "This is invite-only and small on purpose. Before you join, I want a real conversation. What you are working on, and whether this is a fit. No pitch. Message me and we will talk.",

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
    final_title: "Come build something real.",
    final_sub: "One afternoon, a small group, and a team of your own that builds it with you, and stays yours long after. The first step is a call with me.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "Student area",
    login_title: "Student sign in",
    login_sub: "Sign in to the student area with the details you received.",
    login_email_label: "Email",
    login_email_ph: "you@email.com",
    login_pass_label: "Password",
    login_pass_ph: "Your password",
    login_submit: "Sign in",
    login_soon: "Those details don't match an account. If you're a participant and can't get in, message me.",

    // ---- Student prep page (gated by pl_auth) — copy Copywriter 2026-08-05
    prep_page_title: "Student area",
    prep_welcome_title: "You're in. Welcome to cohort #1 of Product Lab.",
    prep_welcome_body: "This page is your home base for the session. Everything you need is here, and it fills in as the date gets closer.",
    prep_facts_title: "Session details",
    prep_facts: [
      { l: "When", v: "Thursday, 3 September, 17:30-20:30" },
      { l: "How long", v: "One session, three hours" },
      { l: "Where", v: "Online, over Zoom" },
      { l: "Who", v: "Invite-only, a small group" },
    ],
    prep_setup_title: "Set this up before we start",
    prep_setup: [
      { t: "A laptop", b: "A laptop, not a phone or tablet. You'll be building, and you need the full screen and keyboard." },
      { t: "A Claude Pro account", b: "A Claude account on the Pro plan (about $17/mo). Set it up in advance. It's what lets the agents run smoothly across the three hours. It's required, and it's quick to set up." },
      { t: "Zoom installed and tested", b: "Install Zoom and check it works. The session link will appear on this page before the date." },
      { t: "Internet, quiet, headphones", b: "A stable internet connection, a quiet space, and headphones. Three hours of focused building go better without interruptions." },
    ],
    prep_expect_title: "What the three hours look like",
    prep_expect_lead: "You come in with nothing. You leave with a working AI team, and the first real thing you built with it.",
    prep_expect: [
      { time: "30 min", t: "Understand the field", b: "Where the technology stands now, what we're building, and why these tools." },
      { time: "about 90 min", t: "Build your AI team", b: "Stand up your own team of agents, set up to work the way you do." },
      { time: "about 60 min", t: "Build one real thing together", b: "Put the team to work and ship one real thing, live." },
    ],
    prep_help_title: "Questions, or stuck?",
    prep_help_body: "Stuck on the setup, or have a question? Message me on WhatsApp. Better to sort it now than at 17:30 on the day.",
    prep_note: "The Zoom link and any materials will show up on this page closer to the date. Check back here before we start.",

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
const navHeader = (t, lang) => `
  <header class="nav"><div class="wrap nav__in">
    <!-- MOBILE layout: WhatsApp left · wordmark center · hamburger right.
         The hamburger opens .nav__menu as a tray below (language + student). -->
    <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
    <div class="nav__menu" id="navMenu">
      <button class="langtoggle" data-toggle-lang aria-label="Switch language"><span class="lang-full">${lang === "he" ? "English" : "עברית"}</span><span class="lang-short">${lang === "he" ? "EN" : "עב"}</span></button>
      <!-- Student entrance: opens the sign-in modal (cohort gate). Text-only, no icon. -->
      <button class="btn btn--ghost btn--sm nav__student" type="button" data-student-open aria-label="${t.nav_student}"><span class="btn__label">${t.nav_student}</span></button>
    </div>
    <a class="btn btn--wa-solid btn--sm nav__book" href="${WA_URL}" target="_blank" rel="noopener" aria-label="${t.cta_wa}">${I.wa}<span class="btn__label">${t.cta_wa}</span></a>
    <button class="nav__burger" type="button" data-nav-toggle aria-label="${lang === "he" ? "תפריט" : "Menu"}" aria-expanded="false" aria-controls="navMenu">${I.menu}</button>
  </div></header>`;

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
        <div class="field" hidden>
          <label class="field__label" for="student-email">${t.login_email_label}</label>
          <input class="input" id="student-email" name="email" type="email" dir="ltr" placeholder="${t.login_email_ph}" autocomplete="email" />
        </div>
        <div class="field">
          <label class="field__label" for="student-pass">${t.login_pass_label}</label>
          <input class="input" id="student-pass" name="password" type="password" placeholder="${t.login_pass_ph}" autocomplete="current-password" />
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
        <source media="(max-width: 760px)" srcset="assets/hero-mobile-2.png?v=3" />
        <img src="assets/hero-even-2.png?v=7" alt="" />
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
          <p>${t.ofir_bio}</p><p>${t.ofir_why}</p>
        </div>
      </div>
      <div class="team__crew">
        <div class="team__crewhead">${t.crew_label}</div>
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
   authenticate() sets pl_auth on success; this page only reads it. */
function renderPrep(lang) {
  const t = I18N[lang];
  let authed = false;
  try { authed = !!sessionStorage.getItem("pl_auth"); } catch (e) {}
  if (!authed) { pendingStudentOpen = true; location.hash = "#/"; return; }

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang)}

  <main id="top" class="page">
    <section class="section"><div class="wrap narrow">
      <div class="reveal">
        <span class="eyebrow">${t.prep_page_title}</span>
        <h1 class="section-title prep__title">${t.prep_welcome_title}</h1>
        <p class="section-lead">${t.prep_welcome_body}</p>
      </div>

      <!-- Session facts -->
      <div class="reveal" style="margin-top:2.75rem">
        <h2 class="prep__h">${t.prep_facts_title}</h2>
        <dl class="facts">
          ${t.prep_facts.map((f) => `<div class="facts__row"><dt>${f.l}</dt><dd>${f.v}</dd></div>`).join("")}
        </dl>
      </div>

      <!-- Setup checklist -->
      <div class="reveal" style="margin-top:2.75rem">
        <h2 class="prep__h">${t.prep_setup_title}</h2>
        <ol class="prep-steps">
          ${t.prep_setup.map((s, i) => `
            <li class="prep-step">
              <span class="prep-step__num">${i + 1}</span>
              <div><h3>${s.t}</h3><p>${s.b}</p></div>
            </li>`).join("")}
        </ol>
      </div>

      <!-- What the three hours look like -->
      <div class="reveal" style="margin-top:2.75rem">
        <h2 class="prep__h">${t.prep_expect_title}</h2>
        <p class="section-lead" style="margin-top:.5rem">${t.prep_expect_lead}</p>
        <div class="agenda" style="margin-top:1.5rem">
          ${t.prep_expect.map((p) => `
            <div class="phase">
              <span class="phase__time">${p.time}</span>
              <div><h3>${p.t}</h3><p>${p.b}</p></div>
            </div>`).join("")}
        </div>
      </div>

      <!-- Help + WhatsApp -->
      <div class="reveal" style="margin-top:2.75rem">
        <h2 class="prep__h">${t.prep_help_title}</h2>
        <p class="section-lead" style="margin-top:.5rem">${t.prep_help_body}</p>
        <div class="cta-row" style="margin-top:1.25rem">
          <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
        </div>
      </div>

      <p class="prep-note reveal" style="margin-top:2.25rem">${I.info}<span>${t.prep_note}</span></p>
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

/* Post-render wiring shared by every page. */
function afterRender() {
  wireLang();
  wireReveal();
  wireStudent();
  wireNav();
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

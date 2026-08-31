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
// Same relative target the gated #/prep kit tile already links to (content.js
// EN + HE, both `href: "assets/product-lab.zip", download: true`). #/kit
// (public, ungated) reuses the identical URL so there is exactly one zip
// target on the whole site, not a second one that can drift from the first.
const KIT_ZIP_URL = "assets/product-lab.zip";

// When a gated redirect bounces a signed-out visitor home, this asks wireStudent
// to auto-open the sign-in modal on the next render.
let pendingStudentOpen = false;

/* ---- Real auth: Supabase (Google sign-in) + Row-Level Security ----------- *
   The old client-side SHA-256 cohort gate is retired. Sign-in is now real
   Google OAuth via Supabase; the database (RLS) is the actual gate, not the UI.
   The anon key is a PUBLIC identifier and is safe to ship in this static file:
   what a browser can read/write is decided by RLS, not by hiding this string.
   NEVER put the service_role key or the DB password here.                     */
const SUPABASE_URL = "https://qyeacmmfrbqimjpbgcal.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZWFjbW1mcmJxaW1qcGJnY2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NDczNjQsImV4cCI6MjEwMjAyMzM2NH0.WNLCixQe1XRnzddtjDtcWks4BnSVbIYZHStBiDBX8ho";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* Admin is gated by EMAIL — the same forge-proof gate RLS uses (it reads the
   signed JWT email), so the UI and the data gate always agree. This is NOT a
   security boundary (that's RLS); it only decides what the UI paints. The
   profile.role column ('superadmin') is future-proofing, not the gate. */
const ADMIN_EMAILS = ["ofr.rsnk@gmail.com"];

/* Local dev flag. Google OAuth can't return to localhost (its redirect is locked
   to productlab.studio), so on localhost we use a fake, Google-free sign-in for
   testing. This is INERT in production (hostname is never localhost there), where
   real Google OAuth + Supabase RLS are the only gate — so it's safe to ship. */
const IS_LOCAL = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const LOCAL_TIER_KEY = "pl_local_tier";

/* AUTH is the single source of truth for "who am I" this render.
   Access is INVITE-ONLY. After sign-in the DB function my_access() returns the
   tier; the client never computes it. AUTH.tier is one of:
   - 'admin'   = signed-in email is the admin (Ofir) → full content + users mgmt
   - 'student' = email is on the allowlist AND confirmed → full content vault
   - null      = signed out OR bounced (denied). When bounced, AUTH.denied=true
                 so the home page can show the "not registered" notice.
   The real wall is Supabase RLS (is_approved()); this only decides what to paint. */
let AUTH = { user: null, tier: null, denied: false };
// Sticky one-shot: a denied sign-in sets this true so the "not registered"
// notice survives the sign-out-triggered re-render (which resets AUTH.denied).
// wireNotices() shows it once, then clears it.
let deniedNotice = false;

/* Resolve the live session into AUTH via the my_access() RPC. Called before the
   first paint and again on every auth-state change (sign-in/out). A 'denied'
   result signs the user out and flags AUTH.denied for the notice. */
async function loadAuth() {
  // Local dev: fake, Google-free auth. Tier comes from ?tier=admin|student|denied
  // or, after you "sign in" via the modal, from localStorage. NO tier = signed
  // OUT, so the sign-in modal itself is reachable to review. Inert in production.
  if (IS_LOCAL) {
    const raw = new URLSearchParams(location.search).get("tier") || localStorage.getItem(LOCAL_TIER_KEY);
    if (raw === "denied") { AUTH = { user: null, tier: null, denied: true }; return AUTH; }
    AUTH = raw
      ? { user: { id: "local", email: ADMIN_EMAILS[0] }, tier: raw, denied: false }
      : { user: null, tier: null, denied: false };
    return AUTH;
  }
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { AUTH = { user: null, tier: null, denied: false }; return AUTH; }
    // One question to the database: "what may I see?" → admin | student | denied.
    const { data: tier, error } = await sb.rpc("my_access");
    if (error || tier === "denied") {
      deniedNotice = true;                  // sticky: outlives the sign-out re-render
      await sb.auth.signOut();              // global scope: clears + revokes the session
      AUTH = { user: null, tier: null, denied: true };
      return AUTH;                          // caller shows the "not registered" notice
    }
    AUTH = { user: session.user, tier, denied: false }; // 'student' | 'admin'
  } catch (e) {
    // On any failure, fall back to signed-out rather than leaking a wrong tier.
    AUTH = { user: null, tier: null, denied: false };
  }
  return AUTH;
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
  // Google "G" - brand colors are intentional (not tokenized: this is a third-party logo).
  google: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.74Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.28a12 12 0 0 0 0 10.75l3.99-3.11Z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.28 6.63l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
};

/* ---- COPY (final, Copywriter 2026-08-03) -------------------------------- */
const I18N = {
  he: {
    cta_wa: "דברו איתי",
    nav_student: "כניסת תלמידים",
    nav_signout: "יציאה",
    nav_account: "התפריט שלך",
    hero_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    hero_title_a: "מרעיון למציאות. עולם חדש של עבודה עם ",
    hero_title_mark: "סוכני AI",
    hero_title_b: ".",
    hero_sub: "ב-3 שעות תקימו עם Claude צוות סוכני AI משלכם, ותתחילו לבנות איתו את המוצר הראשון שלכם. בזמן אמת.",
    hero_points: ["זיכרון משותף", "בלי קוד", "צוות שנשאר איתכם"],
    /* new one-view hero (2026-08-20): headline split into its two sentences,
       sub split into line units the design controls, register CTA */
    hero_t1: "מרעיון למציאות.",
    hero_t2a: "עולם חדש של עבודה עם ",
    hero_sub_lines: ["ב-3 שעות תקימו עם Claude צוות סוכני AI משלכם,", "ותתחילו לבנות איתו את המוצר הראשון שלכם.", "בזמן אמת."],
    hero_cta: "הרשמה למחזור הבא",
    session: {
      badge: "המפגש הנוכחי",
      when_label: "מתי?",
      when_value: ["יום ה׳, 3 בספטמבר", "17:30-20:30", "מפגש יחיד, 3 שעות"],
      where_label: "איפה?",
      where_value: ["אונליין בזום", "מכל מקום בעולם"],
      cta: "הרשמה",
      limited_note: "אזל",
    },
    // Cohort #2, added 2026-08-31 (date+price decided by Ofir/CMO, shared-brain
    // IN FLIGHT 2026-08-31 [cmo]). Same shape as `session` above + a price column,
    // rendered directly beneath it — the ONLY place price appears on the page.
    session2: {
      badge: "המחזור הבא",
      when_label: "מתי?",
      when_value: ["יום ה׳, 15 באוקטובר", "17:30-20:30", "מפגש יחיד, 3 שעות"],
      where_label: "איפה?",
      where_value: ["אונליין בזום", "מכל מקום בעולם"],
      price_label: "מחיר",
      price_value: ["₪600", "לאדם"],
      cta: "הרשמה",
      limited_note: "מקומות מוגבלים",
    },

    why_eyebrow: "למה עכשיו",
    why_heading: "אדם אחד, יותר מעבודה אחת.",
    why_tiles: [
      { t: "הכול עליך", b: "מוצר, עיצוב והוצאה לאוויר, הכול עובר דרכך. צוות סוכנים הוא הדרך שבה אדם אחד מכסה עבודה של כמה אנשים, בלי להעביר שום דבר הלאה." },
      { t: "מיומנות, לא טריק", b: "עובדים ישירות מול Claude, עם היתרונות והמגבלות על השולחן. יוצאים עם שיטה עובדת לתזמור צוות סוכנים על עבודת מוצר ועיצוב אמיתית, לא עוד פרומפטים גנריים." },
      { t: "יתרון ההתחלה", b: "עולם הסטארטאפים נע לכיוון של אנשים וסוכנים שבונים זה לצד זה. כדאי להתרגל לעבוד ככה עכשיו, כל עוד זה עדיין יתרון ולא ברירת המחדל של כולם." },
    ],

    walk_eyebrow: "מה לוקחים הביתה",
    walk_title: "עם מה יוצאים מפה",
    walk_items: [
      { t: "צוות סוכני AI אישי שבנית בעצמך", b: "תיצרו צוות סוכני AI שמותאם בדיוק לאופן שבו אתם עובדים, עם תפקידים ברורים וידע משותף." },
      { t: "זיכרון משותף שכל הצוות עובד ממנו", b: "כל הסוכנים עובדים מאותו מקור ידע, מכירים את הפרויקט ומשתפים ביניהם הקשר ומידע לאורך כל העבודה." },
      { t: "הפרויקט הראשון שכבר התחלתם לבנות", b: "כבר במהלך הסדנה תתחילו לעבוד עם הצוות שבניתם על הפרויקט שלכם, במקום לצאת רק עם ידע תיאורטי." },
      { t: "שיטת עבודה שתמשיך איתכם גם אחרי הסדנה", b: "תצאו עם צוות, זיכרון ותהליך עבודה שתוכלו להמשיך לפתח ולהשתמש בהם גם בפרויקטים הבאים." },
    ],

    who_eyebrow: "למי זה מתאים",
    who_for_title: "אם אתם רוצים לבנות בעצמכם, אבל לא לבד.",
    who_intro: "לא משנה אם אתם אנשי מוצר ועיצוב, יזמים, בוני מוצרים או אנשי מקצוע שרוצים לעבוד אחרת. אם אתם רוצים להפוך את ה-AI לשותף אמיתי בתהליך העבודה שלכם, אתם במקום הנכון.",
    who_tiles: [
      { t: "אנשי מוצר ועיצוב", b: "בין אם אתם מעצבי מוצר, מובילי עיצוב או מנהלי מוצר, הסדנה תראה לכם איך לעבוד עם צוות סוכני AI שמרחיב את היכולות שלכם ומשאיר אתכם להתמקד במה שאף כלי לא עושה: לחשוב, להחליט ולהוביל." },
      { t: "בונים ויזמים", b: "יש לכם רעיון, מוצר או עסק שאתם רוצים לבנות או לקדם. בסדנה תבנו צוות סוכני AI שחושב איתכם, מתכנן, מאתגר רעיונות ועוזר להפוך אותם למוצר אמיתי." },
      { t: "מרחיבי אופקים", b: "אם אתם מרגישים שהדרך שבה עובדים משתנה, ורוצים להבין איך באמת עובדים עם AI, לא רק לשאול שאלות אלא לבנות תהליך עבודה שלם, הסדנה הזו בשבילכם." },
    ],
    who_not: "מתאים פחות למי שמחפש כפתור קסם. אם בא לך להפשיל שרוולים ולבנות בעצמך, יש לך מקום סביב השולחן.",

    agenda_eyebrow: "שלושה שלבים",
    agenda_title: "שלוש שעות. בסוף הסדנה תצאו עם צוות סוכני AI שעובד איתכם.",
    agenda_intro: "בשלושה שלבים נבנה יחד את מערכת העבודה החדשה שלכם, מהיכרות עם השיטה, דרך הקמת צוות סוכני AI אישי ועד לבניית הפרויקט הראשון שלכם.",
    agenda_phases: [
      { time: "שלב ראשון", t: "מתחילים", b: "מבינים את שיטת העבודה, מכירים את הכלים שנשתמש בהם ומניחים את היסודות לצוות שנבנה בהמשך." },
      { time: "שלב שני", t: "מקימים את הצוות", b: "בונים את צוות סוכני ה-AI הראשון שלכם, מחברים אותו לזיכרון משותף ומתאימים אותו בדיוק לאופן שבו אתם עובדים." },
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
      { t: "בונים את הפרויקט הראשון", b: "הופכים את הרעיון שלכם לעמוד נחיתה עובד, יחד עם צוות סוכני ה-AI שבניתם." },
      { t: "ממשיכים גם אחרי הסדנה", b: "יוצאים עם צוות סוכני AI אישי שתוכלו להמשיך להתייעץ איתו, לבנות איתו ולהרחיב אותו גם אחרי שהמפגש מסתיים." },
    ],

    proof_eyebrow: "לא מצגת. מוצרים אמיתיים.",
    proof_title: "כל מה שאתם רואים כאן נבנה באותה הדרך.",
    proof_lead: "כל פרויקט בעמוד הזה נבנה בעזרת צוות סוכני AI, זיכרון משותף ותהליך העבודה שתלמדו בסדנה.",
    proof_self_tag: "הדף הזה",
    proof_self_t: "הדף הזה",
    proof_self_b: "את הדף הזה, ואת כל הסדנה, בניתי עם אותו סוג של צוות סוכני AI שתקימו בעצמכם.",
    proof_glimps_tag: "מוצר אמיתי",
    proof_glimps_t: "Glimps",
    proof_glimps_b: "מוצר אמיתי, שנבנה ככה. תראו בעצמכם.",
    proof_glimps_link: "לצפייה ב-Glimps",

    ofir_eyebrow: "מי תכירו בסדנה",
    roster_title: "אני, והצוות שאיתו אני בונה כל יום.",
    lead_label: "מוביל הסדנה",
    crew_label: "צוות סוכני ה-AI שלי",
    crew_title: "אלה השותפים שאיתם אני בונה כל מוצר.",
    crew_intro: "לכל אחד מהשותפים שלי יש תחום אחריות אחר. יחד הם עוזרים לי לחשוב, לקבל החלטות, לעצב ולבנות מוצרים. במהלך הסדנה תבנו גרסה משלכם לאותו צוות, שתותאם בדיוק לאופן שבו אתם עובדים.\n\nבסוף הסדנה, אלה כבר לא יהיו רק השותפים שלי. הם יהיו גם שלכם.",
    crew_close: "כשתצאו מכאן, יהיה גם לכם צוות כזה. וכבר לא תבנו לבד.",
    ofir_name: "אופיר רושינק",
    ofir_role: "ראש הצוות",
    agents: [
      { img: "crew-designer", tag: "המעצב", role: "מעצב המוצר", b: "כשמגיע הזמן לעצב, הוא השותף הראשון שלי. הוא עובד מתוך ה-Design System, שומר על עקביות, מציע פתרונות UX ומוודא שכל מסך ברור, שימושי ומוכן לבנייה." },
      { img: "crew-strategist", tag: "האסטרטג", role: "מנהל המוצר", b: "כשאני לא בטוח מה לבנות קודם, אני מתייעץ איתו. הוא עוזר לחדד רעיונות, לתעדף משימות, לאתגר הנחות יסוד ולשמור שכל החלטה מקדמת את המוצר בכיוון הנכון." },
      { img: "crew-architect", tag: "הארכיטקט", role: "המהנדס הראשי", b: "כשיש לי דילמה טכנית, אני מתחיל איתו. הוא עוזר לי לבחור את הגישה הנכונה, לחשוב על הארכיטקטורה ולוודא שכל פתרון שנבחר באמת ניתן למימוש, יציב ומוכן לגדול יחד עם המוצר." },
    ],
    ofir_bio: "במשך שנים בניתי מוצרים דיגיטליים והובלתי צוותי Product Design. אבל השינוי המשמעותי ביותר שעברתי לא היה תפקיד חדש, אלא דרך עבודה חדשה.\n\nהיום אני כבר לא בונה מוצרים לבד. אני עובד עם צוות סוכני AI שבניתי לעצמי - שותפים לחשיבה, לתכנון, לעיצוב ולבנייה. יחד בנינו את Product Lab, את Glimps, את האתר שאתם נמצאים בו עכשיו, ואפילו חלקים מהסדנה עצמה.",
    ofir_why: "עכשיו אני רוצה לעזור גם לכם לבנות לעצמכם צוות כזה.",

    quotes_eyebrow: "המלצות",
    quotes_title: "ממי שכבר עבר את זה",
    quotes: [
      { q: "יצאתי מצוידת עם אנשי צוות (agents) מקצועיים ברמה הכי גבוהה, הצלחתי ליצור תוצרים משלי ישר אחרי המפגש ולקבל אינפוט שלא הצלחתי לקבל לפני. ממליצה בחום.", n: "Ella Cohen", m: "Lead Product Designer", img: "testimonial-ella", li: "https://www.linkedin.com/in/ella-cohen-736698a8/" },
      { q: "אופיר לימד אותי לבנות ולנהל צוות של סוכני בינה מלאכותית (AI Agents) אוטונומיים, ללא צורך בכתיבת קוד. בעבודה משותפת הוא עזר לי לבנות בסיס עבודה מוצק לרעיון שליווה אותי הרבה זמן ולא הצלחתי להוציא לפועל, ומשם כבר יצאתי לדרך. ממליצה בחום למי שרוצה ללמוד איך באמת להשתמש ב-AI כדי לבנות דברים, לא רק לדבר עליהם.", n: "Rona Galezer", m: "Venture Builder & Impact Investor", img: "testimonial-rona", li: "https://www.linkedin.com/in/ronabenziongalezer/" },
    ],

    // "יום בחייו של בוגר Product Lab" — copy v5 (Copywriter, 2026-08-21).
    // 3 flowing paragraphs, rendered with tight paragraph spacing (NOT standalone lines).
    grad_kicker: "כמה חודשים אחרי הסדנה",
    grad_title: "יום בחייו של בוגר Product Lab.",
    grad_paras: [
      "בוקר. עולה לו רעיון, ויש לו לאן ללכת איתו. הוא כותב לצוות שניים-שלושה משפטים וממשיך ביום שלו.",
      "האסטרטג כבר מבין את ההקשר ומצרף את מי שצריך. המעצב נותן לו צורה בשפת העיצוב של המוצר. הקופירייטר מנסח אותו בקול שהמוצר כבר מדבר בו, והארכיטקט מסמן דרך לבנות אותו ממה שהמערכת באמת יודעת לעשות.",
      "כשהוא חוזר לשולחן מחכים לו כיוון ומשהו אמיתי להגיב עליו. עד הערב יש כבר גרסה ראשונה. והשאלה שהוא קם איתה בבוקר השתנתה. כבר לא איך לבנות. מה לבנות.",
    ],

    incl_eyebrow: "הפרטים",
    incl_title: "כל מה שצריך לדעת",
    // ONE unified accordion. `open:true` = logistics facts shown by default.
    detail_items: [
      { ico: "video",    q: "איפה ואיך זה מתנהל?", a: "מפגש חי בזום, בקבוצה קטנה, כדי שלכל אחד תהיה תשומת לב אישית." },
      { ico: "clock",    q: "כמה זמן זה לוקח?", a: "כשלוש שעות רצופות עם הפסקה אחת. מגיעים בלי צוות סוכני AI, יוצאים עם אחד." },
      { ico: "hand",     q: "אני בונה בעצמי או צופה?", a: "בונה לאורך כל הדרך, לא צופה מהצד. יוצאים עם משהו אמיתי שבנית בעצמך." },
      { ico: "laptop",   q: "צריך לדעת לתכנת?", a: "לא. אם יודעים לכתוב בריף ברור, אפשר לעשות את זה. בונים על Claude, בשפה רגילה, בלי קוד." },
      { ico: "box",      q: "מה צריך להביא?", a: "לפטופ, חשבון Claude, וחיבור אינטרנט יציב. כדאי גם פינה שקטה שבה תוכלו להתרכז. נגיד לכם מה עוד להכין לפני המפגש." },
      { ico: "spark",    q: "זה באמת מפגש אחד?", a: "כן. יוצאים עם צוות סוכני AI עובד ועם משהו אמיתי שבניתם. לאן לוקחים את זה משם, כבר תלוי בכם." },
      { ico: "users",    q: "זה לצוותים או ליחידים?", a: "לשניהם. אפשר לבוא לבד, או להביא כמה אנשים מהצוות." },
      { ico: "calendar", q: "ומה אם התאריך לא מתאים לי?", a: "נדבר על זה בשיחה. הקבוצות קטנות והמפגשים חוזרים על עצמם, אז נמצא מועד שמתאים לכם." },
    ],

    final_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    final_title: "בואו נבנה ביחד",
    final_sub: "אחר צהריים אחד, קבוצה קטנה, וצוות משלכם שבונה איתכם את הפרויקט הראשון שלכם, ונשאר שלכם גם אחרי. הצעד הראשון הוא שיחה איתי.",

    // Student area - real Google sign-in (Supabase). PLACEHOLDER HE copy 2026-08-11,
    // Copywriter to refine. The old access-code strings were retired with the gate.
    login_eyebrow: "אזור התלמידים",
    login_title: "כניסה לאזור התלמידים",
    login_sub: "האזור הזה נועד למשתתפי הסדנה. התחברו עם חשבון Google כדי להיכנס.",
    login_google: "המשך עם Google",
    login_register: "הרשמה",
    modal_close: "סגירה",
    // Denied sign-in notice (invite-only). PLACEHOLDER HE copy 2026-08-12, Copywriter to refine.
    denied_title: "עדיין אין לכם גישה",
    denied_body: "האזור הזה פתוח למשתתפי הסדנה שאושרו. נכנסתם עם Google אבל החשבון עדיין לא רשום. אם נרשמתם וזה לא עובד, דברו איתי ואפתח לכם גישה.",
    // Register-your-interest FORM (writes to register_lead). Copy from Copywriter 2026-08-13.
    reg_title: "לשמור מקום במפגש הקרוב",
    reg_sub: "המקומות מוגבלים והמפגשים בקבוצות קטנות. השאירו פרטים כדי לשמור מקום במפגש הקרוב, ואחזור אליכם באופן אישי עם כל מה שצריך לדעת.",
    reg_first_label: "שם פרטי",
    reg_last_label: "שם משפחה",
    reg_email_label: "אימייל",
    reg_email_ph: "you@email.com",
    reg_note_label: "משהו שתרצו לשתף (לא חובה)",
    reg_note_ph: "שורה עליכם, על מה שאתם בונים, או על מה שאתם מקווים לקבל מזה.",
    reg_submit: "לשמור מקום",
    reg_success: "אתם בפנים. אחזור אליכם באופן אישי עם כל הפרטים על המפגש הקרוב. נדבר בקרוב.",
    reg_error: "משהו לא נשלח. נסו שוב, או פשוט כתבו לי ישירות.",

    // Admin roster - visible only to admin. PLACEHOLDER HE copy 2026-08-12, Copywriter to refine.
    roster_kicker: "ניהול",
    admin_roster_title: "התלמידים שלי",
    roster_sub: "רשימת ההזמנות שלכם. הוסיפו אימייל, אשרו אותו כדי לפתוח גישה, וראו מי כבר נכנס.",
    roster_add_name_placeholder: "שם התלמיד",
    roster_add_placeholder: "אימייל (לא חובה)",
    roster_add_cta: "הוספת תלמיד",
    roster_add_hint: "אפשר להוסיף ליד עם שם בלבד; אימייל לא חובה. הוספה לא מאשרת גישה. אחרי ההוספה, לחצו \"אישור\" כדי לפתוח גישה.",
    roster_col_name: "שם",
    roster_col_email: "אימייל",
    roster_col_status: "סטטוס",
    roster_col_signedin: "נכנס?",
    roster_col_stage: "שלב",
    roster_col_source: "מקור",
    roster_col_next: "צעד הבא",
    roster_col_actions: "פעולות",
    roster_col_notes: "הערות",
    roster_col_phone: "טלפון",
    roster_pill_confirmed: "מאושר",
    roster_pill_pending: "ממתין",
    roster_pill_uninvited: "לא מוזמן",
    roster_signedin_no: "עדיין לא",
    roster_confirm: "אישור",
    roster_unconfirm: "ביטול אישור",
    roster_remove: "הסרה",
    roster_add_to_list: "הוספה לרשימה",
    roster_empty: "עדיין אין תלמידים. הוסיפו שם למעלה כדי להתחיל.",
    roster_loading: "טוען...",
    roster_details: "פרטים",
    roster_save: "שמירה",
    roster_saved: "נשמר",
    roster_save_err: "השמירה נכשלה",
    roster_source_ph: "מאיפה הגיע/ה (LinkedIn, WhatsApp, הפניה...)",
    roster_next_ph: "הצעד הבא (התקשרות מחר 12:00...)",
    roster_notes_ph: "מה נאמר בשיחה, הקשר, פרטים...",
    roster_phone_ph: "טלפון",
    // Notes log (append-only, one dated line per fact). PLACEHOLDER HE copy
    // 2026-08-23, Copywriter to refine.
    roster_note_add: "הוספה",
    roster_note_read: "הערכה",
    roster_note_legacy: "ללא תאריך",
    roster_note_empty: "אין עדיין רשומות.",
    stages: {
      invited: "הוזמן",
      interested: "מתעניין",
      call_booked: "נקבעה שיחה",
      confirmed: "אושר",
      attended: "השתתף",
      dropped: "לא רלוונטי",
    },
    // Student-area tab bar. PLACEHOLDER HE copy 2026-08-12, Copywriter to refine.
    tab_content: "תוכן הסדנה",
    tab_students: "תלמידים",

    // ---- Student prep page (gated by AUTH.tier). Teaching copy lives in
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

    // ---- #/kit — "here's your kit" landing page (branded, public, no auth).
    // Final copy, Copywriter pass 2026-08-31.
    kit_eyebrow: "ערכת הסדנה שלכם",
    kit_title: "מזל טוב, היא כאן!",
    kit_sub: "מורידים את הקובץ ומחלצים אותו (unzip). נתראה ביום חמישי, 3.9, בשעה 17:30.",
    kit_btn_download: "להוריד שוב",

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
    hero_title_a: "From idea to reality. A new world of working with ",
    hero_title_mark: "AI agents",
    hero_title_b: ".",
    hero_sub: "In 3 hours, create your own AI agent team with Claude, and start building your first product with it. Live.",
    hero_points: ["Shared memory", "No code", "A team that stays with you"],
    hero_t1: "From idea to reality.",
    hero_t2a: "A new world of working with ",
    hero_sub_lines: ["In 3 hours, set up your own AI agent team with Claude,", "and start building your first product with it.", "In real time."],
    hero_cta: "Register for the next cohort",
    session: {
      badge: "Current session",
      when_label: "When?",
      when_value: ["Thursday, 3 September", "17:30-20:30", "One session, 3 hours"],
      where_label: "Where?",
      where_value: ["Online, over Zoom", "From anywhere"],
      cta: "Sign up",
      limited_note: "Sold out",
    },
    // Cohort #2, added 2026-08-31 (date+price decided by Ofir/CMO). Same shape
    // as `session` above + a price column, rendered directly beneath it — the
    // ONLY place price appears on the page.
    session2: {
      badge: "Next cohort",
      when_label: "When?",
      when_value: ["Thursday, 15 October", "17:30-20:30", "One session, 3 hours"],
      where_label: "Where?",
      where_value: ["Online, over Zoom", "From anywhere"],
      price_label: "Price",
      price_value: ["₪600", "per person"],
      cta: "Sign up",
      limited_note: "Spots are limited",
    },

    why_eyebrow: "Why now",
    why_heading: "One person, more than one job.",
    why_tiles: [
      { t: "You own all of it", b: "Product, design, and shipping all run through you. An agent team is how one person covers the work of several, without handing any of it off." },
      { t: "A skill, not a trick", b: "You work with Claude directly, its strengths and limits named straight. You leave with a working method for orchestrating an agent team on real product and design work, not generic AI prompting." },
      { t: "Get the head start", b: "Startups are shifting to people and agents building side by side. Get fluent while it's still an edge, before it becomes the baseline everyone has." },
    ],

    walk_eyebrow: "What you take home",
    walk_title: "What you leave with",
    walk_items: [
      { t: "A personal team of AI agents you built yourself", b: "You'll create a team of AI agents tuned to exactly how you work, with clear roles and shared knowledge." },
      { t: "A shared memory the whole team works from", b: "Every agent works from the same source of knowledge, knows the project, and shares context and information across the entire process." },
      { t: "Your first project, already underway", b: "During the workshop itself you'll start working with the team you built on your own project, instead of leaving with only theory." },
      { t: "A way of working that stays with you after the workshop", b: "You'll leave with a team, a memory, and a workflow you can keep developing and using on your next projects too." },
    ],

    who_eyebrow: "Who it is for",
    who_for_title: "If you want to build on your own, but not alone.",
    who_intro: "It doesn't matter if you're in product and design, a founder, a product builder, or a professional who wants to work differently. If you want to make AI a real partner in the way you work, you're in the right place.",
    who_tiles: [
      { t: "Product and design people", b: "Whether you're a product designer, a design lead, or a product manager, the workshop shows you how to work with a team of AI agents that extends what you can do and frees you to focus on what no tool can: thinking, deciding, and leading." },
      { t: "Builders and founders", b: "You have an idea, a product, or a business you want to build or grow. In the workshop you'll build a team of AI agents that thinks with you, plans, challenges ideas, and helps turn them into a real product." },
      { t: "Horizon seekers", b: "If you feel the way we work is changing, and you want to understand how to really work with AI, not just ask it questions but build a whole way of working, this workshop is for you." },
    ],
    who_not: "Less of a fit for anyone after a magic button. If you'd rather roll up your sleeves and build it yourself, there's a chair at the table.",

    agenda_eyebrow: "Three stages",
    agenda_title: "Three hours. By the end you'll walk out with a team of AI agents that works with you.",
    agenda_intro: "In three stages we'll build your new way of working together, from learning the method, through setting up your own team of AI agents, to building your first project.",
    agenda_phases: [
      { time: "Stage one", t: "Getting started", b: "You'll understand the method, get to know the tools we'll use, and lay the foundations for the team you'll build next." },
      { time: "Stage two", t: "Building the team", b: "You'll build your first team of AI agents, connect it to a shared memory, and tune it to exactly how you work." },
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
      { t: "Build your first project", b: "Turn your idea into a working landing page, together with the team of AI agents you built." },
      { t: "Keep going after the workshop", b: "Walk out with your own team of AI agents you can keep consulting, building with, and expanding long after the session ends." },
    ],

    proof_eyebrow: "Not a slide deck. Real products.",
    proof_title: "Everything you see here was built the same way.",
    proof_lead: "Every project on this page was built with a team of AI agents, shared memory, and the workflow you'll learn in the workshop.",
    proof_self_tag: "This page",
    proof_self_t: "This page",
    proof_self_b: "This page, and the whole workshop, I built with a team of AI agents, the same kind you'll set up yourself.",
    proof_glimps_tag: "A real product",
    proof_glimps_t: "Glimps",
    proof_glimps_b: "A real product, built this way. See it for yourself.",
    proof_glimps_link: "See Glimps",

    ofir_eyebrow: "Who you'll meet in the workshop",
    roster_title: "Me, and the team I build with every day.",
    lead_label: "Leads the workshop",
    crew_label: "My AI agent team",
    crew_title: "These are the partners I build every product with.",
    crew_intro: "Each of my partners owns a different area. Together they help me think, make decisions, design, and build products. During the workshop you'll build your own version of this team, tuned to exactly how you work.\n\nBy the end, these won't just be my partners. They'll be yours too.",
    crew_close: "When you leave here, you'll have a team like this too. And you won't build alone anymore.",
    ofir_name: "Ofir Rushinek",
    ofir_role: "The operator",
    agents: [
      { img: "crew-designer", tag: "The Designer", role: "The product designer", b: "When it's time to design, he's my first partner. He works from the Design System, keeps things consistent, suggests UX solutions, and makes sure every screen is clear, usable, and ready to build." },
      { img: "crew-strategist", tag: "The Strategist", role: "The product manager", b: "When I'm not sure what to build first, I check with him. He helps sharpen ideas, prioritize, challenge assumptions, and keep every decision moving the product in the right direction." },
      { img: "crew-architect", tag: "The Architect", role: "The lead engineer", b: "When I hit a technical dilemma, I start with him. He helps me choose the right approach, think through the architecture, and make sure every solution we pick is actually buildable, stable, and ready to grow with the product." },
    ],
    ofir_bio: "For years I built digital products and led Product Design teams. But the biggest shift I went through wasn't a new title, it was a new way of working.\n\nToday I don't build products alone anymore. I work with a team of AI agents I built for myself - partners in thinking, planning, design, and building. Together we built Product Lab, Glimps, the site you're on right now, and even parts of the workshop itself.",
    ofir_why: "Now I want to help you build a team like that for yourself too.",

    quotes_eyebrow: "Testimonials",
    quotes_title: "From people who've done it",
    quotes: [
      { q: "I came away with a top-tier professional team (agents), created my own work right after the session, and got input I couldn't get before. Highly recommend.", n: "Ella Cohen", m: "Lead Product Designer", img: "testimonial-ella", li: "https://www.linkedin.com/in/ella-cohen-736698a8/" },
      { q: "Ofir taught me to build and manage a team of autonomous AI agents, with no code required. Working together, he helped me build a solid foundation for an idea I'd carried for a long time and hadn't managed to execute, and from there I was off and running. Highly recommend to anyone who wants to learn how to really use AI to build things, not just talk about them.", n: "Rona Galezer", m: "Venture Builder & Impact Investor", img: "testimonial-rona", li: "https://www.linkedin.com/in/ronabenziongalezer/" },
    ],

    // "A day in the life of a Product Lab graduate" — copy v5 (Copywriter, 2026-08-21).
    grad_kicker: "A few months after the workshop",
    grad_title: "A day in the life of a Product Lab graduate.",
    grad_paras: [
      "Morning. An idea shows up, and he has somewhere to take it. He writes his team two or three sentences and gets on with his day.",
      "The strategist already has the context and pulls in whoever's needed. The designer gives it shape in the product's own design language. The copywriter phrases it in the voice the product already speaks, and the architect maps a way to build it from what the existing system can actually do.",
      "By the time he's back at his desk there's a direction and something real to react to. By evening there's a first version. And the question he wakes up with has changed. Not how to build anymore. What to build.",
    ],

    incl_eyebrow: "The details",
    incl_title: "Everything you need to know",
    detail_items: [
      { ico: "video",    q: "Where and how does it run?", a: "A live session over Zoom, in a small group, so everyone gets real personal attention." },
      { ico: "clock",    q: "How long does it take?", a: "About three hours straight, with one break. You come in without a team of AI agents and leave with one." },
      { ico: "hand",     q: "Do I build it myself or watch?", a: "You build the whole way through, not watch from the side. You leave with something real you made yourself." },
      { ico: "laptop",   q: "Do I need to know how to code?", a: "No. If you can write a clear brief, you can do this. We build on Claude, in plain language, no code." },
      { ico: "box",      q: "What do I need to bring?", a: "A laptop, a Claude account, and a stable internet connection. A quiet spot to focus helps too. We'll tell you what else to set up before the session." },
      { ico: "spark",    q: "Is it really just one session?", a: "Yes. You leave with a working team of AI agents and something real you built. Where you take it from there is up to you." },
      { ico: "users",    q: "Is this for teams or individuals?", a: "Both. Come solo, or bring a couple of people from your team." },
      { ico: "calendar", q: "What if I can't make the date?", a: "Tell me on the call. The groups are small and sessions run regularly, so we'll find one that fits." },
    ],

    final_chip: "Invite-only. Small groups.",
    final_title: "Let's build together",
    final_sub: "One afternoon, a small group, and a team of your own that builds your first project with you, and stays yours long after. The first step is a call with me.",

    // Student area - real Google sign-in (Supabase). PLACEHOLDER EN copy 2026-08-11,
    // Copywriter to refine. The old access-code strings were retired with the gate.
    login_eyebrow: "Student area",
    login_title: "Enter the student area",
    login_sub: "This area is for workshop participants. Sign in with your Google account to enter.",
    login_google: "Continue with Google",
    login_register: "Register",
    modal_close: "Close",
    // Denied sign-in notice (invite-only). PLACEHOLDER EN copy 2026-08-12, Copywriter to refine.
    denied_title: "You don't have access yet",
    denied_body: "This area is for approved workshop participants. You're signed in with Google, but your account isn't registered yet. If you registered and it isn't working, talk to me and I'll open it up for you.",
    // Register-your-interest FORM (writes to register_lead). Copy from Copywriter 2026-08-13.
    reg_title: "Save your spot in the next session",
    reg_sub: "Spots are limited and go in small groups. Leave your details to hold your place in the next session, and I'll reach out personally with everything you need to know.",
    reg_first_label: "First name",
    reg_last_label: "Last name",
    reg_email_label: "Email",
    reg_email_ph: "you@email.com",
    reg_note_label: "Anything you'd like to share (optional)",
    reg_note_ph: "A line about you, what you're building, or what you're hoping to get out of it.",
    reg_submit: "Save my spot",
    reg_success: "You're in. I'll reach out personally with the details for the next session. Talk soon.",
    reg_error: "That didn't go through. Give it another try, or just message me directly.",

    // Admin roster - visible only to admin. PLACEHOLDER EN copy 2026-08-12, Copywriter to refine.
    roster_kicker: "Admin",
    admin_roster_title: "My students",
    roster_sub: "Your invite list. Add an email, confirm it to grant access, and see who has signed in.",
    roster_add_name_placeholder: "Student name",
    roster_add_placeholder: "Email (optional)",
    roster_add_cta: "Add user",
    roster_add_hint: "A lead can be added with a name only; email is optional. Adding does not grant access. After adding, hit \"Confirm\" to grant access.",
    roster_col_name: "Name",
    roster_col_email: "Email",
    roster_col_status: "Status",
    roster_col_signedin: "Signed in?",
    roster_col_stage: "Stage",
    roster_col_source: "Source",
    roster_col_next: "Next action",
    roster_col_actions: "Actions",
    roster_col_notes: "Notes",
    roster_col_phone: "Phone",
    roster_pill_confirmed: "Confirmed",
    roster_pill_pending: "Pending",
    roster_pill_uninvited: "Not invited",
    roster_signedin_no: "Not yet",
    roster_confirm: "Confirm",
    roster_unconfirm: "Unconfirm",
    roster_remove: "Remove",
    roster_add_to_list: "Add to list",
    roster_empty: "No students yet. Add a name above to get started.",
    roster_loading: "Loading...",
    roster_details: "Details",
    roster_save: "Save",
    roster_saved: "Saved",
    roster_save_err: "Save failed",
    roster_source_ph: "Where they came from (LinkedIn, WhatsApp, Referral...)",
    roster_next_ph: "The next step (Call tomorrow 12:00...)",
    roster_notes_ph: "What was discussed, context, details...",
    roster_phone_ph: "Phone",
    // Notes log (append-only, one dated line per fact). PLACEHOLDER EN copy
    // 2026-08-23, Copywriter to refine.
    roster_note_add: "Add",
    roster_note_read: "read",
    roster_note_legacy: "Undated",
    roster_note_empty: "No entries yet.",
    stages: {
      invited: "Invited",
      interested: "Interested",
      call_booked: "Call booked",
      confirmed: "Confirmed",
      attended: "Attended",
      dropped: "Dropped",
    },
    // Student-area tab bar. PLACEHOLDER EN copy 2026-08-12, Copywriter to refine.
    tab_content: "Course content",
    tab_students: "Students",

    // ---- Student prep page (gated by AUTH.tier). Teaching copy lives in
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

    // ---- #/kit — same final-copy note as the Hebrew block above.
    kit_eyebrow: "Your workshop kit",
    kit_title: "Congrats, it's here!",
    kit_sub: "Download the file and unzip it. See you Thursday, 3.9, at 17:30.",
    kit_btn_download: "Download again",

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
  // Two language controls live in .nav__menu; CSS shows the right one per width.
  // DESKTOP: a secondary globe button (looks like Student entrance) that opens a
  // dropdown to pick English / עברית. MOBILE tray: the quiet text toggle that
  // flips language on each tap.
  const langLabel = lang === "he" ? "בחירת שפה" : "Choose language";
  const langSwitch = `
    <div class="langswitch" data-langswitch>
      <button class="btn btn--ghost btn--sm btn--icon langswitch__btn" type="button" data-langswitch-toggle aria-haspopup="menu" aria-expanded="false" aria-label="${langLabel}" data-tooltip="${langLabel}">${I.globe}</button>
      <div class="langswitch__menu" role="menu" aria-label="${langLabel}" data-langswitch-menu hidden>
        <button class="langswitch__item" type="button" role="menuitem" data-set-lang="en"${lang === "en" ? ' aria-current="true"' : ""}>English</button>
        <button class="langswitch__item" type="button" role="menuitem" data-set-lang="he"${lang === "he" ? ' aria-current="true"' : ""}>עברית</button>
      </div>
    </div>`;
  const langToggle = `<button class="langtoggle" data-toggle-lang aria-label="Switch language"><span class="lang-full">${lang === "he" ? "English" : "עברית"}</span><span class="lang-short">${lang === "he" ? "EN" : "עב"}</span></button>`;
  const langControls = `${langSwitch}${langToggle}`;

  if (opts.account) {
    // Student-area header: avatar (icon-only) opens a menu; on mobile the label
    // lives inside the menu since the avatar is icon-only in the bar.
    return `
  <header class="nav"><div class="wrap nav__in nav__in--account">
    <!-- MOBILE layout: avatar left · wordmark center · hamburger right.
         The hamburger tray below holds the language toggle only. -->
    <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
    <div class="nav__menu" id="navMenu">
      ${langControls}
    </div>
    <div class="nav__account" data-account>
      <button class="btn btn--ghost btn--sm btn--icon nav__avatar" type="button" data-account-toggle aria-haspopup="menu" aria-expanded="false" aria-label="${t.nav_account}" data-tooltip="${t.nav_account}">${I.user}</button>
      <div class="nav__accmenu" role="menu" aria-label="${t.nav_account}" data-account-menu hidden>
        <button class="nav__accmenu-item" type="button" role="menuitem" data-signout>${t.nav_signout}</button>
      </div>
    </div>
    <button class="nav__burger" type="button" data-nav-toggle aria-label="${lang === "he" ? "תפריט" : "Menu"}" data-tooltip="${lang === "he" ? "תפריט" : "Menu"}" aria-expanded="false" aria-controls="navMenu">${I.menu}</button>
  </div></header>`;
  }

  // Public / home header NEVER shows "Sign out" — signing out lives only inside
  // the student zone (the account-menu avatar on #/prep). The button here is
  // always "Student entrance": a signed-in user gets a link into the zone, a
  // signed-out user opens the sign-in modal.
  const studentBtn = AUTH.tier
    ? `<a class="btn btn--ghost btn--sm nav__student" href="#/prep" aria-label="${t.nav_student}"><span class="btn__label">${t.nav_student}</span></a>`
    : `<button class="btn btn--ghost btn--sm nav__student" type="button" data-student-open aria-label="${t.nav_student}"><span class="btn__label">${t.nav_student}</span></button>`;
  return `
  <header class="nav"><div class="wrap nav__in">
    <!-- MOBILE layout: WhatsApp left · wordmark center · hamburger right.
         The hamburger opens .nav__menu as a tray below (language + student). -->
    <a class="nav__brand nav__brand--text" href="#/">Product Lab</a>
    <div class="nav__menu" id="navMenu">
      ${langControls}
      <!-- Entrance gate when signed out; Sign out when signed in (AUTH.tier). Text-only, no icon. -->
      ${studentBtn}
    </div>
    <a class="btn btn--wa-solid btn--sm nav__book" href="${WA_URL}" target="_blank" rel="noopener" aria-label="${t.cta_wa}">${I.wa}<span class="btn__label">${t.cta_wa}</span></a>
    <button class="nav__burger" type="button" data-nav-toggle aria-label="${lang === "he" ? "תפריט" : "Menu"}" data-tooltip="${lang === "he" ? "תפריט" : "Menu"}" aria-expanded="false" aria-controls="navMenu">${I.menu}</button>
  </div></header>`;
};

// Student sign-in MODAL. Real Google OAuth via Supabase (the access-code field
// was retired with the SHA-256 gate). The button click hands off to
// sb.auth.signInWithOAuth and the page re-renders on return (see wireStudent).
// A reusable NOTICE popup (denied sign-in + "registration not open"). Reuses the
// documented .noacct callout as the modal panel and .modal for the overlay — no
// new component. `key` selects it (data-notice); WhatsApp CTA reuses WA_URL.
const noticeModal = (key, title, body, t) => `
  <div class="modal" data-notice="${key}" hidden>
    <div class="modal__overlay" data-notice-close></div>
    <div class="moment-card noacct" role="dialog" aria-modal="true" aria-label="${title}" style="position:relative; z-index:1; margin:0">
      <button class="modal__close" type="button" data-notice-close aria-label="${t.modal_close}" data-tooltip="${t.modal_close}">${I.x}</button>
      <div class="noacct__ico">${I.info}</div>
      <h2 class="noacct__title">${title}</h2>
      <p class="noacct__body">${body}</p>
      <div class="cta-row" style="margin-top:1.5rem">
        <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
      </div>
    </div>
  </div>`;

const studentModal = (t) => `
  <div class="modal" data-student-modal hidden>
    <div class="modal__overlay" data-student-close></div>
    <div class="modal__card" role="dialog" aria-modal="true" aria-label="${t.login_title}">
      <button class="modal__close" type="button" data-student-close aria-label="${t.modal_close}" data-tooltip="${t.modal_close}">${I.x}</button>
      <div class="login__ico">${I.login}</div>
      <span class="eyebrow">${t.login_eyebrow}</span>
      <h2 class="login__title">${t.login_title}</h2>
      <p class="login__sub">${t.login_sub}</p>
      <div class="login__form">
        <button class="btn btn--primary login__submit login__google" type="button" data-google-signin>
          ${I.google}<span>${t.login_google}</span>
        </button>
        <!-- Opens the register-your-interest form (writes a lead via register_lead). -->
        <button class="btn btn--ghost login__submit" type="button" data-register-open>${t.login_register}</button>
      </div>
    </div>
  </div>
  ${noticeModal("denied", t.denied_title, t.denied_body, t)}
  ${registerModal(t)}`;

// Register-your-interest FORM modal. Reuses .modal/.modal__card (the sign-in
// modal's shell) and the .field/.input form-control component — no new modal
// primitive. One card, two swapped views: the form and a success panel. Submit
// calls sb.rpc('register_lead', ...) (see wireRegister); the note is optional,
// the email is LTR-isolated. Framing = interest in an UPCOMING session with a
// personal 1:1 follow-up (no date, no seat language).
const registerModal = (t) => `
  <div class="modal" data-register-modal hidden>
    <div class="modal__overlay" data-register-close></div>
    <div class="modal__card modal__card--form" role="dialog" aria-modal="true" aria-label="${t.reg_title}">
      <button class="modal__close" type="button" data-register-close aria-label="${t.modal_close}" data-tooltip="${t.modal_close}">${I.x}</button>

      <div data-register-view="form">
        <div class="login__ico">${I.spark}</div>
        <h2 class="login__title">${t.reg_title}</h2>
        <p class="login__sub">${t.reg_sub}</p>
        <form class="reg__form" data-register-form novalidate>
          <div class="field">
            <label class="field__label" for="reg-first">${t.reg_first_label}</label>
            <input class="input" id="reg-first" name="first" type="text" autocomplete="given-name" required />
          </div>
          <div class="field">
            <label class="field__label" for="reg-last">${t.reg_last_label}</label>
            <input class="input" id="reg-last" name="last" type="text" autocomplete="family-name" required />
          </div>
          <div class="field">
            <label class="field__label" for="reg-email">${t.reg_email_label}</label>
            <input class="input ltr-iso" id="reg-email" name="email" type="email" inputmode="email" dir="ltr" autocomplete="email" placeholder="${t.reg_email_ph}" required />
          </div>
          <div class="field">
            <label class="field__label" for="reg-note">${t.reg_note_label}</label>
            <textarea class="reg__note" id="reg-note" name="note" rows="3" placeholder="${escapeAttr(t.reg_note_ph)}"></textarea>
          </div>
          <p class="reg__error" data-register-error hidden>${I.info}<span>${t.reg_error}</span></p>
          <button class="btn btn--primary login__submit reg__submit" type="submit" data-register-submit>
            <span class="reg__submit-spinner" aria-hidden="true"></span>
            <span class="reg__submit-label">${t.reg_submit}</span>
          </button>
        </form>
      </div>

      <div data-register-view="success" hidden>
        <div class="noacct__ico reg__success-ico">${I.check}</div>
        <p class="reg__success-body">${t.reg_success}</p>
        <div class="cta-row" style="margin-top:1.5rem; justify-content:center">
          <button class="btn btn--ghost" type="button" data-register-close>${t.modal_close}</button>
        </div>
      </div>
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

/* ---- "Working canvas" cursors for the WHY NOW section --------------------
   A few colorful collaborator cursors, each tagged with a tool logo, wander the
   section like a live multiplayer canvas — the visual story of one person with a
   whole team's output. They touch nothing (no grabbing/resizing); they drift on
   curved, hand-held paths, pause, and move on. Simulated (no backend). Honors
   prefers-reduced-motion and is cleaned up on every re-render. */
const CURSOR_TOOLS = [
  { id: "figma", color: "#F24E1E", logo:
    `<svg viewBox="0 0 38 57" width="13" height="13" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
    </svg>` },
  { id: "claude", color: "#CC785C", logo:
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#CC785C" stroke-width="1.7" stroke-linecap="round">
      <path d="M12 2.5V21.5M2.5 12H21.5M20.2 7.25 3.8 16.75M16.75 3.8 7.25 20.2M7.25 3.8 16.75 20.2M3.8 7.25 20.2 16.75"/>
    </svg>` },
  { id: "gdocs", color: "#4285F4", logo:
    `<svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M7 2h6.5L19 6.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
      <path fill="#A1C2FA" d="M13.5 2 19 6.5h-5.5z"/>
      <rect x="8" y="11" width="8" height="1.4" rx=".7" fill="#fff"/>
      <rect x="8" y="14" width="8" height="1.4" rx=".7" fill="#fff"/>
      <rect x="8" y="17" width="5.5" height="1.4" rx=".7" fill="#fff"/>
    </svg>` },
  { id: "lovable", color: "#FF4D67", logo:
    `<svg viewBox="0 0 24 24" fill="#FF4D67" aria-hidden="true">
      <path d="M12 21.35 3.55 12.9a5.4 5.4 0 1 1 7.64-7.64l.81.8.81-.8a5.4 5.4 0 1 1 7.64 7.64z"/>
    </svg>` },
  { id: "gemini", color: "#4F86F7", logo:
    `<svg viewBox="0 0 24 24" aria-hidden="true">
      <defs><linearGradient id="pcGemini" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7C6DF3"/><stop offset="1" stop-color="#A64CE0"/>
      </linearGradient></defs>
      <path fill="url(#pcGemini)" d="M12 2c.4 5.2 4.8 9.6 10 10-5.2.4-9.6 4.8-10 10-.4-5.2-4.8-9.6-10-10 5.2-.4 9.6-4.8 10-10z"/>
    </svg>` },
];

const whyCursorsMarkup = () =>
  `<div class="cursorfield" aria-hidden="true">` +
  CURSOR_TOOLS.map((tl) =>
    `<div class="pcursor" data-tool="${tl.id}" style="--pc:${tl.color}">
       <svg class="pcursor__arrow" viewBox="0 0 24 24" width="22" height="22"><path d="M5 2.5 5 20.5 9.7 16 12.7 22.5 15.5 21.2 12.5 14.8 19 14.8Z"/></svg>
       <span class="pcursor__tag">${tl.logo}</span>
     </div>`).join("") + `</div>`;

let _whyCursorRAF = 0;
function wireWhyCursors() {
  cancelAnimationFrame(_whyCursorRAF); _whyCursorRAF = 0;
  const field = document.querySelector(".cursorfield");
  if (!field) return;
  const els = [...field.querySelectorAll(".pcursor")];
  if (!els.length) return;

  const rnd = (a, b) => a + Math.random() * (b - a);
  const MG = 8;                                   // inset so tags never clip
  /* The cursor's own box is 26x26, but .pcursor__tag hangs out of it: it sits at
     left:15px/top:17px and is 37x37, so the real painted extent from the cursor's
     origin is 15+37=52 wide and 17+37=54 tall. Bounding on the 26px arrow alone
     let the logo chip cross the field edge and get clipped by overflow:hidden at
     every viewport. Bound on the PAINTED extent, not the icon. */
  const TAG_W = 52, TAG_H = 54;
  const box = () => ({ w: field.clientWidth, h: field.clientHeight });
  const place = (el, x, y) => { el.style.transform = `translate(${x}px, ${y}px)`; };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rawX = (b) => rnd(MG, Math.max(MG + 1, b.w - TAG_W - MG));
  const rawY = (b) => rnd(MG, Math.max(MG + 1, b.h - TAG_H - MG));

  /* Ofir's call (2026-08-20): the cursors roam the WHOLE section - over the
     cards, the title, everything. They are tiny, click-through decoration and
     the collisions ARE the charm ("a busy working canvas"), so there is no
     keep-out zone. Bounds = the painted extent against the field edges only. */
  const pick = (b) => ({ x: rawX(b), y: rawY(b) });

  const S = [];
  els.forEach((el) => {
    const b = box(), pt = pick(b);
    el.style.display = "";
    S.push({ el, ax: pt.x, ay: pt.y, bx: pt.x, by: pt.y, t: 1, dur: 1, curve: 0, mode: "pause", until: 0, seed: Math.random() * 1000 });
  });
  if (!S.length) return;
  S.forEach((s) => place(s.el, s.ax, s.ay));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const b = box();                              // static, evenly scattered
    S.forEach((s) => { const q = pick(b); if (q) place(s.el, q.x, q.y); });
    return;
  }

  const t0 = performance.now();
  S.forEach((s, i) => { s.until = t0 + i * 260; });  // staggered start

  const segment = (s, now) => {
    const b = box();
    s.ax = s.bx; s.ay = s.by;
    const nxt = pick(b), curve = rnd(-0.3, 0.3);
    s.bx = nxt.x; s.by = nxt.y;
    s.dur = rnd(1600, 3400); s.curve = curve; s.t = 0; s.mode = "move"; s.start = now;
  };

  let last = 0;
  const frame = (now) => {
    if (!last) last = now;
    const dt = now - last; last = now;
    S.forEach((s) => {
      if (s.mode === "pause") {
        if (now >= s.until) { segment(s, now); return; }
        place(s.el, s.bx, s.by + Math.sin(now / 640 + s.seed) * 0.7);  // idle bob
        return;
      }
      s.t += dt / s.dur;
      const tt = Math.min(1, s.t), e = ease(tt);
      let x = s.ax + (s.bx - s.ax) * e, y = s.ay + (s.by - s.ay) * e;
      const dx = s.bx - s.ax, dy = s.by - s.ay, len = Math.hypot(dx, dy) || 1;
      const arc = Math.sin(Math.PI * tt) * s.curve * len;             // curved, not straight
      x += (-dy / len) * arc; y += (dx / len) * arc;
      x += Math.sin(now / 720 + s.seed) * 1.1;                        // hand-held wobble
      y += Math.cos(now / 840 + s.seed) * 1.1;
      place(s.el, x, y);
      if (s.t >= 1) { s.mode = "pause"; s.until = now + rnd(280, 1500); }
    });
    _whyCursorRAF = requestAnimationFrame(frame);
  };
  _whyCursorRAF = requestAnimationFrame(frame);
}

// SESSION STRIP — shared markup for the current cohort card and any future one
// (2026-08-31: cohort #2 added directly beneath it). `opts.disabled` renders a
// closed, non-clickable CTA (no href, aria-disabled, greyed via .btn--disabled);
// `opts.price` adds a price line under the CTA button (not a separate column —
// both strips stay the same 3-column width: when / where / cta). Do not
// duplicate this markup per-strip — edit once, both render.
function sessionStripHtml(s, opts = {}) {
  const cta = opts.disabled
    ? `<span class="btn btn--accent btn--disabled" aria-disabled="true">${s.cta}</span>`
    : `<a class="btn btn--accent" href="${WA_URL}" target="_blank" rel="noopener">${s.cta}</a>`;
  const price = opts.price
    ? `<div class="ss-price"><strong>${s.price_value[0]}</strong><span>${s.price_value[1]}</span></div>`
    : "";
  return `
      <div class="session-strip reveal${opts.disabled ? " session-strip--closed" : ""}">
        <span class="ss-badge">${I.spark} ${s.badge}</span>
        <div class="ss-col">
          <div class="ss-label">${s.when_label}</div>
          <div class="ss-val">
            <strong>${s.when_value[0]}</strong>
            <span>${s.when_value[1]}, ${s.when_value[2]}</span>
          </div>
        </div>
        <div class="ss-div"></div>
        <div class="ss-col">
          <div class="ss-label">${s.where_label}</div>
          <div class="ss-val">
            <strong>${s.where_value[0]}</strong>
            <span>${s.where_value[1]}</span>
          </div>
        </div>
        <div class="ss-div"></div>
        <div class="ss-col ss-col--cta">
          ${cta}${price}
          <div class="ss-note">${s.limited_note}</div>
        </div>
      </div>`;
}

function render(lang) {
  const t = I18N[lang];

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang)}

  <main id="top">
  <!-- 1 HERO — full-bleed COZY CAFE SCENE as the background (the visual IS the bg).
       Title sits over it, no separate graphic. Background photo is a PLACEHOLDER
       (warm gradient) until the generated cafe image lands (OpenAI billing gate). -->
  <section class="hero hero--oneview">
    <div class="hero__content">
      <h1 class="hero__title"><span class="ht1">${t.hero_t1}</span><span class="ht2">${t.hero_t2a}<span class="mark">${t.hero_title_mark}</span>${t.hero_title_b}</span></h1>
      <p class="hero__sub">${t.hero_sub_lines.map((l) => `<span class="sd">${l}</span>`).join("")}</p>
      <div class="hero__cta"><button class="btn btn--accent" type="button" data-register-open>${t.hero_cta}</button></div>
    </div>
    <picture class="hero__bg">
      <source type="image/webp" media="(max-width: 760px)" srcset="assets/hero-room-mobile.webp?v=1" />
      <source type="image/webp" srcset="assets/hero-room.webp?v=1" />
      <img class="hero__img is-loaded" src="assets/hero-room.webp?v=1" alt="" width="2560" height="1440" fetchpriority="high" decoding="async" />
    </picture>
  </section>

  <!-- 1b SESSION STRIPS — flat full-width bands (like the site's other section
       bands), flush below the hero so a hint peeks above the fold. NOT floating/
       rounded cards. Current cohort stays on top, closed; cohort #2 goes directly
       beneath it, active, price shown (2026-08-31 — see sessionStripHtml above). -->
  <section class="session-strip-band">
    <div class="wrap">
      ${sessionStripHtml(t.session, { disabled: true })}
      <div class="ss-divider-full"></div>
      ${sessionStripHtml(t.session2, { price: true })}
    </div>
  </section>

  <!-- 6 PROOF OF CRAFT -->
  <section class="section section--alt"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.proof_eyebrow}</span>
      <h2 class="section-title">${t.proof_title}</h2>
      <p class="section-lead">${t.proof_lead}</p>
    </div>
    <div class="proof" style="margin-top:2rem">
      <div class="proof__block reveal">
        <div class="proof__shot"><img src="assets/thispage-3.jpg" alt="" /></div>
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
              <div class="agentcard__illo"><img src="assets/${a.img}.webp?v=2" alt="" /></div>
              <div class="agentcard__body">
                <span class="agentcard__tag">${a.tag}</span>
                <div class="agentcard__role">${a.role}</div>
                <p>${a.b}</p>
              </div>
            </div>`).join("")}
        </div>
        <p class="section-lead">${t.crew_close}</p>
      </div>
    </div>
  </div></section>

  <!-- 2 WHY NOW — three rounded tiles (bold numeral on top) -->
  <section class="section section--alt why-section">
    ${whyCursorsMarkup()}
    <div class="wrap why">
    <div class="reveal">
      <span class="eyebrow">${t.why_eyebrow}</span>
      <h2 class="section-title why__title">${t.why_heading}</h2>
    </div>
    <div class="grid grid--3" style="margin-top:2rem">
      ${t.why_tiles.map((x, i) => `
        <div class="card whytile reveal">
          <div class="whytile__num">${["01", "02", "03"][i]}</div>
          <h3>${x.t}</h3><p>${x.b}</p>
        </div>`).join("")}
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
          <div class="tilecard__illo"><img src="assets/${["who-designer", "who-builder", "who-horizon"][i]}.webp?v=2" alt="" /></div>
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
            <span class="quote-card__avatarwrap">
              <span class="quote-card__avatar">${qt.img ? `<img src="assets/${qt.img}.jpg?v=1" alt="${qt.n}" loading="lazy" />` : I.user}</span>
              ${qt.li ? `<a class="quote-card__li" href="${qt.li}" target="_blank" rel="noopener" aria-label="${qt.n} on LinkedIn" data-tooltip="LinkedIn" data-tip-pos="top">${I.linkedin}</a>` : ""}
            </span>
            <span class="quote-card__who"><span class="quote-card__name"><strong>${qt.n}</strong></span><span class="quote-card__role">${qt.m}</span></span>
          </figcaption>
          <blockquote>${qt.q}</blockquote>
        </figure>`).join("")}
    </div>
  </div></section>

  <!-- 8b A DAY IN THE LIFE OF A GRADUATE — sits directly BELOW the last testimonial.
       Same --pl-bg-alt band as the section above it and NO top padding, so the two
       read as one continuous band rather than two stacked stripes.
       The photograph is the FULL 3:2 frame at every width — never cropped. -->
  <section class="section section--alt grad-section"><div class="grad-wrap">
    <div class="grad">
      <div class="grad__text reveal">
        <span class="eyebrow">${t.grad_kicker}</span>
        <h2 class="section-title grad__title">${t.grad_title}</h2>
        <div class="grad__paras">
          ${t.grad_paras.map((g) => `<p>${g}</p>`).join("")}
        </div>
      </div>
      <div class="grad__media reveal">
        <figure class="grad__frame">
          <span class="grad__pin" aria-hidden="true"></span>
          <img src="assets/grad-day.webp" alt="" loading="lazy" decoding="async" width="1536" height="1024" />
        </figure>
      </div>
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

/* ---- Student PREP page - gated by the live session tier (AUTH.tier) ------- */
/* The single guard: no tier (signed out) → bounce home and pop the sign-in
   modal. loadAuth() resolves the tier from the Supabase session + profile row.
   CONTENT: rendered from window.WORKSHOP_CONTENT (content.js). This is the
   POST-workshop content vault. Teaching copy is BILINGUAL: renderPrep reads
   WORKSHOP_CONTENT[lang] (fallback en) and sets the vault <main> direction to
   match the toggle (rtl for HE, ltr for EN). Prompts are technical and stay
   English in both toggle states; the copyable prompt body is forced dir="ltr"
   so the English prompt renders correctly even inside an RTL page. */

/* Copyable prompt card: label + intro in the head, then the monospace prompt
   frame. The Copy control is an ICON-ONLY, border-less button pinned to the
   top-right corner of the PROMPT frame itself (not the head) - the frame
   reserves a matching padding lane so no prompt line ever runs under it. */
function promptCard(p) {
  const src = (window.WORKSHOP_CONTENT && window.WORKSHOP_CONTENT.prompts) || {};
  const text = src[p.key] || "";
  return `
    <div class="prompt">
      <div class="prompt__head">
        <span class="prompt__label">${p.label}</span>
        <p class="prompt__intro">${p.intro}</p>
      </div>
      <div class="prompt__body">
        <pre class="prompt__text" data-prompt="${p.key}" dir="ltr">${escapeHtml(text)}</pre>
        <button type="button" class="prompt__copy" data-copy-key="${p.key}"
                aria-live="polite" aria-label="Copy" data-tooltip="Copy">${I.copy}</button>
      </div>
    </div>`;
}

/* Minimal HTML-escape so prompt text renders literally inside <pre>. */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* One collapsible plan step: number + title header over the body (checklist
   and/or copyable prompt cards). All steps collapsed by default. Native <details>. */
function planStep(step, open) {
  /* A fixed left-to-right breadcrumb of chips (e.g. the Windows Settings path).
     Forced dir="ltr" so the step order can never reorder inside RTL Hebrew. */
  const breadcrumb = (steps) => `
    <div class="pcrumb" dir="ltr">
      ${steps.map((s, i) => `${i ? '<span class="pcrumb__arrow" aria-hidden="true">→</span>' : ""}<span class="pcrumb__chip${i === steps.length - 1 ? " pcrumb__chip--target" : ""}">${s}</span>`).join("")}
    </div>`;
  /* One checklist row. Supports an optional grouped `sub` list (e.g. the merged
     Windows-only item) and an optional `steps` breadcrumb inside a sub-row. */
  const checklistItem = (c) => `
    <li class="pchecklist__item">
      <span class="pchecklist__dot" aria-hidden="true"></span>
      <div class="pchecklist__body">
        <div class="pchecklist__top">
          <span class="pchecklist__name">${c.name}</span>
          ${c.tag ? `<span class="pchecklist__tag">${c.tag}</span>` : ""}
        </div>
        ${c.note ? `<p class="pchecklist__note">${c.note}</p>` : ""}
        ${c.sub ? `
        <ul class="psub">
          ${c.sub.map((s) => `
          <li class="psub__item">
            <span class="psub__name">${s.name}</span>
            ${s.steps ? breadcrumb(s.steps) : ""}
            ${s.note ? `<p class="psub__note">${s.note}</p>` : ""}
          </li>`).join("")}
        </ul>` : ""}
      </div>
    </li>`;
  const checklist = step.checklist ? `
    <ul class="pchecklist">
      ${step.checklist.map(checklistItem).join("")}
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

/* The media band inside a kit card. Both kit tiles get the SAME 16:9 frame
   (.card__media) so the pair reads as a matched set. Ofir's ask, 2026-08-27:
   "I want people to actually sense what it holds, not just the button."

   The deck tile: slide 1 as a STATIC IMAGE. Deliberately not an iframe - the
   deck stays private and will be shared by participant email after Sep 3, so a
   live embed would render a permanent Google "you need access" panel on the
   page. The button under it still opens the real deck; a student who is not on
   the file hits Google's own wall in a new tab, which is a state Ofir owns.

   The kit tile: the same frame carrying a figure for the FILE - the box glyph
   plus the REAL top-level entries of the zip as path chips, on the site's
   illustration wash so the two tiles carry comparable weight rather than one
   photograph beside one small icon. .pcrumb__chip is the chip the setup steps
   already use for a file path; dir="ltr" goes on each STRING (never on the row:
   these are paths whose internal order is at risk, the row follows the page). */
const KIT_ENTRIES = ["START-HERE.md", "agents/", "soul/", "memory/", "skills/", "shared/"];

function kitMedia(k) {
  if (k.image) {
    return `
      <div class="card__media">
        <img src="${k.image}" alt="${k.title}" loading="lazy" width="1440" height="810" />
      </div>`;
  }
  if (!k.download) return "";
  return `
    <div class="card__media card__media--figure">
      <div class="kitfile">
        <div class="kitfile__hd">
          <span class="card__ico" aria-hidden="true">${I.box}</span>
          <span class="kitfile__name" dir="ltr">product-lab</span>
        </div>
        <div class="kitfile__paths">
          ${KIT_ENTRIES.map((e) => `<span class="pcrumb__chip" dir="ltr">${e}</span>`).join("")}
        </div>
      </div>
    </div>`;
}

/* The shared-brain map: one shared-brain node (with the learning log as its
   caption) sits above the agents, each with its four files (role, character,
   skills, memory). A bus/spine line runs from the brain node to every agent
   card, so the connection reads as one system instead of separate tiles. The
   diagram floats directly on the page background (no card). Pure HTML/CSS on
   DS tokens, so RTL is free (logical layout) and it matches the site look
   with no new tokens. */
function sharedBrainDiagram(n) {
  const agentCard = () => `
    <div class="brainmap__agent">
      <span class="brainmap__agent-name">${n.agent}</span>
      <div class="brainmap__attrs">
        <span class="brainmap__attr">${n.role}</span>
        <span class="brainmap__attr">${n.character}</span>
        <span class="brainmap__attr">${n.skills}</span>
        <span class="brainmap__attr">${n.memory}</span>
      </div>
    </div>`;
  return `
    <div class="brainmap" role="group" aria-label="How the team connects: one shared brain with a learning log, wired to every agent that has its own role, character, skills and memory">
      <div class="brainmap__hd">
        <span class="brainmap__coord brainmap__coord--primary">${I.repeat}<span>${n.sharedBrain}</span></span>
        <span class="brainmap__caption">${n.learningLog}</span>
      </div>
      <div class="brainmap__agents">
        ${agentCard()}${agentCard()}${agentCard()}
      </div>
    </div>`;
}

/* Tier visibility: invite-only. Any signed-in tier (student or admin) sees every
   section; there is no visitor tier. `sec` is kept for signature stability (call
   sites pass a section) but no longer gates — the RLS-backed sign-in is the gate. */
function canSee(sec) {
  // Invite-only: any signed-in tier (student or admin) sees every section.
  // Denied users never reach here — they're signed out and bounced home.
  return AUTH.tier === "admin" || AUTH.tier === "student";
}

function renderPrep(lang) {
  const t = I18N[lang];
  // The real guard is Supabase RLS; this only decides what to paint. Any
  // non-null tier means signed in. Signed-out → bounce home + pop sign-in.
  if (!AUTH.tier) { pendingStudentOpen = true; location.hash = "#/"; return; }

  // Invite-only: there is no "visitor" tier anymore. A signed-in user is either
  // 'student' or 'admin' (both fall through to content). Anyone denied was signed
  // out in loadAuth() and never reaches this route.

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

  const isAdmin = AUTH.tier === "admin";

  // Course-content panel — everything the student sees (title excluded; the
  // title stays above the tab bar, visible on every tab).
  const contentPanel = `
    <!-- 1b — The kit and the deck. Always first, never collapsed: a student who
         comes back months later on a new machine starts here. Built on the
         existing .grid/.card recipe. The only addition is .card--anchored /
         .card__foot, which pins both CTAs to one baseline at the card bottom —
         without it the shorter card left its button floating in dead space.
         The note sits ABOVE the foot on purpose so the two buttons still line up. -->
    ${canSee(C.kit) ? `<section class="section"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.kit.kicker}</span>
        <h2 class="section-title">${C.kit.title}</h2>
        <p class="section-lead">${C.kit.subtitle}</p>
      </div>
      <div class="grid grid--2" style="margin-top:2rem">
        ${C.kit.items.map((k) => `
          <div class="card card--anchored ${k.featured ? "card--feature" : ""} reveal">
            <div class="card__ico">${I[k.icon] || I.box}</div>
            <span class="card__kicker">${k.kicker}</span>
            <h3>${k.title}</h3>
            <p>${k.body}</p>
            ${k.note ? `<p class="pchecklist__note" style="margin-top:.75rem">${k.note}</p>` : ""}
            <div class="card__foot">
              ${kitMedia(k)}
              <div class="cta-row">
                <a class="btn btn--primary btn--sm" href="${k.href}"${k.download ? ` download` : ` target="_blank" rel="noopener"`}>${k.cta}</a>
              </div>
            </div>
          </div>`).join("")}
      </div>
    </div></section>` : ""}

    <!-- 1c - How today runs (deck slide 3). Orientation before detail. Straight
         reuse of the .grid--3 + .card recipe the end and crew sections use; the
         only difference is that these cards carry no kicker and no foot. -->
    ${canSee(C.howToday) ? `<section class="section section--alt"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.howToday.kicker}</span>
        <h2 class="section-title">${C.howToday.title}</h2>
        <p class="section-lead">${C.howToday.subtitle}</p>
      </div>
      <div class="grid grid--3" style="margin-top:2rem">
        ${C.howToday.tiles.map((tile) => `
          <div class="card reveal">
            <div class="card__ico">${I[tile.icon] || I.box}</div>
            <h3>${tile.title}</h3>
            <p>${tile.body}</p>
          </div>`).join("")}
      </div>
      <p class="tech__closing reveal">${C.howToday.closing}</p>
    </div></section>` : ""}

    <!-- 2 — By the end of today (three parts).
         PLAIN, not --alt: the panel alternates plain/tinted section by section,
         and inserting howToday above pushed end onto the same tint as it. -->
    ${canSee(C.end) ? `<section class="section"><div class="wrap">
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
    </div></section>` : ""}

    <!-- 3 - The agent anatomy (deck slides 7 + 8). Replaced the narrowing-focus
         section and its funnel figure on 2026-08-27: the deck teaches the anatomy
         in this slot, and the closing exercise asks each student to write an
         agent's job, character and skills, so this is now preparation for that.
         Same .tech grid and the same numbered .stage-list as before - the two
         groups are two clusters in the two existing columns. --groups only
         swaps align-items to start so both group headings share one baseline
         (the columns hold 4 items and 2, so centring them looked misaligned). -->
    ${canSee(C.technical) ? `<section class="section section--alt"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.technical.kicker}</span>
        <h2 class="section-title">${C.technical.title}</h2>
        <p class="section-lead">${C.technical.subtitle}</p>
      </div>
      <div class="tech tech--groups" style="margin-top:2rem">
        ${(() => { let n = 0; return C.technical.groups.map((g) => `
          <div class="tech__group reveal">
            <span class="eyebrow">${g.heading}</span>
            <ol class="stage-list">
              ${g.stages.map((s) => `
                <li class="stage"><span class="stage__num">${++n}</span><div><h3>${s.title}</h3><p>${s.body}</p></div></li>`).join("")}
            </ol>
          </div>`).join(""); })()}
      </div>
      <p class="tech__closing reveal">${C.technical.closing.join("<br>")}</p>
    </div></section>` : ""}

    <!-- 4b - The shared brain (how the files connect) -->
    ${canSee(C.sharedBrain) ? `<section class="section"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.sharedBrain.kicker}</span>
        <h2 class="section-title">${C.sharedBrain.title}</h2>
        <p class="section-lead">${C.sharedBrain.subtitle}</p>
      </div>
      <div class="brain" style="margin-top:2rem">
        <p class="brain__body reveal">${C.sharedBrain.body}</p>
        <div class="brain__figure reveal">${sharedBrainDiagram(C.sharedBrain.nodes)}</div>
      </div>
    </div></section>` : ""}

    <!-- 4c - Meet the team you will work with. Three agents ship inside the kit;
         the page introduced no cast at all before this, so a returning student met
         three named agents for the first time inside a prompt. Same .grid--3/.card
         recipe as the end section, plus .card--anchored/.card__foot so all three
         badge rows sit on one baseline however the body copy wraps. -->
    ${canSee(C.crew) ? `<section class="section section--alt"><div class="wrap">
      <div class="reveal">
        <span class="eyebrow">${C.crew.kicker}</span>
        <h2 class="section-title">${C.crew.title}</h2>
        <p class="section-lead">${C.crew.subtitle}</p>
      </div>
      <div class="grid grid--3" style="margin-top:2rem">
        ${C.crew.members.map((m) => `
          <div class="card card--anchored reveal">
            <div class="card__ico">${I[m.icon] || I.users}</div>
            <span class="card__kicker">${m.tag}</span>
            <h3>${m.role}</h3>
            <p>${m.body}</p>
            <div class="card__foot">
              <div class="card__badges">
                ${m.badges.map((b) => `<span class="card__badge">${b}</span>`).join("")}
              </div>
            </div>
          </div>`).join("")}
      </div>
      <p class="tech__closing reveal">${C.crew.closing}</p>
    </div></section>` : ""}

    <!-- 5 — The plan (numbered steps with copyable prompt cards).
         PLAIN, not --alt: this panel alternates plain/tinted section by section,
         and inserting kit + crew above pushed plan onto the same tint as crew —
         one continuous 2,300px tinted slab. The tint flips here and on the help
         section below so the alternation survives the two new sections. -->
    ${canSee(C.plan) ? `<section class="section"><div class="wrap narrow">
      <div class="reveal">
        <span class="eyebrow">${C.plan.kicker}</span>
        <h2 class="section-title">${C.plan.title}</h2>
        <p class="section-lead">${C.plan.subtitle}</p>
      </div>
      <div class="plan" style="margin-top:2rem">
        ${C.plan.steps.map((s) => planStep(s, false)).join("")}
      </div>
      <p class="tech__closing reveal">${C.plan.closing}</p>
    </div></section>` : ""}

    <!-- Help + WhatsApp (site copy - bilingual, inherits the main dir).
         --alt so it reads as its own block instead of running on from the very
         long plan section above it — see the tint note on plan. -->
    <section class="section section--alt"><div class="wrap narrow">
      <div class="reveal">
        <h2 class="prep__h">${t.prep_help_title}</h2>
        <p class="section-lead" style="margin-top:.5rem">${t.prep_help_body}</p>
        <div class="cta-row" style="margin-top:1.25rem">
          <a class="btn btn--wa-solid" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
        </div>
      </div>
    </div></section>`;

  // Students panel — admin only. This is Ofir's invite list / CRM: add an email
  // (step 1), confirm it to grant access (step 2), remove, and see who's actually
  // signed in. The table is filled async by renderRoster() from admin_roster();
  // RLS is the real gate (non-admins get zero rows even if they force this open).
  const studentsPanel = `
    <section class="section" data-roster-section><div class="wrap roster-wrap">
      <div class="reveal">
        <span class="eyebrow">${t.roster_kicker}</span>
        <h2 class="section-title">${t.admin_roster_title}</h2>
        <p class="section-lead">${t.roster_sub}</p>
      </div>
      <form class="roster__add" data-roster-add style="margin-top:1.75rem">
        <input class="roster__input" type="text" name="sname" required
          placeholder="${t.roster_add_name_placeholder}" aria-label="${t.roster_add_name_placeholder}" autocomplete="off" />
        <input class="roster__input" type="email" name="email"
          placeholder="${t.roster_add_placeholder}" aria-label="${t.roster_add_placeholder}" autocomplete="off" />
        <button class="btn btn--primary roster__addbtn" type="submit">${I.check}<span>${t.roster_add_cta}</span></button>
      </form>
      <p class="roster__hint">${t.roster_add_hint}</p>
      <div class="roster" data-roster style="margin-top:1.5rem">
        <p class="roster__loading">${t.roster_loading}</p>
      </div>
    </div></section>`;

  // Data-driven tab set so more panels can be added later. Students is admin-only;
  // with a single tab we skip the bar entirely (students/visitors see content only).
  const tabs = [
    { id: "content", label: t.tab_content, panel: contentPanel },
    ...(isAdmin ? [{ id: "students", label: t.tab_students, panel: studentsPanel }] : []),
  ];
  // The tab you were on is where you come back to. Any re-render of this page
  // (language switch, hash route, an auth event) used to drop you back on the
  // first tab; on a CRM being worked row by row that loses your place.
  const activeTab = tabs.some((tb) => tb.id === prepTab()) ? prepTab() : tabs[0].id;
  // Tab bar aligns to the reading-start edge automatically (flex-start honors dir:
  // right in Hebrew RTL, left in English LTR) — no explicit side needed.
  const tabBar = tabs.length > 1 ? `
    <div class="wrap"><div class="tabs" role="tablist" data-tabs>
      ${tabs.map((tb) => `<button type="button" class="tabs__btn" role="tab"
        data-tab="${tb.id}" aria-selected="${tb.id === activeTab ? "true" : "false"}">${tb.label}</button>`).join("")}
    </div></div>` : "";
  const panelsHtml = tabs.length > 1
    ? tabs.map((tb) => `<div class="tabpanel" data-tab-panel="${tb.id}"${tb.id === activeTab ? "" : " hidden"}>${tb.panel}</div>`).join("")
    : contentPanel;

  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang, { account: true })}

  <main id="top" class="page vault" dir="${lang === "he" ? "rtl" : "ltr"}">
    <!-- 1 — Plain functional page title; stays above the tab bar on every tab -->
    <section class="section"><div class="wrap narrow">
      <div class="reveal">
        <h1 class="prep__pagetitle">${C.hero.title}</h1>
      </div>
    </div></section>

    ${tabBar}
    ${panelsHtml}
  </main>

  ${studentModal(t)}
  ${siteFooter(t)}`;

  afterRender();
  initPrepTabs();
  // Admin only: bind the "Add user" form once, then fetch + draw the roster. RLS
  // returns zero rows to non-admins, so this is safe even if the div is forced open.
  if (isAdmin) { wireRosterAdd(lang); renderRoster(lang); }
}

/* Which student-area tab is open. Module state so it survives a re-render, and
   sessionStorage so it survives a reload / an OAuth round trip, per browser tab. */
const PREP_TAB_KEY = "pl_prep_tab";
let PREP_TAB = null;
function prepTab(next) {
  if (next !== undefined) {
    PREP_TAB = next;
    try { sessionStorage.setItem(PREP_TAB_KEY, next); } catch (e) {}
    return PREP_TAB;
  }
  if (PREP_TAB === null) { try { PREP_TAB = sessionStorage.getItem(PREP_TAB_KEY); } catch (e) {} }
  return PREP_TAB;
}

/* Student-area tab bar: switch which panel is visible. No-op when there's only
   one tab (no bar rendered). Panels stay in the DOM (hidden), so the async
   roster fetch into [data-roster] still lands even on the inactive tab. */
function initPrepTabs() {
  const bar = document.querySelector("[data-tabs]");
  if (!bar) return;
  const btns = [...bar.querySelectorAll("[data-tab]")];
  const panels = [...document.querySelectorAll("[data-tab-panel]")];
  btns.forEach((b) => b.addEventListener("click", () => {
    const id = b.getAttribute("data-tab");
    prepTab(id);
    btns.forEach((x) => x.setAttribute("aria-selected", x === b ? "true" : "false"));
    panels.forEach((p) => {
      const show = p.getAttribute("data-tab-panel") === id;
      p.hidden = !show;
      // A hidden panel's .reveal elements are never seen by the scroll observer,
      // so force them visible when the panel is switched in (else they stay at
      // opacity:0). The initial panel is handled by the observer as usual.
      if (show) p.querySelectorAll(".reveal").forEach((r) => r.classList.add("in"));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
}

/* ---- Admin roster: the invite list / student CRM ------------------------- */
/* Admin-only. One call to admin_roster() merges the allowlist (who's invited +
   confirmed) with profiles (who actually signed in). Each row is one of:
   confirmed student · added-but-pending · a gate-crasher (signed in, not invited).
   Every write below succeeds only for the admin (RLS); after each one we re-fetch. */
/* ---- CONTENT DECIDES DIRECTION, THE SITE TOGGLE NEVER DOES ---------------
   Ofir 2026-08-23: "if it's in English, make it left to right, regardless of the
   language of the website." Every free-text value in this panel is dir-resolved
   from its OWN first strong character - the same rule the browser uses for
   dir="auto", computed here because the value also has to drive the direction of
   the wrapper around it (a note card, a quote span, a table cell). */
const RTL_CHARS = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
const LTR_CHARS = /[A-Za-z\u00C0-\u024F\u0370-\u058F\u1E00-\u1EFF]/;
function textDir(v, fallback) {
  const str = String(v == null ? "" : v);
  const r = str.search(RTL_CHARS);
  const l = str.search(LTR_CHARS);
  if (r === -1 && l === -1) return fallback || "auto";
  if (r === -1) return "ltr";
  if (l === -1) return "rtl";
  return r < l ? "rtl" : "ltr";
}

/* ---- Time, presented ----------------------------------------------------
   Nothing in this panel shows a raw timestamp. Every moment renders as HOW LONG
   AGO (the thing that is actually read) beside the moment itself, in the UI
   language, as TWO separate elements - a Hebrew word and a Latin numeral in one
   bidi run reorder unpredictably, two isolated spans never do. */
function localeOf(lang) { return lang === "he" ? "he-IL" : "en-GB"; }

function relAge(d, lang, dateOnly) {
  try {
    const rtf = new Intl.RelativeTimeFormat(localeOf(lang), { numeric: "auto" });
    const now = new Date();
    const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const days = Math.round((b - a) / 86400000);
    if (days === 0) {
      // A DD.MM entry is a DAY, not a moment - "8 hours ago" would be invented.
      if (dateOnly) return rtf.format(0, "day");
      const mins = Math.round((d - now) / 60000);
      if (Math.abs(mins) < 60) return rtf.format(mins, "minute");
      return rtf.format(Math.round((d - now) / 3600000), "hour");
    }
    if (Math.abs(days) < 31) return rtf.format(days, "day");
    if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
    return rtf.format(Math.round(days / 365), "year");
  } catch (e) { return ""; }
}

// A DB timestamp -> { stamp, rel, title }. Null when there is nothing to show.
function rosterWhen(v, lang) {
  if (!v) return null;
  const d = new Date(v);
  if (isNaN(d.getTime())) return null;
  const loc = localeOf(lang);
  let stamp = String(v);
  try {
    stamp = d.toLocaleDateString(loc, { day: "numeric", month: "short" })
      + " · " + d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
  } catch (e) {}
  let title = stamp;
  try { title = d.toLocaleString(loc, { dateStyle: "full", timeStyle: "short" }); } catch (e) {}
  return { stamp, rel: relAge(d, lang), title };
}

/* ---- Notes: an append-only log, one dated line per fact ------------------
   Convention (CMO 2026-08-23, shared brain "CRM NOTE CONVENTION"):
     `DD.MM - one fact` · newest on top · a line is NEVER edited or deleted (a
     correction is a NEW dated line) · "quoted text" is the candidate's own words
     · a line starting `הערכה:` / `read:` is our read, not a fact · and the next
     action never lives here, it lives in `צעד הבא` alone.
   STORAGE IS UNCHANGED - still the one `notes` text column, no DB work. What
   changed is the interface: an ADD box plus a READ-ONLY history, so "never
   destroy a line" is enforced structurally instead of by discipline at 11pm on a
   phone. Adding PREPENDS one stamped line to the raw string and rewrites not a
   single existing character, so the history is loss-proof by construction.
   Entry boundary is the CMO's parse contract. Anything that is not a dated line
   is LEGACY prose from before the convention - rendered as its own entry and
   labelled undated, never dropped and never a crash. Every row is legacy today,
   so that is the common path, not the edge case. */
const NOTE_LINE = /^\s*(\d{1,2})\.(\d{1,2})\s*-?\s*/;
const NOTE_OPINION = /^\s*(הערכה|read)\s*:\s*/i;

function noteStampToday() {
  const d = new Date();
  return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0");
}

// DD.MM carries no year. Assume the current one; if that lands in the future a
// note about the past must belong to last year.
function noteDate(dd, mm) {
  const now = new Date();
  let d = new Date(now.getFullYear(), Number(mm) - 1, Number(dd));
  if (isNaN(d.getTime())) return null;
  if (d - now > 7 * 86400000) d = new Date(now.getFullYear() - 1, Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? null : d;
}

function parseNotes(raw) {
  const out = [];
  String(raw == null ? "" : raw).split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const m = line.match(NOTE_LINE);
    if (m) out.push({ dd: m[1], mm: m[2], text: line.slice(m[0].length).trim(), legacy: false });
    else out.push({ dd: null, mm: null, text: line.trim(), legacy: true });
  });
  return out;
}

// A "..." span is THEIR words: quote-styled, and it resolves its OWN direction
// from its own first strong character even inside an opposite-direction line.
function noteBodyHtml(text) {
  return String(text).split(/("[^"]*"|\u201C[^\u201D]*\u201D)/g).map((p) => {
    if (!p) return "";
    const isQuote = /^"[^"]*"$/.test(p) || /^\u201C[^\u201D]*\u201D$/.test(p);
    return isQuote
      ? `<span class="rnote__q" dir="${textDir(p)}">${escapeHtml(p)}</span>`
      : escapeHtml(p);
  }).join("");
}

// One entry = one wrapper. That is Ofir's ask ("each item its own wrapper").
function noteEntryHtml(e, lang, t) {
  const opinion = NOTE_OPINION.test(e.text);
  const body = opinion ? e.text.replace(NOTE_OPINION, "") : e.text;
  let head;
  if (e.legacy) {
    head = `<span class="rnote__chip rnote__chip--legacy">${escapeHtml(t.roster_note_legacy)}</span>`;
  } else {
    const d = noteDate(e.dd, e.mm);
    const age = d ? relAge(d, lang, true) : "";
    head = `<span class="rnote__chip" dir="ltr">${escapeHtml(e.dd)}.${escapeHtml(e.mm)}</span>`
      + (age ? `<span class="rnote__age" dir="auto">${escapeHtml(age)}</span>` : "");
  }
  if (opinion) head += `<span class="rnote__tag">${escapeHtml(t.roster_note_read)}</span>`;
  const cls = "rnote" + (opinion ? " rnote--opinion" : "") + (e.legacy ? " rnote--legacy" : "");
  return `<article class="${cls}" dir="${textDir(body, "auto")}">
        <div class="rnote__head">${head}</div>
        <p class="rnote__body">${noteBodyHtml(body)}</p>
      </article>`;
}

function notesListHtml(raw, lang, t) {
  const entries = parseNotes(raw);
  if (!entries.length) return `<p class="rnotes__empty">${escapeHtml(t.roster_note_empty)}</p>`;
  return entries.map((e) => noteEntryHtml(e, lang, t)).join("");
}

/* `צעד הבא` is one short line by convention (`DD.MM - verb who`). Read at a
   glance in the collapsed row: the date becomes a chip with its age, the verb
   stays plain text, and it WRAPS - this field is the one Ofir called out for
   scrolling sideways, so it may never be a single-line box again. */
function nextActionHtml(v, lang) {
  const str = String(v == null ? "" : v).trim();
  if (!str) return `<span class="roster__none">—</span>`;
  const m = str.match(NOTE_LINE);
  if (!m) return `<span class="roster__next" dir="${textDir(str, "auto")}">${escapeHtml(str)}</span>`;
  const d = noteDate(m[1], m[2]);
  const age = d ? relAge(d, lang, true) : "";
  const rest = str.slice(m[0].length).trim();
  return `<span class="roster__next" dir="${textDir(rest, "auto")}">`
    + `<span class="rnote__chip" dir="ltr">${escapeHtml(m[1])}.${escapeHtml(m[2])}</span>`
    + (age ? `<span class="rnote__age" dir="auto">${escapeHtml(age)}</span>` : "")
    + `<span class="roster__nexttxt">${escapeHtml(rest)}</span></span>`;
}

/* A textarea that grows to fit instead of scrolling. Every free-text control in
   this panel is one of these; nothing here is a single-line input any more. */
function autoGrow(el) {
  if (!el) return;
  el.style.height = "auto";
  const h = el.scrollHeight;
  if (h <= 0) return;                       // hidden row: size it when it opens
  let extra = 0;
  try {
    const cs = getComputedStyle(el);        // scrollHeight excludes the border
    if (cs.boxSizing === "border-box") {
      extra = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
    }
  } catch (e) {}
  el.style.height = (h + extra) + "px";
}

// The 6 CRM funnel stages (order = funnel order). Labels live in I18N[lang].stages.
const CRM_STAGES = ["invited", "interested", "call_booked", "confirmed", "attended", "dropped"];

/* Which rows are expanded, keyed by the PERSON and not by their index - a
   re-fetch can reorder the list, and losing the row you were reading is exactly
   the complaint this panel already had. Survives every re-render of the table. */
const ROSTER_OPEN = new Set();
function rowKey(r) { return r.email ? "e:" + r.email : "i:" + (r.id == null ? "" : r.id); }

// Attribute-safe escape (escapeHtml does not touch quotes; input values need it).
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

// Bind the "Add user" form once per render (outside the re-fetched table body so
// listeners never stack). A lead can be added with a NAME ONLY (email is optional)
// (the migrated allowlist is id-keyed with nullable email). Adds confirmed=false.
function wireRosterAdd(lang) {
  const form = document.querySelector("[data-roster-add]");
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "1";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = form.querySelector("input[name=sname]");
    const emailInput = form.querySelector("input[name=email]");
    const name = (nameInput.value || "").trim();
    const email = (emailInput.value || "").trim().toLowerCase();
    if (!name && !email) return;
    await addUser({ name, email }, lang);
    nameInput.value = "";
    emailInput.value = "";
    nameInput.focus();
  });
}

// Accepts either { name, email } (new add form) or a bare email string (the
// gate-crasher "Add to list" button). Only sends columns that have a value so a
// name-only lead inserts cleanly; a missing `name` column can fail the ADD but
// never the READ/RENDER.
async function addUser(lead, lang) {
  if (typeof lead === "string") lead = { email: lead };
  const payload = { added_by: (AUTH.user && AUTH.user.email) || null };
  if (lead.email) payload.email = lead.email;
  if (lead.name) payload.name = lead.name;
  const { error } = await sb.from("allowlist").insert(payload);
  if (error) console.warn("addUser failed (add only; render unaffected):", error.message);
  // Ignore duplicate errors (already on the list); always re-draw.
  renderRoster(lang);
  return error;
}

// Save edited CRM fields for one row. Guarded so a missing RPC/column can never
// break the table: prefer admin_set_student(); on any failure fall back to a direct
// allowlist update keyed by id (name-only leads) or email. Never throws.
async function saveStudent(key, patch, statusEl, t) {
  const setStatus = (txt, ok) => {
    if (!statusEl) return;
    statusEl.textContent = txt;
    statusEl.classList.toggle("roster__savemsg--err", ok === false);
    statusEl.classList.toggle("roster__savemsg--ok", ok === true);
  };
  try {
    let ok = false;
    // (a) Preferred: the admin_set_student RPC (email-keyed; coalesce keeps old on null).
    if (key.email) {
      const { error } = await sb.rpc("admin_set_student", {
        p_email: key.email,
        p_source: patch.source ?? null,
        p_stage: patch.stage ?? null,
        p_notes: patch.notes ?? null,
        p_phone: patch.phone ?? null,
        p_next_action: patch.next_action ?? null,
        p_evidence_url: null,
      });
      ok = !error;
    }
    // (b) Fallback: direct update. Keyed by id when present (works for name-only
    // leads that the email-keyed RPC cannot reach), else by email.
    if (!ok) {
      let q = sb.from("allowlist").update(patch);
      q = key.id ? q.eq("id", key.id) : q.eq("email", key.email);
      const { error } = await q;
      if (error) throw error;
    }
    setStatus(t ? t.roster_saved : "Saved", true);
  } catch (e) {
    console.warn("saveStudent failed:", e && e.message);
    setStatus(t ? t.roster_save_err : "Save failed", false);
  }
}

async function confirmUser(email, next, lang) {
  await sb.from("allowlist").update({ confirmed: next }).eq("email", email);
  renderRoster(lang);
}

async function removeUser(key, lang) {
  // key may be a bare email (legacy) or { id, email }. Prefer id so name-only
  // leads (nullable email) can still be removed.
  if (typeof key === "string") key = { email: key };
  let q = sb.from("allowlist").delete();
  q = key.id ? q.eq("id", key.id) : q.eq("email", key.email);
  await q;
  renderRoster(lang);
}

async function renderRoster(lang) {
  const host = document.querySelector("[data-roster]");
  if (!host) return;
  const t = I18N[lang];
  const { data: rows, error } = await sb.rpc("admin_roster");
  if (error) { host.innerHTML = `<p class="roster__empty">${t.roster_empty}</p>`; return; }
  if (!rows || rows.length === 0) {
    host.innerHTML = `<p class="roster__empty">${t.roster_empty}</p>`;
    return;
  }
  // Per-row edit keys (id preferred so name-only leads with nullable email still
  // save/remove). Guarded: any of these CRM fields may be absent if the migration
  // has not run yet; every read defaults, so the table always renders.
  const keys = rows.map((r) => ({ id: r.id ?? null, email: r.email || null }));

  const stageSelect = (i, cur) => `<select class="roster__stage roster__stage--${escapeHtml(cur)}" data-stage-select data-field="stage" data-i="${i}" aria-label="${t.roster_col_stage}">
        ${CRM_STAGES.map((s) => `<option value="${s}"${s === cur ? " selected" : ""}>${escapeHtml(t.stages[s] || s)}</option>`).join("")}
      </select>`;

  const body = rows.map((r, i) => {
    // Access pill (can they sign in) is SEPARATE from the CRM stage (funnel).
    let pill;
    if (!r.on_list) pill = `<span class="roster__badge roster__badge--warn">${t.roster_pill_uninvited}</span>`;
    else if (r.confirmed) pill = `<span class="roster__badge roster__badge--ok">${t.roster_pill_confirmed}</span>`;
    else pill = `<span class="roster__badge">${t.roster_pill_pending}</span>`;

    const when = r.signed_in ? rosterWhen(r.first_signed_in_at, lang) : null;
    const signedIn = r.signed_in
      ? `<span class="roster__yes" title="${escapeAttr(when ? when.title : "")}">${I.check}
           <span class="roster__whenrel" dir="auto">${escapeHtml(when && when.rel ? when.rel : "")}</span>
           <span class="roster__whenabs" dir="auto">${escapeHtml(when ? when.stamp : "")}</span></span>`
      : `<span class="roster__no">${t.roster_signedin_no}</span>`;

    // CRM fields, all guarded (undefined -> default) so a missing column is safe.
    const stage = CRM_STAGES.includes(r.stage) ? r.stage : "invited";
    const source = r.source || "";
    const next = r.next_action || "";
    const notes = r.notes || "";
    const phone = r.phone || "";
    const name = r.name || r.full_name || "";

    // Actions: gate-crasher -> Add to list; on-list -> confirm (email only) + remove.
    let actions;
    if (!r.on_list) {
      actions = `<button type="button" class="btn btn--ghost btn--sm" data-add="${escapeAttr(r.email || "")}">${t.roster_add_to_list}</button>`;
    } else {
      const confirmBtn = r.email
        ? `<button type="button" class="btn ${r.confirmed ? "btn--ghost" : "btn--primary"} btn--sm" data-confirm="${escapeAttr(r.email)}" data-next="${r.confirmed ? "0" : "1"}">${r.confirmed ? t.roster_unconfirm : t.roster_confirm}</button>`
        : "";
      actions = `${confirmBtn}
         <button type="button" class="btn btn--ghost btn--sm roster__remove" data-remove-i="${i}" aria-label="${t.roster_remove}" data-tooltip="${t.roster_remove}">${I.x}</button>`;
    }

    // Name and email are ONE cell (the email is a second line, not a column of
    // its own) and so are the access pill and the signed-in moment. Two fewer
    // columns is what buys `מקור` and `צעד הבא` enough width to be read without
    // clicking - which is the whole complaint.
    const person = `<span class="roster__person">
          <span class="roster__pname" dir="${textDir(name, "auto")}">${escapeHtml(name) || `<span class="roster__none">—</span>`}</span>
          ${r.email ? `<span class="roster__pmail" dir="ltr">${escapeHtml(r.email)}</span>` : ""}
        </span>`;

    const open = ROSTER_OPEN.has(rowKey(r));

    // Main row (scannable) + a detail row (edit source/next/phone + the note log).
    return `
      <tr class="roster__row">
        <td class="roster__expandcell">
          <button type="button" class="roster__expand${open ? " is-open" : ""}" data-expand="${i}" aria-expanded="${open ? "true" : "false"}" aria-label="${t.roster_details}" data-tooltip="${t.roster_details}">${I.chev}</button>
        </td>
        <td data-label="${t.roster_col_name}" class="roster__stack">${person}</td>
        <td data-label="${t.roster_col_status}"><span class="roster__access">${pill}${signedIn}</span></td>
        <td data-label="${t.roster_col_stage}">${stageSelect(i, stage)}</td>
        <td data-label="${t.roster_col_source}" class="roster__stack roster__free" dir="${textDir(source, "auto")}">${escapeHtml(source) || `<span class="roster__none">—</span>`}</td>
        <td data-label="${t.roster_col_next}" class="roster__stack roster__nextcell">${nextActionHtml(next, lang)}</td>
        <td class="roster__actions" data-label="${t.roster_col_actions}"><span class="roster__actionwrap">${actions}</span></td>
      </tr>
      <tr class="roster__detailrow" data-detail="${i}"${open ? "" : " hidden"}>
        <td colspan="7">
          <div class="roster__detail">
            <label class="roster__field">
              <span class="roster__fieldlbl">${t.roster_col_source}</span>
              <textarea class="roster__ta" data-field="source" data-i="${i}" data-grow rows="1" dir="auto" placeholder="${escapeAttr(t.roster_source_ph)}">${escapeHtml(source)}</textarea>
            </label>
            <label class="roster__field">
              <span class="roster__fieldlbl">${t.roster_col_next}</span>
              <textarea class="roster__ta" data-field="next_action" data-i="${i}" data-grow rows="1" dir="auto" placeholder="${escapeAttr(t.roster_next_ph)}">${escapeHtml(next)}</textarea>
            </label>
            <label class="roster__field">
              <span class="roster__fieldlbl">${t.roster_col_phone}</span>
              <input class="roster__input roster__input--sm" type="tel" data-field="phone" data-i="${i}" dir="ltr" value="${escapeAttr(phone)}" placeholder="${escapeAttr(t.roster_phone_ph)}" autocomplete="off" />
            </label>
            <div class="roster__field roster__field--wide rnotes">
              <span class="roster__fieldlbl">${t.roster_col_notes}</span>
              <div class="rnotes__add">
                <textarea class="roster__ta rnotes__new" data-note-new="${i}" data-grow rows="1" dir="auto" placeholder="${escapeAttr(t.roster_notes_ph)}"></textarea>
                <button type="button" class="btn btn--ghost btn--sm rnotes__addbtn" data-note-add="${i}">${I.check}<span>${t.roster_note_add}</span></button>
              </div>
              <div class="rnotes__list" data-note-list="${i}">${notesListHtml(notes, lang, t)}</div>
              <textarea class="rnotes__raw" data-field="notes" data-i="${i}" hidden aria-hidden="true" tabindex="-1">${escapeHtml(notes)}</textarea>
            </div>
            <div class="roster__detailbar">
              <button type="button" class="btn btn--primary btn--sm" data-save="${i}">${t.roster_save}</button>
              <span class="roster__savemsg" data-savemsg="${i}" role="status" aria-live="polite"></span>
            </div>
          </div>
        </td>
      </tr>`;
  }).join("");

  // The colgroup + table-layout:fixed is what makes "nothing scrolls sideways"
  // a guarantee rather than a hope: no cell can widen the table, so long text
  // has nowhere to go but down. `צעד הבא` takes the leftover width on purpose.
  host.innerHTML = `
    <div class="roster__scroll">
      <table class="roster__table roster__table--crm roster__table--fixed">
        <colgroup>
          <col class="rc-chev" /><col class="rc-person" /><col class="rc-access" />
          <col class="rc-stage" /><col class="rc-source" /><col class="rc-next" />
          <col class="rc-actions" />
        </colgroup>
        <thead><tr>
          <th aria-hidden="true"></th>
          <th>${t.roster_col_name}</th>
          <th>${t.roster_col_status}</th>
          <th>${t.roster_col_stage}</th>
          <th>${t.roster_col_source}</th>
          <th>${t.roster_col_next}</th>
          <th>${t.roster_col_actions}</th>
        </tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;

  // Expand/collapse the detail row. A textarea can only measure itself once it
  // is actually visible, so every grower in the panel is sized on open.
  host.querySelectorAll("[data-expand]").forEach((b) =>
    b.addEventListener("click", () => {
      const i = b.getAttribute("data-expand");
      const dr = host.querySelector(`[data-detail="${i}"]`);
      if (!dr) return;
      const opening = dr.hasAttribute("hidden");
      if (opening) dr.removeAttribute("hidden"); else dr.setAttribute("hidden", "");
      b.setAttribute("aria-expanded", opening ? "true" : "false");
      b.classList.toggle("is-open", opening);
      if (opening) ROSTER_OPEN.add(rowKey(rows[i])); else ROSTER_OPEN.delete(rowKey(rows[i]));
      if (opening) dr.querySelectorAll("textarea[data-grow]").forEach(autoGrow);
    }));

  // Free-text fields grow instead of scrolling. Rows that are already open when
  // the table paints get sized now; the rest are sized when they open.
  host.querySelectorAll("textarea[data-grow]").forEach((ta) => {
    ta.addEventListener("input", () => autoGrow(ta));
    autoGrow(ta);
  });

  /* Add one note entry. The date is stamped here, the line is PREPENDED to the
     raw value, and nothing already in it is touched - append-only is a property
     of the code path, not a rule anyone has to remember. It saves immediately:
     an entry that survives only until the admin remembers to press שמירה does
     not survive. */
  const addNote = (i) => {
    const ta = host.querySelector(`[data-note-new="${i}"]`);
    const raw = host.querySelector(`.rnotes__raw[data-i="${i}"]`);
    if (!ta || !raw) return;
    const typed = (ta.value || "").replace(/\s*\r?\n\s*/g, " ").trim();
    if (!typed) return;
    const line = NOTE_LINE.test(typed) ? typed : `${noteStampToday()} - ${typed}`;
    const prev = raw.value.replace(/^\s+|\s+$/g, "");
    raw.value = prev ? line + "\n" + prev : line;
    ta.value = "";
    autoGrow(ta);
    const list = host.querySelector(`[data-note-list="${i}"]`);
    if (list) list.innerHTML = notesListHtml(raw.value, lang, t);
    const patch = {};
    host.querySelectorAll(`[data-field][data-i="${i}"]`).forEach((el) => {
      patch[el.getAttribute("data-field")] = el.value;
    });
    saveStudent(keys[i], patch, host.querySelector(`[data-savemsg="${i}"]`), t);
  };
  host.querySelectorAll("[data-note-add]").forEach((b) =>
    b.addEventListener("click", () => addNote(b.getAttribute("data-note-add"))));
  host.querySelectorAll("[data-note-new]").forEach((ta) =>
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); addNote(ta.getAttribute("data-note-new")); }
    }));

  // Stage change: recolor + save immediately (stage is the must-have field).
  host.querySelectorAll("[data-stage-select]").forEach((sel) =>
    sel.addEventListener("change", () => {
      const i = sel.getAttribute("data-i");
      sel.className = "roster__stage roster__stage--" + sel.value;
      const statusEl = host.querySelector(`[data-savemsg="${i}"]`);
      saveStudent(keys[i], { stage: sel.value }, statusEl, t);
    }));

  // Save the edited detail fields (source / next_action / phone / notes + stage).
  host.querySelectorAll("[data-save]").forEach((b) =>
    b.addEventListener("click", () => {
      const i = b.getAttribute("data-save");
      const patch = {};
      host.querySelectorAll(`[data-field][data-i="${i}"]`).forEach((el) => {
        patch[el.getAttribute("data-field")] = el.value;
      });
      const statusEl = host.querySelector(`[data-savemsg="${i}"]`);
      saveStudent(keys[i], patch, statusEl, t);
    }));

  host.querySelectorAll("[data-confirm]").forEach((b) =>
    b.addEventListener("click", () => confirmUser(b.getAttribute("data-confirm"), b.getAttribute("data-next") === "1", lang)));
  host.querySelectorAll("[data-remove-i]").forEach((b) =>
    b.addEventListener("click", () => removeUser(keys[b.getAttribute("data-remove-i")], lang)));
  host.querySelectorAll("[data-add]").forEach((b) =>
    b.addEventListener("click", () => addUser(b.getAttribute("data-add"), lang)));
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

/* ---- #/kit — the branded "here's your kit" landing page ------------------
   Ofir, 2026-08-31: a participant currently gets a raw zip URL
   (productlab.studio/assets/product-lab.zip) sent by hand. This route
   replaces the LINK they click; the direct zip stays the actual download
   target underneath (KIT_ZIP_URL, same one #/prep's kit tile already uses).
   Public, no auth gate — the people who reach this link already registered.

   FULL-BLEED direction, Ofir's own pick after comparing two mockups: no
   card, no boundary — character + text + button sit directly on the
   illustration's own cream background (var(--pl-intro-cream)), edge to
   edge, one continuous surface. Header stays (so the EN/HE toggle is
   reachable) but there is deliberately no footer or second button — Ofir's
   own words, "clean, no noise," and the header's own clickable wordmark
   already covers "back to the main site."

   ONE VIEWPORT, NO SCROLL (Ofir, 2026-08-31): this is a single moment, not
   a scrolling page — see .kit-page/.kitfull in styles.css, verified with
   real rendered heights at both 390x844 and 375x667.

   The character illustration is Marketing Designer's asset: Dean, the
   established host puppet, holding the kit as a wrapped gift, matted with a
   real alpha channel (2026-08-31) — no fill color of its own, so there is
   nothing to color-match against the page background. Recommendation + swap
   map: `projects/product-lab/brand/kit-landing/CAST.md` (this repo). */
function renderKit(lang) {
  const t = I18N[lang];
  document.getElementById("app").innerHTML = `
  ${navHeader(t, lang)}

  <main id="top" class="page kit-page kitfull reveal">
    <picture class="kitfull__illo">
      <source type="image/webp" srcset="assets/kit/kit-hero-dean.webp" />
      <img src="assets/kit/kit-hero-dean.png" alt="" width="1024" height="1536" decoding="async" />
    </picture>
    <div class="wrap narrow kitfull__body">
      <span class="eyebrow">${t.kit_eyebrow}</span>
      <h1 class="section-title">${t.kit_title}</h1>
      <p class="login__sub">${t.kit_sub}</p>
      <div class="cta-row kitfull__cta">
        <a class="btn btn--primary" href="${KIT_ZIP_URL}" download data-kit-download>${I.repeat}${t.kit_btn_download}</a>
      </div>
    </div>
  </main>

  ${studentModal(t)}`;

  afterRender();
  wireKitAutoDownload();
}

/* Auto-fires the download once per page entry via a real, off-screen
   `<a download>` click — never a location redirect, so the tab is never
   navigated away from this page. The visible "download again" button is the
   SAME href/download pair as a plain link, so it still works anywhere a
   script-fired click is blocked (iOS Safari, some in-app browsers): a real
   tap on a real `<a download>` always works, independent of this function.
   Timing: if the intro curtain (#pl-intro) is on screen, wait for it to lift
   (assets/intro.js's LIFT=2630ms) before firing, so the browser's download
   UI doesn't appear before the headline is even visible; skip the wait
   entirely when there's no curtain to wait for (repeat visit same session,
   reduced motion, or intro.js failed to load — this download must not
   depend on the veil, which is explicitly optional by its own contract). */
let kitAutoFired = false;
function wireKitAutoDownload() {
  kitAutoFired = false;
  const curtain = document.getElementById("pl-intro");
  const delay = curtain ? 2900 : 500;
  window.setTimeout(() => {
    if (kitAutoFired) return;
    kitAutoFired = true;
    try {
      const a = document.createElement("a");
      a.href = KIT_ZIP_URL;
      a.setAttribute("download", "");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.setTimeout(() => { if (a.parentNode) a.parentNode.removeChild(a); }, 0);
    } catch (e) { /* the visible "download again" button still works */ }
  }, delay);
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
   (the single source of truth), then flips to a check glyph for 2s and resets.
   The button is icon-only, so the confirmation is the ICON plus the aria-label
   and tooltip - both move to "Copied" together, per the icon-only tooltip rule.
   Reads from the data model, not the DOM, so whitespace is preserved exactly. */
function wirePrompts() {
  const src = (window.WORKSHOP_CONTENT && window.WORKSHOP_CONTENT.prompts) || {};
  document.querySelectorAll("[data-copy-key]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = src[btn.getAttribute("data-copy-key")] || "";
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add("is-copied");
        btn.innerHTML = I.check;
        btn.setAttribute("aria-label", "Copied");
        btn.setAttribute("data-tooltip", "Copied");
        setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.innerHTML = I.copy;
          btn.setAttribute("aria-label", "Copy");
          btn.setAttribute("data-tooltip", "Copy");
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
/* Clears the Supabase session and returns to the main page. onAuthStateChange
   fires on sign-out and re-routes; we also navigate home so a signed-out user
   never sits on the gated prep page. */
function wireSignout() {
  document.querySelectorAll("[data-signout]").forEach((b) =>
    b.addEventListener("click", async () => {
      if (IS_LOCAL) {
        try { localStorage.removeItem(LOCAL_TIER_KEY); } catch (e) {}
        AUTH = { user: null, tier: null, denied: false };
      } else {
        await sb.auth.signOut();
      }
      if (location.hash === "#/" || location.hash === "") {
        route(document.documentElement.lang || "he");
      } else {
        location.hash = "#/";
      }
    }));
}

/* Post-render wiring shared by every page. */
/* A WebKit sticky-header fix (forcing a reflow on the nav after every render,
   plus a delayed retry and a `pageshow` listener) used to live here. .nav is
   `position: fixed` now (2026-08-31, styles.css), which has no sticky
   initialization state to ever need re-triggering — so this whole family of
   patches is gone, not just quieted. Keeping it would have meant flickering
   the header (display:none -> reflow -> "") on every render for a bug that
   no longer exists in the CSS underneath it. */
function afterRender() {
  wireLang();
  wireReveal();
  wireHeroImage();
  wireStudent();
  wireNotices();
  wireRegister();
  wireNav();
  wireAccountMenu();
  wireSignout();
  wirePrompts();
  wireWhyCursors();
}

/* ---- Router — hash routes: #/prep, #/kit, #/privacy, #/terms, else home --- */
function currentRoute() {
  // Strip any query suffix (e.g. #/prep?lang=en) before matching the route.
  const h = (location.hash || "").replace(/^#\/?/, "").split("?")[0];
  if (h === "prep") return "prep";
  if (h === "kit") return "kit";
  if (h === "privacy") return "privacy";
  if (h === "terms") return "terms";
  return "home";
}
/* The page repaints only when the ANSWER to "who is signed in" changes.
   supabase-js re-emits auth events when the window regains focus and when the
   token refreshes after a few minutes away; repainting on those threw the admin
   off the students tab, closed every expanded row and discarded anything typed
   but not saved. This gates the REPAINT only - loadAuth(), the my_access() call,
   the sign-out-on-denied path and RLS are untouched. */
let PAINTED_AUTH = null;
function authFingerprint() {
  return [AUTH.user ? AUTH.user.id : "", AUTH.tier || "", AUTH.denied ? "1" : "0"].join("|");
}

function route(lang) {
  PAINTED_AUTH = authFingerprint();
  /* The three modal systems (student sign-in, notices, register) all lock
     scroll via body.modal-open, and each only clears it from its OWN close()
     button. That class lives on <body>, outside the #app subtree every
     render()/renderPrep() call below replaces wholesale — so a modal left
     open across a route change (e.g. the denied-notice race in loadAuth()
     firing during a sign-out redirect: wireSignout's hashchange render can
     land before the async onAuthStateChange -> loadAuth() re-check finishes,
     so a stray "denied" classification opens the notice on one render and a
     later render never runs that notice's own close()) is ORPHANED: the
     visible modal is gone (fresh DOM, hidden by default) but the scroll lock
     survives, and only a hard reload clears it. Clearing it unconditionally
     on every route entry, before anything re-renders, makes that structurally
     impossible — a route change never inherits scroll lock from the page it
     left. Any render that legitimately needs the lock re-opens it itself
     (afterRender() -> wireStudent()'s pendingStudentOpen, etc.), same as always. */
  document.body.classList.remove("modal-open");
  const r = currentRoute();
  if (r === "prep") renderPrep(lang);
  else if (r === "kit") renderKit(lang);
  else if (r === "privacy") renderLegal(lang, "privacy");
  else if (r === "terms") renderLegal(lang, "terms");
  else render(lang);
}

/* ---- Student sign-in (real Google OAuth via Supabase) -------------------- */
/* The modal's one button hands off to sb.auth.signInWithOAuth. The page
   re-renders on return via onAuthStateChange (see Boot). If a gated redirect
   asked for it, auto-open the modal on render. */
function wireStudent() {
  const modal = document.querySelector("[data-student-modal]");
  if (!modal) return;
  const open = () => { modal.hidden = false; document.body.classList.add("modal-open"); };
  const close = () => { modal.hidden = true; document.body.classList.remove("modal-open"); };
  document.querySelectorAll("[data-student-open]").forEach((b) => b.addEventListener("click", open));
  modal.querySelectorAll("[data-student-close]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  // Sign-in. PRODUCTION: hand off to Google via Supabase (full-page redirect back
  // to productlab.studio; onAuthStateChange re-routes on return). LOCAL: Google
  // can't return to localhost, so fake a sign-in (no Google) and go to the zone.
  modal.querySelector("[data-google-signin]")?.addEventListener("click", () => {
    if (IS_LOCAL) {
      try { localStorage.setItem(LOCAL_TIER_KEY, "admin"); } catch (e) {}
      close();
      loadAuth().then(() => {
        if (location.hash === "#/prep") route(document.documentElement.lang || "he");
        else location.hash = "#/prep";
      });
      return;
    }
    sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: location.origin + location.pathname },
    });
  });

  if (pendingStudentOpen) { pendingStudentOpen = false; open(); }
}

/* ---- Auth notice popups (denied sign-in + registration-not-open) --------- */
/* Two reusable notices share one open/close mechanism (data-notice). "Register"
   in the sign-in modal opens the placeholder note; a denied Google sign-in
   auto-opens the "not registered" note. deniedNotice stays TRUE (so async
   re-renders after sign-out keep re-opening it, not flashing it away) and is
   cleared only when the user actually closes the note. */
function wireNotices() {
  const notices = [...document.querySelectorAll("[data-notice]")];
  if (!notices.length) return;
  const openNotice = (key) => {
    const n = document.querySelector(`[data-notice="${key}"]`);
    if (!n) return;
    n.hidden = false;
    document.body.classList.add("modal-open");
  };
  const closeAll = () => {
    deniedNotice = false;               // user dismissed it → don't reopen on re-render
    notices.forEach((n) => (n.hidden = true));
    document.body.classList.remove("modal-open");
  };
  notices.forEach((n) =>
    n.querySelectorAll("[data-notice-close]").forEach((b) => b.addEventListener("click", closeAll)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && notices.some((n) => !n.hidden)) closeAll();
  });
  // Auto-open the "not registered" note after a denied sign-in; kept open across
  // the sign-out-triggered re-render until the user closes it.
  if (deniedNotice) openNotice("denied");
}

/* ---- Register-your-interest form ----------------------------------------- */
/* Opens from the "Register" button inside the sign-in modal. Validates first +
   last + a valid-looking email client-side (note optional), then writes a lead
   via sb.rpc('register_lead', ...) — which fires an instant email to Ofir
   server-side. Guards against double-submit (button disabled + spinner while in
   flight). On success swaps the card to the success view; on error shows the
   inline try-again note. LOCAL fakes the write (Google/OAuth can't return to
   localhost either) so QA never emails Ofir — production does the real RPC. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function wireRegister() {
  const modal = document.querySelector("[data-register-modal]");
  if (!modal) return;
  const form = modal.querySelector("[data-register-form]");
  const errorEl = modal.querySelector("[data-register-error]");
  const submitBtn = modal.querySelector("[data-register-submit]");
  const formView = modal.querySelector('[data-register-view="form"]');
  const successView = modal.querySelector('[data-register-view="success"]');
  let submitting = false;

  const open = () => { modal.hidden = false; document.body.classList.add("modal-open"); };
  const close = () => { modal.hidden = true; document.body.classList.remove("modal-open"); };

  // "Register" in the sign-in modal → close it, open the form.
  document.querySelectorAll("[data-register-open]").forEach((b) =>
    b.addEventListener("click", () => {
      const sm = document.querySelector("[data-student-modal]");
      if (sm) sm.hidden = true;
      open();
    }));
  modal.querySelectorAll("[data-register-close]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  const setLoading = (on) => {
    submitting = on;
    submitBtn.disabled = on;
    submitBtn.classList.toggle("is-loading", on);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitting) return;                         // hard guard against double-submit
    if (errorEl) errorEl.hidden = true;

    const first = form.first.value.trim();
    const last = form.last.value.trim();
    const email = form.email.value.trim();
    const note = form.note.value.trim();

    // Client-side: require first + last + a valid-looking email (note optional).
    if (!first || !last || !EMAIL_RE.test(email)) {
      const missing = !first ? form.first : !last ? form.last : form.email;
      missing.focus();
      return;
    }

    setLoading(true);
    try {
      if (IS_LOCAL) {
        // QA path: don't hit the live RPC (it emails Ofir). Fake the round-trip.
        await new Promise((r) => setTimeout(r, 600));
      } else {
        const { error } = await sb.rpc("register_lead", {
          first_name: first,
          last_name: last,
          email,
          note: note || null,
        });
        if (error) throw error;
      }
      formView.hidden = true;
      successView.hidden = false;
    } catch (err) {
      console.warn("register_lead failed:", err && err.message);
      if (errorEl) errorEl.hidden = false;
    } finally {
      setLoading(false);
    }
  });
}

/* ---- Language ------------------------------------------------------------ */
// A shareable ?lang=en / ?lang=he param forces the site to load in that
// language on first paint (overrides the saved pl_lang), so a link like
// productlab.studio/?lang=en opens in English. Works with the hash router too,
// reading either the query string or a query embedded in the hash route.
function urlLang() {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "he") return q;
    const i = location.hash.indexOf("?");
    if (i !== -1) {
      const hq = new URLSearchParams(location.hash.slice(i + 1)).get("lang");
      if (hq === "en" || hq === "he") return hq;
    }
  } catch (e) {}
  return null;
}
function setLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "he" ? "rtl" : "ltr";
  try { localStorage.setItem("pl_lang", lang); } catch (e) {}
  route(lang);
}
function wireLang() {
  // Mobile tray: quiet text toggle that flips language on each tap.
  document.querySelectorAll("[data-toggle-lang]").forEach((lt) =>
    lt.addEventListener("click", () =>
      setLang(document.documentElement.lang === "he" ? "en" : "he")));

  // Desktop: globe button opens a dropdown to pick a specific language.
  const wrap = document.querySelector("[data-langswitch]");
  if (wrap) {
    const btn = wrap.querySelector("[data-langswitch-toggle]");
    const menu = wrap.querySelector("[data-langswitch-menu]");
    const setOpen = (o) => {
      menu.hidden = !o;
      wrap.classList.toggle("is-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
    };
    btn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(menu.hidden); });
    wrap.querySelectorAll("[data-set-lang]").forEach((item) =>
      item.addEventListener("click", () => { setOpen(false); setLang(item.getAttribute("data-set-lang")); }));
    document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }
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
(async function () {
  let lang = "he";
  try { lang = localStorage.getItem("pl_lang") || "he"; } catch (e) {}
  // A ?lang= param in the shareable URL wins over the saved preference, forcing
  // the requested language on first paint (default stays Hebrew when absent).
  const forcedLang = urlLang();
  if (forcedLang) lang = forcedLang;
  // Detect a fresh Google OAuth return (supabase-js will parse + clean these
  // params). Captured synchronously before loadAuth so we can land the user
  // straight in the vault instead of on the home page.
  const oauthReturn = /access_token|[?&#]code=|error_description/.test(location.hash + location.search);

  // Paint the signed-out shell immediately, before awaiting the network round
  // trip to Supabase below. Until this line, render()/route() only ran AFTER
  // `await loadAuth()` resolved, which left #app - and .nav inside it -
  // completely absent from the DOM for however long that request took
  // (worse on a slow mobile connection, e.g. a WhatsApp-shared link).
  // Painting on the very first tick the script runs, with AUTH still at its
  // safe signed-out default, removes that gap outright instead of racing to
  // patch it after the fact. loadAuth() below still repaints with the real
  // auth state once it resolves (existing behavior).
  if (!oauthReturn) setLang(lang);

  await loadAuth();

  // React to later auth changes (sign-in, sign-out, token refresh, other tabs).
  // Keep the callback non-async (loadAuth().then) per supabase-js guidance.
  sb.auth.onAuthStateChange(() => {
    loadAuth().then(() => {
      // Same person, same tier -> nothing on screen is stale, so leave the admin
      // exactly where he was (tab, open rows, scroll, half-typed note).
      if (PAINTED_AUTH !== null && authFingerprint() === PAINTED_AUTH) return;
      route(document.documentElement.lang || "he");
    });
  });

  if (oauthReturn && AUTH.tier) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    try { localStorage.setItem("pl_lang", lang); } catch (e) {}
    location.hash = "#/prep"; // triggers hashchange → renderPrep
    route(lang);
  } else {
    setLang(lang);
  }
})();

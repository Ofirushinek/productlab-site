/* =============================================================================
   PRODUCT LAB — one-pager render + EN/HE toggle + RTL.
   ALL copy lives in the I18N object below (final copy from Copywriter,
   productlab-onepager-copy.md, 2026-08-03). To update copy, edit strings here.
   OPEN: Section 7 bio ([X years]/role) + Section 8 testimonials are labeled
   placeholders for OFIR to fill. Booking link is live (Calendly); WhatsApp
   number is still a placeholder (wa.me) pending Ofir's number.
   ========================================================================== */

const BOOK_URL = "https://calendly.com/ofir-rushinek/productlab"; // live
const WA_URL   = "https://wa.me/972542259730";                    // Ofir: 054-2259730

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
  laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9M2 20h20"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.3 6.3 3.5 3.5M20.5 20.5l-2.8-2.8M17.7 6.3l2.8-2.8M3.5 20.5l2.8-2.8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  seat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M5 9a2 2 0 0 0-2 2v5h18v-5a2 2 0 0 0-2-2M5 16v3M19 16v3"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-7.4-4.9L3 15"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  claude: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7v10l10 5 10-5V7L12 2ZM2 7l10 5 10-5M12 22V12"/></svg>',
  login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>',
};

/* ---- COPY (final, Copywriter 2026-08-03) -------------------------------- */
const I18N = {
  he: {
    nav_book: "לתאם שיחה",
    cta_book: "לתאם שיחה",
    cta_wa: "דברו איתי",
    nav_student: "כניסת תלמידים",
    hero_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    hero_title_a: "לצאת עם ",
    hero_title_mark: "צוות משלך",
    hero_title_b: ", ועם דרך חדשה לבנות כל דבר.",
    hero_sub: "מפגש חי אחד, שלוש שעות, למי שרוצה לבנות עם AI, לא רק להשתמש בו. מקימים צוות סוכנים שעובד בשיטה שלך, ובונים איתו משהו אמיתי עוד לפני שהולכים הביתה.",
    hero_points: ["מפגש בן שלוש שעות", "צוות סוכני AI", "כוח־על של בנייה"],

    why_eyebrow: "למה עכשיו",
    why_title: "הדרך שבה בונים מוצר משתנה. אתה יכול להוביל אותה.",
    why_body: "לפני שנה, לבנות עם צוות של סוכני AI היה הדגמה של חוקרים. היום זו כבר הדרך שבה יותר ויותר אנשי מוצר עובדים באמת, וכמעט אף אחד עדיין לא הפך את זה למשהו שאפשר ללמוד בתוך אחר צהריים אחד. זה בדיוק אחר הצהריים הזה. תיכנס עכשיו, כל עוד זה עדיין יתרון.",

    walk_eyebrow: "מה לוקחים הביתה",
    walk_title: "עם מה תצא מפה",
    walk_items: [
      { t: "צוות AI משלך.", b: "הסוכנים שתקים במפגש, מכוונים לעבוד לצידך." },
      { t: "זיכרון משותף שכולם שואבים ממנו,", b: "כך שהם נעשים חדים יותר ככל שאתם עובדים יחד." },
      { t: "שיטת עבודה שאפשר לחזור עליה", b: "כבר ביום שני בבוקר, בפרויקטים שלך." },
      { t: "דבר אמיתי אחד שבנית במפגש עצמו,", b: "לא שקופית שמספרת עליו." },
    ],

    who_eyebrow: "למי זה מתאים",
    who_for_title: "מתאים ל",
    who_tiles: [
      { t: "מעצבי מוצר", b: "מעצבים שמרגישים שהם מאבדים אחיזה במשחק ה-AI ורוצים להיות צעד קדימה, עם הכלים והבסיס להמשיך משם. גם מובילי עיצוב, וגם המעצב היחיד שהוא כל צוות העיצוב." },
      { t: "בונים", b: "כל מי שרוצה לבנות משהו, אבל מרגיש שחסר לו הבסיס, עם מי להתייעץ, ואיך לנהל את זה בצורה בת-קיימא." },
      { t: "הצעד הבא עם AI", b: "כל מי שרוצה להוציא את המרב ממה ש-AI מציע היום. לנהל עסק עצמאי, לאטמט משימות, או לצמצם עבודה ידנית שחוזרת על עצמה." },
    ],
    who_not: "מתאים פחות למי שמחפש כפתור קסם. אם בא לך להפשיל שרוולים ולבנות בעצמך, יש לך מקום סביב השולחן.",

    agenda_eyebrow: "שלוש שעות",
    agenda_title: "שלוש שעות, מהתחלה עד הסוף",
    agenda_phases: [
      { time: "30 דקות", t: "להבין את השטח", b: "מה בונים, למה דווקא הכלים האלה, ואיפה הטכנולוגיה עומדת בדיוק עכשיו." },
      { time: "כ-90 דקות", t: "להקים את הצוות", b: "מרימים את צוות ה-AI שלך מפרומפטים מוכנים, מחוברים לזיכרון משותף." },
      { time: "כ-60 דקות", t: "לבנות משהו אמיתי", b: "מפעילים את הצוות ומוציאים לפועל דבר אמיתי אחד, ביחד." },
    ],

    proof_eyebrow: "הוכחה, לא הבטחה",
    proof_title: "בנוי בדיוק כמו שתבנה",
    proof_lead: "שום דבר פה הוא לא הדמיה של הרעיון. זה הרעיון עצמו, פועל.",
    proof_self_tag: "הדף הזה",
    proof_self_t: "הדף הזה",
    proof_self_b: "עוצב ונבנה על ידי אותו סוג של צוות AI שתקים, בעבודה משותפת עם אופיר.",
    proof_glimps_tag: "מוצר אמיתי",
    proof_glimps_t: "Glimps",
    proof_glimps_b: "מוצר אמיתי, שנבנה ככה. תראה בעצמך.",
    proof_glimps_link: "לצפייה ב-Glimps",

    ofir_eyebrow: "למה שיחה איתי",
    roster_title: "אני, והצוות שבניתי",
    lead_label: "מוביל הסדנה",
    crew_label: "צוות הסוכנים שמלווה אותך",
    ofir_name: "אופיר רושינק",
    ofir_role: "ראש הצוות",
    agents: [
      { img: "agent-cto", role: "CTO", b: "אחראי על הבסיס הטכני, ולוקח רעיון גולמי והופך אותו למשהו שבאמת רץ." },
      { img: "agent-cpo", role: "CPO", b: "אחראי על המוצר, ומחליט מה שווה לבנות וממה לוותר." },
      { img: "agent-pd", role: "מעצב מוצר", b: "אחראי על הקראפט, וגורם לכל החלטה להיראות ולהרגיש נכון עד הפרט האחרון." },
    ],
    ofir_bio: "אני אופיר. שתים עשרה שנה בעיצוב מוצר, רובן בהובלת צוותי עיצוב שהקמתי מאפס, בסייבר, בשירות שטח, במדיה ועוד. בזמן האחרון אני בונה עם צוותי AI כל יום, וככה בניתי את Glimps, מוצר חי. כשנדבר, לא תקבל תיאוריה, אלא איך אני עובד באמת היום.",
    ofir_why: "המפגש בהזמנה בלבד וקטן בכוונה. לפני שמצטרפים, אני רוצה שנדבר. מה אתה בונה, ואם זה מתאים לך. בלי פיץ'. תתאם זמן ונדבר.",

    quotes_eyebrow: "המלצות",
    quotes_title: "ממי שכבר עבר את זה",
    quotes: [
      { q: "[ציטוט - ממתין לאופיר]", n: "שם", m: "תפקיד, חברה" },
      { q: "[ציטוט - ממתין לאופיר]", n: "שם", m: "תפקיד, חברה" },
    ],

    incl_eyebrow: "הפרטים",
    incl_title: "כל מה שצריך לדעת",
    // ONE unified accordion. `open:true` = logistics facts shown by default.
    detail_items: [
      { ico: "seat",     q: "איפה ואיך זה מתנהל?", a: "מפגש חי ופיזי בקבוצה קטנה. נפגשים פנים אל פנים, כדי שלכל אחד תהיה תשומת לב אישית." },
      { ico: "clock",    q: "כמה זמן זה לוקח?", a: "כשלוש שעות רצופות עם הפסקה אחת. מגיעים בלי צוות AI, יוצאים עם אחד." },
      { ico: "hand",     q: "אני בונה בעצמי או צופה?", a: "בונה לאורך כל הדרך, לא צופה מהצד. יוצאים עם משהו אמיתי שבנית בעצמך." },
      { ico: "laptop",   q: "צריך לדעת לתכנת?", a: "לא. אם אתה יודע לכתוב בריף ברור, אתה יכול לעשות את זה. בונים על Claude, בשפה רגילה, בלי קוד." },
      { ico: "box",      q: "מה צריך להביא?", a: "לפטופ וחשבון Claude. זהו. נגיד לך מה להכין עוד לפני המפגש." },
      { ico: "spark",    q: "זה באמת מפגש אחד?", a: "כן. אתה יוצא עם צוות AI עובד ועם משהו אמיתי שבנית. לאן לוקחים את זה משם, כבר תלוי בך." },
      { ico: "users",    q: "זה לצוותים או ליחידים?", a: "לשניהם. אפשר לבוא כמעצב יחיד, או להביא כמה אנשים מהצוות." },
      { ico: "calendar", q: "ומה אם אני לא יכול בתאריך?", a: "תגיד לי בשיחה. הקבוצות קטנות והמפגשים חוזרים על עצמם, אז נמצא מועד שמתאים לך." },
    ],

    final_chip: "בהזמנה בלבד. בקבוצות קטנות.",
    final_title: "בוא תבנה איתנו.",
    final_sub: "אחר צהריים אחד, קבוצה קטנה, וצוות AI משלך לקחת הביתה. זה בהזמנה בלבד, והצעד הראשון הוא שיחה איתי.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "אזור התלמידים",
    login_title: "כניסת תלמידים",
    login_sub: "אזור התלמידים בדרך. כאן תיכנס אליו ברגע שייפתח.",
    login_email_label: "אימייל",
    login_email_ph: "you@email.com",
    login_pass_label: "סיסמה",
    login_pass_ph: "הסיסמה שלך",
    login_submit: "כניסה",
    login_soon: "אזור התלמידים עדיין לא פתוח. הוא ייפתח בקרוב.",

    footer_line: "Product Lab. סדנאות בהזמנה על עיצוב מוצר בהובלת AI.",
    footer_contact: "יצירת קשר",
  },

  en: {
    nav_book: "Book a call",
    cta_book: "Book a call",
    cta_wa: "Talk to me",
    nav_student: "Student entrance",
    hero_chip: "Invite-only. Small groups.",
    hero_title_a: "Walk out with ",
    hero_title_mark: "a crew of your own",
    hero_title_b: ", and a new way to build anything.",
    hero_sub: "A live, 3-hour session for people who want to build with AI, not just use it. You set up a team of agents that works the way you do, and build something real with it before you go home.",
    hero_points: ["A 3-hour workshop", "A team of AI agents", "Builder superpower"],

    why_eyebrow: "Why now",
    why_title: "The way product gets built is changing. You can lead it.",
    why_body: "A year ago, building with a team of AI agents was a research demo. Today it is how a growing number of product people actually work, and almost nobody has turned it into something you can learn in an afternoon. This is that afternoon. Get in while it is still an edge.",

    walk_eyebrow: "What you take home",
    walk_title: "What you leave with",
    walk_items: [
      { t: "Your own AI team.", b: "The agents you build in the session, set up to work alongside you." },
      { t: "A shared memory they all draw from,", b: "so they get sharper the more you work together." },
      { t: "A build workflow you can repeat", b: "on Monday morning, on your own projects." },
      { t: "A real thing you built live,", b: "not a slide about it." },
    ],

    who_eyebrow: "Who it is for",
    who_for_title: "Who this is for",
    who_tiles: [
      { t: "Product designers", b: "Designers who feel they're losing their grip on the AI game and want to be a step ahead, with the tools and the base to take it from there. Design leaders too, and the solo designer who is the whole design team." },
      { t: "Builders", b: "Anyone who wants to build something but feels they lack the base, someone to consult with, and a sustainable way to manage it." },
      { t: "Your next step with AI", b: "Anyone who wants to get the most out of what AI offers now. Run your own business, automate specific tasks, or cut the manual work you still do by hand." },
    ],
    who_not: "Less of a fit for anyone after a magic button. If you'd rather roll up your sleeves and build it yourself, there's a chair at the table.",

    agenda_eyebrow: "Three hours",
    agenda_title: "Three hours, start to finish",
    agenda_phases: [
      { time: "30 min", t: "The lay of the land", b: "What we are building, why these tools, and where the technology actually stands right now." },
      { time: "about 90 min", t: "Build your team", b: "Stand up your AI team from ready-made prompts, wired to a shared memory." },
      { time: "about 60 min", t: "Build something real", b: "Put the team to work and ship one real thing, together." },
    ],

    proof_eyebrow: "Proof, not claims",
    proof_title: "Built the way you'll build",
    proof_lead: "Nothing here is a mockup of the idea. It is the idea, running.",
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
    ofir_bio: "I'm Ofir. Twelve years in product design, most of them leading design teams I built from scratch, across cyber, field service, media and more. Lately I build with AI teams every day, and that's how I built Glimps, a live product. When we talk, you won't get theory, you'll get how I actually work now.",
    ofir_why: "This is invite-only and small on purpose. Before you join, I want a real conversation. What you are working on, and whether this is a fit. No pitch. Book a time and we will talk.",

    quotes_eyebrow: "Testimonials",
    quotes_title: "From people who've done it",
    quotes: [
      { q: "[Testimonial line - placeholder for Ofir]", n: "Name", m: "Role, Company" },
      { q: "[Testimonial line - placeholder for Ofir]", n: "Name", m: "Role, Company" },
    ],

    incl_eyebrow: "The details",
    incl_title: "Everything you need to know",
    detail_items: [
      { ico: "seat",     q: "Where and how does it run?", a: "A live, in-person session in a small group. We meet face to face so everyone gets real attention." },
      { ico: "clock",    q: "How long does it take?", a: "About three hours straight, with one break. You come in without an AI team and leave with one." },
      { ico: "hand",     q: "Do I build it myself or watch?", a: "You build the whole way through, not watch from the side. You leave with something real you made yourself." },
      { ico: "laptop",   q: "Do I need to know how to code?", a: "No. If you can write a clear brief, you can do this. We build on Claude, in plain language, no code." },
      { ico: "box",      q: "What do I need to bring?", a: "A laptop and a Claude account. That's it. We'll tell you what to set up before the session." },
      { ico: "spark",    q: "Is it really just one session?", a: "Yes. You leave with a working AI team and something real you built. Where you take it from there is up to you." },
      { ico: "users",    q: "Is this for teams or individuals?", a: "Both. Come solo, or bring a couple of people from your team." },
      { ico: "calendar", q: "What if I can't make the date?", a: "Tell me on the call. The groups are small and sessions run regularly, so we'll find one that fits." },
    ],

    final_chip: "Invite-only. Small groups.",
    final_title: "Come build with us.",
    final_sub: "One afternoon, a small group, and your own AI team to take home. It is invite-only, and the first step is a call with me.",

    // Student area — placeholder sign-in (non-functional; copy Copywriter 2026-08-04)
    login_eyebrow: "Student area",
    login_title: "Student sign in",
    login_sub: "The student area is on its way. This is where you sign in once it opens.",
    login_email_label: "Email",
    login_email_ph: "you@email.com",
    login_pass_label: "Password",
    login_pass_ph: "Your password",
    login_submit: "Sign in",
    login_soon: "The student area is not open yet. It opens soon.",

    footer_line: "Product Lab. Invite-only workshops on AI-led product design.",
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

function render(lang) {
  const t = I18N[lang];

  document.getElementById("app").innerHTML = `
  <!-- NAV — logo hidden for now (decide later); wordmark text + WhatsApp only -->
  <header class="nav"><div class="wrap nav__in">
    <a class="nav__brand nav__brand--text" href="#top">Product Lab</a>
    <div class="nav__right">
      <button class="langtoggle" data-toggle-lang aria-label="Switch language">${lang === "he" ? "ע" : "E"}</button>
      <a class="btn btn--wa-solid btn--sm nav__book" href="${WA_URL}" target="_blank" rel="noopener">${I.wa} ${t.cta_wa}</a>
      <!-- Student entrance: opens the sign-in modal (placeholder). -->
      <button class="btn btn--ghost btn--sm nav__student" type="button" data-student-open>${I.login} ${t.nav_student}</button>
    </div>
  </div></header>

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
    <div class="hero__media"><img src="assets/hero-v2-3.png" alt="" /></div>
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
          <div class="card__ico">${[I.users, I.brain, I.flow, I.box][i] || I.check}</div>
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
          <div class="tilecard__illo"><img src="assets/${["tile-designer", "tile-builder", "tile-nextai"][i]}.png" alt="" /></div>
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
      ${t.agenda_phases.map((p) => `
        <div class="phase reveal">
          <span class="phase__time">${p.time}</span>
          <div><h3>${p.t}</h3><p>${p.b}</p></div>
        </div>`).join("")}
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
              <div class="agentcard__illo"><img src="assets/${a.img}.png" alt="" /></div>
              <div class="agentcard__body">
                <div class="agentcard__role">${a.role}</div>
                <p>${a.b}</p>
              </div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div></section>

  <!-- 8 TESTIMONIALS -->
  <section class="section section--alt"><div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${t.quotes_eyebrow}</span>
      <h2 class="section-title">${t.quotes_title}</h2>
    </div>
    <div class="quotes" style="margin-top:2rem">
      ${t.quotes.map((q) => `
        <figure class="quote reveal" style="margin:0">
          <div class="quote__mark">&ldquo;</div>
          <blockquote style="margin:0"><p>${q.q}</p></blockquote>
          <figcaption class="quote__who">
            <span class="quote__av">${q.n.charAt(0)}</span>
            <span><span class="quote__name">${q.n}</span><br><span class="quote__meta">${q.m}</span></span>
          </figcaption>
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

  <!-- Student sign-in MODAL — opens from the header button, hidden by default -->
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
          <label class="field__label" for="student-email">${t.login_email_label}</label>
          <input class="input" id="student-email" name="email" type="email" dir="ltr" placeholder="${t.login_email_ph}" autocomplete="email" />
        </div>
        <div class="field">
          <label class="field__label" for="student-pass">${t.login_pass_label}</label>
          <input class="input" id="student-pass" name="password" type="password" placeholder="${t.login_pass_ph}" autocomplete="current-password" />
        </div>
        <button class="btn btn--primary login__submit" type="submit">${t.login_submit}</button>
        <p class="login__note" data-student-note hidden>${I.check}<span>${t.login_soon}</span></p>
      </form>
    </div>
  </div>

  <!-- 12 FOOTER -->
  <footer class="footer"><div class="wrap footer__in">
    <div class="footer__brand"><span class="footer__wordmark">Product Lab</span></div>
    <div class="footer__meta">${t.footer_line}</div>
    <a href="${WA_URL}" target="_blank" rel="noopener">${t.footer_contact}</a>
  </div></footer>`;

  wireLang();
  wireReveal();
  wireStudent();
}

/* ---- Student sign-in (placeholder) --------------------------------------- */
/* Non-functional on purpose: no backend, no auth, no validation. Clicking
   submit just reveals the "coming soon" note. Real logic will replace this. */
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
  if (form) form.addEventListener("submit", (e) => { e.preventDefault(); if (note) note.hidden = false; });
}

/* ---- Language ------------------------------------------------------------ */
function setLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "he" ? "rtl" : "ltr";
  try { localStorage.setItem("pl_lang", lang); } catch (e) {}
  render(lang);
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
(function () {
  let lang = "he";
  try { lang = localStorage.getItem("pl_lang") || "he"; } catch (e) {}
  setLang(lang);
})();

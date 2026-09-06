/* =============================================================================
   PRODUCT LAB — FLEET BLUEPRINT PAGE STRINGS (window.FLEET_CONTENT)
   -----------------------------------------------------------------------------
   Every visible word on the public #/fleet page (S0–S9), HE + EN, identical
   shape under `he` and `en`. app.js reads FLEET_CONTENT[lang] and never
   hard-codes a visible string. Same load pattern as content.js: a plain
   <script> in index.html BEFORE app.js, with a ?v= cache-bust — bump it when
   this file changes.

   ✅ FINAL COPY (Copywriter, 2026-09-05). Every key, HE + EN.
   Written against the UR brief (shared/research/briefs/fleet-blueprint-
   2026-09-05.md §2 to §4), curriculum-truth.md §14.5 (the page describes a PLAN;
   the working team appears only in the workshop CTA) and the CMO ban list
   (no "generate", "prompt", "בלי קוד", beginner framing, "team ready/working",
   permissions, MCP, autonomous; no English where Hebrew will do; no long
   dash). Register: reader addressed in plural / impersonal, same as the site
   and the cohort #2 launch post. LLM-written lines (spec §3) must match it.
   Length constraints that the layout depends on:
     - entry_title / q[n].title: one line at 390px → ≤ 34 Hebrew chars.
     - crew[n].line / lib labels: one line inside a 3-up card → ≤ 60 chars.
     - leave[n].t: ≤ 30 chars; leave[n].b: ≤ 120 chars.
     - result_cta (button label): ≤ 44 chars, it must not wrap at 390px.
   The specialist library keys (lib) are the CLOSED set of 6 from the spec;
   the key itself is shown as a small tag, the label is the human name.
   The crew block is STATIC copy (never LLM output) per spec §2/S7.
   ========================================================================== */

window.FLEET_CONTENT = {
  he: {
    page_title: "איזה צוות סוכנים אתם צריכים | Product Lab",

    /* ---- S0 entry ---- */
    entry_eyebrow: "תוכנית הצוות שלכם",
    entry_title: "איזה צוות סוכנים אתם צריכים?",
    entry_sub: "חמש שאלות על מה שאתם עושים. בסוף: תוכנית של הצוות שאתם צריכים, במילים שלכם. מי בצוות, מה כל אחד עושה, ומה הוא לא סוגר בלעדיכם.",
    entry_cta: "להתחיל",
    entry_meta: "5 שאלות. 3 דקות.",

    /* ---- S0, returning visitor ---- */
    return_note: "יש לכם כבר תוכנית מהפעם הקודמת.",
    return_open: "לתוכנית שלי",
    return_reset: "להתחיל מחדש",

    /* ---- S1–S5 questions (UR brief §2, one per screen) ---- */
    q_counter: "שאלה {n} מתוך 5",
    q_answer_label: "התשובה שלכם",
    q_back: "חזרה",
    q_next: "הבאה",
    q_submit: "לראות את הצוות שלי",
    q_short: "עוד כמה מילים. ככה התוצאה תדבר עליכם, ולא על כולם.",
    q_choose: "בחרו אפשרות אחת.",
    q_chars: "{n}/{max}",
    questions: [
      { key: "q1", title: "מה אתם עושים, ובשביל מי?", hint: "המוצר, בשם. משפט אחד מספיק.", ph: "למשל: אפליקציה לניהול תורים לקליניקות קטנות. אני המוצר, העיצוב וההשקה. או: מערכת הזמנות למסעדות, וארבעה מעצבים שכל מסך שלהם עובר דרכי." },
      { key: "q2", title: "מה עבר דרככם השבוע שלא היה צריך?", hint: "כל מה שעצר וחיכה לכם. מזה נבנה הצוות.", ph: "למשל: כל מסך לפני שהוא הולך לפיתוח. כל שינוי בספריית הקומפוננטות." },
      { key: "q3", title: "מה כבר הוחלט, ונמאס להסביר מחדש?", hint: "זה מה שנכנס לזיכרון.", ph: "למשל: הפלטה, מי קהל היעד, מה לא בונים השנה." },
      { key: "q4", title: "מה אסור שיקרה בלי שאתם מסתכלים?", hint: "זה מה שהצוות לא סוגר לבד.", ph: "למשל: מסירה לפיתוח. שינוי מחיר. הודעה ללקוח." },
      { key: "q5", title: "ניסיתם כבר?", hint: "לתת חלק מהעבודה לסוכן. מה יצא מזה?", ph: "",
        choices: [
          { v: "none", l: "לא" },
          { v: "chat", l: "צ'אט" },
          { v: "claude_code_broke", l: "Claude Code, ולא זכר אותי" },
        ] },
    ],

    /* ---- S6 loading ---- */
    loading_line: "קוראים מה שכתבתם.",

    /* ---- S7 result ---- */
    result_eyebrow: "תוכנית הצוות שלכם",
    result_title: "הצוות שאתם צריכים.",
    result_lead: "בשביל",
    crew_eyebrow: "מגיע עם כל צוות",
    crew_title: "צוות הבנייה. אותם שלושה, תמיד.",
    crew: [
      { img: "crew-strategist", tag: "האסטרטג", role: "מנהל המוצר", line: "מחדד מה בונים קודם. לא סוגר לבד מה נכנס לגרסה." },
      { img: "crew-designer", tag: "המעצב", role: "מעצב המוצר", line: "בונה מסכים מתוך מערכת העיצוב. לא מוסר לפיתוח בלעדיכם." },
      { img: "crew-architect", tag: "הארכיטקט", role: "המהנדס הראשי", line: "בונה מה שהשניים סיכמו. לא מעלה לאוויר בלי שראיתם." },
    ],
    spec_eyebrow: "המומחים שלכם",
    spec_title: "מי שמצטרף בגלל מה שכתבתם.",
    spec_sub: "אחד או שניים, לא שמונה. מי שמתחילים ממנו מסומן.",
    spec_lines: {
      does: "מה הוא עושה",
      reads: "מה הוא קורא, ומה מותר לו לשנות",
      never: "מה הוא לא סוגר בלעדיכם",
    },
    spec_why: "למה הוא כאן:",
    spec_start: "מתחילים ממנו",
    lib: {
      "user-researcher": "חוקר המשתמשים",
      "copywriter": "הכותב",
      "design-system-lead": "מוביל מערכת העיצוב",
      "reviewer": "הבודק",
      "chief-of-staff": "ראש המטה",
      "marketing-designer": "מעצב השיווק",
    },
    brain_eyebrow: "איך הם זוכרים",
    brain_title: "קובץ אחד שכולם קוראים לפני שהם מתחילים.",
    brain_card_title: "המוח המשותף",
    brain_not_label: "מה לא נכנס לשם:",
    memory_title: "זיכרון לכל סוכן",
    memory_line: "קובץ טקסט אחד לכל סוכן, עם מה שהוא כבר יודע עליכם. הוא קורא אותו כשהוא מתחיל, וכותב אליו כשהוא מסיים. ככה ביום שני הוא זוכר מה הוחלט ביום חמישי.",
    broke_title: "למה זה נשבר בפעם הקודמת",
    leave_eyebrow: "מה יוצאים איתו מהסדנה",
    leave_title: "סדנה של ערב אחד, יום חמישי 15 באוקטובר, ₪600. בסוף הערב, זה מה שיש לכם.",
    leave: [
      { t: "הסוכן הראשון שלכם רץ", b: "אחד מהצוות שלמעלה, מופעל איתכם בחדר, וכבר יודע מה כתבתם כאן." },
      { t: "השאר מגיעים בנויים", b: "צוות הבנייה והמומחים שלכם מגיעים בקובץ אחד לפני הערב. כל אחד מופעל בפקודה אחת, והזיכרון שלו כבר מכיר אתכם." },
      { t: "דף אחד שנבנה עם צוות הבנייה", b: "דף רשימת המתנה אמיתי למוצר שכתבתם בשאלה הראשונה. שלושה סוכנים בונים אותו לפי סדר, והמומחים שלכם אומרים עליו את דעתם." },
      { t: "מוח משותף אמיתי", b: "קובץ אחד עם ההחלטות מהערב הזה. כל סוכן קורא אותו לפני שהוא מתחיל, וזה מחזיק גם ביום שלישי." },
    ],
    result_cta_title: "רוצים את התוכנית הזאת באימייל?",
    result_cta_sub: "שולחים אותה כמו שהיא, ומוסיפים מה הסדנה עושה איתה.",
    result_cta: "לשלוח לי את התוכנית",
    result_restart: "להתחיל מחדש",

    /* ---- S8 email gate (after the full result, never before) ---- */
    gate_title: "לאן לשלוח את התוכנית?",
    gate_sub: "באימייל: התוכנית הזאת כמו שהיא, בקובץ שנשאר אצלכם, ומה הסדנה עושה איתה. אופיר קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    gate_manual_title: "נכין לכם אותה בעצמנו.",
    gate_manual_sub: "משהו לא עבד אצלנו. התשובות שלכם שמורות. תשאירו אימייל, אופיר קורא אותן ושולח את התוכנית בעצמו.",
    gate_limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    gate_limited_sub: "תשאירו אימייל, ונשלח לכם את התוכנית.",
    gate_name_label: "שם",
    gate_email_label: "אימייל",
    gate_email_ph: "you@email.com",
    gate_note_label: "משהו להוסיף? (לא חובה)",
    gate_note_ph: "שורה אחת. מה הייתם רוצים שהצוות הזה יוריד מכם קודם.",
    gate_submit: "לשלוח לי",
    gate_error: "משהו לא נשלח. אפשר לנסות שוב, או לכתוב לאופיר בוואטסאפ.",

    /* ---- S9 confirmation + cohort #2 ---- */
    done_title: "התוכנית בדרך אליכם.",
    done_sub: "אופיר קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    done_cohort_eyebrow: "הצעד הבא",
    done_cohort_title: "הצוות הזה קם בסדנה.",

    /* ---- error / rate-limited ---- */
    error_title: "משהו השתבש אצלנו.",
    error_sub: "התשובות שלכם שמורות. אפשר לנסות עוד פעם אחת.",
    error_retry: "לנסות שוב",
    error_manual: "לקבל אותה באימייל",
    limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    limited_sub: "התשובות שלכם שמורות. תשאירו אימייל ונשלח לכם את התוכנית.",
    limited_cta: "להשאיר אימייל",
  },

  en: {
    page_title: "Which agent team do you need | Product Lab",

    entry_eyebrow: "Your team blueprint",
    entry_title: "Which agent team do you need?",
    entry_sub: "Five questions about what you do. At the end: a blueprint of the team you need, in your own words. Who is on it, what each one does, and what it never closes without you.",
    entry_cta: "Start",
    entry_meta: "5 questions. 3 minutes.",

    return_note: "You already have a blueprint from last time.",
    return_open: "Open my blueprint",
    return_reset: "Start over",

    q_counter: "Question {n} of 5",
    q_answer_label: "Your answer",
    q_back: "Back",
    q_next: "Next",
    q_submit: "Show me my team",
    q_short: "A few more words. That is how the result speaks about you, not about everyone.",
    q_choose: "Pick one.",
    q_chars: "{n}/{max}",
    questions: [
      { key: "q1", title: "What do you do, and for whom?", hint: "Name the product. One sentence is enough.", ph: "e.g. A scheduling app for small clinics. I am the product, the design and the launch. Or: an ordering system for restaurants, and four designers whose every screen goes through me." },
      { key: "q2", title: "What went through you this week that should not have?", hint: "Everything that stopped and waited for you. That is what the team is built from.", ph: "e.g. Every screen before it goes to dev. Every change to the component library." },
      { key: "q3", title: "What is already decided, and you are tired of re-explaining?", hint: "This is what goes into memory.", ph: "e.g. The palette, who the audience is, what we are not building this year." },
      { key: "q4", title: "What must never happen without you looking?", hint: "This is what the team never closes alone.", ph: "e.g. The handoff to dev. A price change. A message to a customer." },
      { key: "q5", title: "Tried it already?", hint: "Handing part of the work to an agent. What came of it?", ph: "",
        choices: [
          { v: "none", l: "No" },
          { v: "chat", l: "Chat" },
          { v: "claude_code_broke", l: "Claude Code, and it forgot me" },
        ] },
    ],

    loading_line: "Reading what you wrote.",

    result_eyebrow: "Your team blueprint",
    result_title: "The team you need.",
    result_lead: "For",
    crew_eyebrow: "Included with every team",
    crew_title: "The build crew. The same three, always.",
    crew: [
      { img: "crew-strategist", tag: "The Strategist", role: "The product manager", line: "Sharpens what gets built first. Never closes alone what makes the release." },
      { img: "crew-designer", tag: "The Designer", role: "The product designer", line: "Builds screens from the design system. Never hands off to dev without you." },
      { img: "crew-architect", tag: "The Architect", role: "The lead engineer", line: "Builds what the other two agreed on. Never ships without you seeing it." },
    ],
    spec_eyebrow: "Your specialists",
    spec_title: "Who joins because of what you wrote.",
    spec_sub: "One or two, not eight. The one you start with is marked.",
    spec_lines: {
      does: "What it does",
      reads: "What it reads, and what it may change",
      never: "What it never closes without you",
    },
    spec_why: "Why it is here:",
    spec_start: "Start with this one",
    lib: {
      "user-researcher": "The user researcher",
      "copywriter": "The copywriter",
      "design-system-lead": "The design system lead",
      "reviewer": "The reviewer",
      "chief-of-staff": "The chief of staff",
      "marketing-designer": "The marketing designer",
    },
    brain_eyebrow: "How they remember",
    brain_title: "One file everyone reads before they start.",
    brain_card_title: "The shared brain",
    brain_not_label: "What does not go in:",
    memory_title: "A memory for each agent",
    memory_line: "One text file per agent, holding what it already knows about you. It reads it when it starts, and writes to it when it finishes. That is how Monday remembers what was decided on Thursday.",
    broke_title: "Why it broke last time",
    leave_eyebrow: "What you leave the workshop with",
    leave_title: "A one-evening workshop, Thursday 15 October, ₪600. By the end of the evening, this is what you have.",
    leave: [
      { t: "Your first agent running", b: "One of the team above, started with you in the room, already knowing what you wrote here." },
      { t: "The rest arrive built", b: "The build crew and your specialists, in one file before the evening. Each one starts with a single command, and its memory already knows you." },
      { t: "One page built with the build crew", b: "A real waiting-list page for the product from your first answer. Three agents build it in order, and your specialists weigh in on it." },
      { t: "A real shared brain", b: "One file with the decisions from that evening. Every agent reads it before it starts, and it still holds on Tuesday." },
    ],
    result_cta_title: "Want this blueprint in your inbox?",
    result_cta_sub: "We send it as it is, plus what the workshop does with it.",
    result_cta: "Send me the blueprint",
    result_restart: "Start over",

    gate_title: "Where should the blueprint go?",
    gate_sub: "By email: this blueprint as it is, in a file you keep, and what the workshop does with it. Ofir reads what you wrote and replies personally within 24 hours.",
    gate_manual_title: "We will put it together ourselves.",
    gate_manual_sub: "Something failed on our side. Your answers are saved. Leave an email, and Ofir reads them and sends the blueprint himself.",
    gate_limited_title: "Too many requests today from this network.",
    gate_limited_sub: "Leave an email and we will send you the blueprint.",
    gate_name_label: "Name",
    gate_email_label: "Email",
    gate_email_ph: "you@email.com",
    gate_note_label: "Anything to add? (optional)",
    gate_note_ph: "One line. What you would want this team to take off your plate first.",
    gate_submit: "Send it to me",
    gate_error: "That did not go through. Try again, or write to Ofir on WhatsApp.",

    done_title: "Your blueprint is on its way.",
    done_sub: "Ofir reads what you wrote and replies personally within 24 hours.",
    done_cohort_eyebrow: "The next step",
    done_cohort_title: "The workshop is where this team gets built.",

    error_title: "Something went wrong on our side.",
    error_sub: "Your answers are saved. You can try once more.",
    error_retry: "Try again",
    error_manual: "Email it to me instead",
    limited_title: "Too many requests today from this network.",
    limited_sub: "Your answers are saved. Leave an email and we will send you the blueprint.",
    limited_cta: "Leave an email",
  },
};

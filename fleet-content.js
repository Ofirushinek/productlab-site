/* =============================================================================
   PRODUCT LAB — FLEET BLUEPRINT PAGE STRINGS (window.FLEET_CONTENT)
   -----------------------------------------------------------------------------
   Every visible word on the public #/fleet page (S0–S9), HE + EN, identical
   shape under `he` and `en`. app.js reads FLEET_CONTENT[lang] and never
   hard-codes a visible string. Same load pattern as content.js: a plain
   <script> in index.html BEFORE app.js, with a ?v= cache-bust — bump it when
   this file changes.

   ✅ FINAL COPY v2 (Copywriter, 2026-09-06) - Ofir's S0 clarity redo.
   v2 rule: no abstract nouns for the deliverable. "תוכנית" is gone everywhere;
   the thing the reader gets is "הרכב הצוות" / "the lineup", and S0 says in
   plain words what it contains. Questions name the product, never "what you do".
   v2 round 2 (Ofir): entry_sub is ONE sentence, no colon; the outcome is its
   own mini block (entry_outcome_label + entry_outcome_line) above the three
   crew avatars (entry_crew_aria; the tooltip reuses crew[n].role + crew[n].line).
   v2 round 3 (Ofir): q1-q4 rewritten as questions a person asks someone
   sharing a project. Placeholders are ONE example written like a real answer,
   no "למשל:", no "או:", no colon anywhere on the question screens.
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
    entry_eyebrow: "מי יעזור לכם לבנות",
    entry_title: "איזה צוות סוכנים אתם צריכים?",
    entry_sub: "5 שאלות על מה אתם מנסים לבנות, מה נתקע אצלכם, ומה כבר הוחלט.",
    entry_outcome_label: "מה תקבלו",
    entry_outcome_line: "הסוכנים שיבנו איתכם, מה כל אחד עושה, ומה הוא לא סוגר בלעדיכם.",
    entry_crew_aria: "שלושת הסוכנים שבכל הרכב",
    entry_cta: "להתחיל",
    entry_meta: "5 שאלות. 3 דקות.",

    /* ---- S0, returning visitor ---- */
    return_note: "כבר יש לכם הרכב צוות מהפעם הקודמת.",
    return_open: "לצוות שלי",
    return_reset: "להתחיל מחדש",

    /* ---- S1–S5 questions (UR brief §2, one per screen) ---- */
    q_counter: "שאלה {n} מתוך 5",
    q_answer_label: "התשובה שלכם",
    q_back: "חזרה",
    q_next: "הבאה",
    q_submit: "לראות את הצוות שלי",
    q_short: "עוד כמה מילים. ככה ההרכב ידבר עליכם, ולא על כולם.",
    q_choose: "בחרו אפשרות אחת.",
    q_chars: "{n}/{max}",
    mic_start: "או פשוט לדבר",
    mic_stop: "מקשיבים. לעצור",
    mic_aria_start: "לדבר במקום להקליד",
    mic_aria_stop: "להפסיק להקשיב",
    mic_denied: "המיקרופון חסום בדפדפן. אפשר לאשר אותו, או להמשיך להקליד.",
    questions: [
      { key: "q1", title: "מה אתם בונים שלא נותן לכם לישון?", hint: "מה זה ולמי זה. משפט אחד, במילים שלכם.", ph: "אפליקציה לניהול תורים לקליניקות קטנות. אני לבד על המוצר, העיצוב וההשקה, ורוב הזמן גם על התמיכה." },
      { key: "q2", title: "מה עצר וחיכה לכם השבוע?", hint: "כל מה שלא זז עד שהסתכלתם. מזה נבנה הצוות.", ph: "כל מסך לפני שהוא הולך לפיתוח, וכל שינוי קטן בספריית הקומפוננטות. גם כשאני בחופש." },
      { key: "q3", title: "מה כבר החלטתם, ונמאס להסביר שוב?", hint: "זה נכנס לזיכרון, כדי לא להסביר פעם רביעית.", ph: "הפלטה סגורה, קהל היעד הוא מנהלי קליניקות ולא רופאים, והשנה לא בונים אפליקציה לאנדרואיד. אמרתי את זה כבר שלוש פעמים." },
      { key: "q4", title: "מה אף אחד לא סוגר בלעדיכם?", hint: "זה מה שהצוות לא סוגר לבד.", ph: "מסירה לפיתוח, שינוי מחיר, וכל הודעה שיוצאת ללקוח. בלי העין שלי זה לא זז." },
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
    result_eyebrow: "הרכב הצוות שלכם",
    result_title: "הצוות שאתם צריכים.",
    result_lead: "בשביל",
    crew_eyebrow: "מגיע עם כל צוות",
    crew_title: "צוות הבנייה. אותם שלושה, תמיד.",
    crew: [
      { img: "crew-strategist", tag: "האסטרטג", role: "מנהל המוצר", line: "מחדד מה בונים קודם. לא סוגר לבד מה נכנס לגרסה." },
      { img: "crew-designer", tag: "המעצב", role: "מעצב המוצר", line: "בונה מסכים מתוך מערכת העיצוב. לא מוסר לפיתוח בלעדיכם." },
      { img: "crew-architect", tag: "הארכיטקט", role: "המהנדס הראשי", line: "בונה מה שסוכם. לא מעלה לאוויר בלי שראיתם." },
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
    result_cta_title: "רוצים את ההרכב הזה באימייל?",
    result_cta_sub: "שולחים אותו כמו שהוא, ומוסיפים מה הסדנה עושה איתו.",
    result_cta: "לשלוח לי את ההרכב",
    result_restart: "להתחיל מחדש",

    /* ---- S8 email gate (after the full result, never before) ---- */
    gate_title: "לאן לשלוח את ההרכב?",
    gate_sub: "באימייל: ההרכב הזה כמו שהוא, בקובץ שנשאר אצלכם, ומה הסדנה עושה איתו. אופיר קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    gate_manual_title: "נכין לכם אותו בעצמנו.",
    gate_manual_sub: "משהו לא עבד אצלנו. התשובות שלכם שמורות. תשאירו אימייל, אופיר קורא אותן ושולח את ההרכב בעצמו.",
    gate_limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    gate_limited_sub: "תשאירו אימייל, ונשלח לכם את ההרכב.",
    gate_name_label: "שם",
    gate_email_label: "אימייל",
    gate_email_ph: "you@email.com",
    gate_note_label: "משהו להוסיף? (לא חובה)",
    gate_note_ph: "שורה אחת. מה הייתם רוצים שהצוות הזה יוריד מכם קודם.",
    gate_submit: "לשלוח לי",
    gate_error: "משהו לא נשלח. אפשר לנסות שוב, או לכתוב לאופיר בוואטסאפ.",

    /* ---- S9 confirmation + cohort #2 ---- */
    done_title: "ההרכב בדרך אליכם.",
    done_sub: "אופיר קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    done_cohort_eyebrow: "הצעד הבא",
    done_cohort_title: "הצוות הזה קם בסדנה.",

    /* ---- error / rate-limited ---- */
    error_title: "משהו השתבש אצלנו.",
    error_sub: "התשובות שלכם שמורות. אפשר לנסות עוד פעם אחת.",
    error_retry: "לנסות שוב",
    error_manual: "לקבל אותו באימייל",
    limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    limited_sub: "התשובות שלכם שמורות. תשאירו אימייל ונשלח לכם את ההרכב.",
    limited_cta: "להשאיר אימייל",
  },

  en: {
    page_title: "Which agent team do you need | Product Lab",

    entry_eyebrow: "Who will help you build",
    entry_title: "Which agent team do you need?",
    entry_sub: "5 questions about what you are trying to build, what gets stuck with you, and what is already decided.",
    entry_outcome_label: "What you get",
    entry_outcome_line: "The agents that will build with you, what each one does, and what it never closes without you.",
    entry_crew_aria: "The three agents in every lineup",
    entry_cta: "Start",
    entry_meta: "5 questions. 3 minutes.",

    return_note: "You already have a team lineup from last time.",
    return_open: "Show me my team",
    return_reset: "Start over",

    q_counter: "Question {n} of 5",
    q_answer_label: "Your answer",
    q_back: "Back",
    q_next: "Next",
    q_submit: "Show me my team",
    q_short: "A few more words. That is how the lineup speaks about you, not about everyone.",
    q_choose: "Pick one.",
    q_chars: "{n}/{max}",
    mic_start: "Or just talk",
    mic_stop: "Listening. Stop",
    mic_aria_start: "Talk instead of typing",
    mic_aria_stop: "Stop listening",
    mic_denied: "The browser blocked the microphone. Allow it, or keep typing.",
    questions: [
      { key: "q1", title: "What are you building that keeps you up at night?", hint: "What it is and who it is for. One sentence, your words.", ph: "A scheduling app for small clinics. I am alone on product, design and launch, and most of the time on support too." },
      { key: "q2", title: "What stopped and waited for you this week?", hint: "Whatever does not move until you look. The team is built from this.", ph: "Every screen before it goes to dev, and every small change to the component library. Even when I am on vacation." },
      { key: "q3", title: "What have you already decided, and are tired of explaining again?", hint: "This goes into memory, so you never explain it a fourth time.", ph: "The palette is locked, the audience is clinic managers not doctors, and no Android app this year. I have said this three times already." },
      { key: "q4", title: "What does nobody close without you?", hint: "This is what the team never closes alone.", ph: "The handoff to dev, a price change, and any message that goes out to a customer. Nothing moves without my eyes on it." },
      { key: "q5", title: "Tried it already?", hint: "Handing part of the work to an agent. What came of it?", ph: "",
        choices: [
          { v: "none", l: "No" },
          { v: "chat", l: "Chat" },
          { v: "claude_code_broke", l: "Claude Code, and it forgot me" },
        ] },
    ],

    loading_line: "Reading what you wrote.",

    result_eyebrow: "Your team lineup",
    result_title: "The team you need.",
    result_lead: "For",
    crew_eyebrow: "Included with every team",
    crew_title: "The build crew. The same three, always.",
    crew: [
      { img: "crew-strategist", tag: "The Strategist", role: "The product manager", line: "Sharpens what gets built first. Never closes alone what makes the release." },
      { img: "crew-designer", tag: "The Designer", role: "The product designer", line: "Builds screens from the design system. Never hands off to dev without you." },
      { img: "crew-architect", tag: "The Architect", role: "The lead engineer", line: "Builds what was agreed. Never ships without you seeing it." },
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
    result_cta_title: "Want this lineup in your inbox?",
    result_cta_sub: "We send it as it is, plus what the workshop does with it.",
    result_cta: "Send me the lineup",
    result_restart: "Start over",

    gate_title: "Where should the lineup go?",
    gate_sub: "By email: this lineup as it is, in a file you keep, and what the workshop does with it. Ofir reads what you wrote and replies personally within 24 hours.",
    gate_manual_title: "We will put it together ourselves.",
    gate_manual_sub: "Something failed on our side. Your answers are saved. Leave an email, and Ofir reads them and sends the lineup himself.",
    gate_limited_title: "Too many requests today from this network.",
    gate_limited_sub: "Leave an email and we will send you the lineup.",
    gate_name_label: "Name",
    gate_email_label: "Email",
    gate_email_ph: "you@email.com",
    gate_note_label: "Anything to add? (optional)",
    gate_note_ph: "One line. What you would want this team to take off your plate first.",
    gate_submit: "Send it to me",
    gate_error: "That did not go through. Try again, or write to Ofir on WhatsApp.",

    done_title: "Your lineup is on its way.",
    done_sub: "Ofir reads what you wrote and replies personally within 24 hours.",
    done_cohort_eyebrow: "The next step",
    done_cohort_title: "The workshop is where this team gets built.",

    error_title: "Something went wrong on our side.",
    error_sub: "Your answers are saved. You can try once more.",
    error_retry: "Try again",
    error_manual: "Email it to me instead",
    limited_title: "Too many requests today from this network.",
    limited_sub: "Your answers are saved. Leave an email and we will send you the lineup.",
    limited_cta: "Leave an email",
  },
};

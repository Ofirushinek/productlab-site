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
   v2 round 2 (Ofir): entry_sub is ONE sentence, no colon.
   [SUPERSEDED 2026-09-07, see v6 below - the outcome mini block/crew-avatar
   tooltips this round introduced are gone; entry_outcome_label/line/
   entry_crew_aria no longer exist.]
   v2 round 3 (Ofir): q1-q4 rewritten as questions a person asks someone
   sharing a project. Placeholders are ONE example written like a real answer,
   no "למשל:", no "או:", no colon anywhere on the question screens.

   v2 rounds 5-6 (Ofir): q2-q4 hold for idea-stage readers (future tense);
   SCREEN ORDER is q1, q5, q2, q3, q4 (array order = screen order, keys and
   chip values unchanged, the backend reads by key). q5 asks which tool is in
   their hands so q3 ("what you explain to it again and again") has context.
   v2 round 8 (Ofir): q5 is a MULTI-SELECT of tools (q5.tools, with logos) +
   tools_none / tools_other / tools_other_ph / q_choose_many; the old q5.choices
   stays as fallback. q_submit is a question, on purpose: the reader gets a
   lineup, not a working team, so the button asks instead of promising.
   v2 round 9 (Ofir): S6 loading is the three crew characters reading the
   answers. [SUPERSEDED 2026-09-07, see v6 below - S6 no longer shows three
   fixed characters; loading_lines is now 2 lines each, not 4.]
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

   ⛔ v5 (Ofir, 2026-09-07) - the v4 confirm/recap screen (S5.5) is REMOVED.
   Redundant: after the last question, the flow now goes straight to S6
   loading (fleetSubmit called directly from the last question submit).
   confirm_* keys deleted, fleetConfirm()/case "confirm"/confirm-submit/
   confirm-edit deleted from app.js, .fleet-confirm* CSS deleted.

   ⛔ v6 (Ofir, 2026-09-07) - S0 + S6 UX pass: the product must never look
   like "three specific agents sit behind the scenes and read your answers"
   when that is not what happens.
   S0: [SUPERSEDED by v7 below, same day - the top-of-card cluster this
   round introduced is reverted; entry_outcome_label/entry_outcome_line/
   entry_crew_aria/entry_hint/entry_meta no longer exist.]
   S6 (still current, untouched by v7): no longer "three crew reading your
   answers". One reader shown at a time, cycling through a pool that
   alternates a crew member (loading_lines, now 2 short generic-process
   lines each, not 4) with a library specialist (NEW loading_roles, one
   hedged "maybe/perhaps" hypothesis line per key in `lib`, initial-in-a-
   disc avatar since no portrait exists for them - never claims a real
   action happened, e.g. never "read your screens" if no screens were
   uploaded). loading_title + loading_note rewritten to match.

   ⛔ v7 (Ofir, 2026-09-07, same day) - S0 ONLY: reverted to a plain hero,
   avatars moved below the CTA. Ofir's read on v6: too far from the simple
   original. Top of card is eyebrow/title/description/CTA and NOTHING else
   (entry_meta line removed outright, not replaced). Below the CTA, a small
   supporting block: agents_title/agents_sub (NEW) + the avatar-stack again
   - but real crew photos ONLY, no initials, no "+" hint mark ("don't fake
   an avatar that has no real photo" - Ofir's words). Interactive again:
   hover/tap tooltip = crew[n].tag + crew[n].line, reused verbatim from the
   S7 crew section, no new copy for the tooltips themselves. S6 is untouched
   - still v6's one-reader-at-a-time pool, initials included there since
   that's the only place a library role (no portrait) still appears.

   ✅ v3 (Copywriter, 2026-09-06) - Ofir's post-survey-failure redo.
   Two changes: (1) tone on ANY failure screen is now warm/funny/human, never
   a cold "error" register - the reader just poured their answers into 5
   questions, the LAST thing they should meet is a corporate error message.
   (2) NO RETRY after the survey is complete. `error_title`/`error_sub`/
   `error_retry`/`error_manual` are DELETED - the whole `fleetError()` screen
   (retry once, then fall to the manual gate) is gone. `gate_manual_title`/
   `gate_manual_sub` now carry the ENTIRE failure message and ARE the only
   screen a post-survey failure ever shows: playful headline, then a body that
   says plainly (a) everything they wrote is saved and (b) we'll happily email
   the lineup once it's ready. ⚠️ PD ACTION OWED: in app.js, `fleetSubmit`'s
   catch block (~line 3049) must route EVERY non-rate-limited failure straight
   to `FLEET.gateMode="manual"; FLEET.step="gate"` - delete the `failures`
   counter's retry branch (`else FLEET.step="error"`), delete `case "error"`
   from `renderFleet`'s switch, and delete the now-dead `fleetError()`
   function + its `data-fleet="retry"` handler. `limited_*` (the rate-limit
   state) is UNCHANGED and untouched by this - different situation, different
   screen, not in scope.
   ========================================================================== */

window.FLEET_CONTENT = {
  he: {
    page_title: "איזה צוות סוכנים אתם צריכים | Product Lab",

    /* ---- S0 entry ---- */
    entry_eyebrow: "בונים את הצוות שמתאים לכם",
    entry_title: "איזה צוות סוכני AI באמת יעזור לכם?",
    entry_sub: "5 שאלות קצרות על העבודה שלכם. בסוף נמליץ עם מי כדאי להתחיל.",
    entry_cta: "להתחיל",

    /* ---- S0 "examples" block, below the CTA (2026-09-07) ---- */
    agents_title: "יש הרבה סוגים של סוכנים. אתם כנראה צריכים רק כמה מהם.",
    agents_sub: "הנה כמה דוגמאות לסוכנים שיכולים להצטרף לצוות שלכם.",
    agents_aria: "דוגמאות לסוכנים אפשריים",

    /* ---- S0, returning visitor ---- */
    return_note: "כבר יש לכם הרכב צוות מהפעם הקודמת.",
    return_open: "לצוות שלי",
    return_reset: "להתחיל מחדש",

    /* ---- S1–S5 questions (UR brief §2, one per screen) ---- */
    q_counter: "שאלה {n} מתוך 5",
    q_answer_label: "התשובה שלכם",
    q_back: "חזרה",
    q_next: "הבא",
    q_submit: "לראות את הצוות שלי",
    q_short: "עוד כמה מילים. ככה ההרכב ידבר עליכם, ולא על כולם.",
    q_choose: "בחרו אפשרות אחת.",
    q_choose_many: "סמנו לפחות אחד. גם עדיין כלום זו תשובה.",
    tools_none: "עדיין לא",
    tools_other: "כלי אחר",
    tools_other_ph: "איזה כלי? נשמח לדעת.",
    q_chars: "{n}/{max}",
    mic_start: "או פשוט לדבר",
    mic_stop: "מקשיבים. לעצור",
    mic_aria_start: "לדבר במקום להקליד",
    mic_aria_stop: "להפסיק להקשיב",
    mic_denied: "המיקרופון חסום בדפדפן. אפשר לאשר אותו, או להמשיך להקליד.",
    questions: [
      { key: "q1", title: "מה אתם בונים עכשיו?", hint: "ספרו בקצרה מה המוצר או הפרויקט, למי הוא מיועד ומה אתם רוצים להשיג.", ph: "כלי שעוזר לצוותי מוצר לרכז פידבק מלקוחות ולהחליט מה כדאי לבנות קודם." },
      { key: "q5", title: "עם אילו כלי AI כבר עבדתם?", hint: "סמנו כל מה שניסיתם — גם אם השתמשתם בו רק פעם או פעמיים.", ph: "",
        tools: [
          { v: "chatgpt", l: "ChatGPT" },
          { v: "claude", l: "Claude" },
          { v: "gemini", l: "Gemini" },
          { v: "copilot", l: "Copilot" },
          { v: "perplexity", l: "Perplexity" },
          { v: "notion_ai", l: "Notion AI" },
          { v: "cursor", l: "Cursor" },
          { v: "claude_code", l: "Claude Code" },
          { v: "lovable", l: "Lovable" },
          { v: "v0", l: "v0" },
          { v: "replit", l: "Replit" },
          { v: "bolt", l: "Bolt" },
        ],
        choices: [
          { v: "none", l: "עדיין כלום" },
          { v: "chat", l: "צ'אט, ChatGPT או Claude" },
          { v: "claude_code_broke", l: "Claude Code, Cursor, Lovable" },
        ] },
      { key: "q2", title: "איפה העבודה שלכם נתקעת?", hint: "מה לוקח יותר מדי זמן, נדחה שוב ושוב או תלוי בכם כדי להתקדם?", ph: "כל מסך חדש מתחיל כמעט מאפס, ואני חוזר שוב ושוב על החלטות שכבר קיבלתי." },
      { key: "q3", title: "מה אתם מוצאים את עצמכם מסבירים שוב ושוב?", hint: "כללים, החלטות, העדפות או הקשר שהייתם רוצים שהצוות כבר יזכור לבד.", ph: "מי קהל היעד, איך אנחנו כותבים, אילו רכיבים כבר קיימים ומה החלטנו לא לבנות." },
      { key: "q4", title: "איפה הצוות חייב לעצור ולשאול אתכם?", hint: "אילו החלטות או פעולות אתם לא רוצים שסוכן יבצע לבד?", ph: "לפרסם משהו ללקוחות, לשנות מחיר, למחוק מידע או לשנות החלטה שכבר אושרה." },
    ],

    /* ---- S6 loading ---- */
    loading_line: "קוראים מה שכתבתם.",
    loading_title: "מרכיבים לכם צוות.",
    loading_lines: {
      strategist: [
        "מבינים מה אתם בונים.",
        "מסמנים איפה אתם רוצים להישאר בשליטה.",
      ],
      designer: [
        "מזהים איפה העבודה נתקעת.",
        "משווים בין תפקידים שיכולים להתאים.",
      ],
      architect: [
        "בודקים מה אפשר להעביר לסוכנים.",
        "בוחרים עם מי כדאי להתחיל.",
      ],
    },
    /* Hypothesis lines for the specialist library (keyed like `lib` below) -
       "maybe"-phrased, never claims a real action happened. Rendered with an
       initial-in-disc avatar (no portrait exists for these), same recipe as
       .avatar-initial on S0. Ofir, 2026-09-07: the loading screen should read
       as the system comparing role TYPES, not three fixed characters reading
       a form. */
    loading_roles: {
      "user-researcher": "אולי צריך מישהו שיבדוק הנחות לפני שבונים.",
      "copywriter": "אולי חסר מישהו שמנסח את מה שיוצא ללקוחות.",
      "design-system-lead": "אולי הבעיה היא לא לבנות מהר, אלא לשמור על עקביות.",
      "reviewer": "אולי צריך מישהו שיעבור על החומרים לפני שהם ממשיכים הלאה.",
      "chief-of-staff": "אולי חסר מישהו שיעזור להחליט מה לא נכנס עכשיו.",
      "marketing-designer": "אולי יש עבודה שכדאי להראות החוצה בצורה ברורה יותר.",
    },
    loading_note: "עוד רגע. ההמלצה כבר מתגבשת.",

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
    gate_sub: "באימייל: ההרכב הזה כמו שהוא, בקובץ שנשאר אצלכם, ומה הסדנה עושה איתו. הצוות של Product Lab קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    gate_manual_title: "ההרכב לא יצא הפעם.",
    gate_manual_sub: "כל מה שכתבתם שמור אצלנו מילה במילה. תשאירו אימייל, ונשמח לשלוח לכם אותו ברגע שהוא מוכן.",
    gate_limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    gate_limited_sub: "תשאירו אימייל, ונשלח לכם את ההרכב.",
    gate_name_label: "שם",
    gate_email_label: "אימייל",
    gate_email_ph: "you@email.com",
    gate_note_label: "משהו להוסיף? (לא חובה)",
    gate_note_ph: "שורה אחת. מה הייתם רוצים שהצוות הזה יוריד מכם קודם.",
    gate_submit: "לשלוח לי",
    gate_error: "משהו לא נשלח. אפשר לנסות שוב, או לכתוב לנו בוואטסאפ.",

    /* ---- S9 confirmation + cohort #2 ---- */
    done_title: "ההרכב בדרך אליכם.",
    done_sub: "הצוות של Product Lab קורא מה שכתבתם ועונה אישית תוך 24 שעות.",
    done_cohort_eyebrow: "הצעד הבא",
    done_cohort_title: "הצוות הזה קם בסדנה.",

    /* ---- rate-limited (the OTHER failure state - unrelated, unchanged) ---- */
    limited_title: "יותר מדי בקשות היום מהרשת הזאת.",
    limited_sub: "התשובות שלכם שמורות. תשאירו אימייל ונשלח לכם את ההרכב.",
    limited_cta: "להשאיר אימייל",
  },

  en: {
    page_title: "Which agent team do you need | Product Lab",

    entry_eyebrow: "Who will help you build",
    entry_title: "Which agent team do you need?",
    entry_sub: "5 short questions about your work. At the end, we recommend who to start with.",
    entry_cta: "Start",

    agents_title: "There are many kinds of agents. You probably need only a few.",
    agents_sub: "Here are a few examples of agents that could join your team.",
    agents_aria: "Examples of possible agents",

    return_note: "You already have a team lineup from last time.",
    return_open: "Show me my team",
    return_reset: "Start over",

    q_counter: "Question {n} of 5",
    q_answer_label: "Your answer",
    q_back: "Back",
    q_next: "Next",
    q_submit: "Who is on my dream team?",
    q_short: "A few more words. That is how the lineup speaks about you, not about everyone.",
    q_choose: "Pick one.",
    q_choose_many: "Tick at least one. Nothing yet counts too.",
    tools_none: "Nothing yet",
    tools_other: "Something else",
    tools_other_ph: "Which tool? We want to know.",
    q_chars: "{n}/{max}",
    mic_start: "Or just talk",
    mic_stop: "Listening. Stop",
    mic_aria_start: "Talk instead of typing",
    mic_aria_stop: "Stop listening",
    mic_denied: "The browser blocked the microphone. Allow it, or keep typing.",
    questions: [
      { key: "q1", title: "What are you building that keeps you up at night?", hint: "What it is and who it is for. A sentence or two, your words.", ph: "A scheduling app for small clinics. I am alone on product, design and launch, and most of the time on support too." },
      { key: "q5", title: "Which AI tools have you already worked with?", hint: "Tick everything you have touched, even once.", ph: "",
        tools: [
          { v: "chatgpt", l: "ChatGPT" },
          { v: "claude", l: "Claude" },
          { v: "gemini", l: "Gemini" },
          { v: "copilot", l: "Copilot" },
          { v: "perplexity", l: "Perplexity" },
          { v: "notion_ai", l: "Notion AI" },
          { v: "cursor", l: "Cursor" },
          { v: "claude_code", l: "Claude Code" },
          { v: "lovable", l: "Lovable" },
          { v: "v0", l: "v0" },
          { v: "replit", l: "Replit" },
          { v: "bolt", l: "Bolt" },
        ],
        choices: [
          { v: "none", l: "Nothing yet" },
          { v: "chat", l: "Chat, ChatGPT or Claude" },
          { v: "claude_code_broke", l: "Claude Code, Cursor, Lovable" },
        ] },
      { key: "q2", title: "What gets stuck with you, or will?", hint: "Everything that waits until you are free. The team is built from this.", ph: "For now everything, because it is just me. Mostly the screens before dev, and every text that goes out to users." },
      { key: "q3", title: "What do you keep explaining in every chat?", hint: "What gets forgotten between one chat and the next. This goes into memory.", ph: "That the customer is the clinic manager, not the doctor, that the palette is locked, and no Android this year. Every new chat starts from zero." },
      { key: "q4", title: "What does not happen without your approval?", hint: "In your product or service. The line the team never crosses alone.", ph: "Any message to a customer, an email to the whole list, a price change, and any update going live. Without my approval it does not move." },
    ],

    /* ---- S6 loading ---- */
    loading_line: "Reading what you wrote.",
    loading_title: "Putting your team together.",
    loading_lines: {
      strategist: [
        "Understanding what you are building.",
        "Marking where you want to stay in control.",
      ],
      designer: [
        "Spotting where the work gets stuck.",
        "Comparing roles that could fit.",
      ],
      architect: [
        "Checking what can move to an agent.",
        "Choosing who to start with.",
      ],
    },
    loading_roles: {
      "user-researcher": "Maybe someone should test assumptions before you build.",
      "copywriter": "Maybe something needs the right words before it goes out.",
      "design-system-lead": "Maybe the issue is not speed, it is staying consistent.",
      "reviewer": "Maybe someone should check things before they move on.",
      "chief-of-staff": "Maybe someone should help decide what waits for now.",
      "marketing-designer": "Maybe there is work worth showing off more clearly.",
    },
    loading_note: "One more moment. The recommendation is coming together.",

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
    gate_sub: "By email: this lineup as it is, in a file you keep, and what the workshop does with it. The Product Lab team reads what you wrote and replies personally within 24 hours.",
    gate_manual_title: "Your lineup did not make it out this time.",
    gate_manual_sub: "Everything you wrote is saved, word for word. Leave an email, and we will send you the lineup the moment it is ready.",
    gate_limited_title: "Too many requests today from this network.",
    gate_limited_sub: "Leave an email and we will send you the lineup.",
    gate_name_label: "Name",
    gate_email_label: "Email",
    gate_email_ph: "you@email.com",
    gate_note_label: "Anything to add? (optional)",
    gate_note_ph: "One line. What you would want this team to take off your plate first.",
    gate_submit: "Send it to me",
    gate_error: "That did not go through. Try again, or write to us on WhatsApp.",

    done_title: "Your lineup is on its way.",
    done_sub: "The Product Lab team reads what you wrote and replies personally within 24 hours.",
    done_cohort_eyebrow: "The next step",
    done_cohort_title: "The workshop is where this team gets built.",

    limited_title: "Too many requests today from this network.",
    limited_sub: "Your answers are saved. Leave an email and we will send you the lineup.",
    limited_cta: "Leave an email",
  },
};

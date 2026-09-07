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

    /* ---- S0 "examples" block, below the CTA (2026-09-07, v8: one merged
       title instead of title+sub - Ofir: the two lines were redundant) ---- */
    agents_title: "הנה כמה דוגמאות לסוכני AI שיכולים להצטרף לצוות שלכם.",
    agents_aria: "דוגמאות לסוכנים אפשריים",
    /* Full real-portrait roster (Marketing Designer inventory, 2026-09-07):
       10 characters with a real image today. `role` is the REAL professional
       title (tooltip's bold line, Ofir: "nobody knows the nicknames, I want
       known titles") - never the internal deck nickname. `line` is the
       tooltip's regular-weight description, same "does X, never Y alone"
       shape as the existing crew lines. CFO/Curator/Mentor/PA have no real
       portrait yet (confirmed absent fleet-wide) and are excluded on purpose. */
    agents: [
      { img: "crew-strategist", role: "מנהל מוצר", line: "מחדד מה בונים ולמה, עוזר לתעדף החלטות ומחבר בין צרכי המשתמש למטרות המוצר." },
      { img: "crew-designer", role: "מעצב מוצר", line: "מתרגם רעיונות לזרימות וממשקים ברורים, עקביים ונוחים לשימוש." },
      { img: "crew-architect", role: "מוביל טכני", line: "הופך רעיונות לפתרון טכני ישים, מפרק מורכבות ומכוון את דרך המימוש." },
      { img: "crew-cmo", role: "מוביל שיווק מוצר", line: "מחדד את המיצוב והמסר של המוצר ומחבר בין מה שבנינו לבין הערך שהמשתמש מבין." },
      { img: "crew-cso", role: "סמנכ\"ל אסטרטגיה", line: "עוזר לחדד כיוון, לזהות הזדמנויות ולחבר החלטות מוצר לתמונה העסקית הרחבה." },
      { img: "crew-dslead", role: "ראש מערכת עיצוב", line: "מפתח ושומר על מערכת העיצוב כך שפיצ׳רים ומסכים חדשים נשארים עקביים וקלים להרחבה." },
      { img: "crew-copywriter", role: "קופירייטר", line: "כותב את הטקסטים במוצר ובתקשורת סביבו כך שיהיו ברורים, מדויקים ונעימים לקריאה." },
      { img: "crew-mdesigner", role: "מעצב שיווק", line: "מתרגם את הסיפור של המוצר לשפה חזותית עבור השקה, עמודים וחומרים שמציגים אותו." },
      { img: "crew-userresearcher", role: "חוקר משתמשים", line: "בודק איך אנשים משתמשים במוצר, מזהה צרכים וחיכוכים ומביא תובנות שמחדדות החלטות." },
    ],

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
    loading_title: "מרכיבים לכם צוות.",
    /* One line per agent, keyed by img - the SAME img keys as `agents` above.
       The pool is built from f.agents directly (fleetLoadingPool), so the
       role label shown here is always byte-identical to S0's - one source
       of truth, nothing to drift out of sync. Framing: each line is a lens
       on the answers already given, never a claim of seeing screens, code
       or research that was never provided (Ofir, 2026-09-07). */
    loading_agent_lines: {
      "crew-strategist": "מחדדים מה אתם מנסים לבנות ואיפה הכי נכון להתחיל.",
      "crew-designer": "מזהים איפה חוויית המוצר יכולה להרוויח עוד זוג עיניים.",
      "crew-architect": "מזהים איפה שותף טכני יכול להפוך רעיון למשהו שאפשר לבנות.",
      "crew-cmo": "בודקים איך הערך של המוצר מתחבר לאנשים שאמורים להשתמש בו.",
      "crew-cso": "בודקים איפה החלטות המוצר פוגשות את התמונה הגדולה.",
      "crew-dslead": "מזהים איפה עקביות בין מסכים ופיצ'רים יכולה לחסוך עבודה בהמשך.",
      "crew-copywriter": "בודקים איפה המילים במוצר יכולות להיות ברורות ומדויקות יותר.",
      "crew-mdesigner": "מזהים איפה הסיפור של המוצר צריך לקבל ביטוי חזותי חזק יותר.",
      "crew-userresearcher": "בודקים איפה חסר ידע על המשתמשים לפני שמקבלים החלטה.",
    },
    loading_note: "עוד רגע. ההמלצה כבר מתגבשת.",

    /* ---- S7 result (v3, 2026-09-07: Ofir's full rebuild — hero-first, no
       puppets, core trio reframed as always-included, brain+memory+leave
       consolidated into one short benefits section, real CTA) ---- */
    result_eyebrow: "הרכב הצוות שלכם",
    result_title: "הצוות שמתאים למה שאתם בונים.",
    result_sub: "לפי מה שסיפרתם, אלה הסוכנים שהכי יעזרו לכם סביב המוצר.",
    result_lead: "בשביל",
    crew_eyebrow: "צוות הבסיס",
    crew_title: "ועם כל מוצר מגיע צוות הבסיס.",
    crew_sub: "שלושה תפקידים שלא ממליצים עליהם — הם הבסיס לכל מוצר דיגיטלי.",
    crew: [
      { role: "מנהל מוצר", line: "מחדד את הבעיה, סדר העדיפויות והחלטות המוצר לאורך הדרך." },
      { role: "מעצב מוצר", line: "מתרגם רעיונות לזרימות, ממשקים וחוויית מוצר שאפשר להשתמש בה." },
      { role: "מוביל טכני", line: "מפרק את המימוש הטכני, עוזר לבחור גישה ומלווה את הבנייה." },
    ],
    spec_eyebrow: "המומחים שלכם",
    spec_title: "מי שמצטרף בגלל מה שכתבתם.",
    spec_sub: "אחד עד שלושה, לא שמונה. מי שמתחילים ממנו מסומן.",
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
      "product-analyst": "אנליסט המוצר",
      "content-curator": "אוצר התוכן",
      "qa-specialist": "בודק ה-QA",
      "accessibility-specialist": "מומחה הנגישות",
      "onboarding-specialist": "מומחה ה-Onboarding",
      "technical-writer": "כותב התיעוד",
      "product-ops": "Product Ops",
      "localization-specialist": "מומחה הלוקליזציה",
      "security-privacy-reviewer": "בודק האבטחה",
    },
    /* ---- v2 (2026-09-07): fixed template bank, keyed by specialist enum. ----
       PLACEHOLDER pending Copywriter's official v2 pass - built from core.ts's
       own canonical LIBRARY does/reads/changes/never text (already closed-set,
       already-reviewed archetype copy, never composed per-visitor), NOT lorem.
       Every visitor who gets a given key sees the SAME text - acceptance §6. */
    spec_quote_lead: "ובזה שכתבתם:",
    spec_bank: {
      "user-researcher": {
        does: "מקשיב למה שהמשתמשים אמרו ומחזיר לכם ממצאים עם ציטוטים, לא דעות",
        reads_vs_changes: "קורא הקלטות, תשובות לשאלונים, המוח המשותף. משנה רק את קובץ הממצאים והדמויות",
        never_closes_alone: "לא מחליט מה לבנות ולא משנה עיצוב — מביא ראיות, אתם מכריעים",
      },
      "copywriter": {
        does: "כותב את המילים — פוסטים, עמודים, הודעות — בקול שלכם ולא בקול של הכלי",
        reads_vs_changes: "קורא את המותג, הדוגמאות שלכם, המוח המשותף. משנה רק קבצי טקסט וטיוטות",
        never_closes_alone: "לא מפרסם בשמכם ולא משנה עיצוב — כל מילה עוברת אצלכם לפני שהיא יוצאת",
      },
      "design-system-lead": {
        does: "שומר על ספריית הקומפוננטות והטוקנים תקינה ומייצר קומפוננטות חדשות לפי הכללים הקיימים",
        reads_vs_changes: "קורא את הספרייה, הפיגמה, המסכים שפותחו. משנה רק את קבצי הספרייה והטוקנים",
        never_closes_alone: "לא מוציא מסך לפיתוח ולא מאשר הנדאוף בלי האישור שלכם",
      },
      "reviewer": {
        does: "עובר על מה שאחרים בנו לפני שזה מגיע אליכם ומדווח מה חסר, מה סוטה ומה מוכן",
        reads_vs_changes: "קורא כל מה שהצוות הפיק, המוח המשותף. משנה רק את דוח הבדיקה",
        never_closes_alone: "לא מתקן בעצמו ולא מחליט — מסמן, אתם מכריעים",
      },
      "chief-of-staff": {
        does: "ממיין את מה שנכנס, מסדר לפי מה שהוחלט, ומחזיר לכם רשימה קצרה של מה שדורש אתכם",
        reads_vs_changes: "קורא הכול — הודעות, פתקים, המוח המשותף, הזיכרון של כל הצוות. משנה רק את סדר העדיפויות במוח המשותף",
        never_closes_alone: "לא עונה בשמכם ולא מקבל החלטה — מכין, אתם מחליטים",
      },
      "marketing-designer": {
        does: "מפיק את הוויזואל — לפוסט, למצגת, לעמוד — מתוך המותג שכבר יש לכם",
        reads_vs_changes: "קורא את המותג, ספריית התמונות שלכם, המוח המשותף. משנה רק קבצי תמונה ומצגת",
        never_closes_alone: "לא מפרסם ולא משנה את המותג עצמו — כל ויזואל עובר אצלכם",
      },
      "product-analyst": {
        does: "עוקב אחרי המספרים של המוצר ומחזיר לכם מה קורה בפועל — לא ניחוש, נתונים",
        reads_vs_changes: "קורא הנתונים, דשבורדים, המוח המשותף. משנה רק את דוחות המדדים והתרשימים",
        never_closes_alone: "לא מחליט מה לבנות ולא משנה שום דבר במוצר — מראה מספרים, אתם מכריעים",
      },
      "content-curator": {
        does: "עובר על ספריית התוכן או המסכים, מסמן מה מיושן ומה חסר, ומחזיר לכם רשימה מסודרת",
        reads_vs_changes: "קורא ספריית התוכן, המסכים הקיימים, המוח המשותף. משנה רק את קטלוג התוכן והתיוג שלו",
        never_closes_alone: "לא מוחק ולא מפרסם תוכן — מסמן, אתם מכריעים",
      },
      "qa-specialist": {
        does: "עובר על מה שנבנה לפני שזה יוצא לאוויר ומוצא באגים לפני שהמשתמשים מוצאים אותם",
        reads_vs_changes: "קורא המסכים שנבנו, המפרט, המוח המשותף. משנה רק את דוח הבאגים",
        never_closes_alone: "לא מתקן בעצמו ולא מאשר שחרור — מדווח, אתם מכריעים",
      },
      "accessibility-specialist": {
        does: "עובר על המוצר מול תקן נגישות ומחזיר רשימה של מה חוסם משתמשים עם מוגבלות",
        reads_vs_changes: "קורא המסכים, הקוד, תקני הנגישות. משנה רק את דוח הנגישות",
        never_closes_alone: "לא מתקן בעצמו ולא קובע עדיפויות — מדווח, אתם מכריעים",
      },
      "onboarding-specialist": {
        does: "עובר על החוויה הראשונה של משתמש חדש ומסמן איפה אנשים נתקעים או נוטשים",
        reads_vs_changes: "קורא מסכי ההרשמה וההפעלה הראשונה, המוח המשותף. משנה רק את דוח החוויה הראשונה",
        never_closes_alone: "לא משנה מסך בעצמו — מסמן, אתם מכריעים",
      },
      "technical-writer": {
        does: "כותב את מסכי העזרה, ההנחיות בתוך המוצר ותיעוד למשתמש — לא שיווק, הסבר",
        reads_vs_changes: "קורא המוצר, המסכים הקיימים, המוח המשותף. משנה רק קבצי תיעוד ועזרה",
        never_closes_alone: "לא כותב תוכן שיווקי ולא משנה עיצוב — כל טקסט עובר אצלכם",
      },
      "product-ops": {
        does: "שומר על התהליך והכלים של הצוות עצמו — לא של המוצר — כך שאף אחד לא בונה בכפילות",
        reads_vs_changes: "קורא המוח המשותף, הכלים והתהליכים של הצוות. משנה רק את קבצי התהליך והתיעוד הפנימי",
        never_closes_alone: "לא בונה פיצ'רים ולא מחליט מה נכנס — מסדר את איך עובדים, אתם מכריעים",
      },
      "localization-specialist": {
        does: "עובר על המוצר לשפה או שוק חדש ומסמן מה לא מתורגם, לא מתאים תרבותית או שבור",
        reads_vs_changes: "קורא המסכים, קבצי התרגום, המוח המשותף. משנה רק את קבצי התרגום",
        never_closes_alone: "לא מפרסם גרסה חדשה בעצמו — מסמן, אתם מכריעים",
      },
      "security-privacy-reviewer": {
        does: "עובר על המוצר ומסמן איפה מידע רגיש נחשף או נשמר בלי הגנה מספקת",
        reads_vs_changes: "קורא הקוד, מסכי המוצר, איך מידע זורם בין חלקים. משנה רק את דוח החשיפות",
        never_closes_alone: "לא מתקן בעצמו ולא קובע מה דחוף — מדווח, אתם מכריעים",
      },
    },
    broke_title: "למה זה נשבר בפעם הקודמת",
    /* v2: broke_because is now an enum (no_memory|no_boundary), fixed 2 lines. */
    broke_bank: {
      no_memory: "לא היה לו זיכרון בין שיחות. בכל צ'אט חדש הוא התחיל מאפס.",
      no_boundary: "לא היה כתוב לו מה אסור לו לשנות בלי האישור שלכם. בפעם השלישית הוא החליט לבד.",
    },
    /* v3 (2026-09-07): brain+memory (2 cards) + leave (4 items) consolidated
       into ONE short section, 3 benefits — Ofir: "not a long report, very
       concise." */
    benefits_eyebrow: "מה זה אומר בפועל",
    benefits_title: "זה לא רק רעיון לצוות. בסדנה אתם מקימים אותו.",
    benefits: [
      { t: "הצוות קם בסדנה", b: "את צוות הבסיס ואת הסוכנים שמתאימים לכם מקימים כחלק מהסדנה — לא רק מדברים עליהם." },
      { t: "זיכרון משותף שנשאר", b: "הסוכנים עובדים עם מוח משותף אחד: מה שהוחלט ונלמד ממשיך איתכם גם לעבודה הבאה." },
      { t: "אתם לא תלויים בי אחר כך", b: "בסוף הערב נשאר לכם שותף טכני שאפשר להתייעץ איתו — להוסיף סוכן, לשנות תהליך, להרחיב את הצוות." },
    ],
    positioning_line: "Product Lab מלמדת איך לבנות ולעבוד עם צוותי AI סביב מוצרים, פיצ'רים ותהליכי מוצר.",
    result_cta_title: "רוצים לצאת עם הצוות הזה מוכן לעבודה?",
    result_cta_sub: "בסדנה מקימים את הצוות, מחברים לו זיכרון משותף ומתחילים לעבוד איתו על משהו אמיתי שלכם.",
    result_cta: "לפרטי הסדנה",
    result_cta_wa: "דברו איתי בוואטסאפ",
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

    agents_title: "Here are a few examples of AI agents that could join your crew.",
    agents_aria: "Examples of possible agents",
    agents: [
      { img: "crew-strategist", role: "Product Manager", line: "Sharpens what to build and why, helps prioritize decisions, and connects user needs to product goals." },
      { img: "crew-designer", role: "Product Designer", line: "Turns ideas into clear, consistent, easy-to-use flows and interfaces." },
      { img: "crew-architect", role: "Lead Engineer", line: "Turns ideas into a workable technical solution, breaks down complexity, and guides how it gets built." },
      { img: "crew-cmo", role: "Product Marketing Lead", line: "Sharpens the product's positioning and message, connecting what was built to the value users see." },
      { img: "crew-cso", role: "Chief Strategy Officer", line: "Helps sharpen direction, spot opportunities, and connect product decisions to the bigger business picture." },
      { img: "crew-dslead", role: "Design System Lead", line: "Builds and maintains the design system so new features and screens stay consistent and easy to extend." },
      { img: "crew-copywriter", role: "Copywriter", line: "Writes the product's words and the communication around it so they're clear, precise, and pleasant to read." },
      { img: "crew-mdesigner", role: "Marketing Designer", line: "Turns the product's story into visuals for launches, pages, and materials that present it." },
      { img: "crew-userresearcher", role: "User Researcher", line: "Studies how people use the product, spots needs and friction, and brings insights that sharpen decisions." },
    ],

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
    loading_title: "Putting your team together.",
    loading_agent_lines: {
      "crew-strategist": "Sharpening what you're trying to build and where it makes sense to start.",
      "crew-designer": "Spotting where the product experience could use another pair of eyes.",
      "crew-architect": "Spotting where a technical partner could turn an idea into something buildable.",
      "crew-cmo": "Checking how the product's value connects to the people meant to use it.",
      "crew-cso": "Checking where product decisions meet the bigger picture.",
      "crew-dslead": "Spotting where consistency across screens and features could save work later.",
      "crew-copywriter": "Checking where the product's words could be clearer and more precise.",
      "crew-mdesigner": "Spotting where the product's story needs a stronger visual voice.",
      "crew-userresearcher": "Checking where there's a gap in user knowledge before a decision gets made.",
    },
    loading_note: "One more moment. The recommendation is coming together.",

    result_eyebrow: "Your team lineup",
    result_title: "The team that matches what you're building.",
    result_sub: "Based on what you told us, these are the agents that will help you most around the product.",
    result_lead: "For",
    crew_eyebrow: "The build crew",
    crew_title: "And every product ships with the build crew.",
    crew_sub: "Three roles we don't 'recommend' — they're the foundation of every digital product.",
    crew: [
      { role: "Product manager", line: "Sharpens the problem, the priorities, and the product decisions along the way." },
      { role: "Product designer", line: "Turns ideas into flows, interfaces, and a product experience people can use." },
      { role: "Lead engineer", line: "Breaks down the technical build, helps choose an approach, and sees it through." },
    ],
    spec_eyebrow: "Your specialists",
    spec_title: "Who joins because of what you wrote.",
    spec_sub: "One to three, not eight. The one you start with is marked.",
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
      "product-analyst": "The product analyst",
      "content-curator": "The content curator",
      "qa-specialist": "The QA specialist",
      "accessibility-specialist": "The accessibility specialist",
      "onboarding-specialist": "The onboarding specialist",
      "technical-writer": "The technical writer",
      "product-ops": "Product ops",
      "localization-specialist": "The localization specialist",
      "security-privacy-reviewer": "The security & privacy reviewer",
    },
    /* ---- v2 (2026-09-07): fixed template bank, keyed by specialist enum. ----
       PLACEHOLDER pending Copywriter's official v2 pass - see the HE block's
       comment. */
    spec_quote_lead: "And in your own words:",
    spec_bank: {
      "user-researcher": {
        does: "Listens to what users actually said and hands you findings with quotes, not opinions",
        reads_vs_changes: "Reads recordings, survey answers, the shared brain. Changes only the findings and persona files",
        never_closes_alone: "Never decides what to build and never touches design — brings evidence, you rule",
      },
      "copywriter": {
        does: "Writes the words — posts, pages, messages — in your voice, not the tool's",
        reads_vs_changes: "Reads the brand, your own examples, the shared brain. Changes only text files and drafts",
        never_closes_alone: "Never publishes in your name and never changes design — every word passes you first",
      },
      "design-system-lead": {
        does: "Keeps the component library and tokens sound and builds new components by the existing rules",
        reads_vs_changes: "Reads the library, Figma, the screens that were built. Changes only the library and token files",
        never_closes_alone: "Never ships a screen to dev and never signs off a handoff without your approval",
      },
      "reviewer": {
        does: "Checks what others built before it reaches you and reports what is missing, off, or ready",
        reads_vs_changes: "Reads everything the team produced, the shared brain. Changes only the review report",
        never_closes_alone: "Never fixes and never decides — flags, you rule",
      },
      "chief-of-staff": {
        does: "Triages what comes in, orders it by what was decided, and hands you a short list of what needs you",
        reads_vs_changes: "Reads everything — messages, notes, the shared brain, every teammate's memory. Changes only the priorities in the shared brain",
        never_closes_alone: "Never answers in your name and never makes the call — prepares, you decide",
      },
      "marketing-designer": {
        does: "Produces the visuals — for the post, the deck, the page — from the brand you already have",
        reads_vs_changes: "Reads the brand, your image library, the shared brain. Changes only image and deck files",
        never_closes_alone: "Never publishes and never changes the brand itself — every visual passes you",
      },
      "product-analyst": {
        does: "Tracks the product's numbers and hands you what's actually happening — not a guess, data",
        reads_vs_changes: "Reads the data, dashboards, the shared brain. Changes only metric reports and charts",
        never_closes_alone: "Never decides what to build and never changes anything in the product — shows numbers, you rule",
      },
      "content-curator": {
        does: "Goes over the content or screen library, flags what's stale or missing, and hands you an organized list",
        reads_vs_changes: "Reads the content library, the existing screens, the shared brain. Changes only the content catalog and its tagging",
        never_closes_alone: "Never deletes and never publishes content — flags, you rule",
      },
      "qa-specialist": {
        does: "Goes over what was built before it ships and finds the bugs before your users do",
        reads_vs_changes: "Reads the built screens, the spec, the shared brain. Changes only the bug report",
        never_closes_alone: "Never fixes on its own and never approves a release — reports, you rule",
      },
      "accessibility-specialist": {
        does: "Goes over the product against an accessibility standard and hands you what blocks users with disabilities",
        reads_vs_changes: "Reads the screens, the code, accessibility standards. Changes only the accessibility report",
        never_closes_alone: "Never fixes on its own and never sets priority — reports, you rule",
      },
      "onboarding-specialist": {
        does: "Goes over a new user's first experience and flags where people get stuck or drop off",
        reads_vs_changes: "Reads the sign-up and first-run screens, the shared brain. Changes only the first-run report",
        never_closes_alone: "Never changes a screen on its own — flags, you rule",
      },
      "technical-writer": {
        does: "Writes the help screens, in-product guidance and user docs — not marketing, explanation",
        reads_vs_changes: "Reads the product, the existing screens, the shared brain. Changes only documentation and help files",
        never_closes_alone: "Never writes marketing copy and never changes design — every text passes you",
      },
      "product-ops": {
        does: "Keeps the team's own process and tools sound — not the product's — so no one duplicates work",
        reads_vs_changes: "Reads the shared brain, the team's tools and process. Changes only process files and internal docs",
        never_closes_alone: "Never builds features and never decides what ships — orders how you work, you rule",
      },
      "localization-specialist": {
        does: "Goes over the product for a new language or market and flags what's untranslated, culturally off, or broken",
        reads_vs_changes: "Reads the screens, translation files, the shared brain. Changes only the translation files",
        never_closes_alone: "Never publishes a new version on its own — flags, you rule",
      },
      "security-privacy-reviewer": {
        does: "Goes over the product and flags where sensitive data is exposed or stored without enough protection",
        reads_vs_changes: "Reads the code, the product screens, how data flows between parts. Changes only the exposure report",
        never_closes_alone: "Never fixes on its own and never sets urgency — reports, you rule",
      },
    },
    broke_title: "Why it broke last time",
    /* v2: broke_because is now an enum (no_memory|no_boundary), fixed 2 lines. */
    broke_bank: {
      no_memory: "It had no memory between chats. Every new one started from zero.",
      no_boundary: "Nothing told it what it may not change without your approval. The third time, it decided alone.",
    },
    /* v3 (2026-09-07): brain+memory (2 cards) + leave (4 items) consolidated
       into ONE short section, 3 benefits. */
    benefits_eyebrow: "What this actually means",
    benefits_title: "It's not just a team idea. You set it up in the workshop.",
    benefits: [
      { t: "The team gets built in the workshop", b: "The build crew and the agents that fit you get set up as part of the workshop — not just talked about." },
      { t: "A shared memory that stays", b: "The agents work off one shared brain: what got decided and learned carries into your next session too." },
      { t: "You're not dependent on me afterward", b: "By the end of the evening you have a technical partner to consult — add an agent, change a process, grow the team." },
    ],
    positioning_line: "Product Lab teaches how to build and work with AI agent teams around products, features and product workflows.",
    result_cta_title: "Want to leave with this team ready to work?",
    result_cta_sub: "In the workshop we set up the team, connect it to shared memory, and start working with it on something real of yours.",
    result_cta: "Workshop details",
    result_cta_wa: "Talk to me on WhatsApp",
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

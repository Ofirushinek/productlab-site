/* =============================================================================
   PRODUCT LAB — GATED WORKSHOP CONTENT (window.WORKSHOP_CONTENT)
   -----------------------------------------------------------------------------
   This is the POST-workshop content vault. It renders on the gated #/prep route,
   behind the cohort password gate. app.js reads from window.WORKSHOP_CONTENT
   (below) — it does NOT hard-code this content. Loaded by a plain <script> in
   index.html BEFORE app.js, with a ?v= cache-bust.

   OFIR: THIS FILE IS YOUR SINGLE SOURCE OF TRUTH for the gated content. Edit the
   strings here to change what students see. When you edit, bump the ?v= on the
   content.js <script> tag in index.html so browsers fetch the new version.

   PROMPTS: each prompt is a template-literal string (backticks). The prompt text
   has NO backticks and NO ${...} inside it — keep it that way so you can edit
   freely without escaping. Prompts are technical text: they stay ENGLISH in both
   the HE and EN toggle states. The prompt bodies are canonical in deck.json and
   must stay byte-identical to it. Reword there first, then here.

   SECURITY NOTE: content.js ships to the browser and is publicly
   fetchable regardless of the password gate. That is FINE for these prompts —
   students receive them anyway. Do NOT put anything truly secret in this file.

   LANGUAGE: the teaching copy is BILINGUAL. The content model exists twice, under
   `en` and `he`, with identical shape. app.js picks WORKSHOP_CONTENT[lang] from
   the site toggle (fallback `en`) and sets the prep <main> direction (ltr / rtl)
   to match. The prompt BODIES stay ENGLISH in both states (technical text); only
   the labels/intros around them are translated. EN and HE both authored/approved
   by the Copywriter (parity, dash-clean). Governed by curriculum-truth.md.
   ========================================================================== */

window.WORKSHOP_CONTENT = (function () {

  /* ---- The prompts, exactly as the deck shows them ----------------------
     CANONICAL SOURCE: projects/product-lab/workshop/deck.json, slides 14-18, plus
     the /check and /wrap commands the kit ships. These strings are BYTE-IDENTICAL
     to the deck placeholders on purpose: the student copies from this page while
     Ofir reads from the deck, so any drift runs two different prompts in one room.
     If a prompt needs rewording it changes in deck.json FIRST and this follows.
     Technical text: English in both language states. No backticks, no ${...}. */

  const CHECK = `/check`;

  const PM_OPEN = `/start product-manager`;
  const PM_BRIEF = `I want to build a waiting-list page for my project: [fill in: what your site/tool/app is and who it's for].`;

  const PD_OPEN = `/start product-designer`;
  const PD_BRIEF = `Check with the product manager about this project, then show me the three reference styles you've prepared for this - give me real clickable links so I can look at each one myself.`;

  const TL_OPEN = `/start technical-lead`;
  const TL_BUILD = `Please build the waiting-list page, guided by the product manager's plan and the product designer's direction.`;

  const COPY_RECRUIT = `I want to add a new teammate to this team: a copywriter. Their one job: own every word that appears on any page we build \u2014 headlines, buttons, form copy, all of it. Character: precise, protective of a consistent voice, plain-spoken, pushes back on filler words. No extra skill needed yet.`;

  const COPY_OPEN = `/start copywriter`;
  const COPY_RULE = `New house rule: no more long dashes, anywhere, ever - including in the waiting-list page we just built. Please fix that one too.`;

  const WRAP_UP = `/wrap`;

  /* ---- Prompts, keyed. Step cards reference these by key (shared HE + EN). */
  const PROMPTS = {
    check: CHECK,
    pmOpen: PM_OPEN,
    pmBrief: PM_BRIEF,
    pdOpen: PD_OPEN,
    pdBrief: PD_BRIEF,
    tlOpen: TL_OPEN,
    tlBuild: TL_BUILD,
    copyRecruit: COPY_RECRUIT,
    copyOpen: COPY_OPEN,
    copyRule: COPY_RULE,
    wrapup: WRAP_UP,
  };

  /* ---- ENGLISH content model ------------------------------------------- */
  const EN = {
    /* 1 — Plain functional page title (no hero: no kicker, no marketing body, no CTA). */
    hero: {
      title: "Your workshop workspace",
    },

    /* 1b — The kit and the deck. First on the page and never collapsed: this is
       what a student comes back for months later, on a new machine. */
    kit: {
      kicker: "Start here",
      title: "Your kit, and the deck",
      subtitle: "The two things you keep after today. They stay on this page, so come back whenever you need them.",
      items: [
        {
          icon: "box", featured: true,
          kicker: "Download",
          title: "The Product Lab kit",
          body: "Your three teammates, the shared brain they write to, and the skills they work from. Unzip it into your Documents folder and point Claude at it. It is the same file you got before the session.",
          href: "assets/product-lab.zip", download: true,
          cta: "Download product-lab.zip",
          note: "One exception: if your Documents folder sits inside OneDrive or iCloud, put the kit in your home folder instead.",
        },
        {
          icon: "video",
          kicker: "Slide by slide",
          title: "The session deck",
          body: "Every slide from the workshop, in order. Open it when you want the shape of the day back, or the one line you half remember.",
          href: "https://docs.google.com/presentation/d/1HnbNtSQ8M8OR_GanBl3O87OhERgupUYj_mI7isHv90w/preview",
          cta: "Open the deck",
        },
      ],
    },

    /* 2 — By the end of today (three parts). */
    end: {
      kicker: "Start from the end",
      title: "By the end of today",
      subtitle:
        "Two things you walk away with, and one you take home to finish.",
      team: {
        kicker: "Put the team to work",
        title: "Three teammates you direct",
        teammates: [
          { name: "Your Technical Lead", charter: "Technical partner", body: "Makes the scary parts disappear." },
          { name: "Your Product Manager", charter: "Product partner", body: "Keeps you sharp and focused." },
          { name: "Your Product Designer", charter: "Design partner", body: "An extension of your own craft, growing with you." },
        ],
      },
      foundation: {
        kicker: "Your first landing page",
        title: "A first version, live in your browser",
        body:
          "A one-page landing that teases a product idea: a title, a description, a light visual touch, and a field that collects emails. Built in the design language you picked.",
      },
      home: {
        tag: "Home assignment",
        title: "Then, you take it home",
        body:
          "With your Technical Lead beside you, you finish the page, connect the email field to a real list, set up GitHub, get a domain and publish it.",
      },
    },

    /* 3 — Technical overview (the mental model + the funnel). */
    technical: {
      kicker: "Technical overview",
      title: "Why a narrower AI is a smarter AI",
      subtitle:
        "The whole method in one idea: you don't make an agent smarter by piling on - you make it sharper by narrowing what it does.",
      stages: [
        { title: "A vast, general mind", body: "Out of the box, AI knows a little about almost everything. Powerful - but broad, and easily unfocused." },
        { title: "Give it a role", body: "Scope it to one job and one identity. A narrower mandate makes it noticeably sharper and more accurate at exactly what you need." },
        { title: "Give it skills and tools", body: "Hand it skills and tools it can actually run. Now it doesn't just think - it acts, and focuses tighter still." },
        { title: "Give it memory and context", body: "Wire it a communication system so it always knows what you're working on and what's been done to date. We build this on Obsidian - the shared brain that keeps the whole team in context." },
      ],
      funnelTiers: [
        { label: "General mind" },
        { label: "+ a role" },
        { label: "+ skills & tools" },
        { label: "+ memory" },
      ],
      funnelPoint: "One sharp agent",
      closing:
        "Broad intelligence, narrowed into a sharp, tooled, context-aware teammate. That's the orchestration you'll set up today - and why what you build keeps working tomorrow.",
    },

    /* 4 — Tool selection (two ways to build, how to choose). */
    tools: {
      kicker: "Choosing your stack",
      title: "Two ways to build, and how to choose",
      subtitle:
        "Every path sits somewhere between one all-in-one tool that does it all for you, and an open kit you assemble yourself. Here's the trade, so today's choice makes sense.",
      options: [
        {
          icon: "box",
          kicker: "All-in-one builders",
          title: "Vibe-coding tools",
          lede: "Lovable, Base and the like - one place that designs, builds and ships for you.",
          benefits: [
            "Everything's included - no setup, no plumbing, no leaving the room.",
            "You move fast and see something real early, with as little complexity as possible.",
            "The gentlest on-ramp there is - perfect for getting a personal project off the ground.",
          ],
          noteLabel: "Good to know",
          note: "Best for independent projects. Once a project gets big, or turns complex, or needs to connect to outside tools, they can get frustrating - and most organizations with design teams don't use them yet.",
          featured: false,
        },
        {
          icon: "claude",
          kicker: "The professional kit",
          title: "Claude Code",
          lede: "The craftsman's kit - what we set up together today.",
          benefits: [
            "The most flexible by far - build almost anything, connect to almost anything.",
            "The first go-to inside real product-design teams today.",
            "It's the engineers' main tool too - so your work flows straight into theirs.",
          ],
          noteLabel: "Good to know",
          note: "A steeper learning curve, and less designer-friendly at first. That's the trade you make for range, potential, and staying power.",
          featured: true,
        },
      ],
      closing:
        "Today we build on Claude - the harder start that keeps paying off, and the one that plugs straight into how real teams work.",
    },

    /* 4b — The shared brain (M3): how the files connect (diagram section). */
    sharedBrain: {
      kicker: "The shared brain",
      title: "How your whole team works from one picture",
      subtitle:
        "Your agents are not separate chats. They share one memory, so the team always works from the same picture, and every decision stays saved.",
      body:
        "Every agent has its own files: a role that says what it does, a character that says who it is, the skills it can run, and a memory of its own. Above them all sits one shared brain that every agent reads and writes, and a learning log where the team records what worked. Here is how it all connects.",
      nodes: {
        agent: "Agent",
        role: "Role",
        character: "Character",
        skills: "Skills",
        memory: "Memory",
        sharedBrain: "Shared brain",
        learningLog: "Learning log",
      },
    },

    /* 4c — The three agents that ship inside the kit. */
    crew: {
      kicker: "Your team",
      title: "Meet the team you will work with",
      subtitle: "Three today. The same pattern adds a fourth whenever you need one.",
      members: [
        { icon: "laptop", role: "Technical Lead", tag: "Your technical partner",
          body: "Holds the tools, and is the only one that builds the other agents.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
        { icon: "flow", role: "Product Manager", tag: "Your product partner",
          body: "Decides what is in version one, and what waits.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
        { icon: "spark", role: "Product Designer", tag: "Your design partner",
          body: "Sets the look, and writes it down.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
      ],
      closing: "All three come inside the kit, already built. Today you direct them, and when a job starts repeating you add a fourth the same way.",
    },

    /* 5 — The session flow. REWRITTEN 2026-08-27 (Dean) from deck.json slides
       10 and 12 and 14-18, replacing the abandoned 10-step build-from-nothing
       sequence that named a CTO and a CPO. Every prompt body is byte-identical
       to its slide. Each step carries what should come back (`note`) so the page
       works when it is read alone, months later, with nobody to ask. */
    plan: {
      kicker: "The flow",
      title: "The whole session, start to finish",
      subtitle: "Open a new conversation before every step. That one habit prevents most of what goes wrong.",
      steps: [
        {
          n: "00",
          title: "Before the workshop",
          body: "Set all of this up before we meet. About 15-20 minutes. If something gets stuck, message me before the day, so we fix it together and not live in the session.",
          checklist: [
            { name: "Create a Claude Pro account", tag: "$20 / mo", note: 'Not optional: Claude Code does not run on the free plan. Sign up at <a class="plink" dir="ltr" href="https://claude.ai/upgrade" target="_blank" rel="noopener">claude.ai/upgrade</a>.' },
            { name: "Claude desktop app", note: 'Download from <a class="plink" dir="ltr" href="https://claude.com/download" target="_blank" rel="noopener">claude.com/download</a> and install it. The desktop app, not the terminal. No code.' },
            { name: "Download and unzip the kit", tag: "Above", note: "product-lab.zip is at the top of this page. Unzip it into your Documents folder. If your Documents sits inside OneDrive or iCloud, use your home folder instead." },
            { name: "Windows only: Git", tag: "Windows", note: 'Install from <a class="plink" dir="ltr" href="https://git-scm.com/downloads" target="_blank" rel="noopener">git-scm.com/downloads</a>, then close and reopen the Claude app. On a Mac, skip this one.' },
            { name: "Come with a fresh usage window", note: "Claude Pro caps usage weekly, shared across everything on your account, and there is no way to see your headroom in advance. Go easy on other Claude work the day before." },
          ],
        },
        {
          n: "01",
          title: "Open the kit and check your team",
          body: "Point Claude at the kit folder, then ask it whether the team is really there. One command, and you know whether the rest of the day will work.",
          note: "In Claude: the Code tab, then Local, then Select folder, and pick your product-lab folder. Say yes when it asks whether you trust it.",
          prompts: [
            { key: "check", label: "Type this", intro: "You should get back STATUS: PERFECT and three teammates. If you do not, stop here and message me instead of pushing on." },
          ],
        },
        {
          n: "02",
          title: "Brief your Product Manager",
          body: "Tell it what you want to build. It decides what belongs in version one, and what waits.",
          note: "What comes back: a short list of what the page needs (always an email capture, plus one or two more elements if they genuinely fit), and a line sending you on to the designer. No clarifying questions, no roadmap talk. It just answers.",
          prompts: [
            { key: "pmOpen", label: "1. Open a new conversation, then type", intro: "Click New first. Every step starts in its own conversation." },
            { key: "pmBrief", label: "2. Then, in the same conversation", intro: "Replace what is in the brackets with your own idea: what your site, tool or app is, and who it is for." },
          ],
        },
        {
          n: "03",
          title: "Your Designer shows you three real styles",
          body: "Three references, prepared in advance, so choosing a direction is a decision and not a shrug.",
          note: "What comes back: one short line confirming what is being built, then exactly three links - Arc, Cohere and Stripe x A24. Open all three, then reply with your pick. For example: I like Cohere.",
          prompts: [
            { key: "pdOpen", label: "1. New conversation, then type", intro: "Click New again." },
            { key: "pdBrief", label: "2. Then, in the same conversation", intro: "Deliberately explicit, so it shows you the three it prepared instead of inventing three new ones." },
          ],
        },
        {
          n: "04",
          title: "Your Technical Lead builds the page",
          body: "The one teammate that holds the tools. It reads the plan and the design direction, and builds.",
          note: "What comes back: a short report and a clickable link to your page, plus the plain file path as a fallback. Click it and the page opens in your browser.",
          prompts: [
            { key: "tlOpen", label: "1. New conversation, then type", intro: "Click New." },
            { key: "tlBuild", label: "2. Then, in the same conversation", intro: "You do not have to tell it the details. They are already in the shared brain, which is the whole point." },
          ],
        },
        {
          n: "05",
          title: "Bonus: recruit a copywriter, in one shot",
          body: "The pattern is the point: a job keeps repeating, so you add a teammate for it. Your Technical Lead is the one that builds it.",
          note: "What comes back: no follow-up question. It has everything it needs and builds the teammate straight from this.",
          prompts: [
            { key: "tlOpen", label: "1. New conversation, then type", intro: "Back to your Technical Lead. It is the only teammate that builds other teammates." },
            { key: "copyRecruit", label: "2. Then, in the same conversation", intro: "One prompt: the job, the character, and where it stops." },
          ],
        },
        {
          n: "06",
          title: "Bonus: your copywriter sets a house rule",
          body: "A rule that outlives the conversation. Watch it cross-check with the designer, then write the rule down as a skill file of its own.",
          note: "What comes back: the rule applied to the page you just built, and a new skill file holding it. Next time, nobody has to remember to say it.",
          prompts: [
            { key: "copyOpen", label: "1. New conversation, then type", intro: "Your newest teammate, about a minute old." },
            { key: "copyRule", label: "2. Then, in the same conversation", intro: "A rule, and a fix, in one line." },
          ],
        },
        {
          n: "07",
          title: "Your team remembers",
          body: "At the end of a session, ask your agents to wrap up: what they did, what changed, what is next. Each one writes it into its own memory and into the shared brain. The decisions survive with it, including the design you chose and why.",
          note: "Close everything, come back next week, and they pick up where they stopped. You do not explain yourself twice. That is the difference between a chat you had and a team you have.",
          prompts: [
            { key: "wrapup", label: "Type this before you close", intro: "One command, at the end of any session. Without it, none of the rest carries over." },
          ],
        },
        {
          n: "08",
          title: "Take it home: make the page real",
          body: "Finish the checklist with your Product Manager. The next two items are already written down. Connect the email field to something real, so an address actually lands somewhere. Then put it online: an account, a page, and a domain when you want one.",
          note: "Ask your Technical Lead to walk you through each step. It holds the whole blueprint, and it still remembers today.",
        },
      ],
      closing: "You built a page, and you kept a team. The page was today. The team is what you take with you.",
    },

  };

  /* ---- HEBREW content model (Copywriter, approved parity, dash-clean) --- */
  const HE = {
    /* 1 — כותרת עמוד פשוטה ופונקציונלית (ללא hero: בלי קיקר, בלי גוף שיווקי, בלי CTA). */
    hero: {
      title: "המרחב שלכם לסדנה",
    },

    /* 1b — הערכה והמצגת. ראשונות בעמוד ולא מקופלות. */
    kit: {
      kicker: "מתחילים כאן",
      title: "הערכה שלכם, והמצגת",
      subtitle: "שני הדברים שנשארים לכם אחרי היום. שניהם יושבים כאן בעמוד, אז תחזרו אליהם מתי שתצטרכו.",
      items: [
        {
          icon: "box", featured: true,
          kicker: "הורדה",
          title: "ערכת Product Lab",
          body: "שלושת חברי הצוות שלכם, המוח המשותף שהם כותבים אליו, והכישורים שהם עובדים לפיהם. פורסים את הקובץ לתיקיית Documents ומכוונים לשם את Claude. זה אותו קובץ שקיבלתם לפני המפגש.",
          href: "assets/product-lab.zip", download: true,
          cta: "הורדת product-lab.zip",
          note: "חריג אחד: אם תיקיית Documents שלכם יושבת בתוך OneDrive או iCloud, שימו את הערכה בתיקיית הבית במקום.",
        },
        {
          icon: "video",
          kicker: "שקופית אחרי שקופית",
          title: "מצגת הסדנה",
          body: "כל השקופיות מהמפגש, לפי הסדר. פותחים אותה כשרוצים להיזכר במבנה של היום, או במשפט ההוא שנשאר לכם חצי בראש.",
          href: "https://docs.google.com/presentation/d/1HnbNtSQ8M8OR_GanBl3O87OhERgupUYj_mI7isHv90w/preview",
          cta: "פתיחת המצגת",
        },
      ],
    },

    /* 2 — עד סוף היום (שלושה חלקים). */
    end: {
      kicker: "מתחילים מהסוף",
      title: "עד סוף היום",
      subtitle:
        "שני דברים שאתם לוקחים איתכם, ואחד שתסיימו בבית.",
      team: {
        kicker: "מפעילים את הצוות",
        title: "שלושה שותפים שאתם מנהלים",
        teammates: [
          { name: "ה-Technical Lead שלכם", charter: "שותף טכני", body: "גורם לחלקים המפחידים פשוט להיעלם." },
          { name: "ה-Product Manager שלכם", charter: "שותף למוצר", body: "שומר אתכם חדים וממוקדים." },
          { name: "ה-Product Designer שלכם", charter: "שותף לעיצוב", body: "המשך ישיר של האומנות שלכם, שממשיכה לצמוח יחד אתכם." },
        ],
      },
      foundation: {
        kicker: "דף הנחיתה הראשון שלכם",
        title: "גרסה ראשונה, חיה בדפדפן שלכם",
        body:
          "דף נחיתה אחד שמציג רעיון למוצר: כותרת, תיאור, נגיעה ויזואלית קטנה, ושדה שאוסף מיילים. בנוי בשפת העיצוב שבחרתם.",
      },
      home: {
        tag: "משימת בית",
        title: "ואז לוקחים את זה הביתה",
        body:
          "עם ה-Technical Lead שלכם לצידכם, תסיימו את הדף, תחברו את שדה המיילים לרשימה אמיתית, תקימו GitHub, תשיגו דומיין ותפרסמו אותו.",
      },
    },

    /* 3 — איך זה עובד באמת (המודל המנטלי + המשפך). */
    technical: {
      kicker: "איך זה עובד באמת",
      title: "למה AI ממוקד יותר הוא AI חכם יותר",
      subtitle:
        "כל השיטה ברעיון אחד: לא הופכים סוכן לחכם יותר בכך שמעמיסים עליו עוד ועוד, אלא מחדדים אותו דווקא מתוך מיקוד במה שהוא עושה.",
      stages: [
        { title: "מוח כללי ועצום", body: "מהקופסה, AI יודע קצת על כמעט הכול. עוצמתי, אבל רחב מדי, ומאבד פוקוס בקלות." },
        { title: "נותנים לו תפקיד", body: "ממקדים אותו בעבודה אחת ובזהות אחת. מנדט צר יותר הופך אותו לחד ומדויק בהרבה, בדיוק במה שאתם צריכים." },
        { title: "נותנים לו כישורים וכלים", body: "מוסרים לו כישורים וכלים שהוא באמת יכול להפעיל. עכשיו הוא לא רק חושב, הוא פועל, וממקד את עצמו עוד יותר." },
        { title: "נותנים לו זיכרון והקשר", body: "מחברים לו מערכת תקשורת כך שהוא תמיד יודע על מה אתם עובדים ומה כבר נעשה עד עכשיו. את זה אנחנו בונים על Obsidian, המוח המשותף ששומר את כל הצוות בהקשר." },
      ],
      funnelTiers: [
        { label: "מוח כללי" },
        { label: "+ תפקיד" },
        { label: "+ כישורים וכלים" },
        { label: "+ זיכרון" },
      ],
      funnelPoint: "סוכן אחד חד",
      closing:
        "אינטליגנציה רחבה, ממוקדת לכדי שותף חד, מצויד בכלים ומודע להקשר. זו התזמור שתקימו היום, וזו הסיבה שמה שאתם בונים ממשיך לעבוד גם מחר.",
    },

    /* 4 — בוחרים את הכלים (שתי דרכים, איך לבחור). */
    tools: {
      kicker: "בוחרים את הכלים",
      title: "שתי דרכים לבנות, ואיך לבחור ביניהן",
      subtitle:
        "כל דרך נמצאת איפשהו בין כלי אחד שעושה הכול בשבילכם, לבין ארגז כלים פתוח שאתם מרכיבים בעצמכם. הנה השיקול, כדי שהבחירה של היום תהיה ברורה.",
      options: [
        {
          icon: "box",
          kicker: "כלים הכול-באחד",
          title: "כלי Vibe-coding",
          lede: "Lovable, Base ודומיהם: מקום אחד שמעצב, בונה ומשגר בשבילכם.",
          benefits: [
            "הכול כלול: בלי התקנות, בלי חיווט, בלי לצאת מהחדר.",
            "מתקדמים מהר ורואים משהו אמיתי כבר בהתחלה, עם כמה שפחות סיבוכים.",
            "נקודת הכניסה הכי רכה שיש, מושלמת כדי להניע פרויקט אישי.",
          ],
          noteLabel: "כדאי לדעת",
          note: "הכי מתאים לפרויקטים עצמאיים. ברגע שפרויקט גדל, נעשה מורכב, או צריך להתחבר לכלים חיצוניים, הם עלולים לתסכל. ורוב הארגונים עם צוותי עיצוב עדיין לא עובדים איתם.",
          featured: false,
        },
        {
          icon: "claude",
          kicker: "ארגז הכלים המקצועי",
          title: "Claude Code",
          lede: "ארגז הכלים של האומן, זה שנקים יחד היום.",
          benefits: [
            "הכי גמיש בגדול: בונים כמעט הכול, מתחברים כמעט לכל דבר.",
            "הבחירה הראשונה בצוותי עיצוב מוצר אמיתיים היום.",
            "זה גם הכלי המרכזי של המהנדסים, כך שהעבודה שלכם זורמת ישר לשלהם.",
          ],
          noteLabel: "כדאי לדעת",
          note: "עקומת למידה תלולה יותר, ופחות ידידותי למעצבים בהתחלה. זה המחיר תמורת טווח, פוטנציאל ועמידות לאורך זמן.",
          featured: true,
        },
      ],
      closing:
        "היום אנחנו בונים על Claude, ההתחלה הקשה יותר שממשיכה להשתלם, וזו שמתחברת ישר לדרך שבה צוותים אמיתיים עובדים.",
    },

    /* 4b — המוח המשותף (M3): איך הקבצים מתחברים (מקטע הדיאגרמה). */
    sharedBrain: {
      kicker: "המוח המשותף",
      title: "איך כל הצוות עובד מאותה תמונה",
      subtitle:
        "הסוכנים שלכם הם לא צ'אטים נפרדים. הם חולקים זיכרון אחד, כך שהצוות תמיד עובד מאותה תמונה, וכל החלטה נשמרת.",
      body:
        "לכל סוכן יש קבצים משלו: תפקיד שאומר מה הוא עושה, אופי שאומר מי הוא, הכישורים שהוא יכול להפעיל, וזיכרון משלו. מעל כולם יושב מוח משותף אחד שכל סוכן קורא וכותב בו, ויומן למידה שבו הצוות מתעד מה עבד. הנה איך הכול מתחבר.",
      nodes: {
        agent: "סוכן",
        role: "תפקיד",
        character: "אופי",
        skills: "כישורים",
        memory: "זיכרון",
        sharedBrain: "מוח משותף",
        learningLog: "יומן למידה",
      },
    },

    /* 4c — שלושת הסוכנים שמגיעים בתוך הערכה. */
    crew: {
      kicker: "הצוות שלכם",
      title: "הכירו את הצוות שתעבדו איתו",
      subtitle: "שלושה היום. באותה שיטה מוסיפים רביעי מתי שצריך.",
      members: [
        { icon: "laptop", role: "Technical Lead", tag: "השותף הטכני שלכם",
          body: "מחזיק את הכלים, והיחיד שבונה סוכנים נוספים.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
        { icon: "flow", role: "Product Manager", tag: "השותף שלכם למוצר",
          body: "מחליט מה נכנס לגרסה הראשונה, ומה מחכה.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
        { icon: "spark", role: "Product Designer", tag: "השותף שלכם לעיצוב",
          body: "קובע את המראה, ומעלה אותו על הכתב.",
          badges: ["SOUL", "MEMORY", "BRAIN", "LOG"] },
      ],
      closing: "כל השלושה כבר בנויים בתוך הערכה. היום אתם מנהלים אותם, וכשעבודה מתחילה לחזור על עצמה מוסיפים רביעי בדיוק באותה דרך.",
    },

    /* 5 — הזרימה של המפגש. נכתב מחדש 2026-08-27 (Dean) מתוך deck.json. */
    plan: {
      kicker: "המהלך",
      title: "כל המפגש, מההתחלה עד הסוף",
      subtitle: "פותחים שיחה חדשה לפני כל שלב. ההרגל האחד הזה מונע את רוב מה שמשתבש.",
      steps: [
        {
          n: "00",
          title: "לפני הסדנה",
          body: "מסדרים את כל זה לפני שנפגשים, בערך 15-20 דקות. אם משהו נתקע, כתבו לי לפני היום עצמו, כדי שנסדר את זה יחד ולא באמצע המפגש.",
          checklist: [
            { name: "פתיחת חשבון Claude Pro", tag: "20 דולר לחודש", note: 'לא אופציונלי: Claude Code לא רץ בגרסה החינמית. נרשמים ב-<a class="plink" dir="ltr" href="https://claude.ai/upgrade" target="_blank" rel="noopener">claude.ai/upgrade</a>.' },
            { name: "אפליקציית Claude לדסקטופ", note: 'מורידים מ-<a class="plink" dir="ltr" href="https://claude.com/download" target="_blank" rel="noopener">claude.com/download</a> ומתקינים. אפליקציית הדסקטופ, לא הטרמינל. בלי קוד.' },
            { name: "הורדה ופריסה של הערכה", tag: "למעלה", note: "product-lab.zip נמצא בראש העמוד. פורסים אותו לתיקיית Documents. אם ה-Documents שלכם יושב בתוך OneDrive או iCloud, השתמשו בתיקיית הבית במקום." },
            { name: "Windows בלבד: Git", tag: "Windows", note: 'מתקינים מ-<a class="plink" dir="ltr" href="https://git-scm.com/downloads" target="_blank" rel="noopener">git-scm.com/downloads</a>, ואז סוגרים ופותחים מחדש את אפליקציית Claude. על Mac, מדלגים על זה.' },
            { name: "להגיע עם חלון שימוש פנוי", note: "ל-Claude Pro יש תקרת שימוש שבועית, משותפת לכל מה שקורה בחשבון, ואין דרך לראות מראש כמה נשאר. אז ביום שלפני, כדאי ללכת בקטנה עם Claude." },
          ],
        },
        {
          n: "01",
          title: "פותחים את הערכה ובודקים את הצוות",
          body: "מכוונים את Claude לתיקיית הערכה, ואז שואלים אותו אם הצוות באמת שם. פקודה אחת, ואתם יודעים אם כל השאר יעבוד.",
          note: "בתוך Claude: לשונית Code, ואז Local, ואז Select folder, ובוחרים את תיקיית product-lab. כששואלים אם אתם סומכים על התיקייה, עונים כן.",
          prompts: [
            { key: "check", label: "מקלידים את זה", intro: "אמורים לחזור אליכם STATUS: PERFECT ושלושה חברי צוות. אם לא, עוצרים כאן וכותבים לי במקום להמשיך הלאה." },
          ],
        },
        {
          n: "02",
          title: "מתדרכים את ה-Product Manager",
          body: "מספרים לו מה אתם רוצים לבנות. הוא מחליט מה נכנס לגרסה הראשונה, ומה מחכה.",
          note: "מה אמור לחזור: רשימה קצרה של מה שהעמוד צריך לכלול (תמיד איסוף אימייל, ועוד אלמנט או שניים אם הם באמת מתאימים), ושורה ששולחת אתכם למעצב. בלי שאלות הבהרה, בלי רודמאפ. פשוט תשובה.",
          prompts: [
            { key: "pmOpen", label: "1. פותחים שיחה חדשה, ומקלידים", intro: "קודם לוחצים New. כל שלב מתחיל בשיחה משלו." },
            { key: "pmBrief", label: "2. ואז, באותה שיחה", intro: "מחליפים את מה שבסוגריים ברעיון שלכם: מה האתר, הכלי או האפליקציה שלכם, ולמי הם מיועדים." },
          ],
        },
        {
          n: "03",
          title: "המעצב שלכם מציג שלושה סגנונות אמיתיים",
          body: "שלושה רפרנסים, שהוכנו מראש, כדי שבחירת כיוון תהיה החלטה ולא משיכת כתפיים.",
          note: "מה אמור לחזור: שורה קצרה שמאשרת מה נבנה, ואז בדיוק שלושה קישורים - Arc, Cohere ו-Stripe x A24. פותחים את שלושתם, ואז עונים עם הבחירה שלכם. למשל: I like Cohere.",
          prompts: [
            { key: "pdOpen", label: "1. שיחה חדשה, ומקלידים", intro: "לוחצים New שוב." },
            { key: "pdBrief", label: "2. ואז, באותה שיחה", intro: "מפורט בכוונה, כדי שיראה לכם את שלושת הרפרנסים שהוא הכין ולא ימציא שלושה חדשים." },
          ],
        },
        {
          n: "04",
          title: "ה-Technical Lead בונה את העמוד",
          body: "חבר הצוות היחיד שמחזיק את הכלים. הוא קורא את התוכנית ואת כיוון העיצוב, ובונה.",
          note: "מה אמור לחזור: דוח קצר וקישור לחיץ לעמוד שלכם, ובנוסף הנתיב לקובץ כגיבוי. לוחצים, והעמוד נפתח בדפדפן.",
          prompts: [
            { key: "tlOpen", label: "1. שיחה חדשה, ומקלידים", intro: "לוחצים New." },
            { key: "tlBuild", label: "2. ואז, באותה שיחה", intro: "לא צריך לספר לו את הפרטים. הם כבר במוח המשותף, וזו כל הנקודה." },
          ],
        },
        {
          n: "05",
          title: "בונוס: מגייסים קופירייטר, בפרומפט אחד",
          body: "התבנית היא העיקר: עבודה מתחילה לחזור על עצמה, אז מוסיפים בשבילה חבר צוות. וה-Technical Lead הוא זה שבונה אותו.",
          note: "מה אמור לחזור: בלי שאלת המשך. יש לו כל מה שהוא צריך, והוא בונה את חבר הצוות ישר מזה.",
          prompts: [
            { key: "tlOpen", label: "1. שיחה חדשה, ומקלידים", intro: "חוזרים ל-Technical Lead. הוא היחיד שבונה חברי צוות אחרים." },
            { key: "copyRecruit", label: "2. ואז, באותה שיחה", intro: "פרומפט אחד: התפקיד, האופי, ואיפה זה נגמר." },
          ],
        },
        {
          n: "06",
          title: "בונוס: הקופירייטר קובע כלל בית",
          body: "כלל ששורד את השיחה. תראו אותו מצליב מידע עם המעצב, ואז כותב את הכלל כקובץ כישור משלו.",
          note: "מה אמור לחזור: הכלל מוחל על העמוד שבניתם עכשיו, וקובץ כישור חדש שמחזיק אותו. בפעם הבאה אף אחד לא צריך לזכור להגיד את זה.",
          prompts: [
            { key: "copyOpen", label: "1. שיחה חדשה, ומקלידים", intro: "חבר הצוות הכי חדש שלכם, בן דקה." },
            { key: "copyRule", label: "2. ואז, באותה שיחה", intro: "כלל, ותיקון, בשורה אחת." },
          ],
        },
        {
          n: "07",
          title: "הצוות שלכם זוכר",
          body: "בסוף מפגש, מבקשים מהסוכנים לסכם: מה הם עשו, מה השתנה, ומה הלאה. כל אחד כותב את זה לזיכרון שלו ולמוח המשותף. ההחלטות שורדות איתו, כולל העיצוב שבחרתם ולמה.",
          note: "סוגרים הכול, חוזרים בשבוע הבא, והם ממשיכים מאיפה שעצרו. לא צריך להסביר את עצמכם פעמיים. זה ההבדל בין צ׳אט שהיה לכם לבין צוות שיש לכם.",
          prompts: [
            { key: "wrapup", label: "מקלידים לפני שסוגרים", intro: "פקודה אחת, בסוף כל מפגש. בלעדיה שום דבר ממה שקרה לא ממשיך הלאה." },
          ],
        },
        {
          n: "08",
          title: "לוקחים הביתה: להפוך את העמוד לאמיתי",
          body: "מסיימים את הרשימה עם ה-Product Manager. שני הסעיפים הבאים כבר כתובים שם. מחברים את שדה האימייל למשהו אמיתי, כדי שכתובת באמת תגיע לאנשהו. ואז מעלים לאוויר: חשבון, עמוד, ודומיין כשתרצו.",
          note: "בקשו מה-Technical Lead ללוות אתכם שלב שלב. הוא מחזיק את כל התוכנית, והוא עדיין זוכר את היום הזה.",
        },
      ],
      closing: "בניתם עמוד, ונשאר לכם צוות. העמוד היה היום. הצוות הוא מה שהולך אתכם הלאה.",
    },

  };

  /* ---- The exported model app.js renders ------------------------------- */
  return {
    prompts: PROMPTS,
    en: EN,
    he: HE,
  };
})();

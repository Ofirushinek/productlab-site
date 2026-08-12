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
   the HE and EN toggle states. The 8 prompt bodies are CTO-owned; their canonical
   source is workshop-bootstrap-prompts-FINAL.md. Do not rewrite them here.

   SECURITY NOTE (per CTO): content.js ships to the browser and is publicly
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

  /* ---- The eight copyable prompts — CTO-owned, English in both languages ----
     Canonical source: workshop-bootstrap-prompts-FINAL.md (do not rewrite).
     Plain text, no backticks, no ${...}. Shared across HE and EN. ---------- */

  const CTO_CREATE = `I want you to create a reusable agent called "CTO" and save it to my user-level agents folder so I can call it in EVERY future session and project, not just this one.

Here is who this CTO is. Write this identity into the agent as its instructions:

You are my CTO, my personal technical partner. I am not a strong technical person, so your job is to make the scary technical parts disappear for me. You:
- Explain every choice in plain, everyday language, with no unexplained jargon. If you must use a technical word, define it in one simple sentence.
- Set up my tools and environment for me. When I need to install or run something, you give me the exact thing to type or click, one step at a time, and wait for me to confirm before the next step.
- Recommend the simplest thing that works before anything fancy, and tell me honestly when something is not worth the effort.
- Are warm, patient, calm, and encouraging. You never make me feel behind. You assume I am smart but new.
- Before you do anything, tell me what you are about to do and why, in one or two sentences.
- Never delete files, install paid services, or make big changes without explaining and getting my okay first.

Starter skills (a default set I can refine later):
- Setting up tools and development environments.
- Explaining technical choices in plain language.
- Giving exact, step-by-step install and run instructions.
- Making simple, sound architecture decisions and telling me what to install.

Now the mechanics for saving this. Follow them exactly:

1. Create the folder ~/.claude/agents if it does not already exist. IMPORTANT: this is the ".claude" folder inside my HOME folder (user-level), NOT inside the current project. Saving it here is what makes the CTO reusable in every future session and project. If you create it inside a project by mistake, it will only work in that one project.

2. Inside that folder, create a file named cto.md.

3. Make the very first lines of the file exactly this block (the three dashes matter):
---
name: cto
description: My personal technical partner. Use for anything technical, setup, tools, installs, architecture, wiring up my agent system, and step-by-step guidance in plain language.
tools: Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch, Task
---
(The "tools" line matters: it lets the CTO create files, run installs, wire things up, and later call my other agents. Without it the CTO can look but not build.)

4. Below that block, write the full CTO identity and starter skills I gave you above as the agent's instructions.

When you are done:
- Show me the complete contents of the file, and confirm the exact path it was saved to.
- Tell me in plain language how I call this CTO again later (for example, by starting a message with "CTO," or by typing the "@" sign and picking it from the list).
- Warn me in one line that I may need to start a fresh chat for the new CTO to become available.
- Then introduce yourself to me as my CTO in two or three friendly sentences.`;

  const CTO_BRIEF = `CTO, from now on your main job is to build and maintain my AI-agent team, and to grant each teammate the access it needs to work. I am not technical, so you own the wiring. My Obsidian vault is the shared brain and coordination layer for the whole team. Do NOT build any teammate yet. First you will set up the shared foundation and interview me. The questions are at the end.

THE STANDARD FOR EVERY AGENT YOU CREATE (non-negotiable, verify each one before you ever tell me an agent is done):
Every teammate you build must have all five of these.
1. Its own MEMORY file, in my Obsidian vault. Pre-fill it with my current situation from the interview so it starts informed, not blank. Keep it to current state, not a diary.
2. Read and write access to the SHARED BRAIN file in my vault, so it can post updates the rest of the team can see, and read what others posted.
3. Access to the LEARNING LOG file in my vault, so it can read the team's rules and write down any correction I give it.
4. SKILLS that match its role, a few short playbooks. Give it sensible skills for its job by default, unless I ask for specific skills, in which case build those.
5. Its own SOUL file, in my vault, that defines who it is and how it behaves. Give every soul these sections: Who I Am, Default Posture when unsure, Pet Peeves, What I Will Not Do, How I Communicate, My Promise. Design every soul to disagree with me when I am wrong. An agent that only agrees with me is useless.

Plus a short ROLE file (the sixth piece, the one Claude Code actually loads): its job, its tools, its boundaries. The ROLE file lists the agent's skills and tells the agent to READ its soul, its memory, the shared brain, and the learning log by their full vault paths at the start of every conversation.

SET UP THE SHARED FOUNDATION NOW (before any teammate exists):
- Create the SHARED BRAIN file in my vault. At the top put a short "how to write here" note: every entry is one dated, name-tagged bullet like "2026-01-01 [designer] the fact and why it matters", one or two lines, and you edit an existing note rather than adding a second conflicting one.
- Create the LEARNING LOG file in my vault with three parts: a "Confirmed Patterns" Do This / Not This table, a dated "Corrections Log", and a "Pending Patterns" list. A correction becomes a Confirmed Pattern only after it has come up three times. Always write a correction as the rule to follow, never as the story of what went wrong.
- Create a reusable SOUL template and a reusable MEMORY template in my vault, so adding a teammate later is quick and identical. The memory template must contain, word for word, the read-and-write habit below, so every new agent inherits it.

THE READ-AND-WRITE HABIT (this is what makes them a team, not separate bots). Put this in the memory template:
1. At the start of every conversation, read four things by their full vault paths: its own soul file, its own memory file, the shared brain, and the learning log.
2. The moment something happens another agent would need to know (a decision, a status change, a deadline, a number), write it to the shared brain right away, and again as the last step before finishing, each entry dated and name-tagged.
3. Whenever I correct an agent, it writes the correction as a rule into the learning log, with the date.

MAKE EVERY AGENT ACTUALLY CALLABLE (most common failure, do not skip):
Claude Code only discovers an agent whose ROLE file lives in my user-level agents folder, ~/.claude/agents. For each teammate, put its ROLE file there. Keep its soul, memory, and skills in my Obsidian vault, because files inside ~/.claude can be treated as protected and block writes, while the vault does not. The ROLE file points at those vault files by full path.

ONE BUILDER: You, the CTO, are the only agent that creates or changes agents and the file structure. Write into every teammate that if it ever thinks a new agent or a structural change is needed, it hands that to me to pass to you. It never builds or restructures on its own.

TOOLS, BOUNDARIES, SAFETY (apply to every teammate you build):
- Give each teammate one clear job. In its description say what it does and what it does NOT do, naming who owns the rest. When two could overlap, write the boundary into both files.
- Give each the minimum tools it needs. A teammate that must coordinate others (for example a product manager that will direct a designer) needs the Task tool so it can call another agent. A teammate meant only to advise should not be able to change files.
- Every teammate replies short by default, leads with the answer, plain language, and goes longer only when the task truly needs it.
- No teammate ever sends an email, spends money, publishes anything, or deletes anything without asking me first. Put this in every one.
- Never use a long dash (the em dash or en dash) in anything, it reads as AI-written, use a plain hyphen.

SET UP MY MACHINE:
- Wire up my permissions so agents can save memory and update the shared brain without asking me to approve every write. Walk me through any one-time setup one step at a time, telling me exactly what to type or click.

INTERVIEW ME NOW, one topic at a time, in plain language, waiting for my answer each time:
1. The exact folder location of my Obsidian vault, so you can wire everything up there. If I am not sure how to find it, walk me through finding it step by step.
2. A quick snapshot of what I am working on right now, so you can pre-fill each teammate's memory.
3. Anything else you need to set this up correctly.

Once you have my answers, set up the shared brain, the learning log, and the two templates, then explain your plan back to me in simple terms and confirm you are ready for me to tell you which teammates to build. Do NOT build any teammate until I tell you to in my next messages.`;

  const CTO_BUILDS_CPO = `CTO, build my first teammate now: a CPO, my product manager. Apply the full standard you set: its own soul file, its own memory file pre-filled from what you know about me, read and write access to the shared brain, access to the learning log, and skills that fit a product manager. Save its role file in ~/.claude/agents so I can call it, and keep the rest in my vault.

Who the CPO is: my product partner. It decides what we build and in what order, keeps scope tight, and is tough with me about shipping something small and real instead of adding more. It thinks in priorities: what is in version one now, and what is for later. Give it the Task tool, because later it will coordinate my other teammates. Its boundary: the CPO decides what to build and directs the work, it does not craft the visual design itself, that belongs to my designer. Write that boundary into its file.

When you are done, show me its role file, confirm the path, tell me how to call it, and remind me I may need a fresh chat for it to appear. Keep it lean, do not over-generate.`;

  const CTO_BUILDS_PD = `CTO, build my next teammate: a Product Designer, my design partner. Apply the full standard: its own soul file, its own memory file pre-filled from what you know about me, read and write access to the shared brain, access to the learning log, and skills that fit a product designer. Save its role file in ~/.claude/agents and keep the rest in my vault. Give it the Task tool so it can coordinate when asked, and make sure its tools let it create files and open a page in my browser (it will write an HTML file and open it), so it has the ability to write files and to run a simple command on my machine.

Who the Product Designer is: my design partner. It owns the look and feel of what we build. It works by first proposing a small set of well-known design languages that suit the specific product, letting me pick one, writing that choice down as a plain-language design spec, and then building the actual page by emulating that look in plain CSS inside a single self-contained HTML file that opens straight in my browser. Write these rules into its file, they matter: it never installs a design-system package or a component library, it never uses Storybook, and it never uses Figma. It recreates the chosen look faithfully in plain CSS by hand. Its boundary: the designer owns the visual craft, the CPO owns what we build and the priorities.

When you are done, show me its role file, confirm the path, tell me how to call it, and remind me I may need a fresh chat for it to appear. Keep it lean.`;

  const CPO_BRIEF = `CPO, I want to build a one-page landing page that teases a product idea of mine. Before anything gets built, I want you to plan it and set the scope.

The page has four things: a title, a short description of the idea, a light visual touch, and an email-capture field where an interested visitor can leave their email. Be honest with me about the email field: on a simple standalone page the field can look and feel real, but it cannot actually store the emails anywhere without extra backend work, so treat actually collecting the addresses as later work, not part of today.

First, ask me the few questions you need to understand my idea: what the product is, who it is for, and what the title and description should say. One question at a time, plain language.

Then give me a PRIORITIZED CHECKLIST split into two clear groups:
- Version one, for today: the page itself, with the title, description, visual touch, and the email field that looks real.
- Later, not today: connecting the email field to a real list or to Gmail so addresses are actually saved, and any backend behind it.
Make it explicit that only the first item or two are in scope for today, and that the rest is the plan for next time. Number the items in priority order.

Finally, write a short note of this plan to the shared brain so my designer can read it, and tell me it is there. Do not build anything yet.`;

  const PD_BRIEF = `Product Designer, my CPO has written a plan for a one-page landing page in the shared brain. Read that plan first so you know what the product is and who it is for.

Now propose three or four well-known design languages that would suit this specific product. Choose only from this set, because these are the ones you can recreate faithfully in plain CSS with nothing to install: Vercel or Geist (clean, minimal, monochrome, tight modern type), Apple style (spacious, elegant, soft, generous whitespace), Material Design (bold color, clear shadows and elevation, familiar), Tailwind default (rounded, slate palette, the modern default look), modern SaaS (glassy, gradients, darker, an animated feel), and warm editorial (serif headings, paper tones, a magazine feel). For each one you propose, tell me in one or two plain sentences why it fits my product and what it will feel like. Then let me pick one.

After I pick, write a student-specific design spec to a file called design.md in my project, and also note in the shared brain that it is there. The spec is plain language: the color palette, the type, the spacing, the corner roundness, and the overall mood. This file is real and it lasts, every teammate will read it, and the page will be built from it.

Do NOT build the page yet. You will build it from design.md when the CPO tells you to. Remember your rules: emulate the chosen look in plain CSS by hand, in one self-contained HTML file, with no packages, no Storybook, and no Figma.`;

  const CPO_ORCHESTRATE = `CPO, we are ready to build version one. Please proceed and coordinate the team.

Do these in order:
1. Tell my CTO, using your Task tool, that we are starting the build of version one of the landing page, so the CTO is in the loop. Keep it to one short message.
2. Tell my Product Designer, using your Task tool, to build the actual page now from the design.md spec: a single self-contained HTML file with the title, the description, a light visual touch, and an email-capture field that looks real, all styled in plain CSS that emulates the chosen design language. Ask the Product Designer to save the file in my project and then open it in my browser so I can see it as a live preview.
3. When the Product Designer reports the page is built and open, post a short line to the shared brain that version one is done and where the file lives.
4. Then tell me, in plain language, that it is ready, where the file is, and what the honest status of the email field is.

Keep every message between you and the team short. Build the page once, do not iterate on it right now.`;

  const WRAP_UP = `CTO, let us wrap up so nothing is lost before I close this session.

1. Write to your own memory file what you set up today: my team, the shared brain, the learning log, and where everything lives. Then post one short dated line to the shared brain summarizing today.
2. Ask my CPO and my Product Designer, each using your Task tool, to do the same: write to their own memory file what they did today (the CPO its plan and the prioritized checklist, the Product Designer the chosen design language and the page it built), and each post one short dated line to the shared brain.
3. Then create a short project document file in my vault called project-log.md that captures today's decisions in plain language: what the product idea is, the version-one scope, the design language we chose, and where the page file lives. This is the document that lets me start fresh next time with everything still here.

When you are done, tell me the project document is saved, where it is, and confirm that if I open a brand new chat tomorrow and call any teammate, it will read its memory and the shared brain and pick up exactly where we left off. Keep this quick and lean, do not re-read the whole shared brain to do it.`;

  /* ---- Prompts, keyed. Step cards reference these by key (shared HE + EN). */
  const PROMPTS = {
    ctoCreate: CTO_CREATE,
    ctoBrief: CTO_BRIEF,
    ctoBuildsCPO: CTO_BUILDS_CPO,
    ctoBuildsPD: CTO_BUILDS_PD,
    cpoBrief: CPO_BRIEF,
    pdBrief: PD_BRIEF,
    cpoOrchestrate: CPO_ORCHESTRATE,
    wrapup: WRAP_UP,
  };

  /* ---- ENGLISH content model ------------------------------------------- */
  const EN = {
    /* 1 — Plain functional page title (no hero: no kicker, no marketing body, no CTA). */
    hero: {
      title: "Your workshop workspace",
    },

    /* 2 — By the end of today (three parts). */
    end: {
      kicker: "Start from the end",
      title: "By the end of today",
      subtitle:
        "Two things you walk away with today, and one you take home to finish.",
      team: {
        kicker: "Build the team",
        title: "Three teammates you direct",
        teammates: [
          { name: "Your CTO", charter: "Technical partner", body: "Makes the scary parts disappear." },
          { name: "Your CPO", charter: "Product manager", body: "Keeps you sharp and focused." },
          { name: "Your Product Designer", charter: "Your craft, extended", body: "An extension of your own craft, growing with you." },
        ],
      },
      foundation: {
        kicker: "Your first landing page",
        title: "A real first version, live",
        body:
          "Your own one-page landing that teases a product idea: a title, a description, a light visual touch, and an email-capture field. It runs live in your browser, built in your own design language.",
      },
      home: {
        tag: "Home assignment",
        title: "Then, you take it home",
        body:
          "With your CTO beside you, you finish the page, connect the email field to a real list, set up GitHub, get a domain, and publish, on your own.",
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

    /* 5 — The numbered session plan (steps, with copyable prompt cards). */
    plan: {
      kicker: "The plan",
      title: "How we'll get there",
      subtitle: "First we build the team. Then the team builds with you.",
      steps: [
        {
          /* 00 — Before the workshop (Stage 0 pre-work), folded in as the first
             plan card. Curriculum-verified (Dean, 2026-08-12): desktop-app only,
             no terminal. Developer Mode = a Windows OS setting. Git = Windows only
             + restart the app. Obsidian = install + make an empty vault. $20/mo. */
          n: "00",
          title: "Before the workshop",
          body: "Please set all of this up before our session (~15-20 min). If anything gets stuck, message me before the session - we'll fix it together, not on the day.",
          checklist: [
            { name: "Create a Claude Pro account", tag: "$20 / mo", note: 'Required; the workshop runs on it. Get it at <a class="plink" dir="ltr" href="https://claude.ai/upgrade" target="_blank" rel="noopener">claude.ai/upgrade</a>.' },
            { name: "Claude Desktop app", note: 'Download from <a class="plink" dir="ltr" href="https://claude.com/download" target="_blank" rel="noopener">claude.com/download</a> and run the installer. No terminal, no code.' },
            {
              name: "Windows only: two extra steps", tag: "Windows",
              note: "Do these before you install the Claude app - on Windows the desktop app won't install until Developer Mode is on. Mac users skip this whole step.",
              sub: [
                { name: "Developer Mode", steps: ["Settings", "System", "For developers", "Developer Mode"], note: "Turn it on first. If it's greyed out or blocked, that's your work laptop's IT policy - use a personal laptop for the workshop." },
                { name: "Git", note: 'Install from <a class="plink" dir="ltr" href="https://git-scm.com/downloads" target="_blank" rel="noopener">git-scm.com/downloads</a>. After installing, close and reopen the Claude app.' },
              ],
            },
            { name: "Obsidian", tag: "Free", note: 'Install from <a class="plink" dir="ltr" href="https://obsidian.md/download" target="_blank" rel="noopener">obsidian.md/download</a>. Open it and create one new empty vault. We\'ll use it live.' },
            { name: "Fresh start", note: "Don't do heavy Claude work in the 5 hours before we begin." },
          ],
        },
        {
          n: "01",
          title: "Set up your workspace",
          body: "Get your tools in place and open your shared brain, so the whole session is building, not setup. Only one of them costs anything.",
          checklist: [
            { name: "Claude", tag: "$20 / mo", note: "Your workspace, where your whole AI team lives and works. You need the Pro plan, the one paid tool today." },
            { name: "Obsidian", tag: "Free", note: "Your shared brain, installed on your own computer. It is where every agent reads and writes what the team knows." },
          ],
        },
        {
          n: "02",
          title: "Create your CTO",
          body: "Your technical partner comes first, because it builds the rest of the team. This first prompt creates your CTO and saves it, so you can call it again anytime.",
          prompts: [
            { label: "Prompt 1 - Create your CTO", intro: "Paste this into a brand-new Claude Code chat. It creates your CTO, your technical partner, and saves it for good.", key: "ctoCreate" },
          ],
        },
        {
          n: "03",
          title: "Brief your CTO on its job",
          body: "Now you teach your CTO what it is responsible for: building the rest of your team, and building each teammate right, with its own memory, access to the shared brain and the learning log, the skills its role needs, and a character of its own. You set the standard once, and every teammate is built to it.",
          prompts: [
            { label: "Prompt 2 - Brief your CTO on its job", intro: "Once your CTO exists, paste this so it knows how to build the rest of the team.", key: "ctoBrief" },
          ],
        },
        {
          n: "04",
          title: "Your CTO builds your CPO",
          body: "Hand the job to your CTO. It creates your CPO, your product manager, the one that decides what to build first and keeps you focused.",
          prompts: [
            { label: "Prompt 3 - Have your CTO build your CPO", intro: "Paste this to your CTO. It builds your CPO and sets it up correctly, ready to work.", key: "ctoBuildsCPO" },
          ],
        },
        {
          n: "05",
          title: "Your CTO builds your Product Designer",
          body: "Same again. Your CTO creates your Product Designer, your design partner and an extension of your own craft. Now your whole team exists.",
          prompts: [
            { label: "Prompt 4 - Have your CTO build your Product Designer", intro: "Paste this to your CTO to build the last teammate.", key: "ctoBuildsPD" },
          ],
        },
        {
          n: "06",
          title: "Brief your CPO on the product",
          body: "Tell your CPO what you want to build. It comes back with a prioritized checklist: what belongs in your first version today, the page itself, and what waits for later, like connecting the email field to a real list. You only build the first couple of items today. That is the real product lesson: deciding what not to build yet.",
          prompts: [
            { label: "Prompt 5 - Brief your CPO on the product", intro: "Open a fresh chat with your CPO and paste this. It is short on purpose, the real answers come from you.", key: "cpoBrief" },
          ],
        },
        {
          n: "07",
          title: "Choose your look",
          body: "Your Product Designer looks at the plan and offers you three or four design directions built for your product. You pick the one that feels right. It then writes a short design.md, your look and feel in plain words, and the whole team builds from it.",
          prompts: [
            { label: "Prompt 6 - Brief your Product Designer", intro: "Open a fresh chat with your Product Designer and paste this. It will show you a few looks to choose from, then write your design.md.", key: "pdBrief" },
          ],
        },
        {
          n: "08",
          title: "Let your CPO run the build",
          body: "Tell your CPO to go. Now watch: it briefs the CTO, tells the Product Designer to build the page from your design.md, and the team works together in front of you. When it is done, your page opens live in your browser, your first real thing, built by your team.",
          prompts: [
            { label: "Prompt 7 - Tell your CPO to build", intro: "Paste this to your CPO to kick off the build. From here you mostly watch the team work.", key: "cpoOrchestrate" },
          ],
        },
        {
          n: "09",
          title: "Save what the team did",
          body: "Before you close, each agent writes down what it did, into its own memory and the shared brain, including the look you chose. Next time you sit down, nothing is lost. You start with your whole team already knowing where you left off.",
          prompts: [
            { label: "Prompt 8 - Save the session", intro: "Paste this to your CTO at the end. Each agent records what it did, and a project document is saved so nothing is lost before next time.", key: "wrapup" },
          ],
        },
        {
          n: "10",
          title: "Take it live",
          body: "This part you finish at home, with your team beside you. Lean on your agents for every step, and on your CTO for anything technical, it walks you through the scary parts.",
          checklist: [
            { name: "Finish the page", note: "Polish your first draft into something you are happy to show." },
            { name: "Connect the email field", note: "Wire the email field to a real list, so it actually collects addresses." },
            { name: "Get a domain", tag: "If needed", note: "Want a custom web address? Set one up. Your CTO can walk you through it." },
            { name: "Set up GitHub", tag: "If needed", note: "Create a GitHub account and put your project there, so it is saved and ready to publish. Your CTO guides you." },
            { name: "Go live", note: "Do the technical steps to publish it to the web, with your CTO handling the scary parts alongside you." },
          ],
        },
      ],
      closing:
        "Take a breath. By the end of today you have a team, and a first real thing you built together. Let's begin.",
    },
  };

  /* ---- HEBREW content model (Copywriter, approved parity, dash-clean) --- */
  const HE = {
    /* 1 — כותרת עמוד פשוטה ופונקציונלית (ללא hero: בלי קיקר, בלי גוף שיווקי, בלי CTA). */
    hero: {
      title: "המרחב שלכם לסדנה",
    },

    /* 2 — עד סוף היום (שלושה חלקים). */
    end: {
      kicker: "מתחילים מהסוף",
      title: "עד סוף היום",
      subtitle:
        "שני דברים שאתם לוקחים איתכם היום, ואחד שתסיימו בבית.",
      team: {
        kicker: "מקימים את הצוות",
        title: "שלושה שותפים שאתם מנהלים",
        teammates: [
          { name: "ה-CTO שלכם", charter: "שותף טכני", body: "גורם לחלקים המפחידים פשוט להיעלם." },
          { name: "ה-CPO שלכם", charter: "מנהל המוצר", body: "שומר אתכם חדים וממוקדים." },
          { name: "מעצב המוצר שלכם", charter: "האומנות שלכם, מורחבת", body: "המשך ישיר של האומנות שלכם, שממשיכה לצמוח יחד אתכם." },
        ],
      },
      foundation: {
        kicker: "דף הנחיתה הראשון שלכם",
        title: "גרסה ראשונה אמיתית, חיה",
        body:
          "דף נחיתה אחד משלכם שמציג רעיון למוצר: כותרת, תיאור, נגיעה ויזואלית קטנה, ושדה לאיסוף מיילים. הוא רץ חי בדפדפן שלכם, בשפת העיצוב שלכם.",
      },
      home: {
        tag: "משימת בית",
        title: "ואז לוקחים את זה הביתה",
        body:
          "עם ה-CTO שלכם לצידכם, תסיימו את הדף, תחברו את שדה המיילים לרשימה אמיתית, תקימו GitHub, תשיגו דומיין ותפרסמו אותו, בעצמכם.",
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

    /* 5 — התוכנית (שלבים ממוספרים עם כרטיסי פרומפט להעתקה). */
    plan: {
      kicker: "התוכנית",
      title: "איך נגיע לשם",
      subtitle: "קודם בונים את הצוות. אחר כך הצוות בונה יחד אתכם.",
      steps: [
        {
          /* 00 — לפני הסדנה (עבודת הכנה, שלב 0), מקופל ככרטיס התוכנית הראשון.
             מקביל ל-EN, זהה בעובדות (Dean 2026-08-12): אפליקציית דסקטופ בלבד. */
          n: "00",
          title: "לפני הסדנה",
          body: 'תסדרו את כל זה לפני המפגש (בערך 15-20 דקות). אם משהו נתקע, כתבו לי לפני המפגש, נפתור את זה ביחד ולא ביום עצמו.',
          checklist: [
            { name: "פותחים חשבון Claude Pro", tag: "20$ לחודש", note: 'חובה, כל הסדנה רצה עליו. משיגים ב-<a class="plink" dir="ltr" href="https://claude.ai/upgrade" target="_blank" rel="noopener">claude.ai/upgrade</a>.' },
            { name: "אפליקציית Claude Desktop", note: 'מורידים מ-<a class="plink" dir="ltr" href="https://claude.com/download" target="_blank" rel="noopener">claude.com/download</a> ומריצים את קובץ ההתקנה. בלי טרמינל, בלי קוד.' },
            {
              name: "רק ב-Windows - שני צעדים נוספים", tag: "Windows",
              note: "עשו את זה לפני שאתם מתקינים את אפליקציית Claude - ב-Windows אפליקציית הדסקטופ לא תותקן עד שמפעילים את Developer Mode. משתמשי Mac מדלגים על כל השלב הזה.",
              sub: [
                { name: "Developer Mode", steps: ["Settings", "System", "For developers", "Developer Mode"], note: "הפעילו את זה קודם. אם האפשרות מופיעה באפור או חסומה, זו מדיניות ה-IT של הלפטופ מהעבודה - השתמשו בלפטופ אישי לסדנה." },
                { name: "Git", note: 'מתקינים מ-<a class="plink" dir="ltr" href="https://git-scm.com/downloads" target="_blank" rel="noopener">git-scm.com/downloads</a>. אחרי ההתקנה, סגרו ופתחו מחדש את אפליקציית Claude.' },
              ],
            },
            { name: "Obsidian", tag: "חינם", note: 'מתקינים מ-<a class="plink" dir="ltr" href="https://obsidian.md/download" target="_blank" rel="noopener">obsidian.md/download</a>. פתחו אותו וצרו vault חדש וריק. נשתמש בו בזמן אמת.' },
            { name: "מגיעים רעננים", note: "אל תעמיסו עבודה כבדה ב-Claude ב-5 השעות שלפני שמתחילים." },
          ],
        },
        {
          n: "01",
          title: "מקימים את סביבת העבודה",
          body: "מסדרים את הכלים ופותחים את המוח המשותף, כדי שכל המפגש יהיה בנייה ולא התקנות. רק אחד מהם עולה כסף.",
          checklist: [
            { name: "Claude", tag: "20$ לחודש", note: "סביבת העבודה שלכם, המקום שבו כל צוות ה-AI חי ועובד. צריך את תוכנית ה-Pro, הכלי היחיד בתשלום היום." },
            { name: "Obsidian", tag: "חינם", note: "המוח המשותף שלכם, מותקן על המחשב שלכם. זה המקום שבו כל סוכן קורא וכותב את מה שהצוות יודע." },
          ],
        },
        {
          n: "02",
          title: "יוצרים את ה-CTO שלכם",
          body: "השותף הטכני שלכם קודם, כי הוא זה שבונה את שאר הצוות. הפרומפט הראשון יוצר את ה-CTO שלכם ושומר אותו, כך שתוכלו לקרוא לו שוב בכל רגע.",
          prompts: [
            { label: "פרומפט 1 - יצירת ה-CTO שלכם", intro: "הדביקו את זה בצ'אט חדש לגמרי ב-Claude Code. הוא יוצר את ה-CTO שלכם, השותף הטכני, ושומר אותו לתמיד.", key: "ctoCreate" },
          ],
        },
        {
          n: "03",
          title: "מתדרכים את ה-CTO על התפקיד שלו",
          body: "עכשיו אתם מלמדים את ה-CTO על מה הוא אחראי: לבנות את שאר הצוות, ולבנות כל שותף כמו שצריך, עם זיכרון משלו, גישה למוח המשותף וליומן הלמידה, הכישורים שהתפקיד שלו דורש, ואופי משלו. אתם קובעים את הסטנדרט פעם אחת, וכל שותף נבנה לפיו.",
          prompts: [
            { label: "פרומפט 2 - תדרוך ל-CTO על התפקיד", intro: "אחרי שה-CTO שלכם קיים, הדביקו את זה כדי שידע איך לבנות את שאר הצוות.", key: "ctoBrief" },
          ],
        },
        {
          n: "04",
          title: "ה-CTO שלכם בונה את ה-CPO",
          body: "מעבירים את המשימה ל-CTO. הוא יוצר את ה-CPO שלכם, מנהל המוצר, זה שמחליט מה בונים קודם ושומר אתכם ממוקדים.",
          prompts: [
            { label: "פרומפט 3 - ה-CTO בונה את ה-CPO", intro: "הדביקו את זה ל-CTO. הוא בונה את ה-CPO ומקים אותו כמו שצריך, מוכן לעבודה.", key: "ctoBuildsCPO" },
          ],
        },
        {
          n: "05",
          title: "ה-CTO שלכם בונה את מעצב המוצר",
          body: "שוב אותו דבר. ה-CTO שלכם יוצר את מעצב המוצר, השותף לעיצוב, המשך ישיר של האומנות שלכם. עכשיו כל הצוות שלכם קיים.",
          prompts: [
            { label: "פרומפט 4 - ה-CTO בונה את מעצב המוצר", intro: "הדביקו את זה ל-CTO כדי לבנות את השותף האחרון.", key: "ctoBuildsPD" },
          ],
        },
        {
          n: "06",
          title: "מתדרכים את ה-CPO על המוצר",
          body: "מספרים ל-CPO מה אתם רוצים לבנות. הוא חוזר עם רשימת עדיפויות: מה נכנס לגרסה הראשונה היום, הדף עצמו, ומה מחכה לאחר כך, כמו חיבור שדה המיילים לרשימה אמיתית. היום בונים רק את הפריטים הראשונים. זה השיעור האמיתי במוצר: להחליט מה עוד לא בונים.",
          prompts: [
            { label: "פרומפט 5 - תדרוך ל-CPO על המוצר", intro: "פתחו צ'אט חדש עם ה-CPO והדביקו את זה. הוא קצר בכוונה, התשובות האמיתיות מגיעות מכם.", key: "cpoBrief" },
          ],
        },
        {
          n: "07",
          title: "בוחרים את המראה",
          body: "מעצב המוצר מסתכל על התוכנית ומציע לכם שלושה או ארבעה כיווני עיצוב שמתאימים למוצר שלכם. אתם בוחרים את זה שמרגיש נכון. הוא כותב design.md קצר, המראה והתחושה שלכם בשפה פשוטה, וכל הצוות בונה לפיו.",
          prompts: [
            { label: "פרומפט 6 - תדרוך למעצב המוצר", intro: "פתחו צ'אט חדש עם מעצב המוצר והדביקו את זה. הוא יראה לכם כמה מראות לבחור מהם, ואז יכתוב את ה-design.md שלכם.", key: "pdBrief" },
          ],
        },
        {
          n: "08",
          title: "נותנים ל-CPO להריץ את הבנייה",
          body: "אומרים ל-CPO לצאת לדרך. עכשיו תסתכלו: הוא מתדרך את ה-CTO, אומר למעצב המוצר לבנות את הדף מתוך ה-design.md, והצוות עובד יחד מול העיניים שלכם. כשזה מוכן, הדף שלכם נפתח חי בדפדפן, הדבר האמיתי הראשון שלכם, שנבנה בידי הצוות שלכם.",
          prompts: [
            { label: "פרומפט 7 - אומרים ל-CPO לבנות", intro: "הדביקו את זה ל-CPO כדי להתחיל את הבנייה. מכאן אתם בעיקר צופים בצוות עובד.", key: "cpoOrchestrate" },
          ],
        },
        {
          n: "09",
          title: "שומרים את מה שהצוות עשה",
          body: "לפני שסוגרים, כל סוכן כותב מה עשה, בזיכרון שלו ובמוח המשותף, כולל המראה שבחרתם. בפעם הבאה שתשבו, שום דבר לא הולך לאיבוד. אתם מתחילים כשכל הצוות כבר יודע איפה עצרתם.",
          prompts: [
            { label: "פרומפט 8 - שומרים את המפגש", intro: "הדביקו את זה ל-CTO בסוף. כל סוכן מתעד מה עשה, ונשמר מסמך פרויקט כך ששום דבר לא הולך לאיבוד עד הפעם הבאה.", key: "wrapup" },
          ],
        },
        {
          n: "10",
          title: "מעלים לאוויר",
          body: "את החלק הזה תסיימו בבית, עם הצוות שלכם לצידכם. הישענו על הסוכנים בכל צעד, ועל ה-CTO בכל דבר טכני, הוא מעביר אתכם דרך החלקים המפחידים.",
          checklist: [
            { name: "מסיימים את הדף", note: "מלטשים את הטיוטה הראשונה למשהו שתשמחו להראות." },
            { name: "מחברים את שדה המיילים", note: "מחברים את שדה המיילים לרשימה אמיתית, כך שהוא באמת אוסף כתובות." },
            { name: "משיגים דומיין", tag: "לפי הצורך", note: "רוצים כתובת אינטרנט משלכם? הקימו אחת. ה-CTO שלכם ילווה אתכם." },
            { name: "מקימים GitHub", tag: "לפי הצורך", note: "פתחו חשבון GitHub ושמרו שם את הפרויקט, כך שהוא שמור ומוכן לפרסום. ה-CTO שלכם מדריך אתכם." },
            { name: "עולים לאוויר", note: "מבצעים את הצעדים הטכניים לפרסום לרשת, כשה-CTO שלכם מטפל בחלקים המפחידים לצידכם." },
          ],
        },
      ],
      closing:
        "קחו אוויר. עד סוף היום יש לכם צוות, ודבר אמיתי ראשון שבניתם יחד. בואו נתחיל.",
    },
  };

  /* ---- The exported model app.js renders ------------------------------- */
  return {
    prompts: PROMPTS,
    en: EN,
    he: HE,
  };
})();

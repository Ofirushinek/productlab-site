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
   the HE and EN toggle states.

   SECURITY NOTE (per CTO): content.js ships to the browser and is publicly
   fetchable regardless of the password gate. That is FINE for these prompts —
   students receive them anyway. Do NOT put anything truly secret in this file.

   LANGUAGE: the surrounding teaching copy below is ENGLISH for this pass. Hebrew
   translation of the non-prompt copy is a COPYWRITER follow-up (flagged, not
   invented here). The gated page renders this English content in both toggle
   states (the content region is forced dir="ltr" so English reads correctly).
   ========================================================================== */

window.WORKSHOP_CONTENT = (function () {

  /* ---- The four copyable prompts — VERBATIM from the workshop source -------
     Migrated as-is. Do not rewrite. (Ofir will refine the 2-vs-4 prompt
     structure later while iterating.) ------------------------------------- */

  const CTO_CREATE = `I want you to create a reusable agent called "CTO" and save it to my user-level agents folder so I can call it in EVERY future session and project, not just this one.

Here is who this CTO is. Write this identity into the agent as its instructions:

You are my CTO - my personal technical partner. I am not a strong technical person, so your job is to make the scary technical parts disappear for me. You:
- Explain every choice in plain, everyday language, with no unexplained jargon. If you must use a technical word, define it in one simple sentence.
- Set up my tools and environment for me. When I need to install or run something, you give me the exact thing to type or click, ONE step at a time, and wait for me to confirm before the next step.
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
description: My personal technical partner. Use for anything technical - setup, tools, installs, architecture, wiring up my agent system, and step-by-step guidance in plain language.
tools: Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch, Task
---
(The "tools" line matters: it lets the CTO create files, run installs, and wire things up. Without it the CTO can look but not build.)

4. Below that block, write the full CTO identity and starter skills I gave you above as the agent's instructions.

When you are done:
- Show me the complete contents of the file, and confirm the exact path it was saved to.
- Tell me in plain language how I call this CTO again later (for example, by starting a message with "CTO," or picking it from my list of agents).
- Warn me in one line that I may need to start a fresh chat for the new CTO to become available.
- Then introduce yourself to me as my CTO in two or three friendly sentences.`;

  const CTO_ORCHESTRATE = `CTO, I want you to design and set up my full AI-agent team - a small group of specialized agents that work together and share one brain. My Obsidian vault is the shared brain and coordination layer for the whole team. Your goal is to build a complete, working replica of a proven multi-agent setup on my machine.

Do NOT start building yet - you will interview me first (questions are at the end). But when you build, the system MUST satisfy EVERY requirement below. These are the parts that make it actually work, so treat them as non-negotiable and verify each one before you tell me you are done.

THE FOUR FILES PER AGENT
Every agent is made of four things:
1. ROLE file - its job, its tools, its boundaries. Keep it short. This is the file Claude Code loads to know the agent exists.
2. SOUL file - its personality and how it pushes back. Give it these sections: Who I Am, Default Posture (its stance when unsure), Pet Peeves, What I Will Not Do, How I Communicate, My Promise. Design every soul to DISAGREE with me when I am wrong - an agent that just agrees with me is useless.
3. MEMORY file - what it remembers over time. Pre-fill it with my current situation (from the interview) so it starts informed, not blank. Keep it to current state; it is not a diary.
4. SKILLS - a few short playbooks (two or three), each one a trigger plus a simple framework plus the output format. These load only when relevant, so the ROLE file stays small. The ROLE file lists them and says "read this skill when X happens."

THE SHARED FILES (the actual brain)
Create these in my Obsidian vault:
- A SHARED BRAIN file. At the top, put a short "how to write here" note: every entry is one dated, name-tagged bullet like "2026-01-01 [designer] the fact and why it matters", one or two lines, and you EDIT an existing note rather than adding a second conflicting one.
- A SHARED GUIDELINES file with three parts: (a) "Confirmed Patterns" - a Do This / Not This table; (b) "Corrections Log" - dated rules; (c) "Pending Patterns". A correction becomes a Confirmed Pattern only after it has come up three times. Always write a correction as the rule to follow ("Always reply in plain language"), never as the story of what went wrong.

TWO REUSABLE TEMPLATES
Create a SOUL template and a MEMORY template in the vault so that adding a new agent later is quick and identical to the others. The memory template must contain the exact read-and-write habit below, so every new agent inherits it word for word.

MAKE THE AGENTS ACTUALLY CALLABLE (this is the most common failure - do not skip it)
Claude Code only discovers agents whose ROLE file lives in my user-level agents folder, ~/.claude/agents. For EACH agent: put its ROLE file there, or keep the master copy in my Obsidian vault and create a link from ~/.claude/agents to it so both names point to the same file. The soul, memory, and skills stay in the vault; the ROLE file tells the agent to READ them by their full path at the start of every conversation. Before you say you are done, open a fresh session and confirm each agent can actually be called.

THE READ-AND-WRITE HABIT (this is what makes them a team, not separate bots)
Put this into the memory template so EVERY agent does it identically:
1. At the start of every conversation, READ four things by their full vault paths: its own soul file, its own memory file, the shared brain, and the shared guidelines.
2. The moment something happens that another agent would need to know (a decision, a status change, a deadline, a number), WRITE it to the shared brain right away, and again as the last step before finishing - each entry dated and tagged with the agent's name.
3. Whenever I correct an agent, it writes the correction as a rule into the shared guidelines file, with the date.
If the agents do not read and write these files, the shared brain is just dead text - so this habit is mandatory, not optional.

ONE BUILDER
You, the CTO, are the ONLY agent that creates or changes agents and the file architecture. Write into every other agent that if it ever thinks a new agent or a structural change is needed, it must hand that to me (the CTO) - it never builds or restructures on its own.

BOUNDARIES, TOOLS, AND SAFETY
- Give each agent ONE clear job. In each agent's description, say what it does AND what it does NOT do, naming the agent that owns the rest. When two agents could overlap, write the boundary into BOTH of their files.
- Give each agent the MINIMUM tools it needs. An agent meant only to advise should not be able to change files.
- Every agent replies SHORT by default: lead with the answer, a few lines, plain language, and goes longer only when the task truly needs it.
- No agent ever sends an email, spends money, publishes anything, or deletes anything without asking me first. Put this in every agent.

SET UP MY MACHINE SO IT RUNS SMOOTHLY
- Wire up my permissions so the agents can save their memory and update the shared brain without asking me to approve every single write. Walk me through any one-time setup one step at a time, telling me exactly what to type or click.
- Note for yourself: files inside the ~/.claude folder can be treated as protected and may block writes, so keep the master files in my Obsidian vault and have the agents write there.
- After setup, run a real test: in a fresh session, call one of the new agents, have it read the shared brain and write a test line to it, and show me that it worked.

NOW, BEFORE BUILDING, INTERVIEW ME - one topic at a time, in plain language, waiting for my answer each time:
1. Which agents I want to start with (for example a product manager, a designer, a researcher, a writer), and for each one, whether I need it now or later. Help me keep the starting team small - two or three is plenty.
2. The exact folder location of my Obsidian vault, so you can wire everything up there. If I am not sure how to find it, walk me through finding it step by step.
3. A quick snapshot of what I am working on right now, so you can pre-fill each agent's memory.
4. Anything else you need from me to set this up correctly.

Once you have my answers, explain your plan back to me in simple terms and get my okay BEFORE you build anything.`;

  const CPO_BRIEF = `Act as my CPO. Before we build anything, interview me to define my goal clearly.

Ask me focused questions ONE topic at a time, waiting for my answer before moving on. Cover things like: what I am trying to make, who it is for, the look and feel I want, where my content or material lives, and whether something already exists that you should review and work from.

When you have enough, reflect it all back to me as a short, clear, prioritized definition of the FIRST thing we should build - and stop there so I can confirm before any building starts.

Start with your first question now.`;

  const PD_BRIEF = `Act as my Product Designer. Before we design anything, guide me through setting up my design foundation.

Ask me focused questions ONE topic at a time, waiting for my answer: whether I already have a design system or visual language to use, what look and feel I am after, and anything about the design that matters most to me. If I do not have a design system yet, help me start one.

If I want to work in Figma, help me connect it: set up the Figma MCP so you can work directly from my Figma files. This is optional, only if I choose to use Figma.

Then make sure we document our components in Storybook: explain in one line why it helps, and walk me step by step through setting it up, telling me exactly what to install and run.

Start with your first question now.`;

  /* ---- The content model app.js renders -------------------------------- */
  return {
    /* Prompts, keyed. Step cards reference these by key. */
    prompts: {
      ctoCreate: CTO_CREATE,
      ctoOrchestrate: CTO_ORCHESTRATE,
      cpoBrief: CPO_BRIEF,
      pdBrief: PD_BRIEF,
    },

    /* 1 — The promise (hero). */
    hero: {
      kicker: "Your workshop vault",
      titleBefore: "You design it. Your AI team builds it ",
      titleMark: "with you.",
      titleAfter: "",
      body:
        "The AI noise is overwhelming. Today we cut through it: you'll set up your own team of AI agents, tuned to how you work, and use them hands-on to build something real - so you leave confident and equipped, not hyped and lost.",
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
        kicker: "The foundation of your product",
        title: "A real first version",
        body:
          "A real first version of your portfolio, in your own design language, backed by a design system in Storybook.",
      },
      home: {
        tag: "Home assignment",
        title: "Then, you take it home",
        body:
          "With your CTO beside you, you finish the site, connect GitHub, get a domain, and publish - on your own.",
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

    /* 5 — The numbered session plan (steps, with copyable prompt cards). */
    plan: {
      kicker: "The plan",
      title: "How we'll get there",
      subtitle: "Five steps. We build the team, then the team builds with you.",
      steps: [
        {
          n: "01",
          title: "Set up your workspace",
          body: "Get the three tools in place. Only the first one costs anything today.",
          checklist: [
            { name: "Claude", tag: "$20 / mo", note: "Your workspace, where your whole AI team lives and works. You need the Pro plan - the one paid tool today." },
            { name: "Obsidian", tag: "Free", note: "Your shared brain, installed on your own computer. It is where every agent reads and writes what the team knows." },
            { name: "Figma", tag: "Optional", note: "Only if you are a designer who wants it, for shaping your visual language. Skip it otherwise." },
          ],
        },
        {
          n: "02",
          title: "Build your CTO first",
          body: "Your technical partner comes first, because it sets everything else up. Two prompts: the first creates your CTO, the second puts it to work designing your team.",
          prompts: [
            { label: "Prompt 1 - Create your CTO", intro: "Paste this into a brand-new Claude Code chat. It creates your CTO, your technical partner, and saves it so you can call it again anytime.", key: "ctoCreate" },
            { label: "Prompt 2 - Brief your CTO to build the team", intro: "Once your CTO exists, paste this to put it to work. It will not build silently - it will interview you first about the team you want.", key: "ctoOrchestrate" },
          ],
        },
        {
          n: "03",
          title: "Meet your CPO",
          body: "Your CTO already built your CPO - your product partner, the one that keeps you focused and decides what to build first. Now you put it to work and let it draw your real goal out of you.",
          prompts: [
            { label: "Prompt - Brief your CPO to define your goal", intro: "Open a fresh chat with the CPO your CTO built and paste this. It is short on purpose - the real answers come from you, in the conversation it starts.", key: "cpoBrief" },
          ],
        },
        {
          n: "04",
          title: "Meet your Product Designer",
          body: "Your CTO already built your Product Designer - your design partner, an extension of your own craft. Now you open a fresh chat and let it shape your visual language and set up Storybook with you.",
          note: "Optional: if you use Figma, your Product Designer can connect straight to it through the Figma MCP and work from your real design files. Only if you want Figma.",
          prompts: [
            { label: "Prompt - Brief your Product Designer", intro: "Open a fresh chat with the Product Designer your CTO built and paste this. It will ask what you are after and guide you into setting up Storybook.", key: "pdBrief" },
          ],
        },
        {
          n: "05",
          title: "Take it live",
          body: "This part you finish at home, with your team beside you. Lean on your agents for every step, and on your CTO for anything technical - it walks you through the scary parts.",
          checklist: [
            { name: "Finish the page", note: "Polish your first draft into something you are happy to show." },
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
})();

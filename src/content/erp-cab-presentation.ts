// Content copied verbatim from Agent Adoption insights from CAB, commit e8c2fbb9.
type KeyFinding = {
  tag: string;
  title: string;
  insight: string;
  evidence: string[];
  quote?: string;
  builds: { stage: string; text: string }[];
  crossRefs?: number[];
  ltAngle?: { lens: string; point: string; soundbite: string };
};

export const cabThemes: KeyFinding[] = [
  {
    tag: "① Trial · Onboarding",
    title: "Test before committing",
    insight:
      "Customers won't commit their entire tenant to an unproven agent — they want a sandbox first.",
    evidence: [
      "Top-rated concept overall (5.0/5)",
      "In-person participants independently proposed sandbox trials without prompting",
    ],
    quote: "Trial based — non-consuming model for sandbox testing.",
    builds: [
      {
        stage: "Onboarding",
        text: "Make \"try before you commit\" the default — a sandbox or limited-scope trial inside onboarding, before tenant-wide activation.",
      },
    ],
    crossRefs: [3],
    ltAngle: {
      lens: "Strategy · Pipeline risk",
      point:
        "Tenant-wide commitment is the single biggest deal-blocker. A sandbox trial converts evaluation into adoption without putting production at risk — it is the cheapest pipeline unlock we have.",
      soundbite: "No sandbox, no signature.",
    },
  },
  {
    tag: "② Cost · Discovery",
    title: "Show the cost before the bill",
    insight:
      "Customers can't justify what they can't predict — unpredictable consumption cost is a top buy-in blocker.",
    evidence: [
      "Cost opacity surfaced as a top blocker across both sessions",
      "Customers ask for projections, sample scenarios, and usage caps up front",
    ],
    quote: "Old phone data plans — risky.",
    builds: [
      {
        stage: "Discovery",
        text: "A cost-prediction view — predictive estimates, sample-scenario projections, and usage caps — surfaced as a purchase requirement, not an after-the-fact bill.",
      },
    ],
    crossRefs: [3],
    ltAngle: {
      lens: "Release bar · Procurement risk",
      point:
        "Unpredictable consumption cost is the #1 procurement blocker — finance teams can't approve what they can't model. Cost transparency at Discovery is a release gate, not a feature.",
      soundbite: "Predictable cost is the price of admission.",
    },
  },
  {
    tag: "③ Findability · Discovery + Onboarding",
    title: "Make agents findable",
    insight:
      "Customers don't know what exists, what it does, or how to come back to it — adoption stalls before it starts.",
    evidence: [
      "Discoverability surfaced 5 times in the in-person CAB (May 22), across 5 distinct dimensions: existence, capability, re-discovery, navigation, onboarding",
      "2 of those 5 sticky notes received an additional upvote — the room agreed these mattered",
    ],
    quote: "Did not know 'all agents' exists.",
    builds: [
      {
        stage: "Discovery",
        text: "A business-stakeholder-facing agent catalog: capabilities, owners, and cost profile per agent — searchable and comparable.",
      },
      {
        stage: "Onboarding",
        text: "In-context agent surfacing plus a personal \"my agents\" view, with a guided walkthrough on first use.",
      },
    ],
    ltAngle: {
      lens: "Competitive · Revenue per agent",
      point:
        "Invisible agents don't generate usage and don't generate revenue. A discoverable catalog plus a personal \"my agents\" view is how we convert one-time deploys into recurring consumption — and how we stop losing the second look to competitors.",
      soundbite: "Invisible agents don't ship revenue.",
    },
  },
  {
    tag: "④ Setup · Deploy",
    title: "Fix the deploy break",
    insight:
      "Deploy is the only stage with zero positive sentiment in either session — unclear steps, cross-role coordination, no way to validate done.",
    evidence: [
      "Online sentiment: 73% negative (Mentimeter, n=15)",
      "In-person sentiment: 2 sad / 0 happy — only stage with zero positive stickers",
      "Multiple blockers cluster here: cost, organizational complexity, unclear steps",
    ],
    quote: "Need a lot of clarification in deploying our agent.",
    builds: [
      {
        stage: "Deploy",
        text: "A structured, validate-as-you-go setup with a clear owner per step, scenario-based templates, and an explicit \"ready to go-live\" gate.",
      },
      {
        stage: "Deploy",
        text: "Built-in governance at deploy: scoped permissions, change log, and proactive notifications to affected users.",
      },
    ],
    ltAngle: {
      lens: "Release bar · Deal-stage risk",
      point:
        "Deploy is the only lifecycle stage with zero positive sentiment — this is where signed deals stall and never reach active usage. Fixing Deploy is the highest-leverage move for activation rate and time-to-value.",
      soundbite: "We lose the deal at deploy.",
    },
  },
  {
    tag: "⑤ Reasoning · Monitoring",
    title: "Show the reasoning, not just the result",
    insight:
      "Reasoning is the study's bright spot — being able to validate how the agent thinks turns skeptics into happy users.",
    evidence: [
      "Reasoning log / activity summary rated 4.3/5 — one of the highest-rated concepts",
      "Highlighted in-person as the trait that leads to happy users",
    ],
    quote: "Clarity in agentic decisions is important.",
    builds: [
      {
        stage: "Monitoring",
        text: "Reasoning-by-default in the agent UI — a visible activity summary and decision log end users can scan whenever the agent acts. Structure it as a progressive trust stack: lead with a confidence signal, then a short rationale, with deeper reasoning and source evidence available on drill-down.",
      },
    ],
    crossRefs: [2, 3],
    ltAngle: {
      lens: "Competitive moat · Trust",
      point:
        "Reasoning is the only concept that consistently turns skeptics into advocates. Two independent CABs converged on it — this is our durable differentiator against black-box competitors and our strongest defense against governance pushback.",
      soundbite: "Trust compounds; opacity churns.",
    },
  },
];

export const cabStageStatus = [
  {
    id: "discovery",
    title: "Discovery",
    
    status: { label: "Confidence missing", tone: "severe" },
    headline: "Buyers can't see what exists or what it will cost — so they can't decide.",
    drivers: ["② Cost", "③ Findability"],
  },
  {
    id: "deploy",
    title: "Deploy",
    
    status: { label: "Confidence breaking", tone: "danger" },
    headline: "The single most broken stage — zero positive sentiment in either session.",
    drivers: ["④ Setup"],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    
    status: { label: "Confidence to enhance", tone: "warning" },
    headline: "Confidence is forming, but customers want to validate before they commit.",
    drivers: ["① Trial", "③ Findability"],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    
    status: { label: "Confidence holding", tone: "success" },
    headline: "The bright spot — visible reasoning is already turning skeptics into believers.",
    drivers: ["⑤ Reasoning"],
  },
] as const;

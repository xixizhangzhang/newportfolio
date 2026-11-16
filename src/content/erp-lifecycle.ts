import illustration from "@/assets/erp-customer-insights-illustration.jpg";
import discovery from "@/assets/erp-lifecycle-62.png.asset.json";
import onboarding from "@/assets/erp-lifecycle-63.png.asset.json";
import confidence from "@/assets/erp-lifecycle-64.png.asset.json";
import monitor from "@/assets/erp-lifecycle-65.png.asset.json";
import optimize from "@/assets/erp-lifecycle-66.png.asset.json";
import resolved from "@/assets/erp-lifecycle-67.png.asset.json";

export const lifecycleCover = { image: illustration, alt: "A designer listens to customers and captures their insights. Those insights inform contextual discovery, simulation previews, supporting evidence and activity feedback to build confidence and trust in ERP agents." };

export const adoptionFindings = [
  { label: "Try before committing", finding: "Customers wanted a sandbox or limited-scope trial before committing to an agent.", response: "Use past ERP tasks to preview behavior before activation." },
  { label: "Know the cost upfront", finding: "Unpredictable consumption costs blocked buy-in; customers asked for estimates and sample scenarios.", response: "Show expected value and estimated cost together, with case-level detail." },
  { label: "Find the right capability", finding: "Customers struggled to know what exists, what it does, and how to return to it.", response: "Suggest relevant capabilities in the context of work already done." },
  { label: "Understand what happened", finding: "Understandable decisions and activity summaries helped customers validate agent behavior.", response: "Keep activity visible, explain issues, and confirm what changed." },
] as const;

export const lifecycleStages = [
  {
    id: "erp-discovery", label: "Discover relevance", phase: "Before activation", evidence: "A relevant suggestion",
    image: discovery.url,
    title: "Make the first step worth taking.",
    description: "A generic automation catalog gives users little reason to explore. I connected suggestions to completed ERP tasks, making the opportunity relevant to work they already recognized.",
    decision: "Explain why the suggestion appeared and what work it could take on. Offer a preview before asking for commitment, rather than asking users to trust an unfamiliar automation.",
    value: "Start with the work users already recognize.",
  },
  {
    id: "erp-onboarding", label: "Preview the value", phase: "Before activation", evidence: "Historical-task simulation",
    image: onboarding.url,
    title: "Replace a promise with a preview.",
    description: "Users wanted to try before committing. I simulated historical ERP tasks and paired potential value with estimated cost, turning setup into a trade-off they could assess.",
    decision: "Present the trade-off between value and cost alongside the trigger, scope, and actions. Users can judge whether the capability is useful and what they are agreeing to. Setup becomes an informed decision rather than a form to complete.",
    value: "Value and cost belong in the same decision.",
  },
  {
    id: "erp-confidence", label: "Inspect the evidence", phase: "Before activation", evidence: "Case-level simulation",
    image: confidence.url,
    title: "Let users judge the evidence themselves.",
    description: "Headline savings can hide important differences between cases. I made simulated steps inspectable beside the previous workflow, so users could judge the proposed actions, their own involvement and the cost.",
    decision: "Compare the previous workflow with the simulated one: what the agent would do, where the user would still be involved, and what it would cost. Keep detail available when a user needs reassurance without making it a prerequisite for everyone.",
    value: "Make detail available without requiring it of everyone.",
  },
  {
    id: "erp-monitor", label: "Stay informed", phase: "After activation", evidence: "Sample activity · Usage forecast",
    image: monitor.url,
    title: "Keep users informed without making them supervise.",
    description: "Checking every run undermines delegation. I kept routine activity accessible and surfaced exceptions and projected usage concerns only when attention was needed.",
    decision: "Distinguish routine activity from exceptions. Surface a clear signal, its implication, and a path to the evidence, including when projected usage may exceed expectations.",
    value: "Reserve attention for the exceptions.",
  },
  {
    id: "erp-optimize", label: "Understand & act", phase: "After activation", evidence: "Issue evidence · Proposed adjustment",
    image: optimize.url,
    title: "Turn uncertainty into an informed choice.",
    description: "A cheaper configuration can change how work gets done. I paired the issue and supporting evidence with the proposed adjustment, making that trade-off clear before users applied it.",
    decision: "Show the cause, proposed change, and expected trade-off together. A lower-cost configuration also changes agent behavior; users should understand both before applying it.",
    value: "A lower cost can also mean different behavior.",
  },
  {
    id: "erp-resolved", label: "Confirm the change", phase: "After activation", evidence: "Updated configuration · Revised forecast",
    image: resolved.url,
    title: "Confirm what changed and what to expect next.",
    description: "After an adjustment, users need to know what changed. I showed the updated configuration, status and forecast, then kept subsequent runs observable so users could assess the actual effect.",
    decision: "Confirm what changed and keep the next runs observable. A resolved warning or improved forecast is not proof of realized savings; the actual effect still needs to be monitored.",
    value: "An updated forecast still needs follow-through.",
  },
] as const;

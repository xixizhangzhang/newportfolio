import { Badge, Body1, Card, Divider, Subtitle2 } from "@/design-system/ms-fluent-for-bic-65f6c6";
import "./mcp-trust-principle.css";

const rules = [
  { title: "Show the reason", question: "Why is this being flagged for review?", items: ["Missing information", "Policy issue", "Duplicate indicators", "Detected mismatches", "Confidence cues", "Final submission"] },
  { title: "Show the evidence", question: "What does someone need to judge it?", items: ["Source records", "Receipts or attachments", "Policy references", "Provenance where available"] },
  { title: "Gate the action", question: "What is about to happen, and is it reversible?", items: ["Consequences of the action", "Explicit confirmation to submit or post", "Explicit confirmation to approve, reject, or return", "Extra care for irreversible or auditable steps"] },
  { title: "Keep review visible", question: "Where does an open issue live until it is closed?", items: ["Unresolved issues stay on the surface", "Never buried in chat scrollback", "Cleared only when resolved or intentionally dismissed"] },
];

export default function McpTrustPrinciple() {
  return <div className="mcp-trust-content">
    <div className="mcp-trust-introduction"><Subtitle2>Four rules, in order</Subtitle2><Body1>Each rule answers one question, and lists what has to be on screen to answer it.</Body1></div>
    <div className="mcp-trust-rules">
      {rules.map((rule, index) => <Card key={rule.title} size="large" className="mcp-trust-rule">
        <div className="mcp-trust-rule-body">
        <div className="mcp-trust-rule-heading"><Badge appearance="filled" color="brand" shape="circular" size="extra-large">0{index + 1}</Badge><Subtitle2>{rule.title}</Subtitle2></div>
        <div className="mcp-trust-rule-copy"><Body1>{rule.question}</Body1></div>
        <Divider />
        <ul className="mcp-trust-rule-list">{rule.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </Card>)}
    </div>
    <div className="mcp-trust-footer"><Divider /><Body1 italic>Without evidence, a confident answer is just an assertion.</Body1></div>
  </div>;
}
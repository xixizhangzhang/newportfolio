import { Card, CardHeader, Body1, Subtitle2 } from "@/design-system/ms-fluent-for-bic-65f6c6";
import McpExperienceCover from "@/components/McpExperienceCover";

const summary = [
  { label: "Context", content: <>F&amp;O is preparing to bring ERP capabilities into Copilot and other products through <strong>MCP Apps</strong>. The task must stay coherent as its presentation changes.</> },
  { label: "Problem", content: <>A generated result can return the right data without providing the right experience. <strong>How do we connect the user’s intent to a useful interaction?</strong></> },
  { label: "What I did", content: <>I started with an <strong>Expense team pilot</strong>, then defined Design principles as guidance and Storybook as building blocks, supported by live-model scenario testing.</> },
  { label: "Results so far", content: <>I built <strong>a starting framework for generated ERP experiences</strong> and a contribution process for extending it with new scenarios.</> },
];

export default function McpProjectIntroduction() {
  return <>
    <header className="mcp-project-introduction">
      <div className="mcp-copy">
        <span className="mcp-section-index">Microsoft / MCP Apps</span>
        <h1 className="mcp-project-title">Designing generated ERP experiences</h1>
        <p className="mcp-project-description">I created design principles and a shared Storybook so generated ERP experiences stay consistent and intent-driven across Copilot, Teams, and F&O.</p>
      </div>
      <dl className="mcp-project-facts">
        <div><dt>Company</dt><dd>Microsoft · MCP Apps</dd></div>
        <div><dt>Role &amp; Year</dt><dd>Senior UX Designer · 2026</dd></div>
        <div><dt>Focus</dt><dd>Experience standards lead · Design principles · Storybook</dd></div>
      </dl>
    </header>
    <div className="mcp-project-cover"><McpExperienceCover /></div>
    <section id="mcp-short-version" className="mcp-short-version" aria-labelledby="mcp-short-title">
      <div className="mcp-summary-heading"><h2 id="mcp-short-title">The short version</h2></div>
      <div className="mcp-summary-grid">{summary.map(item => <Card key={item.label} appearance="filled" size="large"><CardHeader header={<Subtitle2>{item.label}</Subtitle2>} /><Body1>{item.content}</Body1></Card>)}</div>
    </section>
  </>;
}

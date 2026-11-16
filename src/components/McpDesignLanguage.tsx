import ExplorerTypingPreview from "@/components/ExplorerTypingPreview";
import ExplorerFoundationPreview from "@/components/ExplorerFoundationPreview";
import ExplorerScenarioPreview from "@/components/ExplorerScenarioPreview";
import "./mcp-design-language.css";
import { Fragment, useState } from "react";
import { Card } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { Add24Regular, ArrowDown24Regular } from "@fluentui/react-icons";

const items = [
  { id: "mcp-intent", label: "Design guidance", title: "Design principles", description: "Ground generated experiences in business tasks, user intent, and clear interaction principles.", Preview: ExplorerTypingPreview },
  { id: "mcp-building-blocks", label: "Reusable components", title: "Storybook", description: "Explore MCP-ready components and patterns for consistent ERP experiences.", Preview: ExplorerFoundationPreview },
  { id: "mcp-output", label: "Live model testing", title: "Scenario testing", description: "Test generated ERP experiences with live AI models, F&O data, and the guidance and building blocks we have assembled.", Preview: ExplorerScenarioPreview },
];
export default function McpDesignLanguage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return <>
    <div className="mcp-copy"><span className="mcp-section-index">Key decisions</span><h2 id="mcp-solution-title">Guide with principles. Build with blocks.</h2><p>I translated the Expense intent mapping into two complementary resources: <strong>Design principles for guidance</strong> and <strong>Storybook for reusable components and patterns</strong>. Scenario testing supports their use with live AI models and F&amp;O data.</p></div>
    <div className="mcp-language-grid">{items.map(({ id, label, title, description, Preview }, index) => <Fragment key={id}>
      {index > 0 && <div className="mcp-language-connector" aria-hidden="true">{index === 1 ? <Add24Regular /> : <ArrowDown24Regular />}</div>}
      <Card className="mcp-language-item" role="link" aria-label={title} tabIndex={0} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)} onClick={() => onNavigate(id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onNavigate(id); } }}>
        <div className="mcp-language-preview" ref={node => node?.querySelectorAll("button, input").forEach(control => control.setAttribute("tabindex", "-1"))}><Preview active={hovered === id} /></div>
        <div className="mcp-copy mcp-language-copy"><span className="mcp-section-index">{label}</span><h3>{title}</h3><p>{description}</p></div>
      </Card>
    </Fragment>)}</div>
  </>;
}
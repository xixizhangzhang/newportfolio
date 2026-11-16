import { ArrowRight24Regular, CheckmarkCircle24Regular, DocumentBulletList24Regular, Library24Regular, ShieldCheckmark24Regular } from "@fluentui/react-icons";
import McpSurfaceDiagram from "@/components/McpSurfaceDiagram";
import McpParadigmDiagram from "@/components/McpParadigmDiagram";

export type McpVisualKind = "overview" | "surfaces" | "context" | "baseline" | "rules" | "validation" | "contribution" | "impact";

const principles = ["User intent", "Trust", "Fit", "Continuity", "Identity"];

export default function McpProjectVisual({ kind = "overview", compact = false, children }: { kind?: McpVisualKind; compact?: boolean; children?: React.ReactNode }) {
  if (kind === "surfaces") return <McpSurfaceDiagram />;
  if (kind === "context") return <McpParadigmDiagram />;
  return <div className={`mcp-visual mcp-visual-${kind}${compact ? " mcp-visual-compact" : ""}`} role={children ? undefined : "img"} aria-label={children ? undefined : `Concept diagram: ${kind === "overview" ? "one ERP experience across Microsoft AI surfaces" : kind}`}>
    {kind === "overview" && <>
      <div className="mcp-visual-heading">Guidance and building blocks.<br /><strong>One generated experience.</strong></div>
      <div className="mcp-layer-stack">
        <div><small>Design principles / Guidance</small><strong>What should the experience do?</strong><span>Intent · Trust · Fit · Continuity · Identity</span></div>
        <div><small>Storybook / Building blocks</small><strong>How should it be composed?</strong><span>Components + patterns · Structure, state, and interaction contracts</span></div>
      </div>
      <div className="mcp-system-band"><ArrowRight24Regular /><span>Generated output: surface + composition + behavior</span></div>
      <div className="mcp-visual-note">Principles guide the decisions. Building blocks give those decisions a reusable form.</div>
    </>}
    {kind === "baseline" && <>
      <Library24Regular /><div className="mcp-visual-heading">Storybook / Building blocks<br /><strong>Compose, rather than reinvent.</strong></div>
      <div className="mcp-contract"><span>Pattern / Selectable record list</span><h3>A reusable recipe, built from components</h3><div className="mcp-contract-grid">{["Card", "Header", "List", "Footer"].map(x => <span key={x}><CheckmarkCircle24Regular />{x}</span>)}</div></div>
      <div className="mcp-system-band"><span>Components / Instantiable elements</span><span>Patterns / Composition recipes</span></div>
      <div className="mcp-visual-note">Storybook makes the structure, states, actions, and JSON contracts inspectable.</div>
    </>}
    {kind === "rules" && <>
      <DocumentBulletList24Regular /><div className="mcp-visual-heading">Design principles / Guidance<br /><strong>Decide before drawing.</strong></div>
      <div className="mcp-principle-list">{principles.map((name, i) => <div key={name}><strong>{name}</strong><span>{["Start with what the person wants to do.", "Separate preparation, review, authorization, and commitment.", "Match surface depth and width to complexity and data density.", "Continue the same task across transitions.", "Preserve product meaning, even when presentation changes."][i]}</span></div>)}</div>
      <div className="mcp-visual-note">The same business object can need different experiences for different intents.</div>
    </>}
    {kind === "validation" && <>
      <ShieldCheckmark24Regular /><div className="mcp-visual-heading">Inspect the output.<br /><strong>And the decisions.</strong></div>
      <div className="mcp-check-list">{["MCP output preview", "Process", "Experience JSON", "Checks"].map(x => <div key={x}><DocumentBulletList24Regular /><span>{x}</span><small>Review view</small></div>)}</div>
      <div className="mcp-visual-note">Test with live AI models, F&amp;O data, design principles, and Storybook building blocks.</div>
    </>}
    {kind === "contribution" && <>
      <Library24Regular /><div className="mcp-visual-heading">Shared standards.<br /><strong>A path to participate.</strong></div>
      <div className="mcp-rule-flow">{["Get started", "Contribute to Storybook", "Test"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong>{i < 2 && <ArrowRight24Regular />}</div>)}</div>
      <div className="mcp-system-band"><span>Reuse a pattern</span><span>Compose components</span><span>Propose a catalog gap</span></div>
      <div className="mcp-visual-note">Explore in Sandbox. Publish reviewed contracts in Storybook.</div>
    </>}
    {kind === "impact" && <>
      <div className="mcp-visual-heading">Design principles and Storybook, applied.<br /><strong>One expense-review journey.</strong></div>
      <div className="mcp-rule-flow">{["Intent / Review expenses and supporting evidence", "Trust + Fit / Surface review issues in a pane", "Building blocks / Compose summary, list, evidence, and actions", "Continuity + Identity / Carry the same records and draft forward", "Trust / Explicit confirmation before submission"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}</div>
    </>}
    {children && <div className="mcp-panel-story">{children}</div>}
  </div>;
}
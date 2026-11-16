import "./mcp-handoff-prototype.css";

/** The supplied standalone runtime owns its sample records and review state. */
export default function McpHandoffPrototype({ kind }: { kind: "intent" | "fit" | "continuity" }) {
  return <div className="mcp-handoff-prototype" data-prototype-kind={kind}>
    <iframe className="mcp-handoff-frame" title={`${kind} interactive prototype`} src={`/prototypes/design-principles.html?kind=${kind}`} />
  </div>;
}
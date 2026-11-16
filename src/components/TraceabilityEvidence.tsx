import { Body1, Caption1, Card, CardHeader, Subtitle2, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowRight20Regular, Document20Regular, Box20Regular, Wrench20Regular } from "@fluentui/react-icons";
import "./traceability-evidence.css";
import TraceabilityImpactEvidence from "./TraceabilityImpactEvidence";
import TraceabilityMotion, { type TraceabilityMotionKind } from "./TraceabilityMotion";

export type TraceabilityVisual = "context" | "activities" | "inline" | "impact" | "recall-results" | TraceabilityMotionKind;

function Relationship({ compact = false }: { compact?: boolean }) {
  return <svg className="traceability-relationship" viewBox={compact ? "0 0 960 300" : "0 0 960 460"} role="img" aria-label="A bicycle linked to its frame, front set and brake levers">
    <g className="traceability-links"><path d="M245 180H340V100H420M340 180V270H420M600 270H690" /></g>
    <g className="traceability-node"><rect x="65" y="135" width="180" height="90" /><rect x="420" y="55" width="180" height="90" /><rect x="420" y="225" width="180" height="70" /><rect x="690" y="225" width="205" height="70" /></g>
    <g className="traceability-labels"><text x="90" y="170">Speed Bicycle</text><text x="90" y="198" className="traceability-small">Current item</text><text x="445" y="90">Frame</text><text x="445" y="118" className="traceability-small">Composition</text><text x="445" y="266">Front set</text><text x="710" y="266">Brake levers</text></g>
  </svg>;
}

export function TraceabilityCover() {
  const items = [
    { x: 120, y: 230 },
    { x: 340, y: 150 },
    { x: 590, y: 290 },
    { x: 840, y: 230 },
    { x: 120, y: 80 },
    { x: 340, y: 55 },
    { x: 590, y: 90 },
    { x: 840, y: 70 },
    { x: 120, y: 380 },
    { x: 340, y: 360 },
    { x: 590, y: 410 },
    { x: 840, y: 380 },
  ];
  const tracedPath = "M120 230L340 150L590 290L840 230";
  return <svg className="traceability-relationship traceability-cover" viewBox="0 0 960 460" role="img" aria-label="A trace progressively connects and highlights four items from left to right">
    <g className="traceability-network-links"><path d="M120 80L340 55L590 90L840 70M120 80L340 150L590 90L840 230M120 230L340 55M340 150L590 410L840 380M120 380L340 360L590 290L840 380M120 230L340 360L590 410M590 90L840 230M590 290L840 70M120 80V380M840 70V380" /><path d={tracedPath} /></g>
    {["M120 230L340 150", "M340 150L590 290", "M590 290L840 230"].map((path, index) => <path key={path} className="traceability-traced-link" data-step={index + 1} pathLength={1} d={path} />)}
    {items.map((item, index) => <g key={`${item.x}-${item.y}`} className="traceability-network-item">
      <rect x={item.x - 55} y={item.y - 23} width="110" height="46" />
      {index < 4 && <rect className="traceability-traced-node" data-step={index} x={item.x - 55} y={item.y - 23} width="110" height="46" />}
    </g>)}
  </svg>;
}

const events = ["Procurement", "Front frame production", "Assembly", "Finished product"];
function Activities({ compact = false }: { compact?: boolean }) {
  return <div className="traceability-activities fluent-surface-subtle">
    <div className="traceability-evidence-heading"><Subtitle2>Seat frame activities</Subtitle2><Caption1>Final design · activity evidence</Caption1></div>
    <div className="traceability-filters"><Caption1>April 20, 2023 — Today</Caption1><Caption1>Procurement · Production · Sales</Caption1></div>
    <ol className="traceability-timeline">{events.map((event, index) => <li key={event}><span className="traceability-event-icon">{index === 0 ? <Box20Regular /> : index === 3 ? <Document20Regular /> : <Wrench20Regular />}</span><Body1>{event}</Body1></li>)}</ol>
    {!compact && <div className="traceability-records">
      <div><Subtitle2>Details</Subtitle2><dl><div><dt>Worker</dt><dd>Jeremy Y.</dd></div><div><dt>Machine</dt><dd>Assemble station 13</dd></div><div><dt>Activity type</dt><dd>Production</dd></div></dl></div>
      <div><Subtitle2>Items handled at this step</Subtitle2><Table size="small" aria-label="Illustrative event inputs and outputs"><TableHeader><TableRow><TableHeaderCell>Type</TableHeaderCell><TableHeaderCell>Item</TableHeaderCell></TableRow></TableHeader><TableBody><TableRow><TableCell>Consumed</TableCell><TableCell>Components</TableCell></TableRow><TableRow><TableCell>Output</TableCell><TableCell>Seat frame</TableCell></TableRow></TableBody></Table></div>
      <div><Subtitle2>Data collection</Subtitle2><dl><div><dt>Received location</dt><dd>Location A</dd></div><div><dt>Operation temperature</dt><dd>65 °C</dd></div></dl></div>
    </div>}
  </div>;
}

export default function TraceabilityEvidence({ kind }: { kind: TraceabilityVisual }) {
  if (kind === "trace-search" || kind === "trace-loading" || kind === "trace-process") return <TraceabilityMotion kind={kind} />;
  if (kind === "impact" || kind === "recall-results") return <TraceabilityImpactEvidence completed={kind === "recall-results"} />;
  if (kind === "context") return <div className="traceability-context">{[{ title: "Locate", text: "Serial, batch or product label", icon: <Box20Regular /> }, { title: "Investigate", text: "Production, quality and maintenance records", icon: <Wrench20Regular /> }, { title: "Assess impact", text: "Affected products, shipments and customers", icon: <Document20Regular /> }].map((step, index) => <div className="traceability-context-step" key={step.title}><Card appearance="outline"><CardHeader image={step.icon} header={<Subtitle2>{step.title}</Subtitle2>} /><Body1>{step.text}</Body1></Card>{index < 2 && <ArrowRight20Regular aria-hidden="true" />}</div>)}</div>;
  return <figure className="traceability-final-evidence">{kind === "inline" && <Relationship compact />}<Activities compact={kind === "inline"} /><figcaption><Caption1>Reconstructed from the supplied Figma design · illustrative records</Caption1></figcaption></figure>;
}
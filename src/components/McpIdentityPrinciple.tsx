import { Body1, Card, CardHeader, Subtitle2, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@/design-system/ms-fluent-for-bic-65f6c6";
import chat from "@/assets/identity-chat.png.asset.json";
import pane from "@/assets/identity-pane.png.asset.json";
import workspace from "@/assets/identity-workspace.png.asset.json";
import "./mcp-identity-principle.css";

const surfaces = [
  { title: "Chat", image: chat.url, use: "Ask, clarify, summarize, filter, and take lightweight actions." },
  { title: "Right-side pane", image: pane.url, use: "Review, compare, edit, inspect evidence, and confirm a focused action." },
  { title: "Page or workspace", image: workspace.url, use: "Handle dense, multi-entity work that persists, resumes, or needs monitoring." },
];
const models = [
  ["Entity", "The same object identity and key fields across every view."],
  ["Status", "Status, warnings, review, and confirmation states keep the same meaning."],
  ["Actions", "Visibility and gating may adapt to space and risk; action semantics stay consistent."],
  ["Contract", "Reuse the same building-block contract, adapting through variants—not one-off UI."],
];

export default function McpIdentityPrinciple() {
  return <>
    <div className="mcp-copy"><h3>What may change</h3><p>Density, layout, and available space adapt as the task moves from chat to a pane or workspace.</p></div>
    <div className="mcp-identity-surfaces grid grid-cols-1 md:grid-cols-3">
      {surfaces.map(surface => <Card key={surface.title} className="mcp-identity-surface" appearance="outline" size="large">
        <CardHeader header={<Subtitle2>{surface.title}</Subtitle2>} />
        <img className="block w-full h-auto" src={surface.image} alt={`${surface.title} wireframe`} />
        <Body1>{surface.use}</Body1>
      </Card>)}
    </div>
    <div className="mcp-copy"><h3>What must not change</h3></div>
    <Table aria-label="Identity across surfaces"><colgroup><col width="25%" /><col width="75%" /></colgroup><TableHeader><TableRow><TableHeaderCell>Model</TableHeaderCell><TableHeaderCell>Keep consistent</TableHeaderCell></TableRow></TableHeader><TableBody>
      {models.map(([model, description]) => <TableRow key={model}><TableCell>{model}</TableCell><TableCell>{description}</TableCell></TableRow>)}
    </TableBody></Table>
  </>;
}
import { Table, TableHeader, TableHeaderCell, TableRow, TableBody, TableCell } from "@/design-system/ms-fluent-for-bic-65f6c6";
import McpHandoffPrototype from "./McpHandoffPrototype";

const intentRows = [
  ["Ask / explain", "Understand status or next steps", "Chat"],
  ["Find / navigate", "Locate a record or page", "Chat → pane/page for inspection"],
  ["Summarize / monitor", "See totals, trends, or risks", "Chat card; dashboard for ongoing monitoring"],
  ["Review / validate", "Check fields and evidence", "Pane/page for structured review"],
  ["Compare / decide", "Weigh options", "Side-by-side pane/page"],
  ["Edit / resolve", "Update fields or fix issues", "Pane/form with validation and undo"],
  ["Confirm / submit", "Approve or complete an action", "Evidence + explicit confirmation"],
];
const continuityRows = [
  ["Selections", "Stated intent · Selected entities · Filters and sorting"],
  ["Work state", "Task state · Draft edits · Unresolved issues"],
  ["Evidence", "Evidence and sources · Previous decisions"],
  ["Return path", "Available next actions"],
];
function GuidanceTable({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return <Table aria-label={label} className="intent-mapping-table"><TableHeader><TableRow>{headers.map(header => <TableHeaderCell key={header}>{header}</TableHeaderCell>)}</TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row[0]}>{row.map((cell, i) => <TableCell key={i}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table>;
}
export default function McpDesignPrinciplesContent({ kind }: { kind: "intent" | "fit" | "continuity" }) {
  return <>
    {kind === "intent" && <GuidanceTable label="User intent and surface implications" headers={["Intent", "User goal", "Surface"]} rows={intentRows} />}
    {kind === "continuity" && <GuidanceTable label="Context preserved across surfaces" headers={["What travels", "Preserved context"]} rows={continuityRows} />}
    {kind === "fit" && <>
      <div className="mcp-copy"><h3>A. Choose a surface and depth</h3></div>
      <GuidanceTable label="Surface depth" headers={["Surface", "When it fits"]} rows={[
        ["Chat only", "Few items, no issues, a short answer, or a lightweight choice. Keep the experience conversational."],
        ["Chat + detail pane", "Keep the summary in chat; open review, receipts, fields, and selected details in the right-side pane."],
        ["Focused action pane", "Use for a narrow, single-purpose action such as reconcile, unattach, delete, or confirm."],
        ["Workspace", "Use for multi-entity, recoverable, monitored, persistent, or collaborative work."],
      ]} />
      <div className="mcp-copy"><h3>Surface depth overrides</h3><p>Open a deeper surface when the task needs it, even if the item count would normally fit in chat.</p></div>
      <GuidanceTable label="Surface depth overrides" headers={["Task", "Surface decision"]} rows={[
        ["Review / compare / edit / receipts", "Open the pane on request, regardless of count."],
        ["Review issue exists", "Open the pane automatically for missing fields, policy issues, duplicates, or receipt mismatches."],
        ["Stay in chat request", "Keep the pane closed only when there is no issue and the report is not ready for final submission."],
        ["Final submission", "Open the pane for final review and require explicit confirmation before submitting."],
      ]} />
      <div className="mcp-copy"><h3>B. Use data count as the routing trigger</h3></div>
      <GuidanceTable label="Fit routing guidance" headers={["Condition", "Chat behavior", "Pane behavior"]} rows={[
        ["Any count with issue", "Show summary + issue count.", "Open automatically and show why review is required."],
        ["1–3 items", "Show full list in chat.", "Closed by default."],
        ["4–5 items", "Show compact full list in chat.", "Open when requested."],
        ["6–7 items", "Show first five + “+N more”.", "Offer to open pane."],
        ["8+ items", "Show artifact summary card.", "Open automatically for structured review."],
      ]} />
      <div className="mcp-copy"><h3>C. Choose width after surface is selected</h3></div>
      <GuidanceTable label="Content width guidance" headers={["Mode", "Width", "Purpose"]} rows={[
        ["WORK", "720 px", "Review and edit. Room for dense forms, tables, expense rows, titles, metadata, controls, amounts, status, and actions."],
        ["READ", "640 px", "Read and converse. A comfortable measure for Copilot responses, summaries, notifications, documentation, and continuous prose."],
        ["READ + WORK", "460 px", "Read while working. Keep chat readable alongside a detail pane."],
        ["DECIDE", "400 px", "Make one decision. Keep attention on a single approval, deletion, or discard confirmation, not detailed records."],
      ]} />
    </>}
    <McpHandoffPrototype kind={kind} />
  </>;
}
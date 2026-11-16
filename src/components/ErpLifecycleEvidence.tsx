import { Badge, Body1, Caption1, Card, CardHeader, Divider, Subtitle2, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Title2 } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { CheckmarkCircle20Regular, Document20Regular, Lightbulb20Regular } from "@fluentui/react-icons";

const cases = [
  { name: "Case A", result: "Ready for review", cost: "Low" },
  { name: "Case B", result: "Needs your input", cost: "Medium" },
  { name: "Case C", result: "Ready for review", cost: "Low" },
];

function CaseTable() {
  return <Table aria-label="Fictional historical cases"><TableHeader><TableRow><TableHeaderCell>Past task</TableHeaderCell><TableHeaderCell>Simulated outcome</TableHeaderCell><TableHeaderCell>Estimated cost</TableHeaderCell></TableRow></TableHeader><TableBody>{cases.map(item => <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell>{item.result}</TableCell><TableCell>{item.cost}</TableCell></TableRow>)}</TableBody></Table>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="erp-example-metric"><Caption1>{label}</Caption1><Title2>{value}</Title2><Caption1>{note}</Caption1></div>;
}

export default function ErpLifecycleEvidence({ stage }: { stage: string }) {
  return <div className="erp-example fluent-surface-subtle">
    <div className="erp-example-chrome"><span className="mcp-section-index">ERP assistant</span><Badge appearance="tint" color="informative">Fictional example</Badge></div>
    <div className="erp-example-body">
      {stage === "erp-discovery" && <>
        <div className="erp-example-intro"><Caption1>After completing recurring tasks</Caption1><Title2>What’s next?</Title2><Body1>Your recent work may be a good fit for automation.</Body1></div>
        <Card size="large"><CardHeader image={<Lightbulb20Regular />} header={<Subtitle2>Spend less time reviewing routine records</Subtitle2>} description="Based on the type of work you have repeated" /><Body1>An assistant could prepare routine reviews and bring exceptions back to you.</Body1><Divider /><div className="erp-example-pair"><div><Caption1>Why this appeared</Caption1><Body1>You have completed similar reviews.</Body1></div><div><Caption1>Before you decide</Caption1><Body1>Preview outcomes using past tasks.</Body1></div></div></Card>
      </>}
      {stage === "erp-onboarding" && <>
        <div className="erp-example-intro"><Badge appearance="tint" color="brand">Simulation · Not activated</Badge><Title2>Would this work for you?</Title2><Body1>A preview using past tasks, not a promise of future performance.</Body1></div>
        <div className="erp-example-metrics"><Metric label="Potential value" value="Less routine work" note="Estimated from historical tasks" /><Metric label="Your involvement" value="Review exceptions" note="Decisions stay with you" /><Metric label="Expected cost" value="Visible upfront" note="Inspect estimates by case" /></div>
        <Card size="large"><CardHeader header={<Subtitle2>Agree the boundaries</Subtitle2>} /><div className="erp-example-pair"><div><Caption1>Assistant prepares</Caption1><Body1>Routine record reviews</Body1></div><div><Caption1>You decide</Caption1><Body1>Exceptions and final actions</Body1></div></div></Card>
      </>}
      {stage === "erp-confidence" && <>
        <div className="erp-example-intro"><Caption1>Historical-task simulation</Caption1><Title2>Look behind the estimate</Title2></div>
        <div className="erp-example-table"><CaseTable /></div>
        <Card size="large"><CardHeader image={<Document20Regular />} header={<Subtitle2>Case B · A closer look</Subtitle2>} /><div className="erp-example-pair"><div><Caption1>Previous workflow</Caption1><Body1>You gathered the records and reviewed each one.</Body1></div><div><Caption1>Simulated workflow</Caption1><Body1>The assistant prepares the review, but asks you about missing information.</Body1></div></div><Divider /><Body1>Value: less preparation. Trade-off: an additional check and a higher estimated cost.</Body1></Card>
      </>}
      {stage === "erp-monitor" && <>
        <div className="erp-example-intro"><Caption1>After activation</Caption1><Title2>Know what is happening</Title2><Body1>Routine activity stays visible. Exceptions come to you.</Body1></div>
        <div className="erp-example-activity"><Card size="large"><CardHeader header={<Subtitle2>Routine record review</Subtitle2>} action={<Badge appearance="tint" color="success">Running</Badge>} /><Body1>Recent activity: prepared records for review.</Body1><Caption1>Last check: no action needed</Caption1></Card><Card size="large"><CardHeader header={<Subtitle2>Usage needs attention</Subtitle2>} action={<Badge appearance="tint" color="warning">Review</Badge>} /><Body1>Repeated checks may use more capacity than expected.</Body1><Caption1>Forecast only · Check the cause before changing anything</Caption1></Card></div>
      </>}
      {stage === "erp-optimize" && <>
        <div className="erp-example-intro"><Caption1>When an issue appears</Caption1><Title2>Understand the trade-off</Title2></div>
        <Card size="large"><CardHeader header={<Subtitle2>Some checks find no new work</Subtitle2>} /><div className="erp-example-pair"><div><Caption1>What we observed</Caption1><Body1>Repeated checks without new records.</Body1></div><div><Caption1>Why it matters</Caption1><Body1>Those checks still consume capacity.</Body1></div></div><Divider /><Subtitle2>Consider checking when records change</Subtitle2><Body1>This could reduce unnecessary checks. It also changes when the assistant runs.</Body1><div className="erp-example-pair"><div><Caption1>Expected effect</Caption1><Body1>Lower usage, subject to future activity.</Body1></div><div><Caption1>Before applying</Caption1><Body1>Review the new trigger and keep exceptions visible.</Body1></div></div></Card>
      </>}
      {stage === "erp-resolved" && <>
        <div className="erp-example-intro"><Badge appearance="tint" color="success" icon={<CheckmarkCircle20Regular />}>Configuration updated</Badge><Title2>See what changed</Title2><Body1>The assistant now checks when new records arrive.</Body1></div>
        <div className="erp-example-metrics"><Metric label="Trigger" value="Record changes" note="Updated configuration" /><Metric label="Expected usage" value="Lower" note="Revised forecast, not realized savings" /><Metric label="Follow-up" value="Keep watching" note="Confirm the effect through future runs" /></div>
        <Card size="large"><CardHeader header={<Subtitle2>Your oversight continues</Subtitle2>} /><Body1>Activity and exceptions remain visible. The next runs will show whether the change had the intended effect.</Body1></Card>
      </>}
    </div>
  </div>;
}
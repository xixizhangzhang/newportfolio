import { useState } from "react";
import { Badge, Body1, Button, Caption1, Card, CardFooter, CardHeader, Checkbox, Divider, DrawerBody, DrawerHeader, DrawerHeaderTitle, Field, Link, OverlayDrawer, Select, Subtitle2, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Title3, webLightTheme } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { CopilotChat, CopilotMessage, UserMessage } from "@fluentui-copilot/react-copilot-chat";
import { ChatInput } from "@fluentui-copilot/react-chat-input";
import { CopilotProvider } from "@fluentui-copilot/react-provider";
import { Dismiss24Regular, Open20Regular, Sparkle24Regular } from "@fluentui/react-icons";

const contextGroups = [
  ["Selections", "Stated intent · Selected entities · Filters and sorting"],
  ["Work state", "Task state · Draft edits · Unresolved issues"],
  ["Evidence", "Evidence and sources · Previous decisions"],
  ["Return path", "Available next actions"],
];

export default function McpContinuityPrinciple() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true);
  const [filter, setFilter] = useState("Needs attention");
  const [costCenter, setCostCenter] = useState("Sales");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const receiptStatus = <Badge appearance="tint" color={receiptUploaded ? "success" : "warning"}>{receiptUploaded ? "Receipt uploaded" : "Receipt missing"}</Badge>;
  const fields = <div className="intent-demo-stack">
    <Field label="Expense filter"><Select value={filter} onChange={(_, data) => setFilter(data.value)}><option>Needs attention</option><option>All open expenses</option></Select></Field>
    <Checkbox label="Hyatt Regency · $320.00" checked={selected} onChange={(_, data) => setSelected(data.checked === true)} />
    <Field label="Draft cost center"><Select value={costCenter} onChange={(_, data) => setCostCenter(data.value)}><option>Sales</option><option>Marketing</option><option>Operations</option></Select></Field>
    <div role="status">{receiptStatus}</div>
  </div>;
  return <>
    <Table aria-label="Context preserved across surfaces" className="intent-mapping-table"><TableHeader><TableRow><TableHeaderCell>What travels</TableHeaderCell><TableHeaderCell>Preserved context</TableHeaderCell></TableRow></TableHeader><TableBody>{contextGroups.map(([group, details]) => <TableRow key={group}><TableCell>{group}</TableCell><TableCell>{details}</TableCell></TableRow>)}</TableBody></Table>
    <div className="intent-demo">
      <CopilotProvider theme={webLightTheme} mode="canvas">
        <div className="intent-demo-chat" role="region" aria-label="Copilot continuity example"><div className="intent-demo-workspace">
          <div className="intent-demo-header"><Subtitle2>Microsoft 365 Copilot</Subtitle2></div>
          <div className="intent-demo-thread"><CopilotChat aria-label="Continuity conversation"><UserMessage>Help me resolve the missing receipt in my open expenses.</UserMessage><CopilotMessage name="Copilot" avatar={<Sparkle24Regular />} disclaimer={null} content={<div className="intent-demo-response"><Body1>{receiptUploaded ? "The receipt is attached. Your expense is ready for review." : "The hotel expense needs a receipt before it can be reviewed."}</Body1><Card><CardHeader header={<Subtitle2>EXP-1042 · Expense review</Subtitle2>} description={<Caption1>Draft · Amount, highest first</Caption1>} />{fields}<CardFooter><Button icon={<Open20Regular />} onClick={() => setOpen(true)}>Review expense</Button><Link as="button" disabled={receiptUploaded} onClick={() => setReceiptUploaded(true)}>{receiptUploaded ? "Receipt uploaded" : "Upload receipt"}</Link></CardFooter></Card></div>} /></CopilotChat></div>
          <div className="intent-demo-composer"><ChatInput appearance="single" disableSend charactersRemainingMessage={undefined} editor={{ input: { "aria-label": "Message Copilot", contentEditable: false }, placeholderValue: "Message Copilot" }} /><Caption1>AI-generated content may be incorrect</Caption1></div>
        </div></div>
      </CopilotProvider>
      <Caption1>Interactive prototype · Sample data</Caption1>
    </div>
    <OverlayDrawer open={open} onOpenChange={(_, data) => setOpen(data.open)} position="end" size="medium">
      <DrawerHeader><DrawerHeaderTitle action={<Button appearance="subtle" icon={<Dismiss24Regular />} aria-label="Close continuity review" onClick={() => setOpen(false)} />}>EXP-1042 · Expense review</DrawerHeaderTitle></DrawerHeader>
      <DrawerBody><div className="intent-demo-stack">
        <div className="intent-demo-stack"><div className="intent-demo-title-row"><Title3>Hyatt Regency</Title3><Badge appearance="tint" color={submitted ? "success" : "informative"} size="large" shape="circular">{submitted ? "Submitted" : "Draft"}</Badge></div><Body1>Hotel · Seattle business trip</Body1><Title3>$320.00 USD</Title3></div>
        <Divider />
        <Subtitle2>Expense details</Subtitle2>
        <Table aria-label="Expense details" size="small"><TableBody>{[["Expense ID", "EXP-1042"], ["Transaction date", "Oct 12, 2026"], ["Category", "Hotel"], ["Payment method", "Corporate card"], ["Business purpose", "Customer visit · Seattle"]].map(([label, value]) => <TableRow key={label}><TableCell>{label}</TableCell><TableCell>{value}</TableCell></TableRow>)}</TableBody></Table>
        <Divider />
        <Subtitle2>Receipt</Subtitle2>
        <div role="status">{receiptStatus}</div>
        {receiptUploaded ? <div className="intent-demo-stack"><Body1>Hyatt-Regency-receipt.pdf</Body1><Caption1>Attached to EXP-1042 · $320.00 USD</Caption1></div> : <Body1>No receipt attached.</Body1>}
        <Divider />
        <Subtitle2>Review & allocation</Subtitle2>
        <Checkbox label="Hyatt Regency · $320.00" checked={selected} onChange={(_, data) => setSelected(data.checked === true)} />
        <Field label="Draft cost center"><Select value={costCenter} onChange={(_, data) => setCostCenter(data.value)}><option>Sales</option><option>Marketing</option><option>Operations</option></Select></Field>
        <Field label="Expense filter"><Select value={filter} onChange={(_, data) => setFilter(data.value)}><option>Needs attention</option><option>All open expenses</option></Select></Field>
        <Button appearance="primary" disabled={!receiptUploaded || submitted} onClick={() => { if (receiptUploaded) setSubmitted(true); }}>{submitted ? "Submitted" : "Submit"}</Button>
      </div></DrawerBody>
    </OverlayDrawer>
  </>;
}
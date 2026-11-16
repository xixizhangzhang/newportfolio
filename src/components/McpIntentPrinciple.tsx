import { useState } from "react";
import { Badge, Body1, Body1Strong, Button, Caption1, Card, CardFooter, CardHeader, Checkbox, DrawerBody, DrawerHeader, DrawerHeaderTitle, Field, OverlayDrawer, Select, Subtitle2, Tab, TabList, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Title3, Tooltip, webLightTheme } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { CopilotChat, CopilotMessage, UserMessage } from "@fluentui-copilot/react-copilot-chat";
import { ChatInput } from "@fluentui-copilot/react-chat-input";
import { CopilotProvider } from "@fluentui-copilot/react-provider";
import { ArrowUndo20Regular, Chat24Regular, Dismiss24Regular, Open20Regular, Compose20Regular, Sparkle24Regular } from "@fluentui/react-icons";
import "./mcp-intent-principle.css";

const intentMappings = [
  ["Ask / explain", "Understand status or next steps", "Chat"],
  ["Find / navigate", "Locate a record or page", "Chat → pane/page for inspection"],
  ["Summarize / monitor", "See totals, trends, or risks", "Chat card; dashboard for ongoing monitoring"],
  ["Review / validate", "Check fields and evidence", "Pane/page for structured review"],
  ["Compare / decide", "Weigh options", "Side-by-side pane/page"],
  ["Edit / resolve", "Update fields or fix issues", "Pane/form with validation and undo"],
  ["Confirm / submit", "Approve or complete an action", "Evidence + explicit confirmation"],
];

const scenarios = [
  { id: "ask", label: "Ask", prompt: "Why is my expense report still pending?", reply: "Your Bay Area trip report is waiting for a receipt and a cost center. It has not been submitted.", surface: "Chat answer" },
  { id: "find", label: "Find", prompt: "Find my Bay Area trip expense report.", reply: "I found the draft report matching your trip.", surface: "Record card → review pane" },
  { id: "summarize", label: "Summarize", prompt: "Summarize my Bay Area trip expenses.", reply: "Here is a compact overview of your report.", surface: "Summary card" },
  { id: "review", label: "Review", prompt: "Review my Bay Area trip expenses for issues.", reply: "Two items need attention. Open the review pane to inspect the records and evidence.", surface: "Issue card → structured review" },
  { id: "compare", label: "Compare", prompt: "Compare the two hotel expenses in this report.", reply: "These entries have the same amount but different dates. Check the receipts before treating them as duplicates.", surface: "Side-by-side comparison" },
  { id: "edit", label: "Edit", prompt: "Set the cost center to Marketing for my trip report.", reply: "You can update the draft below. Saving this change does not submit the report.", surface: "Editable draft with undo" },
  { id: "confirm", label: "Confirm", prompt: "Submit my Bay Area trip expense report.", reply: "Review the report and unresolved issues before confirming. The report remains a draft.", surface: "Evidence + explicit confirmation" },
];

export default function McpIntentPrinciple() {
  const [intent, setIntent] = useState("ask");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [costCenter, setCostCenter] = useState("Marketing");
  const [saved, setSaved] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const scenario = scenarios.find(item => item.id === intent) ?? scenarios[0];
  const switchIntent = (id: string) => { setIntent(id); setSaved(false); setConfirmed(false); setReviewOpen(false); };
  const reportHeader = <CardHeader header={<Subtitle2>Bay Area trip</Subtitle2>} description={<Caption1>EXP-1042 · Draft · 4 expenses · USD 842.00</Caption1>} />;
  const evidence = <div className="intent-demo-stack"><Body1Strong>Items needing attention</Body1Strong><Body1>Hotel · USD 320.00 — receipt missing</Body1><Body1>Taxi · USD 42.00 — cost center missing</Body1></div>;
  return <>
    <Table aria-label="User intent and surface implications" className="intent-mapping-table"><TableHeader><TableRow><TableHeaderCell>Intent</TableHeaderCell><TableHeaderCell>User goal</TableHeaderCell><TableHeaderCell>Surface</TableHeaderCell></TableRow></TableHeader><TableBody>{intentMappings.map(([name, task, surface]) => <TableRow key={name}><TableCell>{name}</TableCell><TableCell>{task}</TableCell><TableCell>{surface}</TableCell></TableRow>)}</TableBody></Table>
    <div className="intent-demo">
      <div className="intent-demo-tabs"><TabList selectedValue={intent} onTabSelect={(_, data) => switchIntent(String(data.value))} aria-label="Intent examples">
        {scenarios.map(item => <Tab key={item.id} value={item.id}>{item.label}</Tab>)}
      </TabList></div>
      <CopilotProvider theme={webLightTheme} mode="canvas">
      <div className="intent-demo-chat" role="region" aria-label="Copilot intent example">
        <aside className="intent-demo-rail" aria-label="Conversation navigation"><Chat24Regular /><Tooltip content="New conversation" relationship="label"><Button appearance="subtle" icon={<Compose20Regular />} onClick={() => switchIntent("ask")} /></Tooltip></aside>
        <div className="intent-demo-workspace">
        <div className="intent-demo-header"><Subtitle2>Microsoft 365 Copilot</Subtitle2><Badge appearance="outline" color="subtle">Work</Badge></div>
        <div className="intent-demo-thread">
        <CopilotChat aria-label="Expense report conversation">
        <UserMessage key={`${intent}-user`}>{scenario.prompt}</UserMessage>
        <CopilotMessage key={intent} avatar={<Sparkle24Regular />} name="Copilot" disclaimer={null} content={<div className="intent-demo-response" aria-live="polite">
          <Body1>{scenario.reply}</Body1>
          {intent === "ask" && <Caption1>Source: Bay Area trip · Draft status and required fields</Caption1>}
          {intent === "find" && <Card>{reportHeader}<CardFooter><Button icon={<Open20Regular />} onClick={() => setReviewOpen(true)}>Open report</Button></CardFooter></Card>}
          {intent === "summarize" && <Card>{reportHeader}<div className="intent-demo-metrics"><div><Caption1>Total</Caption1><Title3>USD 842</Title3></div><div><Caption1>Expenses</Caption1><Title3>4</Title3></div><div><Caption1>Needs attention</Caption1><Title3>2</Title3></div></div><CardFooter><Button onClick={() => switchIntent("review")}>Review issues</Button></CardFooter></Card>}
          {intent === "review" && <Card>{reportHeader}{evidence}<CardFooter><Button icon={<Open20Regular />} onClick={() => setReviewOpen(true)}>Review records and evidence</Button></CardFooter></Card>}
          {intent === "compare" && <div className="intent-demo-comparison">{["Nov 1", "Nov 2"].map((date, i) => <Card key={date}><CardHeader header={<Subtitle2>Hotel {i + 1}</Subtitle2>} description={<Caption1>{date} · USD 320.00</Caption1>} /><Body1>Harbor Hotel</Body1><Badge appearance="tint" color={i === 0 ? "warning" : "success"}>{i === 0 ? "Receipt missing" : "Receipt attached"}</Badge><Button onClick={() => setReviewOpen(true)}>Inspect evidence</Button></Card>)}</div>}
          {intent === "edit" && <Card>{reportHeader}<Field label="Cost center"><Select value={costCenter} onChange={(_, data) => { setCostCenter(data.value); setSaved(false); }}><option>Marketing</option><option>Operations</option><option>Finance</option></Select></Field><CardFooter><Button onClick={() => { setCostCenter("Marketing"); setSaved(false); }} icon={<ArrowUndo20Regular />}>Undo</Button><Button appearance="primary" onClick={() => setSaved(true)}>Save draft</Button></CardFooter>{saved && <Body1 role="status">Draft updated to {costCenter}. Not submitted.</Body1>}</Card>}
          {intent === "confirm" && <Card>{reportHeader}{evidence}<Checkbox label="I have reviewed the report and its unresolved issues" checked={confirmed} onChange={(_, data) => setConfirmed(data.checked === true)} /><CardFooter><Button disabled={!confirmed} onClick={() => setReviewOpen(true)}>Continue to final review</Button></CardFooter></Card>}
        </div>} />
        </CopilotChat>
        </div>
        <div className="intent-demo-composer"><ChatInput appearance="single" disableSend charactersRemainingMessage={undefined} editor={{ input: { "aria-label": "Message Copilot", contentEditable: false }, placeholderValue: "Message Copilot" }} /><Caption1>AI-generated content may be incorrect</Caption1></div>
        </div>
      </div>
      </CopilotProvider>
      <Caption1>Interactive prototype · Sample data</Caption1>
    </div>
    <OverlayDrawer open={reviewOpen} onOpenChange={(_, data) => setReviewOpen(data.open)} position="end" size="medium">
      <DrawerHeader><DrawerHeaderTitle action={<Button appearance="subtle" icon={<Dismiss24Regular />} aria-label="Close review" onClick={() => setReviewOpen(false)} />}>Bay Area trip · Review</DrawerHeaderTitle></DrawerHeader>
      <DrawerBody><div className="intent-demo-stack">{evidence}<Table aria-label="Expense review records"><TableHeader><TableRow><TableHeaderCell>Expense</TableHeaderCell><TableHeaderCell>Amount</TableHeaderCell><TableHeaderCell>Evidence</TableHeaderCell></TableRow></TableHeader><TableBody><TableRow><TableCell>Hotel</TableCell><TableCell>USD 320</TableCell><TableCell>Receipt missing</TableCell></TableRow><TableRow><TableCell>Taxi</TableCell><TableCell>USD 42</TableCell><TableCell>Cost center missing</TableCell></TableRow></TableBody></Table><Button onClick={() => { setReviewOpen(false); switchIntent("edit"); }}>Edit draft</Button></div></DrawerBody>
    </OverlayDrawer>
  </>;
}

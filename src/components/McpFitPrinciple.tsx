import { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel, Badge, Body1, Button, Caption1, Card, CardHeader, CardFooter, DrawerBody, DrawerHeader, DrawerHeaderTitle, OverlayDrawer, Subtitle2, Tab, TabList, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Title3, webLightTheme } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { CopilotChat, CopilotMessage, UserMessage } from "@fluentui-copilot/react-copilot-chat";
import { CopilotProvider } from "@fluentui-copilot/react-provider";
import { ArrowRight20Regular, Dismiss24Regular, Document20Regular, ChevronRight20Regular, Sparkle24Regular } from "@fluentui/react-icons";
import { expenseFields, fitRoute } from "@/lib/mcp-fit";
import "./mcp-fit-principle.css";

const examples = [
  { label: "3 items", count: 3, issue: false },
  { label: "5 items", count: 5, issue: false },
  { label: "6+ items", count: 7, issue: false },
  { label: "With issue", count: 3, issue: true },
];
const expenses = [
  { name: "Hotel", date: "Oct 22, 2026", merchant: "Hyatt Regency", category: "Lodging", amount: "USD 320", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Taxi", date: "Oct 22, 2026", merchant: "Uber", category: "Transportation", amount: "USD 42", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Lunch", date: "Oct 23, 2026", merchant: "Sweetgreen", category: "Meals", amount: "USD 28", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Train", date: "Oct 23, 2026", merchant: "Amtrak", category: "Transportation", amount: "USD 18", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Dinner", date: "Oct 23, 2026", merchant: "The Grove", category: "Meals", amount: "USD 46", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Parking", date: "Oct 24, 2026", merchant: "City Parking", category: "Transportation", amount: "USD 12", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Flight", date: "Oct 24, 2026", merchant: "United Airlines", category: "Airfare", amount: "USD 350", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
  { name: "Breakfast", date: "Oct 24, 2026", merchant: "Blue Bottle", category: "Meals", amount: "USD 26", costCenter: "Sales · 4100", status: "Open", receipt: "Attached" },
];
const fieldLabels = { date: "Date", merchant: "Merchant", category: "Category", amount: "Amount", costCenter: "Cost center", status: "Status", receipt: "Receipt" };
const rules = [
  ["1–3 items", "Full list with key dimensions", "Closed by default"],
  ["4–5 items", "Compact list with key dimensions", "Full list in panel on request"],
  ["6+ items", "Compact first five + remaining count", "Full list in panel on request"],
  ["Any issue", "One-sentence issue response", "Full list in panel on request"],
];
export default function McpFitPrinciple() {
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  const example = examples[selected];
  const route = fitRoute(example.count, example.issue, "find");
  const records = expenses.slice(0, example.count).map((row, i) => ({ ...row, receipt: example.issue && i === 0 ? "Missing" : row.receipt }));
  const visibleRecords = records.slice(0, route.visibleCount);
  const total = records.reduce((sum, row) => sum + Number(row.amount.replace("USD ", "")), 0);
  const currency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  return <div className="fit-examples">
    <Table aria-label="Fit routing guidance" className="fit-rule-table"><TableHeader><TableRow><TableHeaderCell>Density</TableHeaderCell><TableHeaderCell>In chat</TableHeaderCell><TableHeaderCell>Depth</TableHeaderCell></TableRow></TableHeader><TableBody>{rules.map(row => <TableRow key={row[0]}>{row.map(cell => <TableCell key={cell}>{cell}</TableCell>)}</TableRow>)}</TableBody></Table>
    <Body1>Evidence, editing, or final submission overrides count. Even one record can need a deeper surface.</Body1>
    <div className="intent-demo">
    <div className="intent-demo-tabs"><TabList aria-label="Fit examples" selectedValue={selected} onTabSelect={(_, data) => { const next = Number(data.value); setSelected(next); setOpened(fitRoute(examples[next].count, examples[next].issue, "find").pane); }}>{examples.map((item, i) => <Tab key={item.label} value={i}>{item.label}</Tab>)}</TabList></div>
    <CopilotProvider theme={webLightTheme} mode="canvas">
      <div className="fit-canvas" role="region" aria-label="Copilot Fit example">
        <div className="fit-chat"><Subtitle2>Microsoft 365 Copilot</Subtitle2>
          <CopilotChat aria-label="Fit conversation"><UserMessage>Find open expenses</UserMessage><CopilotMessage avatar={<Sparkle24Regular />} name="Copilot" disclaimer={null} content={example.issue || route.pane ? <div className="fit-issue-response"><Body1>{example.issue ? `I found ${example.count} open expenses with one missing receipt.` : `I found ${example.count} open expenses and opened the full list for you.`}</Body1>{example.issue && <Card>
            <CardHeader header={<Subtitle2>Open expenses</Subtitle2>} action={<Badge appearance="tint" color="warning">1 issue</Badge>} />
            <div className="fit-entry-summary"><Document20Regular /><div><Subtitle2>EXP-1042 · USMF</Subtitle2><div><Caption1>{example.count} expenses · {currency(total)}</Caption1></div><Caption1>Oct 22–23, 2026 · 1 missing receipt</Caption1></div></div>
            <CardFooter><Button appearance="primary" icon={<ArrowRight20Regular />} iconPosition="after" onClick={() => setOpened(true)}>View expenses</Button></CardFooter>
          </Card>}</div> : <Card>
            <CardHeader header={<div className="fit-report-title"><Title3>Expense report</Title3><span className="fit-report-status">Open</span></div>} description={<Body1>Review expense report details before opening in the host system.</Body1>} />
            <dl className="fit-report-metadata">{[["Approver", "Not assigned"], ["Report number", "EXP-1042"], ["Created on", "Oct 24, 2026"], ["Company", "USMF"]].map(([label, value]) => <div key={label}><dt><Body1>{label}</Body1></dt><dd><Subtitle2>{value}</Subtitle2></dd></div>)}</dl>
            <Accordion collapsible defaultOpenItems={["expenses"]}>
              <AccordionItem value="expenses">
                <AccordionHeader expandIconPosition="start"><div className="fit-report-total"><Subtitle2>{example.count} expenses</Subtitle2><Subtitle2>{currency(total)}</Subtitle2></div></AccordionHeader>
                <AccordionPanel><div className="fit-expense-list">{visibleRecords.map(row => <div className="fit-expense-item" key={row.name}>
                  <div className="fit-expense-row"><div className="fit-expense-merchant"><Subtitle2>{row.merchant}</Subtitle2><Body1>{row.category} · {row.date}</Body1></div><Subtitle2>{currency(Number(row.amount.replace("USD ", "")))}</Subtitle2>{example.count >= 4 && <Button appearance="subtle" icon={<ChevronRight20Regular />} aria-label={`View ${row.merchant} details`} onClick={() => setOpened(true)} />}</div>
                </div>)}</div>
                {route.more > 0 && <Button appearance="subtle" onClick={() => setOpened(true)}>+{route.more} more</Button>}
                {example.count >= 4 && route.more === 0 && <Button onClick={() => setOpened(true)}>Open details</Button>}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Card>} /></CopilotChat>
        </div>
      </div>
    </CopilotProvider>
    <Caption1>Interactive prototype · Sample data</Caption1>
    </div>
    <OverlayDrawer open={opened} onOpenChange={(_, data) => setOpened(data.open)} position="end" size="large">
      <DrawerHeader><DrawerHeaderTitle action={<Button appearance="subtle" icon={<Dismiss24Regular />} aria-label="Close expenses" onClick={() => setOpened(false)} />}>Open expenses</DrawerHeaderTitle></DrawerHeader>
      <DrawerBody><div className="fit-drawer-content" role="region" aria-label="Fit detail pane">
          <Caption1>{example.count} expenses · {example.issue ? "1 missing receipt" : "No issues"}</Caption1>
          <Table size="small" aria-label="Open expenses" className="fit-expense-table">
            <TableHeader><TableRow>{expenseFields(example.count, "panel").map(field => <TableHeaderCell key={field}>{fieldLabels[field]}</TableHeaderCell>)}</TableRow></TableHeader>
            <TableBody>{records.map(row => <TableRow key={row.name}>{expenseFields(example.count, "panel").map(field => <TableCell key={field}>{field === "receipt" && row.receipt === "Missing" ? <Badge appearance="ghost" color="warning">Missing</Badge> : field === "amount" ? currency(Number(row.amount.replace("USD ", ""))) : row[field]}</TableCell>)}</TableRow>)}</TableBody>
          </Table>
        </div></DrawerBody>
    </OverlayDrawer>
  </div>;
}

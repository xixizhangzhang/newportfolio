import { useState } from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Avatar, Badge, Body1, Button, Card, CardFooter, CardHeader, CardPreview, Caption1, Checkbox, Display, Field, Input, Radio, RadioGroup, Subtitle2, Title1, Title3 } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { Apps20Regular, ArrowTrending20Regular, CheckmarkCircle20Regular, Clock20Regular, Grid20Regular } from "@fluentui/react-icons";
import hotelPhoto from "@/assets/expense-hotel-waterfront.jpg";
import "./mcp-building-blocks.css";

const records = [
  { merchant: "Seattle Marriott Waterfront", category: "Hotel", amount: "$2,650.00" },
  { merchant: "Delta Air Lines · SEA → JFK", category: "Airfare", amount: "$648.20" },
  { merchant: "Uber · JFK → Manhattan", category: "Ground", amount: "$78.40" },
];

export default function McpBuildingBlocks() {
  const [selected, setSelected] = useState<"components" | "patterns">("components");
  const [chosen, setChosen] = useState<string[]>([records[0].merchant]);
  const [allocation, setAllocation] = useState("project");
  const [project, setProject] = useState("Customer visit");
  const [draft, setDraft] = useState("Client dinner");
  const [saved, setSaved] = useState(false);
  const [tasks, setTasks] = useState<string[]>(["Attach receipts"]);
  return <div className="building-block-explorer">
    <div className="building-block-choices" aria-label="Building-block examples">
      <Card className="building-block-choice" appearance="outline" selected={selected === "components"} onClick={() => setSelected("components")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected("components"); } }} role="button" aria-label="Components" aria-pressed={selected === "components"} tabIndex={0} focusMode="off" size="medium">
        <CardHeader image={<Grid20Regular />} header={<Subtitle2>Components</Subtitle2>} />
        <Body1>Reusable elements with defined properties, states, and actions.</Body1>
      </Card>
      <Card className="building-block-choice" appearance="outline" selected={selected === "patterns"} onClick={() => setSelected("patterns")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected("patterns"); } }} role="button" aria-label="Patterns" aria-pressed={selected === "patterns"} tabIndex={0} focusMode="off" size="medium">
        <CardHeader image={<Apps20Regular />} header={<Subtitle2>Patterns</Subtitle2>} />
        <Body1>Composition recipes for recurring business interactions.</Body1>
      </Card>
    </div>
    <div className="building-block-example" role="region" aria-label={selected === "components" ? "Component example" : "Pattern example"}>
      {selected === "components" ? <>
        <div className="building-block-collage building-block-components">
          <div className="block-component-header"><CardHeader image={<Avatar name="Derek Kruger" color="colorful" size={48} />} header={<Title3>Travel expenses</Title3>} description={<Caption1>Derek Kruger · USMF</Caption1>} action={<Badge appearance="tint" color="success">Open</Badge>} /></div>
          <div className="block-component-metric"><Caption1>Report total · USD</Caption1><div className="block-metric-value" aria-label="$3,376.60"><Display>3,376</Display><Title3>.60</Title3></div><Caption1>3 expenses</Caption1></div>
          <div className="block-component-card"><Card><CardHeader header={<Title3>To do</Title3>} description={<Caption1>{tasks.length} of 3 completed</Caption1>} />{["Attach receipts", "Check allocation", "Send for approval"].map(task => <Checkbox key={task} label={task} checked={tasks.includes(task)} onChange={(_, data) => setTasks(current => data.checked ? [...current, task] : current.filter(item => item !== task))} />)}</Card></div>
          <div className="block-component-chart"><Caption1>Spending mix</Caption1><div className="block-donut"><svg viewBox="0 0 160 160" role="img" aria-label="Spending mix: Hotel 78 percent, Airfare 19 percent, Ground 3 percent"><circle className="block-donut-track" cx="80" cy="80" r="60" /><circle className="block-donut-hotel" cx="80" cy="80" r="60" pathLength="100" strokeDasharray="76 24" transform="rotate(-90 80 80)" /><circle className="block-donut-airfare" cx="80" cy="80" r="60" pathLength="100" strokeDasharray="17 83" strokeDashoffset="-79" transform="rotate(-90 80 80)" /><circle className="block-donut-ground" cx="80" cy="80" r="60" pathLength="100" strokeDasharray="2 98" strokeDashoffset="-98" transform="rotate(-90 80 80)" /></svg><div className="block-donut-label"><Title1>78%</Title1><Caption1>Hotel</Caption1></div></div><div className="block-chart-legend"><span><i className="block-legend-hotel" />Hotel</span><span><i className="block-legend-airfare" />Airfare</span><span><i className="block-legend-ground" />Ground</span></div></div>
          <div className="block-component-timeline"><Subtitle2>Activity</Subtitle2><ol className="block-timeline">{[{ title: "Report created", time: "9:00 AM", done: true }, { title: "Receipt attached", time: "9:24 AM", done: true }, { title: "Ready for review", time: "Up next", done: false }].map(step => <li key={step.title}><span className={step.done ? "block-timeline-done" : "block-timeline-next"}>{step.done ? <CheckmarkCircle20Regular /> : <Clock20Regular />}</span><div><Subtitle2>{step.title}</Subtitle2><Caption1>{step.time}</Caption1></div></li>)}</ol></div>
          <div className="block-component-grid"><div className="block-mini-grid">{[["Company", "USMF"], ["Currency", "USD"], ["Approver", "Derek Kruger"], ["Report", "000123"]].map(([label, value]) => <div key={label}><Caption1>{label}</Caption1><Subtitle2>{value}</Subtitle2></div>)}</div></div>
          <div className="block-component-trend"><Badge appearance="tint" color="success" icon={<ArrowTrending20Regular />}>12.4%</Badge><Caption1>vs. last month</Caption1></div>
          <div className="block-component-list">{records.slice(1).map(record => <div className="building-block-row" key={record.merchant}><div className="building-block-merchant"><Subtitle2>{record.category}</Subtitle2><Caption1>{record.merchant.split(" · ")[0]}</Caption1></div><Subtitle2>{record.amount}</Subtitle2></div>)}</div>
          <div className="block-component-footer"><CardFooter><Caption1>3 expenses</Caption1><Subtitle2>$3,376.60</Subtitle2><Badge appearance="tint" color="brand">Ready for review</Badge></CardFooter></div>
        </div>
      </> : <>
        <div className="building-block-collage building-block-patterns">
          <div className="block-pattern-selection"><Card><CardHeader header={<Subtitle2>Select expenses</Subtitle2>} description={<Caption1>{chosen.length} selected</Caption1>} />{records.map(record => <Checkbox key={record.merchant} label={`${record.merchant.split(" · ")[0]} · ${record.amount}`} checked={chosen.includes(record.merchant)} onChange={(_, data) => setChosen(current => data.checked ? [...current, record.merchant] : current.filter(name => name !== record.merchant))} />)}</Card></div>
          <div className="block-pattern-choice"><Card><CardHeader header={<Subtitle2>Allocate this expense</Subtitle2>} /><Field label="Charge to"><RadioGroup value={allocation} onChange={(_, data) => setAllocation(data.value)}><Radio value="project" label="Project" /><Radio value="department" label="Department" /></RadioGroup></Field><Field label={allocation === "project" ? "Project name" : "Department name"}><Input value={project} onChange={(_, data) => setProject(data.value)} /></Field></Card></div>
          <div className="block-pattern-record"><Card size="large">
          <CardHeader image={<Avatar name="Derek Kruger" color="colorful" size={40} />} header={<Subtitle2>Expense report</Subtitle2>} action={<Badge appearance="outline" color="brand">Submitted</Badge>} />
          <dl className="building-block-metadata">{[["Approver", "Derek Kruger"], ["Report number", "000123"], ["Submitted on", "6/24/2026"], ["Company", "USMF"]].map(([label, value]) => <div key={label}><dt><Caption1>{label}</Caption1></dt><dd><Subtitle2>{value}</Subtitle2></dd></div>)}</dl>
          <Accordion collapsible defaultOpenItems={["lines"]}><AccordionItem value="lines"><AccordionHeader expandIconPosition="start"><div className="building-block-summary"><Subtitle2>3 expenses</Subtitle2><Subtitle2>$3,376.60</Subtitle2></div></AccordionHeader><AccordionPanel>{records.map(record => <div className="building-block-row" key={record.merchant}><div className="building-block-merchant"><Subtitle2>{record.merchant}</Subtitle2><Body1>{record.category} · 6/24/2026</Body1></div><Subtitle2>{record.amount}</Subtitle2></div>)}</AccordionPanel></AccordionItem></Accordion>
        </Card></div>
          <div className="block-pattern-edit"><Card><CardHeader header={<Subtitle2>Expense details</Subtitle2>} action={<Badge appearance="tint" color={saved ? "success" : "subtle"}>{saved ? "Saved" : "Draft"}</Badge>} /><Field label="Description"><Input value={draft} onChange={(_, data) => { setDraft(data.value); setSaved(false); }} /></Field><Body1>Meals · $186.40</Body1><CardFooter><Button onClick={() => { setDraft("Client dinner"); setSaved(false); }}>Undo</Button><Button appearance="primary" onClick={() => setSaved(true)}>Save draft</Button></CardFooter></Card></div>
          <div className="block-pattern-insight"><Card><CardPreview><img className="block-hotel-photo" src={hotelPhoto} alt="Waterfront hotel beside Puget Sound" width={1024} height={768} loading="lazy" /></CardPreview><CardHeader header={<Subtitle2>Travel spending</Subtitle2>} action={<Badge appearance="tint" color="success" icon={<ArrowTrending20Regular />}>12.4%</Badge>} /><Title1>$3,376.60</Title1><Body1>Hotel expenses account for most of this report.</Body1><Caption1>Source · Report 000123</Caption1></Card></div>
        </div>
      </>}
    </div>
  </div>;
}
import { useEffect, useState } from "react";
import { Badge, Body1, Button, Caption1, Spinner, Subtitle2, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowDownload20Regular, ArrowClockwise20Regular, Share20Regular, Search20Regular } from "@fluentui/react-icons";
import { affectedProductBatches, affectedProductsCsv, mergeAffectedProducts, type AffectedProduct } from "@/content/traceability-impact";

export default function TraceabilityImpactEvidence({ completed = false }: { completed?: boolean }) {
  const [items, setItems] = useState<AffectedProduct[]>(completed ? affectedProductBatches.flat() : []);
  const [batch, setBatch] = useState(completed ? affectedProductBatches.length : 0);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState("");
  const done = batch === affectedProductBatches.length;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      const incoming = affectedProductBatches[batch];
      if (!incoming) { setRunning(false); return; }
      setItems(current => mergeAffectedProducts(current, incoming));
      setBatch(batch + 1);
      if (batch + 1 === affectedProductBatches.length) setRunning(false);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [batch, running]);

  function start() { setItems([]); setBatch(0); setFeedback(""); setRunning(true); }
  function download() {
    const url = URL.createObjectURL(new Blob([affectedProductsCsv(items)], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "affected-products-sample.csv"; link.click(); URL.revokeObjectURL(url);
    setFeedback("Sample results downloaded.");
  }
  async function share() {
    try { await navigator.clipboard.writeText(`Illustrative recall investigation · Brake lever BL-204\n${affectedProductsCsv(items)}`); setFeedback("Sample results copied for sharing."); }
    catch { setFeedback("Sharing is unavailable here. Download the results instead."); }
  }

  return <figure className="traceability-final-evidence">
    <div className="traceability-impact fluent-surface-subtle">
      <div className="traceability-evidence-heading"><div className="traceability-impact-heading"><Subtitle2>Affected finished products</Subtitle2><Caption1>Suspect component · Brake lever BL-204</Caption1></div><Badge appearance="outline" color="informative">{done ? "Search complete" : running ? "Searching" : "Ready to trace"}</Badge></div>
      <div className="traceability-impact-status" role="status" aria-live="polite">
        {running && <Spinner size="tiny" />}
        <Body1>{done ? `${items.length} affected products found` : running ? `${items.length} affected products found so far · Still searching` : "Find finished products across all relationship levels"}</Body1>
        {running && <Caption1>Partial results—not the final affected total.</Caption1>}
      </div>
      <div className="traceability-impact-actions">
        {!completed && <Button appearance="primary" icon={done ? <ArrowClockwise20Regular /> : <Search20Regular />} disabled={running} onClick={start}>{done ? "Trace again" : "Find affected products"}</Button>}
        <Button icon={<ArrowDownload20Regular />} disabled={!done} onClick={download}>Download</Button>
        <Button icon={<Share20Regular />} disabled={!done} onClick={share}>Share</Button>
      </div>
      {items.length > 0 && <div className="traceability-impact-table"><Table size="small" aria-label="Affected finished products and customers"><TableHeader><TableRow>{["Product", "Batch", "Customer", "Status"].map(label => <TableHeaderCell key={label}>{label}</TableHeaderCell>)}</TableRow></TableHeader><TableBody>{items.map(item => <TableRow key={item.id}><TableCell><div className="traceability-impact-heading"><Body1>{item.product}</Body1><Caption1>{item.id}</Caption1></div></TableCell><TableCell>{item.batch}</TableCell><TableCell>{item.customer}</TableCell><TableCell>{item.status}</TableCell></TableRow>)}</TableBody></Table></div>}
      {feedback && <Caption1 role="status">{feedback}</Caption1>}
    </div>
    <figcaption><Caption1>Illustrative prototype · fictional products, customers and loading counts; not measured search performance.</Caption1></figcaption>
  </figure>;
}
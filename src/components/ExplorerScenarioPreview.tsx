import { useEffect, useState } from "react";
import { makeStyles, mergeClasses, tokens } from "@/design-system/ms-fluent-for-bic-65f6c6";
import expensesImgAsset from "@/assets/explorer/erp-expenses.png.asset.json";
import reportImgAsset from "@/assets/explorer/erp-report.png.asset.json";
import receiptImgAsset from "@/assets/explorer/erp-receipt.png.asset.json";
import cashImgAsset from "@/assets/explorer/erp-cash.png.asset.json";
import expenseDetail from "@/assets/explorer/expense-detail.png.asset.json";
import expenseSummary from "@/assets/explorer/expense-summary.png.asset.json";
import approvalOverview from "@/assets/explorer/approval-overview.png.asset.json";
import reportStatus from "@/assets/explorer/report-status.png.asset.json";

const expensesImg = expensesImgAsset.url;
const reportImg = reportImgAsset.url;
const receiptImg = receiptImgAsset.url;
const cashImg = cashImgAsset.url;

const useStyles = makeStyles({
  root: {
    position: "relative", aspectRatio: "16 / 10", overflow: "hidden",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1, boxShadow: tokens.shadow4,
  },
  layer: {
    position: "absolute", inset: 0, display: "grid",
    gridTemplateColumns: "1.1fr 1fr 0.9fr", gridTemplateRows: "1fr 0.6fr 0.8fr",
    gap: tokens.spacingHorizontalXXS, pointerEvents: "none",
  },
  tile: { minWidth: 0, minHeight: 0, overflow: "hidden" },
  first: { gridColumn: "1", gridRow: "1 / 3" },
  second: { gridColumn: "2", gridRow: "1" },
  third: { gridColumn: "3", gridRow: "1 / 3" },
  fourth: { gridColumn: "1", gridRow: "3" },
  fifth: { gridColumn: "2", gridRow: "2 / 4" },
  sixth: { gridColumn: "3", gridRow: "3" },
  image: { display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" },
  prompt: {
    display: "flex", alignItems: "flex-end", padding: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase200, lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold, overflowWrap: "anywhere",
  },
  reveal: {
    animationName: { from: { opacity: 0 }, to: { opacity: 1 } },
    animationDuration: tokens.durationSlower, animationTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": { animationName: "none" },
  },
});

type Piece = { kind: "ui"; src: string; label: string } | { kind: "prompt"; text: string };
const slots: { rest: Piece; next: Piece }[] = [
  { rest: { kind: "ui", src: reportImg, label: "Expense report" }, next: { kind: "ui", src: expenseDetail.url, label: "Expense details" } },
  { rest: { kind: "ui", src: cashImg, label: "Cash position" }, next: { kind: "prompt", text: "Show cash runway for the next 90 days" } },
  { rest: { kind: "prompt", text: "Create an expense report for my Seattle trip" }, next: { kind: "ui", src: approvalOverview.url, label: "Approval overview" } },
  { rest: { kind: "prompt", text: "Which receipts are still missing?" }, next: { kind: "ui", src: expenseSummary.url, label: "Expense summary" } },
  { rest: { kind: "ui", src: receiptImg, label: "Receipt" }, next: { kind: "prompt", text: "Submit report 000123 to Derek for approval" } },
  { rest: { kind: "ui", src: expensesImg, label: "Your expenses" }, next: { kind: "ui", src: reportStatus.url, label: "Report statuses" } },
];
const swapOrder = [2, 0, 1, 5, 4, 3];

export default function ExplorerScenarioPreview({ active = false }: { active?: boolean }) {
  const s = useStyles();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStage(0); return; }
    const timer = window.setInterval(() => setStage((n) => Math.min(n + 1, swapOrder.length)), 550);
    return () => window.clearInterval(timer);
  }, [active]);
  const cells = [s.first, s.second, s.third, s.fourth, s.fifth, s.sixth];
  const swapped = new Set(swapOrder.slice(0, stage));
  return <div className={s.root} aria-label="ERP screenshot and prompt collage">
    {(["ui", "prompt"] as const).map((layer) => <div key={layer} className={s.layer} aria-label={layer === "ui" ? "UI layer" : "Prompt layer"}>
      {slots.map((slot, i) => {
        const active = swapped.has(i);
        const piece = active ? slot.next : slot.rest;
        if (piece.kind !== layer) return null;
        return <div key={`${i}-${active}`} className={mergeClasses(s.tile, cells[i], s.reveal, piece.kind === "prompt" && s.prompt)}>
          {piece.kind === "ui" ? <img src={piece.src} alt={piece.label} className={s.image} /> : <span>“{piece.text}”</span>}
        </div>;
      })}
    </div>)}
  </div>;
}

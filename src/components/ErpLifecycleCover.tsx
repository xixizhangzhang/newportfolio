import { useId } from "react";
import "./erp-lifecycle-cover.css";

/** One lightweight workbench shared by the portfolio and project opening. */
export default function ErpLifecycleCover() {
  const id = useId();
  return <svg className="erp-lifecycle-cover" viewBox="0 0 1000 640" role="img" aria-labelledby={id}>
    <title id={id}>Set up automation, inspect a preview, and balance value and cost.</title>

    {/* Settings: only two controls, with no miniature interface chrome. */}
    <g transform="translate(115 280)">
      <path d="M0 20H140 M0 85H140" className="lc-line" />
      <g className="lc-setting-toggle"><circle cx="95" cy="20" r="12" className="lc-paper" /></g>
      <circle cx="40" cy="85" r="12" className="lc-paper" />
    </g>
    <path d="M300 335H365 M353 323L365 335L353 347" className="lc-line" />

    {/* A flat evidence sheet replaces the 3D chamber and magnifying internals. */}
    <g transform="translate(415 250)">
      <rect width="150" height="175" className="lc-paper" />
      <path d="M28 40H100 M28 75H80 M28 110H100 M28 145H65" className="lc-muted-line" />
      <g className="lc-inspection">
        <circle cx="130" cy="105" r="34" className="lc-lens" />
        <path d="M154 129L183 158" className="lc-line" />
      </g>
    </g>
    <path d="M635 335H700 M688 323L700 335L688 347" className="lc-line" />

    {/* Value and cost remain the two sides of a simple balance. */}
    <g transform="translate(815 285)">
      <path d="M0 0V130 M-30 130H30" className="lc-line" />
      <g className="lc-balance">
        <path d="M-70 0H70 M-65 0V50 M65 0V50 M-87 50Q-65 80 -43 50 M43 50Q65 80 87 50" className="lc-line" />
      </g>
      <circle r="6" className="lc-ink" />
    </g>

  </svg>;
}

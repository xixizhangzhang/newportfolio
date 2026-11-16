import "./mcp-surface-diagram.css";

export default function McpParadigmDiagram() {
  return <svg className="mcp-surface-diagram" viewBox="0 0 1100 740" role="img" aria-labelledby="paradigm-title paradigm-description">
    <title id="paradigm-title">From predetermined to agentic experiences.</title>
    <desc id="paradigm-description">A predefined screen and flow contrasts with user intent and context shaping a summary, review pane or worklist.</desc>
    <text className="surface-heading" x="550" y="92" textAnchor="middle">From predetermined.</text>
    <text className="surface-heading surface-bold" x="550" y="142" textAnchor="middle">To agentic experiences.</text>

    <text className="surface-label" x="263" y="222" textAnchor="middle">Predetermined</text>
    <g transform="translate(88 266)">
      <rect className="surface-panel" width="350" height="244" />
      <circle className="surface-window-dot" cx="22" cy="26" r="4" /><circle className="surface-window-dot" cx="38" cy="26" r="4" /><circle className="surface-window-dot" cx="54" cy="26" r="4" />
      <path className="surface-divider" d="M12 45H338M91 45V232" />
      <path className="surface-rule" d="M25 77H67M25 108H59M25 139H67M113 78H225" />
      <rect className="surface-tint" x="110" y="102" width="217" height="39" />
      <path className="surface-rule" d="M125 121H298M113 165H298M113 190H252" />
    </g>
    <path className="surface-connector" d="M263 510V548Q263 564 247 564H198M263 564H328" />
    {[198, 263, 328].map(x => <circle key={x} className="surface-panel" cx={x} cy="564" r="10" />)}
    <text className="surface-task" x="263" y="648" textAnchor="middle">A defined screen + flow</text>

    <path className="surface-rule" d="M481 389H551M539 377L551 389L539 401" />

    <text className="surface-label" x="794" y="222" textAnchor="middle">Agentic</text>
    <rect className="surface-task-paper" x="654" y="263" width="280" height="65" />
    <text className="surface-task" x="794" y="303" textAnchor="middle">Intent + context</text>
    <path className="surface-connector" d="M794 328V403M646 403V375Q646 359 662 359H926Q942 359 942 375V403" />
    {[582, 730, 878].map((x, index) => <g key={x} transform={`translate(${x} 403)`}>
      <rect className="surface-panel" width="128" height="164" />
      <path className="surface-divider" d="M10 34H118" />
      <path className="surface-rule" d="M16 18H70" />
      {index === 0 && <><rect className="surface-tint" x="14" y="49" width="100" height="52" /><path className="surface-rule" d="M26 66H91M26 84H73M16 124H100" /></>}
      {index === 1 && <><path className="surface-rule" d="M16 57H90M16 82H105M16 107H85" /><rect className="surface-tint" x="16" y="126" width="74" height="22" /></>}
      {index === 2 && <><path className="surface-rule" d="M16 58H75M16 90H75M16 122H75" /><circle className="surface-status" cx="103" cy="58" r="4" /><circle className="surface-status" cx="103" cy="90" r="4" /><circle className="surface-status" cx="103" cy="122" r="4" /></>}
    </g>)}
    <text className="surface-task" x="794" y="648" textAnchor="middle">A result shaped by the task</text>
  </svg>;
}
import "./mcp-surface-diagram.css";

export default function McpSurfaceDiagram() {
  return <svg className="mcp-surface-diagram" viewBox="0 0 1100 740" role="img" aria-labelledby="surface-title surface-description">
    <title id="surface-title">The same task. Different products.</title>
    <desc id="surface-description">One expense-review task connects to Copilot, Teams, and Dynamics 365 F&amp;O. The same record and status appear in three schematic product layouts.</desc>
    <text className="surface-heading surface-bold" x="550" y="92" textAnchor="middle">The same task.</text>
    <text className="surface-heading" x="550" y="142" textAnchor="middle">Different products.</text>
    <rect className="surface-task-paper" x="352" y="186" width="396" height="67" />
    <text className="surface-task" x="550" y="226" textAnchor="middle">“Review my expenses”</text>
    <path className="surface-connector" d="M550 253V330M227 330V306Q227 290 243 290H857Q873 290 873 306V330" />
    {[{ name: "Copilot", x: 72, theme: "copilot" }, { name: "Teams", x: 395, theme: "teams" }, { name: "Dynamics 365 F&O", x: 718, theme: "fo" }].map((product, index) => <g key={product.name} className={`surface-product surface-${product.theme}`} transform={`translate(${product.x} 330)`}>
      <g className="surface-product-content">
      <rect className="surface-panel" width="310" height="292" />
      <circle className="surface-window-dot" cx="22" cy="26" r="4" /><circle className="surface-window-dot" cx="38" cy="26" r="4" /><circle className="surface-window-dot" cx="54" cy="26" r="4" />
      <path className="surface-divider" d="M12 45H298" />
      {index === 0 && <>
        <rect className="surface-tint" x="134" y="70" width="148" height="36" />
        <path className="surface-rule" d="M150 88H261" />
        <circle className="surface-bar" cx="32" cy="135" r="8" />
        <path className="surface-rule" d="M52 130H192M52 145H148" />
        <rect className="surface-tint" x="24" y="174" width="262" height="72" />
        <path className="surface-rule" d="M42 198H177M42 222H130" />
        <circle className="surface-status" cx="260" cy="210" r="6" />
      </>}
      {index === 1 && <>
        <g className="surface-teams-nav"><rect className="surface-tint" x="12" y="58" width="66" height="220" />
          <path className="surface-rule" d="M25 82H64M25 109H56M25 136H61" /></g>
        <path className="surface-rule" d="M98 78H263" />
        <circle className="surface-bar" cx="106" cy="121" r="8" />
        <path className="surface-rule" d="M126 116H270M126 132H227" />
        <rect className="surface-tint" x="98" y="163" width="188" height="83" />
        <path className="surface-rule" d="M114 189H246M114 221H201" />
        <circle className="surface-status" cx="264" cy="221" r="6" />
      </>}
      {index === 2 && <>
        <path className="surface-rule" d="M24 77H162" />
        <rect className="surface-tint" x="20" y="100" width="270" height="33" />
        <path className="surface-rule" d="M38 117H105M144 117H185M230 117H271" />
        {[0, 1, 2].map(row => <g key={row} transform={`translate(0 ${142 + row * 39})`}>
          <path className="surface-rule" d="M38 15H106M144 15H185" />
          <circle className="surface-status" cx="238" cy="15" r="6" />
          <path className="surface-divider" d="M20 34H290" />
        </g>)}
      </>}
      </g>
      <text className="surface-label" x="155" y="329" textAnchor="middle">{product.name}</text>
    </g>)}
  </svg>;
}
import { useId } from "react";
import "./mcp-experience-cover.css";

/** Decorative task patterns, shared by Work and the project opening. */
export default function McpExperienceCover() {
  const titleId = useId();
  return <svg className="mcp-experience-cover" viewBox="0 0 1000 640" role="img" aria-labelledby={titleId}>
    <title id={titleId}>Intent becomes a structured task: chat builds a record, evidence is checked, and reusable blocks form connected surfaces.</title>
    <defs>
      <pattern id={`${titleId}-grid`} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" className="cover-grid-line" /></pattern>
    </defs>
    <rect x="750" y="45" width="180" height="140" fill={`url(#${titleId}-grid)`} />
    <rect x="60" y="470" width="140" height="125" fill={`url(#${titleId}-grid)`} />

    <g transform="translate(60 55) rotate(-4) scale(.8)"><g className="cover-chat-pattern">
      <rect width="285" height="169" rx="var(--borderRadiusLarge)" className="cover-paper" />
      <circle cx="28" cy="29" r="8" className="cover-ink" />
      <path d="M48 24H130 M48 35H102" className="cover-line" />
      <g className="cover-prompt"><rect x="85" y="54" width="178" height="34" rx="var(--borderRadiusLarge)" className="cover-tint" /><path d="M100 66H231 M100 77H192" className="cover-line" /></g>
      <g className="cover-response"><circle cx="29" cy="111" r="8" className="cover-tint" /><rect x="47" y="100" width="158" height="47" rx="var(--borderRadiusMedium)" className="cover-neutral" /><path d="M60 113H185 M60 125H158 M60 137H112" className="cover-line" /></g>
      <g className="cover-typing">{[0, 1, 2].map(i => <circle key={i} cx={61 + i * 13} cy="118" r="3" className={`cover-ink cover-dot cover-dot-${i}`} />)}</g>
    </g></g>

    <g transform="translate(385 40) rotate(3) scale(.8)">
      <rect width="314" height="187" rx="var(--borderRadiusLarge)" className="cover-paper" />
      <rect x="22" y="40" width="34" height="34" rx="var(--borderRadiusMedium)" className="cover-tint" /><path d="M32 49H46 M32 56H46 M32 63H41" className="cover-brand-line" />
      <path d="M70 47H186 M70 63H137" className="cover-line" /><circle cx="275" cy="54" r="11" className="cover-success" /><path d="M270 54L274 58L281 49" className="cover-check" />
      {[0, 1, 2].map(i => <g key={i} className={`cover-record-row cover-record-row-${i}`}><path d={`M22 ${94 + i * 25}H292`} className="cover-line" /><rect x="24" y={102 + i * 25} width="12" height="12" rx="var(--borderRadiusSmall)" className="cover-tint" /><path d={`M49 ${108 + i * 25}H${157 + i * 21} M250 ${108 + i * 25}H287`} className="cover-line" /></g>)}
    </g>

    <g transform="translate(770 250) rotate(4) scale(.75)">
      <rect width="246" height="213" rx="var(--borderRadiusLarge)" className="cover-paper" />
      <path d="M20 24H111 M20 41H225" className="cover-line" />
      <g className="cover-receipt"><path d="M24 62H78L90 75V153H24Z" className="cover-tint" /><path d="M36 83H76 M36 96H76 M36 109H63 M36 136H76" className="cover-brand-line" /></g>
      <path d="M112 77H222 M112 93H194 M112 125H218 M112 142H170" className="cover-line" />
      <path d="M20 174H224" className="cover-line" />
      <g className="cover-scan"><path d="M16 63H229" className="cover-brand-line" /></g>
      <g className="cover-verified"><circle cx="211" cy="184" r="17" className="cover-success" /><path d="M202 184L209 191L221 176" className="cover-check" /></g>
    </g>

    <g transform="translate(65 265) scale(.8)">
      <path d="M7 0H119L143 25V137H7Z" className="cover-paper" /><path d="M119 0V25H143" className="cover-brand-line" />
      {[0, 1, 2].map(i => <g key={i}><rect x="24" y={43 + i * 27} width="14" height="14" rx="var(--borderRadiusSmall)" className="cover-tint" /><path d={`M48 ${50 + i * 27}H117`} className="cover-line" /><path d={`M27 ${50 + i * 27}L31 ${54 + i * 27}L38 ${45 + i * 27}`} className={`cover-check cover-task-check cover-task-check-${i}`} /></g>)}
      <g className="cover-verified"><circle cx="140" cy="128" r="25" className="cover-tint" /><path d="M130 128L138 136L151 119" className="cover-brand-line" /></g>
    </g>

    <text x="500" y="309" textAnchor="middle" className="cover-heading">Guide with principles.</text>
    <text x="500" y="366" textAnchor="middle" className="cover-heading">Build with blocks.</text>
    <path d="M367 386Q500 372 636 386" className="cover-brand-line" />

    <g transform="translate(375 460) rotate(-3) scale(.75)">
      <rect width="313" height="183" rx="var(--borderRadiusLarge)" className="cover-paper" />
      <path d="M20 24H93 M20 38H151" className="cover-line" />
      {[0, 1, 2].map(i => <g key={i} transform={`translate(${20 + i * 94} 58)`}><g className={`cover-surface cover-surface-${i}`}>
        <rect width="84" height="104" rx="var(--borderRadiusMedium)" className="cover-neutral" />
        <rect x="7" y="8" width="70" height="10" rx="var(--borderRadiusSmall)" className="cover-tint" />
        {i === 0 ? <><rect x="25" y="29" width="50" height="18" rx="var(--borderRadiusMedium)" className="cover-tint" /><rect x="8" y="55" width="53" height="29" rx="var(--borderRadiusMedium)" className="cover-paper" /><path d="M15 64H52 M15 73H40" className="cover-line" /></> : i === 1 ? <><path d="M53 25V96" className="cover-line" /><path d="M9 33H43 M9 45H38 M9 57H43" className="cover-line" /><rect x="60" y="29" width="17" height="52" rx="var(--borderRadiusSmall)" className="cover-tint" /></> : <><path d="M8 35H76 M8 50H76 M8 65H76 M8 80H76 M31 28V90 M57 28V90" className="cover-line" /><rect x="9" y="53" width="65" height="10" className="cover-tint" /></>}
      </g></g>)}
    </g>

  </svg>;
}

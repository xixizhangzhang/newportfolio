import { useEffect, useRef } from "react";
const pageWidth = 298;
const pageCount = 7;
const stripWidth = pageWidth * pageCount;

/** Decorative wireframes, not interactive controls; all geometry uses screen canvas coordinates. */
function ScreenDraft({ page }: { page: number }) {
  const paper = "var(--colorNeutralBackground1)";
  const muted = "var(--colorNeutralBackground2)";
  const ink = "var(--colorPalettePurpleForeground2)";
  const lavender = "var(--colorPaletteLavenderBackground2)";
  const stroke = "var(--colorNeutralStroke1)";
  const lines = (x: number, y: number, widths: number[]) => widths.map((width, i) => (
    <path key={i} d={`M${x} ${y + i * 6} h${width}`} stroke={stroke} />
  ));
  const panel = (x: number, y: number, width: number, height: number) => (
    <rect x={x} y={y} width={width} height={height} rx="var(--borderRadiusMedium)" fill={paper} stroke={stroke} />
  );
  const sidebar = <g><rect width="48" height="159" fill={muted} /><circle cx="10" cy="10" r="3" fill={ink} />{[29, 40, 51, 62, 73, 90, 101, 112].map((y, i) => <g key={y}><circle cx="9" cy={y} r="2" fill={i === 0 ? ink : lavender} />{lines(16, y, [i % 2 ? 20 : 26])}</g>)}<circle cx="10" cy="148" r="4" fill={lavender} /></g>;
  if (page === 0) return <g stroke={ink} fill={paper}>
    <rect width="298" height="28" fill={lavender} stroke="none" /><circle cx="12" cy="14" r="3" fill={ink} stroke="none" /><path d="M278 10 H287 M278 14 H287 M278 18 H287" />
    <path d="M75 63 H125 M175 63 H218 V97 M150 87 V127 H218" fill="none" />
    <path d="M120 60 L125 63 L120 66 M215 92 L218 97 L221 92 M213 124 L218 127 L213 130" fill="none" />
    <rect x="14" y="51" width="61" height="24" rx="var(--borderRadiusMedium)" fill={lavender} />
    <path d="M150 39 L175 63 L150 87 L125 63 Z" />
    <rect x="187" y="97" width="91" height="24" rx="var(--borderRadiusMedium)" fill="var(--colorStatusSuccessBackground1)" />
    <rect x="187" y="127" width="91" height="22" rx="var(--borderRadiusMedium)" />
  </g>;
  if (page === 1) return <g>{sidebar}
    <path d="M122 20 H226" stroke={ink} />{panel(102, 31, 148, 29)}{lines(110, 39, [36])}<path d="M108 52 h6 m-3 -3 v6" stroke={ink} /><rect x="121" y="47" width="31" height="9" rx="var(--borderRadiusSmall)" fill={lavender} />
    {[0, 1, 2, 3].map(i => <g key={i}>{panel(102 + (i % 2) * 77, 74 + Math.floor(i / 2) * 29, 71, 25)}{lines(108 + (i % 2) * 77, 82 + Math.floor(i / 2) * 29, [48, 38, 26])}</g>)}
    {panel(102, 134, 148, 18)}{lines(110, 140, [116, 83])}
  </g>;
  if (page === 2) return <g>{sidebar}{lines(55, 12, [126, 163])}
    {[38, 58, 78].map((y, i) => <g key={y}><rect x="54" y={y} width="35" height="17" rx="var(--borderRadiusSmall)" fill={i === 0 ? lavender : muted} stroke={stroke} />{lines(59, y + 6, [23, 17])}</g>)}
    {panel(94, 31, 195, 28)}{[41, 51].map(y => <g key={y}><rect x="100" y={y - 2} width="4" height="4" fill={ink} />{lines(110, y, [62])}<path d={`M220 ${y} h42`} stroke={stroke} /></g>)}
    {panel(94, 63, 195, 66)}<path d="M119 85 L161 99 M119 108 L161 99 M161 99 L197 75 M161 99 L210 92 M161 99 L221 105 M161 99 L259 80 M161 99 L246 118 M100 123 H279" fill="none" stroke={stroke} />
    {[[119,85],[119,108],[161,99],[197,75],[210,92],[221,105],[259,80],[246,118]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="3" fill={lavender} stroke={i > 5 ? "var(--colorStatusDangerForeground1)" : ink} />)}
    {[0,1,2,3].map(i => <g key={i}>{panel(94 + i * 49, 133, 46, 21)}{lines(100 + i * 49, 140, [28, 18])}</g>)}
  </g>;
  if (page === 3) return <g>
    <path d="M65 15 H183" stroke={ink} /><rect x="227" y="10" width="26" height="10" rx="var(--borderRadiusSmall)" fill={ink} />
    {panel(64, 31, 190, 37)}{[0,1,2,3].map(i => <g key={i}>{lines(70 + i * 47, 40, [32])}<path d={`M${72+i*47} 51 h10 m4 0 h12`} stroke={ink} /><rect x={76+i*47} y="58" width="19" height="5" rx="var(--borderRadiusSmall)" fill="var(--colorStatusSuccessBackground1)" /></g>)}
    {lines(64, 78, [26, 138])}<rect x="64" y="90" width="190" height="10" fill={muted} />{lines(70, 95, [24, 0])}{lines(64, 108, [24, 185, 165])}<rect x="64" y="126" width="190" height="10" fill={muted} />
    {[64,162].map(x => <g key={x}>{panel(x, 141, 92, 15)}<circle cx={x+8} cy="148" r="4" fill={lavender} />{lines(x+17, 147, [53, 38])}</g>)}
  </g>;
  if (page === 4) return <g>
    <rect width="298" height="159" fill={muted} />{panel(24, 10, 250, 140)}<path d="M32 20 h29 M261 17 l4 4 m-4 0 l4 -4" stroke={ink} />
    {panel(31, 29, 236, 33)}{lines(38, 37, [64, 105, 90])}<path d="M172 33 V58" stroke={stroke} />{[188,233].map(x => <g key={x}><rect x={x} y="36" width="11" height="6" fill={lavender} />{lines(x, 49, [21, 16])}</g>)}
    <rect x="31" y="68" width="236" height="13" rx="var(--borderRadiusSmall)" fill="var(--colorStatusWarningBackground1)" stroke="var(--colorStatusWarningBorder1)" /><path d="M38 71 l3 6 h-6 Z" fill="var(--colorStatusWarningForeground1)" />{lines(47, 74, [158])}
    {[95,109,123,137].map(y => <path key={y} d={`M40 ${y} H258`} stroke={stroke} />)}
    <path d="M42 136 L64 131 L86 128 L109 119 L132 116 L155 105 L177 101 L200 94 L223 86" fill="none" stroke={ink} /><path d="M223 86 L253 80" fill="none" stroke={ink} strokeDasharray="4 2" />
    <path d="M42 138 L64 136 L86 132 L109 129 L132 125 L155 121 L177 115 L200 113" fill="none" stroke="var(--colorBrandForeground1)" /><path d="M42 140 L86 138 L132 133 L177 129 L200 127" fill="none" stroke="var(--colorStatusSuccessForeground1)" />
  </g>;
  if (page === 5) return <g>
    <circle cx="17" cy="12" r="4" fill={ink} />{lines(37, 12, [99])}
    {["var(--colorBrandBackground2)", lavender, "var(--colorStatusSuccessBackground1)", "var(--colorStatusWarningBackground1)"].map((color,i) => <g key={color} transform={`translate(${14+i*70} 0)`}>
      <rect y="31" width="62" height="63" rx="var(--borderRadiusMedium)" fill={color} />
      <g stroke="var(--colorNeutralForeground2)" fill="none">{i === 0 ? <path d="M25 66 l10 -10 m-12 12 l3 3 12 -12 -3 -4 -4 1" /> : i === 1 ? <path d="M24 61 v12 h10 V61 Z M27 58 h10 v12 M30 55 h10 v12" /> : i === 2 ? <path d="M23 59 h8 v13 h-8 Z M31 59 h8 v13 h-8 Z" /> : <path d="M30 55 l-5 10 h6 l-2 9 10 -13 h-7 l3 -6 Z" />}</g>
      {lines(0, 105, [22])}<path d="M0 114 h42" stroke={ink} />{lines(0, 125, [60, 56, 48])}<path d="M0 151 h34 m5 -3 3 3 -3 3" stroke={ink} />
    </g>)}
  </g>;
  return <g>{sidebar}{lines(60, 12, [86])}
    {[29,98].map((y,group) => <g key={y}>{panel(57,y,231,group === 0 ? 64 : 54)}{lines(64,y+8,[31])}
      {[0,1,2].map(i => <g key={i}><path d={`M63 ${y+18+i*14} H282`} stroke={stroke} /><rect x="65" y={y+21+i*14} width="16" height="7" rx={i === 2 ? "var(--borderRadiusCircular)" : "var(--borderRadiusMedium)"} fill={group === 1 && i === 0 ? "var(--colorBrandBackground)" : muted} stroke={stroke} />{lines(88,y+25+i*14,[39])}{[143,198].map(x => <g key={x}><rect x={x} y={y+21+i*14} width="43" height="7" rx="var(--borderRadiusCircular)" fill={muted} />{lines(x+4,y+25+i*14,[33])}</g>)}{lines(250,y+25+i*14,[25])}</g>)}
    </g>)}
  </g>;
}
/** Screen geometry is registered to the illustration's intrinsic canvas, not CSS sizing. */
export default function StudioScreen() {
  const strip = useRef<SVGGElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const durationToken = strip.current
      ? getComputedStyle(strip.current).getPropertyValue("--durationUltraSlow").trim()
      : "";
    const tokenNumber = Number.parseFloat(durationToken);
    const durationMilliseconds = durationToken.endsWith("ms") ? tokenNumber : tokenNumber * 1000;
    if (!Number.isFinite(durationMilliseconds) || durationMilliseconds <= 0) return;
    const cycleDuration = durationMilliseconds * 60 * pageCount / 4;
    let frame = 0;
    let start: number | undefined;
    const draw = (now: number) => {
      if (preference.matches) return;
      start ??= now;
      strip.current?.setAttribute("transform", `translate(${-(((now - start) % cycleDuration) / cycleDuration) * stripWidth} 0)`);
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      start = undefined;
      strip.current?.setAttribute("transform", "translate(0 0)");
      if (!preference.matches) frame = requestAnimationFrame(draw);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener("change", sync); };
  }, []);
  return (
    <svg className="portfolio-screen" viewBox="0 0 1536 900" strokeWidth="var(--strokeWidthThin)" aria-hidden="true">
      <defs><clipPath id="studio-screen-clip"><rect x="458" y="313" width="498" height="267" /></clipPath></defs>
      <g clipPath="url(#studio-screen-clip)">
        <g transform={`translate(458 313) scale(${498 / 298} ${267 / 159})`}>
          <g ref={strip}>
            {[0, stripWidth].map(offset => (
              <g key={offset} transform={`translate(${offset} 0)`}>
                {Array.from({ length: pageCount }, (_, page) => (
                  <g key={page} data-screen-page={page} transform={`translate(${page * pageWidth} 0)`}>
                    <rect width={pageWidth} height="159" fill="var(--colorNeutralBackground1)" />
                    <ScreenDraft page={page} />
                  </g>
                ))}
              </g>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
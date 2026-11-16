import { useEffect, useId, useRef, useState } from "react";
import characterInk from "@/assets/ride-character-ink.png";
import characterPaper from "@/assets/ride-character-paper.png";

const ink = "var(--colorPalettePurpleForeground2)";
const paper = "var(--colorNeutralBackground1)";
const distant = "var(--colorPaletteLavenderForeground2)";
const soft = "var(--colorPaletteLavenderBackground2)";
const depth = "var(--colorNeutralBackground3)";
export const rideDistance = 3600;
export const riderX = 420;
const tile = 1200;

const skin = "var(--colorPalettePeachBackground2)";
const frame = "var(--colorPaletteRoyalBlueBorderActive)";
const tire = "var(--colorPaletteNavyForeground2)";
const spoke = "var(--colorNeutralForeground1)";
const top = "var(--colorPaletteLightTealBackground2)";
const shorts = "var(--colorPaletteRoyalBlueForeground2)";
const pack = "var(--colorNeutralForeground1Static)";
const shoe = "var(--colorPaletteLavenderForeground2)";

const skinShade = "var(--colorPalettePumpkinBackground2)";
const hip = { x: 520, y: 356 };

function legJoints(angle: number) {
  const foot = { x: 560 + Math.cos(angle) * 26, y: 518 + Math.sin(angle) * 26 };
  const dx = foot.x - hip.x, dy = foot.y - hip.y;
  const length = Math.hypot(dx, dy);
  const reach = Math.sqrt(Math.max(0, 97 * 97 - length * length / 4));
  return { foot, knee: { x: hip.x + dx / 2 + dy / length * reach, y: hip.y + dy / 2 - dx / length * reach } };
}

/** Tapered limb segment with rounded joints so thigh-to-shin and arm joins read smoothly. */
function Limb({ a, b, wa, wb, color }: { a: { x: number; y: number }; b: { x: number; y: number }; wa: number; wb: number; color: string }) {
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const nx = -(b.y - a.y) / len, ny = (b.x - a.x) / len;
  return <g fill={color} stroke="none">
    <path d={`M${a.x + nx * wa} ${a.y + ny * wa} L${b.x + nx * wb} ${b.y + ny * wb} L${b.x - nx * wb} ${b.y - ny * wb} L${a.x - nx * wa} ${a.y - ny * wa} Z`} />
    <circle cx={a.x} cy={a.y} r={wa} /><circle cx={b.x} cy={b.y} r={wb} />
  </g>;
}

/** One leg: thigh, shin and shoe in flat colour; the shorts cuff is drawn separately on the thigh. */
function PedalingLeg({ angle, rear = false }: { angle: number; rear?: boolean }) {
  const { foot, knee } = legJoints(angle);
  const color = skin;
  const cuff = { x: hip.x + (knee.x - hip.x) * 0.42, y: hip.y + (knee.y - hip.y) * 0.42 };
  return <g fill="none">
    <Limb a={hip} b={knee} wa={15} wb={11} color={color} />
    <Limb a={knee} b={{ x: foot.x - 2, y: foot.y - 12 }} wa={11} wb={8} color={color} />
    <path d={`M${hip.x} ${hip.y} L${cuff.x} ${cuff.y}`} stroke={shorts} strokeWidth="30" strokeLinecap="butt" />
    <path d={`M${foot.x - 15} ${foot.y - 4} Q${foot.x} ${foot.y - 17} ${foot.x + 24} ${foot.y + 1} Q${foot.x + 28} ${foot.y + 9} ${foot.x + 16} ${foot.y + 9} H${foot.x - 15} Z`} fill={shoe} />
  </g>;
}

/** One arm reaching the handlebar grip, with a slight elbow bend. */
function Arm({ shoulder, hand, rear = false }: { shoulder: { x: number; y: number }; hand: { x: number; y: number }; rear?: boolean }) {
  const color = skin;
  const elbow = { x: shoulder.x + (hand.x - shoulder.x) * 0.48 - 4, y: shoulder.y + (hand.y - shoulder.y) * 0.48 + 10 };
  return <g fill="none" stroke={color}>
    <Limb a={shoulder} b={elbow} wa={10} wb={8.5} color={color} />
    <Limb a={elbow} b={hand} wa={8.5} wb={7} color={color} />
    <circle cx={hand.x} cy={hand.y} r="9" fill={color} stroke="none" />
  </g>;
}

function Repeat({ offset, children }: { offset: number; children: React.ReactNode }) {
  const shift = -(((offset % tile) + tile) % tile);
  return <g transform={`translate(${shift} 0)`}>{[0, tile, tile * 2].map(x => <g key={x} transform={`translate(${x} 0)`}>{children}</g>)}</g>;
}

function City({ city }: { city: string }) {
  if (city === "shanghai") return <g>
    {/* Shared vertical axis and true circular observation decks. */}
    <path d="M172 390 L210 302 M288 390 L250 302 M210 302 L220 278 M250 302 L240 278 M220 202 L225 104 M240 202 L235 104 M230 60 V30" />
    <circle cx="230" cy="240" r="38" fill={paper} />
    <circle cx="230" cy="82" r="22" fill={paper} />
    <path d="M195 229 Q230 214 265 229 M195 251 Q230 266 265 251 M211 77 Q230 69 249 77 M211 87 Q230 96 249 87" />
    {/* Jin Mao: symmetric setbacks, straight facade and a centered spire. */}
    <path d="M808 390 V264 H820 V240 H832 V214 H842 V184 H850 V150 H858 V184 H866 V214 H878 V240 H890 V264 H902 V390 M850 150 V116 M828 280 H882 M828 304 H882 M828 328 H882 M828 352 H882 M850 218 V374" />
    {/* World Financial Center: a clean trapezoid aperture inside straight walls. */}
    <path d="M930 390 V150 L1002 120 V390 M943 156 L989 137 L981 167 L949 180 Z M943 207 H989 M943 240 H989 M943 273 H989 M943 306 H989 M943 339 H989" />
    {/* Shanghai Tower: a restrained tapered twist, rather than a bent outline. */}
    <path d="M1050 390 C1046 280 1053 146 1083 69 Q1093 55 1105 51 C1120 159 1128 276 1126 390 M1105 51 C1070 166 1117 274 1082 390 M1065 172 Q1087 161 1116 166 M1058 229 Q1086 219 1122 222 M1054 288 Q1087 279 1125 282 M1052 347 Q1087 339 1126 341" />
    {/* Bund rooftops and a few loose river ripples, not a dense window grid. */}
    <path d="M15 387 L18 337 L61 338 L64 321 L82 310 L99 321 L101 338 L144 337 L146 388 M28 356 L40 356 M66 352 L80 352 M110 356 L124 357 M326 386 L329 343 L361 341 L363 327 L382 327 L385 343 L418 345 L420 388 M347 361 L357 361 M391 361 L402 362" />
    <path d="M24 416 Q96 409 157 416 M319 425 Q376 418 438 424 M816 417 Q891 410 951 417 M1027 429 Q1108 420 1174 427" />
  </g>;
  if (city === "newyork") return <g>
    {/* Liberty's torch, crown and robe remain legible as a sparse silhouette. */}
    <path d="M144 389 L148 363 L163 361 L165 339 L236 339 L240 362 L254 364 L257 389 M172 339 L183 238 L172 197 L153 161 L164 154 L190 188 L203 208 L224 211 L238 255 L231 339 Z M153 160 L147 131 L162 129 L164 154 M148 128 Q140 116 151 105 Q166 114 162 128 M197 205 Q189 190 197 179 Q209 168 219 181 L222 200 L214 209 M195 178 L188 165 M201 174 L199 158 M211 173 L215 158 M218 179 L230 166 M221 187 L237 179 M196 239 L185 329 M210 246 L202 329 M224 260 L221 330 M225 221 L239 216 L249 246 L235 252" fill={paper} />
    {/* Empire State's stepped crown and Chrysler's scalloped spire. */}
    <path d="M812 390 V204 H830 V172 H846 V142 H859 V126 H875 V142 H888 V172 H904 V204 H922 V390 M867 126 V78 M845 220 V372 M867 190 V372 M889 220 V372 M824 254 H835 M899 254 H910 M824 290 H835 M899 290 H910" />
    <path d="M1008 390 V230 H1018 V208 Q1022 185 1038 174 L1049 126 L1060 174 Q1076 185 1080 208 V230 H1090 V390 M1022 206 Q1049 181 1076 206 M1018 224 Q1049 197 1080 224 M1018 242 Q1049 214 1080 242 M1029 261 V374 M1049 257 V374 M1069 261 V374" />
    <path d="M16 389 L19 306 L83 309 L86 389 M27 304 L29 291 L61 291 L63 306 M310 389 L312 297 L372 296 L375 389 M322 314 L337 314 M350 314 L363 313 M321 343 L336 343 M351 343 L363 342 M1114 389 L1116 303 L1174 301 L1177 388" />
    <path d="M22 421 Q83 414 127 420 M276 428 Q332 420 399 426 M822 418 Q880 410 933 417 M1047 429 Q1111 420 1171 427" />
  </g>;
  return <g>
    {/* Bay Area: the bridge's twin portal towers are the dominant landmark. */}
    <path d="M0 316 Q60 266 110 282 M1041 278 Q1116 220 1200 279 M0 410 Q130 398 255 412 M804 414 Q981 399 1200 411" stroke={soft} />
    {[120, 924].map(x => <g key={x} fill={paper}>
      <path d={`M${x} 390 V104 H${x + 20} V390 M${x + 84} 390 V104 H${x + 104} V390 M${x - 2} 104 V90 H${x + 22} V104 M${x + 82} 104 V90 H${x + 106} V104`} />
      {[126, 164, 212, 268].map(y => <path key={y} d={`M${x + 20} ${y} H${x + 84}`} fill="none" />)}
    </g>)}
    <path d="M0 285 Q66 247 130 128 M214 128 C384 317 734 316 934 128 M1018 128 Q1114 257 1200 284 M0 348 H1200 M0 355 H1200" />
    {/* Each suspender starts exactly on its cable, not on an estimated outline. */}
    {Array.from({ length: 13 }, (_, i) => {
      const t = (i + 1) / 14, u = 1 - t;
      const x = u ** 3 * 214 + 3 * u ** 2 * t * 384 + 3 * u * t ** 2 * 734 + t ** 3 * 934;
      const y = u ** 3 * 128 + 3 * u ** 2 * t * 317 + 3 * u * t ** 2 * 316 + t ** 3 * 128;
      return <path key={`span-${i}`} d={`M${x} ${y} V348`} />;
    })}
    {[0.25, 0.55, 0.8].map(t => {
      const u = 1 - t;
      const leftX = 2 * u * t * 66 + t * t * 130;
      const leftY = u * u * 285 + 2 * u * t * 247 + t * t * 128;
      const rightX = u * u * 1018 + 2 * u * t * 1114 + t * t * 1200;
      const rightY = u * u * 128 + 2 * u * t * 257 + t * t * 284;
      return <path key={t} d={`M${leftX} ${leftY} V348 M${rightX} ${rightY} V348`} />;
    })}
    <path d="M40 429 Q87 421 135 427 M279 418 Q341 412 397 418 M815 426 Q861 420 912 425 M1045 431 Q1118 423 1173 429" />
  </g>;
}

/** Illustration coordinates are intrinsic artwork geometry, not UI sizing tokens. */
export default function RideScene({ progress, stations, scenery = "valley", reduced = false }: { progress: number; started: boolean; stations: number[]; scenery?: string; reduced?: boolean }) {
  const id = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const [sceneWidth, setSceneWidth] = useState(1200);
  const [cityLayers, setCityLayers] = useState({ current: scenery, phase: "idle", direction: "forward" });
  const requestedScenery = useRef(scenery);
  requestedScenery.current = scenery;
  const lastProgress = useRef(progress);
  useEffect(() => {
    const direction = progress >= lastProgress.current ? "forward" : "backward";
    lastProgress.current = progress;
    if (reduced) {
      if (cityLayers.current !== scenery || cityLayers.phase !== "idle") {
        setCityLayers({ current: scenery, phase: "idle", direction });
      }
      return;
    }
    if (cityLayers.current === scenery || cityLayers.phase === "exit") return;
    setCityLayers(layers => ({ ...layers, phase: "exit", direction }));
  }, [scenery, progress, reduced, cityLayers.current, cityLayers.phase]);
  const finishCityTransition = () => {
    setCityLayers(layers => layers.phase === "exit"
      ? { ...layers, current: requestedScenery.current, phase: "enter" }
      : { ...layers, phase: "idle" });
  };
  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (height > 0) setSceneWidth(Math.max(640, width / height * 640));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const distance = reduced ? 0 : progress * rideDistance;
  const angle = distance / (2 * Math.PI * 73) * 360;
  const pedalAngle = distance / 110;
  // Artwork coordinates scale equally in both axes; only the open shoreline spans the viewport.
  const skylineScale = Math.min(1, sceneWidth / tile);
  const skylineSlack = Math.max(0, sceneWidth - tile * skylineScale);
  const skylineDrift = reduced ? 0 : (0.5 - progress) * Math.min(180, sceneWidth * 0.14);
  return <svg ref={svg} className="ride-scene" viewBox={`0 0 ${sceneWidth} 640`} aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <mask id={`${id}-ink`} maskUnits="userSpaceOnUse" x="350" y="160" width="460" height="460"><image href={characterInk} x="350" y="160" width="460" height="460" /></mask>
      <mask id={`${id}-paper`} maskUnits="userSpaceOnUse" x="350" y="160" width="460" height="460"><image href={characterPaper} x="350" y="160" width="460" height="460" /></mask>
      <clipPath id={`${id}-head`}><path d="M350 160 H810 V249 H350 Z" /></clipPath>
    </defs>
    <rect width={sceneWidth} height="640" fill={paper} />
    <g stroke={distant} fill="none" strokeWidth="var(--strokeWidthThick)" data-ride-skyline>
      <path d={`M0 418 Q${sceneWidth * 0.25} 405 ${sceneWidth * 0.5} 418 T${sceneWidth} 418`} stroke={soft} />
      <g data-ride-direction={cityLayers.direction} transform={`translate(${skylineSlack / 2 + skylineDrift} ${390 * (1 - skylineScale)}) scale(${skylineScale})`}>
        <g key={`${cityLayers.current}-${cityLayers.phase}`} className={cityLayers.phase === "exit" ? "ride-city-outgoing" : cityLayers.phase === "enter" ? "ride-city-incoming" : undefined} onAnimationEnd={finishCityTransition} data-ride-landmarks={cityLayers.current}><City city={cityLayers.current} /></g>
      </g>
    </g>
    <path d={`M0 460 Q260 435 520 455 T${sceneWidth} 450 V640 H0 Z`} fill="var(--colorNeutralBackground2)" />
    <path d={`M0 591 H${sceneWidth}`} stroke={soft} strokeWidth="var(--strokeWidthThin)" />
    <g stroke={distant} strokeWidth="var(--strokeWidthThin)"><Repeat offset={distance}>{[0,1,2,3,4,5].map(i => <path key={i} d={`M${i*200+30} 625 h60`} />)}</Repeat></g>
    <g transform={`translate(${-distance} 0)`} stroke={distant} strokeWidth="var(--strokeWidthThick)">
      {stations.slice(0, 4).map((s,i) => <g key={s} data-ride-sign={i} transform={`translate(${(i === 3 ? sceneWidth - 40 : 600)+s*rideDistance} 0)`}><path d="M0 475 V340" /><path d={i === 0 ? "M-30 310 H58 V352 H-30 L-50 331 Z" : "M-98 310 H122 V352 H-98 L-120 331 Z"} fill={paper} />{i === 0 ? <g fill={distant}>{[0,1,2,3,4].map(n => <circle key={n} cx={-29+n*14} cy="331" r="3" />)}</g> : <text className="ride-sign-label" x="-10" y="332" textAnchor="middle" dominantBaseline="middle" fill={ink} stroke="none">{["", "Silicon Valley", "Shanghai", "New York"][i]}</text>}</g>)}
    </g>
    <g transform={`translate(${(sceneWidth-1200)/2} 0)`}>
      {/* Flat-colour rider after the user's reference; the masked head keeps the original hairstyle. */}
      {[450,706].map(x => <g key={x}>
        <circle cx={x} cy="500" r="72" fill={paper} stroke={tire} strokeWidth="12" />
        <g stroke={spoke} strokeWidth="1.5" transform={`rotate(${angle} ${x} 500)`}>{[0,22.5,45,67.5,90,112.5,135,157.5].map(a => <path key={a} d={`M${x-66} 500 H${x+66}`} transform={`rotate(${a} ${x} 500)`} />)}</g>
      </g>)}
      {/* Rider, back to front: far arm and leg, bike, near leg, body, backpack, near arm, head. */}
      <Arm rear shoulder={{ x: 550, y: 264 }} hand={{ x: 640, y: 356 }} />
      <PedalingLeg rear angle={pedalAngle+Math.PI} />
      <g fill="none" stroke={frame} strokeWidth="10">
        <path d="M450 500 L560 518 L516 396 L450 500" />
        <path d="M560 518 Q585 470 615 430 Q632 405 652 398 L706 500" />
        <path d="M652 398 L647 362" strokeWidth="8" />
        <path d="M647 362 Q650 352 640 354 L614 357" stroke={tire} strokeWidth="6" />
      </g>
      <path d="M516 396 L521 378" stroke={frame} strokeWidth="8" /><path d="M500 374 Q522 366 548 374 L544 384 H504 Z" fill={tire} />
      <circle cx="560" cy="518" r="14" fill={paper} stroke={tire} strokeWidth="4" />
      <path d={`M${560-Math.cos(pedalAngle)*26} ${518-Math.sin(pedalAngle)*26} L${560+Math.cos(pedalAngle)*26} ${518+Math.sin(pedalAngle)*26}`} stroke={tire} strokeWidth="5" />
      <PedalingLeg angle={pedalAngle} />
      <path d="M537 236 H555 L557 262 H535 Z" fill={skin} />
      <path d="M502 334 Q526 331 550 336 Q554 352 548 366 Q536 378 518 377 Q501 373 500 354 Z" fill={shorts} />
      <path d="M530 254 Q546 248 562 256 Q562 280 557 306 Q553 326 551 340 Q526 345 502 341 Q504 300 516 272 Q520 258 530 254 Z" fill={top} />
      <path d="M490 274 Q490 263 502 263 H513 Q524 265 523 278 L519 312 Q518 322 506 322 H498 Q487 321 488 309 Z" fill={pack} />
      <path d="M514 268 Q540 250 558 260 Q562 278 556 294 Q548 309 519 308" fill="none" stroke={pack} strokeWidth="var(--strokeWidthThicker)" />
      <Arm shoulder={{ x: 556, y: 266 }} hand={{ x: 622, y: 356 }} />
      <g clipPath={`url(#${id}-head)`}>
        <rect x="350" y="160" width="460" height="460" fill={skin} mask={`url(#${id}-paper)`} />
        <rect x="350" y="160" width="460" height="460" fill={tire} mask={`url(#${id}-ink)`} />
      </g>
      {/* Neck join drawn over the head's base outline so the neck flows into the top. */}
      <path d="M535 242 L554.5 245 L556.5 257 Q546 252 529.5 257 Z" fill={skin} />
      <path d="M526 242 L535 242.5 L531.5 252 L526 252 Z" fill={paper} />
      <path d="M535.5 243 L529.5 256.5" stroke={tire} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M554 247 L556.5 257" stroke={tire} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M514 268 Q540 250 558 260" fill="none" stroke={pack} strokeWidth="var(--strokeWidthThicker)" />
      <g fill={tire}>{[450,706].map(x => <circle key={x} cx={x} cy="500" r="6" />)}</g>
    </g>
  </svg>;
}

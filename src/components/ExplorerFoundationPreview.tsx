import { useEffect, useRef, useState } from "react";
import { Button, Switch, makeStyles, shorthands, mergeClasses, tokens } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ChevronDown16Regular, Image16Regular } from "@fluentui/react-icons";
import expenses from "@/assets/explorer/foundation-expenses.png.asset.json";
const expensesImg = expenses.url;
// Original Explorer canvas proportions and motion are retained intentionally.
const usePreviewStyles = makeStyles({ preview: {
  position: "relative", aspectRatio: "16 / 10", overflow: "hidden",
  borderRadius: tokens.borderRadiusXLarge, backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow4,
}});
const PAL_A = [
  [tokens.colorPaletteTealForeground2, tokens.colorPaletteTealBorderActive, tokens.colorPaletteTealBackground2, tokens.colorPaletteLightTealBackground2],
  [tokens.colorPaletteGreenForeground2, tokens.colorPaletteGreenBorderActive, tokens.colorPaletteLightGreenBackground2, tokens.colorPaletteGreenBackground1],
  [tokens.colorPaletteGoldForeground2, tokens.colorPaletteMarigoldBorderActive, tokens.colorPaletteMarigoldBackground2, tokens.colorPaletteYellowBackground1],
  [tokens.colorPaletteDarkRedBorderActive, tokens.colorPaletteRedBorderActive, tokens.colorPaletteRedBackground2, tokens.colorPaletteRedBackground1],
  [tokens.colorPaletteBerryForeground2, tokens.colorPaletteBerryBorderActive, tokens.colorPaletteBerryBackground2, tokens.colorPaletteBerryBackground1],
];
const PAL_B = [
  [tokens.colorNeutralForeground2, tokens.colorNeutralForeground4, tokens.colorNeutralStroke1, tokens.colorNeutralBackground5],
  [tokens.colorBrandBackgroundPressed, tokens.colorBrandBackground, tokens.colorBrandStroke2, tokens.colorBrandBackground2],
  [tokens.colorPaletteForestForeground2, tokens.colorPaletteGreenBorderActive, tokens.colorPaletteLightGreenBorder2, tokens.colorPaletteGreenBackground1],
  [tokens.colorPalettePeachForeground2, tokens.colorPaletteDarkOrangeBorderActive, tokens.colorPalettePeachBorderActive, tokens.colorPalettePeachBackground2],
  [tokens.colorPaletteGrapeForeground2, tokens.colorPaletteLavenderBorderActive, tokens.colorPaletteLavenderBorderActive, tokens.colorPaletteGrapeBackground2],
];

const useFoundationStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    backgroundImage: `repeating-linear-gradient(90deg, ${tokens.colorTransparentBackground} 0 calc(10% - ${tokens.strokeWidthThin}), ${tokens.colorNeutralStroke2} calc(10% - ${tokens.strokeWidthThin}) 10%)`,
  },
  el: {
    position: "absolute",
    transitionProperty: "transform, opacity, top, left, filter",
    transitionDuration: `calc(${tokens.durationUltraSlow} * 2)`,
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    fontSize: tokens.fontSizeBase200,
  },
  iconBox: {
    display: "flex",
    padding: tokens.spacingHorizontalXS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
  },
  col: { width: "14%", display: "flex", flexDirection: "column" },
  shade: { height: tokens.spacingVerticalXL },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "32%",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    ...shorthands.border(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1),
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  composer: {
    width: "58%",
    display: "block",
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
  },
});

type GroupState = "in" | "above" | "below";

export default function ExplorerFoundationPreview({ active = false }: { active?: boolean }) {
  const s = usePreviewStyles();
  const f = useFoundationStyles();
  const [a, setA] = useState<GroupState>("below"); // palette A + toggle + search
  const [b, setB] = useState<GroupState>("in"); // palette B + expenses + button (default)
  const [snapB, setSnapB] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const onEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clear();
    setSnapB(false);
    // round 1: default pushes up, A rises from below
    setB("above");
    setA("in");
    // round 2: A pushes up, default re-enters from below
    timers.current.push(
      window.setTimeout(() => {
        setSnapB(true);
        setB("below");
      }, 2900),
      window.setTimeout(() => {
        setSnapB(false);
        setA("above");
        setB("in");
      }, 2960),
    );
  };

  const onLeave = () => {
    clear();
    setSnapB(false);
    setA("below");
    setB("in");
  };

  useEffect(() => clear, []);
  useEffect(() => {
    if (active) onEnter();
    else onLeave();
    return clear;
  }, [active]);

  const move = (st: GroupState, delay = 0, snap = false) => ({
    transform: st === "in" ? "translateY(0)" : st === "above" ? "translateY(-260%)" : "translateY(260%)",
    opacity: st === "in" ? 1 : 0,
    filter: st === "in" ? "blur(0)" : `blur(${tokens.spacingHorizontalXXS})`,
    // Reset the hidden group immediately; a stagger here would animate it downward
    // before its upward re-entry begins.
    transitionDelay: snap ? "0s" : `${delay}ms`,
    transitionDuration: snap ? "0s" : undefined,
  });

  const columns = (pal: string[][], st: GroupState, top: string, snap = false) =>
    pal.map((col, i) => (
      <div key={i} data-group={pal === PAL_A ? "a" : "b"} className={mergeClasses(f.el, f.col)} style={{ left: `${3 + i * 20}%`, top, ...move(st, i * 90, snap) }}>
        {col.map((c, k) => (
          <span key={k} className={f.shade} style={{ backgroundColor: c }} />
        ))}
      </div>
    ));

  return (
    <div className={mergeClasses("explorer-preview explorer-foundation-source", s.preview, f.root)} data-state={`${a}/${b}`}>
      {/* Group A */}
      {columns(PAL_A, a, "40%")}
      <div className={f.el} style={{ left: "26%", top: "14%", ...move(a, 80) }}>
        <Switch checked={a === "in"} aria-label="Demo toggle" />
      </div>
      <div className={f.el} style={{ left: "64%", top: "12%", ...move(a, 100) }}>
        <Button icon={<Image16Regular />}>Button</Button>
      </div>
      <div className={mergeClasses(f.el, f.search)} style={{ left: "48%", top: "82%", ...move(a, 260) }}>
        Type to search <ChevronDown16Regular />
      </div>

      {/* Group B (default) */}
      {columns(PAL_B, b, "8%", snapB)}
      <img
        className={mergeClasses(f.el, f.composer)}
        style={{ left: "0%", top: "40%", ...move(b, 160, snapB) }}
        src={expensesImg}
        alt="Your expenses"
      />
      <div className={f.el} style={{ left: "64%", top: "80%", ...move(b, 220, snapB) }}>
        <Button icon={<Image16Regular />}>Button</Button>
      </div>
    </div>
  );
};


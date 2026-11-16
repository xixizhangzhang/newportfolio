import { useEffect, useState } from "react";
const TYPE_TEXT =
  "Start with user intent.\nShape every response,\naction, and surface.\nTurn business tasks into\ncoherent ERP experiences.";
const SEL_START = TYPE_TEXT.indexOf("Shape");
const SEL_END = TYPE_TEXT.indexOf(" surface.") + " surface.".length;

type TypePhase = "rest" | "caret" | "type" | "select" | "done";

const TypingPreview = ({ active = false }: { active?: boolean }) => {
  const s = { preview: "explorer-preview", typeWrap: "explorer-type-wrap", typeText: "explorer-type-text", handleStart: "explorer-handle-start", handleEnd: "explorer-handle-end", sel: "explorer-selection", caret: "explorer-caret" };
  const [phase, setPhase] = useState<TypePhase>("rest");
  const [count, setCount] = useState(TYPE_TEXT.length);
  const [selEnd, setSelEnd] = useState(SEL_END);

  useEffect(() => {
    let t: number | undefined;
    if (phase === "caret") {
      t = window.setTimeout(() => setPhase("type"), 1200);
    } else if (phase === "type") {
      if (count < TYPE_TEXT.length) t = window.setTimeout(() => setCount((c) => c + 1), 28);
      else t = window.setTimeout(() => setPhase("select"), 500);
    } else if (phase === "select") {
      if (selEnd < SEL_END) t = window.setTimeout(() => setSelEnd((e) => e + 1), 14);
      else setPhase("done");
    }
    return () => window.clearTimeout(t);
  }, [phase, count, selEnd]);

  const onEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCount(0);
    setSelEnd(SEL_START);
    setPhase("caret");
  };
  const onLeave = () => {
    setCount(TYPE_TEXT.length);
    setSelEnd(SEL_END);
    setPhase("rest");
  };

  useEffect(() => {
    if (active) onEnter();
    else onLeave();
  }, [active]);

  const shown = TYPE_TEXT.slice(0, count);
  const selecting = phase === "rest" || phase === "select" || phase === "done";
  const end = Math.min(selEnd, SEL_END);
  const a = selecting ? shown.slice(0, SEL_START) : shown;
  const b = selecting ? shown.slice(SEL_START, end) : "";
  const c = selecting ? shown.slice(end) : "";


  return (
    <div className={s.preview}>
      <div className={s.typeWrap}>
        <p className={s.typeText}>
          {a}
          {selecting && <span className={s.handleStart} />}
          {b && <span className={s.sel}>{b}</span>}
          {selecting && end > SEL_START && <span className={s.handleEnd} />}
          {c}
          {(phase === "caret" || phase === "type") && <span className={s.caret} />}
        </p>
      </div>
    </div>
  );
};


export default TypingPreview;

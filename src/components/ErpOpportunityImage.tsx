import { useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  scrollRoot: RefObject<HTMLDivElement>;
  label: string;
  className?: string;
  expand?: boolean;
}

// Renders live content at a fixed design width and scales it, so text stays sharp at every zoom level.
export default function ErpOpportunityImage({ children, scrollRoot, label, className, expand = true }: Props) {
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scrollRoot.current;
    const figure = figureRef.current;
    if (!root || !figure) return;
    let frame = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const content = figure.querySelector<HTMLElement>(".erp-scaled-content");
    const live = figure.querySelector<HTMLElement>(".erp-scaled-live");
    const measure = () => {
      const designWidth = content?.offsetWidth ?? 0;
      const ratio = designWidth ? (content!.offsetHeight / designWidth) : 0;
      const bounds = figure.getBoundingClientRect();
      const viewport = root.getBoundingClientRect();
      const baseWidth = figure.clientWidth;
      const fullWidth = root.clientWidth;
      const viewportHeight = root.clientHeight;
      if (!ratio) return;
      figure.style.setProperty("--opportunity-design-width", `${designWidth}px`);
      figure.style.setProperty("--opportunity-base-height", `${baseWidth * ratio}px`);
      figure.style.setProperty("--opportunity-base-scale", `${baseWidth / designWidth}`);
      const apply = (width: number, left: number, top: number, hold: number) => {
        const holdValue = `${Math.round(hold)}px`;
        if (figure.style.getPropertyValue("--opportunity-hold-space") !== holdValue) figure.style.setProperty("--opportunity-hold-space", holdValue);
        // Transform-only updates stay on the compositor, avoiding per-frame layout and flicker.
        if (live) live.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${width / designWidth})`;
      };
      if (!expand || motion.matches || window.innerWidth <= 900) {
        apply(baseWidth, 0, 0, 0);
        return;
      }
      const baseHeight = baseWidth * ratio;
      const fullHeight = fullWidth * ratio;
      const ramp = viewportHeight / 2;
      const dwell = viewportHeight / 4;
      const readEnd = Math.max(0, fullHeight - viewportHeight);
      const pinLength = dwell + ramp;
      const offset = viewport.top - bounds.top;
      const entry = (viewport.bottom - bounds.top) / ramp;
      const exit = 1 - Math.max(0, offset - readEnd - dwell) / ramp;
      const progress = Math.max(0, Math.min(1, entry, exit));
      const eased = progress * progress * (3 - 2 * progress);
      const width = baseWidth + (fullWidth - baseWidth) * eased;
      const pinned = Math.max(0, Math.min(offset - readEnd, pinLength));
      apply(width, (viewport.left - bounds.left) * eased, pinned + (offset > readEnd + dwell ? fullHeight - width * ratio : 0), fullHeight + pinLength - baseHeight);
    };
    // Measure in the scroll event itself so the map moves in the same frame as the page.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      measure();
    };
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(onResize);
    resize.observe(root);
    if (content) resize.observe(content);
    root.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", onScroll);
    figure.addEventListener("load", onResize, true);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      root.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", onScroll);
      figure.removeEventListener("load", onResize, true);
    };
  }, [scrollRoot, expand]);

  return <figure ref={figureRef} className={`erp-stage-figure erp-opportunity-figure ${className ?? ""}`} aria-label={label}>
    <div className="erp-opportunity-base" aria-hidden="true"><div className="erp-scaled-content">{children}</div></div>
    <div className="erp-opportunity-full-width"><div className="erp-scaled-live">{children}</div></div>
  </figure>;
}

import { useEffect, useRef, useState } from "react";
import { Button, Caption1, ProgressBar } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowLeft20Regular, ArrowRight20Regular } from "@fluentui/react-icons";
import Index from "./Index";
import RideScene from "@/components/RideScene";
import { careerIndex, careerStops } from "@/lib/career";
import "./ride.css";

function CareerRide() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const track = trackRef.current;
    const root = track?.closest<HTMLElement>(".portfolio-main");
    if (!track || !root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const sync = () => {
      const top = track.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      const travel = track.offsetHeight - root.clientHeight;
      setProgress(Math.max(0, Math.min(1, (root.scrollTop - top) / Math.max(1, travel))));
    };
    motion(); sync();
    root.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    media.addEventListener("change", motion);
    return () => { root.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); media.removeEventListener("change", motion); };
  }, []);
  const index = careerIndex(progress);
  const stop = careerStops[index];
  const jump = (i: number) => {
    const track = trackRef.current;
    const root = track?.closest<HTMLElement>(".portfolio-main");
    if (!track || !root) return;
    const top = track.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
    root.scrollTo({ top: top + (track.offsetHeight - root.clientHeight) * careerStops[i].at + (i === 0 ? 0 : 1), behavior: reduced ? "instant" : "smooth" });
  };
  return <>
    <div ref={trackRef} className="ride-track">
      <div className="ride-stage">
        <div className="ride-frame">
          <div className="ride-visual"><RideScene progress={progress} started={progress > 0.01} stations={careerStops.map(s => s.at)} scenery={stop.scenery} reduced={reduced} /></div>
          <div className="ride-career-node" aria-live="polite" aria-atomic="true">
            <ProgressBar className="ride-career-progress" value={progress} max={1} aria-label="Career journey progress" />
            <div><span className="portfolio-kicker">{stop.period}</span><h3 className="ride-company">{stop.company}</h3><p className="ride-role">{stop.role}</p><Caption1>{stop.detail}</Caption1></div>
            <div className="ride-node-actions"><Button shape="circular" icon={<ArrowLeft20Regular />} aria-label="Previous career stop" disabled={index === 0} onClick={() => jump(index - 1)} /><Button shape="circular" icon={<ArrowRight20Regular />} aria-label="Next career stop" disabled={index === careerStops.length - 1} onClick={() => jump(index + 1)} /></div>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default function Ride() { return <Index aboutContent={<CareerRide />} />; }

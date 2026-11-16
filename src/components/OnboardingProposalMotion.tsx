import { useEffect, useRef, useState } from "react";
import recording from "@/assets/groupm-proposal-updated.mp4.asset.json";
import poster from "@/assets/groupm-proposal-updated.jpg.asset.json";

export default function OnboardingProposalMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else void video.play().catch(() => undefined);
  }, [reducedMotion]);
  return <video ref={videoRef} className="w-full" src={recording.url} poster={poster.url} autoPlay={!reducedMotion} muted loop playsInline controls={reducedMotion} preload="metadata" aria-label="Original recording of the single-page data onboarding proposal" />;
}

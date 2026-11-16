import { useEffect, useRef, useState } from "react";
import { Caption1 } from "@fluentui/react-components";
import search from "@/assets/traceability-search.mp4.asset.json";
import searchPoster from "@/assets/traceability-search.jpg.asset.json";
import loading from "@/assets/traceability-loading.mp4.asset.json";
import loadingPoster from "@/assets/traceability-loading.jpg.asset.json";
import activities from "@/assets/traceability-activities.mp4.asset.json";
import activitiesPoster from "@/assets/traceability-activities.jpg.asset.json";

const recordings = {
  "trace-search": { video: search.url, poster: searchPoster.url, label: "Locate the seat frame within a defective bicycle", caption: "Search locates the seat frame while preserving its relationship to the bicycle." },
  "trace-loading": { video: loading.url, poster: loadingPoster.url, label: "Progressively load finished products affected by the seat frame", caption: "Finished items appear progressively while the affected-product search continues." },
  "trace-process": { video: activities.url, poster: activitiesPoster.url, label: "Investigate the seat frame production activities", caption: "Production activities provide evidence for investigating possible causes." },
};

export type TraceabilityMotionKind = keyof typeof recordings;

export default function TraceabilityMotion({ kind }: { kind: TraceabilityMotionKind }) {
  const recording = recordings[kind];
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
  return <figure className="traceability-final-evidence"><video ref={videoRef} className="w-full" src={recording.video} poster={recording.poster} autoPlay={!reducedMotion} muted loop playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="metadata" aria-label={recording.label} /><figcaption><Caption1>{recording.caption}</Caption1></figcaption></figure>;
}
import type { LegacyProjectId } from "@/content/legacy-projects";
import { TraceabilityCover } from "./TraceabilityEvidence";
import "./legacy-project-cover.css";

export default function LegacyProjectCover({ project, relationship = false }: { project: LegacyProjectId; relationship?: boolean }) {
  if (project === "traceability") return <TraceabilityCover />;
  const data = project === "data-onboarding";
  if (!data && relationship) return <svg className="legacy-cover legacy-delivery-relationship" viewBox="0 0 960 540" role="img" aria-label="Customer sending messages to the food provider and rider">
    <path className="legacy-delivery-connections" d="M300 190H660M260 250L400 365M700 250L560 365" />
    <path className="legacy-delivery-message legacy-delivery-message-top" d="M-10 0H10" />
    <path className="legacy-delivery-message legacy-delivery-message-left" d="M-10 0H10" />
    <g className="legacy-delivery-node">
      <circle cx="220" cy="190" r="80" /><circle cx="220" cy="168" r="21" /><path d="M180 220c0-40 80-40 80 0" />
      <circle className="legacy-delivery-receiver legacy-delivery-receiver-provider" cx="740" cy="190" r="80" />
      <g transform="translate(0 25)"><path d="M719 162v-15c-16-4-16-23 0-25 5-14 26-14 31 0 18-6 29 16 11 25v15Zm0 0h42m-42 0v8a21 21 0 0 0 42 0v-8M700 220c0-40 80-40 80 0m-50-28 10 10 10-10m-10 10v18" /></g>
      <circle className="legacy-delivery-receiver legacy-delivery-receiver-rider" cx="480" cy="390" r="80" />
      <g className="legacy-delivery-rider-art">
        <circle cx="439" cy="431" r="14" /><circle cx="527" cy="431" r="14" />
        <path d="M420 418q12-22 43-14l21 14H527M506 375h6l15 43M454 431H512" />
        <path d="M417 369h31v26h-31Z" />
        <path d="M460 346a15 15 0 0 1 30 0h-30m4 0v7a12 12 0 0 0 24 0v-7m-20 18q-14 12-11 33l27 9v12M467 374l18 9 21-8" />
      </g>
    </g>
    <text className="legacy-delivery-label" x="220" y="302">Customer</text>
    <text className="legacy-delivery-label" x="740" y="302">Food provider</text>
    <text className="legacy-delivery-label" x="480" y="505">Rider</text>
  </svg>;
  return <svg className={`legacy-cover${data ? " legacy-cover-data" : ""}`} viewBox="0 0 960 540" role="img" aria-label={data ? "Multiple data sources flowing into one shared database" : "Customer, food provider and rider connected through a coordinated delivery service"}>
    {!data && <rect className="legacy-cover-ground" width="960" height="540" />}
    {data ? <>
      <g className="legacy-data-sources">
        <rect x="130" y="70" width="140" height="100" /><path d="M155 100h90m-90 22h65m-65 22h80" />
        <rect x="130" y="220" width="140" height="100" /><path d="M155 248h90m-90 22h90m-90 22h90m-60-44v44m30-44v44" />
        <rect x="130" y="370" width="140" height="100" /><path d="m158 405 15 15-15 15m30 0 15-30m20 0-15 15 15 15" />
      </g>
      <path className="legacy-data-track" d="M270 120C430 120 435 270 620 270M270 270H620M270 420C430 420 435 270 620 270" />
      <circle className="legacy-data-packet legacy-data-packet-top" r="7" />
      <circle className="legacy-data-packet legacy-data-packet-middle" r="7" />
      <circle className="legacy-data-packet legacy-data-packet-bottom" r="7" />
      <g className="legacy-data-store"><path d="M620 210v145c0 24 200 24 200 0V210" /><ellipse cx="720" cy="210" rx="100" ry="28" /><path d="M620 260c0 24 200 24 200 0m-200 48c0 24 200 24 200 0" /></g>
    </> : <>
      <path className="legacy-cover-route" d="M270 270C350 270 350 150 440 150M270 270C360 270 350 400 660 400M610 170C700 170 740 230 740 280" />
      <g className="legacy-cover-source"><rect x="110" y="155" width="150" height="255" /><path d="M160 180h50m-75 190h100" /><rect x="130" y="215" width="108" height="65" /><path d="m175 235 12 12 25-25" /></g>
      <g className="legacy-cover-center"><path d="M430 205h190m-175-20a80 80 0 0 1 160 0m-80-90v15" /><rect x="450" y="230" width="150" height="75" /><path d="M470 253h110m-110 25h70" /></g>
      <g><circle cx="700" cy="370" r="53" /><circle cx="845" cy="370" r="53" /><path d="m700 370 60-80 85 80H700m60-80 35 80 40-110h25m-105 15h-30" /><rect x="690" y="115" width="170" height="90" /><path d="M710 145h130m-130 28h90" /></g>
    </>}
  </svg>;
}
import { CheckmarkCircle24Filled } from "@fluentui/react-icons";
import discover1 from "@/assets/erp-current-discover-1.png.asset.json";
import discover2 from "@/assets/erp-current-discover-2.png.asset.json";
import onboard1 from "@/assets/erp-current-onboard-1.png.asset.json";
import onboard2 from "@/assets/erp-current-onboard-2.png.asset.json";
import observe1 from "@/assets/erp-current-observe-1.png.asset.json";
import observe2 from "@/assets/erp-current-observe-2.png.asset.json";
import optimize1 from "@/assets/erp-current-optimize-1.png.asset.json";
import sunset1 from "@/assets/erp-current-sunset-1.png.asset.json";
import sunset2 from "@/assets/erp-current-sunset-2.png.asset.json";

type Cell = string[] | "ok" | null;
interface Stage {
  phase: string;
  persona: string;
  touch: string;
  need: string[];
  images: string[];
  gaps: Cell;
  opportunity: Cell;
  urgent?: string[];
}

const stages: Stage[] = [
  { phase: "Discover", persona: "Team manager and End user", touch: "F&O or power apps", need: ["When I get agent work for my team, I'd like to learn it at the right moment."], images: [discover1.url, discover2.url], gaps: "ok", opportunity: "ok" },
  { phase: "Onboard", persona: "Team manager and End user", touch: "F&O or power apps", need: ["When preparing agent to contribute, I want to equip it with relevant knowledge and tools, so it can perform effectively in its role.", "I want to observe its behaviour in realistic scenarios, so I can assess its reliability and fit. (and fine-tune it before it gets live ?)"], images: [onboard1.url, onboard2.url], gaps: ["No low-stakes sandbox / trial path before broad rollout", "Limited visibility into how a role's workflow & KPIs actually change", "Lack of chance to add knowledge and norms for agent to perform task as expected."], opportunity: ["Onboarding page with visibility to value, workflow, knowledge management, and simulation, which assistant with chat."] },
  { phase: "Work", persona: "ERP agents", touch: "", need: ["Actively work on tasks"], images: [], gaps: null, opportunity: null },
  { phase: "Observe and monitor", persona: "End user, Domain admin, BDM", touch: "F&O or power apps", need: ["When agent is active, I want to understand its behavior & how it makes decisions so I can have transparency and make decisions on optimization.", "BDM - I want to understand frequently about the value and ROI"], images: [observe1.url, observe2.url], gaps: ["Reasoning concept is the one get most votes, we should build the visibility.", "Different user need different level of visibility to agent performance"], opportunity: ["In context agent reasoning", "Progressive explanation of how agent works with agent activity and agent reasoning."], urgent: ["Send email once a week to BDM about the Value and ROI", "Admin can monitor the agents to make sure agents meet with security and so on.", "Team managers can view agent job status and outcome to make sure their work are on track."] },
  { phase: "Optimize", persona: "End user", touch: "F&O or power apps", need: ["When agent is active, I want to adjust its responsibilities, permissions, or tools, so I can ensure it continues to deliver value as needs evolve."], images: [optimize1.url], gaps: "ok", opportunity: "ok" },
  { phase: "Sunset", persona: "Admin and end user", touch: "F&O or power apps", need: ["When a DW is no longer needed, I want to retire it responsibly, so I can preserve data integrity, maintain compliance, and avoid unnecessary costs."], images: [sunset1.url, sunset2.url], gaps: "ok", opportunity: "ok" },
];

function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((line) => <p key={line}>{line}</p>)}</>;
}

function Result({ cell, gap }: { cell: Cell; gap?: boolean }) {
  if (cell === "ok") return <div className="erp-map-ok"><CheckmarkCircle24Filled aria-label="No gap" /></div>;
  if (!cell) return <div />;
  return <div className={gap ? "erp-map-gap" : "erp-map-opportunity"}><Lines lines={cell} /></div>;
}

export default function ErpOpportunityMap() {
  return (
    <div className="erp-map" role="table" aria-label="ERP agent lifecycle opportunity map">
      <div />
      <div className="erp-map-group" style={{ gridColumn: "2 / span 2" }}>Onboarding</div>
      <div />
      <div className="erp-map-group" style={{ gridColumn: "5 / span 3" }}>Management</div>

      <div className="erp-map-label">Phase</div>
      {stages.map((s) => <div key={s.phase} className="erp-map-phase">{s.phase}</div>)}

      <div className="erp-map-label">Persona</div>
      {stages.map((s) => <div key={s.phase} className="erp-map-blue">{s.persona}</div>)}

      <div className="erp-map-label">Touch points</div>
      {stages.map((s) => <div key={s.phase} className="erp-map-blue">{s.touch}</div>)}

      <div className="erp-map-label">User needs</div>
      {stages.map((s) => <div key={s.phase} className="erp-map-blue erp-map-need"><Lines lines={s.need} /></div>)}

      <div className="erp-map-label">Current ERP</div>
      {stages.map((s) => <div key={s.phase} className="erp-map-shots">{s.images.map((src) => <img key={src} src={src} alt={`Current ERP experience: ${s.phase}`} />)}</div>)}

      <div className="erp-map-label">Gaps</div>
      {stages.map((s) => <Result key={s.phase} cell={s.gaps} gap />)}

      <div className="erp-map-label">What customers said</div>
      <ul className="erp-map-quote" style={{ gridColumn: "2 / span 2" }}>
        <li>Trial — "We need to let people try it before we ask them to commit."</li>
        <li>Findability — "guidance exists but isn't surfaced in-context"</li>
      </ul>
      <div />
      <ul className="erp-map-quote" style={{ gridColumn: "5 / span 3" }}>
        <li>Reasoning — "Seeing how it thinks is what turned my team around."</li>
      </ul>

      <div className="erp-map-label">Product opportunity</div>
      {stages.map((s) => (
        <div key={s.phase} className="erp-map-stack">
          <Result cell={s.opportunity} />
          {s.urgent && <div className="erp-map-urgent"><Lines lines={s.urgent} /></div>}
        </div>
      ))}
    </div>
  );
}

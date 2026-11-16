import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Body1, Button, Card, CardHeader, ProgressBar, Subtitle2, Tab, TabList } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowLeft20Regular, ArrowUp20Regular, Beaker20Regular, Calculator20Regular, Search20Regular, DocumentSearch20Regular } from "@fluentui/react-icons";
import { adoptionFindings, lifecycleStages } from "@/content/erp-lifecycle";
import ErpLifecycleCover from "@/components/ErpLifecycleCover";
import ErpCabPresentation from "@/components/ErpCabPresentation";
import ErpOpportunityImage from "@/components/ErpOpportunityImage";
import ErpOpportunityMap from "@/components/ErpOpportunityMap";
import ErpUbbMap from "@/components/ErpUbbMap";
import "./mcp-project.css";
import "./erp-lifecycle.css";

const groups = [
  { label: "Why this mattered", chapters: [{ id: "erp-users", label: "Designing for delegation" }, { id: "erp-research", label: "Customer needs" }] },
  { label: "Key decisions", chapters: [
    { id: "erp-present-problem", label: "Make the confidence gap visible" },
    { id: "erp-visualize-gap", label: "Turn insights into product priorities" },
    { id: "erp-ubb-cost-model", label: "Make cost part of the experience" },
    { id: "erp-design", label: "Design confidence across the lifecycle" },
  ] },
  { label: "Results", chapters: [{ id: "erp-results", label: "Alignment & next steps" }] },
];
const chapters = groups.flatMap(group => group.chapters);
const chapterLabel = (id: string) => chapters.find(chapter => chapter.id === id)?.label ?? "";
const summary = [
  { label: "Context", content: <><strong>ERP capabilities are moving to super apps.</strong> This brings autonomous ERP work into an experience currently centered on chat.</> },
  { label: "Challenge", content: <>Users need <strong>confidence before delegating ERP work</strong>, with enough visibility to assess expected outcomes, value and cost.</> },
  { label: "What I did", content: <>I collaborated on customer workshops, synthesized insights, designed and tested lifecycle concepts, and aligned the direction with PM and partner teams.</> },
  { label: "Progress", content: <><strong>PM began roadmap planning</strong>, and <strong>leadership supported the direction</strong>. Weekly alignment with the super apps team now supports implementation planning.</> },
];
const findingIcons = [
  <Beaker20Regular />,
  <Calculator20Regular />,
  <Search20Regular />,
  <DocumentSearch20Regular />,
];

export default function ErpLifecycleProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const navigationTarget = useRef<{ id: string; top: number } | null>(null);
  const [active, setActive] = useState<string>(chapters[0].id);
  const [progress, setProgress] = useState(0);
  const returnTo = location.state?.returnTo === "/#work" ? "/#work" : "/ride#work";
  const close = () => navigate(returnTo);
  const scrollTo = (id?: string) => {
    const root = pageRef.current;
    if (!root) return;
    const target = id ? root.querySelector(`#${id}`) : null;
    const top = target ? target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop : 0;
    const destination = Math.max(0, Math.min(root.scrollHeight - root.clientHeight, top));
    navigationTarget.current = id ? { id, top: destination } : null;
    if (id) setActive(id);
    root.scrollTo({ top: destination, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const sync = () => {
      let current: string = chapters[0].id;
      for (const chapter of chapters) {
        const section = root.querySelector(`#${chapter.id}`);
        if (section && section.getBoundingClientRect().top - root.getBoundingClientRect().top <= 1) current = chapter.id;
      }
      if (Math.ceil(root.scrollTop + root.clientHeight) >= root.scrollHeight) current = chapters[chapters.length - 1].id;
      const target = navigationTarget.current;
      if (target && Math.abs(root.scrollTop - target.top) <= 2) current = target.id;
      else if (target) navigationTarget.current = null;
      setActive(current);
      setProgress(root.scrollHeight > root.clientHeight ? root.scrollTop / (root.scrollHeight - root.clientHeight) : 0);
    };
    root.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => root.removeEventListener("scroll", sync);
  }, []);

  return <div className="mcp-page erp-lifecycle-page portfolio-monochrome-theme">
    <div className="mcp-document" ref={pageRef} role="region" aria-label="ERP lifecycle project story" tabIndex={0}>
      <header className="mcp-topbar"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button></header>
      <main className="mcp-document-inner">
        <header className="mcp-project-introduction">
          <div className="mcp-copy"><span className="mcp-section-index">Microsoft / ERP automation</span><h1 className="mcp-project-title">ERP Agent Lifecycle in Super Apps</h1><p className="mcp-project-description">I translated customer insights into a lifecycle that makes expected outcomes, cost and activity visible from discovery through optimization, helping users build confidence before delegating work and sustain it during use.</p></div>
          <dl className="mcp-project-facts"><div><dt>Company</dt><dd>Microsoft · ERP automation</dd></div><div><dt>Role &amp; Year</dt><dd>Senior UX Designer · 2026</dd></div><div><dt>Focus</dt><dd>Discovery · Onboarding · Monitoring · Optimization</dd></div></dl>
        </header>
        <div className="mcp-project-cover"><ErpLifecycleCover /></div>
        <section className="mcp-short-version" aria-labelledby="erp-short-title">
          <div className="mcp-summary-heading"><h2 id="erp-short-title">The short version</h2></div>
          <div className="mcp-summary-grid">{summary.map(item => <Card key={item.label} appearance="filled" size="large"><CardHeader header={<Subtitle2>{item.label}</Subtitle2>} /><Body1>{item.content}</Body1></Card>)}</div>
        </section>
        <div className="mcp-long-story">
          <nav className="mcp-chapter-nav" aria-label="Case study navigation"><ProgressBar max={1} value={progress} aria-label="Reading progress" /><TabList vertical selectedValue={active} onTabSelect={(_, data) => scrollTo(String(data.value))} aria-label="Project chapters">{groups.map(group => <div key={group.label} className="mcp-chapter-group"><span className="mcp-section-index">{group.label}</span>{group.chapters.map(chapter => <Tab key={chapter.id} value={chapter.id}>{chapter.label}</Tab>)}</div>)}</TabList></nav>
          <div className="mcp-story-flow">
            <section id="erp-users" className="mcp-story-section" aria-labelledby="erp-users-title">
              <div className="mcp-copy">
                <h2 id="erp-users-title">{chapterLabel("erp-users")}</h2>
                <p>Leadership’s direction of <strong>“Copilot as the UI of AI”</strong> brings ERP capabilities toward super apps, where users can work with AI in one place.</p>
                <p><strong>ERP users are task-led.</strong> Alongside completing tasks through chat, they can delegate recurring work to agents. This project focuses on <strong>delegation scenarios</strong>, where automations carry out configured tasks in the background.</p>
                <p>The experience needs to support that ongoing work, with <strong>agents handling routine cases</strong> and surfacing actionable insights or cases for review when <strong>the user’s judgment or action is needed</strong>.</p>
              </div>
            </section>
            <section id="erp-research" className="mcp-story-section" aria-labelledby="erp-research-title">
              <div className="mcp-copy">
                <span className="mcp-section-index">Research foundation</span>
                <h2 id="erp-research-title">{chapterLabel("erp-research")}</h2>
                <p>ERP agents are already available in Finance and Operations (F&amp;O), but <strong>their adoption in F&amp;O remains low</strong>. Bringing them to super apps requires understanding what customers need to feel confident delegating work.</p>
                <p>In late May 2026, I collaborated with another designer and a researcher to run Customer Advisory Board workshops with <strong>15 online participants and 11 in-person participants</strong>. I focused on two questions: <strong>what customers need to know at each stage of the agent lifecycle, and who decides whether to adopt</strong>.</p>
                <p>In delegation scenarios, agents work on schedules or triggers, often without the user present. The CAB workshops highlighted customers’ need to understand <strong>expected outcomes, reasoning, value and cost</strong> before committing.</p>
                <p><strong>The gap was not capability, but the visibility customers needed to build confidence and trust.</strong></p>
                <p>My design response was to <strong>bring that visibility forward</strong>, helping customers assess the agent before committing and stay informed once it is running, without having to supervise every task.</p>
              </div>
              <div className="erp-findings-grid">{adoptionFindings.map((item, index) => {
                return <Card key={item.label} size="large">
                  <div className="erp-finding-content">
                    <span className="erp-finding-icon" aria-hidden="true">{findingIcons[index]}</span>
                    <div className="erp-finding-copy">
                      <Subtitle2>{item.label}</Subtitle2>
                      <Body1>{item.finding}</Body1>
                    </div>
                  </div>
                </Card>;
              })}</div>
            </section>
            <section id="erp-present-problem" className="mcp-story-section" aria-labelledby="erp-present-problem-title">
              <div className="mcp-copy">
                <span className="mcp-section-index">Key decisions</span>
                <h2 id="erp-present-problem-title">{chapterLabel("erp-present-problem")}</h2>
                <p>Workshop notes alone would not change product priorities. Together, the three of us turned the CAB results into <strong>one shared story of where confidence breaks across the agent lifecycle</strong>.</p>
                <p>The presentation connected Discovery, Deploy, Onboarding and Monitoring with <strong>who makes the adoption decision and what they need to understand</strong>. It gave stakeholders a shared view of customer needs across the lifecycle.</p>
                <p>Stakeholders and leadership <strong>recognized the findings, but recognition did not put them on the roadmap</strong>. I needed to turn the research into specific places where the product could change.</p>
              </div>
              <ErpCabPresentation />
            </section>
            <section id="erp-visualize-gap" className="mcp-story-section erp-wide-evidence" aria-labelledby="erp-visualize-gap-title">
              <div className="mcp-copy">
                <h2 id="erp-visualize-gap-title">{chapterLabel("erp-visualize-gap")}</h2>
                <p>To bridge that gap, I focused on <strong>downstream onboarding and management, with the end user’s experience at the center</strong>.</p>
                <p>I mapped customer needs against the existing ERP experience, connecting <strong>what customers said, where visibility fell short, and the product opportunities that followed</strong>. This translated the research into specific changes users would encounter before and after delegating work.</p>
                <p>The map gave me <strong>a concrete set of onboarding and management priorities to align on with PM</strong>, rather than another research summary.</p>
              </div>
              <ErpOpportunityImage scrollRoot={pageRef} label="ERP lifecycle opportunity map comparing end user needs, current experiences, visibility gaps, customer feedback and product opportunities across onboarding and management."><ErpOpportunityMap /></ErpOpportunityImage>
            </section>
            <section id="erp-ubb-cost-model" className="mcp-story-section erp-wide-evidence" aria-labelledby="erp-ubb-cost-model-title">
              <div className="mcp-copy">
                <h2 id="erp-ubb-cost-model-title">{chapterLabel("erp-ubb-cost-model")}</h2>
                <p>At this turning point, ERP was also moving from seat-based pricing to <strong>usage-based billing</strong>. This created an opportunity to bring <strong>cost and expected ROI into every lifecycle stage</strong>, helping customers assess the value of delegating work and keep it in view as agents run.</p>
                <p>I analyzed the existing chat-based UBB experience in super apps and compared it with ERP autonomous agents. <strong>Chat consumption starts with an interaction; autonomous consumption follows configured tasks running in the background.</strong> Tracking usage and remaining credits was therefore not enough. Customers needed to connect consumption with the value of the work being done.</p>
                <p>I mapped that gap across the lifecycle: <strong>estimate cost and value before adoption, track consumption as tasks run, and monitor ROI to inform adjustments afterward</strong>. This reframed billing from a usage counter into part of the confidence-building experience, giving us a clearer direction for onboarding and ongoing management.</p>
              </div>
              <ErpOpportunityImage scrollRoot={pageRef} className="erp-ubb-figure" expand={false} label="Usage-based billing comparison between chat and ERP autonomous agents."><ErpUbbMap /></ErpOpportunityImage>
            </section>
            <section id="erp-design" className="mcp-story-section" aria-labelledby="erp-design-title">
              <div className="mcp-copy"><span className="mcp-section-index">Key decisions</span><h2 id="erp-design-title">{chapterLabel("erp-design")}</h2><p>My core choice was to <strong>put visibility before commitment and sustain it during use</strong>. Users could assess an automation before activation, then stay informed without supervising every task.</p><p>I designed six connected stages, from a relevant suggestion and historical-task simulation to ongoing monitoring, informed adjustments and confirmation.</p></div>
              <div className="erp-design-flow">{lifecycleStages.map(stage => <section key={stage.id} id={stage.id} className="erp-prototype-section" aria-labelledby={`${stage.id}-title`}>
              <div className="mcp-copy"><h3 id={`${stage.id}-title`}>{stage.title}</h3><p>{stage.description}</p></div>
              <figure className="erp-stage-figure">
                <div className="erp-prototype-surface"><img className="erp-prototype-image" src={stage.image} alt={`${stage.label}: ${stage.evidence}`} loading="lazy" /></div>
                <figcaption className="erp-evidence-note"><Body1>{stage.value}</Body1></figcaption>
              </figure>
            </section>)}</div>
            </section>
            <section id="erp-results" className="mcp-story-section" aria-labelledby="erp-results-title">
              <div className="mcp-copy">
                <span className="mcp-section-index">Results</span>
                <h2 id="erp-results-title">{chapterLabel("erp-results")}</h2>
                <p>The opportunity map gave PM a concrete planning foundation. After we aligned, <strong>PM began drafting the next phase of the agent lifecycle roadmap in super apps</strong>.</p>
                <p>In October 2026, I was one of five presenters sharing the ERP in super apps direction with senior leadership, including our EVP. My part showed the lifecycle, and we <strong>gained support to move forward</strong>. I now meet weekly with the <strong>super apps team</strong> to align the experience and plan implementation.</p>
                <p>I also collaborated with <strong>Daybreak, the team responsible for the usage-based billing cost model in super apps</strong>, to connect the ERP proposal with their billing direction while accounting for autonomous work.</p>
                <p>These are <strong>planning and collaboration milestones</strong>. The experience is not yet available in super apps, and production adoption and impact remain to be assessed.</p>
              </div>
            </section>
          </div>
        </div>
        <footer className="mcp-footer"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button><Button appearance="transparent" icon={<ArrowUp20Regular />} onClick={() => scrollTo()}>Back to top</Button></footer>
      </main>
    </div>

  </div>;
}
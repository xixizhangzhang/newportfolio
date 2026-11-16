import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, ProgressBar, Tab, TabList } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowLeft20Regular, ArrowUp20Regular } from "@fluentui/react-icons";
import McpProjectVisual from "@/components/McpProjectVisual";
import McpProjectIntroduction from "@/components/McpProjectIntroduction";
import McpDesignPrinciplesContent from "@/components/McpDesignPrinciplesContent";
import McpIdentityPrinciple from "@/components/McpIdentityPrinciple";
import McpTrustPrinciple from "@/components/McpTrustPrinciple";
import McpBuildingBlocks from "@/components/McpBuildingBlocks";
import McpDesignLanguage from "@/components/McpDesignLanguage";
import McpContributionFlow from "@/components/McpContributionFlow";
import workspaceEvidence from "@/assets/mcp-test-workspace.png.asset.json";
import "./mcp-project.css";

const intentSections = [
  { id: "mcp-intent", label: "Intent", title: "Start from user intent.", description: "A record alone does not tell us what experience to generate: finding it, comparing it, and acting on it are different tasks. I made intent the first design decision, connecting the user’s goal to the response and interaction they need.", example: "" },
  { id: "mcp-fit", label: "Fit", title: "Match depth and width to density and complexity.", description: "Chat can make a result easy to access, but it is not always enough to work through it. I used density, complexity, and evidence needs to distinguish a conversational answer from a structured review or workspace, rather than forcing every task into chat.", example: "" },
  { id: "mcp-continuity", label: "Continuity", title: "Continue the task, not start over.", description: "Moving into a detail pane should not mean starting the task again. I treated selections, draft edits, and evidence as part of the task—not as state owned by a single surface—so the work can continue across views.", example: "" },
  { id: "mcp-trust", label: "Trust", title: "Make review and confirmation explicit.", description: "A confident response is not enough when a task touches money, policy, or approval. I made reasons, evidence, and explicit confirmation part of the experience, giving users a basis for reviewing a result before committing to an action.", example: "" },
  { id: "mcp-identity", label: "Identity", title: "Preserve semantic identity across surfaces.", description: "Different views need different layouts, but the meaning of a record should not change with its presentation. I separated adaptable presentation from stable entity, status, and action semantics so the same task stays recognizable across surfaces.", example: "" },
];
const chapterGroups = [
  { label: "Why this mattered", chapters: [{ id: "mcp-product-context", label: "One task, different products" }, { id: "mcp-context", label: "Beyond a fixed screen" }] },
  { label: "Key decisions", chapters: [{ id: "mcp-workshop", label: "The Expense pilot" }, { id: "mcp-solution", label: "Guide with principles. Build with blocks." }, { id: "mcp-intent", label: "Design principles" }, { id: "mcp-building-blocks", label: "Storybook" }, { id: "mcp-output", label: "Scenario testing" }] },
  { label: "Results", chapters: [{ id: "mcp-results", label: "Framework & contribution" }] },
];
const chapters = chapterGroups.flatMap(group => group.chapters);
const chapterLabel = (id: string) => chapters.find(chapter => chapter.id === id)?.label ?? "";
export default function McpProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const navigationTarget = useRef<{ id: string; top: number } | null>(null);
  const [active, setActive] = useState(chapters[0].id);
  const [selectedPrinciple, setSelectedPrinciple] = useState("mcp-intent");
  const principle = intentSections.find(item => item.id === selectedPrinciple) ?? intentSections[0];
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
      let current = chapters[0].id;
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
  return <div className="mcp-page portfolio-monochrome-theme">
    <div className="mcp-document" ref={pageRef} role="region" aria-label="Project story" tabIndex={0}>
      <header className="mcp-topbar"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button></header>
      <main className="mcp-document-inner">
        <McpProjectIntroduction />
        <div className="mcp-long-story">
          <nav className="mcp-chapter-nav" aria-label="Case study navigation">
            <ProgressBar max={1} value={progress} aria-label="Reading progress" />
            <TabList vertical selectedValue={active} onTabSelect={(_, data) => scrollTo(String(data.value))} aria-label="Project chapters">
              {chapterGroups.map(group => <div key={group.label} className="mcp-chapter-group"><span className="mcp-section-index">{group.label}</span>{group.chapters.map(chapter => <Tab key={chapter.id} value={chapter.id}>{chapter.label}</Tab>)}</div>)}
            </TabList>
          </nav>
          <div className="mcp-story-flow">
            <section id="mcp-product-context" className="mcp-story-section" aria-labelledby="mcp-product-context-title">
              <div className="mcp-copy"><span className="mcp-section-index">Product context</span><h2 id="mcp-product-context-title">{chapterLabel("mcp-product-context")}</h2><p><strong>Microsoft Dynamics 365 Finance and Operations (F&amp;O)</strong> is the primary tool ERP users work in today. It holds customers’ business data and provides the interface where users interact with that data and carry out their daily ERP tasks.</p><p>Leadership’s direction of <strong>“Copilot as the UI of AI”</strong> shifts the starting point toward Copilot, bringing tasks and business context into one place. To support this direction, F&amp;O is preparing <strong>MCP Apps</strong>, interactive ERP experiences accessed through AI products, so its ERP capabilities and interactive experiences can be accessed through Copilot and other products such as Teams.</p><p>As ERP work moves beyond F&amp;O’s own interface, users need a <strong>unified, coherent ERP experience</strong> wherever that interaction happens—not identical screens, but consistent task meaning, actions, and state.</p></div>
              <McpProjectVisual kind="surfaces" />
            </section>
            <section id="mcp-context" className="mcp-story-section" aria-labelledby="mcp-context-title">
              <div className="mcp-copy"><span className="mcp-section-index">Design problem</span><h2 id="mcp-context-title">{chapterLabel("mcp-context")}</h2><p>ERP spans many functional modules. Their experiences are shifting from <strong>deterministic interfaces designed in advance</strong> to <strong>generated experiences shaped by a user’s request</strong>. Returning the right data is only part of the challenge: the result must also help the user understand it and continue their work.</p><blockquote>How do we shape a generated experience around what the user is actually trying to do?</blockquote></div>
              <McpProjectVisual kind="context" />
            </section>
            <section id="mcp-workshop" className="mcp-story-section" aria-labelledby="mcp-workshop-title">
              <div className="mcp-copy">
                <span className="mcp-section-index">The Expense pilot</span>
                <h2 id="mcp-workshop-title">{chapterLabel("mcp-workshop")}</h2>
                <p>The challenge spanned ERP modules, but a broad framework needed a concrete starting point. <strong>I began with a pilot collaboration with the Expense team.</strong></p>
                <p>Working with the team’s designer, I used existing user <strong>jobs to be done and prototypes</strong> to map what users were trying to accomplish, what results they needed, and how they would interact with those results. We organized the expense scenarios around <strong>user intent rather than individual screens.</strong></p>
                <p>This intent mapping grounded the design principles in existing expense tasks, connecting user goals to presentation and interaction decisions.</p>
              </div>
            </section>
            <section id="mcp-solution" className="mcp-story-section" aria-labelledby="mcp-solution-title">
              <McpDesignLanguage onNavigate={scrollTo} />
            </section>
            <section id="mcp-intent" className="mcp-story-section" aria-labelledby="mcp-principles-title">
              <div className="mcp-copy"><span className="mcp-section-index">Design principles</span><h2 id="mcp-principles-title">{chapterLabel("mcp-intent")}</h2><p>Start from intent, choose the right surface, preserve the task, make review explicit, and keep meaning consistent.</p></div>
              <TabList size="large" appearance="subtle" selectedValue={selectedPrinciple} onTabSelect={(_, data) => setSelectedPrinciple(String(data.value))} aria-label="Design principles" className="mcp-principle-tabs">
                {intentSections.map(item => <Tab key={item.id} id={`${item.id}-tab`} value={item.id} aria-controls={`${item.id}-panel`}>{item.label}</Tab>)}
              </TabList>
              <div key={principle.id} id={`${principle.id}-panel`} role="tabpanel" aria-labelledby={`${principle.id}-tab`} className="mcp-principle-content">
              <div className="mcp-copy"><h3>{principle.title}</h3><p>{principle.description}</p></div>
              {principle.id === "mcp-intent" && <McpDesignPrinciplesContent kind="intent" />}
              {principle.id === "mcp-fit" && <McpDesignPrinciplesContent kind="fit" />}
              {principle.id === "mcp-continuity" && <McpDesignPrinciplesContent kind="continuity" />}
              {principle.id === "mcp-identity" && <McpIdentityPrinciple />}
              {principle.id === "mcp-trust" && <McpTrustPrinciple />}
              </div>
            </section>
            <section id="mcp-building-blocks" className="mcp-story-section" aria-labelledby="mcp-building-blocks-title">
              <div className="mcp-copy"><span className="mcp-section-index">Storybook</span><h2 id="mcp-building-blocks-title">{chapterLabel("mcp-building-blocks")}</h2><p>Principles explain what a useful experience should do, but do not supply the pieces to build it. <strong>I built a shared Storybook, a catalog of reusable components and patterns</strong>, so generated results could use common building blocks without prescribing one fixed screen for every task.</p><p><strong>Components</strong> define individual elements and their properties, states, and actions. <strong>Patterns</strong> describe how those elements work together for recurring interactions. This separates what teams can reuse from what needs to adapt to a particular user task.</p></div>
              <McpBuildingBlocks />
            </section>
            <section id="mcp-output" className="mcp-story-section" aria-labelledby="mcp-output-title">
              <div className="mcp-copy">
                <span className="mcp-section-index">Scenario testing</span>
                <h2 id="mcp-output-title">{chapterLabel("mcp-output")}</h2>
                <p>The test space lets us assess whether generated ERP experiences support <strong>real user tasks</strong>, and use what we learn to refine the guidance and building blocks.</p>
                <p>I connected <strong>F&amp;O data through MCP</strong> and enabled live <strong>AI models</strong> through an extension, bringing user intent, design principles, and Storybook components and patterns into the generation context.</p>
              </div>
              <div className="mcp-scenario-magnifier">
                <img className="mcp-scenario-evidence" src={workspaceEvidence.url} alt="Copilot customer scenario with a generated chat summary and customer workspace." />
                <div className="mcp-magnified-detail" aria-labelledby="mcp-view-built-title">
                  <h3 id="mcp-view-built-title">How this view was built</h3>
                  <dl>
                    <div><dt>Layout</dt><dd><span className="mcp-detail-link">Chat summary + Workspace</span></dd></div>
                    <div><dt>Content</dt><dd>Data grid, shown directly in Workspace</dd></div>
                    <div><dt>Components</dt><dd><span className="mcp-detail-link">Button</span>, <span className="mcp-detail-link">Grid</span>, <span className="mcp-detail-link">Header</span>, <span className="mcp-detail-link">MCP Widget</span>, <span className="mcp-detail-link">Metric</span></dd></div>
                    <div><dt>Patterns</dt><dd><span className="mcp-detail-link">Workspace panel (native)</span></dd></div>
                    <div><dt>Data coverage</dt><dd>32 / 32 matching records (complete)</dd></div>
                  </dl>
                </div>
              </div>
            </section>
            <section id="mcp-results" className="mcp-story-section" aria-labelledby="mcp-results-title">
              <div className="mcp-copy"><span className="mcp-section-index">Results</span><h2 id="mcp-results-title">{chapterLabel("mcp-results")}</h2>
                <p>I built <strong>a starting framework for generated ERP experiences</strong> and <strong>a contribution process</strong> that helps app teams bring real scenarios, reuse Storybook building blocks, test with live models, and feed what they learn back into the toolkit.</p>
                <p>This is a starting point, not a finished system. More ERP scenarios will expand the components and patterns; changes to design principles are aligned with the team first.</p>
              </div>
              <McpContributionFlow />
            </section>
          </div>
        </div>
        <footer className="mcp-footer"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button><Button appearance="transparent" icon={<ArrowUp20Regular />} onClick={() => scrollTo()}>Back to top</Button></footer>
      </main>
    </div>
  </div>;
}

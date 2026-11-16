import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Body1, Button, Card, CardHeader, ProgressBar, Subtitle2, Tab, TabList } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowLeft20Regular, ArrowUp20Regular } from "@fluentui/react-icons";
import { legacyProjects, type LegacyProjectId } from "@/content/legacy-projects";
import LegacyProjectCover from "@/components/LegacyProjectCover";
import OnboardingProposalMotion from "@/components/OnboardingProposalMotion";
import MappingDecisionTabs from "@/components/MappingDecisionTabs";
import DeliveryUrgencyTabs from "@/components/DeliveryUrgencyTabs";
import DeliveryMessageDistribution from "@/components/DeliveryMessageDistribution";
import TraceabilityEvidence from "@/components/TraceabilityEvidence";
import "./mcp-project.css";
import "./legacy-project.css";

export default function LegacyProject({ projectId }: { projectId: LegacyProjectId }) {
  const project = legacyProjects[projectId];
  const chapters = project.groups.flatMap(group => group.chapters);
  const firstChapter = chapters[0];
  const [active, setActive] = useState(firstChapter?.id ?? "");
  const [progress, setProgress] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigationTarget = useRef<{ id: string; top: number } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => navigate(location.state?.returnTo === "/#work" ? "/#work" : "/ride#work");
  const readingOffset = (root: HTMLDivElement) => {
    const nav = root.querySelector(".mcp-chapter-nav");
    if (!nav) return 0;
    const styles = getComputedStyle(nav);
    const spacing = parseFloat(getComputedStyle(root).getPropertyValue("--spacingVerticalXXL")) || 0;
    if (styles.position === "sticky") return parseFloat(styles.top) || 0;
    const topbar = projectId === "traceability" ? root.querySelector(".mcp-topbar") : null;
    return topbar ? topbar.getBoundingClientRect().bottom - root.getBoundingClientRect().top + spacing : spacing;
  };
  const scrollTo = (id?: string) => {
    const root = pageRef.current;
    if (!root) return;
    const heading = id ? root.querySelector(`#${id}-title`) : null;
    const top = Math.max(0, Math.min(root.scrollHeight - root.clientHeight, heading ? heading.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - readingOffset(root) : 0));
    navigationTarget.current = id ? { id, top } : null;
    if (id) setActive(id);
    root.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    root.scrollTop = 0;
    const sync = () => {
      let current = chapters[0]?.id ?? "";
      for (const chapter of chapters) {
        const heading = root.querySelector(`#${chapter.id}-title`);
        if (heading && heading.getBoundingClientRect().top - root.getBoundingClientRect().top <= readingOffset(root) + 2) current = chapter.id;
      }
      if (Math.ceil(root.scrollTop + root.clientHeight) >= root.scrollHeight) current = chapters.at(-1)?.id ?? current;
      const target = navigationTarget.current;
      if (target && Math.abs(root.scrollTop - target.top) <= 2) current = target.id;
      else if (target) navigationTarget.current = null;
      setActive(current);
      setProgress(root.scrollHeight > root.clientHeight ? root.scrollTop / (root.scrollHeight - root.clientHeight) : 0);
    };
    sync();
    root.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    const story = root.querySelector(".mcp-story-flow");
    if (story) observer.observe(story);
    window.addEventListener("resize", sync);
    return () => { root.removeEventListener("scroll", sync); observer.disconnect(); window.removeEventListener("resize", sync); };
  }, [projectId]);
  return <div className={`mcp-page legacy-project-page portfolio-monochrome-theme ${projectId === "data-onboarding" ? "data-onboarding-page" : projectId === "traceability" ? "traceability-page" : ""}`}>
    <div className="mcp-document" ref={pageRef} role="region" aria-label={`${project.title} project story`} tabIndex={0}>
      <header className="mcp-topbar"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button></header>
      <main className="mcp-document-inner">
        <header className="mcp-project-introduction">
          <div className="mcp-copy"><span className="mcp-section-index">{project.company}</span><h1 className="mcp-project-title">{project.title}</h1><p className="mcp-project-description">{project.introduction}</p></div>
          <dl className="mcp-project-facts"><div><dt>Company</dt><dd>{project.company}</dd></div><div><dt>Role &amp; Year</dt><dd>{project.roleYear}</dd></div><div><dt>Focus</dt><dd>{project.focus}</dd></div></dl>
        </header>
        <div className="mcp-project-cover"><LegacyProjectCover project={projectId} relationship={projectId === "delivery-im"} /></div>
        <section className="mcp-short-version" aria-labelledby="legacy-short-title">
          <div className="mcp-summary-heading"><h2 id="legacy-short-title">The short version</h2></div>
          <div className="mcp-summary-grid">{project.summary.map(item => <Card key={item.label} appearance="filled" size="large"><CardHeader header={<Subtitle2>{item.label}</Subtitle2>} /><Body1><strong>{item.highlight}</strong> {item.text}</Body1></Card>)}</div>
        </section>
        <div className="mcp-long-story">
          <nav className="mcp-chapter-nav" aria-label="Case study navigation"><ProgressBar max={1} value={progress} aria-label="Reading progress" /><TabList vertical selectedValue={active} onTabSelect={(_, data) => scrollTo(String(data.value))} aria-label="Project chapters">{project.groups.map(group => <div key={group.label} className="mcp-chapter-group"><span className="mcp-section-index">{group.label}</span>{group.chapters.map(chapter => <Tab key={chapter.id} value={chapter.id}>{chapter.label}</Tab>)}</div>)}</TabList></nav>
          <div className="mcp-story-flow">{chapters.map(chapter => <section key={chapter.id} id={chapter.id} className="mcp-story-section" aria-labelledby={`${chapter.id}-title`}>
            {chapter.id === "data-mapping" ? <><div className="mcp-copy"><h2 id={`${chapter.id}-title`}>{chapter.label}</h2></div><MappingDecisionTabs chapter={chapter} /></> : <>
            <div className="mcp-copy"><h2 id={`${chapter.id}-title`}>{projectId === "data-onboarding" ? chapter.label : chapter.title}</h2>{chapter.lead && <p><strong>{chapter.lead}</strong></p>}{chapter.paragraphs.map((paragraph, index) => <div className="legacy-story-paragraph" key={paragraph}><p>{paragraph}</p>{chapter.paragraphBullets?.afterParagraph === index && <ul className="legacy-story-list">{chapter.paragraphBullets.items.map(item => <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>)}</ul>}{chapter.images?.filter(image => image.afterParagraph === index).map(image => <figure key={image.url} className="legacy-evidence legacy-evidence-single">{chapter.id === "delivery-context" ? <DeliveryMessageDistribution /> : <img src={image.url} alt={image.alt} loading="lazy" />}{chapter.motion === "onboarding-proposal" && <OnboardingProposalMotion />}</figure>)}</div>)}{chapter.quote && <blockquote className="legacy-story-quote"><em>“{chapter.quote}”</em></blockquote>}{chapter.bullets && <ul className="legacy-story-list">{chapter.bullets.map(item => <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>)}</ul>}</div>
            {chapter.decisionTabs && <DeliveryUrgencyTabs tabs={chapter.decisionTabs} />}
            {chapter.visual && <TraceabilityEvidence kind={chapter.visual} />}
            {chapter.images?.some(image => image.afterParagraph === undefined) && <div className={`legacy-evidence${chapter.images.filter(image => image.afterParagraph === undefined).length === 1 ? " legacy-evidence-single" : ""}`}>{chapter.images.filter(image => image.afterParagraph === undefined).map(image => <figure key={image.url} className="legacy-evidence"><img src={image.url} alt={image.alt} loading="lazy" />{image.caption && <figcaption className="legacy-evidence-caption">{image.caption}</figcaption>}</figure>)}</div>}
            {chapter.highlight && <div className="mcp-copy"><p><strong>{chapter.highlight}</strong></p></div>}
            </>}
          </section>)}</div>
        </div>
        <footer className="mcp-footer"><Button appearance="transparent" icon={<ArrowLeft20Regular />} onClick={close}>All work</Button><Button appearance="transparent" icon={<ArrowUp20Regular />} onClick={() => scrollTo()}>Back to top</Button></footer>
      </main>
    </div>
  </div>;
}
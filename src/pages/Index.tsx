import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { Button, Card, Tab, TabList, Tag, Caption1, Body1, Link, Text, Tooltip } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { Home20Regular, Briefcase20Regular, Person20Regular, ArrowDown20Regular, ArrowUp20Regular, ArrowRight16Regular, Mail20Regular, Copy20Regular, Checkmark20Regular } from "@fluentui/react-icons";
import ErpLifecycleCover from "@/components/ErpLifecycleCover";
import McpExperienceCover from "@/components/McpExperienceCover";
import studioImage from "@/assets/portfolio-studio-intro.png";
import microsoftLogo from "@/assets/microsoft-logo.svg.asset.json";
import linkedinLogo from "@/assets/linkedin-logo.svg.asset.json";
import StudioScreen from "@/components/StudioScreen";
import PortraitIntroduction from "@/components/PortraitIntroduction";
import { usePortfolioAccess } from "@/components/PortfolioAccess";
import LegacyProjectCover from "@/components/LegacyProjectCover";
import { legacyProjects } from "@/content/legacy-projects";
import { portfolioEntrySection } from "@/lib/portfolio-navigation";
import "./portfolio.css";
import "./mcp-project.css";
import "./legacy-project.css";

const sections = ["home", "work", "about", "contact"] as const;
type Section = typeof sections[number];

export default function Index({ aboutContent }: { aboutContent?: React.ReactNode }) {
  const [active, setActive] = useState<Section>("home");
  const [navigationCompact, setNavigationCompact] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigationType = useNavigationType();
  const { requestAccess } = usePortfolioAccess();
  const navigateTo = (path: string, options: { state?: unknown }) => requestAccess(path, options.state);

  useEffect(() => {
    if (portfolioEntrySection(location.hash, navigationType) === "work") {
      mainRef.current?.querySelector("#work")?.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
      mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.key, location.hash, navigationType]);

  const openMcpProject = () => navigateTo("/work/mcp-apps", { state: { returnTo: `${location.pathname}#work` } });

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const syncSection = () => {
      setNavigationCompact(root.scrollTop > 80);
      const top = root.getBoundingClientRect().top;
      let current: Section = "home";
      for (const id of sections) {
        const section = root.querySelector(`#${id}`);
        if (section && section.getBoundingClientRect().top - top <= root.clientHeight / 3) current = id;
      }
      setActive(current);
    };
    root.addEventListener("scroll", syncSection, { passive: true });
    syncSection();
    return () => root.removeEventListener("scroll", syncSection);
  }, []);

  const [copied, setCopied] = useState(false);
  const copyEmail = () => { navigator.clipboard?.writeText("zhangx0303@gmail.com").then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); }); };
  const navigate = (id: Section) => {
    mainRef.current?.querySelector(`#${id}`)?.scrollIntoView({ block: "start", behavior: id === "contact" ? "instant" : window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <div className={aboutContent ? "portfolio portfolio-reference-theme" : "portfolio"}>
      {aboutContent ? <header className="portfolio-topbar" data-compact={navigationCompact}>{[false, true].map(compact => <nav key={String(compact)} ref={element => { if (compact !== navigationCompact) element?.setAttribute("inert", ""); else element?.removeAttribute("inert"); }} className={compact ? "portfolio-icon-navigation" : "portfolio-text-navigation"} aria-label="Sections" aria-hidden={compact !== navigationCompact}>
        <TabList selectedValue={active} onTabSelect={(_, data) => { const id = String(data.value); if (sections.includes(id as Section)) navigate(id as Section); }}>
          <Tooltip content="Home" relationship="label"><Tab value="home" aria-label="Home" icon={compact ? <Home20Regular /> : undefined}>{!compact && "Home"}</Tab></Tooltip>
          <Tooltip content="Work" relationship="label"><Tab value="work" aria-label="Work" icon={compact ? <Briefcase20Regular /> : undefined}>{!compact && "Work"}</Tab></Tooltip>
          <Tooltip content="About" relationship="label"><Tab value="about" aria-label="About" icon={compact ? <Person20Regular /> : undefined}>{!compact && "About"}</Tab></Tooltip>
          <Tooltip content="Contact" relationship="label"><Tab value="contact" aria-label="Contact" icon={compact ? <Mail20Regular /> : undefined}>{!compact && "Contact"}</Tab></Tooltip>
        </TabList>
      </nav>)}</header> : <aside className="portfolio-sidebar">
        <div>
          <p className="portfolio-wordmark">Xi<br />Zhang.</p>
          {!aboutContent && <p className="portfolio-kicker">A curious mind.<br />A personal collection.</p>}
        </div>
        <nav className="portfolio-nav" aria-label="Sections">
          <TabList vertical selectedValue={active} onTabSelect={(_, data) => { const id = String(data.value); if (sections.includes(id as Section)) navigate(id as Section); }}>
            <Tab value="home">Home</Tab>
            <Tab value="work">Work</Tab>
            <Tab value="about">About</Tab>
          </TabList>
        </nav>
        <div className="portfolio-sidebar-bottom">
          <div><Caption1>Phone</Caption1><br /><Link className="portfolio-contact" href="tel:6693331258">6693331258</Link></div>
          <div><Caption1>Email</Caption1><br /><Link className="portfolio-contact" href="mailto:zhangx0303@gmail.com">zhangx0303@gmail.com</Link></div>
        </div>
      </aside>}

      <main ref={mainRef} className="portfolio-main" aria-label="Xi Zhang portfolio">
        <section id="home" className="portfolio-section portfolio-home" aria-labelledby="home-title">
          {!aboutContent && <div className="portfolio-meta">
            <span className="portfolio-kicker">01 / Home</span>
          </div>}
          {aboutContent ? <PortraitIntroduction onWork={() => navigate("work")} /> : <div className="portfolio-hero">
            <div className="portfolio-hero-intro">
              <h1 id="home-title">Hi, I’m a UX Designer at Microsoft.</h1>
              <p>I turn complex problems into thoughtful, intuitive experiences.</p>
            </div>
            <img className="portfolio-hero-image" src={studioImage} alt="A line-drawn woman turning back to wave at her desk, beside a large computer with moving artwork; feet and floor remain out of view." width={1536} height={900} />
            <StudioScreen />
          </div>}
          {!aboutContent && <div className="portfolio-home-footer">
            <Caption1>Thoughtful details. A curious point of view.</Caption1>
            <Button appearance="transparent" icon={<ArrowDown20Regular />} iconPosition="after" onClick={() => navigate("work")}>Selected work</Button>
          </div>}
        </section>

        <section id="work" className="portfolio-section" aria-labelledby="work-title">
          <div className="portfolio-section-heading">
            <div>{!aboutContent && <span className="portfolio-kicker">02 / Work</span>}<h2 id="work-title" className="portfolio-heading">Featured work.</h2></div>
            {!aboutContent && <Caption1>Selected explorations / 01—02</Caption1>}
          </div>
          {aboutContent ? <div className="portfolio-work-grid portfolio-work-list" onPointerMove={event => {
            if (event.pointerType === "touch" || !(event.target instanceof Element)) return;
            const card = event.target.closest<HTMLElement>(".portfolio-work-row");
            if (!card) return;
            const bounds = card.getBoundingClientRect();
            card.style.setProperty("--work-pointer-x", `${event.clientX - bounds.left}px`);
            card.style.setProperty("--work-pointer-y", `${event.clientY - bounds.top}px`);
          }}>
            <Card appearance="subtle" focusMode="off" className="portfolio-work-row" role="link" aria-label="View Designing generated ERP experiences" tabIndex={0} onClick={openMcpProject} onKeyDownCapture={event => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openMcpProject(); } }}>
              <Link href="/work/mcp-apps" aria-label="View Designing generated ERP experiences" onClick={(event) => { event.preventDefault(); event.stopPropagation(); openMcpProject(); }}><McpExperienceCover /></Link>
              <div className="portfolio-work-summary">
                <div className="portfolio-work-identity"><img src={microsoftLogo.url} alt="Microsoft" /><Body1>Senior UX Designer · 2026</Body1></div>
                <h3 className="portfolio-work-title">Designing generated ERP experiences</h3>
                <Body1>I created design principles and a shared Storybook so generated ERP experiences stay consistent and intent-driven across Copilot, Teams, and F&amp;O.</Body1>
                <div><Link href="/work/mcp-apps" onClick={(event) => { event.preventDefault(); event.stopPropagation(); openMcpProject(); }}><span className="portfolio-case-link">View case study<ArrowRight16Regular aria-hidden="true" /></span></Link></div>
              </div>
            </Card>
            <Card appearance="subtle" focusMode="off" className="portfolio-work-row" role="link" aria-label="View ERP Agent Lifecycle in Super Apps" tabIndex={0} onClick={() => navigateTo("/work/erp-agent-lifecycle", { state: { returnTo: `${location.pathname}#work` } })} onKeyDownCapture={event => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); navigateTo("/work/erp-agent-lifecycle", { state: { returnTo: `${location.pathname}#work` } }); } }}>
              <Link href="/work/erp-agent-lifecycle" aria-label="View ERP Agent Lifecycle in Super Apps" onClick={(event) => { event.preventDefault(); event.stopPropagation(); navigateTo("/work/erp-agent-lifecycle", { state: { returnTo: `${location.pathname}#work` } }); }}><ErpLifecycleCover /></Link>
              <div className="portfolio-work-summary">
                <div className="portfolio-work-identity"><img src={microsoftLogo.url} alt="Microsoft" /><Body1>Senior UX Designer · 2026</Body1></div>
                <h3 className="portfolio-work-title">ERP Agent Lifecycle in Super Apps</h3>
                <Body1>I translated customer insights into a lifecycle that makes expected outcomes, cost and activity visible from discovery through optimization, helping users build confidence before delegating work and sustain it during use.</Body1>
                <div><Link href="/work/erp-agent-lifecycle" onClick={(event) => { event.preventDefault(); event.stopPropagation(); navigateTo("/work/erp-agent-lifecycle", { state: { returnTo: `${location.pathname}#work` } }); }}><span className="portfolio-case-link">View case study<ArrowRight16Regular aria-hidden="true" /></span></Link></div>
              </div>
            </Card>
            {[legacyProjects["traceability"], legacyProjects["delivery-im"], legacyProjects["data-onboarding"]].map(project => {
              const path = `/work/${project.id}`;
              const open = () => navigateTo(path, { state: { returnTo: `${location.pathname}#work` } });
              return <Card key={project.id} appearance="subtle" focusMode="off" className="portfolio-work-row" role="link" aria-label={`View ${project.title}`} tabIndex={0} onClick={open} onKeyDownCapture={event => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); open(); } }}>
                <Link href={path} aria-label={`View ${project.title}`} onClick={event => { event.preventDefault(); event.stopPropagation(); open(); }}><LegacyProjectCover project={project.id} relationship={project.id === "delivery-im"} /></Link>
                <div className="portfolio-work-summary">
                  <div className="portfolio-work-identity"><img src={project.companyLogo.url} alt={project.companyLogo.alt} /><Body1>{project.roleYear}</Body1></div>
                  <h3 className="portfolio-work-title">{project.title}</h3>
                  <Body1>{project.preview}</Body1>
                  <div><Link href={path} onClick={event => { event.preventDefault(); event.stopPropagation(); open(); }}><span className="portfolio-case-link">View case study<ArrowRight16Regular aria-hidden="true" /></span></Link></div>
                </div>
              </Card>;
            })}
          </div> : <div className="portfolio-work-grid">
            <Card appearance="filled" size="small" onClick={openMcpProject}>
              <McpExperienceCover />
              <div className="mcp-work-copy"><div className="mcp-work-title-group"><h3 className="mcp-work-heading">Designing generated ERP experiences</h3><Caption1>Microsoft · MCP Apps</Caption1></div><Body1>I created design principles and a shared Storybook so generated ERP experiences stay consistent and intent-driven across Copilot, Teams, and F&amp;O.</Body1></div>
            </Card>
            <Card appearance="filled" size="small" onClick={() => navigateTo("/work/erp-agent-lifecycle", { state: { returnTo: `${location.pathname}#work` } })}>
              <ErpLifecycleCover />
              <div className="mcp-work-copy"><div className="mcp-work-title-group"><h3 className="mcp-work-heading">ERP Agent Lifecycle in Super Apps</h3><Caption1>Microsoft · ERP automation</Caption1></div><Body1>I translated customer insights into a lifecycle that makes expected outcomes, cost and activity visible from discovery through optimization, helping users build confidence before delegating work and sustain it during use.</Body1></div>
            </Card>
          </div>}
        </section>

        <section id="about" className="portfolio-section" aria-labelledby="about-title">
          {aboutContent ? <><div className="portfolio-section-heading portfolio-career-heading"><div><h2 id="about-title" className="portfolio-heading">A ride through my story.</h2></div><Button as="a" href="/resume" target="_blank" rel="noreferrer" shape="circular" size="large" className="portfolio-resume-action">Resume</Button></div>{aboutContent}</> : <>
          <div className="portfolio-section-heading"><div><span className="portfolio-kicker">03 / About</span><h2 id="about-title" className="portfolio-heading">A little about me.</h2></div></div>
          <div className="portfolio-about-grid">
            <h3 className="portfolio-about-title">Always curious.<br />Always exploring.</h3>
            <div className="portfolio-about-copy">
              <p className="portfolio-description">I'm Xi Zhang. This is my corner of the internet — a collection of ideas, projects, and the details that make them personal.</p>
              <p className="portfolio-description">I enjoy exploring new perspectives and turning early ideas into something tangible.</p>
              <div className="portfolio-tags"><Tag appearance="outline">Ideas</Tag><Tag appearance="outline">Making</Tag><Tag appearance="outline">Exploration</Tag></div>
            </div>
          </div>
          <footer className="portfolio-footer"><span className="portfolio-kicker">© 2026 Xi Zhang</span><Button appearance="transparent" icon={<ArrowUp20Regular />} iconPosition="after" onClick={() => navigate("home")}>Back to top</Button></footer>
          </>}
        </section>
        {aboutContent ? <section id="contact" className="portfolio-section portfolio-contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="portfolio-heading">Let's get in touch.</h2>
          <p className="portfolio-contact-intro">I'm always happy to connect with designers, product leaders and teams shaping AI and enterprise products. Email is the fastest way to reach me.</p>
          <div className="portfolio-contact-card">
            <div className="portfolio-contact-email"><Link href="mailto:zhangx0303@gmail.com"><Text size={500}>zhangx0303@gmail.com</Text></Link><Tooltip content={copied ? "Copied" : "Copy email"} relationship="label"><Button appearance="primary" shape="circular" aria-label={copied ? "Copied" : "Copy email"} icon={copied ? <Checkmark20Regular /> : <Copy20Regular />} onClick={copyEmail} /></Tooltip></div>
            <Button as="a" href="https://www.linkedin.com/in/zhang-xi/" target="_blank" rel="noreferrer" shape="circular" size="large" icon={<img className="portfolio-linkedin-logo" src={linkedinLogo.url} alt="" />}>LinkedIn</Button>
          </div>
          <footer className="portfolio-footer ride-footer"><Button appearance="transparent" icon={<ArrowUp20Regular />} iconPosition="after" onClick={() => navigate("home")}>Back to top</Button></footer>
        </section> : null}
      </main>
    </div>
  );
}

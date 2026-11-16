import { useEffect } from "react";
import { Button, Link } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowLeft20Regular, Print20Regular, Mail16Regular, Call16Regular, Link16Regular, Globe16Regular } from "@fluentui/react-icons";
import { resumeRoles, resumeEducation, resumeSkillGroups, resumeTools } from "@/content/resume";
import "./resume.css";

export default function Resume() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Xi Zhang | Resume";
    return () => { document.title = previousTitle; };
  }, []);

  return <main className="resume-page portfolio-monochrome-theme">
    <div className="resume-document">
      <nav className="resume-actions" aria-label="Resume actions">
        <Button as="a" href="/ride#contact" appearance="transparent" icon={<ArrowLeft20Regular />}>Portfolio</Button>
        <Button appearance="subtle" icon={<Print20Regular />} onClick={() => window.print()}>Print</Button>
      </nav>
      <div className="resume-layout">
      <aside className="resume-sidebar">
      <header className="resume-header">
        <h1>Xi Zhang</h1>
        <div className="resume-contacts">
          <div><Mail16Regular aria-hidden="true" /><Link href="mailto:zhangx0303@gmail.com">zhangx0303@gmail.com</Link></div>
          <div><Call16Regular aria-hidden="true" /><Link href="tel:+16693331258">669-333-1258</Link></div>
          <div><Link16Regular aria-hidden="true" /><Link href="https://www.linkedin.com/in/zhang-xi/" target="_blank" rel="noopener noreferrer">linkedin.com/in/zhang-xi</Link></div>
          <div><Globe16Regular aria-hidden="true" /><Link href="/" target="_blank" rel="noopener noreferrer">Portfolio</Link></div>
        </div>
      </header>
      <section className="resume-section resume-education" aria-labelledby="resume-education">
        <h2 id="resume-education">Education</h2>
        {resumeEducation.map(item => <article key={item.school}><h3>{item.school}</h3><p>{item.degree}</p></article>)}
      </section>
      <section className="resume-section resume-skills" aria-labelledby="resume-skills">
        <h2 id="resume-skills">Skills</h2>
        {resumeSkillGroups.map(group => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(", ")}</p></div>)}
        <h3>Tools</h3><p>{resumeTools.split(" · ").join(", ")}</p>
      </section>
      </aside>
      <section className="resume-section" aria-labelledby="resume-experience">
        <h2 id="resume-experience">Experience</h2>
        {resumeRoles.map(role => <article className="resume-role" key={`${role.company}-${role.startYear}`}>
          <div className="resume-role-heading"><h3>{role.company}</h3><span className="resume-role-title">{role.title}</span></div>
          <div className="resume-role-meta">{role.period} | {role.location}</div>
          <div className="resume-responsibilities">{role.responsibilities.map(item => <p key={item}>{item}</p>)}</div>
        </article>)}
      </section>
      </div>
    </div>
  </main>;
}

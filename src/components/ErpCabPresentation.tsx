import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Badge, Body1, Body1Strong, Caption1, Card, Link, Subtitle2, Title3 } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { ArrowRight20Regular, Search24Regular, Rocket24Regular, PeopleTeam24Regular, Pulse24Regular } from "@fluentui/react-icons";
import { cabStageStatus, cabThemes } from "@/content/erp-cab-presentation";

const stageIcons = [Search24Regular, Rocket24Regular, PeopleTeam24Regular, Pulse24Regular];

export default function ErpCabPresentation() {
  return <div className="erp-cab-presentation">
    <figure className="erp-stage-figure">
      <div>
        <div className="erp-cab-stages" aria-label="Lifecycle confidence map">
          {cabStageStatus.map((stage, index) => {
            const Icon = stageIcons[index];
            return <div className="erp-cab-stage-wrap" data-stage={stage.id} key={stage.id}>
              <Card size="large">
                <div className="erp-cab-stage-heading">{Icon && <Icon />}<Subtitle2 as="h4">{stage.title}</Subtitle2></div>
                <div className="erp-cab-confidence-status"><Badge appearance="tint" color={stage.status.tone}>{stage.status.label}</Badge></div>
                <Body1Strong>{stage.headline}</Body1Strong>
                <div className="erp-cab-drivers"><Caption1>Driven by</Caption1><div className="erp-cab-badges">{stage.drivers.map(driver => <Badge key={driver} appearance="tint" color="informative">{driver}</Badge>)}</div></div>
              </Card>
              {index < cabStageStatus.length - 1 && <span className="erp-cab-arrow" aria-hidden="true"><ArrowRight20Regular /></span>}
            </div>;
          })}
        </div>
      </div>
      <figcaption className="erp-evidence-note"><Body1>Confidence breaks earliest, before customers have seen enough to commit.</Body1></figcaption>
    </figure>
    <Accordion collapsible className="erp-cab-themes-accordion">
      <AccordionItem value="themes">
        <AccordionHeader size="extra-large"><Title3>The five themes — and what each one asks us to ship.</Title3></AccordionHeader>
        <AccordionPanel>
          <div className="erp-cab-themes">
            <div className="erp-cab-heading"><Body1>Across Mentimeter (n=15) and the in-person workshop, five themes consistently shaped whether participants felt confident enough to commit. Each card pairs the insight and evidence with the concrete visibility to ship.</Body1></div>
            {cabThemes.map(theme => <Card key={theme.tag} size="large">
              <article className="erp-cab-theme">
                <Caption1>{theme.tag}</Caption1>
                <Title3 as="h4">{theme.title}</Title3>
                <Body1>{theme.insight}</Body1>
                <ul className="erp-cab-evidence">{theme.evidence.map(evidence => <li key={evidence}><Body1>{evidence}</Body1></li>)}</ul>
                {theme.quote && <blockquote className="erp-cab-quote"><Body1 italic>"{theme.quote}"</Body1></blockquote>}
                {theme.builds.map((build, index) => <Body1 key={index}><strong>Recommendation{theme.builds.length > 1 ? ` (${build.stage})` : ""}:</strong> {build.text}</Body1>)}
                {theme.crossRefs && <Caption1>Related cross-reference{theme.crossRefs.length > 1 ? "s" : ""} — {theme.crossRefs.map((reference, index) => <span key={reference}>{index > 0 && " · "}<Link href={`https://agent-adoption-findings-cab.lovable.app/#ref-${reference}`} target="_blank" rel="noopener noreferrer">see Appendix [{reference}]</Link></span>)}.</Caption1>}
              </article>
            </Card>)}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>;
}
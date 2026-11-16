import { useEffect, useState } from "react";
import { Tab, TabList } from "@/design-system/ms-fluent-for-bic-65f6c6";
import type { Chapter } from "@/content/legacy-projects";
import recording from "@/assets/groupm-drag-mapping.mp4.asset.json";
import poster from "@/assets/groupm-drag-mapping.jpg.asset.json";

export default function MappingDecisionTabs({ chapter }: { chapter: Chapter }) {
  const [selected, setSelected] = useState("line");
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const isLine = selected === "line";
  const paragraphs = isLine ? chapter.paragraphs.slice(0, 2) : chapter.paragraphs.slice(2);
  const bullets = isLine ? chapter.paragraphBullets?.items : chapter.bullets;
  const images = chapter.images?.filter(image => isLine ? image.afterParagraph !== undefined : image.afterParagraph === undefined);
  return <>
    <TabList size="large" appearance="subtle" className="mcp-principle-tabs" selectedValue={selected} onTabSelect={(_, data) => setSelected(String(data.value))} aria-label="Mapping design proposals">
      <Tab id="mapping-line-tab" value="line" aria-controls="mapping-decision-panel">Line mapping</Tab>
      <Tab id="mapping-drag-tab" value="drag" aria-controls="mapping-decision-panel">Drag and drop</Tab>
    </TabList>
    <div id="mapping-decision-panel" role="tabpanel" aria-labelledby={isLine ? "mapping-line-tab" : "mapping-drag-tab"}>
      <div className="mcp-copy">
        {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {bullets && <ul className="legacy-story-list">{bullets.map(item => <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>)}</ul>}
        {isLine && chapter.quote && <blockquote className="legacy-story-quote"><em>“{chapter.quote}”</em></blockquote>}
      </div>
      {isLine ? images?.map(image => <figure key={image.url} className="legacy-evidence legacy-evidence-single"><img src={image.url} alt={image.alt} loading="lazy" /></figure>) : <figure className="legacy-evidence legacy-evidence-single"><video key={String(reducedMotion)} src={recording.url} poster={poster.url} autoPlay={!reducedMotion} muted loop playsInline controls={reducedMotion} preload="metadata" aria-label="Drag-and-drop field mapping recording" /></figure>}
      {!isLine && chapter.highlight && <div className="mcp-copy"><p><strong>{chapter.highlight}</strong></p></div>}
    </div>
  </>;
}
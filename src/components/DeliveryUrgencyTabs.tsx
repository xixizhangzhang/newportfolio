import { useState } from "react";
import { Caption1, Tab, TabList } from "@/design-system/ms-fluent-for-bic-65f6c6";
import type { DecisionTab } from "@/content/legacy-projects";

export default function DeliveryUrgencyTabs({ tabs }: { tabs: DecisionTab[] }) {
  const [selected, setSelected] = useState(tabs[0]?.id ?? "");
  const current = tabs.find(tab => tab.id === selected);
  if (!current) return null;
  return <div className="delivery-urgency-tabs">
    <TabList size="large" appearance="subtle" className="mcp-principle-tabs" selectedValue={selected} onTabSelect={(_, data) => setSelected(String(data.value))} aria-label="Delivery urgency levels">
      {tabs.map(tab => <Tab key={tab.id} id={`delivery-${tab.id}-tab`} value={tab.id} aria-controls="delivery-urgency-panel">{tab.label}</Tab>)}
    </TabList>
    <div id="delivery-urgency-panel" role="tabpanel" aria-labelledby={`delivery-${current.id}-tab`} className="delivery-urgency-panel">
      <div className="mcp-copy">
        <p><strong>{current.introduction}</strong></p>
        <ul className="legacy-story-list">{current.responsibilities.map(item => <li key={item.lead}><strong>{item.lead}.</strong> {item.text}</li>)}</ul>
      </div>
      {current.images.length > 0 && <div className="legacy-evidence delivery-urgency-evidence">
        {current.images.map(image => <figure className="delivery-urgency-shot" key={image.url}>
          <img src={image.url} alt={image.alt} loading="lazy" />
          {image.caption && <figcaption><Caption1><strong>{image.caption}</strong></Caption1>{image.detail && <p>{image.detail}</p>}</figcaption>}
        </figure>)}
      </div>}
    </div>
  </div>;
}
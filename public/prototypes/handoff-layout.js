// Mark structural regions without coupling to the uploaded runtime's generated class names.
// The standalone runtime does not declare Fluent tokens; inherit them from the portfolio frame.
if (window.frameElement) {
  const theme = getComputedStyle(window.frameElement);
  for (const token of ['strokeWidthThin', 'colorNeutralStroke2', 'colorBrandBackground2', 'spacingHorizontalM', 'spacingHorizontalXXXL', 'durationSlow', 'curveEasyEase']) {
    const value = theme.getPropertyValue(`--${token}`).trim();
    if (value) document.documentElement.style.setProperty(`--${token}`, value);
  }
}
let initialIntentApplied = false;
function synchronizeLayout() {
  if (!initialIntentApplied && new URLSearchParams(location.search).get('kind') === 'intent') {
    const findTab = Array.from(document.querySelectorAll('[role="tab"]')).find(tab => tab.textContent.trim() === 'Find');
    if (findTab) {
      initialIntentApplied = true;
      findTab.click();
    }
  }
  const select = document.querySelector('select[aria-label="Scenario data"]');
  const scenario = select?.closest('label')?.parentElement;
  if (scenario) {
    scenario.setAttribute('data-handoff-scenario', '');
    scenario.parentElement?.setAttribute('data-handoff-toolbar', '');
    scenario.parentElement?.parentElement?.setAttribute('data-handoff-surface', '');
    document.getElementById('root')?.removeAttribute('data-handoff-loading');
  }
  document.querySelectorAll('[data-handoff-split]').forEach(element => {
    if (!element.querySelector(':scope > aside')) element.removeAttribute('data-handoff-split');
  });
  document.querySelectorAll('aside[aria-label]').forEach(pane => {
    pane.setAttribute('data-handoff-pane', '');
    pane.parentElement?.setAttribute('data-handoff-split', '');
    pane.previousElementSibling?.setAttribute('data-handoff-chat', '');
  });
}
const observer = new MutationObserver(synchronizeLayout);
observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
synchronizeLayout();
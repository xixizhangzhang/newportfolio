import contributionAsset from "@/assets/mcp-contribution-white-cards.png.asset.json";

export default function McpContributionFlow() {
  return <img className="mcp-contribution-flow" src={contributionAsset.url}
    alt="Contribution process: Bring a scenario, prepare the repo, compose in Storybook, test with mock data, and feed it back. Return to Storybook with what you learned; align principle changes with the team first." />;
}
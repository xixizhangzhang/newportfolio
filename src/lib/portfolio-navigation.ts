export function portfolioEntrySection(hash: string, navigationType: string): "home" | "work" {
  return navigationType !== "POP" && hash === "#work" ? "work" : "home";
}

export function portfolioHomeRedirect(search: string): string {
  return `/ride${search}`;
}
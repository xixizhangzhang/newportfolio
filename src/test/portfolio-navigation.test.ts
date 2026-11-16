import { describe, expect, it } from "vitest";
import { portfolioEntrySection, portfolioHomeRedirect } from "@/lib/portfolio-navigation";

describe("Portfolio opening position", () => {
  it("opens Home on initial load or refresh even with a Work fragment", () => {
    expect(portfolioEntrySection("#work", "POP")).toBe("home");
  });
  it("opens Work when explicitly returning to All work", () => {
    expect(portfolioEntrySection("#work", "PUSH")).toBe("work");
  });
  it("redirects the root to Home while retaining query parameters", () => {
    expect(portfolioHomeRedirect("?source=resume")).toBe("/ride?source=resume");
  });
});
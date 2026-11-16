import { describe, expect, it } from "vitest";
import { resumeRoles, resumeTools } from "@/content/resume";

describe("Current Microsoft resume experience", () => {
  it("starts in 2025 and remains the current Bay Area role", () => {
    const current = resumeRoles[0];
    expect(current.company).toBe("Microsoft");
    expect(current.startYear).toBe(2025);
    expect(current.endYear).toBeNull();
    expect(current.location).toBe("Bay Area, California");
  });
});

describe("Resume tools selection", () => {
  it.each(["HTML", "CSS", "JavaScript", "Node.js", "n8n"])("includes %s in Tools", (tool) => {
    expect(resumeTools.split(" · ")).toContain(tool);
  });
});
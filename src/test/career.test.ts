import { describe, expect, it } from "vitest";
import { careerIndex, careerStops } from "../lib/career";

describe("career journey", () => {
  it("starts with the current Silicon Valley Microsoft senior design role", () => {
    expect(careerStops[careerIndex(0)]).toMatchObject({ company: "Microsoft", city: "Silicon Valley", period: "2025 — Present", role: "Senior UX Designer" });
  });
  it("visits Shanghai Microsoft then Alibaba before New York", () => {
    expect(careerStops[careerIndex(0.25)]).toMatchObject({ company: "Microsoft", city: "Shanghai", period: "2021 — 2025" });
    expect(careerStops[careerIndex(0.5)]).toMatchObject({ company: "Alibaba", city: "Shanghai", period: "2020 — 2021", role: "Interaction Design Expert" });
  });
  it("ends with GroupM and Jop UX/UI roles in New York", () => {
    expect(careerStops[careerIndex(0.75)]).toMatchObject({ company: "GroupM", city: "New York", period: "2018 — 2020", role: "UX Designer" });
    expect(careerStops[careerIndex(1)]).toMatchObject({ company: "Jop", city: "New York", period: "2018", role: "UX Designer" });
  });
});
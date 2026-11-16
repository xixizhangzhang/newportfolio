import { describe, expect, it } from "vitest";
import { affectedProductBatches, affectedProductsCsv, mergeAffectedProducts } from "../content/traceability-impact";

describe("progressive affected-product discovery", () => {
  it("keeps earlier products when another batch arrives", () => {
    const first = affectedProductBatches[0];
    const second = affectedProductBatches[1];
    const merged = mergeAffectedProducts(first, second);
    expect(merged.map(item => item.id)).toEqual([...first, ...second].map(item => item.id));
  });
  it("counts a product only once across repeated search batches", () => {
    const first = affectedProductBatches[0];
    expect(mergeAffectedProducts(first, first)).toHaveLength(first.length);
  });
  it("includes the customer in the downloadable result", () => {
    expect(affectedProductsCsv(affectedProductBatches[0])).toContain('"Northstar Cycles"');
  });
});
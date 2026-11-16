import { describe, expect, it } from "vitest";
import { expenseFields, fitRoute, type FitRequest } from "../lib/mcp-fit";
describe("Fit surface routing", () => {
  it("shows every expense dimension for three items", () => { expect(expenseFields(3)).toEqual(["date", "merchant", "category", "amount", "costCenter", "status", "receipt"]); });
  it("defaults to fewer dimensions for five or more items", () => { for (const count of [5, 7, 8, 12]) expect(expenseFields(count)).toEqual(["date", "amount"]); });
  it("uses the same concise table dimensions in every panel", () => { for (const count of [3, 5, 7, 8]) expect(expenseFields(count, "panel")).toEqual(["merchant", "category", "date", "amount", "receipt"]); });
  it("finds three open expenses directly without offering details", () => { expect(fitRoute(3, false, "find")).toEqual({ pane: false, visibleCount: 3, more: 0, offerPane: false, confirmationRequired: false }); });
  it("routes other find results by density", () => { expect(fitRoute(5, false, "find")).toMatchObject({ pane: false, visibleCount: 5, offerPane: false }); expect(fitRoute(7, false, "find")).toMatchObject({ pane: false, visibleCount: 5, more: 2, offerPane: true }); expect(fitRoute(8, false, "find")).toMatchObject({ pane: true, visibleCount: 0 }); });
  it("keeps 1–3 clean records in chat", () => { for (const n of [1, 2, 3]) expect(fitRoute(n)).toMatchObject({ pane: false, visibleCount: n }); });
  it("keeps a compact full list of 4–5 records", () => { for (const n of [4, 5]) expect(fitRoute(n)).toMatchObject({ pane: false, visibleCount: n }); });
  it("shows five and offers review for 6–7 records", () => { for (const n of [6, 7]) expect(fitRoute(n)).toMatchObject({ pane: false, visibleCount: 5, more: n - 5, offerPane: true }); });
  it("automatically opens structured review for 8+", () => { for (const n of [8, 12]) expect(fitRoute(n)).toMatchObject({ pane: true, visibleCount: 0 }); });
  it("automatically opens review when an issue exists at any count", () => { for (const n of [1, 3, 8]) expect(fitRoute(n, true, "find")).toMatchObject({ pane: true, visibleCount: 0 }); });
  it("opens the full issue list on request", () => { expect(fitRoute(3, true, "details")).toMatchObject({ pane: true }); });
  it("opens requested evidence and editing regardless of count", () => { for (const request of ["review", "compare", "edit", "receipts", "details"] as FitRequest[]) expect(fitRoute(1, false, request).pane).toBe(true); });
  it("honors stay in chat only without issues or final review", () => { expect(fitRoute(8, false, "stay").pane).toBe(false); expect(fitRoute(1, true, "stay").pane).toBe(true); expect(fitRoute(1, false, "stay", true)).toMatchObject({ pane: true, confirmationRequired: true }); });
  it("requires final review and explicit confirmation for submission", () => { expect(fitRoute(1, false, "submit")).toMatchObject({ pane: true, confirmationRequired: true }); });
});
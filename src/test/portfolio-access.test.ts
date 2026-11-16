import { describe, expect, it } from "vitest";
import { AUTHENTICATED_NOTICE_MS, isProtectedProject, protectedProjectPaths, readAccessReceipt } from "../lib/portfolio-access";
import { comparePasscode, issueReceipt, verifyReceipt, SESSION_SECONDS } from "../../supabase/functions/portfolio-access/security";

describe("Portfolio visitor access rules", () => {
  it("protects all five work pages and leaves home and resume public", () => {
    expect(protectedProjectPaths).toHaveLength(5);
    for (const path of protectedProjectPaths) expect(isProtectedProject(path)).toBe(true);
    expect(isProtectedProject("/ride")).toBe(false);
    expect(isProtectedProject("/resume")).toBe(false);
  });
  it("holds the authenticated notice for three seconds", () => expect(AUTHENTICATED_NOTICE_MS).toBe(3000));
  it("never treats a stored flag as authentication", async () => {
    const receipt = readAccessReceipt({ getItem: () => "true" });
    expect(await verifyReceipt(receipt ?? "", "test-signing-key")).toBe(false);
  });
  it("requires an exact matching passcode", async () => {
    expect(await comparePasscode("test-passcode", "test-passcode")).toBe(true);
    expect(await comparePasscode("wrong", "test-passcode")).toBe(false);
  });
  it("accepts a server receipt but rejects tampering and another signing key", async () => {
    const receipt = await issueReceipt("test-signing-key", 1000);
    expect(await verifyReceipt(receipt, "test-signing-key", 2000)).toBe(true);
    expect(await verifyReceipt(`${receipt}x`, "test-signing-key", 2000)).toBe(false);
    expect(await verifyReceipt(receipt, "other-key", 2000)).toBe(false);
  });
  it("expires a receipt at its server-side safety limit", async () => {
    const receipt = await issueReceipt("test-signing-key", 1000);
    expect(await verifyReceipt(receipt, "test-signing-key", 1000 + SESSION_SECONDS * 1000)).toBe(false);
  });
});
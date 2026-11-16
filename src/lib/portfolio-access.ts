export const ACCESS_STORAGE_KEY = "portfolio-access-session";
export const AUTHENTICATED_NOTICE_MS = 3000;
export const protectedProjectPaths = ["/work/mcp-apps", "/work/erp-agent-lifecycle", "/work/traceability", "/work/delivery-im", "/work/data-onboarding"];

export function isProtectedProject(path: string) {
  return protectedProjectPaths.includes(path.replace(/\/$/, ""));
}

export function readAccessReceipt(storage: Pick<Storage, "getItem">): string | null {
  // A receipt is never trusted until Cloud verifies its signature.
  return storage.getItem(ACCESS_STORAGE_KEY);
}
const encoder = new TextEncoder();
const SESSION_PURPOSE = "portfolio-viewer";
export const SESSION_SECONDS = 60 * 60 * 24;

function encode(value: Uint8Array) {
  return btoa(String.fromCharCode(...value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(normalized), c => c.charCodeAt(0));
}
async function signingKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function comparePasscode(candidate: string, expected: string) {
  const digest = async (value: string) => new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
  const [left, right] = await Promise.all([digest(candidate), digest(expected)]);
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}
export async function issueReceipt(secret: string, now = Date.now()) {
  const payload = encode(encoder.encode(JSON.stringify({ purpose: SESSION_PURPOSE, expires: now + SESSION_SECONDS * 1000, nonce: crypto.randomUUID() })));
  const signature = await crypto.subtle.sign("HMAC", await signingKey(secret), encoder.encode(payload));
  return `${payload}.${encode(new Uint8Array(signature))}`;
}
export async function verifyReceipt(receipt: string, secret: string, now = Date.now()) {
  try {
    const parts = receipt.split(".");
    if (parts.length !== 2) return false;
    const [payload, signature] = parts;
    if (!await crypto.subtle.verify("HMAC", await signingKey(secret), decode(signature), encoder.encode(payload))) return false;
    const parsed = JSON.parse(new TextDecoder().decode(decode(payload)));
    return parsed.purpose === SESSION_PURPOSE && typeof parsed.expires === "number" && parsed.expires > now;
  } catch { return false; }
}
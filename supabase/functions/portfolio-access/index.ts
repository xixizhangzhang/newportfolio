import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { comparePasscode, issueReceipt, verifyReceipt } from "./security.ts";

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("authenticate"), passcode: z.string().min(1).max(256) }),
  z.object({ action: z.literal("verify"), receipt: z.string().min(1).max(2048) }),
]);
const attempts = new Map<string, { count: number; reset: number }>();
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
});

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const passcode = Deno.env.get("PORTFOLIO_PASSCODE");
  const secret = Deno.env.get("PORTFOLIO_SESSION_SECRET");
  if (!passcode || !secret) return reply({ error: "Authentication is temporarily unavailable." }, 503);
  try {
    const input = schema.safeParse(await request.json());
    if (!input.success) return reply({ error: "Invalid request." }, 400);
    if (input.data.action === "verify") {
      const authenticated = await verifyReceipt(input.data.receipt, secret);
      return reply({ authenticated }, authenticated ? 200 : 401);
    }
    // Best-effort warm-instance throttling; this is a visitor gate, not an account system.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const now = Date.now();
    for (const [key, value] of attempts) if (value.reset <= now) attempts.delete(key);
    const current = attempts.get(ip) ?? { count: 0, reset: now + 60000 };
    if (current.count >= 10) return reply({ error: "Too many attempts. Please wait a minute and try again." }, 429);
    current.count++;
    attempts.set(ip, current);
    if (!await comparePasscode(input.data.passcode, passcode)) return reply({ error: "Incorrect passcode. Please try again." }, 401);
    attempts.delete(ip);
    return reply({ authenticated: true, receipt: await issueReceipt(secret) });
  } catch { return reply({ error: "Unable to authenticate. Please try again." }, 400); }
});
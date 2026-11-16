import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Field, Input, Body1, Title3, Spinner, Tooltip } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { LockClosed20Regular, LockOpen20Regular, LockClosed24Regular, LockOpen24Regular } from "@fluentui/react-icons";
import { supabase } from "@/integrations/supabase/client";
import { ACCESS_STORAGE_KEY, AUTHENTICATED_NOTICE_MS, readAccessReceipt } from "@/lib/portfolio-access";
import "./portfolio-access.css";

type Access = { authenticated: boolean; checking: boolean; celebrating: boolean; requestAccess: (destination?: string, state?: unknown) => void };
const AccessContext = createContext<Access | null>(null);
export function usePortfolioAccess() {
  const access = useContext(AccessContext);
  if (!access) throw new Error("Portfolio access provider is missing");
  return access;
}

export function PortfolioAccessProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const pending = useRef<{ path: string; state?: unknown } | null>(null);
  useEffect(() => {
    let active = true;
    let receipt: string | null = null;
    try { receipt = readAccessReceipt(sessionStorage); } catch { /* memory-only session */ }
    if (!receipt) { setChecking(false); return; }
    void supabase.functions.invoke("portfolio-access", { body: { action: "verify", receipt } }).then(({ data, error }) => {
      if (!active) return;
      setAuthenticated(!error && data?.authenticated === true);
      if (error || !data?.authenticated) { try { sessionStorage.removeItem(ACCESS_STORAGE_KEY); } catch { /* unavailable storage */ } }
      setChecking(false);
    }).catch(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!celebrating) return;
    const timer = window.setTimeout(() => setCelebrating(false), AUTHENTICATED_NOTICE_MS);
    return () => window.clearTimeout(timer);
  }, [celebrating]);
  const requestAccess = useCallback((destination?: string, state?: unknown) => {
    if (authenticated && destination) { navigate(destination, { state }); return; }
    pending.current = destination ? { path: destination, state } : null;
    setPasscode(""); setError(""); setOpen(true);
  }, [authenticated, navigate]);
  const close = () => { setOpen(false); pending.current = null; setPasscode(""); setError(""); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!passcode || passcode.length > 256) { setError("Please enter the passcode."); return; }
    setBusy(true); setError("");
    try {
      const { data, error: failure } = await supabase.functions.invoke("portfolio-access", { body: { action: "authenticate", passcode } });
      if (failure || !data?.authenticated || typeof data.receipt !== "string") {
        let message = "Unable to authenticate. Please try again.";
        if (failure && "context" in failure && failure.context instanceof Response) {
          const body = await failure.context.json().catch(() => null);
          if (typeof body?.error === "string") message = body.error;
        }
        setError(message); return;
      }
      try { sessionStorage.setItem(ACCESS_STORAGE_KEY, data.receipt); } catch { /* current page session remains valid */ }
      setAuthenticated(true); setCelebrating(true); setOpen(false); setPasscode("");
      const destination = pending.current;
      pending.current = null;
      if (destination) navigate(destination.path, { state: destination.state });
    } catch { setError("Unable to authenticate. Please try again."); }
    finally { setBusy(false); }
  };
  return <AccessContext.Provider value={{ authenticated, checking, celebrating, requestAccess }}>
    {children}
    <PortfolioAccessStatus />
    <Dialog open={open} onOpenChange={(_, data) => { if (!busy && !data.open) close(); }}>
      <DialogSurface className="portfolio-monochrome-theme">
        {authenticated ? <DialogBody>
          <DialogTitle action={null}> </DialogTitle>
          <DialogContent><div className="portfolio-access-confirmed"><LockOpen24Regular aria-hidden="true" /><Title3>You have authenticated</Title3></div></DialogContent>
          <DialogActions><Button shape="circular" appearance="primary" onClick={close}>OK</Button></DialogActions>
        </DialogBody> : <form onSubmit={submit}><DialogBody>
          <DialogTitle>Authenticate</DialogTitle>
          <DialogContent><div className="portfolio-access-fields"><Body1>Please enter the passcode. You can find the passcode on the top of my resume</Body1><Field label="Passcode" validationState={error ? "error" : "none"} validationMessage={error || undefined}><Input type="password" autoComplete="off" value={passcode} onChange={(_, data) => { setPasscode(data.value); setError(""); }} maxLength={256} disabled={busy || checking} /></Field></div></DialogContent>
          <DialogActions><Button shape="circular" type="button" onClick={close} disabled={busy}>Cancel</Button><Button shape="circular" type="submit" appearance="primary" disabled={busy || checking} icon={busy ? <Spinner size="tiny" /> : undefined}>{busy ? "Authenticating…" : "Authenticate"}</Button></DialogActions>
        </DialogBody></form>}
      </DialogSurface>
    </Dialog>
  </AccessContext.Provider>;
}

export function PortfolioAccessStatus() {
  const { authenticated, celebrating, requestAccess } = usePortfolioAccess();
  return <div className="portfolio-access-status portfolio-monochrome-theme"><span className="portfolio-access-notice" data-visible={celebrating} aria-hidden={!celebrating} role="status">Authenticated!</span><Tooltip content={authenticated ? "Authenticated" : "Authenticate"} relationship="label"><Button appearance="transparent" aria-label={authenticated ? "Authenticated" : "Authenticate"} onClick={() => requestAccess()} icon={<span className="portfolio-access-lock" data-celebrating={celebrating}>{authenticated ? <LockOpen20Regular /> : <LockClosed20Regular />}</span>} /></Tooltip></div>;
}

export function ProtectedProject({ children }: { children: ReactNode }) {
  const { authenticated, checking, requestAccess } = usePortfolioAccess();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { if (!checking && !authenticated) requestAccess(); }, [checking, authenticated, requestAccess, location.pathname]);
  if (checking) return <main className="portfolio-access-blocked"><Spinner label="Checking access…" /></main>;
  if (authenticated) return <>{children}</>;
  return <main className="portfolio-access-blocked portfolio-monochrome-theme"><div className="portfolio-access-blocked-content"><LockClosed24Regular aria-hidden="true" /><Title3>Authenticate</Title3><Button appearance="primary" onClick={() => requestAccess()}>Authenticate</Button><Button onClick={() => navigate("/ride#work")} appearance="transparent">All work</Button></div></main>;
}
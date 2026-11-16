import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/design-system/ms-fluent-for-bic-65f6c6";
import portrait from "@/assets/xi-portrait-circle-poster.jpg.asset.json";
import clip from "@/assets/xi-portrait-circle-loop.mp4.asset.json";
import { usePortfolioAccess } from "@/components/PortfolioAccess";
import { playBadgeSound } from "@/lib/badge-sound";
import "./portrait-introduction.css";

export default function PortraitIntroduction({ onWork }: { onWork: () => void }) {
  const tapGradientId = useId();
  const video = useRef<HTMLVideoElement>(null);
  const hanging = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPressed, setCursorPressed] = useState(false);
  const accessTimer = useRef<ReturnType<typeof setTimeout>>();
  const { requestAccess } = usePortfolioAccess();
  useEffect(() => () => clearTimeout(accessTimer.current), []);
  const positionCursor = (x: number, y: number) => {
    cursor.current?.style.setProperty("--badge-cursor-x", `${x}px`);
    cursor.current?.style.setProperty("--badge-cursor-y", `${y}px`);
  };
  useEffect(() => {
    const anchor = hanging.current;
    if (!anchor) return;
    const scroller = anchor.closest(".portfolio-main");
    const sync = () => {
      const badge = anchor.querySelector<HTMLElement>(".portrait-badge");
      if (!badge) return;
      const rect = anchor.getBoundingClientRect();
      const origin = rect.top + (scroller?.scrollTop ?? 0);
      anchor.style.setProperty("--lanyardReach", `${Math.max(0, origin + badge.offsetTop)}px`);
      anchor.style.setProperty("--lanyardBadgeOffset", `${badge.offsetTop}px`);
      anchor.style.setProperty("--lanyardPivot", `${-origin}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(anchor);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (reduced) element.pause();
    else void element.play().catch(() => undefined);
  }, [reduced]);
  return <div className="portrait-introduction">
    <div ref={hanging} className="portrait-hanging" data-paused={reduced}>
    <div className={`portrait-hanging-swing${reduced ? "" : " portrait-swing-motion"}`}>
      <div className="portrait-lanyard" aria-hidden="true">
        <span className="portrait-lanyard-strap" />
        <span className="portrait-lanyard-clamp" />
      </div>
    <div className="portrait-badge">
      <div className="portrait-badge-top">
        <div className="portrait-media">
      <video ref={video} src={reduced ? undefined : clip.url} poster={portrait.url} muted loop playsInline preload="auto" aria-label="A gently animated portrait of Xi Zhang" />
        </div>
      </div>
      <div className="portrait-badge-bottom">
        <div className="portrait-badge-name"><strong>XI</strong><span>ZHANG</span></div>
        <span className="portrait-badge-role">Senior UX Designer</span>
        <div className="portrait-badge-brand" aria-label="Microsoft"><span className="portrait-badge-logo" aria-hidden="true"><i /><i /><i /><i /></span><span>Microsoft</span></div>
      </div>
    </div>
    </div>
    <Button
      appearance="transparent"
      className="portrait-check-in-target"
      aria-label="Tap card to authenticate"
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        positionCursor(event.clientX, event.clientY);
        setCursorVisible(true);
      }}
      onPointerMove={(event) => positionCursor(event.clientX, event.clientY)}
      onPointerDown={() => setCursorPressed(true)}
      onPointerCancel={() => setCursorPressed(false)}
      onPointerLeave={() => { setCursorVisible(false); setCursorPressed(false); }}
      onFocus={(event) => {
        if (!event.currentTarget.matches(":focus-visible")) return;
        const box = event.currentTarget.getBoundingClientRect();
        positionCursor(box.left + box.width / 2, box.top + box.height / 2);
        setCursorVisible(true);
      }}
      onBlur={() => setCursorVisible(false)}
      onClick={(event) => {
        void playBadgeSound();
        if (event.detail > 0) positionCursor(event.clientX, event.clientY);
        clearTimeout(accessTimer.current);
        setCursorPressed(true);
        accessTimer.current = setTimeout(() => {
          setCursorVisible(false);
          setCursorPressed(false);
          requestAccess();
        }, reduced || event.detail === 0 ? 0 : 150);
      }}
    />
    <div ref={cursor} className="portrait-tap-cursor" data-visible={cursorVisible} aria-hidden="true">
      <div className="portrait-tap-content" data-pressed={cursorPressed}>
        <svg className="portrait-tap-waves" viewBox="20 15 65 72" fill="none">
          <defs>
            <linearGradient id={tapGradientId} gradientUnits="userSpaceOnUse" x1="20" y1="87" x2="85" y2="22">
              <stop className="portrait-tap-gradient-dark" offset="0" />
              <stop className="portrait-tap-gradient-gray" offset="1" />
            </linearGradient>
          </defs>
          <path stroke={`url(#${tapGradientId})`} d="M32 44 Q39 52 32 60 M40 38 Q53 52 40 66 M49 31 Q68 52 49 73 M58 23 Q84 52 58 81" />
        </svg>
        <span className="portrait-tap-label">Tap to authenticate</span>
      </div>
    </div>
    </div>
    <div className="portrait-biography">
      <h1 id="home-title">I design, make,<br />and experiment with AI.</h1>
      <p>I'm <strong>Xi Zhang</strong>, a <strong>senior UX designer at Microsoft</strong> in Silicon Valley. I reimagine how people interact with complex enterprise systems, bringing intelligence, context, and capabilities together through AI-powered experiences. Previously, I designed at Alibaba and GroupM in Shanghai and New York.</p>
      <div className="portrait-work-action"><Button appearance="primary" size="large" shape="circular" onClick={onWork} className="portrait-primary-action">See selected work</Button><Button as="a" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "instant" }); }} appearance="secondary" size="large" shape="circular">Get in touch</Button></div>
    </div>
  </div>;
}
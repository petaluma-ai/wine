"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactElement, type SVGProps } from "react";

import { AnimatedCounter } from "@/components/animated-counter";
import {
  AnalyticsIcon,
  ApprovalIcon,
  BarrelIcon,
  CalendarIcon,
  ClipboardIcon,
  CrmIcon,
  GrowthIcon,
  MailIcon,
  PhoneIcon,
  PlugIcon,
  PosIcon,
  SpreadsheetIcon,
} from "@/components/icons";

type HeroTool = {
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

const heroTools: HeroTool[] = [
  { label: "POS", Icon: PosIcon },
  { label: "Email", Icon: MailIcon },
  { label: "Phone", Icon: PhoneIcon },
  { label: "Spreadsheet", Icon: SpreadsheetIcon },
  { label: "Compliance", Icon: ClipboardIcon },
  { label: "Production", Icon: BarrelIcon },
  { label: "Calendar", Icon: CalendarIcon },
  { label: "Analytics", Icon: AnalyticsIcon },
  { label: "CRM", Icon: CrmIcon },
];

const chaosOffsets = [
  { x: -200, y: -140, rotate: -14 },
  { x: 210, y: -130, rotate: 11 },
  { x: 260, y: 30, rotate: -8 },
  { x: 170, y: 180, rotate: 12 },
  { x: -30, y: 220, rotate: -4 },
  { x: -190, y: 170, rotate: 9 },
  { x: -260, y: 25, rotate: -11 },
  { x: -200, y: -125, rotate: 8 },
  { x: 0, y: -210, rotate: -6 },
];

const briefingItems = [
  "12 club shipments going out — all compliant",
  "3 members at risk of canceling — rescue drafts ready for review",
  "8 reservations today, 2 walk-in slots open",
  "$4,200 in orders yesterday — up 12% vs last Tuesday",
  "TTB quarterly filing: 18 days out, 94% populated",
] as const;

const trustSteps = [
  {
    title: "Luma plugs into your tools",
    description:
      "Commerce7, Klaviyo, your email, and your calendars connect in hours, not months. No migration, no disruption.",
    Icon: PlugIcon,
  },
  {
    title: "You review everything",
    description:
      "Luma works in shadow mode first. Every customer response, every action — you see it before it sends. Nothing goes out without your approval.",
    Icon: ApprovalIcon,
  },
  {
    title: "Luma earns your trust",
    description:
      "Over weeks, approvals speed up. Then Luma handles routine inquiries on its own. You choose what to delegate, one task at a time.",
    Icon: GrowthIcon,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

function revealMotion(shouldReduceMotion: boolean, visible: boolean, delay = 0) {
  if (shouldReduceMotion) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 28 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.7, ease: smoothEase, delay },
  };
}

/* Small person silhouette — "You" in the center before Luma arrives */
function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [orbitRadius, setOrbitRadius] = useState(132);
  const [chaosScale, setChaosScale] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [chaosVisible, setChaosVisible] = useState(false);

  const orbitTriggerRef = useRef<HTMLDivElement | null>(null);
  const morningRef = useRef<HTMLElement | null>(null);
  const promisesRef = useRef<HTMLElement | null>(null);
  const trustRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  const orbitInView = useInView(orbitTriggerRef, { once: true, amount: 0.3 });
  const morningInView = useInView(morningRef, { once: true, amount: 0.4 });
  const promisesInView = useInView(promisesRef, { once: true, amount: 0.2 });
  const trustInView = useInView(trustRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.4 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(100);
        setChaosScale(0.5);
        return;
      }
      if (window.innerWidth < 1024) {
        setOrbitRadius(152);
        setChaosScale(0.75);
        return;
      }
      setOrbitRadius(190);
      setChaosScale(1);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Phase 1: When orbit scrolls into view → show chaos
  useEffect(() => {
    if (reduceMotion) {
      setChaosVisible(true);
      setIsConnected(true);
      return;
    }
    if (orbitInView && !chaosVisible) {
      setChaosVisible(true);
    }
  }, [orbitInView, chaosVisible, reduceMotion]);

  // Phase 2: 2s after chaos is visible → Luma connects
  useEffect(() => {
    if (!chaosVisible || isConnected || reduceMotion) return;
    const timer = setTimeout(() => setIsConnected(true), 2000);
    return () => clearTimeout(timer);
  }, [chaosVisible, isConnected, reduceMotion]);

  return (
    <main className="overflow-x-clip bg-[var(--cream)] text-[var(--text)]">
      {/* ─── NAV ─── */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[var(--cream)]/95 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <Link href="https://petaluma.ai" className="flex items-center gap-2 opacity-70 transition hover:opacity-100">
          <Image src="/petal-mark.png" alt="Petaluma AI" width={496} height={287} className="h-6 w-auto sm:h-7" />
          <span className="text-xs font-medium tracking-[0.08em] text-[var(--sage-dark)] sm:text-sm">petaluma.ai</span>
        </Link>
        <Link
          href="mailto:contact@petaluma.ai?subject=Wine%20AI%20Impact%20Audit"
          className="rounded-md bg-[var(--sage-dark)] px-4 py-1.5 text-xs font-medium tracking-[0.02em] sm:text-sm"
          style={{ color: "white" }}
        >
          Book an Audit
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative isolate min-h-screen">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(181,196,181,0.4)_0%,_rgba(250,250,248,0)_72%)]" />
          <div className="absolute bottom-0 left-1/2 h-56 w-full -translate-x-1/2 bg-[linear-gradient(180deg,rgba(250,250,248,0)_0%,rgba(245,245,242,0.85)_100%)]" />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 pb-20 pt-14 text-center sm:px-10 sm:pt-20">
          {/* Petal mark + brand */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: smoothEase }}
            className="relative"
          >
            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.03, 1], rotate: [0, 0.5, 0, -0.5, 0] }}
              transition={reduceMotion ? undefined : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative mx-auto mb-6 w-[11rem] sm:w-[13rem]"
            >
              <Image src="/petal-mark.png" alt="Luma mark" width={496} height={287} priority className="h-auto w-full" />
              {!reduceMotion && (
                <div className="pointer-events-none absolute inset-0">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <motion.span
                      key={dot}
                      className="absolute h-1.5 w-1.5 rounded-full bg-[var(--sage-light)]"
                      style={{
                        left: ["18%", "36%", "52%", "67%", "81%"][dot],
                        top: ["42%", "58%", "47%", "60%", "44%"][dot],
                      }}
                      animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.15, 0.8] }}
                      transition={{ duration: 2.8, delay: dot * 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.2 }}
            >
              <p className="text-6xl leading-none text-[var(--text)] sm:text-7xl">Luma</p>
              <p className="mt-2 text-xs font-medium tracking-[0.22em] text-[var(--sage-dark)] sm:text-sm">BY PETALUMA AI</p>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.4 }}
            className="mt-10 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl"
          >
            Your winery runs on tools that do not talk to each other.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.58 }}
            className="mt-6 max-w-3xl text-lg font-normal text-[var(--text-light)] sm:text-xl"
          >
            You&apos;re the connective tissue. Your memory, your spreadsheets, your late nights.
          </motion.p>

          {/* ─── Tool Orbit ─── */}
          <div ref={orbitTriggerRef} className="relative mt-10 flex h-[22rem] w-[23rem] items-center justify-center sm:mt-14 sm:h-[27rem] sm:w-[30rem] lg:h-[33rem] lg:w-[40rem]">

            {/* "You" — person icon at center, visible in chaos, fades out when Luma connects */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={
                isConnected
                  ? { opacity: 0, scale: 0.6 }
                  : chaosVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: isConnected ? 0.4 : 0.6, delay: isConnected ? 0 : 0.3, ease: smoothEase }}
              className="absolute z-20 flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[var(--sage-lighter)] bg-[var(--warm-white)] sm:h-20 sm:w-20">
                <PersonIcon className="h-7 w-7 text-[var(--sage)] sm:h-8 sm:w-8" />
              </div>
              <span className="text-xs font-medium tracking-[0.1em] text-[var(--text-lighter)]">YOU</span>
            </motion.div>

            {/* Luma center circle — appears when connected */}
            <motion.div
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { scale: 0, opacity: 0 }}
              animate={isConnected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease: "easeOut" }}
              className="absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sage-dark)] sm:h-20 sm:w-20"
            >
              <Image src="/petal-mark.png" alt="Luma" width={496} height={287} className="h-8 w-auto brightness-[10] sm:h-10" />
            </motion.div>

            {/* Spoke connection lines — draw when connected */}
            {heroTools.map((_, index) => {
              const angle = (index / heroTools.length) * Math.PI * 2 - Math.PI / 2;
              const lineLength = orbitRadius;
              const angleDeg = (angle * 180) / Math.PI;

              return (
                <motion.div
                  key={`spoke-${index}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: lineLength,
                    height: 1,
                    transformOrigin: "0 0",
                    rotate: `${angleDeg}deg`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isConnected ? { scaleX: 1, opacity: 0.35 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: smoothEase }}
                >
                  <div className="h-px w-full bg-[var(--sage-lighter)]" />
                </motion.div>
              );
            })}

            {/* Tool icons — chaos when visible, orbit when connected */}
            {heroTools.map((tool, index) => {
              const angle = (index / heroTools.length) * Math.PI * 2 - Math.PI / 2;
              const orbitX = Math.cos(angle) * orbitRadius;
              const orbitY = Math.sin(angle) * orbitRadius;
              const raw = chaosOffsets[index];
              const chaos = { x: raw.x * chaosScale, y: raw.y * chaosScale, rotate: raw.rotate };
              const ToolIcon = tool.Icon;

              return (
                <motion.div
                  key={tool.label}
                  className="absolute left-1/2 top-1/2 z-10"
                  initial={
                    reduceMotion
                      ? false
                      : { x: chaos.x, y: chaos.y, opacity: 0, rotate: chaos.rotate, scale: 0.84 }
                  }
                  animate={
                    isConnected
                      ? { x: orbitX, y: orbitY, opacity: 1, rotate: 0, scale: 1 }
                      : chaosVisible
                        ? { x: chaos.x, y: chaos.y, opacity: 1, rotate: chaos.rotate, scale: 0.84 }
                        : { x: chaos.x, y: chaos.y, opacity: 0, rotate: chaos.rotate, scale: 0.84 }
                  }
                  transition={
                    isConnected
                      ? { duration: 1.0, delay: 0.25 + index * 0.06, ease: smoothEase }
                      : { duration: 0.6, delay: 0.3 + index * 0.06, ease: smoothEase }
                  }
                >
                  <motion.div
                    animate={
                      reduceMotion || !isConnected
                        ? undefined
                        : { y: [0, -4, 0], rotate: [0, 1.1, 0, -1.1, 0] }
                    }
                    transition={
                      reduceMotion || !isConnected
                        ? undefined
                        : { duration: 5.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2, ease: "easeInOut" }
                    }
                    className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[color:color-mix(in_srgb,var(--sage)_18%,white_82%)] bg-white text-[var(--sage-dark)] shadow-sm sm:h-14 sm:w-14">
                      <ToolIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[0.62rem] font-medium tracking-[0.06em] text-[var(--text-lighter)] sm:text-[0.68rem]">
                      {tool.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Transition line — inside hero, under the orbit */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={isConnected ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.8, ease: smoothEase }}
            className="mt-6 max-w-3xl text-lg font-normal text-[var(--text-light)] sm:text-xl"
          >
            Luma connects your tools and runs your operations. You focus on making great wine.
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={chaosVisible ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: chaosVisible ? 0 : 1.5 }}
            className="mt-4"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-[var(--sage-lighter)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── MORNING BRIEFING ─── */}
      <section ref={morningRef} className="px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...revealMotion(reduceMotion, morningInView)}
            className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div>
              <p className="soft-kicker">7 AM, Every Day</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
                Your day, summarized. Before your first coffee.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-[var(--text-light)]">
                Luma checks every system overnight and delivers one message with everything that matters.
              </p>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 34 }}
              animate={morningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.2 }}
              className="surface-card mx-auto w-full max-w-sm rounded-[2rem] p-3"
            >
              <div className="rounded-[1.45rem] border border-[color:color-mix(in_srgb,var(--sage)_16%,white_84%)] bg-[var(--warm-white)] p-5">
                {/* Chat header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-dark)]">
                    <Image src="/petal-mark.png" alt="Luma" width={496} height={287} className="h-4 w-auto brightness-[10]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text)]">Luma</p>
                    <p className="text-[10px] text-[var(--text-lighter)]">7:00 AM</p>
                  </div>
                </div>

                <p className="mb-3 text-sm font-medium text-[var(--text)]">
                  Good morning. Tuesday at a glance.
                </p>

                <ul className="space-y-3 text-sm text-[var(--text-light)]">
                  {briefingItems.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                      animate={morningInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.45,
                        delay: reduceMotion ? 0 : 0.4 + index * 0.12,
                      }}
                      className="flex gap-2.5"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sage)]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Delivered animation */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={morningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : 1.2, ease: smoothEase }}
                  className="mt-5 border-t border-[color:color-mix(in_srgb,var(--sage)_14%,white_86%)] pt-3 text-xs text-[var(--text-lighter)]"
                >
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={morningInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: reduceMotion ? 0 : 1.5 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sage)]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Delivered · 7:00 AM
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT LUMA FLAGS ─── */}
      <section ref={promisesRef} className="px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...revealMotion(reduceMotion, promisesInView)} className="text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">What Luma flags for you.</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Card 1: Churn rescue */}
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={promisesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.1 }}
              className="surface-card rounded-2xl p-6"
            >
              <p className="text-sm font-semibold tracking-[0.15em] text-[var(--sage-dark)]">01</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight">
                Members about to cancel, before they know it themselves.
              </h3>
              <p className="mt-4 text-[0.98rem] text-[var(--text-light)]">
                Luma analyzes purchase patterns, engagement, and club activity to flag at-risk members.
                Then it drafts a personalized rescue.
              </p>

              <div className="mt-6 space-y-2 rounded-xl border border-[color:color-mix(in_srgb,var(--sage)_14%,white_86%)] bg-[var(--warm-white)] p-3">
                {[
                  "Sarah Chen — No order in 90 days",
                  "Miguel Alvarez — Skipped last two shipments",
                  "Amanda Brooks — Email engagement dropped 64%",
                  "Henry Cole — Club renewal due in 10 days",
                ].map((line, index) => (
                  <motion.div
                    key={line}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    animate={promisesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.28 + index * 0.09 }}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2"
                  >
                    <span className="text-xs text-[var(--text-light)]">{line}</span>
                    <span className="rounded-full border border-[color:color-mix(in_srgb,var(--sage)_28%,white_72%)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--sage-dark)]">
                      Rescue
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.article>

            {/* Card 2: Revenue recovery */}
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={promisesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.22 }}
              className="surface-card rounded-2xl p-6"
            >
              <p className="text-sm font-semibold tracking-[0.15em] text-[var(--sage-dark)]">02</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight">
                Revenue you&apos;re leaving on the table.
              </h3>
              <p className="mt-4 text-[0.98rem] text-[var(--text-light)]">
                Bad data means lost customers. Luma continuously audits your records and fixes what&apos;s broken.
              </p>

              <div className="mt-7 rounded-xl border border-[color:color-mix(in_srgb,var(--sage)_14%,white_86%)] bg-[var(--warm-white)] p-4 text-center">
                <p className="text-sm uppercase tracking-[0.14em] text-[var(--text-lighter)]">Recoverable annual revenue</p>
                <AnimatedCounter value={127400} prefix="$" className="mt-2 block text-5xl font-semibold text-[var(--accent)]" />
              </div>

              <div className="mt-5 grid gap-2.5 text-sm text-[var(--text-light)]">
                <p className="flex justify-between rounded-lg bg-[var(--warm-white)] px-3 py-2">
                  <span>Invalid emails</span>
                  <AnimatedCounter value={847} className="font-semibold text-[var(--text)]" />
                </p>
                <p className="flex justify-between rounded-lg bg-[var(--warm-white)] px-3 py-2">
                  <span>Outdated addresses</span>
                  <AnimatedCounter value={234} className="font-semibold text-[var(--text)]" />
                </p>
                <p className="flex justify-between rounded-lg bg-[var(--warm-white)] px-3 py-2">
                  <span>Duplicate records</span>
                  <AnimatedCounter value={92} className="font-semibold text-[var(--text)]" />
                </p>
              </div>
            </motion.article>

            {/* Card 3: Personalization */}
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={promisesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.34 }}
              className="surface-card rounded-2xl p-6"
            >
              <p className="text-sm font-semibold tracking-[0.15em] text-[var(--sage-dark)]">03</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight">
                Every customer, known. Every shipment, personal.
              </h3>
              <p className="mt-4 text-[0.98rem] text-[var(--text-light)]">
                Luma remembers every interaction, every preference, every purchase. Six months in, it
                knows your customers better than your best employee.
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-[color:color-mix(in_srgb,var(--sage)_14%,white_86%)] bg-[var(--warm-white)]">
                <div className="grid grid-cols-[1fr_auto_1fr] bg-[color:color-mix(in_srgb,var(--sage)_9%,white_91%)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-lighter)]">
                  <span>Standard Shipment</span>
                  <span aria-hidden="true">→</span>
                  <span>Sarah&apos;s Shipment</span>
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-y-2 px-4 py-4 text-sm text-[var(--text-light)]">
                  <span>2022 Estate Cabernet</span>
                  <span aria-hidden="true">→</span>
                  <span className="font-medium text-[var(--text)]">2022 Reserve Cabernet</span>
                  <span>2023 Chardonnay</span>
                  <span aria-hidden="true">→</span>
                  <span className="font-medium text-[var(--text)]">2023 Rosé</span>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ─── TRUST, EARNED — Staggered Layout ─── */}
      <section ref={trustRef} className="px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div {...revealMotion(reduceMotion, trustInView)} className="mb-16 text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">Trust, Earned.</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line (desktop) */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[color:color-mix(in_srgb,var(--sage-lighter)_40%,white_60%)] md:block" />

            <div className="space-y-12 md:space-y-20">
              {trustSteps.map((step, index) => {
                const StepIcon = step.Icon;
                const isRight = index === 1;

                return (
                  <motion.div
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={trustInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.2 }}
                    className="md:grid md:grid-cols-2 md:gap-16"
                  >
                    {/* Spacer — on left side when content is right */}
                    {isRight && <div className="hidden md:block" />}

                    {/* Content */}
                    <div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[color:color-mix(in_srgb,var(--sage-lighter)_30%,white_70%)] bg-[var(--warm-white)] text-[var(--sage)]">
                          <StepIcon className="h-7 w-7" />
                        </div>
                        <div>
                          <span className="text-2xl text-[var(--sage-lighter)]">0{index + 1}</span>
                          <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                          <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--text-light)]">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Approval card for step 2 */}
                      {index === 1 && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                          animate={trustInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ delay: reduceMotion ? 0 : 0.8, duration: 0.5 }}
                          className="ml-0 mt-6 rounded-xl border border-[color:color-mix(in_srgb,var(--sage-lighter)_30%,white_70%)] bg-white p-4 shadow-sm md:ml-[4.5rem]"
                        >
                          <p className="mb-3 text-sm text-[var(--text)]">
                            Luma drafted a response to Sarah Chen.
                          </p>
                          <div className="flex gap-2">
                            <span className="rounded-lg bg-[var(--sage-dark)] px-4 py-1.5 text-xs font-medium text-white">
                              Approve
                            </span>
                            <span className="rounded-lg border border-[color:color-mix(in_srgb,var(--sage-lighter)_30%,white_70%)] bg-[var(--warm-white)] px-4 py-1.5 text-xs font-medium text-[var(--text-light)]">
                              Edit
                            </span>
                            <span className="rounded-lg border border-[color:color-mix(in_srgb,var(--sage-lighter)_30%,white_70%)] bg-[var(--warm-white)] px-4 py-1.5 text-xs font-medium text-[var(--text-lighter)]">
                              Reject
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Spacer — on right side when content is left */}
                    {!isRight && <div className="hidden md:block" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section ref={ctaRef} className="px-6 py-24 sm:px-10 lg:py-28">
        <motion.div
          {...revealMotion(reduceMotion, ctaInView)}
          className="surface-card mx-auto max-w-5xl rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(245,245,242,0.92)_70%,rgba(237,237,234,0.65)_100%)] px-8 py-12 text-center sm:px-12"
        >
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold sm:text-5xl">
            See what Luma can do for your winery.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--text-light)]">
            A free AI Impact Audit — we connect to your data and show you what&apos;s possible.
            30 minutes, no strings.
          </p>

          <Link
            href="mailto:contact@petaluma.ai?subject=Wine%20AI%20Impact%20Audit"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[var(--sage-dark)] px-7 py-3 text-sm font-medium tracking-[0.02em] text-[var(--white)] transition hover:bg-[var(--sage-darker)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage)] focus-visible:ring-offset-2"
            style={{ color: "white" }}
          >
            Book Your Audit
          </Link>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer ref={footerRef} className="px-6 pb-16 pt-8 text-center sm:px-10">
        <motion.div {...revealMotion(reduceMotion, footerInView)} className="mx-auto max-w-3xl">
          <Image src="/petal-mark.png" alt="Petaluma AI" width={496} height={287} className="mx-auto h-10 w-auto" />
          <p className="mt-4 text-sm text-[var(--text-lighter)]">
            © 2026 Petaluma AI · San Francisco Bay Area
          </p>
        </motion.div>
      </footer>
    </main>
  );
}

"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  className?: string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

const formatterByDecimal = new Map<number, Intl.NumberFormat>();

function getFormatter(decimals: number) {
  if (!formatterByDecimal.has(decimals)) {
    formatterByDecimal.set(
      decimals,
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }

  return formatterByDecimal.get(decimals)!;
}

export function AnimatedCounter({
  value,
  className,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [duration, isInView, reduceMotion, value]);

  const rounded = Number(displayValue.toFixed(decimals));

  return (
    <span ref={ref} className={className}>
      {prefix}
      {getFormatter(decimals).format(rounded)}
      {suffix}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/(\d[\d,]*)/);
  const targetNum = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ""), 10) : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch ? value.slice((numericMatch.index || 0) + numericMatch[1].length) : value;

  useEffect(() => {
    if (!isInView || targetNum === 0) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * targetNum);
      setDisplay(start.toLocaleString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, targetNum]);

  if (targetNum === 0) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
}

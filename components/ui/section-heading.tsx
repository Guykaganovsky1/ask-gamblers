"use client";

import { useInViewOnce } from "@/lib/animations";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  const { ref, isInView } = useInViewOnce(0.1);

  return (
    <h2
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`font-heading text-4xl font-bold text-text-primary md:text-5xl ${isInView ? "animate-fade-in" : "opacity-0"} ${className}`}
    >
      {children}
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-l from-accent to-accent-light" />
    </h2>
  );
}
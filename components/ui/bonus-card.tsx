"use client";

import { useInViewOnce } from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface BonusCardProps {
  casino: string;
  bonus: string;
  description: string;
  disclaimer?: string;
  color: string;
  icon: string;
  index?: number;
}

export function BonusCard({
  casino,
  bonus,
  description,
  disclaimer = "*New users only",
  color,
  icon,
  index = 0,
}: BonusCardProps) {
  const { ref, isInView } = useInViewOnce(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex flex-col h-full rounded-2xl overflow-hidden border border-border-glass bg-card hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 ${isInView ? "animate-slide-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={`${color} h-32 flex items-center justify-center text-6xl`}>
        {icon}
      </div>

      <div className="flex-1 flex flex-col gap-4 p-6">
        <h3 className="font-heading text-sm text-text-muted">{casino}</h3>

        <h2 className="font-heading text-xl font-black leading-tight text-text-primary">
          {bonus}
        </h2>

        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        <p className="text-xs text-text-muted italic">{disclaimer}</p>

        <Button href="#" className="w-full mt-auto">
          קבל בונוס
        </Button>
      </div>
    </div>
  );
}
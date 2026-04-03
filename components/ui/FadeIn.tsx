"use client";

import { useInView } from "@/hooks/useInView";
import { clsx } from "clsx";

interface FadeInProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}

const DELAYS = ["", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={clsx("reveal", inView && "visible", DELAYS[delay], className)}>
      {children}
    </div>
  );
}

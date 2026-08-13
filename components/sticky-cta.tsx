"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById("doug");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 bg-background/90 p-3 backdrop-blur-md md:hidden">
      <ButtonLink href="#review" variant="primary" size="md" className="h-12 w-full text-[15px]">
        Request a Growth Systems Review
      </ButtonLink>
    </div>
  );
}

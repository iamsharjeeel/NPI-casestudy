"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const doug = document.getElementById("doug");
      const review = document.getElementById("review");
      if (!doug) return;
      const pastDoug = doug.getBoundingClientRect().top < 120;
      const reviewOnScreen = review
        ? review.getBoundingClientRect().top < window.innerHeight - 120
        : false;
      setVisible(pastDoug && !reviewOnScreen);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 bg-background/90 p-3 backdrop-blur-md md:hidden">
        <ButtonLink href="#review" variant="primary" size="md" className="h-12 w-full text-[15px]">
          Request a Growth Systems Review
        </ButtonLink>
      </div>
    </>
  );
}

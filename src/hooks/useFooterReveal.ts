import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// footerHeight is measured live so the reserved gap always matches the footer's actual rendered size across breakpoints.
export function useFooterReveal() {
  const footerRef = useRef<HTMLElement>(null);
  const footerEndRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => {
      setFooterHeight(el.offsetHeight);
      ScrollTrigger.refresh();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    if (!footerRef.current || !footerEndRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, { yPercent: 28, opacity: 0 });
      ScrollTrigger.create({
        trigger: footerEndRef.current,
        start: "bottom bottom",
        onEnter: () => { gsap.to(footerRef.current, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }); setFooterVisible(true); },
        onLeaveBack: () => { gsap.to(footerRef.current, { yPercent: 28, opacity: 0, duration: 0.55, ease: "power3.in" }); setFooterVisible(false); },
      });
    });
    return () => ctx.revert();
  }, []);

  return { footerRef, footerEndRef, footerHeight, footerVisible };
}

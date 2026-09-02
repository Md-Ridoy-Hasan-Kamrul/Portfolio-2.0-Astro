import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BG, LIME, TEXT, BODY } from "../../../lib/theme";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".lc",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, stagger: 0.04, ease: "power4.out" }
    )
    .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.1")
    .fromTo(subtitleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
    .to([".lc", lineRef.current, subtitleRef.current], {
      opacity: 0, y: -16, duration: 0.35, stagger: 0.02, ease: "power3.in", delay: 0.8,
    })
    .to(ref.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut", onComplete: onDone }, "-=0.1");
  }, []);

  const name = "KAMRUL.DEV";

  return (
    <div ref={ref} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-3" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(500px at 50% 50%, ${LIME}07, transparent 70%)`,
      }} />

      <div className="flex items-center">
        {name.split("").map((c, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <span className="lc inline-block font-['Clash_Display'] font-semibold text-3xl sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: "-1px", color: c === "." ? LIME : TEXT, opacity: 0 }}>
              {c}
            </span>
          </div>
        ))}
      </div>

      <div ref={lineRef} className="h-px w-28 origin-left"
        style={{ background: `linear-gradient(90deg, ${LIME}, transparent)`, transform: "scaleX(0)" }} />

      <div ref={subtitleRef} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6" style={{ opacity: 0 }}>
        <span className="font-mono text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: BODY }}>
          Front-End Developer
        </span>
        <span className="hidden sm:inline" style={{ color: LIME, fontSize: 10 }}>·</span>
        <span className="font-mono text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: BODY }}>
          Dhaka, Bangladesh
        </span>
      </div>
    </div>
  );
}

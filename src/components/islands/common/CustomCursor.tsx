import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LIME } from "../../../lib/theme";

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "none" });
    };
    window.addEventListener("mousemove", onMove);
    const inters = document.querySelectorAll("a,button,[data-cursor]");
    inters.forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(cursor.current, { scale: 3.5, opacity: 0.4, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(cursor.current, { scale: 1, opacity: 1, duration: 0.3 }));
    });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      style={{ willChange: "transform" }}
    >
      <div className="w-5 h-5 rounded-full border" style={{ borderColor: `${LIME}80` }} />
    </div>
  );
}

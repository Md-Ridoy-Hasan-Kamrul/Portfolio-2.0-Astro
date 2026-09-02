import { useRef } from "react";
import gsap from "gsap";

export function MagneticBtn({
  children, className, style, onClick, href, target,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  target?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.32, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.3, ease: "power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1,0.4)" });

  const inner = (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
  if (href) return <a href={href} target={target} rel="noopener noreferrer">{inner}</a>;
  return inner;
}

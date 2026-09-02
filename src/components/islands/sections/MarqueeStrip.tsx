import { LIME, BODY } from "../../../lib/theme";

export function MarqueeStrip() {
  const items = ["React", "TypeScript", "Next.js", "GSAP", "Figma", "WebGL", "Node.js", "GraphQL", "TailwindCSS", "Three.js", "Docker", "PostgreSQL"];

  return (
    <div className="overflow-hidden flex" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0" }}>
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-none items-center gap-10 pr-10" style={{ animation: "marquee 28s linear infinite" }}>
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 flex-none">
              <span className="w-1 h-1 rounded-full" style={{ background: LIME }} />
              <span className="font-mono text-xs tracking-[0.28em] uppercase whitespace-nowrap" style={{ color: BODY }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

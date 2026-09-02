import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiExternalLink } from "react-icons/fi";
import { PROJECTS, PROJECT_CATEGORIES } from "../../../data/projects";
import { BG, LIME, SURFACE, TEXT, BODY } from "../../../lib/theme";
import { useSectionSpacing } from "../../../hooks/useSectionSpacing";

function handleTiltMove(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  gsap.to(card, {
    rotateX: (0.5 - py) * 10,
    rotateY: (px - 0.5) * 10,
    transformPerspective: 800,
    scale: 1.02,
    duration: 0.4,
    ease: "power2.out",
  });
}

function handleTiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
}

export function ProjectsSection() {
  const sRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { py, mb } = useSectionSpacing();
  const [activeTab, setActiveTab] = useState<string>("All");
  const filtered = activeTab === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 80%", once: true } });
      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 80%", once: true } });
      }
    }, sRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".pj-entry").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    }, sRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section ref={sRef} id="projects" className="relative" style={{ paddingTop: py, paddingBottom: py }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5" style={{ marginBottom: mb }}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: LIME }}>04 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div ref={titleRef} className="opacity-0 mb-10">
          <h2 className="font-['Clash_Display'] font-semibold leading-tight text-4xl sm:text-5xl lg:text-6xl" style={{ color: TEXT }}>
            Selected <span style={{ color: LIME }}>Work</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: BODY }}>
            A few projects I've shipped from real estate platforms to AI-powered planning tools.
          </p>
        </div>

        <div ref={tabsRef} className="flex flex-wrap gap-3 mb-12">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={(e) => {
                setActiveTab(cat);
                gsap.fromTo(e.currentTarget, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
              }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: activeTab === cat ? LIME : "transparent",
                color: activeTab === cat ? BG : BODY,
                border: `1px solid ${activeTab === cat ? LIME : "rgba(255,255,255,0.12)"}`,
                boxShadow: activeTab === cat ? `0 0 24px ${LIME}40` : "none",
                opacity: 0,
              }}
              onMouseEnter={(e) => { if (activeTab !== cat) { const el = e.currentTarget as HTMLElement; el.style.color = TEXT; el.style.borderColor = "rgba(255,255,255,0.3)"; } }}
              onMouseLeave={(e) => { if (activeTab !== cat) { const el = e.currentTarget as HTMLElement; el.style.color = BODY; el.style.borderColor = "rgba(255,255,255,0.12)"; } }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
          {filtered.map((p) => (
            <div key={p.num} className="pj-entry opacity-0 group rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.06)", willChange: "transform" }}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              <div className="relative overflow-hidden" style={{ height: "clamp(170px, 18vw, 210px)" }}>
                <img
                  src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "saturate(0.65) brightness(0.75)" }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${SURFACE})` }} />

                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(6,6,12,0.6)" }}>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
                    style={{ background: p.accent, color: BG }}>
                    Live <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute top-3 left-4 font-mono text-xs tracking-widest" style={{ color: p.accent }}>{p.num}</div>
              </div>

              <div className="p-5">
                <div className="font-mono text-xs mb-1.5" style={{ color: BODY }}>{p.caption}</div>
                <h3 className="font-['Clash_Display'] font-semibold text-lg" style={{ color: TEXT }}>
                  {p.title}{" "}
                  {p.sub && <span style={{ color: BODY, fontWeight: 400 }}>{p.sub}</span>}
                </h3>
                <p className="mt-2 text-sm leading-relaxed line-clamp-3" style={{ color: BODY }}>{p.desc}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md font-mono text-xs"
                        style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}22` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

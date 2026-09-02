import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiTypescript, SiRedux } from "react-icons/si";
import { MagneticBtn } from "../common/MagneticBtn";
import { BG, LIME, MINT, SURFACE, TEXT, BODY } from "../../../lib/theme";
import { CV_PDF_PATH, CV_DOWNLOAD_NAME } from "../../../lib/site";
import developerPhoto from "../../../imports/Gemini_Generated_Image_hkis8khkis8khkis.png";

export function HeroSection() {
  const [spot, setSpot] = useState({ x: -9999, y: -9999 });
  const sRef = useRef<HTMLElement>(null);
  const l0 = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([l0.current, l1.current, l2.current, l3.current], { yPercent: 110 });
      const tl = gsap.timeline({ delay: 2.35 });
      tl.to([l0.current, l1.current, l2.current, l3.current], { yPercent: 0, duration: 1.15, stagger: 0.11, ease: "power4.out" })
        .fromTo(subRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
        .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.5")
        .fromTo(statsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .fromTo(imgRef.current, { opacity: 0, scale: 0.94, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }, 0.25)
        .fromTo(".h-badge", { opacity: 0, y: 10, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, stagger: 0.09, ease: "back.out(1.7)" }, "-=0.7");
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG }}
      onMouseMove={(e) => setSpot({ x: e.clientX, y: e.clientY })}
    >
      <div className="absolute inset-0 pointer-events-none transition-none" style={{
        background: `radial-gradient(650px at ${spot.x}px ${spot.y}px, rgba(184,255,59,0.065), transparent 62%)`,
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.018,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-6 items-center pt-24 pb-12 sm:pt-28 sm:pb-20">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LIME }} />
            <span className="font-mono text-xs font-bold tracking-[0.32em] uppercase" style={{ color: BODY }}>
              Available for freelance · Dhaka, Bangladesh
            </span>
          </div>

          <div className="space-y-1 mb-10">
            {[
              { ref: l0, text: "Md.", gradient: true },
              { ref: l1, text: "RIDOY", gradient: false },
              { ref: l2, text: "HASAN", gradient: true },
              { ref: l3, text: "KAMRUL", gradient: false },
            ].map(({ ref, text, gradient }) => (
              <div key={text} style={{ overflow: "hidden", lineHeight: 1 }}>
                <div
                  ref={ref}
                  className="font-['Clash_Display'] font-semibold leading-[0.92] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    ...(gradient
                      ? { background: `linear-gradient(130deg, ${LIME} 0%, ${MINT} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                      : { color: TEXT }),
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          <p ref={subRef} className="text-base sm:text-lg leading-relaxed max-w-md mb-9" style={{ color: BODY, opacity: 0 }}>
            Front-End Developer specializing in the MERN stack building responsive,
            user-friendly web applications with React, Next.js & modern web technologies.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <MagneticBtn
              className="cursor-pointer flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: LIME, color: BG }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work <FiArrowUpRight className="w-4 h-4" />
            </MagneticBtn>
            <a
              href={CV_PDF_PATH}
              download={CV_DOWNLOAD_NAME}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:opacity-70"
              style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Download CV
            </a>
          </div>

          <div ref={statsRef} className="flex gap-10 mt-12 pt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", opacity: 0 }}>
            {[["1.6+", "Years exp."], ["50+", "Projects"], ["B.Sc", "CSE · UITS"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-['Clash_Display'] font-semibold text-3xl" style={{ color: TEXT }}>{v}</div>
                <div className="text-xs mt-1" style={{ color: BODY }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
          <div ref={imgRef} className="relative" style={{ opacity: 0 }}>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-60 h-28 rounded-full blur-3xl" style={{ background: `${LIME}18` }} />

            <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute top-0 right-0 w-8 h-px" style={{ background: LIME }} />
              <div className="absolute top-0 right-0 w-px h-8" style={{ background: LIME }} />
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-8 h-px" style={{ background: LIME }} />
              <div className="absolute bottom-0 left-0 w-px h-8" style={{ background: LIME }} />
            </div>

            <div className="relative overflow-hidden rounded-2xl" style={{ width: "clamp(240px,22vw,340px)", aspectRatio: "3/4", boxShadow: `0 0 90px ${LIME}10` }}>
              <img
                src={developerPhoto}
                alt="Md. Ridoy Hasan Kamrul — Frontend Developer"
                className="w-full h-full object-cover object-top"
                style={{ filter: "saturate(0.9) contrast(1.05) brightness(0.92)", mixBlendMode: "luminosity" as const }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG} 8%, transparent 50%)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent 60%, ${BG}30 100%)` }} />
            </div>

            {[
              { icon: SiReact,      label: "React",      color: "#61DAFB", cls: "top-6 -left-20" },
              { icon: SiNextdotjs,  label: "Next.js",    color: TEXT,      cls: "top-28 -left-24" },
              { icon: SiJavascript, label: "JavaScript",  color: "#F7DF1E", cls: "bottom-36 -left-20" },
              { icon: SiTailwindcss,label: "Tailwind",   color: "#06B6D4", cls: "top-14 -right-20" },
              { icon: SiRedux,      label: "Redux",      color: "#764ABC", cls: "top-40 -right-24" },
              { icon: SiTypescript, label: "TypeScript",  color: "#3178C6", cls: "bottom-24 -right-24" },
            ].map(({ icon: Icon, label, color, cls }) => (
              <div key={label} className={`h-badge absolute ${cls} hidden 2xl:flex items-center gap-2 px-3 py-2 rounded-xl`}
                style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", opacity: 0 }}>
                <Icon style={{ color }} className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-mono text-xs" style={{ color: TEXT }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <div className="w-px h-11 animate-pulse" style={{ background: `linear-gradient(to bottom, ${LIME}70, transparent)` }} />
        <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: BODY }}>scroll</span>
      </div>
    </section>
  );
}

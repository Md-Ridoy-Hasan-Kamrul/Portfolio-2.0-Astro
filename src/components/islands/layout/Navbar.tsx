import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX, FiMail } from "react-icons/fi";
import { BG, LIME, TEXT, BODY } from "../../../lib/theme";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "../../../lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 2.5 });
    gsap.fromTo(tagRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power4.out", delay: 2.7 });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!linksRef.current) return;
    const items = linksRef.current.children;
    if (open) {
      gsap.fromTo(items, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.set(items, { opacity: 0, y: 16 });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = ["about", "skills", "projects", "experience", "contact"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${BG}e8` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        opacity: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1"
          style={{ color: TEXT }}
        >
          <span className="font-['Clash_Display'] font-semibold text-xl tracking-tight">
            <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>H</span>K
          </span>
          <span className="ml-1.5 hidden sm:inline-block" style={{ overflow: "hidden" }}>
            <span ref={tagRef} className="inline-block font-mono text-xs tracking-widest" style={{ color: BODY }}>
              kamrul.dev
            </span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button key={l} onClick={() => go(l)}
              className="text-sm font-medium capitalize tracking-wide transition-colors duration-200"
              style={{ color: BODY }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = BODY; }}
            >
              {l}
            </button>
          ))}
        </div>

        <a href={CONTACT_EMAIL_HREF}
          target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
          style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${LIME}50`; el.style.color = LIME; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = TEXT; }}
        >
          {CONTACT_EMAIL}
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: TEXT }}>
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className="md:hidden grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms ease" }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div ref={linksRef} className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-2 border-t" style={{ background: BG, borderColor: "rgba(255,255,255,0.05)" }}>
            {links.map((l, i) => (
              <button key={l} onClick={() => go(l)}
                className="flex items-center gap-3 px-6 py-3 rounded-full capitalize text-xl font-medium tracking-wide transition-all duration-300"
                style={{ color: BODY, opacity: 0 }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = LIME; el.style.background = `${LIME}12`; el.style.transform = "scale(1.06)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = BODY; el.style.background = "transparent"; el.style.transform = "scale(1)"; }}
              >
                <span className="font-mono text-xs" style={{ color: LIME }}>0{i + 1}</span>
                {l}
              </button>
            ))}
            <a
              href={CONTACT_EMAIL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)", opacity: 0 }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${LIME}50`; el.style.color = LIME; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = TEXT; }}
            >
              <FiMail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

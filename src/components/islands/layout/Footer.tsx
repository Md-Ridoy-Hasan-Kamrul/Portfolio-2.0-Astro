import gsap from "gsap";
import { FiGithub, FiArrowUp } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { BG, LIME, TEXT, BODY } from "../../../lib/theme";
import { GITHUB_HREF, LINKEDIN_HREF, FACEBOOK_HREF, WHATSAPP_HREF } from "../../../lib/site";

function spinHover(e: React.MouseEvent<HTMLElement>, color: string, leaving: boolean) {
  gsap.to(e.currentTarget, leaving
    ? { rotate: 0, scale: 1, color: BODY, duration: 0.5, ease: "power2.out" }
    : { rotate: 360, scale: 1.3, color, duration: 0.6, ease: "power2.out" });
}

function popHover(e: React.MouseEvent<HTMLElement>, color: string, leaving: boolean) {
  gsap.to(e.currentTarget, leaving
    ? { y: 0, scale: 1, color: BODY, duration: 0.4, ease: "power2.out" }
    : { y: -7, scale: 1.3, color, duration: 0.45, ease: "back.out(3)" });
}

function wobbleHover(e: React.MouseEvent<HTMLElement>, color: string) {
  const el = e.currentTarget;
  gsap.timeline()
    .to(el, { scale: 1.25, color, duration: 0.2 })
    .to(el, { rotate: -16, duration: 0.1 })
    .to(el, { rotate: 16, duration: 0.1 })
    .to(el, { rotate: -10, duration: 0.1 })
    .to(el, { rotate: 0, duration: 0.1 });
}

function shakeHover(e: React.MouseEvent<HTMLElement>, color: string) {
  const el = e.currentTarget;
  gsap.timeline()
    .to(el, { scale: 1.25, color, duration: 0.15 })
    .to(el, { x: -4, duration: 0.07 })
    .to(el, { x: 4, duration: 0.07 })
    .to(el, { x: -3, duration: 0.07 })
    .to(el, { x: 3, duration: 0.07 })
    .to(el, { x: 0, duration: 0.07 });
}

function settleLeave(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, rotate: 0, scale: 1, color: BODY, duration: 0.4, ease: "power2.out" });
}

export function Footer({ footerRef }: { footerRef: React.RefObject<HTMLElement> }) {
  const links = [
    { icon: FiGithub, href: GITHUB_HREF, label: "GitHub", color: "#ffffff",
      onEnter: (e: React.MouseEvent<HTMLElement>) => spinHover(e, "#ffffff", false), onLeave: (e: React.MouseEvent<HTMLElement>) => spinHover(e, "#ffffff", true) },
    { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn", color: "#0A66C2",
      onEnter: (e: React.MouseEvent<HTMLElement>) => popHover(e, "#0A66C2", false), onLeave: (e: React.MouseEvent<HTMLElement>) => popHover(e, "#0A66C2", true) },
    { icon: FaFacebookF, href: FACEBOOK_HREF, label: "Facebook", color: "#1877F2",
      onEnter: (e: React.MouseEvent<HTMLElement>) => wobbleHover(e, "#1877F2"), onLeave: settleLeave },
    { icon: FaWhatsapp, href: WHATSAPP_HREF, label: "WhatsApp", color: "#25D366",
      onEnter: (e: React.MouseEvent<HTMLElement>) => shakeHover(e, "#25D366"), onLeave: settleLeave },
  ];

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 inset-x-0 z-0 py-10 sm:py-12 overflow-hidden"
      style={{ background: BG }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${LIME}45, transparent)` }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: `${LIME}10` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center gap-5 mb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
            style={{ border: `1px solid ${LIME}35`, color: LIME, background: `${LIME}0a` }}
            onMouseEnter={(e) => { gsap.to(e.currentTarget, { y: -5, boxShadow: `0 0 20px ${LIME}40`, duration: 0.35, ease: "power2.out" }); }}
            onMouseLeave={(e) => { gsap.to(e.currentTarget, { y: 0, boxShadow: "0 0 0px transparent", duration: 0.35, ease: "power2.out" }); }}
          >
            <FiArrowUp className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center gap-1">
            <div className="font-['Clash_Display'] font-semibold text-2xl tracking-tight" style={{ color: TEXT }}>
              <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>H</span>K
            </div>
            <div className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: BODY }}>
              Md.Ridoy Hasan Kamrul
            </div>
          </div>

          <div className="flex items-center gap-6">
            {links.map(({ icon: Icon, href, label, onEnter, onLeave }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: BODY }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}>
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: BODY }}>
            Front-End Developer · MERN Stack
          </p>
          <p className="text-xs" style={{ color: BODY }}>
            © {new Date().getFullYear()} Md. Ridoy Hasan Kamrul. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: BODY }}>
            Built with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

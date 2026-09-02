import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa";
import { SURFACE, TEXT } from "../../../lib/theme";
import { WHATSAPP_HREF } from "../../../lib/site";

export function WhatsAppFAB({ hideForFooter = false }: { hideForFooter?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [coveringContact, setCoveringContact] = useState(false);
  const fabRef = useRef<HTMLAnchorElement>(null);
  const enteredRef = useRef(false);
  const hidden = hideForFooter || coveringContact;

  useEffect(() => {
    if (!fabRef.current) return;
    gsap.fromTo(fabRef.current, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 3,
      onComplete: () => { enteredRef.current = true; },
    });
  }, []);

  useEffect(() => {
    // The contact form spans nearly the full width on mobile, so no right offset keeps the FAB clear of it — hide it instead while that section is in view.
    const st = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 70%",
      end: "bottom 15%",
      onToggle: (self) => setCoveringContact(self.isActive),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = fabRef.current;
    if (!el || !enteredRef.current) return;
    gsap.to(el, { opacity: hidden ? 0 : 1, scale: hidden ? 0.7 : 1, duration: 0.3, ease: "power2.out" });
    el.style.pointerEvents = hidden ? "none" : "auto";
  }, [hidden]);

  return (
    <a
      ref={fabRef}
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-[99998]"
      style={{ opacity: 0 }}
    >
      <div className="relative">
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300"
          style={{
            background: SURFACE, border: "1px solid rgba(37,211,102,0.3)", color: TEXT,
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            transform: hovered ? "translateX(0) scale(1)" : "translateX(8px) scale(0.95)",
          }}>
          Chat with me
        </div>
        <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #128C7E, #25D366)",
            boxShadow: hovered ? "0 8px 32px rgba(37,211,102,0.5)" : "0 4px 20px rgba(37,211,102,0.3)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}>
          <FaWhatsapp className="w-7 h-7 text-white" />
        </div>
      </div>
    </a>
  );
}

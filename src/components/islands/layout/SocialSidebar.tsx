import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { BODY } from "../../../lib/theme";
import { GITHUB_HREF, LINKEDIN_HREF, FACEBOOK_HREF, WHATSAPP_HREF } from "../../../lib/site";

export function SocialSidebar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      Array.from(ref.current.children),
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 2.9 }
    );
  }, []);

  const links = [
    { icon: FiGithub, href: GITHUB_HREF, label: "GitHub", color: "#ffffff" },
    { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn", color: "#0A66C2" },
    { icon: FaFacebookF, href: FACEBOOK_HREF, label: "Facebook", color: "#1877F2" },
    { icon: FaWhatsapp, href: WHATSAPP_HREF, label: "WhatsApp", color: "#25D366" },
  ];

  return (
    <div className="fixed left-6 bottom-0 z-40 hidden 2xl:flex flex-col items-center">
      <div ref={ref} className="flex flex-col items-center gap-5">
        {links.map(({ icon: Icon, href, label, color }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: BODY, opacity: 0 }}
            onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.35, y: -4, color, duration: 0.35, ease: "back.out(2.5)" }); }}
            onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, y: 0, color: BODY, duration: 0.4, ease: "power2.out" }); }}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
        <div className="w-px h-20 mt-1" style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)` }} />
      </div>
    </div>
  );
}

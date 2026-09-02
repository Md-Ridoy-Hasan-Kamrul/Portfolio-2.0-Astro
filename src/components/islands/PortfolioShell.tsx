import { useEffect, useState } from "react";
import { BG, LIME, TEXT } from "../../lib/theme";
import { useFooterReveal } from "../../hooks/useFooterReveal";
import { Toaster } from "./common/Toast";
import { GrainOverlay } from "./common/GrainOverlay";
import { CustomCursor } from "./common/CustomCursor";
import { LoadingScreen } from "./common/LoadingScreen";
import { SocialSidebar } from "./layout/SocialSidebar";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { WhatsAppFAB } from "./layout/WhatsAppFAB";
import { HeroSection } from "./sections/HeroSection";
import { MarqueeStrip } from "./sections/MarqueeStrip";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";

export default function PortfolioShell() {
  const [loaded, setLoaded] = useState(false);
  const { footerRef, footerEndRef, footerHeight, footerVisible } = useFooterReveal();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-padding-top: 6.5rem; }
      section[id] { scroll-margin-top: 6.5rem; }
      body { font-family: 'Inter', sans-serif; background: ${BG}; color: ${TEXT}; scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: ${BG}; }
      ::-webkit-scrollbar-thumb { background: ${LIME}35; border-radius: 99px; }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", overflowX: "hidden" }}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <GrainOverlay />
      <CustomCursor />
      <Toaster />
      <SocialSidebar />
      <Navbar />
      <WhatsAppFAB hideForFooter={footerVisible} />
      <main className="relative z-10" style={{ background: BG, marginBottom: footerHeight }}>
        <HeroSection />
        <MarqueeStrip />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <div ref={footerEndRef} />
      </main>
      <Footer footerRef={footerRef} />
    </div>
  );
}

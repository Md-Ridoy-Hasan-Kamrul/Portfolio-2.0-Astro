import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { toast } from "../common/Toast";
import { BG, LIME, SURFACE, TEXT, BODY } from "../../../lib/theme";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE, CONTACT_PHONE_HREF, CONTACT_LOCATION } from "../../../lib/site";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../../../lib/emailjs";
import { useSectionSpacing } from "../../../hooks/useSectionSpacing";

export function ContactSection() {
  const sRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { py } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-inner", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 80%", once: true } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error("Email service is not configured. Add EmailJS keys to .env.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={sRef} id="contact" className="relative" style={{ paddingTop: py, paddingBottom: py }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${LIME}25, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ct-inner opacity-0 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: LIME }}>06 / Contact</span>
            <h2 className="font-['Clash_Display'] font-semibold mt-6 leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ color: TEXT }}>
              Let's
              <br />
              <span style={{ color: LIME }}>build</span>
              <br />
              something.
            </h2>

            <p className="mt-8 text-base sm:text-lg leading-relaxed" style={{ color: BODY, maxWidth: 380 }}>
              Computer Science graduate specializing in MERN stack available for freelance
              projects via Fiverr and open to full-time opportunities globally.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: FiMail,  label: "Email",    value: CONTACT_EMAIL,  href: CONTACT_EMAIL_HREF },
                { icon: FiPhone, label: "Phone",    value: CONTACT_PHONE,  href: CONTACT_PHONE_HREF },
                { icon: FiMapPin,label: "Location", value: CONTACT_LOCATION, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${LIME}12`, border: `1px solid ${LIME}25` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: LIME }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: BODY }}>{label}</div>
                    {href ? (
                      <a href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors duration-200"
                        style={{ color: TEXT }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm" style={{ color: TEXT }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="p-8 rounded-2xl space-y-5" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="grid sm:grid-cols-2 gap-5">
              {[["name", "Name", "Your name"], ["email", "Email", "you@company.com"]].map(([key, lbl, ph]) => (
                <div key={key}>
                  <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: BODY }}>{lbl}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: BG, border: "1px solid rgba(255,255,255,0.06)", color: TEXT }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = `${LIME}40`; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: BODY }}>Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, timeline, and budget..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ background: BG, border: "1px solid rgba(255,255,255,0.06)", color: TEXT }}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = `${LIME}40`; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-85 disabled:opacity-60"
              style={{ background: LIME, color: BG }}
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

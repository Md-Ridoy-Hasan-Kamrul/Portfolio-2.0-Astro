import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SKILLS_LIST } from '../../../data/skills';
import { LIME, SURFACE, TEXT, BODY } from '../../../lib/theme';
import { useSectionSpacing } from '../../../hooks/useSectionSpacing';

export function SkillsSection() {
  const sRef = useRef<HTMLElement>(null);
  const [hov, setHov] = useState<string | null>(null);
  const { py, mb } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sk-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sRef.current,
            start: 'top 78%',
            once: true,
          },
        },
      );
      gsap.fromTo(
        '.sk-orb',
        { opacity: 0, scale: 0.55 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.sk-orb', start: 'top 85%', once: true },
        },
      );
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id='skills'
      className='relative overflow-hidden'
      style={{ paddingTop: py, paddingBottom: py }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-5' style={{ marginBottom: mb }}>
          <span
            className='font-mono text-xs tracking-[0.3em] uppercase'
            style={{ color: LIME }}
          >
            03 / Skills
          </span>
          <div
            className='flex-1 h-px'
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <div className='grid lg:grid-cols-2 gap-20 items-center'>
          <div className='sk-title opacity-0'>
            <h2
              className="font-['Clash_Display'] font-semibold leading-tight text-4xl sm:text-5xl lg:text-6xl"
              style={{ color: TEXT }}
            >
              The tools I <span style={{ color: LIME }}>master</span> every day
            </h2>
            <p
              className='mt-5 text-base sm:text-lg leading-relaxed'
              style={{ color: BODY }}
            >
              My complete frontend toolkit from React & Next.js to Tailwind &
              TypeScript. Built through real client work, internships &
              production projects.
            </p>

            <div className='flex flex-wrap gap-3 mt-8'>
              {[
                ['Frontend', '#61DAFB'],
                ['Styling', '#06B6D4'],
                ['Design', '#F24E1E'],
                ['Workflow', '#F05032'],
              ].map(([cat, col]) => (
                <div key={cat} className='flex items-center gap-2'>
                  <span
                    className='w-1.5 h-1.5 rounded-full'
                    style={{ background: col }}
                  />
                  <span
                    className='font-mono text-xs tracking-widest uppercase'
                    style={{ color: BODY }}
                  >
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='flex 2xl:hidden flex-wrap gap-3'>
            {SKILLS_LIST.map((skill) => (
              <div
                key={skill.name}
                className='sk-orb flex items-center gap-2 px-3 py-2 rounded-full'
                style={{
                  background: SURFACE,
                  border: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0,
                }}
              >
                <skill.icon
                  style={{ color: skill.color }}
                  className='w-3.5 h-3.5 flex-shrink-0'
                />
                <span className='font-mono text-xs' style={{ color: TEXT }}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className='hidden 2xl:block relative h-[440px]'>
            {SKILLS_LIST.map((skill) => (
              <div
                key={skill.name}
                className='sk-orb absolute cursor-default'
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  animation: `float ${3.2 + skill.d * 1.5}s ease-in-out infinite`,
                  animationDelay: `${skill.d}s`,
                  opacity: 0,
                }}
                onMouseEnter={() => setHov(skill.name)}
                onMouseLeave={() => setHov(null)}
              >
                <div
                  className='flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-300'
                  style={{
                    background:
                      hov === skill.name ? `${skill.color}18` : SURFACE,
                    border: `1px solid ${hov === skill.name ? skill.color + '45' : 'rgba(255,255,255,0.06)'}`,
                    transform: hov === skill.name ? 'scale(1.1)' : 'scale(1)',
                    boxShadow:
                      hov === skill.name ? `0 0 20px ${skill.color}25` : 'none',
                  }}
                >
                  <skill.icon
                    style={{ color: skill.color }}
                    className='w-3.5 h-3.5 flex-shrink-0'
                  />
                  <span className='font-mono text-xs' style={{ color: TEXT }}>
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';
import { EXPERIENCE } from '../../../data/experience';
import { LIME, SURFACE, TEXT, BODY, BG } from '../../../lib/theme';
import { CV_PDF_PATH, CV_DOWNLOAD_NAME } from '../../../lib/site';
import { useSectionSpacing } from '../../../hooks/useSectionSpacing';

export function ExperienceSection() {
  const sRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { py, mb } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ex-row',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sRef.current,
            start: 'top 76%',
            once: true,
          },
        },
      );
      gsap.fromTo(
        '.ex-live-shimmer',
        { left: '-40%' },
        { left: '140%', duration: 1.5, repeat: -1, repeatDelay: 1.1, ease: 'power1.inOut' },
      );
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id='experience'
      className='relative'
      style={{ paddingTop: py, paddingBottom: py }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-5' style={{ marginBottom: mb }}>
          <span
            className='font-mono text-xs tracking-[0.3em] uppercase'
            style={{ color: LIME }}
          >
            05 / Experience
          </span>
          <div
            className='flex-1 h-px'
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <div className='space-y-3'>
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className='ex-row opacity-0 rounded-2xl px-7 py-6 cursor-pointer transition-all duration-400'
              style={{
                background: active === i ? SURFACE : 'transparent',
                border: `1px solid ${active === i ? item.color + '28' : 'rgba(255,255,255,0.04)'}`,
              }}
              onClick={() => setActive(i)}
            >
              <div className='grid grid-cols-12 gap-4 items-center'>
                <div className='col-span-1'>
                  <span
                    className="font-['Clash_Display'] font-semibold text-5xl transition-all duration-300"
                    style={{
                      color:
                        active === i ? item.color : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {item.num}
                  </span>
                </div>

                <div className='col-span-12 sm:col-span-4'>
                  <div
                    className='font-mono text-xs tracking-widest mb-1 transition-colors duration-300'
                    style={{ color: active === i ? item.color : BODY }}
                  >
                    {item.company}
                  </div>
                  <h3
                    className="font-['Clash_Display'] font-semibold text-lg"
                    style={{ color: TEXT }}
                  >
                    {item.role}
                  </h3>
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  {item.period.includes('Present') ? (
                    <span
                      className='relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs font-semibold overflow-hidden'
                      style={{
                        background: `linear-gradient(135deg, ${item.color}28, ${item.color}10)`,
                        color: item.color,
                        border: `1px solid ${item.color}50`,
                        boxShadow: `0 0 18px ${item.color}30`,
                      }}
                    >
                      <span className='relative flex items-center justify-center w-2 h-2'>
                        <span className='absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping' style={{ background: item.color }} />
                        <span className='relative inline-flex w-1.5 h-1.5 rounded-full' style={{ background: item.color }} />
                      </span>
                      <span className='relative'>{item.period}</span>
                      <span className='ex-live-shimmer absolute inset-y-0 w-8 pointer-events-none' style={{ background: `linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)` }} />
                    </span>
                  ) : (
                    <span
                      className='inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-300'
                      style={{
                        background:
                          active === i
                            ? `${item.color}12`
                            : 'rgba(255,255,255,0.04)',
                        color: active === i ? item.color : BODY,
                        border: `1px solid ${active === i ? item.color + '22' : 'rgba(255,255,255,0.04)'}`,
                      }}
                    >
                      {item.period}
                    </span>
                  )}
                </div>

                <div className='col-span-6 sm:col-span-5 flex flex-wrap gap-2 justify-end'>
                  {item.stats.map((s) => (
                    <span
                      key={s}
                      className='px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-300'
                      style={{
                        background:
                          active === i
                            ? `${item.color}12`
                            : 'rgba(255,255,255,0.04)',
                        color: active === i ? item.color : BODY,
                        border: `1px solid ${active === i ? item.color + '22' : 'rgba(255,255,255,0.04)'}`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {active === i && (
                <div
                  className='mt-5 space-y-3'
                  style={{ paddingLeft: 'calc(8.33% + 16px)' }}
                >
                  {item.bullets.map((point) => (
                    <div key={point} className='flex items-start gap-3'>
                      <span
                        className='w-1 h-1 rounded-full flex-shrink-0 mt-2.5'
                        style={{ background: item.color }}
                      />
                      <p
                        className='text-base sm:text-lg leading-relaxed'
                        style={{ color: BODY }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-10'>
          <a
            href={CV_PDF_PATH}
            download={CV_DOWNLOAD_NAME}
            className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-85 hover:scale-[1.03] group'
            style={{ background: LIME, color: BG, boxShadow: `0 4px 24px ${LIME}30` }}
          >
            Download full resume
            <FiArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
          </a>
        </div>
      </div>
    </section>
  );
}

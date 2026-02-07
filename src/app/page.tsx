'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import ThemeToggle from "@/components/ThemeToggle";
import UnicornBackground from "@/components/UnicornBackground";

type Section = 'home' | 'projects' | 'info' | 'contact';

const sections: { id: Section; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'info', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSectionChange = (section: Section) => {
    if (section === activeSection || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(section);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 400);
  };

  useEffect(() => {
    let lastMoveTime = Date.now();

    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastMoveTime < 100) return;
      lastMoveTime = now;

      setIsIdle(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <div className="loading-overlay">
          <span>Aaron Grant | Portfolio</span>
        </div>
      )}

      {/* Full viewport background */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }} />

      {/* Content container with border */}
      <div className="fixed inset-6 md:inset-8 lg:inset-10 overflow-hidden" style={{ borderColor: 'var(--foreground)', borderWidth: '0.5px', borderStyle: 'solid' }}>
        <UnicornBackground isIdle={isIdle} />

        {/* Header - top left */}
        <div className="absolute top-6 left-6 z-50">
          <h1 className="text-[2.5rem] sm:text-[48px] leading-[1.1] font-light tracking-tight mb-1 sm:mb-2" style={{ color: 'var(--foreground)' }}>
            Aaron Grant
          </h1>
          <h2 className="text-sm sm:text-[16px] tracking-tight opacity-70 sm:opacity-80 font-light" style={{ color: 'var(--foreground)' }}>
            Founder and Developer
          </h2>
        </div>

        {/* Theme Toggle - top right */}
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navigation - left side, below header */}
        <nav className="absolute left-6 top-[120px] sm:top-[140px] z-50 flex flex-col gap-3">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSectionChange(id)}
              className="text-left text-sm tracking-tight transition-opacity hover:opacity-100 py-0.5"
              style={{ color: 'var(--foreground)' }}
            >
              {activeSection === id ? (
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
              ) : (
                <span className="opacity-60">{label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Content area */}
        <div className="absolute inset-0 z-10">
          {/* HOME */}
          <div
            className={`section-content ${activeSection === 'home' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute bottom-6 right-6 max-w-[140px] sm:max-w-[150px] text-right">
              <p className="text-[13px] sm:text-[14px] leading-[1.7] tracking-tight opacity-70 font-light" style={{ color: 'var(--foreground)' }}>
                As a full-stack engineer and founder, I believe the best interfaces are silent. With a mission to create effortless interactions, I transform complex problems into seamless integrations, pursuing new expressions through my thoughts.
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div
            className={`section-content ${activeSection === 'projects' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute top-0 bottom-0 left-0 right-10 sm:right-16 lg:right-20 flex items-center justify-end">
              <div className="text-right space-y-8 sm:space-y-10">
                {[
                  { title: "Magnara.AI", date: "2024", role: "Co-Founder / Dev / Design", url: "https://www.magnara.ai" },
                  { title: "DataPilot", date: "2024", role: "Dev / Design", url: "https://github.com/aaronjager2000/datapilot" },
                  { title: "TupleOS", date: "2026", role: "Dev", url: "https://github.com/aaronjager2000/TupleOS" },
                  { title: "Competence Collective", date: "2025", role: "Dev / Design", url: "https://www.competencecollective.com" },
                ].map((project, i) => (
                  <a
                    key={i}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-[1.5rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.15] font-light tracking-tight mb-1 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--foreground)' }}>
                      {project.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs tracking-tight opacity-50" style={{ color: 'var(--foreground)' }}>
                      {project.date} / {project.role}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div
            className={`section-content ${activeSection === 'info' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute bottom-6 right-6 text-right max-w-[140px] sm:max-w-[150px]">
              <p className="text-[13px] sm:text-[14px] leading-[1.7] tracking-tight opacity-80 mb-8 font-light" style={{ color: 'var(--foreground)' }}>
                I believe the best digital experiences are invisible; they anticipate needs, remove friction, and leave users feeling effortlessly empowered.
              </p>
              <p className="text-[12px] sm:text-[13px] leading-[1.7] tracking-tight opacity-60 font-light" style={{ color: 'var(--foreground)' }}>
                My approach combines precision engineering with thoughtful design. I build modular, scalable systems that integrate AI, modern web frameworks, and performance optimization to craft beautiful solutions to existing problems.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div
            className={`section-content ${activeSection === 'contact' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute bottom-6 right-6 text-right max-w-[320px]">
              <h2 className="font-light tracking-tight mb-3" style={{ color: 'var(--foreground)', fontSize: '40px' }}>
                Let&apos;s Connect
              </h2>
              <p className="tracking-tight opacity-70 mb-6" style={{ color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.6' }}>
                Available for freelance & collaborations.<br />
                Let&apos;s create something exceptional.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:aaron@magnara.ai"
                  className="flex items-center justify-end gap-3 py-2.5 hover:opacity-70 transition-opacity group min-h-[44px]"
                >
                  <span className="tracking-tight" style={{ color: 'var(--foreground)', fontSize: '14px' }}>
                    aaron@magnara.ai
                  </span>
                  <Mail size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>

                <a
                  href="https://twitter.com/0xaaronjager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 py-2.5 hover:opacity-70 transition-opacity group min-h-[44px]"
                >
                  <span className="tracking-tight" style={{ color: 'var(--foreground)', fontSize: '14px' }}>
                    @0xaaronjager
                  </span>
                  <Twitter size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>

                <a
                  href="https://github.com/aaronjager2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 py-2.5 hover:opacity-70 transition-opacity group min-h-[44px]"
                >
                  <span className="tracking-tight" style={{ color: 'var(--foreground)', fontSize: '14px' }}>
                    aaronjager2000
                  </span>
                  <Github size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>

                <a
                  href="https://www.linkedin.com/in/aarongrant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 py-2.5 hover:opacity-70 transition-opacity group min-h-[44px]"
                >
                  <span className="tracking-tight" style={{ color: 'var(--foreground)', fontSize: '14px' }}>
                    @aarongrant
                  </span>
                  <Linkedin size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

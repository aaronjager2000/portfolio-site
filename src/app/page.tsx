'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import ThemeToggle from "@/components/ThemeToggle";
import UnicornBackground from "@/components/UnicornBackground";

type Section = 'home' | 'projects' | 'info' | 'contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 }); // normalized 0-1
  const [isIdle, setIsIdle] = useState(false);
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
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to 0-1 range
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
      setIsIdle(false);

      // Reset idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Full viewport background - Never re-renders */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }} />
      
      {/* Glow effect - Follows cursor */}
      <div className="fixed inset-0 -z-5 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[800px] h-[800px] rounded-full blur-[120px] opacity-40"
          style={{
            background: isIdle 
              ? 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.2) 30%, transparent 70%)'
              : `conic-gradient(from ${Math.atan2(mousePos.y - 0.5, mousePos.x - 0.5) * (180 / Math.PI) + 90}deg at 50% 50%, 
                  rgba(52, 211, 153, 0.5) 0deg, 
                  rgba(52, 211, 153, 0.4) 30deg,
                  rgba(16, 185, 129, 0.3) 60deg,
                  rgba(16, 185, 129, 0.2) 90deg,
                  rgba(16, 185, 129, 0.1) 150deg,
                  transparent 180deg,
                  transparent 270deg,
                  rgba(16, 185, 129, 0.1) 300deg,
                  rgba(52, 211, 153, 0.3) 330deg,
                  rgba(52, 211, 153, 0.5) 360deg)`,
            transition: isIdle ? 'background 2s ease' : 'background 0.1s ease',
            transform: 'translateZ(0)',
            willChange: 'background'
          }}
        />
      </div>
      
      {/* Content container with border - Never re-renders */}
      <div className="fixed inset-6 md:inset-8 lg:inset-10 overflow-hidden" style={{ borderColor: 'var(--foreground)', borderWidth: '0.5px', borderStyle: 'solid' }}>
        {/* Background animation - Controlled by cursor activity */}
        <UnicornBackground isIdle={isIdle} />
        
        {/* Navigation - Never re-renders */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-6 md:gap-8 text-sm" style={{ color: 'var(--foreground)' }}>
              <button 
                onClick={() => handleSectionChange('home')}
                className={`hover:opacity-100 transition-opacity tracking-tight ${activeSection === 'home' ? 'opacity-100' : 'opacity-50'}`}
                style={{ color: 'var(--foreground)' }}
              >
                Home
              </button>
              <button 
                onClick={() => handleSectionChange('projects')}
                className={`hover:opacity-100 transition-opacity tracking-tight ${activeSection === 'projects' ? 'opacity-100' : 'opacity-50'}`}
                style={{ color: 'var(--foreground)' }}
              >
                Projects
              </button>
              <button 
                onClick={() => handleSectionChange('info')}
                className={`hover:opacity-100 transition-opacity tracking-tight ${activeSection === 'info' ? 'opacity-100' : 'opacity-50'}`}
                style={{ color: 'var(--foreground)' }}
              >
                About
              </button>
              <button 
                onClick={() => handleSectionChange('contact')}
                className={`hover:opacity-100 transition-opacity tracking-tight ${activeSection === 'contact' ? 'opacity-100' : 'opacity-50'}`}
                style={{ color: 'var(--foreground)' }}
              >
                Contact
              </button>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Content area - Only this animates */}
        <div className="absolute inset-0 z-10">
          {/* HOME */}
          <div 
            className={`section-content ${activeSection === 'home' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute top-6 left-6 md:top-8 md:left-8 text-center">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                Aaron Grant
              </h1>
              <h2 className="text-sm md:text-base tracking-tight opacity-80" style={{ color: 'var(--foreground)' }}>
                Co-Founder of Magnara.AI
              </h2>
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 max-w-[200px] md:max-w-[240px]">
              <p className="text-xs md:text-sm leading-relaxed tracking-tight opacity-70" style={{ color: 'var(--foreground)' }}>
                Founder and full-stack engineer crafting calm, immersive user experiences. I love turning complex problems into modular systems that work together effortlessly; integrating precision, performance, and purpose into every interaction.
          </p>
        </div>
          </div>

          {/* PROJECTS */}
          <div 
            className={`section-content ${activeSection === 'projects' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <h2 className="absolute top-6 left-0 right-0 md:top-8 text-3xl md:text-4xl font-semibold tracking-tight text-center" style={{ color: 'var(--foreground)' }}>
              Projects
            </h2>
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
              <div className="max-w-5xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { 
                    title: "Magnara.AI", 
                    desc: "AI-powered legal automation platform for immigration law firms featuring workflow automation, document management, AI-driven intake processing, and case tracking with role-based access control.", 
                    url: "https://www.magnara.ai" 
                  },
                  { 
                    title: "DataPilot", 
                    desc: "Enterprise-grade analytics platform with AI-powered insights, automated trend detection, pattern recognition, and data transformation capabilities supporting CSV, Excel, and JSON formats.", 
                    url: "https://github.com/aaronjager2000/datapilot" 
                  },
                  { 
                    title: "Competence Collective", 
                    desc: "Professional services website built with modern web technologies, featuring responsive design and optimized user experience for client engagement and business showcase.", 
                    url: "https://www.competencecollective.com" 
                  },
                  { 
                    title: "Apex Ecom", 
                    desc: "Click funnel website built with Next.js and modern web technologies.", 
                    url: "https://apexecom.vercel.app" 
                  }
                ].map((project, i) => (
                    <a
                      key={i}
                      href={project.url}
            target="_blank"
            rel="noopener noreferrer"
                      className="project-glass-card group"
                    >
                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--foreground)' }}>
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base opacity-60 tracking-tight leading-relaxed" style={{ color: 'var(--foreground)' }}>
                          {project.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div 
            className={`section-content ${activeSection === 'info' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <h2 className="absolute top-6 left-0 right-0 md:top-8 text-3xl md:text-4xl font-semibold tracking-tight text-center" style={{ color: 'var(--foreground)' }}>
              Philosophy & Approach
            </h2>
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
              <div className="max-w-2xl text-center">
                <div className="space-y-6" style={{ paddingBottom: '4rem' }}>
                  <p className="text-base leading-relaxed tracking-tight opacity-80" style={{ color: 'var(--foreground)' }}>
                    I believe the best digital experiences are invisible — they anticipate needs, remove friction, and leave users feeling effortlessly empowered.
                  </p>
                  <p className="text-sm leading-relaxed tracking-tight opacity-70" style={{ color: 'var(--foreground)' }}>
                    My approach combines precision engineering with thoughtful design. I build modular, scalable systems that integrate AI, modern web frameworks, and performance optimization.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider opacity-50" style={{ color: 'var(--foreground)', paddingBottom: '2rem' }}>
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {[
                      'React',
                      'Next.js',
                      'Tailwind CSS',
                      'Framer Motion',
                      'Express / FastAPI',
                      'GraphQL',
                      'Prisma / MongoDB',
                      'LangChain',
                      'OpenAI',
                      'Vercel / AWS'
                    ].map((tool, i) => (
                      <div
                        key={i}
                        className="relative flex items-center justify-center px-4 py-3 min-h-[56px] rounded-2xl backdrop-blur-md border overflow-hidden group cursor-default transition-all duration-300"
                        style={{ 
                          borderColor: 'var(--foreground)',
                          borderWidth: '0.5px',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(16px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
                          transform: 'translateZ(0)',
                          minWidth: '140px'
                        }}
                      >
                        <span className="relative z-10 text-xs md:text-sm tracking-tight font-medium" style={{ color: 'var(--foreground)' }}>
                          {tool}
                        </span>
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), 0 0 24px rgba(52, 211, 153, 0.08)'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div 
            className={`section-content ${activeSection === 'contact' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-right max-w-[280px] md:max-w-[320px]">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
                Let&apos;s Connect
              </h2>
              <p className="text-xs md:text-sm leading-relaxed tracking-tight opacity-70 mb-6" style={{ color: 'var(--foreground)' }}>
                Available for freelance & collaborations — let&apos;s create something exceptional.
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:aarongrantse@gmail.com"
                  className="flex items-center justify-end gap-3 hover:opacity-70 transition-opacity group"
                >
                  <span className="text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
                    aarongrantse@gmail.com
                  </span>
                  <Mail size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a
                  href="https://github.com/aaronjager2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 hover:opacity-70 transition-opacity group"
                >
                  <span className="text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
                    aaronjager2000
                  </span>
                  <Github size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/aarongrant/"
            target="_blank"
            rel="noopener noreferrer"
                  className="flex items-center justify-end gap-3 hover:opacity-70 transition-opacity group"
          >
                  <span className="text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
                    @aarongrant
                  </span>
                  <Linkedin size={18} style={{ color: 'var(--foreground)' }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

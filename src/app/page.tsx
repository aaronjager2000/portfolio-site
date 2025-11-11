'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import ThemeToggle from "@/components/ThemeToggle";
import UnicornBackground from "@/components/UnicornBackground";

type Section = 'home' | 'projects' | 'info' | 'contact';

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
    const handleMouseMove = () => {
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

      {/* Full viewport background - Never re-renders */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }} />
      
      {/* Content container with border - Never re-renders */}
      <div className="fixed inset-6 md:inset-8 lg:inset-10 overflow-hidden" style={{ borderColor: 'var(--foreground)', borderWidth: '0.5px', borderStyle: 'solid' }}>
        {/* Background animation - Controlled by cursor activity */}
        <UnicornBackground isIdle={isIdle} />
        
        {/* Desktop Navigation - Never re-renders */}
        <nav className="hidden sm:block absolute top-0 left-0 right-0 z-50 px-6 py-6 md:py-8">
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

        {/* Mobile left-side navigation - p5aholic style */}
        <nav className="sm:hidden absolute left-6 top-32 z-50 flex flex-col gap-3">
          <button
            onClick={() => handleSectionChange('home')}
            className="flex items-center gap-2 text-sm tracking-tight transition-opacity hover:opacity-100"
            style={{ color: 'var(--foreground)' }}
            aria-current={activeSection === 'home' ? 'page' : undefined}
          >
            {activeSection === 'home' && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
            )}
            <span className={activeSection === 'home' ? 'opacity-100 font-medium' : 'opacity-60'}>
              Home
            </span>
          </button>
          <button
            onClick={() => handleSectionChange('projects')}
            className="flex items-center gap-2 text-sm tracking-tight transition-opacity hover:opacity-100"
            style={{ color: 'var(--foreground)' }}
            aria-current={activeSection === 'projects' ? 'page' : undefined}
          >
            {activeSection === 'projects' && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
            )}
            <span className={activeSection === 'projects' ? 'opacity-100 font-medium' : 'opacity-60'}>
              Projects
            </span>
          </button>
          <button
            onClick={() => handleSectionChange('info')}
            className="flex items-center gap-2 text-sm tracking-tight transition-opacity hover:opacity-100"
            style={{ color: 'var(--foreground)' }}
            aria-current={activeSection === 'info' ? 'page' : undefined}
          >
            {activeSection === 'info' && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
            )}
            <span className={activeSection === 'info' ? 'opacity-100 font-medium' : 'opacity-60'}>
              Info
            </span>
          </button>
          <button
            onClick={() => handleSectionChange('contact')}
            className="flex items-center gap-2 text-sm tracking-tight transition-opacity hover:opacity-100"
            style={{ color: 'var(--foreground)' }}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            {activeSection === 'contact' && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
            )}
            <span className={activeSection === 'contact' ? 'opacity-100 font-medium' : 'opacity-60'}>
              Contact
            </span>
          </button>
        </nav>

        {/* Content area - Only this animates */}
        <div className="absolute inset-0 z-10">
          {/* HOME */}
          <div 
            className={`section-content ${activeSection === 'home' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            {/* Desktop layout */}
            <div className="hidden sm:block">
              <div className="absolute top-6 left-6 md:top-8 md:left-8 text-center max-w-[80%]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                  Aaron Grant
                </h1>
                <h2 className="text-[13px] sm:text-sm md:text-base tracking-tight opacity-80 font-light" style={{ color: 'var(--foreground)' }}>
                  Co-Founder of Magnara.AI
                </h2>
              </div>
              
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 max-w-[220px] sm:max-w-[240px]">
                <p className="text-[13px] leading-6 md:text-sm md:leading-relaxed tracking-tight opacity-70" style={{ color: 'var(--foreground)' }}>
                  As a full-stack engineer and founder, I believe the best interfaces are silent. With a mission to create effortless interactions, I transform complex problems into seamless integrations, pursuing new expressions through my thoughts.
                </p>
              </div>
            </div>

            {/* Mobile layout - p5aholic style */}
            <div className="sm:hidden">
              <div className="absolute top-6 left-6">
                <h1 className="text-[2.5rem] leading-[1.1] font-light tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
                  Aaron Grant
                </h1>
                <h2 className="text-sm tracking-tight opacity-70 font-light" style={{ color: 'var(--foreground)' }}>
                  Co-Founder of Magnara.AI
                </h2>
              </div>
              
              <div className="absolute bottom-6 right-6 max-w-[280px] text-right">
                <p className="text-[13px] leading-[1.75] tracking-tight opacity-70 font-light" style={{ color: 'var(--foreground)' }}>
                  As a full-stack engineer and founder, I believe the best interfaces are silent. With a mission to create effortless interactions, I transform complex problems into seamless integrations, pursuing new expressions through my thoughts.
                </p>
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div 
            className={`section-content ${activeSection === 'projects' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="hidden sm:block absolute top-6 left-0 right-0 md:top-8 text-center">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ color: 'var(--foreground)' }}>
                Projects
              </h2>
            </div>
            <div className="hidden sm:flex absolute inset-0 items-center justify-center p-8 md:p-12">
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
                      url: "https://datapilot-landing.vercel.app/" 
                    },
                    { 
                      title: "Dijkstra's Algorithm Visualizer", 
                      desc: "Simple visualizer for Dijkstra's pathfinding algorithm using React with JavaScript.", 
                      url: "https://github.com/aaronjager2000/djikstras-algo" 
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
            
            {/* Mobile scrollable version - p5aholic style */}
            <div className="sm:hidden absolute inset-0 overflow-y-auto pl-6 pr-7 pt-6 pb-20">
              <div className="space-y-12 ml-auto text-right" style={{ maxWidth: 'calc(100% - 4px)' }}>
                {[
                  { 
                    title: "Magnara.AI", 
                    date: "2024",
                    role: "Co-Founder / Dev / Design",
                    desc: "AI-powered legal automation platform for immigration law firms featuring workflow automation, document management, AI-driven intake processing, and case tracking with role-based access control.", 
                    url: "https://www.magnara.ai" 
                  },
                  { 
                    title: "DataPilot", 
                    date: "2024",
                    role: "Dev / Design",
                    desc: "Enterprise-grade analytics platform with AI-powered insights, automated trend detection, pattern recognition, and data transformation capabilities supporting CSV, Excel, and JSON formats.", 
                    url: "https://datapilot-landing.vercel.app/" 
                  },
                  { 
                    title: "Dijkstra's Algorithm Visualizer", 
                    date: "2023",
                    role: "Dev",
                    desc: "Simple visualizer for Dijkstra's pathfinding algorithm using React with JavaScript.", 
                    url: "https://github.com/aaronjager2000/djikstras-algo" 
                  },
                  { 
                    title: "Apex Ecom", 
                    date: "2024",
                    role: "Dev / Design",
                    desc: "Click funnel website built with Next.js and modern web technologies.", 
                    url: "https://apexecom.vercel.app" 
                  }
                ].map((project, i) => (
                  <a
                    key={i}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-[1.5rem] leading-[1.2] font-light tracking-tight mb-1 group-hover:opacity-70 transition-opacity wrap-break-word" style={{ color: 'var(--foreground)' }}>
                      {project.title}
                    </h3>
                    <p className="text-xs tracking-tight opacity-60 mb-3 font-medium" style={{ color: 'var(--foreground)' }}>
                      {project.date} / {project.role}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div 
            className={`section-content ${activeSection === 'info' && !isTransitioning ? 'section-active' : 'section-hidden'}`}
          >
            <div className="hidden sm:block absolute top-6 left-0 right-0 md:top-8 text-center">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ color: 'var(--foreground)' }}>
                Philosophy & Approach
              </h2>
            </div>
            <div className="hidden sm:flex absolute inset-0 items-center justify-center p-8 md:p-12">
              <div className="max-w-2xl text-center">
                <div className="space-y-6" style={{ paddingBottom: '4rem' }}>
                  <p className="text-base leading-relaxed tracking-tight opacity-80" style={{ color: 'var(--foreground)' }}>
                    I believe the best digital experiences are invisible; they anticipate needs, remove friction, and leave users feeling effortlessly empowered.
                  </p>
                  <p className="text-sm leading-relaxed tracking-tight opacity-70" style={{ color: 'var(--foreground)' }}>
                    My approach combines precision engineering with thoughtful design. I build modular, scalable systems that integrate AI, modern web frameworks, and performance optimization to craft beautiful solutions to existing problems.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider opacity-50" style={{ color: 'var(--foreground)', paddingBottom: '2rem' }}>
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {[
                      'React / TypeScript',
                      'Next.js',
                      'Tailwind CSS',
                      'Framer Motion',
                      'Python',
                      'Node.js ',
                      'Express / FastAPI',
                      'GraphQL / REST',
                      'Prisma / MongoDB',
                      'LangChain',
                      'Docker / Railway',
                      'Jupyter',
                      'C# / .NET',
                      'OpenAI',
                      'Vercel / AWS',
                      'Figma'
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
            
            {/* Mobile scrollable version - p5aholic style */}
            <div className="sm:hidden absolute left-6 right-6 top-[260px]">
              <div className="max-w-[320px] mx-auto text-center">
                <div className="space-y-4">
                  <p className="text-[12px] leading-[1.65] tracking-tight opacity-80 font-light" style={{ color: 'var(--foreground)' }}>
                    I believe the best digital experiences are invisible; they anticipate needs, remove friction, and leave users feeling effortlessly empowered.
                  </p>
                  <p className="text-[12px] leading-[1.65] tracking-tight opacity-70 font-light" style={{ color: 'var(--foreground)' }}>
                    My approach combines precision engineering with thoughtful design. I build modular, scalable systems that integrate AI, modern web frameworks, and performance optimization to craft beautiful solutions to existing problems.
                  </p>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <h3 className="text-[10px] uppercase tracking-widest opacity-50 mb-4 font-medium" style={{ color: 'var(--foreground)' }}>
                    Tools & Technologies
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-light tracking-tight" style={{ color: 'var(--foreground)' }}>
                    {[
                      'React / TypeScript',
                      'Next.js',
                      'Tailwind CSS',
                      'Framer Motion',
                      'Python',
                      'Node.js',
                      'Express / FastAPI',
                      'GraphQL / REST',
                      'Prisma / MongoDB',
                      'LangChain',
                      'Docker / Railway',
                      'Jupyter',
                      'C# / .NET',
                      'OpenAI',
                      'Vercel / AWS',
                      'Figma'
                    ].map((tool, i) => (
                      <div key={i} className="opacity-70 hover:opacity-100 transition-opacity">
                        {tool}
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
                Let&apos;s Connect
              </h2>
              <p className="text-[13px] sm:text-xs md:text-sm leading-relaxed tracking-tight opacity-70 mb-6" style={{ color: 'var(--foreground)' }}>
                Available for freelance & collaborations.<br />
                Let&apos;s create something exceptional.
              </p>
              
              <div className="space-y-3">
                <a
                  href="mailto:aaron@magnara.ai"
                  className="flex items-center justify-end gap-3 py-2.5 hover:opacity-70 transition-opacity group min-h-[44px]"
                >
                  <span className="text-[13px] sm:text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
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
                  <span className="text-[13px] sm:text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
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
                  <span className="text-[13px] sm:text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
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
                  <span className="text-[13px] sm:text-xs md:text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>
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

import ThemeToggle from "@/components/ThemeToggle";
import UnicornBackground from "@/components/UnicornBackground";

export default function Home() {
  return (
    <>
      {/* Full viewport background */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }} />
      
      {/* Glow effect that extends beyond border */}
      <div className="fixed inset-0 -z-5 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[800px] h-[800px] rounded-full blur-[120px] opacity-40 transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.2) 30%, transparent 70%)'
          }}
        />
      </div>
      
      {/* Content container with border */}
      <div className="fixed inset-6 md:inset-8 lg:inset-10 overflow-hidden" style={{ borderColor: 'var(--foreground)', borderWidth: '0.5px', borderStyle: 'solid' }}>
        <UnicornBackground />
        
        {/* Top Left Text */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
            Aaron Grant
          </h1>
          <h2 className="text-sm md:text-base tracking-tight opacity-80" style={{ color: 'var(--foreground)' }}>
            Co-Founder of Magnara.AI
          </h2>
        </div>
        
        {/* Bottom Left Text - Bio */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-50 max-w-[200px] md:max-w-[240px]">
          <p className="text-xs md:text-sm leading-relaxed tracking-tight opacity-70" style={{ color: 'var(--foreground)' }}>
            Founder and full-stack engineer crafting calm, immersive user experiences. I love turning complex systems into modular systems that work together effortlessly; integrating precision, performance, and purpose into every interaction.
          </p>
        </div>
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-6 md:gap-8 text-sm" style={{ color: 'var(--foreground)' }}>
              <a href="#home" className="hover:opacity-70 transition-opacity tracking-tight">
                Home
              </a>
              <a href="#projects" className="hover:opacity-70 transition-opacity tracking-tight">
                Projects
              </a>
              <a href="#info" className="hover:opacity-70 transition-opacity tracking-tight">
                Info
              </a>
              <a href="#contact" className="hover:opacity-70 transition-opacity tracking-tight">
                Contact
              </a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

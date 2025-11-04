import ThemeToggle from "@/components/ThemeToggle";
import UnicornBackground from "@/components/UnicornBackground";

export default function Home() {
  return (
    <>
      {/* Full viewport background */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }} />
      
      {/* Content container with border */}
      <div className="fixed inset-6 md:inset-8 lg:inset-10 overflow-hidden" style={{ borderColor: 'var(--foreground)', borderWidth: '0.5px', borderStyle: 'solid' }}>
        <UnicornBackground />
        
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

'use client';

import { useEffect, useState } from 'react';

export default function UnicornBackground() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Load UnicornStudio script
    if (typeof window !== 'undefined' && !(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = function() {
        if (!(window as any).UnicornStudio.isInitialized) {
          (window as any).UnicornStudio.init();
          (window as any).UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }

    // Watch for theme changes
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'dark');
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`absolute inset-0 -z-10 overflow-hidden transition-all duration-300 rounded-none ${
        theme === 'light' 
          ? 'bg-gradient-to-tr from-neutral-100 via-neutral-50 to-neutral-100' 
          : 'bg-gradient-to-tr from-neutral-950 via-neutral-950/90 to-neutral-900/60'
      }`}
    >
      <div className={`absolute inset-0 ${theme === 'light' ? 'saturate-50 brightness-125 opacity-30' : 'saturate-50 brightness-75'}`}>
        <div className="aura-background-component absolute w-full h-full top-0 left-0">
          <div 
            data-us-project="inzENTvhzS9plyop7Z6g" 
            className="absolute w-full h-full left-0 top-0 -z-10"
          />
        </div>
      </div>
    </div>
  );
}


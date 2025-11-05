'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}

interface UnicornBackgroundProps {
  isIdle: boolean;
}

export default function UnicornBackground({ isIdle }: UnicornBackgroundProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Load UnicornStudio script
    if (typeof window !== 'undefined' && !window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = function() {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
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
      className="absolute inset-0 -z-10 overflow-hidden rounded-none"
      style={{
        background: theme === 'light' 
          ? 'linear-gradient(to top right, rgb(245, 245, 245), rgb(250, 250, 250), rgb(245, 245, 245))' 
          : 'linear-gradient(to top right, rgb(10, 10, 10), rgba(10, 10, 10, 0.9), rgba(23, 23, 23, 0.6))',
        transition: 'background 0.5s ease, filter 0.5s ease, opacity 0.5s ease'
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          filter: theme === 'light' ? 'saturate(0.5) brightness(1.25)' : 'saturate(0.5) brightness(0.75)',
          opacity: theme === 'light' ? 0.3 : 1,
          transition: 'filter 0.5s ease, opacity 0.5s ease'
        }}
      >
        <div 
          className="aura-background-component absolute w-full h-full top-0 left-0"
          style={{
            animationPlayState: isIdle ? 'running' : 'paused',
            transition: 'opacity 0.5s ease'
          }}
        >
          <div 
            data-us-project="inzENTvhzS9plyop7Z6g" 
            className="absolute w-full h-full left-0 top-0 -z-10"
            style={{
              animationPlayState: isIdle ? 'running' : 'paused'
            }}
          />
        </div>
      </div>
    </div>
  );
}


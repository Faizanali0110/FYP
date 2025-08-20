import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

function systemPrefersDark() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }) {
  // Determine initial theme: use stored preference if present; otherwise follow system
  const initialDark = (() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
    } catch (_) {
      // noop
    }
    return systemPrefersDark();
  })();

  const [darkMode, setDarkMode] = useState(initialDark);

  // Apply or remove the `dark` class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // If user has NOT explicitly chosen a theme, keep following system changes
  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (!mq) return;

    let userHasPreference = false;
    try {
      userHasPreference = localStorage.getItem('theme') !== null;
    } catch (_) {
      userHasPreference = false;
    }

    if (userHasPreference) return; // Respect user's stored choice; do not auto-switch

    const handleChange = (e) => setDarkMode(e.matches);

    // Add listener (support older browsers)
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handleChange);
    else if (typeof mq.addListener === 'function') mq.addListener(handleChange);

    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handleChange);
      else if (typeof mq.removeListener === 'function') mq.removeListener(handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (_) {
        // ignore storage errors
      }
      return next;
    });
  };

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

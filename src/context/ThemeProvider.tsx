import { useState, useEffect } from 'react';

import {
  ThemeContext,
  type ThemeContextType,
  type ThemeType,
} from '@/context/ThemeContext';
import { getTheme, saveTheme } from '@/utils/themeStorage';

const getSystemPrefersDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme);
  const [systemPrefersDark, setSystemPrefersDark] =
    useState(getSystemPrefersDark);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) =>
      setSystemPrefersDark(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // If theme is 'system', systemPrefersDark returns 'dark' when true and 'light' when false.
  // If them is not 'system', return theme.
  const resolvedTheme: Exclude<ThemeType, 'system'> =
    theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const handleTheme = (t: ThemeType) => {
    setTheme(t);
    saveTheme(t);
  };

  const value: ThemeContextType = {
    theme,
    handleTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;

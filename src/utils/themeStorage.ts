import type { ThemeType } from '@/context/ThemeContext';

const THEME_KEY = 'theme';

export const getTheme = (): ThemeType => {
  const raw = localStorage.getItem(THEME_KEY);
  return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system';
};

export const saveTheme = (t: ThemeType): void => {
  localStorage.setItem(THEME_KEY, t);
};

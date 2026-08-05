import { createContext } from 'react';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: ThemeType;
  resolvedTheme: Exclude<ThemeType, 'system'>;
  handleTheme: (t: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

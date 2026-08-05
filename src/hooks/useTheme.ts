import { useContext } from "react";

import { ThemeContext, type ThemeContextType } from "@/context/ThemeContext";

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used wihtin a ThemeProvider.'
    )
  }

  return context;
}

export default useTheme;
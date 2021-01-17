import React, { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState("mode-dark");
  const colorTheme = theme === "mode-dark" ? "light" : "mode-dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme]);
  return [colorTheme, setTheme] as const;
}
export default useDarkMode;

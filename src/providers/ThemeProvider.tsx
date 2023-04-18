'use client';

import classNames from 'classnames';
import { parseCookies, setCookie } from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a context for the default value
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {}
});

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies.theme) {
      setTheme(cookies.theme === 'dark' ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const mode = theme === 'light' ? 'dark' : 'light';

    setTheme(mode);

    setCookie(null, 'theme', mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={classNames('h-full w-full', theme)}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextProps => useContext(ThemeContext);

export { ThemeProvider, useTheme };

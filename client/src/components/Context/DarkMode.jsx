// DarkMode.js
import React, { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (savedDarkMode !== null) {
      // If there's a saved preference, use it
      setIsDarkMode(savedDarkMode);
      document.documentElement.classList.toggle('dark', savedDarkMode);
    } else {
      // If no saved preference, enable dark mode by default
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

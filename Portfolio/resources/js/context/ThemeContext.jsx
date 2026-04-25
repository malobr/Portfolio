import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('portfolio-theme') || 'stealth';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-stealth', 'theme-flash');
        root.classList.add(`theme-${theme}`);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'stealth' ? 'flash' : 'stealth');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

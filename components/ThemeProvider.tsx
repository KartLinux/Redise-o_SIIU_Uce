// components/ThemeProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { Colors } from '../constants/Colors';

// Define el tipo de contexto
type ThemeContextType = {
  theme: 'light' | 'dark';
  colors: typeof Colors.light;
};

// Crea el contexto
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: Colors.light,
});

// Componente Provider para envolver la app
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<'light' | 'dark'>('light'); // Puedes hacerlo dinámico después
  const colors = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useTheme = () => useContext(ThemeContext);
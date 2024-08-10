"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Framework = 'daisyui' | 'bootstrap' | 'tailwind';

interface FrameworkContextType {
  framework: Framework;
  setFramework: (framework: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined);

export const FrameworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [framework, setFramework] = useState<Framework>('daisyui');

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
};

export const useFramework = () => {
  const context = useContext(FrameworkContext);
  if (context === undefined) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return context;
};
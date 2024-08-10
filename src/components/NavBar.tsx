'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { useFramework } from '../context/FrameworkContext';
import { Framework } from '../types/Framework'; // Added this import

const NavBar: React.FC = () => {
  const { framework, setFramework } = useFramework();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">UI Component Generator</Link>
      </div>
      <div className="flex-none">
        <select 
          value={framework} 
          onChange={(e) => setFramework(e.target.value as Framework)}
          className="select select-bordered"
        >
          <option value="daisyui">DaisyUI</option>
          <option value="bootstrap">Bootstrap</option>
          <option value="tailwind">Tailwind CSS</option>
        </select>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">UI Component Generator</Link>
      </div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
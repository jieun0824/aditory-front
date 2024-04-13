'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';
import { FaMoon } from 'react-icons/fa';

export function ModeToggle() {
  const { setTheme, theme }: any = useTheme();
  const switchHandler = (theme: string) => {
    console.log(theme);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex items-center space-x-2'>
      {theme === 'dark' ? <Moon /> : <Sun />}
      <Switch id='airplane-mode' onCheckedChange={() => switchHandler(theme)} />
    </div>
  );
}

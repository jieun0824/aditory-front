'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';
import { useEffect } from 'react';

export function ModeToggle() {
  const { setTheme, theme }: any = useTheme();
  //add default value for prevent hydration-error
  useEffect(() => {
    setTheme('light');
  }, []);

  const switchHandler = (theme: string) => {
    // console.log(theme);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex items-center space-x-2'>
      {theme === 'dark' ? <Moon /> : <Sun />}
      <Switch id='theme' onCheckedChange={() => switchHandler(theme)} />
    </div>
  );
}

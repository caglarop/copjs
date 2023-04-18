'use client';

import { MdOutlineDarkMode, MdOutlineLight } from 'react-icons/md';

import Button from '@/components/atoms/buttons/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Button clickHandler={() => toggleTheme()} size="small">
        {theme === 'dark' ? <MdOutlineDarkMode /> : <MdOutlineLight />}
      </Button>
    </>
  );
}

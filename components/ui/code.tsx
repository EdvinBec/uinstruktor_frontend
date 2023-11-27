import { useTheme } from 'next-themes';
import React, { ReactNode } from 'react';

const Codetag = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <span
      className={
        'p-1 border text-center  rounded-lg ' +
        (theme.theme === 'light'
          ? 'bg-slate-100 border-black/20'
          : 'bg-stone-800 border-stone-600')
      }
    >
      {children}
    </span>
  );
};

export default Codetag;

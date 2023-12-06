import { useTheme } from 'next-themes';
import React, { ReactNode } from 'react';

const Codetag = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className={
        'p-1 border text-center rounded-lg bg-slate-100 dark:bg-stone-800 dark:border-stone-600 border-black/20'
      }
    >
      {children}
    </span>
  );
};

export default Codetag;

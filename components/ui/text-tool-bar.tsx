import React, { ReactNode } from 'react';

const Toolbar = ({ children }: { children: ReactNode }) => {
  return <div className="flex-row flex gap-2 p-2">{children}</div>;
};

export default Toolbar;

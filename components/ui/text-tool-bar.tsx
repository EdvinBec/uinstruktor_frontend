import React, { ReactNode } from 'react';

const Toolbar = ({ children }: { children: ReactNode }) => {
  return <div className="flex-row flex gap-2 pb-2 flex-wrap">{children}</div>;
};

export default Toolbar;

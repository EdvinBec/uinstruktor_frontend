import React from "react";

const AssigmentInfoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl min-w-[60%] mx-auto min-h-screen h-full flex flex-col">
      {children}
    </div>
  );
};

export default AssigmentInfoLayout;

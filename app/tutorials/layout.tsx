"use client";

const TutorialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-[90vh] flex md:justify-center">{children}</div>
  );
};

export default TutorialLayout;

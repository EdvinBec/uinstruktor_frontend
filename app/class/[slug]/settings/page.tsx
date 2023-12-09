import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ClassSettingsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="p-6 w-full md:w-3/4">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <div className="space-y-4 p-6">
        <div></div>
      </div>
    </div>
  );
};

export default ClassSettingsPage;

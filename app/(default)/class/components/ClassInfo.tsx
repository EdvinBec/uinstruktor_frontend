"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const ClassInfo = ({ className }: { className?: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        <Label>Naslov učilnice</Label>
        <Input
          value={title}
          onValueChange={(value) => {
            setTitle(value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Opis učilnice</Label>
        <Input
          value={title}
          onValueChange={(value) => {
            setTitle(value);
          }}
        />
      </div>
    </div>
  );
};

export default ClassInfo;

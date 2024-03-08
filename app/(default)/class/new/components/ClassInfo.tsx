"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const ClassInfo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Label>
        Naslov učilnice
        <Input
          value={title}
          onValueChange={(value) => {
            setTitle(value);
          }}
        />
      </Label>
      <Label>
        Opis učilnice
        <Input
          value={title}
          onValueChange={(value) => {
            setTitle(value);
          }}
        />
      </Label>
    </div>
  );
};

export default ClassInfo;

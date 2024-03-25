"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataMap } from "@/lib/types";
import clsx from "clsx";
import React from "react";

interface DynamicInputListProps extends React.HTMLAttributes<HTMLDivElement> {
  variables: string[],
  data: DataMap,
  onInputChange: (variable: string, value: string) => void
}

export default function DynamicInputList({ variables, data, onInputChange, className }: DynamicInputListProps) {
  return <div className={clsx("flex flex-col gap-3", className)}>
    {variables.map(variable => <div key={variable} className="flex flex-col gap-1">
      <Label htmlFor={variable} className="w-30">{variable}</Label>
      <Input type="text" id={variable} className="flex-1" value={data[variable]} onChange={(e) => onInputChange(variable, e.target.value)}/>
    </div>)}
  </div>;
}


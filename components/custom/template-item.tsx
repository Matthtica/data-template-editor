import React from "react";

interface TemplateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string
}

export default function TemplateItem({ filename }: TemplateItemProps) {
  return <div className="border border-input rounded-md bg-secondary p-2 px-3">
    {filename}
  </div>
}

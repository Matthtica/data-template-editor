import React from "react";

interface TemplateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string
}

export default function TemplateItem({ filename }: TemplateItemProps) {
  return <div className="transition-all duration-300 border border-input rounded-md p-2 px-3 hover:shadow-md">
    {filename}
  </div>
}

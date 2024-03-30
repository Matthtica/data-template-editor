"use client"
import LinkButton from "@/components/custom/link-button"
import ModeToggle from "@/components/custom/mode-toggle"
import TemplateItem from "@/components/custom/template-item";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";
import React from "react"

export default function Home() {
  const { templates } = useTemplateStorageContext();
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, [])
  if (!isMounted) return null;

  return <div className="mx-auto max-w-[40rem] flex flex-col">
    <div className="p-2 flex justify-between">
      <ModeToggle variant="ghost" />
      <LinkButton href="/editor">New Template</LinkButton>
    </div>
    <h1 className="text-2xl font-bold m-3">List of template</h1>
    <div className="rounded-md shadow-lg min-h-40 p-3 flex flex-col gap-3">
      {templates.map((template) => {
        return <TemplateItem key={template.id} template={template}/>
      })}
    </div>
  </div>
}

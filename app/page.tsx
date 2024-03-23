"use client"
import LinkButton from "@/components/custom/link-button"
import ModeToggle from "@/components/custom/mode-toggle"
import TemplateItem from "@/components/custom/template-item";
import { DBNAME } from "@/lib/constants";
import { TemplateMap } from "@/lib/types";
import React from "react"

export default function Home() {
  const [names, setNames] = React.useState<string[]>();
  const [db, setDb] = React.useState<TemplateMap>();

  React.useEffect(() => {
    const stored_object = window.localStorage.getItem(DBNAME);
    if (stored_object) {
      let database: TemplateMap = JSON.parse(stored_object);
      setNames(Object.keys(database));
      setDb(database);
    }
  }, [])

  return <div className="mx-auto max-w-[40rem] flex flex-col">
    <div className="p-2 flex justify-between">
      <ModeToggle variant="ghost" />
      <LinkButton href="/editor">New Template</LinkButton>
    </div>
    <h1 className="text-2xl font-bold m-3">List of template</h1>
    <div className="border border-input rounded-md shadow-md min-h-40 p-3 flex flex-col gap-3">
      {names?.map((name) => {
        return <TemplateItem key={name} filename={name}/>
      })}
    </div>
  </div>
}

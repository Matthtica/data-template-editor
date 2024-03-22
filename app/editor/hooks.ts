import { toast } from "@/components/ui/use-toast";
import { DBNAME } from "@/lib/constants";
import { JSONContent } from "novel";
import React from "react";
import { TemplateMap } from "@/lib/types";


export function useTemplateSaver() {
  const [content, setContent] = React.useState<JSONContent | undefined>();
  const [name, setName] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnSave = () => {
    if (name === "") {
      return
    }
    let database: TemplateMap = {};
    const existing_db = window.localStorage.getItem(DBNAME);
    if (existing_db) {
      database = JSON.parse(existing_db);
    }
    if (content) {
      database[name] = content;
    }
    window.localStorage.setItem(DBNAME, JSON.stringify(database));
    setName("");
    setIsOpen(false);
    toast({
      title: "Saved Template",
      description: `The template ${name} has been save to the local storage`
    })
  }
  return {
    isModelOpen: isOpen,
    setIsModelOpen: setIsOpen,
    content,
    setContent,
    name, setName,
    saveToLocalStorage: handleOnSave
  };
}

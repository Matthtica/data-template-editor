import { toast } from "@/components/ui/use-toast";
import React from "react";
import { EditorPageRouteParams } from "@/lib/types";
import { getLocalStorageDB, setLocalStorageDB } from "@/lib/utils";

// helper function with a dialog for the name of the template to be saved
export function useTemplateSaver(setIsOpen: (value: boolean) => void) {
  const [name, setName] = React.useState("");

  const saveContent = (content: string) => {
    if (name === "") return;
    let database = getLocalStorageDB();
    if (content) {
      database[name] = content;
    }
    setLocalStorageDB(database);
    setName("");
    setIsOpen(false);
    toast({
      title: "Saved Template",
      description: `The template ${name} has been save to the local storage`
    });
  }
  return {
    name, setName,
    saveContent
  };
}


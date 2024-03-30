import React from "react";
import { DataMap } from "./types";
import { fillData } from "./utils";
import { toast } from "@/components/ui/use-toast";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";

export function useTemplateInputData(template_content: string) {
  const [content, setContent] = React.useState(template_content);
  const [data, setData] = React.useState<DataMap>({});

  const handleInputChange = (variable: string, value: string) => {
    let tempdata = data;
    tempdata[variable] = value;
    setData(tempdata);
    let filledTemplate = fillData(template_content, data);
    setContent(filledTemplate);
  }
  return {
    content,
    data,
    handleInputChange
  }
}

export function useTemplateSaver(setIsOpen: (value: boolean) => void) {
  const { addTemplate } = useTemplateStorageContext();
  const [name, setName] = React.useState("");

  const saveContent = (content: string) => {
    if (name === "") return;
    addTemplate(name, content);
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

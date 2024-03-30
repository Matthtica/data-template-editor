import { Template } from "@/lib/types";
import { getTemplatesFromLocalStorage, saveTemplatesToLocalStorage } from "@/lib/utils";
import React from "react";
import { v4 as uuid } from "uuid";

interface ITemplateStorageContext {
  templates: Template[],
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>,
  getTemplate: (id: string) => Template | null,
  addTemplate: (name: string, content: string) => void,
  updateTemplate: (id: string, content: string) => void,
  deleteTemplate: (id: string) => void
}

const TemplateStorageContext = React.createContext<ITemplateStorageContext>({
  templates: [],
  setTemplates: () => {},
  getTemplate: () => null,
  addTemplate: () => {},
  updateTemplate: () => {},
  deleteTemplate: () => {}
});

interface TemplateStorageProviderProps {
  children: React.ReactNode
}

export function TemplateStorageProvider({ children }: TemplateStorageProviderProps) {
  const [templates, setTemplates] = React.useState<Template[]>([]);

  React.useEffect(() => {
    const data = getTemplatesFromLocalStorage();
    setTemplates(data);
  }, []);

  React.useEffect(() => {
    if (templates.length !== 0) {
      saveTemplatesToLocalStorage(templates);
    }
  }, [templates]);

  const getTemplate = (id: string) => {
    return templates.find((template) => template.id === id) || null;
  }

  const addTemplate = (name: string, content: string) => {
    setTemplates([...templates, { id: uuid(), name, content }]);
  }

  const updateTemplate = (id: string, content: string) => {
    let new_data = templates.map((template) => {
      if (template.id === id) {
        return { ...template, content };
      }
      return template;
    });
    setTemplates(new_data);
  }

  const deleteTemplate = (id: string) => {
    let new_data = templates.filter((template) => template.id !== id);
    setTemplates(new_data);
  }

  return <TemplateStorageContext.Provider value={{
    templates,
    setTemplates,
    getTemplate,
    addTemplate,
    updateTemplate,
    deleteTemplate }}>
    {children}
  </TemplateStorageContext.Provider>
}

export const useTemplateStorageContext = () => React.useContext(TemplateStorageContext);

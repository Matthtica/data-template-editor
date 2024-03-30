import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DBNAME } from "./constants";
import { DataMap, Template } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTemplatesFromLocalStorage(): Template[] {
  const data = localStorage.getItem(DBNAME);
  return data ? JSON.parse(data) : [];
}

export function saveTemplatesToLocalStorage(templates: Template[]) {
  localStorage.setItem(DBNAME, JSON.stringify(templates));
}

export const extractVariables = (template: string) => {
  let variableRegex = /\$[a-zA-Z_][a-zA-Z0-9_]*/g;
  let matches = template.match(variableRegex);
  let variables = matches ? matches.map(match => match.substring(1)) : [];
  return variables;
}

export function fillData(template: string, data: DataMap) {
  let filledTemplate = template;
  for (let key in data) {
    let regex = new RegExp('\\$' + key, 'g');
    filledTemplate = filledTemplate.replace(regex, data[key]);
  }
  return filledTemplate;
}

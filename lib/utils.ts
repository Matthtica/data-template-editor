import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DBNAME } from "./constants";
import { DataMap, EditorPageRouteParams, TemplateMap } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalStorageDB(): TemplateMap {
  const stored_object = window.localStorage.getItem(DBNAME);
  if (!stored_object) {
    window.localStorage.setItem(DBNAME, JSON.stringify({}));
    return {};
  }
  const database: TemplateMap = JSON.parse(stored_object);
  return database;
}

export function setLocalStorageDB(database: TemplateMap) {
  window.localStorage.setItem(DBNAME, JSON.stringify(database));
}

export function deleteTemplate(name: string) {
  name = name.split("%20").join(" ");
  let database = getLocalStorageDB();
  delete database[name];
  setLocalStorageDB(database);
}

export function getCurrentContent({ params }: EditorPageRouteParams) {
  if (!params.template_name) return null;
  let template_name = params.template_name[0];
  return getTemplateByName(template_name);
}

export function getTemplateByName(name: string) {
  name = name.split("%20").join(" ");
  const database = getLocalStorageDB();
  return database[name];
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

export interface TemplateMap {
  [key: string]: string
}

export interface DataMap {
  [key: string]: string
}

export interface EditorPageRouteParams {
  params: {
    template_name?: string[]
  }
}

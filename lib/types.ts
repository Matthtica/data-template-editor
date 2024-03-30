export interface Template {
  id: string,
  name: string,
  content: string
}

export interface DataMap {
  [key: string]: string
}

export interface EditorPageRouteParams {
  params: {
    template_name?: string[]
  }
}

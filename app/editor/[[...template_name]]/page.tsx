'use client'
import React from "react";
import Tiptap from "@/components/tiptap/tiptap";
import ModeToggle from "@/components/custom/mode-toggle";
import { defaultExtensions } from "@/components/tiptap/extensions";
import { useEditor } from "@tiptap/react";
import TemplateSaver from "./components/template-saver";
import { getCurrentContent } from "@/lib/utils";

interface EditorPageRouteParams {
  params: {
    template_name?: string[]
  }
}

export default function EditorPage({ params }: EditorPageRouteParams) {
  const content = getCurrentContent({ params });

  const editor = useEditor({
    extensions: [...defaultExtensions],
    content: content ?? '<p>You can start typing here...</p>',
    editorProps: {
      attributes: {
        class: "outline-none pl-6"
      }
    }
  });

  if (!editor) return;
  return <div className="flex flex-col h-screen p-3 gap-3 w-full items-center max-w-[55em] mx-auto">
    <div className="flex justify-between w-full">
      <ModeToggle variant="ghost"/>
      <TemplateSaver editor={editor}/>
    </div>
    <Tiptap editor={editor} className="w-full rounded-md border border-input min-h-[55rem]"/>
  </div>
}

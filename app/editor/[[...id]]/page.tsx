'use client'
import React from "react";
import Tiptap from "@/components/tiptap/tiptap";
import ModeToggle from "@/components/custom/mode-toggle";
import { defaultExtensions } from "@/components/tiptap/extensions";
import { useEditor } from "@tiptap/react";
import TemplateSaver from "@/components/custom/template-saver";
import LinkButton from "@/components/custom/link-button";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";

interface EditorPageRouteParams {
  params: {
    id?: string[]
  }
}

export default function EditorPage({ params }: EditorPageRouteParams) {
  const { getTemplate } = useTemplateStorageContext();
  let content = '<p>You can start typing here...</p>';
  if (params.id) {
    content = getTemplate(params.id[0])?.content ?? content;
  }

  const editor = useEditor({
    extensions: [...defaultExtensions],
    content: content,
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
      <div className="flex gap-3">
        <LinkButton href="/" variant="outline">Back</LinkButton>
        <TemplateSaver id={params.id?.[0]} editor={editor}/>
      </div>
    </div>
    <Tiptap editor={editor} className="w-full rounded-md border border-input min-h-[55rem]"/>
  </div>
}

'use client'
import {
  EditorContent,
  useEditor,
  Editor,
} from '@tiptap/react'
import React from 'react';
import { NodeSelector } from './node-selector';
import { LinkSelector } from './link-selector';
import { TextButtons } from './text-buttons';
import { ColorSelector } from './color-selector';
import { defaultExtensions } from "./extensions";

interface TiptapProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function Tiptap({ className }: TiptapProps) {
  const editor = useEditor({
    extensions: [...defaultExtensions],
    content: '<p>Hello World!</p>',
  })
  return <div className={className}>
    <EditorMenu editor={editor}/>
    <EditorContent editor={editor}/>
  </div>
}

interface EditorMenuProps {
  editor: Editor | null
}

function EditorMenu({ editor }: EditorMenuProps) {
  const [openNode, setOpenNode] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  return <div className="flex w-full bg-cyan-500">
    <NodeSelector editor={editor} open={openNode} onOpenChange={setOpenNode}/>
    <LinkSelector editor={editor} open={openLink} onOpenChange={setOpenLink}/>
    <TextButtons editor={editor}/>
  </div>
}

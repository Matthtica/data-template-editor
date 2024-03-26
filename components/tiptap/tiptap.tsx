'use client'
import {
  EditorContent,
  Editor,
  EditorProvider
} from '@tiptap/react'
import React from 'react';
import { NodeSelector } from './node-selector';
import { LinkSelector } from './link-selector';
import { TextButtons } from './text-buttons';
import { ColorSelector } from './color-selector';

interface TiptapProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor | null
}

// TODO: Stop passing editor as props down to the grand child by using editor provider
export default function Tiptap({ editor, className }: TiptapProps) {
  return <div className={className}>
    <EditorMenu editor={editor}/>
    <EditorContent editor={editor} className="p-4"/>
  </div>
}

interface EditorMenuProps {
  editor: Editor | null
}

function EditorMenu({ editor }: EditorMenuProps) {
  const [openNode, setOpenNode] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);
  // TODO: Need color picker

  return <div className="flex w-full bg-secondary p-1">
    <NodeSelector editor={editor} open={openNode} onOpenChange={setOpenNode}/>
    <LinkSelector editor={editor} open={openLink} onOpenChange={setOpenLink}/>
    <TextButtons editor={editor}/>
  </div>
}

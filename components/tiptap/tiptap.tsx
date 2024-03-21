'use client'
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
} from '@tiptap/react'
import React from 'react';
import { NodeSelector } from './node-selector';
import { LinkSelector } from './link-selector';
import { TextButtons } from './text-buttons';
import { ColorSelector } from './color-selector';
import { defaultExtensions } from "./extensions";

const content = '<p>Hello World!</p>'

interface TiptapProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function Tiptap({ className }: TiptapProps) {
  const menuClassNames = "flex items-center rounded-md border-secondary border shadow-md p-1 bg-background";

  return <div className={className}>
    <EditorProvider extensions={[...defaultExtensions]} content={content}>
      <FloatingMenu className={menuClassNames}>
        <EditorMenu />
      </FloatingMenu>
      <BubbleMenu className={menuClassNames}>
        <EditorMenu />
      </BubbleMenu>
    </EditorProvider>
  </div>
}

function EditorMenu() {
  const [openNode, setOpenNode] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  return <>
    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
    <LinkSelector open={openLink} onOpenChange={setOpenLink} />
    <TextButtons />
    <ColorSelector open={openColor} onOpenChange={setOpenColor} />
  </>
}

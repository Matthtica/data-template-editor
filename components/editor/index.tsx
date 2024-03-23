"use client";
import {
  EditorContent,
  EditorRoot,
  EditorBubble,
} from "novel";
import { NodeSelector } from "./node-selector";
import { LinkSelector } from "./link-selector";
import { TextButtons } from "./text-buttons";
import { ColorSelector } from "./color-selector";
import { handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import React, { useState } from "react";

interface NovelEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string,
  setContent: (content: string) => void
}
export default function NovelEditor({ className, content, setContent }: NovelEditorProps) {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        className={className}
        autofocus={true}
        extensions={[...defaultExtensions]}
        initialContent={content ? JSON.parse(content) : undefined}
        onUpdate={({ editor }) => {
          const htmlstr = editor.getHTML();
          setContent(htmlstr);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark-prose-invert prose-headings:font-title font-default`
          }
        }}
      >
        <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background">
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

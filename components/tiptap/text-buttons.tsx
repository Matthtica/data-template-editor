import { cn } from "@/lib/utils";
import { Editor, useEditor } from "@tiptap/react";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from "lucide-react";
import type { SelectorItem } from "./node-selector";
import { Button } from "@/components/ui/button";

interface TextButtonsProps {
  editor: Editor | null
}

export function TextButtons({ editor }: TextButtonsProps) {
  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor?.isActive("bold") ?? false,
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor?.isActive("italic") ?? false,
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor?.isActive("underline") ?? false,
      command: (editor) => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor?.isActive("strike") ?? false,
      command: (editor) => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: (editor) => editor?.isActive("code") ?? false,
      command: (editor) => editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];
  return <div className='flex'>
      {items.map((item, index) => (
        <Button key={index} size='icon' variant='ghost'
          onClick={() => item.command(editor)}
        >
          <item.icon
            className={cn("h-4 w-4", {
              "text-blue-500": item.isActive(editor),
            })}
          />
        </Button>
      ))}
    </div>
};

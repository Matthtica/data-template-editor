import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--novel-black)",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--novel-highlight-gray)",
  },
];

interface ColorSelectorProps {
  editor: Editor | null,
  open: boolean,
  onOpenChange: (open: boolean) => void;
}

export function ColorSelector({ editor, open, onOpenChange }: ColorSelectorProps) {
  if (!editor) return;
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive("textStyle", { color }));

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <Button variant='ghost'>
        <span
          className='rounded-sm px-1'
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}>
          A
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {HIGHLIGHT_COLORS.map(({ name, color }, index) => {
        return <DropdownMenuItem key={index}
          onSelect={() => {
            editor.chain().focus().unsetHighlight().run();
            name !== "Default" && editor.chain().focus().setHighlight({ color }).run();
          }}
        >
          <div
            className="rounded-md border px-2 py-px font-medium"
            style={{ backgroundColor: color }}>
            A
          </div>
          <span>{name}</span>
        </DropdownMenuItem>
      })}
    </DropdownMenuContent>
  </DropdownMenu>
}

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTemplateSaver } from "../hooks";
import { Editor } from "@tiptap/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TemplateSaverProps {
  editor: Editor
}

export default function TemplateSaver({ editor }: TemplateSaverProps) {
  const [open, setIsOpen] = React.useState(false);
  const {name, setName, saveContent} = useTemplateSaver(setIsOpen);

  return <Dialog open={open} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button>
        Save Template
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Give a name for the template
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        If the name already exists, it will be overwritten
      </DialogDescription>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={() => saveContent(editor.getHTML())}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

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
import { useTemplateSaver } from "@/lib/hooks";
import { Editor } from "@tiptap/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";
import { toast } from "../ui/use-toast";

interface TemplateSaverProps {
  id?: string,
  editor: Editor
}

export default function TemplateSaver({ id, editor }: TemplateSaverProps) {
  const [open, setIsOpen] = React.useState(false);
  const {name, setName, saveContent} = useTemplateSaver(setIsOpen);
  const { updateTemplate } = useTemplateStorageContext();

  return id ? <Button onClick={() => {
    updateTemplate(id, editor.getHTML());
    toast({
      title: "Saved Template",
      description: `The template ${name} has been saved to the local storage`
    });
  }}>Save Template</Button> : <Dialog open={open} onOpenChange={setIsOpen}>
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
        <Button onClick={() => {
            saveContent(editor.getHTML());
            toast({
              title: "Saved Template",
              description: `The template has been saved to the local storage with the name ${name}`
            })
        }}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

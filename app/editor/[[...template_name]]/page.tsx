'use client'
import NovelEditor from "@/components/editor";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTemplateSaver } from "./hooks";
import { DBNAME } from "@/lib/constants";
import { TemplateMap } from "@/lib/types";
import Tiptap from "@/components/tiptap/tiptap";

interface EditorPageRouteParams {
  params: {
    template_name?: string[]
  }
}

export default function EditorPage({ params }: EditorPageRouteParams) {
  const {
    content, setContent,
    isModelOpen, setIsModelOpen,
    saveToLocalStorage,
    name, setName
  } = useTemplateSaver();

  React.useEffect(() => {
    if (!params.template_name) return;
    const template_name = params.template_name[0];
    const stored_object = window.localStorage.getItem(DBNAME);
    if (!stored_object) return;
    const database = JSON.parse(stored_object);

    const template: TemplateMap | undefined = database[template_name];
    if (template) {
      setContent(template);
    }
    console.log(template);
  }, [])

  return <div className="flex flex-col h-screen p-3 gap-3 w-full items-center max-w-[55em] mx-auto">
    <Tiptap />

    <div className="flex justify-end w-full">
      <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
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
            <Button onClick={saveToLocalStorage}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
}

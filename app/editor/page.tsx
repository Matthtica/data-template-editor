'use client'
import NovelEditor from "@/components/editor";
import React from "react";
import { JSONContent } from "novel";
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

export default function EditorPage() {
  const {
    content, setContent,
    isModelOpen, setIsModelOpen,
    saveToLocalStorage,
    name, setName
  } = useTemplateSaver();

  return <div className="flex flex-col h-screen p-3 gap-3 w-full items-center max-w-[55em] mx-auto">
    <NovelEditor content={content} setContent={setContent} className="flex-1 bg-secondary rounded-md border border-input w-full p-2 px-3"/>

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

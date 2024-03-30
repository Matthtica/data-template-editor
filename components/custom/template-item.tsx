'use client'
import React from "react";
import {
  Trash2Icon,
} from "lucide-react";
import LinkButton from "@/components/custom/link-button";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/types";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";

interface TemplateItemProps {
  template: Template
}
export default function TemplateItem({ template }: TemplateItemProps) {
  const { deleteTemplate } = useTemplateStorageContext();

  return <div className="transition-all duration-300 border border-input rounded-md p-2 pl-4">
    <div className="text-lg">
      {template.name}
    </div>
    <div className="flex gap-2 justify-end">
      <LinkButton href={`/editor/${template.id}`} variant="secondary" size="sm">
        Edit
      </LinkButton>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2Icon className="w-5 h-5"/>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Delete template
          </DialogHeader>
          <p>Are you sure you want to delete this template?</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  deleteTemplate(template.id)
                  toast({
                    title: "Template deleted",
                    description: `The template ${template.name} has been deleted from the local storage`,
                    variant: "destructive"
                  })
                }}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <LinkButton href={`/fill-data/${template.id}`} size="sm">
        Fill data
      </LinkButton>
    </div>
  </div>
}

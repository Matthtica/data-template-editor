'use client'
import React from "react";
import {
  ArrowRightIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import LinkButton from "@/components/custom/link-button";
import { Button } from "@/components/ui/button";
import { deleteTemplate } from "@/lib/utils";

interface TemplateItemProps {
  filename: string
}
export default function TemplateItem({ filename }: TemplateItemProps) {
  return <LinkButton href={`/editor/${filename}`} className="transition-all duration-300 flex justify-between items-center" variant="outline">
    <div>
      {filename}
    </div>
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={() => deleteTemplate(filename)}>
              <Trash2Icon size="1.3rem"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background border border-input text-primary">
            Delete template
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="border border-r-primary my-auto h-7"></div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <LinkButton href={`/fill-data/${filename}`} variant="ghost">
              <ArrowRightIcon size="1.3rem"/>
            </LinkButton>
          </TooltipTrigger>
          <TooltipContent className="bg-background border border-input text-primary">
            Fill data
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </LinkButton>
}

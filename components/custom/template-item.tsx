import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  Edit3Icon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface TemplateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string
}

export default function TemplateItem({ filename }: TemplateItemProps) {

  return <div className="cursor-pointer transition-all duration-300 border border-input rounded-md p-2 px-3 hover:shadow-md flex justify-between items-center">
    <div>
      {filename}
    </div>
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Edit3Icon size="1.3rem" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background border border-input text-primary">
            Edit template
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="border border-r-primary my-auto h-7"></div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <ArrowRightIcon size="1.3rem"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background border border-input text-primary">
            Fill data
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
}

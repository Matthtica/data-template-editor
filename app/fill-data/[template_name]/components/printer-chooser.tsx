"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"

interface PrinterChooserProps {
  value: string
  setValue: (value: string) => void
}

export function PrinterChooser({ value, setValue }: PrinterChooserProps) {
  const [open, setOpen] = React.useState(false)

  const { data: printers, isFetching } = useQuery<string[]>({
    queryKey: ["printers"],
    queryFn: async () => fetch("http://localhost:4590/printers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
      .catch((err) => console.log(err)),
  });

  React.useEffect(() => {
    console.log(printers)
  }, [printers])

  return isFetching ? <div>Loading...</div> : <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? printers?.find((printer) => printer === value)
            : "Select printer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search printer..." />
          <CommandEmpty>No printer found.</CommandEmpty>
          <CommandGroup>
            {printers && printers.map((printer) => (
              <CommandItem
                key={printer}
                value={printer}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === printer ? "opacity-100" : "opacity-0"
                  )}
                />
                {printer}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
}

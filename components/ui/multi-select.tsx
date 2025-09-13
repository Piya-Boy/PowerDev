"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

interface MultiSelectProps {
  options: { value: string; label: string }[]
  selected: string[]
  setSelected: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  setSelected,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    setSelected(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-[#2a2a42] border-purple-500/30 hover:bg-[#2d2d4a] hover:border-purple-500/50 transition-all",
            "text-purple-100 placeholder:text-purple-300/50",
            className
          )}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length === 0 && <span className="text-purple-300/50">{placeholder}</span>}
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="mr-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 flex items-center gap-1"
              >
                {options.find((option) => option.value === item)?.label}
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:bg-purple-500/20 p-0.5"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUnselect(item)
                  }}
                >
                  <X className="h-3 w-3 text-purple-300 hover:text-purple-100 transition-colors" />
                </div>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-purple-300 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={cn(
          "bg-[#2a2a42] border border-purple-500/30",
          className
        )}>
          <CommandInput 
            placeholder={placeholder} 
            className="text-purple-100 placeholder:text-purple-300/50"
          />
          <CommandEmpty className="text-purple-300">No option found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  setSelected(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  )
                  setOpen(true)
                }}
                className="text-purple-100 hover:bg-purple-500/20 aria-selected:bg-purple-500/30"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-purple-400",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 
"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import axios from "axios";

interface Framework {
  value: string;
  label: string;
}

const frameworks: Framework[] = [
  {
    value: "manager",
    label: "manager",
  },
  {
    value: "member",
    label: "member",
  },
  {
    value: "senior",
    label: "senior",
  },
  {
    value: "admin",
    label: "admin",
  },
];

const Combobox: React.FC<{ id: string; role: string; disabled: boolean }> = ({
  id,
  role,
  disabled,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(role);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select role"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {open && (
          <Command>
            <CommandInput placeholder="Search role..." />
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={async (currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      try {
                        await axios.patch(
                          `${process.env.NEXT_PUBLIC_API_HOST}/api/users/${id}`,
                          {
                            role: currentValue,
                          }
                        );
                      } catch (error) {
                        console.error("Error updating user status", error);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

// src/components/multi-select.tsx

import * as React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      modalPopover = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [defaultValue]);

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    return (
      <>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              {...props}
              onClick={handleTogglePopover}
              className={cn(
                "flex w-full p-1 rounded ring ring-secondary/20 min-h-9.5 h-auto items-center justify-between bg-inherit hover:bg-inherit cursor-pointer",
                className
              )}>
              {selectedValues.length >= 0 && (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span className="text-sm text-secondary/80 mx-3">{placeholder}</span>
                  <ChevronDown className="mr-3 h-4 cursor-pointer text-secondary/80" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0 border-none bg-primary text-white"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}>
            <Command className="bg-primary text-white ring ring-secondary/20 rounded-sm">
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className="px-0.5">
                  {options.map(
                    (option: {
                      value: string;
                      label: string;
                      icon?: React.ComponentType<{ className?: string }>;
                    }) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleOption(option.value)}
                          className="cursor-pointer text-secondary/80">
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-xs border border-secondary/80",
                              isSelected
                                ? "bg-secondary/80 text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}>
                            <CheckIcon className="h-4 w-4 text-[#1b1b1b]" />
                          </div>
                          {option.icon && <option.icon className="mr-2 h-4 w-4 " />}
                          <span className="">{option.label}</span>
                        </CommandItem>
                      );
                    }
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

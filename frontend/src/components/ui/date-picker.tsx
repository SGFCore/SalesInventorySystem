"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({
  value,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  const stringValue = value
    ? format(value, "yyyy-MM-dd")
    : "";

  const displayValue = value
    ? format(value, "dd/MM/yyyy")
    : "Chọn ngày";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Native picker */}
      <input
        type="date"
        value={stringValue}
        onChange={(e) => {
          const val = e.target.value;

          if (!val) {
            onChange?.(undefined);
            return;
          }

          onChange?.(new Date(val));
        }}
        className={cn(
          "w-full h-10 rounded-md border border-input",
          "appearance-none",
          "cursor-pointer",
          "relative z-0",
          className
        )}
        {...props}
      />
    </div>
  );
}
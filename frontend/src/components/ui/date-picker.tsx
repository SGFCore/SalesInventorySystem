import * as React from "react";
import { format, parse } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePicker({
  value,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  // Chuyển Date sang định dạng YYYY-MM-DD cho input[type="date"]
  const stringValue = React.useMemo(() => {
    if (!value) return "";
    return format(value, "yyyy-MM-dd");
  }, [value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!val) return;
      
      try {
        // Parse chuỗi YYYY-MM-DD sang đối tượng Date chuẩn
        const parsedDate = parse(val, "yyyy-MM-dd", new Date());
        if (onChange) {
          onChange(parsedDate);
        }
      } catch (err) {
        console.error("Lỗi parse ngày trong DatePicker:", err);
      }
    },
    [onChange]
  );

  return (
    <Input
      type="date"
      value={stringValue}
      onChange={handleChange}
      className={cn(
        "border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-3 h-10 rounded-md bg-white text-slate-900",
        className
      )}
      {...props}
    />
  );
}

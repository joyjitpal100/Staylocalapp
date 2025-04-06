import * as React from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  disabledDates?: Date[];
  className?: string;
  align?: "center" | "start" | "end";
}

export function DateRangePicker({
  dateRange,
  onRangeChange,
  disabledDates = [],
  className,
  align = "start",
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onRangeChange}
            numberOfMonths={2}
            disabled={(date) => 
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              disabledDates.some(
                disabledDate => 
                  disabledDate.getDate() === date.getDate() &&
                  disabledDate.getMonth() === date.getMonth() &&
                  disabledDate.getFullYear() === date.getFullYear()
              )
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

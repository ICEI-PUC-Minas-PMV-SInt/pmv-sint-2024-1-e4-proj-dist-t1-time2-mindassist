// DatePickerWithPresets.tsx
'use client'

import React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, addDays } from 'date-fns'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

interface DatePickerWithPresetsProps {
  onSelectDateTime?: (dateTime: Date) => void
  initialDateTime?: Date
  dateFormat?: string
  className?: string
  buttonVariant?: 'outline' | 'solid'
}

const DatePickerWithPresets: React.FC<DatePickerWithPresetsProps> = ({
  onSelectDateTime,
  initialDateTime = new Date(),
  dateFormat = 'MMMM d, yyyy HH:mm',
  className = '',
  buttonVariant = 'outline',
}) => {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(initialDateTime)
  const [timeValue, setTimeValue] = React.useState<string>(format(initialDateTime, 'HH:mm'))

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return
    const [hours, minutes] = timeValue.split(':').map(Number)
    const newDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
    setSelectedDateTime(newDateTime)
    if (onSelectDateTime) {
      onSelectDateTime(newDateTime)
    }
  }

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTime = e.target.value
    const [hours, minutes] = newTime.split(':').map(Number)
    const newDateTime = new Date(
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth(),
      selectedDateTime.getDate(),
      hours,
      minutes
    )
    setSelectedDateTime(newDateTime)
    setTimeValue(newTime)
    if (onSelectDateTime) {
      onSelectDateTime(newDateTime)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-fit justify-start text-left font-normal text-dark-1', !selectedDateTime && 'text-dark-1')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDateTime ? format(selectedDateTime, dateFormat) : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-full flex-col space-y-2 p-2">
        <div className="rounded-md border">
          <Calendar mode="single" selected={selectedDateTime} onSelect={handleDaySelect} />
        </div>
        <Select onValueChange={(value) => setSelectedDateTime(addDays(initialDateTime, parseInt(value)))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <Input type="time" value={timeValue} onChange={handleTimeChange} className="mt-2" />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerWithPresets

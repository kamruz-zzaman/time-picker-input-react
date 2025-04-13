"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Clock } from "lucide-react"
import { cn } from "../lib/utils"

export interface TimePickerProps {
  /** Current value in "HH:MM" format (for controlled component) */
  value?: string
  /** Default value in "HH:MM" format (for uncontrolled component) */
  defaultValue?: string
  /** Callback when time changes */
  onChange?: (time: string) => void
  /** Additional CSS classes */
  className?: string
  /** Disable the input */
  disabled?: boolean
  /** Placeholder text */
  placeholder?: string
  /** ID for the input */
  id?: string
  /** Name for the input */
  name?: string
}

export default function TimePicker({
  value,
  defaultValue = "00:00",
  onChange,
  className,
  disabled = false,
  placeholder = "HH:MM",
  id,
  name,
}: TimePickerProps) {
  // Determine if component is controlled
  const isControlled = value !== undefined

  // Parse initial hour and minute from value or defaultValue
  const parseTime = (timeString: string) => {
    const [h = "00", m = "00"] = (timeString || "").split(":")
    return { hour: h, minute: m }
  }

  const initialTime = parseTime(isControlled ? value : defaultValue)

  // State for internal component values
  const [isOpen, setIsOpen] = useState(false)
  const [hour, setHour] = useState(initialTime.hour)
  const [minute, setMinute] = useState(initialTime.minute)

  // Refs for DOM elements
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)

  // Update internal state when controlled value changes
  useEffect(() => {
    if (isControlled && value) {
      const { hour: newHour, minute: newMinute } = parseTime(value)
      setHour(newHour)
      setMinute(newMinute)
    }
  }, [isControlled, value])

  // Generate hours (0-23) and minutes (0-59)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Notify parent component of changes
  const notifyChange = (newHour: string, newMinute: string) => {
    if (onChange) {
      const formattedHour = newHour.padStart(2, "0")
      const formattedMinute = newMinute.padStart(2, "0")
      onChange(`${formattedHour}:${formattedMinute}`)
    }
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Allow empty input or digits only
    if (value === "" || /^\d+$/.test(value)) {
      // Restrict to valid hour range (0-23)
      const numValue = Number.parseInt(value, 10)
      if (value === "" || (numValue >= 0 && numValue <= 23)) {
        if (!isControlled) {
          setHour(value)
        }
        notifyChange(value || "00", minute)
      }
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Allow empty input or digits only
    if (value === "" || /^\d+$/.test(value)) {
      // Restrict to valid minute range (0-59)
      const numValue = Number.parseInt(value, 10)
      if (value === "" || (numValue >= 0 && numValue <= 59)) {
        if (!isControlled) {
          setMinute(value)
        }
        notifyChange(hour, value || "00")
      }
    }
  }

  const handleHourBlur = () => {
    let formattedHour = hour

    if (hour === "") {
      formattedHour = "00"
    } else {
      const hourNum = Number.parseInt(hour, 10)
      if (!isNaN(hourNum)) {
        formattedHour = hourNum.toString().padStart(2, "0")
      } else {
        formattedHour = "00"
      }
    }

    if (!isControlled) {
      setHour(formattedHour)
    }
    notifyChange(formattedHour, minute)
  }

  const handleMinuteBlur = () => {
    let formattedMinute = minute

    if (minute === "") {
      formattedMinute = "00"
    } else {
      const minuteNum = Number.parseInt(minute, 10)
      if (!isNaN(minuteNum)) {
        formattedMinute = minuteNum.toString().padStart(2, "0")
      } else {
        formattedMinute = "00"
      }
    }

    if (!isControlled) {
      setMinute(formattedMinute)
    }
    notifyChange(hour, formattedMinute)
  }

  const handleNowClick = () => {
    const now = new Date()
    const currentHour = now.getHours().toString().padStart(2, "0")
    const currentMinute = now.getMinutes().toString().padStart(2, "0")

    if (!isControlled) {
      setHour(currentHour)
      setMinute(currentMinute)
    }
    notifyChange(currentHour, currentMinute)
  }

  const handleOkClick = () => {
    setIsOpen(false)
  }

  const handleHourClick = (selectedHour: string) => {
    if (!isControlled) {
      setHour(selectedHour)
    }
    notifyChange(selectedHour, minute)
  }

  const handleMinuteClick = (selectedMinute: string) => {
    if (!isControlled) {
      setMinute(selectedMinute)
    }
    notifyChange(hour, selectedMinute)
  }

  const openDropdown = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  return (
    <div className={cn("relative w-64", className)} ref={dropdownRef}>
      {/* Time Input Field */}
      <div
        className={cn(
          "relative flex items-center border border-gray-300 rounded overflow-hidden",
          disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "cursor-pointer",
        )}
        onClick={openDropdown}
      >
        <div className="flex-1 flex items-center">
          {/* Hour input */}
          <input
            ref={hourInputRef}
            type="text"
            value={hour}
            onChange={handleHourChange}
            onBlur={handleHourBlur}
            onClick={(e) => {
              e.stopPropagation()
              openDropdown()
            }}
            maxLength={2}
            className="w-12 text-center py-2 focus:outline-none cursor-text bg-transparent"
            placeholder={placeholder.split(":")[0] || "HH"}
            disabled={disabled}
            id={id}
            name={name ? `${name}-hour` : undefined}
          />
          <span className="text-gray-500 flex items-center justify-center">:</span>
          {/* Minute input */}
          <input
            ref={minuteInputRef}
            type="text"
            value={minute}
            onChange={handleMinuteChange}
            onBlur={handleMinuteBlur}
            onClick={(e) => {
              e.stopPropagation()
              openDropdown()
            }}
            maxLength={2}
            className="w-12 text-center py-2 focus:outline-none cursor-text bg-transparent"
            placeholder={placeholder.split(":")[1] || "MM"}
            disabled={disabled}
            name={name ? `${name}-minute` : undefined}
          />
        </div>
        <div className={cn("px-3 py-2", disabled ? "" : "cursor-pointer hover:bg-gray-100")}>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <div className="flex">
            {/* Hours Column */}
            <div className="w-1/2 border-r border-gray-200 h-48 overflow-y-auto">
              {hours.map((hourOption) => (
                <div
                  key={hourOption}
                  className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${hour === hourOption ? "bg-gray-100" : ""}`}
                  onClick={() => handleHourClick(hourOption)}
                >
                  {hourOption}
                </div>
              ))}
            </div>

            {/* Minutes Column */}
            <div className="w-1/2 h-48 overflow-y-auto">
              {minutes.map((minuteOption) => (
                <div
                  key={minuteOption}
                  className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                    minute === minuteOption ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleMinuteClick(minuteOption)}
                >
                  {minuteOption}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex border-t border-gray-200">
            <button className="w-1/2 py-2 text-blue-500 hover:bg-gray-50" onClick={handleNowClick}>
              Now
            </button>
            <button className="w-1/2 py-2 text-white bg-blue-500 hover:bg-blue-600" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

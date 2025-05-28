import React from "react"
import type { TimetableSolution } from "@/app/lib/Csp-utils/types"
import { getCourseColor } from "@/app/lib/Csp-utils/utils"
import { CourseCell } from "./course-cell"

interface TimetableProps {
  solution: TimetableSolution
}

// Define hours for each slot
const HOURS = ["08:30 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM"]
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

export function Timetable({ solution }: TimetableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[180px_repeat(5,1fr)] gap-2">
          {/* Empty top-left cell */}
          <div className="h-14 flex items-center justify-center font-bold"></div>

          {/* Days header */}
          {DAYS.map((day) => (
            <div key={day} className="h-14 flex items-center justify-center font-bold bg-gray-800 rounded-md">
              {day}
            </div>
          ))}

          {/* Time slots and courses */}
          {HOURS.map((hour, slotIndex) => (
            <React.Fragment key={`hour-${slotIndex}`}>
              {/* Hour label */}
              <div className="h-14 flex items-center justify-center font-medium bg-gray-800 rounded-md">{hour}</div>

              {/* Course cells for this time slot */}
              {DAYS.map((day) => {
                const course = Object.entries(solution).find(
                  ([_, [courseDay, courseSlot]]) => courseDay === day && courseSlot === slotIndex,
                )?.[0]

                if (!course) {
                  return (
                    <div
                      key={`${day}-${slotIndex}`}
                      className="h-14 flex items-center justify-center bg-gray-800/30 rounded-md"
                    ></div>
                  )
                }

                const courseBase = course.split("_")[0]
                const courseType = course.split("_")[1]
                const colorClass = getCourseColor(courseBase)

                return (
                  <CourseCell
                    key={`${day}-${slotIndex}`}
                    courseBase={courseBase}
                    courseType={courseType}
                    colorClass={colorClass}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday"
export type Slot = 0 | 1 | 2 | 3 | 4
export type TimeSlot = [Day, Slot]
export type TimetableSolution = Record<string, TimeSlot>
export type Domain = Record<string, TimeSlot[]>

export interface CourseTeachers {
  [course: string]: string | string[]
}

export interface SlotsPerDay {
  [day: string]: number
}

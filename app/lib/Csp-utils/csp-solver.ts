import type { Day, Slot, TimeSlot, TimetableSolution, Domain, CourseTeachers, SlotsPerDay } from "./types"
import { shuffleArray } from "./utils"

// Problem setup
const DAYS: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
const SLOTS_PER_DAY: SlotsPerDay = {
  Sunday: 5,
  Monday: 5,
  Tuesday: 3,
  Wednesday: 5,
  Thursday: 5,
}
const MAX_SUCCESSIVE = 3

// Courses and teachers
const courses: CourseTeachers = {
  Sécurité_L: "T1",
  Sécurité_TD: "T1",
  MéthodesFormelles_L: "T2",
  MéthodesFormelles_TD: "T2",
  AnalyseNum_L: "T3",
  AnalyseNum_TD: "T3",
  Entrepreneuriat_L: "T4",
  RO2_L: "T5",
  RO2_TD: "T5",
  DAIC_L: "T6",
  DAIC_TD: "T6",
  Réseaux2_L: "T7",
  Réseaux2_TD: "T7",
  Réseaux2_TP: ["T8", "T9", "T10"],
  IA_L: "T11",
  IA_TD: "T11",
  IA_TP: ["T12", "T13", "T14"],
}

// Get all variables (courses)
const variables = Object.keys(courses)

// All possible (day, slot) combinations
const allSlots: TimeSlot[] = []
for (const day of DAYS) {
  for (let slot = 0; slot < SLOTS_PER_DAY[day]; slot++) {
    allSlots.push([day, slot as Slot])
  }
}

// Random domain generator per variable
function createRandomDomains(): Domain {
  const domains: Domain = {}
  for (const variable of variables) {
    domains[variable] = shuffleArray([...allSlots])
  }
  return domains
}

// Constraints
function noSameSlot(assignments: TimetableSolution): boolean {
  const used: Record<string, string[]> = {}

  for (const [variable, [day, slot]] of Object.entries(assignments)) {
    const key = `${day}-${slot}`
    if (!used[key]) {
      used[key] = []
    }
    used[key].push(variable)
    if (used[key].length > 1) {
      return false
    }
  }

  return true
}

function maxThreeSuccessive(assignments: TimetableSolution): boolean {
  const daySlots: Record<Day, number[]> = {} as Record<Day, number[]>

  for (const [day, slot] of Object.values(assignments)) {
    if (!daySlots[day]) {
      daySlots[day] = []
    }
    daySlots[day].push(slot)
  }

  for (const slots of Object.values(daySlots)) {
    const sortedSlots = [...slots].sort((a, b) => a - b)
    for (let i = 0; i < sortedSlots.length - 3; i++) {
      if (sortedSlots[i + 3] - sortedSlots[i] === 3) {
        return false
      }
    }
  }

  return true
}

function constraintsOk(assignments: TimetableSolution): boolean {
  return noSameSlot(assignments) && maxThreeSuccessive(assignments)
}

// MRV heuristic
function selectUnassignedVar(assignments: TimetableSolution, domains: Domain): string {
  const unassigned = variables.filter((v) => !(v in assignments))
  return unassigned.reduce((min, v) => (domains[v].length < domains[min].length ? v : min), unassigned[0])
}

// LCV heuristic
function orderDomainValues(variable: string, domains: Domain, assignments: TimetableSolution): TimeSlot[] {
  return [...domains[variable]].sort((a, b) => {
    const aCount = Object.values(assignments).filter((val) => val[0] === a[0] && val[1] === a[1]).length
    const bCount = Object.values(assignments).filter((val) => val[0] === b[0] && val[1] === b[1]).length
    return aCount - bCount
  })
}

// AC-3 for constraint propagation
function ac3(domains: Domain): boolean {
  const queue: [string, string][] = []

  for (const xi of variables) {
    for (const xj of variables) {
      if (xi !== xj) {
        queue.push([xi, xj])
      }
    }
  }

  while (queue.length > 0) {
    const [xi, xj] = queue.shift()!
    if (revise(domains, xi, xj)) {
      if (domains[xi].length === 0) {
        return false
      }
      for (const xk of variables) {
        if (xk !== xi) {
          queue.push([xk, xi])
        }
      }
    }
  }

  return true
}

function revise(domains: Domain, xi: string, xj: string): boolean {
  let revised = false
  const toRemove: TimeSlot[] = []

  for (const x of domains[xi]) {
    if (domains[xj].every((y) => x[0] === y[0] && x[1] === y[1])) {
      toRemove.push(x)
      revised = true
    }
  }

  for (const val of toRemove) {
    domains[xi] = domains[xi].filter((v) => !(v[0] === val[0] && v[1] === val[1]))
  }

  return revised
}

// CSP Solver
function backtrack(assignments: TimetableSolution, domains: Domain): TimetableSolution | null {
  if (Object.keys(assignments).length === variables.length) {
    return assignments
  }

  const variable = selectUnassignedVar(assignments, domains)

  for (const value of orderDomainValues(variable, domains, assignments)) {
    const localAssignments = { ...assignments }
    localAssignments[variable] = value

    if (constraintsOk(localAssignments)) {
      const result = backtrack(localAssignments, domains)
      if (result) {
        return result
      }
    }
  }

  return null
}

// Run CSP
export function solveTimetable(): TimetableSolution | null {
  const domains = createRandomDomains()
  ac3(domains)
  return backtrack({}, domains)
}

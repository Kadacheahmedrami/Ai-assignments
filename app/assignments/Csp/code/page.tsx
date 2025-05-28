import React from "react"
import { Code, GitBranch, Calendar, Clock, Users, Settings, Database, ArrowRight, CheckCircle, AlertTriangle, Cpu, Play } from "lucide-react"

const CSPCodeDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                CSP Algorithm
              </span>
              <span className="block text-white mt-1">Code Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Complete technical documentation of the Constraint Satisfaction Problem implementation for automated timetable generation
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center">
                <Code className="mr-2 h-4 w-4" />
                View Source Code
              </button>
              <button className="px-8 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors border border-slate-600 flex items-center justify-center">
                <Play className="mr-2 h-4 w-4" />
                Try Interactive Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Type Definitions */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Type Definitions</h2>
          </div>
          <div className="space-y-6">
            {/* Core Types */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Database className="h-5 w-5 text-blue-400 mr-2" />
                Core Types
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">Day Type</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export type Day = 
  | "Sunday" 
  | "Monday" 
  | "Tuesday" 
  | "Wednesday" 
  | "Thursday"`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Defines the working days of the week for scheduling</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">Slot Type</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export type Slot = 0 | 1 | 2 | 3 | 4`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Represents time slots within a day (0-4 corresponding to different hours)</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">TimeSlot Type</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export type TimeSlot = [Day, Slot]`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Tuple combining day and slot to uniquely identify a time period</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">TimetableSolution Type</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export type TimetableSolution = 
  Record<string, TimeSlot>`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Maps course names to their assigned time slots</p>
                </div>
              </div>
            </div>

            {/* Interface Definitions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="h-5 w-5 text-green-400 mr-2" />
                Interface Definitions
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-green-300 font-mono text-sm mb-2">CourseTeachers Interface</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export interface CourseTeachers {
  [course: string]: string | string[]
}`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Maps course names to teacher(s) - supports both single teachers and multiple teachers for practicals</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-green-300 font-mono text-sm mb-2">SlotsPerDay Interface</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export interface SlotsPerDay {
  [day: string]: number
}`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Defines how many time slots are available for each day of the week</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-green-300 font-mono text-sm mb-2">Domain Type</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`export type Domain = 
  Record<string, TimeSlot[]>`}
                  </pre>
                  <p className="text-gray-400 text-xs mt-2">Maps each course to its possible time slot assignments (CSP domain)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Configuration */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-green-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Data Configuration</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Problem Setup Constants</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">Days Array</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`const DAYS: Day[] = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday"
]`}
                  </pre>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-blue-300 font-mono text-sm mb-2">Slots Per Day</h4>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`const SLOTS_PER_DAY: SlotsPerDay = {
  Sunday: 5,
  Monday: 5,
  Tuesday: 3,
  Wednesday: 5,
  Thursday: 5,
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Course Configuration</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-blue-300 font-mono text-sm mb-2">courses Object</h4>
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`const courses: CourseTeachers = {
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
}`}
                </pre>
                <p className="text-gray-400 text-xs mt-2">Complete course-to-teacher mapping with support for multiple teachers on practicals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Utility Functions */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Utility Functions</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Code className="h-5 w-5 text-purple-400 mr-2" />
              Array Shuffling Function
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}`}
              </pre>
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">Purpose</h4>
                <p className="text-gray-300 text-sm">Implements Fisher-Yates shuffle algorithm to randomize domain order, ensuring different solutions on each run while maintaining algorithmic correctness.</p>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Generic implementation works with any array type
                </div>
                <div className="flex items-center text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Creates new array without modifying original
                </div>
                <div className="flex items-center text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Uniform random distribution guaranteed
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSP Solver Implementation */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-cyan-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">CSP Solver Implementation</h2>
          </div>
          <div className="space-y-6">
            {/* Main Solver Function */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Cpu className="h-5 w-5 text-cyan-400 mr-2" />
                Main Solver Function
              </h3>
              <div className="bg-slate-900/50 rounded-lg p-6">
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`function solveTimetable(): TimetableSolution | null {
  const variables = Object.keys(courses)
  const allSlots: TimeSlot[] = []
  
  // Generate all possible time slots
  for (const day of DAYS) {
    for (let slot = 0; slot < SLOTS_PER_DAY[day]; slot++) {
      allSlots.push([day, slot as Slot])
    }
  }

  // Initialize domains for each variable
  const domains: Domain = {}
  for (const variable of variables) {
    domains[variable] = shuffleArray([...allSlots])
  }

  return backtrack({})
}`}
                </pre>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <h4 className="text-blue-300 font-semibold mb-2">Variable Extraction</h4>
                  <p className="text-gray-300 text-sm">Extracts course names as CSP variables from the courses object</p>
                </div>
                <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <h4 className="text-green-300 font-semibold mb-2">Domain Generation</h4>
                  <p className="text-gray-300 text-sm">Creates all valid [Day, Slot] combinations based on schedule constraints</p>
                </div>
                <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                  <h4 className="text-purple-300 font-semibold mb-2">Domain Randomization</h4>
                  <p className="text-gray-300 text-sm">Shuffles domains to ensure varied solutions across runs</p>
                </div>
              </div>
            </div>

            {/* Backtracking Algorithm */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <GitBranch className="h-5 w-5 text-cyan-400 mr-2" />
                Backtracking Algorithm
              </h3>
              <div className="bg-slate-900/50 rounded-lg p-6">
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`function backtrack(assignments: TimetableSolution): TimetableSolution | null {
  // Base case: all variables assigned
  if (Object.keys(assignments).length === variables.length) {
    return assignments
  }

  // Select unassigned variable
  const unassigned = variables.find(v => !(v in assignments))
  if (!unassigned) return null

  // Try each value in the domain
  for (const value of domains[unassigned]) {
    const newAssignments = { ...assignments, [unassigned]: value }
    
    // Check constraints
    const usedSlots = new Set()
    let valid = true
    for (const [course, [day, slot]] of Object.entries(newAssignments)) {
      const key = \`\${day}-\${slot}\`
      if (usedSlots.has(key)) {
        valid = false
        break
      }
      usedSlots.add(key)
    }

    // Recurse if valid
    if (valid) {
      const result = backtrack(newAssignments)
      if (result) return result
    }
  }
  
  return null // Backtrack
}`}
                </pre>
              </div>
              <div className="mt-4 space-y-3">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Algorithm Flow</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-blue-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Check if all variables are assigned (solution found)
                    </div>
                    <div className="flex items-center text-green-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Select next unassigned variable
                    </div>
                    <div className="flex items-center text-yellow-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Try each value in the variable's domain
                    </div>
                    <div className="flex items-center text-purple-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Check constraints for the new assignment
                    </div>
                    <div className="flex items-center text-cyan-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Recursively solve remaining variables
                    </div>
                    <div className="flex items-center text-red-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Backtrack if no valid assignment found
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Constraint Checking */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-red-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Constraint Checking Logic</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              Time Conflict Detection
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Check no conflicts
const usedSlots = new Set()
let valid = true

for (const [course, [day, slot]] of Object.entries(newAssignments)) {
  const key = \`\${day}-\${slot}\`
  if (usedSlots.has(key)) {
    valid = false
    break
  }
  usedSlots.add(key)
}`}
              </pre>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                <h4 className="text-red-300 font-semibold mb-2">Constraint Type</h4>
                <p className="text-gray-300 text-sm">Unary constraint ensuring no two courses occupy the same time slot</p>
              </div>
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">Implementation</h4>
                <p className="text-gray-300 text-sm">Uses Set data structure for O(1) lookup time and efficient conflict detection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Time Formatting */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-yellow-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Helper Functions</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 text-yellow-400 mr-2" />
              Time Slot Formatting
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`const formatTimeSlot = (slot: Slot): string => {
  const times = [
    "8:00-9:30", 
    "9:45-11:15", 
    "11:30-13:00", 
    "14:00-15:30", 
    "15:45-17:15"
  ]
  return times[slot] || ""
}`}
              </pre>
            </div>
            <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
              <h4 className="text-yellow-300 font-semibold mb-2">Purpose</h4>
              <p className="text-gray-300 text-sm">Converts numeric slot indices to human-readable time ranges for display in the UI</p>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Usage Example</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Implementation in React Component</h3>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`const generateTimetable = async () => {
  setIsGenerating(true)
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000))
  const result = solveTimetable()
  setSolution(result)
  setIsGenerating(false)
}

// Usage in component
const [solution, setSolution] = useState<TimetableSolution | null>(null)
const [isGenerating, setIsGenerating] = useState(false)`}
              </pre>
            </div>
            <div className="mt-4 p-4 bg-indigo-900/20 border border-indigo-800/30 rounded-lg">
              <h4 className="text-indigo-300 font-semibold mb-2">Integration Notes</h4>
              <p className="text-gray-300 text-sm">The solver returns either a complete solution or null, allowing for proper error handling in the UI layer</p>
            </div>
          </div>
        </section>

        {/* Algorithm Complexity */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-orange-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Algorithm Complexity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Time Complexity</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-900/20 border border-orange-800/30 rounded-lg">
                  <h4 className="text-orange-300 font-semibold">Worst Case</h4>
                  <p className="text-gray-300 text-sm mt-1">O(d^n) where d is domain size and n is number of variables</p>
                </div>
                <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <h4 className="text-green-300 font-semibold">Average Case</h4>
                  <p className="text-gray-300 text-sm mt-1">Much better due to early pruning and constraint propagation</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Space Complexity</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <h4 className="text-blue-300 font-semibold">Memory Usage</h4>
                  <p className="text-gray-300 text-sm mt-1">O(n) for assignments + O(n×d) for domains</p>
                </div>
                <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                  <h4 className="text-purple-300 font-semibold">Stack Space</h4>
                  <p className="text-gray-300 text-sm mt-1">O(n) recursive call stack depth</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-400 font-bold text-xl">CSP Algorithm Implementation</span>
          <p className="text-gray-400 mt-2">© 2025 Technical Documentation</p>
        </div>
      </footer>
    </div>
  )
}

export default CSPCodeDocumentation
import React from "react"
import { Calendar, Clock, Users, BookOpen, Code, Settings, CheckCircle, AlertCircle } from "lucide-react"

const CSPDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                CSP Timetable Generator
              </span>
              <span className="block text-white mt-1">Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Complete guide to understanding and implementing the Constraint Satisfaction Problem approach for automated university timetable generation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">System Overview</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The CSP Timetable Generator is an automated scheduling system that uses Constraint Satisfaction Problem algorithms to generate optimal university course timetables. The system efficiently handles multiple constraints while ensuring no conflicts in scheduling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Smart Scheduling</h3>
                <p className="text-sm text-gray-400">Automated time slot allocation</p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Teacher Management</h3>
                <p className="text-sm text-gray-400">Multiple teacher assignments</p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Conflict Resolution</h3>
                <p className="text-sm text-gray-400">Zero scheduling conflicts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Configuration */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-green-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Course Configuration</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300 mb-6">
              The system manages 17 different courses across various subjects, each assigned to specific teachers. Some courses require multiple teachers for practical sessions.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Course Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-blue-300">Lectures (L)</span>
                    <span className="text-gray-400">8 courses</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-green-300">Tutorials (TD)</span>
                    <span className="text-gray-400">7 courses</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-yellow-300">Practicals (TP)</span>
                    <span className="text-gray-400">2 courses</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Subject Areas</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Security</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Formal Methods</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Numerical Analysis</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Entrepreneurship</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Operations Research</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">DAIC</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Networks</div>
                  <div className="p-2 bg-slate-700/30 rounded text-gray-300">Artificial Intelligence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Structure */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Schedule Structure</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Weekly Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-white">Sunday</span>
                    <span className="text-blue-300">5 slots</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-white">Monday</span>
                    <span className="text-blue-300">5 slots</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-white">Tuesday</span>
                    <span className="text-orange-300">3 slots</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-white">Wednesday</span>
                    <span className="text-blue-300">5 slots</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-white">Thursday</span>
                    <span className="text-blue-300">5 slots</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Time Slots</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-blue-300 font-medium">Slot 0</div>
                    <div className="text-gray-400 text-sm">8:00 - 9:30</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-blue-300 font-medium">Slot 1</div>
                    <div className="text-gray-400 text-sm">9:45 - 11:15</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-blue-300 font-medium">Slot 2</div>
                    <div className="text-gray-400 text-sm">11:30 - 13:00</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-blue-300 font-medium">Slot 3</div>
                    <div className="text-gray-400 text-sm">14:00 - 15:30</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-blue-300 font-medium">Slot 4</div>
                    <div className="text-gray-400 text-sm">15:45 - 17:15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSP Algorithm */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-cyan-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">CSP Algorithm Implementation</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Code className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Backtracking Algorithm</h3>
              <p className="text-gray-300 mb-4">
                The core algorithm uses recursive backtracking to systematically explore all possible assignments while maintaining constraints.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Systematic variable assignment
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Constraint checking at each step
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Automatic backtracking on conflicts
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Settings className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Domain Management</h3>
              <p className="text-gray-300 mb-4">
                Each course has a domain of possible time slots, randomized to ensure different solutions on each run.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-blue-300">
                  <Clock className="h-4 w-4 mr-2" />
                  23 total available time slots
                </div>
                <div className="flex items-center text-blue-300">
                  <Users className="h-4 w-4 mr-2" />
                  17 courses to schedule
                </div>
                <div className="flex items-center text-blue-300">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Random domain shuffling
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Constraints */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-red-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">System Constraints</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  Hard Constraints
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">Time Conflict Prevention</div>
                    <div className="text-gray-400 text-sm">No two courses can occupy the same time slot</div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">Teacher Availability</div>
                    <div className="text-gray-400 text-sm">Teachers cannot be in multiple places simultaneously</div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">Day Limitations</div>
                    <div className="text-gray-400 text-sm">Respect different slot counts per day</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Solution Properties
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                    <div className="text-green-300 font-medium">Complete Assignment</div>
                    <div className="text-gray-400 text-sm">All 17 courses receive time slots</div>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                    <div className="text-green-300 font-medium">Conflict-Free</div>
                    <div className="text-gray-400 text-sm">Zero scheduling conflicts guaranteed</div>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                    <div className="text-green-300 font-medium">Randomized Output</div>
                    <div className="text-gray-400 text-sm">Different valid solutions each run</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-yellow-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Technical Implementation</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Code className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">React Framework</h3>
                <p className="text-gray-400 text-sm">Built with React and TypeScript for type safety and maintainability</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Modular Design</h3>
                <p className="text-gray-400 text-sm">Separate utilities for shuffling, solving, and constraint checking</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Efficient Algorithm</h3>
                <p className="text-gray-400 text-sm">Fast backtracking with early conflict detection for quick solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Usage Guide</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Initialize the System</h3>
                  <p className="text-gray-300">Load the application with predefined courses and teacher assignments</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Generate Timetable</h3>
                  <p className="text-gray-300">Click the generate button to run the CSP algorithm and create a schedule</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Review Results</h3>
                  <p className="text-gray-300">Examine the generated timetable in the interactive grid format</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Regenerate if Needed</h3>
                  <p className="text-gray-300">Generate new solutions with different course arrangements as required</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-400 font-bold text-xl">CSP Timetable Generator</span>
          <p className="text-gray-400 mt-2">© 2025 University Scheduling System Documentation</p>
        </div>
      </footer>
    </div>
  )
}

export default CSPDocumentation
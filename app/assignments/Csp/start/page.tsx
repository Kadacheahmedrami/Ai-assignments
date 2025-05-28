"use client";
import React from 'react';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timetable } from "@/components/timetable"
import { solveTimetable } from "@/app/utils/Csp-utils/csp-solver"
import type { TimetableSolution } from "@/app/utils/Csp-utils/types"
import { RefreshCw } from "lucide-react"
export const dynamic = "force-dynamic";

export default function MainPage() {

  const [solution, setSolution] = useState<TimetableSolution | null>(null)
  const [loading, setLoading] = useState(false)

  const generateTimetable = () => {
    setLoading(true)
    // Use setTimeout to prevent UI freeze during calculation
    setTimeout(() => {
      const result = solveTimetable()
      setSolution(result)
      setLoading(false)
    }, 100)
  }

  useEffect(() => {
    generateTimetable()
  }, [])



  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gray-950 text-gray-100">
    <Card className="w-full max-w-6xl bg-gray-900 border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Semester 2 Timetable Scheduler
          </h1>
          <Button
            onClick={generateTimetable}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Generating..." : "Generate New Timetable"}
          </Button>
        </div>

        {solution ? (
          <Timetable solution={solution} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">
              {loading ? "Generating timetable..." : "No valid timetable found. Try again."}
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-400">
          <p>This timetable is generated using a Constraint Satisfaction Problem (CSP) solver with:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>No overlapping classes in the same time slot</li>
            <li>Maximum of 3 successive classes per day</li>
            <li>Minimum Remaining Values (MRV) and Least Constraining Value (LCV) heuristics</li>
          </ul>
        </div>
      </div>
    </Card>
  </main>
  );
}

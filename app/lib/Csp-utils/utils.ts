import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Course color mapping
const COURSE_COLORS: Record<string, string> = {
  Sécurité: "bg-red-400",
  MéthodesFormelles: "bg-blue-400",
  AnalyseNum: "bg-green-400",
  Entrepreneuriat: "bg-yellow-400",
  RO2: "bg-purple-400",
  DAIC: "bg-pink-400",
  Réseaux2: "bg-cyan-400",
  IA: "bg-orange-400",
}

// Update the getCourseColor function to ensure it returns valid Tailwind classes
export function getCourseColor(courseBase: string): string {
  const colorMap: Record<string, string> = {
    Sécurité: "bg-red-500",
    MéthodesFormelles: "bg-blue-500",
    AnalyseNum: "bg-green-500",
    Entrepreneuriat: "bg-yellow-500",
    RO2: "bg-purple-500",
    DAIC: "bg-pink-500",
    Réseaux2: "bg-cyan-500",
    IA: "bg-orange-500",
  }

  return colorMap[courseBase] || "bg-gray-500"
}

// Function to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

interface CourseCellProps {
  courseBase: string
  courseType: string
  colorClass: string
}

export function CourseCell({ courseBase, courseType, colorClass }: CourseCellProps) {
  return (
    <div
      className={`h-14 flex flex-col items-center justify-center rounded-md text-gray-900 font-medium ${colorClass}`}
      style={{
        // Fallback inline styles in case Tailwind classes don't work
        backgroundColor: getColorHex(colorClass),
      }}
    >
      <div>{courseBase}</div>
      <div className="text-xs opacity-80">{courseType}</div>
    </div>
  )
}

// Fallback function to get hex colors if Tailwind classes fail
function getColorHex(colorClass: string): string {
  const colorMap: Record<string, string> = {
    "bg-red-500": "#ef4444",
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#22c55e",
    "bg-yellow-500": "#eab308",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-cyan-500": "#06b6d4",
    "bg-orange-500": "#f97316",
    "bg-gray-500": "#6b7280",
  }

  return colorMap[colorClass] || "#6b7280"
}

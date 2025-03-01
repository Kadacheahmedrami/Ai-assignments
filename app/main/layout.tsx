import type React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}


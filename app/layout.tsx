import type { Metadata } from "next";

import "./globals.css";
import type React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body
        className={`  antialiased`}
      >
     <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
  
}



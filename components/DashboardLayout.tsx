"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Menu,
  Bell,
  User,
} from "lucide-react"
import { SVGProps } from 'react'

interface NavItem {
  title: string
  href: string
  icon: React.FC<SVGProps<SVGSVGElement>>
  subItems?: NavItem[]
}

const navItems: NavItem[] = [

  {
    title: "assignment01 (tp)",
    href: "/assignment01",
    icon: FileText,
    subItems: [
      { title: "documentation ", href: "/assignment01/documentation", icon: FileText },
      { title: "start", href: "/assignment01/start", icon: FileText },
      { title: "code", href: "/assignment01/code", icon: FileText },
      { title: "Contact", href: "/assignment01/contact", icon: FileText },
    ],
  }
]

const NavItemComponent: React.FC<{ item: NavItem; isOpen: boolean }> = ({ item, isOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const hasSubItems = item.subItems && item.subItems.length > 0

  const bgColor = isActive ? "bg-indigo-700" : "hover:bg-indigo-600"
  const textColor = isActive ? "text-white" : "text-indigo-100"

  return (
    <div>
      <Link
        href={item.href}
        className={`flex items-center p-3 rounded-lg ${bgColor} ${textColor} transition-all duration-200 ease-in-out`}
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault()
            setIsSubMenuOpen(!isSubMenuOpen)
          }
        }}
      >
        <item.icon className="h-6 w-6 mr-3" />
        {isOpen && (
          <>
            <span className="flex-1">{item.title}</span>
            {hasSubItems && (
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isSubMenuOpen ? "rotate-180" : ""}`}
              />
            )}
          </>
        )}
      </Link>
      {isOpen && hasSubItems && isSubMenuOpen && (
        <div className="ml-6 mt-2 space-y-2">
          {item.subItems!.map((subItem) => (
            <NavItemComponent key={subItem.href} item={subItem} isOpen={isOpen} />
          ))}
        </div>
      )}
    </div>
  )
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex  h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 ease-in-out transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between h-[8vh] px-4 bg-gray-800">
          <span className="text-2xl font-bold">Dashboard</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2 space-y-3">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} isOpen={true} />
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 overflow-y-scroll flex flex-col ">
        <header className="flex items-center justify-between  p-4  bg-gray-900 shadow-md">
          <div className="flex  items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-300 lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <User className="h-6 w-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 w-full  h-full">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

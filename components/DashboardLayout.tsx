"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FileText,
  Menu,
  Bell,
  User,
  BookOpen,
  PlayCircle,
  Code,
  X,
} from "lucide-react"
import { SVGProps } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.FC<SVGProps<SVGSVGElement>>
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Astar-map",
    href: "/assignments/Astar-map",
    icon: FileText,
    subItems: [
      { title: "Documentation", href: "/assignments/Astar-map/documentation", icon: BookOpen },
      { title: "Start", href: "/assignments/Astar-map/start", icon: PlayCircle },
      { title: "Code", href: "/assignments/Astar-map/code", icon: Code },
      { title: "Contact", href: "/assignments/Astar-map/contact", icon: User },
    ],
  },
  {
    title: "3d-maze",
    href: "/assignments/3d-maze",
    icon: FileText,
    subItems: [
      { title: "Documentation", href: "/assignments/3d-maze/documentation", icon: BookOpen },
      { title: "Start", href: "/assignments/3d-maze/start", icon: PlayCircle },
      { title: "Code", href: "/assignments/3d-maze/code", icon: Code },
      { title: "Contact", href: "/assignments/3d-maze/contact", icon: User },
    ],
  },
]

const NavItemComponent: React.FC<{ item: NavItem; isOpen: boolean }> = ({ item, isOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const hasSubItems = item.subItems && item.subItems.length > 0

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault()
      setIsSubMenuOpen(!isSubMenuOpen)
    }
  }

  return (
    <div className="w-full">
      <Link
        href={item.href}
        onClick={handleClick}
        className={`
          flex items-center w-full p-3 rounded-lg transition-all duration-200 group
          ${isActive 
            ? "bg-blue-600 text-white shadow-md" 
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }
        `}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {isOpen && (
          <>
            <span className="ml-3 flex-1 text-sm font-medium truncate">{item.title}</span>
            {hasSubItems && (
              <ChevronDown
                className={`h-4 w-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
                  isSubMenuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </>
        )}
      </Link>
      
      {isOpen && hasSubItems && (
        <div className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
          isSubMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          {item.subItems!.map((subItem) => {
            const isSubActive = pathname === subItem.href
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={`
                  flex items-center p-2 rounded-md text-sm transition-colors duration-200
                  ${isSubActive 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <subItem.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{subItem.title}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          transition-transform duration-300 ease-in-out transform shadow-xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-700">
          <Link href="/" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="text-lg font-semibold">Home</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden text-gray-400 hover:text-white hover:bg-gray-700 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} isOpen={true} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 text-center">
            Dashboard v1.0
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 lg:hidden hover:text-gray-700 hover:bg-gray-100 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
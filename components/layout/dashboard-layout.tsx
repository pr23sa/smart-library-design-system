"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { MobileNav } from "./mobile-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userRole, setUserRole] = useState<"student" | "admin">("student")

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:pl-20">
        <Navbar userRole={userRole} onRoleChange={setUserRole} />
        
        <main className="min-h-[calc(100vh-4rem)] p-4 pb-20 lg:p-6 lg:pb-6">
          {typeof children === "function" 
            ? (children as (props: { userRole: "student" | "admin" }) => React.ReactNode)({ userRole })
            : children
          }
        </main>
      </div>
      
      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}

// Context for accessing role in child components
import { createContext, useContext } from "react"

const RoleContext = createContext<{
  userRole: "student" | "admin"
  setUserRole: (role: "student" | "admin") => void
} | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<"student" | "admin">("student")

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:pl-20">
          <Navbar userRole={userRole} onRoleChange={setUserRole} />
          <main className="min-h-[calc(100vh-4rem)] p-4 pb-20 lg:p-6 lg:pb-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within DashboardProvider")
  }
  return context
}

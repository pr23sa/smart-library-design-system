"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarClock, 
  User,
  Library
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/books", icon: BookOpen, label: "Browse Books" },
  { href: "/reservations", icon: CalendarClock, label: "My Reservations" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col border-r border-sidebar-border bg-sidebar backdrop-blur-xl lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <Library className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200",
                isActive 
                  ? "bg-sidebar-accent text-accent" 
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              {/* Active indicator - vertical pill */}
              {isActive && (
                <span className="absolute -left-[2px] h-6 w-1 rounded-full bg-accent" />
              )}
              
              <item.icon className="h-5 w-5" />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 hidden whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

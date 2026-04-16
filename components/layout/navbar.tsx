"use client"

import { Bell, Search, Command } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface NavbarProps {
  userRole: "student" | "admin"
  onRoleChange: (role: "student" | "admin") => void
}

export function Navbar({ userRole, onRoleChange }: NavbarProps) {
  const [notifications] = useState([
    { id: 1, title: "Book due tomorrow", message: "The Great Gatsby is due tomorrow" },
    { id: 2, title: "Reservation ready", message: "Your reserved book is available" },
    { id: 3, title: "New arrivals", message: "Check out 12 new books added this week" },
  ])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-xl lg:px-6">
      {/* Search Bar - Command Palette Style */}
      <div className="flex flex-1 items-center gap-4">
        <button className="flex h-10 w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-4 text-sm text-muted-foreground transition-colors hover:bg-secondary">
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search by title or author</span>
          <kbd className="hidden items-center gap-1 rounded-lg border border-border bg-card px-2 py-0.5 text-xs font-medium text-muted-foreground md:flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Role Toggle */}
        <div className="hidden items-center gap-1 rounded-2xl bg-secondary p-1 sm:flex">
          <button
            onClick={() => onRoleChange("student")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              userRole === "student"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onRoleChange("admin")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              userRole === "admin"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-2xl">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-2xl">
            <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.message}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 rounded-2xl pl-2 pr-3">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" />
                <AvatarFallback className="bg-accent text-xs text-accent-foreground">JD</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline-block">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Borrows</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

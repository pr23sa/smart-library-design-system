"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award,
  Edit2,
  Camera
} from "lucide-react"
import { DashboardProvider } from "@/components/layout/dashboard-layout"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const userStats = [
  { label: "Books Borrowed", value: "47", icon: BookOpen },
  { label: "Points Earned", value: "1,240", icon: Award },
  { label: "Member Since", value: "Sep 2024", icon: Calendar },
]

const borrowingHistory = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    borrowedDate: "Mar 15, 2026",
    returnedDate: "Apr 5, 2026",
    status: "returned",
  },
  {
    id: "2",
    title: "Machine Learning Basics",
    author: "Sebastian Raschka",
    borrowedDate: "Mar 20, 2026",
    returnedDate: "Apr 10, 2026",
    status: "returned",
  },
  {
    id: "3",
    title: "Linux Command Line",
    author: "William Shotts",
    borrowedDate: "Apr 1, 2026",
    returnedDate: null,
    status: "active",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              My Profile
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your account settings and view your library activity
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            {/* Profile Card */}
            <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-accent/20">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                        alt="Profile"
                        width={112}
                        height={112}
                        className="object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 rounded-full bg-accent p-2 text-accent-foreground shadow-lg transition-transform hover:scale-110">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Name & Role */}
                  <h2 className="mt-4 text-xl font-bold text-foreground">Pragati Sahu</h2>
                  <p className="text-sm text-muted-foreground">Computer Science, 3rd Year</p>

                  {/* Stats */}
                  <div className="mt-6 grid w-full grid-cols-3 gap-4">
                    {userStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-secondary/50 p-3">
                        <stat.icon className="mx-auto h-5 w-5 text-accent" />
                        <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="mt-6 w-full rounded-2xl"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Details & History */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/30 p-4">
                    <div className="rounded-xl bg-accent/10 p-2">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Student ID</p>
                      <p className="font-medium text-foreground">CS2024001</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/30 p-4">
                    <div className="rounded-xl bg-accent/10 p-2">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">pragati@university.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/30 p-4">
                    <div className="rounded-xl bg-accent/10 p-2">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/30 p-4">
                    <div className="rounded-xl bg-accent/10 p-2">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">Computer Science</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Borrowing History */}
              <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Borrowing History</CardTitle>
                  <CardDescription>Your latest library activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {borrowingHistory.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-secondary/30 p-4"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.author}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Borrowed: {item.borrowedDate}
                            {item.returnedDate && ` • Returned: ${item.returnedDate}`}
                          </p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "returned" 
                            ? "bg-success/10 text-success" 
                            : "bg-accent/10 text-accent"
                        }`}>
                          {item.status === "returned" ? "Returned" : "Active"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </DashboardProvider>
  )
}

"use client"

import { CalendarClock, Clock, CheckCircle2, XCircle } from "lucide-react"
import { DashboardProvider } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const reservations = [
  {
    id: "1",
    bookTitle: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reservedDate: "Apr 10, 2026",
    dueDate: "Apr 24, 2026",
    status: "active",
  },
  {
    id: "2",
    bookTitle: "To Kill a Mockingbird",
    author: "Harper Lee",
    reservedDate: "Apr 5, 2026",
    dueDate: "Apr 19, 2026",
    status: "due_soon",
  },
  {
    id: "3",
    bookTitle: "1984",
    author: "George Orwell",
    reservedDate: "Mar 20, 2026",
    dueDate: "Apr 3, 2026",
    status: "returned",
  },
  {
    id: "4",
    bookTitle: "Pride and Prejudice",
    author: "Jane Austen",
    reservedDate: "Apr 12, 2026",
    dueDate: "Apr 26, 2026",
    status: "pending",
  },
]

const statusConfig = {
  active: { label: "Active", variant: "default" as const, icon: Clock },
  due_soon: { label: "Due Soon", variant: "destructive" as const, icon: CalendarClock },
  returned: { label: "Returned", variant: "secondary" as const, icon: CheckCircle2 },
  pending: { label: "Pending", variant: "outline" as const, icon: Clock },
}

function ReservationsContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          My Reservations
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track and manage your book reservations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
              <CalendarClock className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Due Soon</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Total Returned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservations List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation) => {
              const config = statusConfig[reservation.status as keyof typeof statusConfig]
              const StatusIcon = config.icon
              return (
                <div
                  key={reservation.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{reservation.bookTitle}</h3>
                      <p className="text-sm text-muted-foreground">{reservation.author}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Reserved: {reservation.reservedDate}</span>
                        <span>Due: {reservation.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    {reservation.status === "active" && (
                      <Button size="sm" variant="outline">
                        Extend
                      </Button>
                    )}
                    {reservation.status === "pending" && (
                      <Button size="sm" variant="outline" className="text-destructive">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ReservationsPage() {
  return (
    <DashboardProvider>
      <ReservationsContent />
    </DashboardProvider>
  )
}

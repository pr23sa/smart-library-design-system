"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar: string
  }
  action: "borrowed" | "returned" | "overdue" | "reserved"
  book: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

const actionConfig = {
  borrowed: {
    icon: BookOpen,
    label: "borrowed",
    color: "bg-accent/10 text-accent",
  },
  returned: {
    icon: CheckCircle,
    label: "returned",
    color: "bg-success/10 text-success",
  },
  overdue: {
    icon: AlertCircle,
    label: "overdue",
    color: "bg-[#E8A87C]/10 text-[#E8A87C]",
  },
  reserved: {
    icon: Clock,
    label: "reserved",
    color: "bg-chart-4/10 text-chart-4",
  },
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest library transactions</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = actionConfig[activity.action]
          const Icon = config.icon
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-card"
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full",
                  config.color
                )}>
                  <Icon className="h-3 w-3" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user.name}</span>
                  {" "}
                  <span className="text-muted-foreground">{config.label}</span>
                  {" "}
                  <span className="font-medium truncate">{activity.book}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
              </div>

              {/* Status Badge */}
              {activity.action === "overdue" && (
                <span className="flex-shrink-0 rounded-full bg-[#E8A87C]/10 px-2 py-0.5 text-xs font-medium text-[#E8A87C]">
                  Return Pending
                </span>
              )}
            </div>
          )
        })}
      </div>

      <button className="mt-6 w-full rounded-xl border border-border bg-secondary/50 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
        View All Activity
      </button>
    </div>
  )
}

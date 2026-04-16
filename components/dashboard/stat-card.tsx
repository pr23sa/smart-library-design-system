"use client"

import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  sparklineData?: number[]
  className?: string
}

function Sparkline({ data, isPositive = true }: { data: number[]; isPositive?: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 40
  const width = 80
  const padding = 4
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - ((value - min) / range) * (height - padding * 2) - padding
    return `${x},${y}`
  }).join(" ")

  const areaPath = `M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`
  const linePath = `M ${points}`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkline-gradient-${isPositive}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? "var(--success)" : "var(--destructive)"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? "var(--success)" : "var(--destructive)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill={`url(#sparkline-gradient-${isPositive})`}
        className="transition-all duration-300"
      />
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "var(--success)" : "var(--destructive)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
      {/* End dot */}
      <circle
        cx={width - padding}
        cy={height - ((data[data.length - 1] - min) / range) * (height - padding * 2) - padding}
        r="3"
        fill={isPositive ? "var(--success)" : "var(--destructive)"}
        className="transition-all duration-300"
      />
    </svg>
  )
}

export function StatCard({ title, value, icon: Icon, trend, sparklineData, className }: StatCardProps) {
  const defaultSparklineData = sparklineData || [30, 45, 35, 50, 40, 60, 55]
  
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-300 group-hover:scale-110" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/15">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          
          {/* Sparkline */}
          <Sparkline data={defaultSparklineData} isPositive={trend?.isPositive !== false} />
        </div>

        {/* Value */}
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{title}</p>
        </div>

        {/* Trend */}
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                trend.isPositive !== false
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {trend.isPositive !== false ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{trend.isPositive !== false ? "+" : ""}{trend.value}%</span>
            </div>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}

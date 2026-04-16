"use client"

import { useMemo } from "react"

interface ActivityChartProps {
  data: { day: string; value: number }[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data])

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Activity Summary</h3>
          <p className="text-sm text-muted-foreground">Your reading activity this week</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-3 w-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Books borrowed</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-border" />
          ))}
        </div>

        {/* Bars */}
        <div className="relative flex h-full items-end justify-between gap-2 pt-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full max-w-12">
                <div
                  className="w-full rounded-t-lg bg-accent transition-all duration-500"
                  style={{
                    height: `${(item.value / maxValue) * 160}px`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-xs text-muted-foreground">Total this week</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-success">+12%</p>
          <p className="text-xs text-muted-foreground">vs last week</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">4.2</p>
          <p className="text-xs text-muted-foreground">Daily average</p>
        </div>
      </div>
    </div>
  )
}

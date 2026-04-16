"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BorrowingChartProps {
  data: { month: string; borrowed: number; returned: number }[]
}

const chartConfig = {
  borrowed: {
    label: "Borrowed",
    color: "var(--chart-1)",
  },
  returned: {
    label: "Returned",
    color: "var(--chart-2)",
  },
}

export function BorrowingChart({ data }: BorrowingChartProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Borrowing Trends</h3>
        <p className="text-sm text-muted-foreground">Monthly borrowing and return activity</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="borrowedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="returnedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dx={-10}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: "var(--border)", strokeDasharray: "5 5" }}
            />
            <Area
              type="monotone"
              dataKey="returned"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fill="url(#returnedGradient)"
              dot={false}
              activeDot={{ r: 6, fill: "var(--chart-2)", strokeWidth: 2, stroke: "var(--card)" }}
            />
            <Area
              type="monotone"
              dataKey="borrowed"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#borrowedGradient)"
              dot={false}
              activeDot={{ r: 6, fill: "var(--chart-1)", strokeWidth: 2, stroke: "var(--card)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-1" />
          <span className="text-sm text-muted-foreground">Borrowed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-2" />
          <span className="text-sm text-muted-foreground">Returned</span>
        </div>
      </div>
    </div>
  )
}

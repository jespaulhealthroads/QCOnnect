"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, FileText, RefreshCw } from "lucide-react"

const metrics = [
  {
    title: "Outreach Encounters Fetched",
    value: "1,240",
    trend: "+12% this week",
    trendPositive: true,
    icon: TrendingUp,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    borderColor: "border-l-emerald-500",
    sparkline: [20, 35, 28, 45, 38, 52, 48, 60, 55, 70, 65, 80],
  },
  {
    title: "Coordinated Entry Referrals",
    value: "85",
    trend: "Pending transformation",
    trendPositive: null,
    icon: Clock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-l-amber-500",
    sparkline: [15, 18, 12, 20, 16, 22, 19, 25, 21, 18, 23, 20],
  },
  {
    title: "Claims Submitted",
    value: "412 Files",
    trend: "Converted to X12 837",
    trendPositive: true,
    icon: FileText,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-l-emerald-500",
    sparkline: [30, 42, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85],
  },
  {
    title: "Reconciliation (835)",
    value: "115 Batches",
    trend: "Payments Posted to Clarity",
    trendPositive: true,
    icon: RefreshCw,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-l-emerald-500",
    sparkline: [10, 15, 12, 18, 22, 20, 28, 25, 32, 30, 35, 38],
  },
]

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 24
  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg className="w-full h-6" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className={`bg-white border-slate-200 shadow-sm border-l-4 ${metric.borderColor}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{metric.title}</CardTitle>
            <div className={`p-2 rounded-lg ${metric.iconBg}`}>
              <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
            <p
              className={`text-sm mt-1 ${
                metric.trendPositive === true
                  ? "text-emerald-600"
                  : metric.trendPositive === false
                    ? "text-red-600"
                    : "text-slate-500"
              }`}
            >
              {metric.trend}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <Sparkline data={metric.sparkline} color={metric.trendPositive === null ? "#f59e0b" : "#10b981"} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minimize2, Maximize2, Terminal } from "lucide-react"

export interface LogEntry {
  time: string
  level: "INFO" | "SUCCESS" | "WARN" | "ERROR" | "QUERY" | "RESPONSE"
  source: string
  message: string
  isGraphQL?: boolean
}

export interface EventStreamConsoleRef {
  addLog: (log: Omit<LogEntry, "time">) => void
  addGraphQLQuery: (query: string) => void
  addGraphQLResponse: (status: string, time: string) => void
}

const initialLogs: LogEntry[] = [
  {
    time: "10:42:01",
    level: "INFO",
    source: "Worker-3",
    message: "Fetched Client #998877 from Clarity endpoint /enrollments.",
  },
  { time: "10:42:02", level: "INFO", source: "Mapper", message: "Transformed Service 'H-NAV' to CPT 'H0040'." },
  {
    time: "10:42:03",
    level: "SUCCESS",
    source: "Transport",
    message: "837 Batch #442 uploaded to SFTP. Acknowledgement received.",
  },
  { time: "10:42:05", level: "INFO", source: "Worker-1", message: "Processing reconciliation batch from SocialRCM." },
]

export const EventStreamConsole = forwardRef<EventStreamConsoleRef>((_, ref) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8)
  }

  useImperativeHandle(ref, () => ({
    addLog: (log: Omit<LogEntry, "time">) => {
      setLogs((prev) => [...prev, { ...log, time: getCurrentTime() }])
    },
    addGraphQLQuery: (query: string) => {
      setLogs((prev) => [
        ...prev,
        {
          time: getCurrentTime(),
          level: "QUERY",
          source: "GraphQL",
          message: query,
          isGraphQL: true,
        },
      ])
    },
    addGraphQLResponse: (status: string, responseTime: string) => {
      setLogs((prev) => [
        ...prev,
        {
          time: getCurrentTime(),
          level: "RESPONSE",
          source: "GraphQL",
          message: `${status} (${responseTime})`,
          isGraphQL: true,
        },
      ])
    },
  }))

  // Simulate live log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        { level: "INFO" as const, source: "Scheduler", message: "Next Clarity poll in 25 seconds." },
        {
          level: "INFO" as const,
          source: "Worker-2",
          message: "Validated 14 encounter records against HUD schema.",
        },
        {
          level: "SUCCESS" as const,
          source: "WriteBack",
          message: "Updated payment status for 3 clients in Clarity.",
        },
      ]
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)]
      setLogs((prev) => [...prev.slice(-8), { ...randomLog, time: getCurrentTime() }])
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "SUCCESS":
        return "text-emerald-400"
      case "INFO":
        return "text-sky-400"
      case "WARN":
        return "text-amber-400"
      case "ERROR":
        return "text-red-400"
      case "QUERY":
        return "text-violet-400"
      case "RESPONSE":
        return "text-emerald-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <Card className="bg-slate-950 border-slate-800 shadow-lg">
      <CardHeader className="pb-2 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            System Events / Audit Log
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent className="p-4">
          <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className={`flex gap-2 ${log.isGraphQL ? "py-1" : ""}`}>
                <span className="text-slate-500">[{log.time}]</span>
                <span className={`${getLevelColor(log.level)} w-16`}>{log.level.padEnd(8)}</span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-300 w-20">{log.source}:</span>
                <span className={`${log.isGraphQL ? "text-cyan-300" : "text-slate-300"} whitespace-pre-wrap`}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
})

EventStreamConsole.displayName = "EventStreamConsole"

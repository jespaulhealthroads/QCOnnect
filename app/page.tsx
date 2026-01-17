"use client"

import { useState, useRef } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricCards } from "@/components/metric-cards"
import { IntegrationWorkflow } from "@/components/integration-workflow"
import { ClaritySourceView } from "@/components/clarity-source-view"
import { SocialRcmView } from "@/components/socialrcm-view"
import { LogsView } from "@/components/logs-view"
import { SettingsView } from "@/components/settings-view"
import { LiveDataPipeline } from "@/components/live-data-pipeline"
import { EventStreamConsole, type EventStreamConsoleRef } from "@/components/event-stream-console"
import { DataMappingView } from "@/components/data-mapping-view"
import { mockGraphQLResponse, graphQLQueryString, transformToOutboundData } from "@/lib/mock-data"
import { CheckCircle2 } from "lucide-react"

export type ViewType =
  | "Dashboard"
  | "Bitfocus Clarity (Source)"
  | "SocialRCM (Billing)"
  | "Data Mapping"
  | "Logs & Audits"
  | "Settings"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewType>("Dashboard")
  const [isSyncing, setIsSyncing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [syncedData, setSyncedData] = useState<ReturnType<typeof transformToOutboundData> | null>(null)
  const consoleRef = useRef<EventStreamConsoleRef>(null)

  const handleSync = () => {
    setIsSyncing(true)

    // Step 1: Log the query being sent
    consoleRef.current?.addLog({
      level: "INFO",
      source: "Scheduler",
      message: "Force sync initiated by user. Connecting to Clarity GraphQL endpoint...",
    })

    setTimeout(() => {
      // Step 2: Show the GraphQL query structure
      consoleRef.current?.addGraphQLQuery(graphQLQueryString)
    }, 400)

    // Step 3: Simulate network latency (1.5s) then show response
    setTimeout(() => {
      const responseTime = `${Math.floor(Math.random() * 50) + 120}ms`
      consoleRef.current?.addGraphQLResponse("200 OK", responseTime)

      // Step 4: Log transformation
      consoleRef.current?.addLog({
        level: "INFO",
        source: "Parser",
        message: `Received ${mockGraphQLResponse.data.enrollments.edges.length} enrollment nodes from Bitfocus Clarity.`,
      })
    }, 1500)

    setTimeout(() => {
      // Step 5: Transform and inject data
      const transformedData = transformToOutboundData(mockGraphQLResponse)
      setSyncedData(transformedData)

      consoleRef.current?.addLog({
        level: "SUCCESS",
        source: "Mapper",
        message: `Transformed ${transformedData.length} records. Ready for X12 837 conversion.`,
      })

      // Step 6: Complete sync
      setIsSyncing(false)
      setToastMessage(`Sync Complete: ${transformedData.length} records processed from Bitfocus Clarity.`)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 flex flex-col">
        <DashboardHeader onViewChange={setActiveView} onSync={handleSync} isSyncing={isSyncing} />
        <div className="p-6 space-y-6 flex-1">
          {activeView === "Dashboard" && (
            <>
              <LiveDataPipeline />
              <MetricCards />
              <IntegrationWorkflow syncedData={syncedData} />
              <EventStreamConsole ref={consoleRef} />
            </>
          )}
          {activeView === "Bitfocus Clarity (Source)" && <ClaritySourceView />}
          {activeView === "SocialRCM (Billing)" && <SocialRcmView />}
          {activeView === "Data Mapping" && <DataMappingView />}
          {activeView === "Logs & Audits" && <LogsView />}
          {activeView === "Settings" && <SettingsView />}
        </div>
      </main>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

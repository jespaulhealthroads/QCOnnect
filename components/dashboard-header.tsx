"use client"

import { useState } from "react"
import { RefreshCw, Key, ChevronRight, User, Bell, CheckCircle2, Loader2, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ViewType } from "@/app/page"

interface DashboardHeaderProps {
  onViewChange: (view: ViewType) => void
  onSync?: () => void
  isSyncing?: boolean
}

const systemAlerts = [
  {
    id: 1,
    type: "error",
    title: "Claims Rejected",
    message: "3 Claims rejected by Payer. Review required.",
    time: "10m ago",
  },
  {
    id: 2,
    type: "info",
    title: "Daily Export Successful",
    message: "Daily Clarity export completed successfully.",
    time: "1h ago",
  },
]

export function DashboardHeader({ onViewChange, onSync, isSyncing: externalSyncing }: DashboardHeaderProps) {
  const [internalSyncing, setInternalSyncing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [syncMessage, setSyncMessage] = useState("Syncing...")

  const isSyncing = externalSyncing ?? internalSyncing

  const handleForceSync = () => {
    if (onSync) {
      onSync()
    } else {
      setInternalSyncing(true)
      setSyncMessage("Querying GraphQL Endpoint...")
      setTimeout(() => {
        setInternalSyncing(false)
        setSyncMessage("Syncing...")
        setShowToast(true)
        setTimeout(() => setShowToast(false), 4000)
      }, 2000)
    }
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-slate-500">
            <span
              className="hover:text-sky-600 cursor-pointer transition-colors"
              onClick={() => onViewChange("Dashboard")}
            >
              Home
            </span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="hover:text-slate-700 cursor-pointer">Integrations</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="hover:text-slate-700 cursor-pointer">Bitfocus Clarity</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-slate-900 font-medium">HUD CoC Connectivity</span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 bg-transparent min-w-[180px]"
              onClick={handleForceSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {syncMessage}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Force Sync
                </>
              )}
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => onViewChange("Settings")}>
              <Key className="h-4 w-4" />
              Configure API Tokens
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Bell className="h-5 w-5 text-slate-600" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Notifications</span>
                  <span className="text-xs text-slate-500 font-normal">{systemAlerts.length} new</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {systemAlerts.map((alert) => (
                  <DropdownMenuItem
                    key={alert.id}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-slate-50"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {alert.type === "error" ? (
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      ) : (
                        <Info className="h-4 w-4 text-sky-500 shrink-0" />
                      )}
                      <span className="font-medium text-sm text-slate-900">{alert.title}</span>
                      <span className="text-xs text-slate-400 ml-auto">{alert.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">{alert.message}</p>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sky-600 hover:text-sky-700 cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-slate-200">
                    <AvatarFallback className="bg-sky-500 text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange("Settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-medium">Sync Complete: 124 records processed from Bitfocus Clarity.</span>
          </div>
        </div>
      )}
    </>
  )
}

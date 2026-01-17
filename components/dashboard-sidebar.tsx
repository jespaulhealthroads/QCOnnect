"use client"

import { LayoutDashboard, Database, Receipt, FileText, Settings, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ViewType } from "@/app/page"

const menuItems: { icon: typeof LayoutDashboard; label: ViewType }[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Database, label: "Bitfocus Clarity (Source)" },
  { icon: Receipt, label: "SocialRCM (Billing)" },
  { icon: GitBranch, label: "Data Mapping" },
  { icon: FileText, label: "Logs & Audits" },
  { icon: Settings, label: "Settings" },
]

interface DashboardSidebarProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

export function DashboardSidebar({ activeView, onViewChange }: DashboardSidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          <span className="text-sky-400">Q</span>Connect
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onViewChange(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeView === item.label
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-slate-300">
            System Status: <span className="text-emerald-400 font-medium">ONLINE</span>
          </span>
        </div>
      </div>
    </aside>
  )
}

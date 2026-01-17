"use client"

import { RefreshCw, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const clarityData = [
  {
    hmisId: "CL-99201",
    client: "Martinez, Roberto",
    program: "Outreach",
    serviceDate: "2026-01-14",
    syncStatus: "Synced",
  },
  {
    hmisId: "CL-99202",
    client: "Johnson, Maria",
    program: "Coordinated Entry",
    serviceDate: "2026-01-14",
    syncStatus: "Synced",
  },
  {
    hmisId: "CL-99203",
    client: "Williams, James",
    program: "Outreach",
    serviceDate: "2026-01-13",
    syncStatus: "Pending",
  },
  {
    hmisId: "CL-99204",
    client: "Garcia, Ana",
    program: "Coordinated Entry",
    serviceDate: "2026-01-13",
    syncStatus: "Synced",
  },
  { hmisId: "CL-99205", client: "Brown, Michael", program: "Outreach", serviceDate: "2026-01-12", syncStatus: "Error" },
  {
    hmisId: "CL-99206",
    client: "Davis, Sarah",
    program: "Coordinated Entry",
    serviceDate: "2026-01-12",
    syncStatus: "Synced",
  },
  {
    hmisId: "CL-99207",
    client: "Rodriguez, Carlos",
    program: "Outreach",
    serviceDate: "2026-01-11",
    syncStatus: "Synced",
  },
  {
    hmisId: "CL-99208",
    client: "Wilson, Emily",
    program: "Coordinated Entry",
    serviceDate: "2026-01-11",
    syncStatus: "Pending",
  },
]

export function ClaritySourceView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Source Data Management</h2>
          <p className="text-slate-500">Manage and sync records from Bitfocus Clarity HMIS</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2">
          <RefreshCw className="h-4 w-4" />
          Fetch from Clarity API
        </Button>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">HMIS Records</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search records..." className="pl-9 w-64 bg-white" />
              </div>
              <Button variant="outline" size="icon" className="border-slate-300 bg-transparent">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    HMIS ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Service Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sync Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {clarityData.map((row) => (
                  <tr key={row.hmisId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{row.hmisId}</td>
                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">{row.client}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          row.program === "Outreach" ? "bg-sky-100 text-sky-700" : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {row.program}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{row.serviceDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                          row.syncStatus === "Synced"
                            ? "bg-emerald-100 text-emerald-700"
                            : row.syncStatus === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            row.syncStatus === "Synced"
                              ? "bg-emerald-500"
                              : row.syncStatus === "Pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        {row.syncStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Terminal, Download, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const logEntries = [
  { timestamp: "2026-01-14 14:32:01", level: "INFO", message: "Integration cycle started for batch #2026-0114-001" },
  {
    timestamp: "2026-01-14 14:32:02",
    level: "INFO",
    message: "Fetching records from Clarity API endpoint /services/outreach",
  },
  { timestamp: "2026-01-14 14:32:03", level: "SUCCESS", message: "Retrieved 14 new Outreach encounters from Clarity" },
  { timestamp: "2026-01-14 14:32:04", level: "INFO", message: "Parsed JSON for Client #99201 - Martinez, Roberto" },
  { timestamp: "2026-01-14 14:32:05", level: "INFO", message: "Mapping service code H-NAV → CPT H0040" },
  { timestamp: "2026-01-14 14:32:06", level: "INFO", message: "Generated claim CLM-2026-001 for $150.00" },
  { timestamp: "2026-01-14 14:32:07", level: "SUCCESS", message: "X12 837P segment created: SV1*HC:H0040*150.00*UN*1" },
  {
    timestamp: "2026-01-14 14:32:08",
    level: "WARN",
    message: "Client #99205 missing DOB field - flagged for manual review",
  },
  {
    timestamp: "2026-01-14 14:32:09",
    level: "WARN",
    message: "Client #99208 missing DOB field - flagged for manual review",
  },
  { timestamp: "2026-01-14 14:32:10", level: "INFO", message: "Submitting batch to clearinghouse via SFTP" },
  { timestamp: "2026-01-14 14:32:12", level: "SUCCESS", message: "Batch #2026-0114-001 accepted by clearinghouse" },
  { timestamp: "2026-01-14 14:32:13", level: "INFO", message: "Processing ERA 835 response from Medi-Cal" },
  {
    timestamp: "2026-01-14 14:32:14",
    level: "SUCCESS",
    message: "Payment reconciliation: 14 records updated with status PAID",
  },
  {
    timestamp: "2026-01-14 14:32:15",
    level: "INFO",
    message: "Writing back payment status to Clarity for batch #2026-0114-001",
  },
  { timestamp: "2026-01-14 14:32:16", level: "SUCCESS", message: "Integration cycle complete. Duration: 15.2s" },
]

export function LogsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Logs & Audits</h2>
          <p className="text-slate-500">System activity and integration audit trail</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-slate-300 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 border-slate-300 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-slate-300 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-slate-500" />
            <CardTitle className="text-lg font-semibold text-slate-800">System Console</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-slate-900 rounded-b-lg p-4 font-mono text-sm max-h-[600px] overflow-y-auto">
            {logEntries.map((log, index) => (
              <div key={index} className="flex items-start gap-3 py-1.5 border-b border-slate-800 last:border-0">
                <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${
                    log.level === "INFO"
                      ? "bg-sky-500/20 text-sky-400"
                      : log.level === "SUCCESS"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : log.level === "WARN"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                  }`}
                >
                  [{log.level}]
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

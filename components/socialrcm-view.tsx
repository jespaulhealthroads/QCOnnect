"use client"

import { FileOutput, Search, Filter, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const claimsData = [
  { claimId: "CLM-2026-001", payer: "Medi-Cal", amount: "$150.00", submissionDate: "2026-01-14", status: "Submitted" },
  { claimId: "CLM-2026-002", payer: "Medi-Cal", amount: "$225.00", submissionDate: "2026-01-14", status: "Accepted" },
  { claimId: "CLM-2026-003", payer: "County MH", amount: "$180.00", submissionDate: "2026-01-13", status: "Paid" },
  { claimId: "CLM-2026-004", payer: "Medi-Cal", amount: "$150.00", submissionDate: "2026-01-13", status: "Denied" },
  { claimId: "CLM-2026-005", payer: "County MH", amount: "$300.00", submissionDate: "2026-01-12", status: "Paid" },
  { claimId: "CLM-2026-006", payer: "Medi-Cal", amount: "$175.00", submissionDate: "2026-01-12", status: "Submitted" },
  { claimId: "CLM-2026-007", payer: "Medi-Cal", amount: "$150.00", submissionDate: "2026-01-11", status: "Accepted" },
  { claimId: "CLM-2026-008", payer: "County MH", amount: "$225.00", submissionDate: "2026-01-11", status: "Paid" },
]

export function SocialRcmView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Revenue Cycle & Claims</h2>
          <p className="text-slate-500">Manage claims and billing through SocialRCM</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <FileOutput className="h-4 w-4" />
          Generate 837 Batch
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Total Paid</p>
                <p className="text-xl font-bold text-slate-900">$705.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-100 rounded-lg">
                <FileOutput className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Submitted</p>
                <p className="text-xl font-bold text-slate-900">$325.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FileOutput className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Pending</p>
                <p className="text-xl font-bold text-slate-900">$375.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileOutput className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Denied</p>
                <p className="text-xl font-bold text-slate-900">$150.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">Claims History</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search claims..." className="pl-9 w-64 bg-white" />
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
                    Claim ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Payer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {claimsData.map((row) => (
                  <tr key={row.claimId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{row.claimId}</td>
                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">{row.payer}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">{row.amount}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{row.submissionDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                          row.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : row.status === "Accepted"
                              ? "bg-sky-100 text-sky-700"
                              : row.status === "Submitted"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            row.status === "Paid"
                              ? "bg-emerald-500"
                              : row.status === "Accepted"
                                ? "bg-sky-500"
                                : row.status === "Submitted"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                          }`}
                        />
                        {row.status}
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

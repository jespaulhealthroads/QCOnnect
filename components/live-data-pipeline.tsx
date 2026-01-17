"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Cog, Building2, ArrowRight, ArrowLeft } from "lucide-react"

export function LiveDataPipeline() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Data Pipeline
          <Badge variant="outline" className="ml-2 text-xs font-normal text-slate-500">
            Bi-Directional Closed Loop
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Track Labels */}
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex items-center gap-1">
              <ArrowRight className="h-3 w-3 text-sky-500" />
              <span className="text-xs font-medium text-sky-600 uppercase tracking-wide">Outbound: Service Data</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowLeft className="h-3 w-3 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                Inbound: Reconciliation
              </span>
            </div>
          </div>

          <div className="flex items-stretch justify-center gap-0">
            {/* Stage 1: Bitfocus Clarity */}
            <div className="w-52 p-4 bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl text-center shadow-sm">
              <div className="mx-auto w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-3">
                <Database className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Bitfocus Clarity</h3>
              <p className="text-xs mt-1 text-emerald-600 font-medium">Connected (GraphQL)</p>
              <Badge variant="default" className="mt-2 text-xs bg-sky-600 hover:bg-sky-600">
                Polling 30s
              </Badge>
              <div className="mt-3 pt-2 border-t border-slate-200 space-y-1">
                <p className="text-xs text-emerald-600 font-medium flex items-center justify-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Write-back: Active
                </p>
              </div>
            </div>

            {/* Connector: Clarity ↔ QConnect */}
            <div className="flex flex-col items-center justify-center w-28 px-2">
              {/* Top: Outbound (right arrow) */}
              <div className="flex flex-col items-center mb-3">
                <div className="relative w-full h-6 flex items-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-sky-200 rounded-full" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
                    <div className="flex gap-4 animate-[slideRight_1.5s_linear_infinite]">
                      <span className="h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                      <span className="h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-sky-500" />
                  </div>
                </div>
                <span className="text-[10px] text-sky-600 font-medium mt-1 whitespace-nowrap">Service Nodes</span>
              </div>
              {/* Bottom: Inbound (left arrow) */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-6 flex items-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-200 rounded-full" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
                    <div className="flex gap-4 animate-[slideLeft_1.5s_linear_infinite] justify-end">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <ArrowLeft className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium mt-1 whitespace-nowrap">
                  GraphQL Mutation
                </span>
              </div>
            </div>

            {/* Stage 2: QConnect Engine - Central Hub */}
            <div className="w-52 p-4 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-sky-500/50 rounded-xl text-center shadow-lg shadow-sky-500/10">
              <div className="mx-auto w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center mb-3 relative">
                <Cog className="h-6 w-6 text-white animate-[spin_4s_linear_infinite]" />
                <div className="absolute -inset-1 bg-sky-500/20 rounded-lg animate-pulse" />
              </div>
              <h3 className="font-semibold text-white text-sm">QConnect Engine</h3>
              <p className="text-xs mt-1 text-emerald-400 font-medium">Processing Hub</p>

              <div className="mt-3 space-y-2">
                <div className="bg-sky-900/50 border border-sky-500/30 rounded-md px-2 py-1.5">
                  <p className="text-xs text-sky-300 font-mono flex items-center justify-center gap-1">
                    <ArrowRight className="h-3 w-3" />
                    Forward: Nodes → X12
                  </p>
                </div>
                <div className="bg-emerald-900/50 border border-emerald-500/30 rounded-md px-2 py-1.5">
                  <p className="text-xs text-emerald-300 font-mono flex items-center justify-center gap-1">
                    <ArrowLeft className="h-3 w-3" />
                    Reverse: X12 → GraphQL
                  </p>
                </div>
              </div>
            </div>

            {/* Connector: QConnect ↔ SocialRCM */}
            <div className="flex flex-col items-center justify-center w-28 px-2">
              {/* Top: Outbound (right arrow) */}
              <div className="flex flex-col items-center mb-3">
                <div className="relative w-full h-6 flex items-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-sky-200 rounded-full" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
                    <div className="flex gap-4 animate-[slideRight_1.5s_linear_infinite]">
                      <span className="h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                      <span className="h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-sky-500" />
                  </div>
                </div>
                <span className="text-[10px] text-sky-600 font-medium mt-1 whitespace-nowrap">EDI 837 (Claims)</span>
              </div>
              {/* Bottom: Inbound (left arrow) */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-6 flex items-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-200 rounded-full" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
                    <div className="flex gap-4 animate-[slideLeft_1.5s_linear_infinite] justify-end">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <ArrowLeft className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium mt-1 whitespace-nowrap">EDI 835/277</span>
              </div>
            </div>

            {/* Stage 3: SocialRCM */}
            <div className="w-52 p-4 bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl text-center shadow-sm">
              <div className="mx-auto w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-3">
                <Building2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">SocialRCM Clearinghouse</h3>
              <p className="text-xs mt-1 text-emerald-600 font-medium">Receiving from MCP</p>
              <Badge className="mt-2 text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border border-emerald-200">
                Source: Payer Network
              </Badge>
            </div>
          </div>

          {/* Cycle indicator */}
          <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-sky-500" />
                  <span className="text-xs text-slate-600">Claims Out</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-600">Payments In</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">|</span>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                QConnect transforms data in both directions — it's the hub, not a tunnel
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

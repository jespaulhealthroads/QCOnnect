"use client"

import { X, ArrowRight, RefreshCw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionInspectorModalProps {
  isOpen: boolean
  onClose: () => void
  clarityId: string
  module: string
}

const sourceJson = {
  program_type: "Street Outreach",
  service_code: "H-NAV",
  client_id: "998877",
  service_date: "2026-01-14",
  provider_npi: "1234567890",
  units: 1,
}

const mappingRules = [
  { from: '"H-NAV"', to: "CPT Code H0040", description: "Service code mapping" },
  { from: '"Street Outreach"', to: "Payer: Medi-Cal", description: "Program to payer mapping" },
  { from: '"units": 1', to: "SV1 Unit Count", description: "Unit quantity mapping" },
]

const ediOutput = `ISA*00*          *00*          *ZZ*QCONNECT       *ZZ*CLEARINGHOUSE  *260114*1430*^*00501*000000001*0*P*:~
GS*HC*QCONNECT*CLEARINGHOUSE*20260114*1430*1*X*005010X222A1~
ST*837*0001*005010X222A1~
BHT*0019*00*998877*20260114*1430*CH~
NM1*41*2*SOCIALRCM BILLING*****46*1234567890~
SV1*HC:H0040*150.00*UN*1****~
SE*15*0001~
GE*1*1~
IEA*1*000000001~`

export function TransactionInspectorModal({ isOpen, onClose, clarityId, module }: TransactionInspectorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-4 max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Transaction Details: Clarity ID {clarityId} ({module} Module)
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">Data transformation pipeline view</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Three Columns */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Source */}
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">SOURCE</span>
                  <span className="text-sm font-medium text-slate-300">Clarity API JSON</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Bitfocus Clarity HMIS Export</p>
              </div>
              <div className="p-4">
                <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                  <code>
                    <span className="text-slate-500">{"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"program_type"</span>
                    <span className="text-slate-500">:</span> <span className="text-amber-300">"Street Outreach"</span>
                    <span className="text-slate-500">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"service_code"</span>
                    <span className="text-slate-500">:</span> <span className="text-amber-300">"H-NAV"</span>
                    <span className="text-slate-500">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"client_id"</span>
                    <span className="text-slate-500">:</span> <span className="text-amber-300">"998877"</span>
                    <span className="text-slate-500">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"service_date"</span>
                    <span className="text-slate-500">:</span> <span className="text-amber-300">"2026-01-14"</span>
                    <span className="text-slate-500">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"provider_npi"</span>
                    <span className="text-slate-500">:</span> <span className="text-amber-300">"1234567890"</span>
                    <span className="text-slate-500">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-emerald-400">"units"</span>
                    <span className="text-slate-500">:</span> <span className="text-purple-400">1</span>
                    {"\n"}
                    <span className="text-slate-500">{"}"}</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Column 2: Logic */}
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 rounded">
                    LOGIC
                  </span>
                  <span className="text-sm font-medium text-slate-300">QConnect Engine</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Transformation & Mapping Rules</p>
              </div>
              <div className="p-4 space-y-4">
                {mappingRules.map((rule, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{rule.description}</p>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 px-3 py-2 bg-slate-800 rounded text-sm font-mono text-amber-300 truncate">
                        {rule.from}
                      </code>
                      <ArrowRight className="h-4 w-4 text-emerald-500 shrink-0" />
                      <code className="flex-1 px-3 py-2 bg-emerald-900/30 border border-emerald-700/50 rounded text-sm font-mono text-emerald-400 truncate">
                        {rule.to}
                      </code>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    All mappings validated
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Destination */}
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-400 rounded">
                    DESTINATION
                  </span>
                  <span className="text-sm font-medium text-slate-300">SocialRCM / X12 837</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">EDI Professional Claim Format</p>
              </div>
              <div className="p-4">
                <pre className="text-xs font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  <code>
                    <span className="text-slate-600">ISA*00* *00* *</span>
                    {"\n"}
                    <span className="text-slate-600">ZZ*QCONNECT*ZZ*CLEARINGHOUSE*</span>
                    {"\n"}
                    <span className="text-slate-600">260114*1430*^*00501*~</span>
                    {"\n"}
                    <span className="text-slate-500">...</span>
                    {"\n"}
                    <span className="text-purple-400">SV1*HC:</span>
                    <span className="text-emerald-400">H0040</span>
                    <span className="text-purple-400">*</span>
                    <span className="text-amber-300">150.00</span>
                    <span className="text-purple-400">*UN*1****~</span>
                    {"\n"}
                    <span className="text-slate-500">...</span>
                    {"\n"}
                    <span className="text-slate-600">SE*15*0001~GE*1*1~IEA*1*~</span>
                  </code>
                </pre>
                <div className="mt-4 px-3 py-2 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-emerald-400">Ready for Clearinghouse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            View Raw Logs
          </Button>
          <Button className="gap-2 bg-slate-700 hover:bg-slate-800 text-white">
            <RefreshCw className="h-4 w-4" />
            Reprocess Transaction
          </Button>
        </div>
      </div>
    </div>
  )
}

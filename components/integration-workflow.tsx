"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TransactionInspectorModal } from "./transaction-inspector-modal"

interface OutboundRecord {
  clarityId: string
  clientName: string
  module: string
  serviceType: string
  status: string
  statusColor: string
}

interface IntegrationWorkflowProps {
  syncedData?: OutboundRecord[] | null
}

const defaultOutboundData: OutboundRecord[] = [
  {
    clarityId: "#998877",
    clientName: "J. Doe",
    module: "Outreach",
    serviceType: "Housing Navigation",
    status: "Transformed to 837 Claim",
    statusColor: "emerald",
  },
  {
    clarityId: "#998878",
    clientName: "M. Smith",
    module: "Coordinated Entry",
    serviceType: "VI-SPDAT Assessment",
    status: "Queued for Billing",
    statusColor: "amber",
  },
]

const inboundData = [
  {
    claimId: "CLAIM-001",
    clarityRefId: "Ref #998877",
    payerStatus: "PAID",
    payerName: "HealthNet",
    action: "Enrollment Updated",
    statusType: "success",
  },
  {
    claimId: "CLAIM-002",
    clarityRefId: "Ref #998850",
    payerStatus: "DENIED",
    denialCode: "Code 16",
    action: "Flagged for Review",
    statusType: "error",
  },
]

function StatusBadge({ status, color }: { status: string; color: string }) {
  const colorClasses = {
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.amber}`}
    >
      {color === "emerald" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
      {status}
    </span>
  )
}

function ModuleTag({ module }: { module: string }) {
  const isOutreach = module === "Outreach"
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${isOutreach ? "bg-slate-600 text-white" : "bg-indigo-600 text-white"}`}
    >
      {module}
    </span>
  )
}

function PayerStatusBadge({ status, detail }: { status: string; detail?: string }) {
  const isPaid = status === "PAID"
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${isPaid ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}
      >
        {status}
      </span>
      {detail && <span className="text-xs text-slate-500">({detail})</span>}
    </div>
  )
}

function ActionBadge({ action, type }: { action: string; type: string }) {
  const isSuccess = type === "success"
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${isSuccess ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}`}
    >
      {isSuccess ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      {action}
    </span>
  )
}

export function IntegrationWorkflow({ syncedData }: IntegrationWorkflowProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<{
    clarityId: string
    module: string
  } | null>(null)

  const outboundData = syncedData || defaultOutboundData

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Live Integration Workflow</h2>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Bi-Directional Sync Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Outbound */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-700 text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Outbound: Clarity to SocialRCM</h3>
                  <p className="text-xs text-slate-500">
                    {syncedData
                      ? `${syncedData.length} records from GraphQL sync`
                      : "Recent encounters fetched from Bitfocus Clarity API"}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent">
                <RefreshCw className="h-3.5 w-3.5" />
                Fetch New Encounters
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clarity Unique ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {outboundData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction({ clarityId: row.clarityId, module: row.module })}
                  >
                    <td className="px-4 py-3.5 font-mono text-slate-700">{row.clarityId}</td>
                    <td className="px-4 py-3.5 text-slate-800 font-medium">{row.clientName}</td>
                    <td className="px-4 py-3.5">
                      <ModuleTag module={row.module} />
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{row.serviceType}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={row.status} color={row.statusColor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Inbound */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-600 text-white">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Inbound: Reconciliation (SocialRCM to Clarity)</h3>
                <p className="text-xs text-slate-500">Payer responses returning to update HMIS records</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clarity Ref ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Payer Response
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inboundData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-slate-700">{row.claimId}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-600">{row.clarityRefId}</td>
                    <td className="px-4 py-3.5">
                      <PayerStatusBadge status={row.payerStatus} detail={row.payerName || row.denialCode} />
                    </td>
                    <td className="px-4 py-3.5">
                      <ActionBadge action={row.action} type={row.statusType} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Inspector Modal */}
      <TransactionInspectorModal
        isOpen={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        clarityId={selectedTransaction?.clarityId || ""}
        module={selectedTransaction?.module || ""}
      />
    </div>
  )
}

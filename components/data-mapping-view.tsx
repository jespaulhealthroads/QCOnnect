"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Type, Calendar, Code, Cog, Table, ArrowRight, Save, CheckCircle2 } from "lucide-react"

const sourceFields = [
  { id: "client_unique_id", label: "client_unique_id", type: "String", icon: Type },
  { id: "first_name", label: "first_name", type: "String", icon: Type },
  { id: "date_of_birth", label: "date_of_birth", type: "Date", icon: Calendar },
  { id: "enrollment_service_code", label: "enrollment_service_code", type: "Code", icon: Code },
]

const destFields = [
  { id: "PatientID", label: "PatientID", column: "Column A" },
  { id: "PatientName_First", label: "PatientName_First", column: "Column B" },
  { id: "DOB_YYYYMMDD", label: "DOB_YYYYMMDD", column: "Column C" },
  { id: "CPT_Code", label: "CPT_Code", column: "Column D" },
]

const mappings = [
  { source: "client_unique_id", dest: "PatientID", rule: "Direct Map", icon: ArrowRight },
  { source: "first_name", dest: "PatientName_First", rule: "Capitalize", icon: Type },
  { source: "date_of_birth", dest: "DOB_YYYYMMDD", rule: "Reformat Date", icon: Cog },
  { source: "enrollment_service_code", dest: "CPT_Code", rule: "Lookup Table", icon: Table },
]

export function DataMappingView() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Intelligent Field Mapping</h2>
          <p className="text-slate-500 mt-1">Bitfocus Clarity → Custom CSV</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="hud">
            <SelectTrigger className="w-56 bg-white">
              <SelectValue placeholder="Source Profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hud">Source Profile: HUD CoC Default</SelectItem>
              <SelectItem value="custom">Source Profile: Custom</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="payer-x">
            <SelectTrigger className="w-56 bg-white">
              <SelectValue placeholder="Target Profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="payer-x">Target Profile: Payer X CSV Request</SelectItem>
              <SelectItem value="payer-y">Target Profile: Payer Y Format</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Three Column Mapping Interface */}
      <div className="grid grid-cols-3 gap-6">
        {/* Source Schema */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-sm font-semibold text-slate-700">Source: Bitfocus Clarity (JSON)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {sourceFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-grab hover:border-sky-300 hover:bg-sky-50 transition-colors"
              >
                <div className="p-1.5 bg-slate-200 rounded">
                  <field.icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-sm text-slate-900">{field.label}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {field.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transformation Logic */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="bg-slate-800 border-b border-slate-700">
            <CardTitle className="text-sm font-semibold text-slate-200">Transformation Logic</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {mappings.map((mapping, index) => (
              <div key={index} className="relative p-3 bg-slate-800 border border-slate-700 rounded-lg">
                {/* Animated connector line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-6 h-0.5 bg-gradient-to-r from-sky-500/0 to-sky-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sky-400 animate-pulse"></div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500/0">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-transparent animate-pulse"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1 bg-sky-500/20 rounded">
                    <mapping.icon className="h-3 w-3 text-sky-400" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">{mapping.rule}</span>
                </div>
                <div className="mt-2 text-xs font-mono text-slate-400">
                  {mapping.source === "enrollment_service_code" ? (
                    <span>'H-NAV' → 'H0040'</span>
                  ) : mapping.source === "date_of_birth" ? (
                    <span>YYYY-MM-DD → YYYYMMDD</span>
                  ) : (
                    <span>
                      {mapping.source} → {mapping.dest}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Destination Schema */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-sm font-semibold text-slate-700">Target: Customer CSV Output</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {destFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <div className="p-1.5 bg-emerald-200 rounded">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-sm text-slate-900">{field.label}</span>
                  <span className="text-xs text-slate-500 ml-2">({field.column})</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action & Preview Panel */}
      <Card className="bg-white border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle className="text-sm font-semibold text-slate-700">Output Preview</CardTitle>
          <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700">
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration & Generate Sample CSV
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400 mb-2"># CSV Preview (last 2 test records)</div>
            <div className="text-emerald-400">PatientID,PatientName_First,DOB_YYYYMMDD,CPT_Code</div>
            <div className="text-slate-300">998877,JOHN,19800101,H0040</div>
            <div className="text-slate-300">998878,JANE,19920515,T1016</div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Preview based on last 2 test records.</p>
        </CardContent>
      </Card>
    </div>
  )
}

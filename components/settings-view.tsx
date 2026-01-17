"use client"

import { Save, Eye, EyeOff, TestTube } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SettingsView() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSftpPassword, setShowSftpPassword] = useState(false)

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500">Configure integration endpoints and credentials</p>
      </div>

      {/* API Configuration */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Bitfocus Clarity API</CardTitle>
          <CardDescription>Configure your Clarity HMIS instance connection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clarity-url">Instance URL</Label>
            <Input
              id="clarity-url"
              placeholder="https://your-instance.clarityhs.com"
              defaultValue="https://demo.clarityhs.com"
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Clarity API key"
                defaultValue="clr_live_xxxxxxxxxxxx"
                className="bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <TestTube className="h-4 w-4" />
            Test Connection
          </Button>
        </CardContent>
      </Card>

      {/* SFTP Configuration */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Clearinghouse SFTP</CardTitle>
          <CardDescription>Configure SFTP credentials for EDI file transfer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sftp-host">SFTP Host</Label>
              <Input
                id="sftp-host"
                placeholder="sftp.clearinghouse.com"
                defaultValue="sftp.availity.com"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sftp-port">Port</Label>
              <Input id="sftp-port" placeholder="22" defaultValue="22" className="bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sftp-user">Username</Label>
            <Input id="sftp-user" placeholder="SFTP username" defaultValue="qconnect_user" className="bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sftp-password">Password</Label>
            <div className="relative">
              <Input
                id="sftp-password"
                type={showSftpPassword ? "text" : "password"}
                placeholder="SFTP password"
                defaultValue="••••••••••••"
                className="bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSftpPassword(!showSftpPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showSftpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <TestTube className="h-4 w-4" />
            Test Connection
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

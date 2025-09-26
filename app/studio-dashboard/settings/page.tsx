"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Bell, CreditCard, Shield, Download, Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function StudioSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    analytics: true,
    comments: true,
    uploads: true,
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div {...fadeInUp}>
          <h1 className="text-3xl font-bold">Studio Settings</h1>
          <p className="text-muted-foreground">Manage your studio preferences and account settings</p>
        </motion.div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Standard Time</SelectItem>
                          <SelectItem value="est">Eastern Standard Time</SelectItem>
                          <SelectItem value="cst">Central Standard Time</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save drafts</Label>
                        <p className="text-sm text-muted-foreground">Automatically save your work as you edit</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>High quality uploads</Label>
                        <p className="text-sm text-muted-foreground">Upload videos in the highest quality available</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default video quality</Label>
                    <Select defaultValue="4k">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4k">4K Ultra HD</SelectItem>
                        <SelectItem value="1080p">1080p HD</SelectItem>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="480p">480p SD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Content visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="unlisted">Unlisted</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Content Notifications</h4>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New comments</Label>
                        <p className="text-sm text-muted-foreground">When someone comments on your content</p>
                      </div>
                      <Switch
                        checked={notifications.comments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Upload processing</Label>
                        <p className="text-sm text-muted-foreground">When your uploads finish processing</p>
                      </div>
                      <Switch
                        checked={notifications.uploads}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, uploads: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics reports</Label>
                        <p className="text-sm text-muted-foreground">Weekly analytics summaries</p>
                      </div>
                      <Switch
                        checked={notifications.analytics}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, analytics: checked })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Marketing</h4>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Studio Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited uploads, advanced analytics, priority support
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$49.99</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span>Next billing date:</span>
                    <span>January 15, 2024</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 15, 2023", amount: "$49.99", status: "Paid" },
                      { date: "Nov 15, 2023", amount: "$49.99", status: "Paid" },
                      { date: "Oct 15, 2023", amount: "$49.99", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">Studio Pro Plan</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" disabled>
                    Configure 2FA
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        device: "MacBook Pro",
                        location: "Los Angeles, CA",
                        lastActive: "Active now",
                        current: true,
                      },
                      {
                        device: "iPhone 14",
                        location: "Los Angeles, CA",
                        lastActive: "2 hours ago",
                        current: false,
                      },
                      {
                        device: "Chrome Browser",
                        location: "New York, NY",
                        lastActive: "1 day ago",
                        current: false,
                      },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Export Your Data</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Download a copy of your studio data including videos, analytics, and account information.
                      </p>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Request Data Export
                      </Button>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Data Retention</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure how long we keep your data after account deletion.
                      </p>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Delete Studio Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your studio account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

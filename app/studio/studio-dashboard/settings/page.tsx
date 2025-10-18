"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Bell,
  CreditCard,
  Shield,
  Download,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Code,
  DollarSign,
  HardDrive,
  Lock,
  Copy,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function StudioSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    analytics: true,
    comments: true,
    uploads: true,
    revenue: true,
    milestones: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showRevenue: false,
    showSubscribers: true,
    allowComments: true,
    allowMessages: true,
  })

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div {...fadeInUp}>
          <h1 className="text-2xl sm:text-3xl font-bold">Studio Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your studio preferences and account settings
          </p>
        </motion.div>

        <Tabs defaultValue="general" className="space-y-4 sm:space-y-6">
          <TabsList className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 h-auto">
            <TabsTrigger value="general" className="text-xs sm:text-sm">
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-xs sm:text-sm">
              Billing
            </TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs sm:text-sm">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">
              Security
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs sm:text-sm">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm">
              API
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs sm:text-sm">
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Standard Time</SelectItem>
                          <SelectItem value="est">Eastern Standard Time</SelectItem>
                          <SelectItem value="cst">Central Standard Time</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Auto-save drafts</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Automatically save your work as you edit
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">High quality uploads</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Upload videos in the highest quality available
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Dark mode</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Reduced motion</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Minimize animations for better performance
                        </p>
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
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <HardDrive className="h-4 w-4 sm:h-5 sm:w-5" />
                    Storage Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used Storage</span>
                      <span className="font-medium">245 GB / 500 GB</span>
                    </div>
                    <Progress value={49} className="h-2" />
                  </div>
                  <Separator />
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Videos</span>
                      <span className="font-medium">198 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thumbnails</span>
                      <span className="font-medium">12 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtitles & Captions</span>
                      <span className="font-medium">2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Other Files</span>
                      <span className="font-medium">33 GB</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Upgrade Storage
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Content Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Default video quality</Label>
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
                    <Label className="text-sm">Default content visibility</Label>
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
                  <div className="space-y-2">
                    <Label className="text-sm">Content moderation</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Automatic</SelectItem>
                        <SelectItem value="manual">Manual Review</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Email notifications</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Push notifications</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">SMS notifications</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Receive important updates via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Content Notifications</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">New comments</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          When someone comments on your content
                        </p>
                      </div>
                      <Switch
                        checked={notifications.comments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Upload processing</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">When your uploads finish processing</p>
                      </div>
                      <Switch
                        checked={notifications.uploads}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, uploads: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Analytics reports</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Weekly analytics summaries</p>
                      </div>
                      <Switch
                        checked={notifications.analytics}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, analytics: checked })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Revenue & Payments</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Revenue updates</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          When you receive payments or reach milestones
                        </p>
                      </div>
                      <Switch
                        checked={notifications.revenue}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, revenue: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Milestone achievements</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          When you reach subscriber or view milestones
                        </p>
                      </div>
                      <Switch
                        checked={notifications.milestones}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, milestones: checked })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Marketing</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Marketing emails</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Product updates and promotional content
                        </p>
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

          <TabsContent value="billing" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">•••• •••• •••• 4242</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Primary
                    </Badge>
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
                  <CardTitle className="text-lg sm:text-xl">Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">Studio Pro Plan</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Unlimited uploads, advanced analytics, priority support
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xl sm:text-2xl font-bold">$49.99</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Next billing date:</span>
                    <span className="font-medium">January 15, 2024</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
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
                  <CardTitle className="text-lg sm:text-xl">Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 15, 2023", amount: "$49.99", status: "Paid" },
                      { date: "Nov 15, 2023", amount: "$49.99", status: "Paid" },
                      { date: "Oct 15, 2023", amount: "$49.99", status: "Paid" },
                    ].map((invoice, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{invoice.date}</p>
                          <p className="text-xs text-muted-foreground">Studio Pro Plan</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <p className="font-medium text-sm">{invoice.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Invoices
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                    Revenue & Payouts
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Manage your earnings and payout preferences (75% creator / 25% platform)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-muted-foreground">Total Earnings</p>
                          <p className="text-xl sm:text-2xl font-bold">$12,458.50</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
                          <p className="text-xl sm:text-2xl font-bold">$2,340.00</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl sm:text-2xl font-bold">$890.25</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Payout Method</h4>
                    <div className="space-y-2">
                      <Label className="text-sm">Payment Method</Label>
                      <Select defaultValue="bank">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Payout Schedule</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Minimum Payout Amount</Label>
                      <Select defaultValue="100">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">$50</SelectItem>
                          <SelectItem value="100">$100</SelectItem>
                          <SelectItem value="250">$250</SelectItem>
                          <SelectItem value="500">$500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Bank Account Details</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Account Holder Name</Label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Bank Name</Label>
                        <Input placeholder="Chase Bank" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Account Number</Label>
                        <Input placeholder="••••••1234" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Routing Number</Label>
                        <Input placeholder="••••••5678" type="password" />
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto">Save Bank Details</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Tax Information</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Tax ID / EIN</Label>
                        <Input placeholder="XX-XXXXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Tax Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tax Forms
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Recent Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 1, 2023", amount: "$2,150.00", status: "Completed", method: "Bank Transfer" },
                      { date: "Nov 1, 2023", amount: "$1,980.50", status: "Completed", method: "Bank Transfer" },
                      { date: "Oct 1, 2023", amount: "$2,340.00", status: "Completed", method: "Bank Transfer" },
                    ].map((payout, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{payout.date}</p>
                          <p className="text-xs text-muted-foreground">{payout.method}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <p className="font-medium text-sm">{payout.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {payout.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Current Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="pr-10"
                        />
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
                      <Label className="text-sm">New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Confirm New Password</Label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="w-full sm:w-auto">Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm">Enable 2FA</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" disabled className="w-full sm:w-auto bg-transparent">
                    Configure 2FA
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Active Sessions</CardTitle>
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
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-sm">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
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

          <TabsContent value="privacy" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Profile Visibility</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Public profile</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Make your studio profile visible to everyone
                        </p>
                      </div>
                      <Switch
                        checked={privacy.profilePublic}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Show subscriber count</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Display your subscriber count publicly
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showSubscribers}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showSubscribers: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Show revenue stats</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Display your earnings publicly (not recommended)
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showRevenue}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showRevenue: checked })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Interaction Settings</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Allow comments</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Let viewers comment on your content</p>
                      </div>
                      <Switch
                        checked={privacy.allowComments}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowComments: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label className="text-sm">Allow direct messages</Label>
                        <p className="text-xs sm:text-sm text-muted-foreground">Let viewers send you direct messages</p>
                      </div>
                      <Switch
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Data Sharing</h4>
                    <div className="space-y-2">
                      <Label className="text-sm">Who can see your watch history</Label>
                      <Select defaultValue="private">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Everyone</SelectItem>
                          <SelectItem value="followers">Followers only</SelectItem>
                          <SelectItem value="private">Only me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Who can see your playlists</Label>
                      <Select defaultValue="public">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Everyone</SelectItem>
                          <SelectItem value="followers">Followers only</SelectItem>
                          <SelectItem value="private">Only me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                    API & Developer Settings
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Manage API keys and webhooks for integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm sm:text-base">API Keys</h4>
                      <Button size="sm">Generate New Key</Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Production API Key", key: "sk_live_51H...", created: "Dec 1, 2023" },
                        { name: "Development API Key", key: "sk_test_51H...", created: "Nov 15, 2023" },
                      ].map((apiKey, index) => (
                        <div key={index} className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm">{apiKey.name}</p>
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-xs bg-muted p-2 rounded overflow-x-auto">{apiKey.key}</code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                            >
                              {copiedKey === apiKey.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Created: {apiKey.created}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm sm:text-base">Webhooks</h4>
                      <Button size="sm">Add Webhook</Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          url: "https://api.example.com/webhooks/upload",
                          events: ["video.uploaded", "video.processed"],
                        },
                        {
                          url: "https://api.example.com/webhooks/analytics",
                          events: ["analytics.daily"],
                        },
                      ].map((webhook, index) => (
                        <div key={index} className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <code className="text-xs bg-muted p-1 px-2 rounded overflow-x-auto flex-1">
                              {webhook.url}
                            </code>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">API Documentation</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Access our comprehensive API documentation to integrate StreamFlix into your applications.
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                      View API Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 sm:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Export Your Data</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                        Download a copy of your studio data including videos, analytics, and account information.
                      </p>
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Request Data Export
                      </Button>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Data Retention</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                        Configure how long we keep your data after account deletion.
                      </p>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-full sm:w-48">
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
                  <CardTitle className="flex items-center gap-2 text-destructive text-lg sm:text-xl">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Delete Studio Account</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Permanently delete your studio account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="gap-2 w-full sm:w-auto">
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

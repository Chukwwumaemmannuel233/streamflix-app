"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  DollarSign,
  Play,
  Heart,
  MessageCircle,
  Share,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Mock data
const viewsData = [
  { name: "Jan", views: 45000, revenue: 2400 },
  { name: "Feb", views: 52000, revenue: 2800 },
  { name: "Mar", views: 48000, revenue: 2600 },
  { name: "Apr", views: 61000, revenue: 3200 },
  { name: "May", views: 55000, revenue: 2900 },
  { name: "Jun", views: 67000, revenue: 3500 },
  { name: "Jul", views: 72000, revenue: 3800 },
]

const audienceData = [
  { name: "18-24", value: 25, color: "#dc2626" },
  { name: "25-34", value: 35, color: "#ea580c" },
  { name: "35-44", value: 20, color: "#ca8a04" },
  { name: "45-54", value: 15, color: "#16a34a" },
  { name: "55+", value: 5, color: "#2563eb" },
]

const topVideos = [
  {
    title: "Epic Adventure Series - Episode 1",
    views: 1200000,
    likes: 45000,
    comments: 2300,
    duration: "45:32",
    revenue: "$2,400",
  },
  {
    title: "Behind the Scenes: Making Magic",
    views: 890000,
    likes: 32000,
    comments: 1800,
    duration: "28:15",
    revenue: "$1,800",
  },
  {
    title: "Character Development Deep Dive",
    views: 650000,
    likes: 28000,
    comments: 1200,
    duration: "35:20",
    revenue: "$1,300",
  },
  {
    title: "Visual Effects Breakdown",
    views: 520000,
    likes: 22000,
    comments: 950,
    duration: "22:45",
    revenue: "$1,100",
  },
]

const revenueData = [
  { name: "Jan", subscriptions: 15000, ads: 8000, merchandise: 2000 },
  { name: "Feb", subscriptions: 16000, ads: 9000, merchandise: 2500 },
  { name: "Mar", subscriptions: 15500, ads: 8500, merchandise: 2200 },
  { name: "Apr", subscriptions: 18000, ads: 10000, merchandise: 3000 },
  { name: "May", subscriptions: 17000, ads: 9500, merchandise: 2800 },
  { name: "Jun", subscriptions: 19000, ads: 11000, merchandise: 3200 },
  { name: "Jul", subscriptions: 20000, ads: 12000, merchandise: 3500 },
]

export default function StudioAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Views",
      value: "12.5M",
      change: "+15.2%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Subscribers",
      value: "2.8M",
      change: "+8.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Watch Time",
      value: "450K hrs",
      change: "+12.8%",
      trend: "up",
      icon: Clock,
    },
    {
      title: "Revenue",
      value: "$125,400",
      change: "+22.5%",
      trend: "up",
      icon: DollarSign,
    },
  ]

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" {...fadeInUp}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Track your studio's performance and growth</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm">
              Content
            </TabsTrigger>
            <TabsTrigger value="audience" className="text-xs sm:text-sm">
              Audience
            </TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs sm:text-sm">
              Revenue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Key Metrics */}
            <motion.div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" {...fadeInUp}>
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-600 flex-shrink-0" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600 flex-shrink-0" />
                          )}
                          <span
                            className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Views Chart */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Views Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <AreaChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#dc2626" fill="#dc2626" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      {
                        action: "New video published",
                        title: "Epic Adventure Series - Episode 5",
                        time: "2 hours ago",
                        metric: "1.2K views",
                      },
                      {
                        action: "Milestone reached",
                        title: "2.8M subscribers",
                        time: "1 day ago",
                        metric: "+50K new",
                      },
                      {
                        action: "Video trending",
                        title: "Behind the Scenes: Making Magic",
                        time: "2 days ago",
                        metric: "#3 trending",
                      },
                      {
                        action: "Revenue milestone",
                        title: "Monthly revenue goal achieved",
                        time: "3 days ago",
                        metric: "$125K",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">{activity.action}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="self-start sm:self-center">
                          {activity.metric}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 sm:space-y-6">
            {/* Top Performing Videos */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {topVideos.map((video, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                      >
                        <div className="w-full sm:w-20 h-16 sm:h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                          <Play className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <h4 className="font-medium text-sm sm:text-base">{video.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3 flex-shrink-0" />
                              {video.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3 flex-shrink-0" />
                              {video.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3 flex-shrink-0" />
                              {video.comments.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              {video.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right">
                          <p className="font-medium text-green-600 text-sm sm:text-base">{video.revenue}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Performance Chart */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Content Performance Trends</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4 sm:space-y-6">
            {/* Audience Demographics */}
            <motion.div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2" {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Age Demographics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        className="sm:outerRadius-80"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { country: "United States", percentage: 45, flag: "🇺🇸" },
                      { country: "United Kingdom", percentage: 18, flag: "🇬🇧" },
                      { country: "Canada", percentage: 12, flag: "🇨🇦" },
                      { country: "Australia", percentage: 8, flag: "🇦🇺" },
                      { country: "Germany", percentage: 7, flag: "🇩🇪" },
                      { country: "Others", percentage: 10, flag: "🌍" },
                    ].map((country, index) => (
                      <div key={index} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-base sm:text-lg flex-shrink-0">{country.flag}</span>
                          <span className="font-medium text-sm sm:text-base truncate">{country.country}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-16 sm:w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-red-600" style={{ width: `${country.percentage}%` }} />
                          </div>
                          <span className="text-xs sm:text-sm font-medium w-8 text-right">{country.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Engagement Metrics */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <Heart className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-red-500" />
                      <p className="text-xl sm:text-2xl font-bold">4.2M</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Likes</p>
                      <p className="text-xs text-green-600">+12.5% this month</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-xl sm:text-2xl font-bold">186K</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Comments</p>
                      <p className="text-xs text-green-600">+8.3% this month</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Share className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-xl sm:text-2xl font-bold">92K</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Shares</p>
                      <p className="text-xs text-green-600">+15.7% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4 sm:space-y-6">
            {/* Revenue Overview */}
            <motion.div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" {...fadeInUp}>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-xl sm:text-2xl font-bold">$125,400</p>
                      <p className="text-xs text-green-600">+22.5% from last month</p>
                    </div>
                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0 ml-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Revenue per View</p>
                      <p className="text-xl sm:text-2xl font-bold">$0.012</p>
                      <p className="text-xs text-green-600">+5.2% from last month</p>
                    </div>
                    <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0 ml-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Projected Monthly</p>
                      <p className="text-xl sm:text-2xl font-bold">$142,000</p>
                      <p className="text-xs text-green-600">Based on current trends</p>
                    </div>
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue Breakdown Chart */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="subscriptions" stackId="a" fill="#dc2626" />
                      <Bar dataKey="ads" stackId="a" fill="#ea580c" />
                      <Bar dataKey="merchandise" stackId="a" fill="#ca8a04" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Subscriptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-600 rounded flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-600 rounded flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Merchandise</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue Sources */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    {[
                      { source: "Subscription Revenue", amount: "$78,500", percentage: 62.6, color: "bg-red-600" },
                      { source: "Advertisement Revenue", amount: "$32,400", percentage: 25.8, color: "bg-orange-600" },
                      { source: "Merchandise Sales", amount: "$14,500", percentage: 11.6, color: "bg-yellow-600" },
                    ].map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-sm sm:text-base truncate">{source.source}</span>
                          <span className="font-bold text-sm sm:text-base flex-shrink-0">{source.amount}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm text-muted-foreground">{source.percentage}%</span>
                        </div>
                      </div>
                    ))}
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

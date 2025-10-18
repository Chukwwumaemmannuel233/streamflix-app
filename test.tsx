"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Play,
  Eye,
  DollarSign,
  Users,
  Video,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Settings,
  User,
} from "lucide-react"

export default function StudioDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const studioData = {
    name: "Creative Studios",
    plan: "Studio Pro",
    revenue: "$2,450",
    videos: 24,
    views: "125.4K",
    subscribers: "3.2K",
    uploadLimit: 100,
    uploadsUsed: 24,
  }

  const recentVideos = [
    { id: 1, title: "Amazing Nature Documentary", views: "12.5K", revenue: "$125", status: "Published" },
    { id: 2, title: "Tech Review: Latest Gadgets", views: "8.2K", revenue: "$82", status: "Published" },
    { id: 3, title: "Cooking Masterclass", views: "15.1K", revenue: "$151", status: "Published" },
    { id: 4, title: "Travel Vlog: Japan", views: "0", revenue: "$0", status: "Processing" },
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Studio Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {studioData.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{studioData.plan}</Badge>
          <Link href="/studio-dashboard/profile">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
          <Link href="/studio-dashboard/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">
            <Link href="/studio-dashboard/analytics">Analytics</Link>
          </TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studioData.revenue}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studioData.videos}</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studioData.views}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studioData.subscribers}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Limit</CardTitle>
              <CardDescription>
                You've used {studioData.uploadsUsed} of {studioData.uploadLimit} uploads this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(studioData.uploadsUsed / studioData.uploadLimit) * 100} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                {studioData.uploadLimit - studioData.uploadsUsed} uploads remaining
              </p>
            </CardContent>
          </Card>

          {/* Recent Videos */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Videos</CardTitle>
              <CardDescription>Your latest uploaded content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {video.views} views • {video.revenue} revenue
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={video.status === "Published" ? "default" : "secondary"}>{video.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Video</CardTitle>
              <CardDescription>Share your content with the world</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="video">Video File</Label>
                <Input id="video" type="file" accept="video/*" />
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter video title" />
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter video description" />
              </div>

              <div className="grid w-full max-w-sm gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </CardContent>
          </Card>

          {/* Content Library */}
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Manage your uploaded videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                        <Play className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">{video.views} views • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={video.status === "Published" ? "default" : "secondary"}>{video.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Detailed Analytics</h3>
            <p className="text-muted-foreground mb-4">
              View comprehensive analytics and insights about your content performance.
            </p>
            <Link href="/studio-dashboard/analytics">
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Full Analytics
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,450</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,187</div>
                <p className="text-sm text-muted-foreground">Previous period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$18,750</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Your earnings by video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.views} views</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{video.revenue}</div>
                      <div className="text-sm text-muted-foreground">75% share</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payout Information</CardTitle>
              <CardDescription>Next payout scheduled for end of month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Pending Balance:</span>
                  <span className="font-medium">$2,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue Share:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Payout:</span>
                  <span className="font-medium">Dec 31, 2024</span>
                </div>
                <Button className="w-full">Request Early Payout</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

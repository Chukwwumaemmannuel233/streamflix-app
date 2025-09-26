"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Clock,
  Heart,
  Download,
  TrendingUp,
  Star,
  Calendar,
  Filter,
  Search,
  Plus,
  X,
  CheckCircle,
  Trash2,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockVideos } from "@/lib/data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function UserDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock user data
  const userStats = {
    watchTime: "127 hours",
    videosWatched: 234,
    favoriteGenre: "Action",
    joinDate: "March 2023",
  }

  const continueWatching = mockVideos.slice(0, 4).map((video, index) => ({
    ...video,
    progress: [65, 23, 89, 12][index],
    timeLeft: ["15 min left", "42 min left", "3 min left", "1h 23m left"][index],
  }))

  const myList = mockVideos.slice(4, 8)
  const watchHistory = mockVideos.slice(0, 6)
  const recommendations = mockVideos.slice(2, 8)

  const downloadedContent = [
    {
      id: "1",
      title: "Epic Adventure Series - Episode 1",
      size: "1.2 GB",
      quality: "1080p",
      downloadDate: "2 days ago",
      expiresIn: "28 days",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Episode+1",
    },
    {
      id: "2",
      title: "Cosmic Odyssey",
      size: "2.8 GB",
      quality: "4K",
      downloadDate: "1 week ago",
      expiresIn: "21 days",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Cosmic+Odyssey",
    },
    {
      id: "3",
      title: "Digital Frontier",
      size: "1.8 GB",
      quality: "1080p",
      downloadDate: "3 days ago",
      expiresIn: "25 days",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Digital+Frontier",
    },
  ]

  const storageUsed = 5.8 // GB
  const storageLimit = 10 // GB

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div className="flex items-center justify-between" {...fadeInUp}>
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Continue watching where you left off</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="series">Series</SelectItem>
                <SelectItem value="documentaries">Docs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-list">My List</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* User Stats */}
            <motion.div className="grid gap-4 md:grid-cols-4" {...fadeInUp}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Watch Time</p>
                      <p className="text-2xl font-bold">{userStats.watchTime}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Videos Watched</p>
                      <p className="text-2xl font-bold">{userStats.videosWatched}</p>
                    </div>
                    <Play className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Favorite Genre</p>
                      <p className="text-2xl font-bold">{userStats.favoriteGenre}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p className="text-2xl font-bold">{userStats.joinDate}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continue Watching */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Continue Watching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {continueWatching.map((video, index) => (
                      <div key={video.id} className="space-y-3">
                        <div className="relative group cursor-pointer">
                          <img
                            src={video.thumbnail || "/placeholder.svg?height=120&width=200&text=Video"}
                            alt={video.title}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <Progress value={video.progress} className="h-1" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">{video.timeLeft}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Now */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {mockVideos.slice(0, 6).map((video, index) => (
                      <div key={video.id} className="space-y-2">
                        <div className="relative group cursor-pointer">
                          <img
                            src={video.thumbnail || "/placeholder.svg?height=150&width=100&text=Video"}
                            alt={video.title}
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="destructive" className="text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Play className="h-6 w-6 text-white fill-white" />
                          </div>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="my-list" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      My List ({myList.length} items)
                    </span>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {myList.map((video) => (
                      <div key={video.id} className="space-y-3">
                        <div className="relative group cursor-pointer">
                          <img
                            src={video.thumbnail || "/placeholder.svg?height=120&width=200&text=Video"}
                            alt={video.title}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="secondary">
                                <Play className="h-4 w-4 fill-current" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="h-4 w-4 fill-current text-red-500" />
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {video.year} • {video.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Watch History
                    </span>
                    <Button variant="outline" size="sm">
                      Clear All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {watchHistory.map((video, index) => (
                      <div key={video.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={video.thumbnail || "/placeholder.svg?height=80&width=120&text=Video"}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Watched{" "}
                            {
                              ["2 hours ago", "Yesterday", "3 days ago", "1 week ago", "2 weeks ago", "1 month ago"][
                                index
                              ]
                            }
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={[100, 45, 78, 23, 100, 67][index]} className="w-32 h-1" />
                            <span className="text-xs text-muted-foreground">{[100, 45, 78, 23, 100, 67][index]}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="for-you" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((video) => (
                      <div key={video.id} className="space-y-3">
                        <div className="relative group cursor-pointer">
                          <img
                            src={video.thumbnail || "/placeholder.svg?height=120&width=200&text=Video"}
                            alt={video.title}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="secondary">
                                <Play className="h-4 w-4 fill-current" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="text-xs">
                              {Math.floor(Math.random() * 5) + 1 * 20}% Match
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {video.year} • {video.rating} • {video.duration}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{video.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            {/* Storage Usage */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Storage Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {storageUsed} GB of {storageLimit} GB used
                      </span>
                      <span className="text-sm text-muted-foreground">{storageLimit - storageUsed} GB available</span>
                    </div>
                    <Progress value={(storageUsed / storageLimit) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Downloaded Content */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Downloaded Content ({downloadedContent.length} items)</span>
                    <Button variant="outline" size="sm">
                      Manage Downloads
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {downloadedContent.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{item.size}</span>
                            <span>•</span>
                            <span>{item.quality}</span>
                            <span>•</span>
                            <span>Downloaded {item.downloadDate}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Ready to watch</span>
                            <span className="text-xs text-muted-foreground">• Expires in {item.expiresIn}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Download Queue */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Download Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No downloads in queue</p>
                    <Button variant="outline">Browse Content to Download</Button>
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

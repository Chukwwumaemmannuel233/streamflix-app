"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Video,
  ImageIcon,
  DollarSign,
  Shield,
  Clock,
  Globe,
  Lock,
  Calendar,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  ArrowLeft,
  Copyright,
  Eye,
  BarChart3,
  AlertCircle,
  Film,
  Tv,
  Plus,
  Trash2,
} from "lucide-react"

export default function StudioUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [visibility, setVisibility] = useState("public")
  const [scheduledDate, setScheduledDate] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false)
  const [copyrightConfirmed, setCopyrightConfirmed] = useState(false)
  const [ageRating, setAgeRating] = useState("")
  const [monetizationEnabled, setMonetizationEnabled] = useState(true)
  const [analyticsOptIn, setAnalyticsOptIn] = useState(true)
  const [contentWarnings, setContentWarnings] = useState<string[]>([])
  const [licenseType, setLicenseType] = useState("standard")

  const [contentType, setContentType] = useState<"movie" | "series">("movie")
  const [releaseStatus, setReleaseStatus] = useState<"now" | "coming-soon">("now")
  const [releaseDate, setReleaseDate] = useState("")
  const [trailerFile, setTrailerFile] = useState<File | null>(null)

  const [seasonNumber, setSeasonNumber] = useState("1")
  const [episodeNumber, setEpisodeNumber] = useState("1")
  const [episodeTitle, setEpisodeTitle] = useState("")
  const [seriesTitle, setSeriesTitle] = useState("")
  const [totalSeasons, setTotalSeasons] = useState("1")
  const [episodesInSeason, setEpisodesInSeason] = useState("1")
  const [releaseSchedule, setReleaseSchedule] = useState<"all-at-once" | "weekly" | "custom">("all-at-once")
  const [episodes, setEpisodes] = useState<Array<{ number: number; title: string; file: File | null }>>([])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleTrailerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTrailerFile(e.target.files[0])
    }
  }

  const addEpisode = () => {
    setEpisodes([...episodes, { number: episodes.length + 1, title: "", file: null }])
  }

  const removeEpisode = (index: number) => {
    setEpisodes(episodes.filter((_, i) => i !== index))
  }

  const updateEpisode = (index: number, field: "title" | "file", value: string | File) => {
    const updated = [...episodes]
    if (field === "title") {
      updated[index].title = value as string
    } else {
      updated[index].file = value as File
    }
    setEpisodes(updated)
  }

  const handleUpload = () => {
    if (!selectedFile || !acceptedTerms || !acceptedGuidelines || !copyrightConfirmed || !ageRating) return

    if (releaseStatus === "coming-soon" && !releaseDate) return

    if (contentType === "series" && !seriesTitle) return

    setIsUploading(true)
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const toggleContentWarning = (warning: string) => {
    setContentWarnings((prev) => (prev.includes(warning) ? prev.filter((w) => w !== warning) : [...prev, warning]))
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/studio/studio-dashboard">
          <Button variant="ghost" size="sm" className="self-start">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Studio
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Share your movies and series with the StreamFlix community
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Main Upload Form */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Content Type</CardTitle>
              <CardDescription className="text-sm">
                Select whether you're uploading a movie or a TV series
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={contentType} onValueChange={(value) => setContentType(value as "movie" | "series")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      contentType === "movie" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                    onClick={() => setContentType("movie")}
                  >
                    <RadioGroupItem value="movie" id="movie" className="sr-only" />
                    <Label htmlFor="movie" className="cursor-pointer flex flex-col items-center gap-2">
                      <Film className="h-8 w-8" />
                      <span className="font-medium">Movie</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Single feature film or documentary
                      </span>
                    </Label>
                  </div>
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      contentType === "series" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                    onClick={() => setContentType("series")}
                  >
                    <RadioGroupItem value="series" id="series" className="sr-only" />
                    <Label htmlFor="series" className="cursor-pointer flex flex-col items-center gap-2">
                      <Tv className="h-8 w-8" />
                      <span className="font-medium">TV Series</span>
                      <span className="text-xs text-muted-foreground text-center">Episodic content with seasons</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calendar className="h-5 w-5" />
                Release Status
              </CardTitle>
              <CardDescription className="text-sm">
                Choose when your content will be available to viewers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={releaseStatus}
                onValueChange={(value) => setReleaseStatus(value as "now" | "coming-soon")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="release-now" />
                  <Label htmlFor="release-now" className="cursor-pointer text-sm">
                    Available Now - Content is ready to watch immediately
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coming-soon" id="coming-soon" />
                  <Label htmlFor="coming-soon" className="cursor-pointer text-sm">
                    Coming Soon - Build anticipation with a release date
                  </Label>
                </div>
              </RadioGroup>

              {releaseStatus === "coming-soon" && (
                <div className="space-y-4 pt-2">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Your content will be listed with a "Coming Soon" badge. Viewers can add it to their watchlist and
                      get notified when it's released.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="release-date">Release Date & Time *</Label>
                    <Input
                      type="datetime-local"
                      id="release-date"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Content will automatically become available at this date and time
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer">Trailer/Teaser (Optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      {trailerFile ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                          <p className="font-medium text-sm break-all">{trailerFile.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(trailerFile.size)}</p>
                          <Button variant="outline" size="sm" onClick={() => setTrailerFile(null)}>
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Video className="h-6 w-6 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Upload a trailer to promote your upcoming content
                          </p>
                          <Input
                            type="file"
                            accept="video/*"
                            onChange={handleTrailerSelect}
                            className="hidden"
                            id="trailer-upload"
                          />
                          <Label htmlFor="trailer-upload">
                            <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                              Select Trailer
                            </Button>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {contentType === "series" && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Tv className="h-5 w-5" />
                  Series Information
                </CardTitle>
                <CardDescription className="text-sm">Provide details about your TV series structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="series-title">Series Title *</Label>
                  <Input
                    id="series-title"
                    placeholder="e.g., Breaking Bad, Stranger Things"
                    value={seriesTitle}
                    onChange={(e) => setSeriesTitle(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The main title of your TV series (all episodes will be grouped under this)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="season-number">Season Number *</Label>
                    <Input
                      id="season-number"
                      type="number"
                      min="1"
                      value={seasonNumber}
                      onChange={(e) => setSeasonNumber(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-seasons">Total Seasons (Planned)</Label>
                    <Input
                      id="total-seasons"
                      type="number"
                      min="1"
                      value={totalSeasons}
                      onChange={(e) => setTotalSeasons(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="episode-number">Episode Number *</Label>
                    <Input
                      id="episode-number"
                      type="number"
                      min="1"
                      value={episodeNumber}
                      onChange={(e) => setEpisodeNumber(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="episodes-in-season">Episodes in Season</Label>
                    <Input
                      id="episodes-in-season"
                      type="number"
                      min="1"
                      value={episodesInSeason}
                      onChange={(e) => setEpisodesInSeason(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episode-title">Episode Title *</Label>
                  <Input
                    id="episode-title"
                    placeholder="e.g., Pilot, The Beginning"
                    value={episodeTitle}
                    onChange={(e) => setEpisodeTitle(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Individual episode title (e.g., S1E1: {episodeTitle || "Episode Title"})
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Release Schedule</Label>
                  <RadioGroup value={releaseSchedule} onValueChange={(value) => setReleaseSchedule(value as any)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all-at-once" id="all-at-once" />
                      <Label htmlFor="all-at-once" className="cursor-pointer text-sm">
                        All at Once - Release entire season immediately (binge-watch)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="cursor-pointer text-sm">
                        Weekly - Release one episode per week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="cursor-pointer text-sm">
                        Custom Schedule - Set individual release dates for each episode
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Batch Upload Episodes</Label>
                    <Button variant="outline" size="sm" onClick={addEpisode}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Episode
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload multiple episodes at once. Great for releasing entire seasons.
                  </p>

                  {episodes.length > 0 && (
                    <div className="space-y-2">
                      {episodes.map((episode, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                          <span className="text-sm font-medium min-w-[60px]">Ep {episode.number}</span>
                          <Input
                            placeholder="Episode title"
                            value={episode.title}
                            onChange={(e) => updateEpisode(index, "title", e.target.value)}
                            className="flex-1"
                            size={1}
                          />
                          <Input
                            type="file"
                            accept="video/*"
                            onChange={(e) => e.target.files && updateEpisode(index, "file", e.target.files[0])}
                            className="hidden"
                            id={`episode-${index}`}
                          />
                          <Label htmlFor={`episode-${index}`}>
                            <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                              {episode.file ? "✓" : "Select"}
                            </Button>
                          </Label>
                          <Button variant="ghost" size="sm" onClick={() => removeEpisode(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* File Upload */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Video className="h-5 w-5" />
                {contentType === "movie" ? "Movie File" : "Episode File"}
              </CardTitle>
              <CardDescription className="text-sm">
                {contentType === "movie"
                  ? "Upload your movie file. Supported formats: MP4, MOV, AVI, MKV (Max: 10GB)"
                  : "Upload the episode file. Use batch upload above for multiple episodes."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                } ${selectedFile ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-3 sm:space-y-4">
                    <CheckCircle className="h-8 sm:h-12 w-8 sm:w-12 text-green-500 mx-auto" />
                    <div>
                      <p className="font-medium text-sm sm:text-base break-all">{selectedFile.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • {selectedFile.type}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <Upload className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-base sm:text-lg font-medium">Drop your file here</p>
                      <p className="text-muted-foreground text-sm">or click to browse files</p>
                    </div>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="video-upload"
                    />
                    <Label htmlFor="video-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Select File
                      </Button>
                    </Label>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Details */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">
                {contentType === "movie" ? "Movie Details" : "Episode Details"}
              </CardTitle>
              <CardDescription className="text-sm">
                Provide information about your {contentType === "movie" ? "movie" : "episode"} content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{contentType === "movie" ? "Movie Title *" : "Episode Title *"}</Label>
                <Input
                  id="title"
                  placeholder={contentType === "movie" ? "Enter movie title" : "Enter episode title"}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">0/100 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  {contentType === "movie" ? "Movie Description" : "Episode Description"}
                </Label>
                <Textarea
                  id="description"
                  placeholder={
                    contentType === "movie" ? "Describe your movie content..." : "Describe your episode content..."
                  }
                  rows={4}
                  maxLength={5000}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">0/5000 characters</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="news">News & Politics</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Add tags separated by commas (e.g., tutorial, beginner, tips)" />
                <p className="text-xs text-muted-foreground">Help viewers discover your content with relevant tags</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <AlertCircle className="h-5 w-5" />
                Age Rating & Content Warnings
              </CardTitle>
              <CardDescription className="text-sm">
                Help viewers understand your content appropriateness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age-rating">Age Rating *</Label>
                <Select value={ageRating} onValueChange={setAgeRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">G - General Audiences</SelectItem>
                    <SelectItem value="pg">PG - Parental Guidance</SelectItem>
                    <SelectItem value="pg13">PG-13 - Parents Strongly Cautioned</SelectItem>
                    <SelectItem value="r">R - Restricted (17+)</SelectItem>
                    <SelectItem value="nc17">NC-17 - Adults Only (18+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Content Warnings (if applicable)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Violence", "Strong Language", "Sexual Content", "Drug Use", "Flashing Lights", "Loud Audio"].map(
                    (warning) => (
                      <div key={warning} className="flex items-center space-x-2">
                        <Checkbox
                          id={warning}
                          checked={contentWarnings.includes(warning)}
                          onCheckedChange={() => toggleContentWarning(warning)}
                        />
                        <Label htmlFor={warning} className="text-sm cursor-pointer">
                          {warning}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Copyright className="h-5 w-5" />
                Copyright & Licensing
              </CardTitle>
              <CardDescription className="text-sm">
                Confirm your content ownership and licensing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>License Type</Label>
                <RadioGroup value={licenseType} onValueChange={setLicenseType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="cursor-pointer text-sm">
                      Standard License - StreamFlix can promote and distribute
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exclusive" id="exclusive" />
                    <Label htmlFor="exclusive" className="cursor-pointer text-sm">
                      Exclusive License - StreamFlix exclusive distribution rights
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited" className="cursor-pointer text-sm">
                      Limited License - Restricted distribution rights
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="copyright"
                  checked={copyrightConfirmed}
                  onCheckedChange={(checked) => setCopyrightConfirmed(checked as boolean)}
                />
                <Label htmlFor="copyright" className="text-sm leading-relaxed cursor-pointer">
                  I confirm that I own all rights to this content or have proper authorization to upload it. I
                  understand that copyright infringement may result in account termination.
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BarChart3 className="h-5 w-5" />
                Monetization & Analytics
              </CardTitle>
              <CardDescription className="text-sm">Configure revenue and performance tracking settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Enable Monetization</Label>
                  <p className="text-xs text-muted-foreground">Earn 75% of revenue from ads and subscriptions</p>
                </div>
                <Checkbox
                  checked={monetizationEnabled}
                  onCheckedChange={(checked) => setMonetizationEnabled(checked as boolean)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Analytics Tracking</Label>
                  <p className="text-xs text-muted-foreground">Track views, engagement, and audience insights</p>
                </div>
                <Checkbox
                  checked={analyticsOptIn}
                  onCheckedChange={(checked) => setAnalyticsOptIn(checked as boolean)}
                />
              </div>

              {monetizationEnabled && (
                <Alert>
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Your content will be eligible for our 75%/25% revenue sharing program. Payments are processed
                    monthly for earnings over $100.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <ImageIcon className="h-5 w-5" />
                Thumbnail
              </CardTitle>
              <CardDescription className="text-sm">
                Upload a custom thumbnail or we'll generate one from your video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 text-center">
                <ImageIcon className="h-6 sm:h-8 w-6 sm:w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Recommended: 1280x720 pixels, JPG or PNG
                </p>
                <Input type="file" accept="image/*" className="hidden" id="thumbnail-upload" />
                <Label htmlFor="thumbnail-upload">
                  <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                    Upload Thumbnail
                  </Button>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Visibility & Publishing */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Visibility & Publishing</CardTitle>
              <CardDescription className="text-sm">Choose who can see your video and when to publish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Visibility</Label>
                <RadioGroup value={visibility} onValueChange={setVisibility}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Globe className="h-4 w-4" />
                      Public - Anyone can search for and view
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unlisted" id="unlisted" />
                    <Label htmlFor="unlisted" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Lock className="h-4 w-4" />
                      Unlisted - Only people with the link can view
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Shield className="h-4 w-4" />
                      Private - Only you can view
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Publishing</Label>
                <RadioGroup defaultValue="now">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Clock className="h-4 w-4" />
                      Publish immediately
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Calendar className="h-4 w-4" />
                      Schedule for later
                    </Label>
                  </div>
                </RadioGroup>

                <Input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Guidelines */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5" />
                Terms & Guidelines
              </CardTitle>
              <CardDescription className="text-sm">Please review and accept our terms before uploading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <Link href="/studio/terms" className="text-primary hover:underline">
                    Studio Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/studio/revenue-sharing" className="text-primary hover:underline">
                    Revenue Sharing Agreement
                  </Link>{" "}
                  (75% creator share)
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="guidelines"
                  checked={acceptedGuidelines}
                  onCheckedChange={(checked) => setAcceptedGuidelines(checked as boolean)}
                />
                <Label htmlFor="guidelines" className="text-sm leading-relaxed cursor-pointer">
                  My content complies with{" "}
                  <Link href="/studio/content-guidelines" className="text-primary hover:underline">
                    Content Guidelines
                  </Link>{" "}
                  and{" "}
                  <Link href="/studio/community-standards" className="text-primary hover:underline">
                    Community Standards
                  </Link>
                </Label>
              </div>

              {(!acceptedTerms ||
                !acceptedGuidelines ||
                !copyrightConfirmed ||
                !ageRating ||
                (releaseStatus === "coming-soon" && !releaseDate) ||
                (contentType === "series" && !seriesTitle)) && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Please complete all required fields: accept terms, confirm copyright, select age rating
                    {releaseStatus === "coming-soon" && ", set release date"}
                    {contentType === "series" && ", provide series title"}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Upload Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={handleUpload}
              disabled={
                !selectedFile ||
                !acceptedTerms ||
                !acceptedGuidelines ||
                !copyrightConfirmed ||
                !ageRating ||
                (releaseStatus === "coming-soon" && !releaseDate) ||
                (contentType === "series" && !seriesTitle) ||
                isUploading
              }
              className="flex-1"
              size="lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : contentType === "movie" ? "Upload Movie" : "Upload Episode"}
            </Button>
            <Button variant="outline" size="lg" className="sm:w-auto bg-transparent">
              Save Draft
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
          {releaseStatus === "coming-soon" && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Coming Soon Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Build anticipation before release</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Viewers can add to watchlist</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Automatic notifications on release</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Promote with trailer/teaser</span>
                </div>
              </CardContent>
            </Card>
          )}

          {contentType === "series" && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tv className="h-5 w-5" />
                  Series Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Upload episodes individually or in batches</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Choose weekly or binge-watch release</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Episodes auto-group under series title</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Revenue shared across all episodes</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Revenue Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5" />
                Revenue Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Your Share:</span>
                <Badge variant="default" className="bg-green-500">
                  75%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Platform Fee:</span>
                <Badge variant="secondary">25%</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Industry-leading creator revenue share</div>
              <Link href="/studio/revenue-sharing">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5" />
                Content Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <span>Automated review: ~5 minutes</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span>Manual review: 24-48 hours (if flagged)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Appeals process available</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Content is reviewed for compliance with our guidelines before going live.
              </p>
            </CardContent>
          </Card>

          {/* Upload Guidelines */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Quick Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Original content you own or have rights to</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>High-quality video and audio</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Appropriate age rating and warnings</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <span>No copyrighted music or content</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <span>No hate speech or harmful content</span>
              </div>
              <Link href="/studio/content-guidelines">
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  Full Guidelines
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">Our creator support team is here to help you succeed.</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Upload,
  Edit3,
  Save,
  X,
  CheckCircle,
  Star,
  Users,
  Eye,
  TrendingUp,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Palette,
  Shield,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function StudioProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [studioData, setStudioData] = useState({
    name: "Epic Studios",
    tagline: "Creating Epic Entertainment",
    description:
      "We are a leading production studio specializing in high-quality content for streaming platforms. Our team of creative professionals brings stories to life with cutting-edge technology and compelling narratives.",
    website: "https://epicstudios.com",
    email: "contact@epicstudios.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    founded: "2015",
    employees: "150-200",
    socialMedia: {
      instagram: "epicstudios",
      twitter: "epicstudios",
      youtube: "EpicStudiosOfficial",
      facebook: "EpicStudios",
    },
    branding: {
      primaryColor: "#dc2626",
      secondaryColor: "#1f2937",
      accentColor: "#f59e0b",
    },
    settings: {
      publicProfile: true,
      showStatistics: true,
      allowMessages: false,
    },
  })

  useEffect(() => {
    const savedData = localStorage.getItem("studioProfileData")
    if (savedData) {
      setStudioData(JSON.parse(savedData))
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)

    // Basic validation
    if (!studioData.name.trim()) {
      toast({
        title: "Error",
        description: "Studio name is required",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    if (!studioData.email.trim() || !studioData.email.includes("@")) {
      toast({
        title: "Error",
        description: "Valid email is required",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Save to localStorage
    localStorage.setItem("studioProfileData", JSON.stringify(studioData))

    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    }, 500)
  }

  const getSocialUrl = (platform: string, handle: string) => {
    const cleanHandle = handle.replace("@", "")
    const urls: Record<string, string> = {
      instagram: `https://instagram.com/${cleanHandle}`,
      twitter: `https://twitter.com/${cleanHandle}`,
      youtube: `https://youtube.com/@${cleanHandle}`,
      facebook: `https://facebook.com/${cleanHandle}`,
    }
    return urls[platform] || "#"
  }

  const stats = [
    { label: "Total Views", value: "125.4M", icon: Eye, change: "+12.5%" },
    { label: "Subscribers", value: "2.8M", icon: Users, change: "+8.2%" },
    { label: "Content Pieces", value: "156", icon: Star, change: "+15" },
    { label: "Revenue", value: "$1.2M", icon: TrendingUp, change: "+22.1%" },
  ]

  const achievements = [
    { title: "Verified Studio", icon: CheckCircle, color: "text-blue-500" },
    { title: "Top Creator 2023", icon: Star, color: "text-yellow-500" },
    { title: "1M+ Subscribers", icon: Users, color: "text-green-500" },
    { title: "Premium Partner", icon: Shield, color: "text-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" {...fadeInUp}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Studio Profile</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your studio information and branding</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="gap-2 w-full sm:w-auto"
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger value="branding" className="text-xs md:text-sm">
              Branding
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">
              Settings
            </TabsTrigger>
            <TabsTrigger value="verification" className="text-xs md:text-sm">
              Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 md:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-32 md:h-48 bg-gradient-to-r from-red-600 to-red-800 rounded-t-lg">
                    <div className="absolute inset-0 bg-black/20" />
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 text-xs md:text-sm"
                      >
                        <Camera className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        <span className="hidden sm:inline">Change Banner</span>
                        <span className="sm:hidden">Banner</span>
                      </Button>
                    )}
                  </div>
                  <div className="relative px-4 md:px-6 pb-4 md:pb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 md:gap-6 -mt-12 md:-mt-16">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border-4 border-background flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=120&width=120&text=ES"
                            alt="Studio Logo"
                            className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover"
                          />
                        </div>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute bottom-0 right-0 rounded-full w-7 h-7 md:w-8 md:h-8 p-0"
                          >
                            <Camera className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 pt-2 md:pt-4 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2">
                          {isEditing ? (
                            <Input
                              value={studioData.name}
                              onChange={(e) => setStudioData({ ...studioData, name: e.target.value })}
                              className="text-xl md:text-2xl font-bold"
                            />
                          ) : (
                            <h2 className="text-xl md:text-2xl font-bold">{studioData.name}</h2>
                          )}
                          <Badge variant="secondary" className="gap-1 w-fit">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        </div>
                        {isEditing ? (
                          <Input
                            value={studioData.tagline}
                            onChange={(e) => setStudioData({ ...studioData, tagline: e.target.value })}
                            placeholder="Studio tagline"
                            className="text-sm md:text-base"
                          />
                        ) : (
                          <p className="text-sm md:text-base text-muted-foreground">{studioData.tagline}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4" {...fadeInUp}>
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                      <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div className="grid gap-4 md:gap-6 lg:grid-cols-2" {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Studio Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={studioData.description}
                        onChange={(e) => setStudioData({ ...studioData, description: e.target.value })}
                        rows={4}
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{studioData.description}</p>
                    )}
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Founded</Label>
                      {isEditing ? (
                        <Input
                          value={studioData.founded}
                          onChange={(e) => setStudioData({ ...studioData, founded: e.target.value })}
                          className="text-sm"
                        />
                      ) : (
                        <p className="text-sm">{studioData.founded}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Employees</Label>
                      {isEditing ? (
                        <Input
                          value={studioData.employees}
                          onChange={(e) => setStudioData({ ...studioData, employees: e.target.value })}
                          className="text-sm"
                        />
                      ) : (
                        <p className="text-sm">{studioData.employees}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Website</Label>
                    {isEditing ? (
                      <Input
                        type="url"
                        value={studioData.website}
                        onChange={(e) => setStudioData({ ...studioData, website: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <a
                        href={studioData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {studioData.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={studioData.email}
                        onChange={(e) => setStudioData({ ...studioData, email: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <a href={`mailto:${studioData.email}`} className="text-sm hover:underline">
                        {studioData.email}
                      </a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={studioData.phone}
                        onChange={(e) => setStudioData({ ...studioData, phone: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <a href={`tel:${studioData.phone}`} className="text-sm hover:underline">
                        {studioData.phone}
                      </a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    {isEditing ? (
                      <Input
                        value={studioData.location}
                        onChange={(e) => setStudioData({ ...studioData, location: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {studioData.location}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { platform: "Instagram", icon: Instagram, key: "instagram", color: "text-pink-600" },
                      { platform: "Twitter", icon: Twitter, key: "twitter", color: "text-blue-400" },
                      { platform: "YouTube", icon: Youtube, key: "youtube", color: "text-red-600" },
                      { platform: "Facebook", icon: Facebook, key: "facebook", color: "text-blue-600" },
                    ].map((social) => (
                      <div key={social.key} className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm">
                          <social.icon className={`h-4 w-4 ${social.color}`} />
                          {social.platform}
                        </Label>
                        {isEditing ? (
                          <Input
                            value={studioData.socialMedia[social.key as keyof typeof studioData.socialMedia]}
                            onChange={(e) =>
                              setStudioData({
                                ...studioData,
                                socialMedia: {
                                  ...studioData.socialMedia,
                                  [social.key]: e.target.value,
                                },
                              })
                            }
                            placeholder={`@${social.platform.toLowerCase()}`}
                            className="text-sm"
                          />
                        ) : (
                          <a
                            href={getSocialUrl(
                              social.key,
                              studioData.socialMedia[social.key as keyof typeof studioData.socialMedia],
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline flex items-center gap-1"
                          >
                            @{studioData.socialMedia[social.key as keyof typeof studioData.socialMedia]}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <achievement.icon className={`h-5 w-5 md:h-6 md:w-6 ${achievement.color}`} />
                        <span className="font-medium text-sm md:text-base">{achievement.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {isEditing && (
              <motion.div className="flex flex-col sm:flex-row justify-end gap-3" {...fadeInUp}>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2 w-full sm:w-auto">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="branding" className="space-y-4 md:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Palette className="h-5 w-5" />
                    Brand Colors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:gap-6 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={studioData.branding.primaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, primaryColor: e.target.value },
                            })
                          }
                          className="w-12 h-12 rounded-lg border cursor-pointer"
                        />
                        <Input
                          value={studioData.branding.primaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, primaryColor: e.target.value },
                            })
                          }
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Secondary Color</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={studioData.branding.secondaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, secondaryColor: e.target.value },
                            })
                          }
                          className="w-12 h-12 rounded-lg border cursor-pointer"
                        />
                        <Input
                          value={studioData.branding.secondaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, secondaryColor: e.target.value },
                            })
                          }
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Accent Color</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={studioData.branding.accentColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, accentColor: e.target.value },
                            })
                          }
                          className="w-12 h-12 rounded-lg border cursor-pointer"
                        />
                        <Input
                          value={studioData.branding.accentColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, accentColor: e.target.value },
                            })
                          }
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Brand Colors
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Brand Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Logo (Light)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 md:p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs md:text-sm text-muted-foreground">Upload light logo</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Logo (Dark)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 md:p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs md:text-sm text-muted-foreground">Upload dark logo</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 md:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm md:text-base">Public Profile</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Make your studio profile visible to viewers
                      </p>
                    </div>
                    <Switch
                      checked={studioData.settings.publicProfile}
                      onCheckedChange={(checked) =>
                        setStudioData({
                          ...studioData,
                          settings: { ...studioData.settings, publicProfile: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm md:text-base">Show Statistics</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Display view counts and subscriber numbers
                      </p>
                    </div>
                    <Switch
                      checked={studioData.settings.showStatistics}
                      onCheckedChange={(checked) =>
                        setStudioData({
                          ...studioData,
                          settings: { ...studioData.settings, showStatistics: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm md:text-base">Allow Messages</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">Let viewers send direct messages</p>
                    </div>
                    <Switch
                      checked={studioData.settings.allowMessages}
                      onCheckedChange={(checked) =>
                        setStudioData({
                          ...studioData,
                          settings: { ...studioData.settings, allowMessages: checked },
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full sm:w-auto mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-4 md:space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm md:text-base">Verified Studio</p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Your studio has been verified and approved
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm md:text-base">Verification Benefits:</h4>
                    <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Blue checkmark on your profile
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Higher visibility in search results
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Access to premium features
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Priority customer support
                      </li>
                    </ul>
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

"use client"

import { useState } from "react"
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function StudioProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
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
      instagram: "@epicstudios",
      twitter: "@epicstudios",
      youtube: "EpicStudiosOfficial",
      facebook: "EpicStudios",
    },
    branding: {
      primaryColor: "#dc2626",
      secondaryColor: "#1f2937",
      accentColor: "#f59e0b",
    },
  })

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div className="flex items-center justify-between" {...fadeInUp}>
          <div>
            <h1 className="text-3xl font-bold">Studio Profile</h1>
            <p className="text-muted-foreground">Manage your studio information and branding</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="gap-2"
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Studio Banner & Logo */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800 rounded-t-lg">
                    <div className="absolute inset-0 bg-black/20" />
                    {isEditing && (
                      <Button size="sm" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Banner
                      </Button>
                    )}
                  </div>
                  <div className="relative px-6 pb-6">
                    <div className="flex items-end gap-6 -mt-16">
                      <div className="relative">
                        <div className="w-32 h-32 bg-white rounded-full border-4 border-background flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=120&width=120&text=ES"
                            alt="Studio Logo"
                            className="w-28 h-28 rounded-full object-cover"
                          />
                        </div>
                        {isEditing && (
                          <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          {isEditing ? (
                            <Input
                              value={studioData.name}
                              onChange={(e) => setStudioData({ ...studioData, name: e.target.value })}
                              className="text-2xl font-bold bg-transparent border-0 p-0 h-auto"
                            />
                          ) : (
                            <h2 className="text-2xl font-bold">{studioData.name}</h2>
                          )}
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        </div>
                        {isEditing ? (
                          <Input
                            value={studioData.tagline}
                            onChange={(e) => setStudioData({ ...studioData, tagline: e.target.value })}
                            className="text-muted-foreground bg-transparent border-0 p-0 h-auto"
                            placeholder="Studio tagline"
                          />
                        ) : (
                          <p className="text-muted-foreground">{studioData.tagline}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid gap-4 md:grid-cols-4" {...fadeInUp}>
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                      <stat.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Studio Information */}
            <motion.div className="grid gap-6 md:grid-cols-2" {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Studio Information</CardTitle>
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
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Website</Label>
                    {isEditing ? (
                      <Input
                        value={studioData.website}
                        onChange={(e) => setStudioData({ ...studioData, website: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-blue-600">{studioData.website}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={studioData.email}
                        onChange={(e) => setStudioData({ ...studioData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm">{studioData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        value={studioData.phone}
                        onChange={(e) => setStudioData({ ...studioData, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm">{studioData.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    {isEditing ? (
                      <Input
                        value={studioData.location}
                        onChange={(e) => setStudioData({ ...studioData, location: e.target.value })}
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

            {/* Social Media */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
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
                        <Label className="flex items-center gap-2">
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
                          />
                        ) : (
                          <p className="text-sm">
                            {studioData.socialMedia[social.key as keyof typeof studioData.socialMedia]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        <span className="font-medium">{achievement.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {isEditing && (
              <motion.div className="flex justify-end gap-3" {...fadeInUp}>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Brand Colors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border"
                          style={{ backgroundColor: studioData.branding.primaryColor }}
                        />
                        <Input
                          value={studioData.branding.primaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, primaryColor: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border"
                          style={{ backgroundColor: studioData.branding.secondaryColor }}
                        />
                        <Input
                          value={studioData.branding.secondaryColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, secondaryColor: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border"
                          style={{ backgroundColor: studioData.branding.accentColor }}
                        />
                        <Input
                          value={studioData.branding.accentColor}
                          onChange={(e) =>
                            setStudioData({
                              ...studioData,
                              branding: { ...studioData.branding, accentColor: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Brand Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Logo (Light)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload light logo</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Logo (Dark)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload dark logo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your studio profile visible to viewers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Statistics</Label>
                      <p className="text-sm text-muted-foreground">Display view counts and subscriber numbers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Messages</Label>
                      <p className="text-sm text-muted-foreground">Let viewers send direct messages</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium">Verified Studio</p>
                      <p className="text-sm text-muted-foreground">Your studio has been verified and approved</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Verification Benefits:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Blue checkmark on your profile
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Higher visibility in search results
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Access to premium features
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
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

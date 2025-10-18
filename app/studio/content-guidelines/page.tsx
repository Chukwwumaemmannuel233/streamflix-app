"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function ContentGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Studio Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Content Guidelines</h1>
          <p className="text-muted-foreground">
            Last Updated: <strong>January 1, 2024</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            These guidelines help creators understand what content is welcome on StreamFlix and ensure a positive
            experience for all users.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Content We Encourage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">Original Content</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Original films, series, and documentaries</li>
                    <li>Independent productions and short films</li>
                    <li>Educational and instructional content</li>
                    <li>Creative storytelling and artistic expression</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">High-Quality Production</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Professional audio and video quality</li>
                    <li>Clear storytelling and engaging content</li>
                    <li>Proper lighting and sound design</li>
                    <li>Thoughtful editing and post-production</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">Diverse Voices</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Underrepresented creators and stories</li>
                    <li>International and multicultural content</li>
                    <li>Accessibility features and inclusive design</li>
                    <li>Community-driven narratives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">Innovation</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Experimental formats and storytelling</li>
                    <li>Interactive and immersive experiences</li>
                    <li>New technology integration</li>
                    <li>Genre-blending and creative risks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Video Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Resolution:</span>
                      <Badge variant="secondary">1080p minimum, 4K preferred</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Frame Rate:</span>
                      <Badge variant="secondary">24fps, 30fps, or 60fps</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bitrate:</span>
                      <Badge variant="secondary">8-50 Mbps</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Format:</span>
                      <Badge variant="secondary">MP4, MOV, AVI</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Audio Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Sample Rate:</span>
                      <Badge variant="secondary">48kHz preferred</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bit Depth:</span>
                      <Badge variant="secondary">16-bit minimum</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Channels:</span>
                      <Badge variant="secondary">Stereo or 5.1 surround</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Format:</span>
                      <Badge variant="secondary">AAC, MP3, WAV</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Categories & Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Age Ratings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">G</Badge>
                      <span className="text-sm">General Audiences - All ages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">PG</Badge>
                      <span className="text-sm">
                        Parental Guidance - Some material may not be suitable for children
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">PG-13</Badge>
                      <span className="text-sm">Parents Strongly Cautioned - Inappropriate for children under 13</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">R</Badge>
                      <span className="text-sm">Restricted - Under 17 requires parent/guardian</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">NC-17</Badge>
                      <span className="text-sm">Adults Only - No one 17 and under admitted</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Content Categories</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary">Drama</Badge>
                    <Badge variant="secondary">Comedy</Badge>
                    <Badge variant="secondary">Action</Badge>
                    <Badge variant="secondary">Documentary</Badge>
                    <Badge variant="secondary">Horror</Badge>
                    <Badge variant="secondary">Sci-Fi</Badge>
                    <Badge variant="secondary">Romance</Badge>
                    <Badge variant="secondary">Thriller</Badge>
                    <Badge variant="secondary">Animation</Badge>
                    <Badge variant="secondary">Educational</Badge>
                    <Badge variant="secondary">Music</Badge>
                    <Badge variant="secondary">Sports</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Content Requiring Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Content with mature themes or adult situations</li>
                <li>Depictions of violence, even if fictional</li>
                <li>Content discussing sensitive social or political topics</li>
                <li>Material featuring real weapons or dangerous activities</li>
                <li>Content with strong language or suggestive themes</li>
                <li>Documentaries covering controversial subjects</li>
                <li>Content that may be culturally sensitive</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Content requiring review will be evaluated within 48-72 hours. We may request
                  additional context or modifications before approval.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Prohibited Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Illegal Content</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Copyrighted material without proper licensing</li>
                    <li>Content promoting illegal activities</li>
                    <li>Pirated or stolen content</li>
                    <li>Content violating privacy laws</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Harmful Content</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Content exploiting or endangering minors</li>
                    <li>Graphic violence or gore</li>
                    <li>Content promoting self-harm</li>
                    <li>Dangerous challenges or stunts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Hate & Harassment</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Hate speech or discriminatory content</li>
                    <li>Harassment or bullying</li>
                    <li>Content inciting violence</li>
                    <li>Doxxing or privacy violations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Spam & Deception</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Misleading or fraudulent content</li>
                    <li>Spam or repetitive content</li>
                    <li>Fake news or misinformation</li>
                    <li>Impersonation or identity theft</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata & Descriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Required Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Accurate title and description</li>
                    <li>Appropriate age rating and content warnings</li>
                    <li>Genre classification and tags</li>
                    <li>Cast and crew information</li>
                    <li>Production year and country</li>
                    <li>Language and subtitle information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Write compelling but accurate descriptions</li>
                    <li>Use relevant keywords for discoverability</li>
                    <li>Include content warnings for sensitive material</li>
                    <li>Provide context for artistic or educational content</li>
                    <li>Update information if content is modified</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Closed captions for all spoken content (required)</li>
                <li>Audio descriptions for visual content (recommended)</li>
                <li>High contrast and readable text overlays</li>
                <li>Clear audio without background interference</li>
                <li>Descriptive titles and metadata</li>
                <li>Support for screen readers and assistive technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Moderation Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-1">Upload</h4>
                  <p className="text-sm text-muted-foreground">Content uploaded to platform</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-1">Review</h4>
                  <p className="text-sm text-muted-foreground">Automated and manual review</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-1">Publish</h4>
                  <p className="text-sm text-muted-foreground">Approved content goes live</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Review Timeline:</strong> Most content is reviewed within 24 hours. Complex or sensitive
                  content may take up to 72 hours. You'll receive notifications about the status of your submissions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appeals & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If your content is rejected or removed, you can appeal the decision or request clarification:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Submit appeals through your studio dashboard</li>
                <li>Provide additional context or clarification</li>
                <li>Request specific feedback on policy violations</li>
                <li>Contact content review team directly</li>
              </ul>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-sm">
                  <strong>Content Support:</strong> <strong>content@streamflix.com</strong>
                </p>
                <p className="text-sm mt-1">
                  <strong>Appeals:</strong> <strong>appeals@streamflix.com</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} StreamFlix Studio. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/studio/terms" className="hover:text-foreground transition-colors">
                Studio Terms
              </Link>
              <Link href="/studio/privacy" className="hover:text-foreground transition-colors">
                Studio Privacy
              </Link>
              <Link href="/studio/content-guidelines" className="hover:text-foreground transition-colors">
                Content Guidelines
              </Link>
              <Link href="/studio/community-standards" className="hover:text-foreground transition-colors">
                Community Standards
              </Link>
              <Link href="/studio/revenue-sharing" className="hover:text-foreground transition-colors">
                Revenue Sharing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

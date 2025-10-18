"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function StudioTermsPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Studio Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective Date: <strong>January 1, 2024</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            These terms govern the relationship between StreamFlix and content creators, studios, and production
            companies.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Studio Account Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To create a Studio account on StreamFlix, you must meet the following requirements:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Be at least 18 years old or have legal capacity to enter contracts</li>
                <li>
                  Represent a legitimate content creation entity (individual creator, studio, or production company)
                </li>
                <li>Provide accurate business information and tax documentation</li>
                <li>Own or have legal rights to the content you plan to distribute</li>
                <li>Comply with all applicable laws in your jurisdiction</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Content Ownership & Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>You retain full ownership of your original content</li>
                <li>You must own or have proper licensing for all content uploaded</li>
                <li>You grant StreamFlix a non-exclusive license to distribute your content</li>
                <li>
                  You are responsible for obtaining all necessary rights, including music, images, and third-party
                  content
                </li>
                <li>You warrant that your content does not infringe on any third-party rights</li>
                <li>StreamFlix may remove content that violates intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Revenue Sharing Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-primary mb-2">Revenue Split: 75% Creator / 25% Platform</h4>
                <p className="text-sm">
                  StreamFlix operates on a creator-first model with industry-leading revenue sharing.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>Creators receive 75% of net revenue from their content</li>
                <li>StreamFlix retains 25% to cover platform operations, hosting, and services</li>
                <li>Revenue includes subscriptions, pay-per-view, advertising, and merchandise sales</li>
                <li>Payments are processed monthly with detailed analytics</li>
                <li>Minimum payout threshold is $50 USD or equivalent</li>
                <li>Tax responsibilities remain with the creator/studio</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Content Standards & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>All content must comply with StreamFlix Community Standards</li>
                <li>Content must be original or properly licensed</li>
                <li>No illegal, harmful, or discriminatory content</li>
                <li>Age-appropriate content ratings must be accurately assigned</li>
                <li>Content descriptions and metadata must be accurate</li>
                <li>StreamFlix reserves the right to review and moderate content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Platform Services & Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Access to StreamFlix Studio dashboard and analytics</li>
                <li>Content management and distribution tools</li>
                <li>Audience engagement and community features</li>
                <li>Marketing and promotional support</li>
                <li>Technical support and platform maintenance</li>
                <li>Payment processing and financial reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Content Distribution & Licensing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>You grant StreamFlix worldwide distribution rights for uploaded content</li>
                <li>License includes streaming, downloading (where permitted), and promotional use</li>
                <li>You may set geographic restrictions and availability windows</li>
                <li>StreamFlix may create promotional materials using your content</li>
                <li>You retain the right to distribute content on other platforms unless exclusive agreement exists</li>
                <li>Content removal requires 30-day notice except for policy violations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Studio Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide high-quality content that meets technical specifications</li>
                <li>Maintain accurate content metadata and descriptions</li>
                <li>Respond to viewer inquiries and support requests</li>
                <li>Keep account information and payment details current</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Report any copyright infringement or policy violations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Platform Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide reliable content hosting and streaming infrastructure</li>
                <li>Process payments accurately and on schedule</li>
                <li>Offer technical support and platform maintenance</li>
                <li>Protect creator content from unauthorized access</li>
                <li>Provide detailed analytics and performance metrics</li>
                <li>Maintain platform security and user data protection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Prohibited Content & Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Copyrighted content without proper licensing</li>
                <li>Illegal, harmful, or dangerous content</li>
                <li>Hate speech, harassment, or discriminatory content</li>
                <li>Sexually explicit content involving minors</li>
                <li>Content promoting violence or illegal activities</li>
                <li>Spam, misleading, or fraudulent content</li>
                <li>Attempts to circumvent platform security or policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Account Termination & Suspension</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Either party may terminate the agreement with 30-day notice</li>
                <li>Immediate termination for material breach of terms</li>
                <li>Suspended accounts may lose access to earnings and content</li>
                <li>Content removal procedures and appeal process available</li>
                <li>Final payments processed within 60 days of termination</li>
                <li>Data export available for 90 days after termination</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>StreamFlix liability limited to amounts paid to creator in preceding 12 months</li>
                <li>No liability for indirect, consequential, or punitive damages</li>
                <li>Platform provided "as is" without warranties</li>
                <li>Creators responsible for content-related legal issues</li>
                <li>Force majeure events excuse performance delays</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Good faith negotiation required before formal proceedings</li>
                <li>Binding arbitration for disputes over $10,000</li>
                <li>Small claims court available for smaller disputes</li>
                <li>Governing law: [Insert Jurisdiction]</li>
                <li>Class action waiver where legally permissible</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Studio support and legal inquiries: <strong>studio@streamflix.com</strong>
              </p>
              <p className="mt-2">
                Partnership opportunities: <strong>partnerships@streamflix.com</strong>
              </p>
              <p className="mt-2">
                Technical support: <strong>support@streamflix.com</strong>
              </p>
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

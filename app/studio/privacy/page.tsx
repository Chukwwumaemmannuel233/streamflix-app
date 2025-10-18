"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function StudioPrivacyPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Studio Privacy Policy</h1>
          <p className="text-muted-foreground">
            Effective Date: <strong>January 1, 2024</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This privacy policy explains how StreamFlix collects, uses, and protects data from content creators,
            studios, and production companies.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Information</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Business name, contact details, and tax identification</li>
                  <li>Bank account and payment information</li>
                  <li>Identity verification documents</li>
                  <li>Professional credentials and portfolio information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Data</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Uploaded video files, metadata, and descriptions</li>
                  <li>Content performance analytics and viewer engagement</li>
                  <li>Revenue and monetization data</li>
                  <li>Content scheduling and distribution preferences</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Information</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP addresses, device information, and browser data</li>
                  <li>Upload logs and platform usage statistics</li>
                  <li>API access logs and integration data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Process payments and manage revenue sharing (75%/25% split)</li>
                <li>Provide content hosting, streaming, and distribution services</li>
                <li>Generate analytics and performance reports</li>
                <li>Verify identity and prevent fraud</li>
                <li>Communicate about account status, policy updates, and opportunities</li>
                <li>Improve platform features and creator tools</li>
                <li>Comply with legal obligations and tax reporting requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Sharing & Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">We Share Information With:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Payment processors for revenue distribution</li>
                    <li>Cloud storage and CDN providers for content delivery</li>
                    <li>Analytics services for performance measurement</li>
                    <li>Legal authorities when required by law</li>
                    <li>Tax authorities for compliance reporting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">We Do NOT Share:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Your content with unauthorized third parties</li>
                    <li>Detailed revenue information with other creators</li>
                    <li>Personal contact information for marketing purposes</li>
                    <li>Proprietary business strategies or content plans</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Content Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Content is stored securely with encryption at rest and in transit</li>
                <li>Access controls limit who can view unpublished content</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Backup and disaster recovery procedures protect your content</li>
                <li>Content deletion is permanent and cannot be recovered</li>
                <li>Draft content remains private until you choose to publish</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Financial Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Payment information processed through PCI-compliant systems</li>
                <li>Revenue data encrypted and access-controlled</li>
                <li>Tax documents stored securely with limited access</li>
                <li>Financial reports available only to account holders</li>
                <li>Bank account details never stored in plain text</li>
                <li>Regular financial data audits and compliance checks</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Analytics & Performance Data</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Detailed analytics available through your studio dashboard</li>
                <li>Aggregated data may be used for platform improvements</li>
                <li>Individual creator data never shared without consent</li>
                <li>You can export your analytics data at any time</li>
                <li>Historical data retained for business continuity</li>
                <li>Third-party analytics tools comply with privacy standards</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Data may be processed in multiple countries for global distribution</li>
                <li>Adequate protection measures in place for international transfers</li>
                <li>GDPR compliance for European creators and studios</li>
                <li>Data localization options available for specific regions</li>
                <li>Cross-border data agreements with service providers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">You Have the Right To:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Access and download your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Restrict processing of your data</li>
                    <li>Data portability to other platforms</li>
                    <li>Object to certain data processing activities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">To Exercise Your Rights:</h4>
                  <p className="text-sm">
                    Contact our privacy team at <strong>privacy@streamflix.com</strong> or use the data management tools
                    in your studio dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Account data retained while your studio account is active</li>
                <li>Content data retained according to your distribution settings</li>
                <li>Financial records kept for 7 years for tax compliance</li>
                <li>Analytics data retained for business intelligence purposes</li>
                <li>Deleted content permanently removed within 30 days</li>
                <li>Account closure triggers data deletion within 90 days</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Essential cookies for platform functionality and security</li>
                <li>Analytics cookies to improve studio tools and features</li>
                <li>Performance cookies to optimize content delivery</li>
                <li>You can manage cookie preferences in your account settings</li>
                <li>Third-party cookies from integrated services</li>
                <li>No tracking for advertising purposes without consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Studio accounts require users to be 18+ or have legal capacity</li>
                <li>Special protections for content featuring minors</li>
                <li>COPPA compliance for family-friendly content creators</li>
                <li>Parental consent required for creators under 18</li>
                <li>Enhanced privacy controls for youth-oriented content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may update this privacy policy to reflect changes in our practices or legal requirements. Material
                changes will be communicated via email and platform notifications at least 30 days before taking effect.
                Continued use of studio services constitutes acceptance of updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Privacy inquiries: <strong>privacy@streamflix.com</strong>
              </p>
              <p className="mt-2">
                Data Protection Officer: <strong>dpo@streamflix.com</strong>
              </p>
              <p className="mt-2">
                Studio support: <strong>studio@streamflix.com</strong>
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

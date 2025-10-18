"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Effective Date: <strong>January 1, 2024</strong>
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
              <CardDescription>
                We collect various types of information to provide and improve our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account Data:</strong> name, email, password (hashed), payment token via processor
                </li>
                <li>
                  <strong>Usage Data:</strong> watch history, device info, IP address, cookies, performance logs
                </li>
                <li>
                  <strong>Communications:</strong> support messages, feedback
                </li>
                <li>
                  <strong>Device Information:</strong> browser type, operating system, device identifiers
                </li>
                <li>
                  <strong>Location Data:</strong> general location based on IP address
                </li>
                <li>
                  <strong>Preferences:</strong> content preferences, settings, and customizations
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
              <CardDescription>Your information helps us provide personalized and secure services</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and improve the platform, personalize recommendations</li>
                <li>Process payments and communicate about your account and purchases</li>
                <li>Analyze usage and maintain security</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Sharing of Information</CardTitle>
              <CardDescription>We limit sharing of your personal information and never sell it</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Shared with trusted service providers (hosting, analytics, payment processors)</li>
                <li>When required by law, or to protect rights and safety</li>
                <li>
                  We do <strong>not</strong> sell personal information
                </li>
                <li>With your consent for specific purposes</li>
                <li>In connection with business transfers or mergers</li>
                <li>Aggregated, non-personal data may be shared for research</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Cookies & Tracking Technologies</CardTitle>
              <CardDescription>We use cookies and similar technologies to enhance your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We use cookies for authentication, preferences, and analytics</li>
                <li>You can disable cookies in your browser, but some features may not work properly</li>
                <li>Third-party analytics services may use tracking technologies</li>
                <li>We use session cookies and persistent cookies</li>
                <li>Local storage may be used for user preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Retention & Storage</CardTitle>
              <CardDescription>We keep your data only as long as necessary</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We retain data only as needed for the purposes described or as required by law</li>
                <li>You may request deletion or export of your data</li>
                <li>Account data is retained while your account is active</li>
                <li>Usage data may be retained for analytics purposes</li>
                <li>Backup copies may be retained for disaster recovery</li>
                <li>Some data may be retained to comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Your Rights & Choices</CardTitle>
              <CardDescription>You have control over your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Depending on your location, you may have rights to access, correct, delete, or export your data</li>
                <li>Contact us to exercise these rights</li>
                <li>You can update your account information at any time</li>
                <li>You can opt out of marketing communications</li>
                <li>You can request data portability</li>
                <li>You can object to certain data processing</li>
                <li>You can withdraw consent where processing is based on consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Security Measures</CardTitle>
              <CardDescription>We implement strong security measures to protect your data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We use industry-standard encryption and processes to protect your data</li>
                <li>However, no system is 100% secure</li>
                <li>We regularly update our security practices</li>
                <li>Access to personal data is restricted to authorized personnel</li>
                <li>We monitor for security breaches and respond promptly</li>
                <li>We use secure data transmission protocols</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
              <CardDescription>We are committed to protecting children's privacy</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We do not knowingly collect info from children under 13 (or applicable age)</li>
                <li>Parents may contact us to remove data</li>
                <li>If we learn we have collected data from a child, we will delete it</li>
                <li>Parental consent is required for children's accounts</li>
                <li>We comply with applicable children's privacy laws</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. International Data Transfers</CardTitle>
              <CardDescription>Information about how we handle international data transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Your data may be transferred to and processed in other countries</li>
                <li>We ensure appropriate safeguards are in place</li>
                <li>We comply with applicable data protection laws</li>
                <li>Standard contractual clauses may be used for transfers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to this Policy</CardTitle>
              <CardDescription>How we handle updates to our privacy practices</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We may update this policy; we'll notify you of significant changes via email or the platform</li>
                <li>Continued use after changes constitutes acceptance</li>
                <li>We will post the effective date of any changes</li>
                <li>Material changes will be highlighted</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How to reach us with privacy-related questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Questions about this Privacy Policy? Contact us at: <strong>privacy@streamingplatform.com</strong>
              </p>
              <p className="mt-2">
                Data Protection Officer: <strong>dpo@streamingplatform.com</strong>
              </p>
              <p className="mt-2">
                For general support: <strong>support@streamingplatform.com</strong>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Streaming Platform. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

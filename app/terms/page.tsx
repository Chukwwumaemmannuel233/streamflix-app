"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective Date: <strong>January 1, 2024</strong>
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By accessing and using our streaming platform, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
              <p>If you do not agree to abide by the above, please do not use this service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Must be at least 13 years old (or age of digital consent in your country)</li>
                <li>If under 18, use requires parent/guardian consent</li>
                <li>Must provide accurate and complete registration information</li>
                <li>Must comply with all local laws regarding online services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Account & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate information when signing up</li>
                <li>Keep your password secure; you are responsible for all activity on your account</li>
                <li>Notify us immediately of suspected unauthorized access</li>
                <li>You may not share your account credentials with others</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Subscriptions & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Certain features or content require paid subscriptions</li>
                <li>Pricing and billing are shown at purchase and handled by trusted payment processors</li>
                <li>Cancellation rules are provided at purchase</li>
                <li>Subscription fees are billed in advance on a recurring basis</li>
                <li>We reserve the right to change subscription fees with notice</li>
                <li>Refunds are handled according to our refund policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Content Usage & Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Content is protected by IP laws and is for personal, non-commercial use only</li>
                <li>Do not download, redistribute, or publicly display content unless explicitly allowed</li>
                <li>All trademarks and logos belong to us or our licensors</li>
                <li>You may not use our branding without written consent</li>
                <li>Content is licensed, not sold, to you</li>
                <li>We retain all rights not expressly granted to you</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Prohibited Conduct</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>No unlawful activity, harassment, or harmful content</li>
                <li>No hacking, scraping, reverse-engineering, or abusive behavior against the service</li>
                <li>No circumventing security measures or access controls</li>
                <li>No uploading malicious software or content</li>
                <li>No impersonating others or providing false information</li>
                <li>No commercial use without authorization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. User-Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>You retain ownership of content you upload</li>
                <li>You grant us a license to use, display, and distribute your content</li>
                <li>You are responsible for ensuring you have rights to upload content</li>
                <li>We may remove content that violates our policies</li>
                <li>Content must comply with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Your privacy is important to us - see our Privacy Policy</li>
                <li>We collect and use data as described in our Privacy Policy</li>
                <li>You consent to data processing as outlined in our policies</li>
                <li>We implement security measures to protect your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>We may suspend or terminate accounts that violate these terms</li>
                <li>You can delete your account via profile settings</li>
                <li>Termination may result in loss of access to content and data</li>
                <li>Some provisions survive termination of your account</li>
                <li>We reserve the right to refuse service to anyone</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Disclaimer & Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>The service is provided "as is" without warranties</li>
                <li>We are not liable for indirect or consequential damages to the fullest extent allowed by law</li>
                <li>Our liability is limited to the amount you paid for the service</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>You use the service at your own risk</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may update these terms; continued use after notice constitutes acceptance. We will notify users of
                significant changes via email or platform notifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Governing Law & Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>These terms are governed by the laws of [Insert Country/State]</li>
                <li>Disputes will be resolved in the courts of [Insert Jurisdiction]</li>
                <li>You agree to binding arbitration for certain disputes</li>
                <li>Class action lawsuits are waived where legally permissible</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Questions about these Terms of Service? Contact us at: <strong>legal@streamingplatform.com</strong>
              </p>
              <p className="mt-2">
                For technical support: <strong>support@streamingplatform.com</strong>
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

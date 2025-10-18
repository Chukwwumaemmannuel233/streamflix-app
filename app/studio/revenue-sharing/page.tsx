"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, TrendingUp, Calculator, PieChart } from "lucide-react"

export default function RevenueSharingPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Revenue Sharing Agreement</h1>
          <p className="text-muted-foreground">
            Effective Date: <strong>January 1, 2024</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Transparent and creator-first revenue sharing model designed to maximize creator earnings while maintaining
            platform sustainability.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Revenue Split Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary">75%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Creator Share</h3>
                  <p className="text-sm text-muted-foreground">
                    You keep 75% of all net revenue generated from your content, including subscriptions, pay-per-view,
                    advertising, and merchandise.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-secondary-foreground">25%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Platform Share</h3>
                  <p className="text-sm text-muted-foreground">
                    StreamFlix retains 25% to cover hosting, bandwidth, payment processing, platform development, and
                    creator support services.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  <strong>Industry Leading:</strong> Our 75/25 split is among the most creator-friendly in the streaming
                  industry, ensuring you earn more from your creative work.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Revenue Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Subscription Revenue</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Monthly and annual subscription fees</li>
                    <li>Premium tier subscriptions</li>
                    <li>Creator-specific subscription channels</li>
                    <li>Bundle and package deals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pay-Per-View Revenue</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Individual content purchases</li>
                    <li>Rental fees for premium content</li>
                    <li>Early access and exclusive releases</li>
                    <li>Live event streaming fees</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advertising Revenue</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Pre-roll and mid-roll advertisements</li>
                    <li>Sponsored content placements</li>
                    <li>Brand partnership integrations</li>
                    <li>Display advertising revenue</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Revenue</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Merchandise sales commissions</li>
                    <li>Fan donations and tips</li>
                    <li>Licensing and syndication deals</li>
                    <li>Educational course sales</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Revenue Calculation Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Example 1: Subscription Revenue</h4>
                  <div className="text-sm space-y-1">
                    <p>Monthly subscription revenue from your content: $10,000</p>
                    <p>Platform fees (payment processing, taxes): -$300</p>
                    <p>Net revenue: $9,700</p>
                    <div className="border-t pt-2 mt-2">
                      <p className="font-medium">Your share (75%): $7,275</p>
                      <p>Platform share (25%): $2,425</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Example 2: Pay-Per-View Content</h4>
                  <div className="text-sm space-y-1">
                    <p>Premium movie rental at $4.99 × 1,000 rentals: $4,990</p>
                    <p>Platform fees (payment processing): -$150</p>
                    <p>Net revenue: $4,840</p>
                    <div className="border-t pt-2 mt-2">
                      <p className="font-medium">Your share (75%): $3,630</p>
                      <p>Platform share (25%): $1,210</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Example 3: Advertising Revenue</h4>
                  <div className="text-sm space-y-1">
                    <p>Monthly ad revenue from 1M views: $2,500</p>
                    <p>Platform fees: -$75</p>
                    <p>Net revenue: $2,425</p>
                    <div className="border-t pt-2 mt-2">
                      <p className="font-medium">Your share (75%): $1,819</p>
                      <p>Platform share (25%): $606</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Terms & Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Payment Schedule</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Monthly payments processed on the 15th of each month</li>
                    <li>Revenue from previous month (1st to last day)</li>
                    <li>Minimum payout threshold: $50 USD</li>
                    <li>Payments below threshold roll over to next month</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Methods</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Direct bank transfer (ACH/Wire)</li>
                    <li>PayPal and digital wallet options</li>
                    <li>International payment support</li>
                    <li>Cryptocurrency payments (select regions)</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Important Payment Notes</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All payments subject to applicable taxes and withholdings</li>
                  <li>Currency conversion fees may apply for international payments</li>
                  <li>Payment delays may occur during banking holidays</li>
                  <li>Detailed payment reports available in your studio dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Fees & Deductions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What's Deducted Before Revenue Split</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Payment processing fees (typically 2.9% + $0.30 per transaction)</li>
                  <li>Applicable taxes (VAT, sales tax, etc.)</li>
                  <li>Chargebacks and refund processing</li>
                  <li>Currency conversion fees (for international transactions)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What's NOT Deducted</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Content hosting and bandwidth costs</li>
                  <li>Platform development and maintenance</li>
                  <li>Customer support and creator services</li>
                  <li>Marketing and promotional activities</li>
                  <li>Analytics and reporting tools</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  <strong>Transparent Pricing:</strong> We absorb most operational costs so you keep more of your
                  earnings. Only direct transaction costs are deducted before the revenue split.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Performance Bonuses & Incentives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Milestone Bonuses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">100K total views</span>
                      <Badge variant="secondary">$500 bonus</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1M total views</span>
                      <Badge variant="secondary">$2,500 bonus</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">10M total views</span>
                      <Badge variant="secondary">$10,000 bonus</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Quality Incentives</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>High engagement rate bonus (5% extra)</li>
                    <li>Exclusive content creator rewards</li>
                    <li>Long-form content incentives</li>
                    <li>Community building bonuses</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Creator Success Program:</strong> Additional bonuses and incentives are available for creators
                  who consistently produce high-quality content and build engaged communities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Real-Time Dashboard</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Live revenue tracking and projections</li>
                  <li>Detailed breakdown by revenue source</li>
                  <li>Audience demographics and engagement metrics</li>
                  <li>Performance comparisons and trends</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Monthly Reports</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Comprehensive revenue statements</li>
                  <li>Tax documentation and forms</li>
                  <li>Payment history and transaction details</li>
                  <li>Performance insights and recommendations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Export</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>CSV and PDF export options</li>
                  <li>API access for advanced analytics</li>
                  <li>Historical data retention (7 years)</li>
                  <li>Custom report generation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agreement Terms & Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Revenue Split Guarantee</h4>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    <strong>Locked Rate Promise:</strong> Your 75% revenue share is guaranteed for existing content. Any
                    changes to revenue sharing will only apply to new content uploaded after the change.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Minimum 90-day notice for any revenue sharing changes</li>
                  <li>Grandfathered rates for existing creators</li>
                  <li>Option to opt-out if terms change unfavorably</li>
                  <li>Transparent communication about all modifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Agreement Duration</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Agreement remains in effect while account is active</li>
                  <li>Either party may terminate with 30-day notice</li>
                  <li>Revenue sharing continues for 60 days post-termination</li>
                  <li>Final payments processed within 90 days</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Responsibilities & Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Creator Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Report all earnings to tax authorities</li>
                    <li>Maintain accurate business records</li>
                    <li>Provide valid tax identification numbers</li>
                    <li>Update tax information as required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Platform Support</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Annual 1099 forms (US creators)</li>
                    <li>International tax documentation</li>
                    <li>Detailed earning statements</li>
                    <li>Tax professional referrals</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Tax Disclaimer:</strong> StreamFlix provides documentation but does not offer tax advice.
                  Consult with qualified tax professionals for guidance on your specific situation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support & Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Revenue Support</h4>
                  <p className="text-sm mb-2">
                    <strong>Email:</strong> revenue@streamflix.com
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Response Time:</strong> 24-48 hours
                  </p>
                  <p className="text-sm">Questions about payments, calculations, or revenue sharing terms.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Creator Success Team</h4>
                  <p className="text-sm mb-2">
                    <strong>Email:</strong> success@streamflix.com
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Response Time:</strong> 12-24 hours
                  </p>
                  <p className="text-sm">Optimization strategies, performance insights, and growth support.</p>
                </div>
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

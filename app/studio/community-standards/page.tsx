"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Shield, Heart, AlertTriangle } from "lucide-react"

export default function CommunityStandardsPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Standards</h1>
          <p className="text-muted-foreground">
            Last Updated: <strong>January 1, 2024</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Our community standards foster a safe, inclusive, and creative environment for all creators and viewers on
            StreamFlix.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Our Community Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Creativity & Innovation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We celebrate original storytelling, artistic expression, and creative risk-taking that pushes
                    boundaries while respecting others.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Respect & Inclusion</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Every creator and viewer deserves to be treated with dignity, regardless of background, identity, or
                    perspective.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Authenticity & Trust</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We value honest communication, transparent practices, and genuine connections between creators and
                    audiences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Safety & Well-being</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We prioritize the physical and emotional safety of our community members, especially vulnerable
                    populations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Creator Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Content Creation</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Create original content or ensure proper licensing for all materials</li>
                  <li>Provide accurate content descriptions and appropriate age ratings</li>
                  <li>Respect intellectual property rights and fair use guidelines</li>
                  <li>Include necessary content warnings for sensitive material</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Community Engagement</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Respond respectfully to viewer feedback and criticism</li>
                  <li>Foster positive discussions in comments and community spaces</li>
                  <li>Report harassment or inappropriate behavior to platform moderators</li>
                  <li>Collaborate constructively with other creators</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Platform Integrity</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maintain accurate account information and creator profiles</li>
                  <li>Follow revenue sharing guidelines and financial transparency</li>
                  <li>Report technical issues and policy violations promptly</li>
                  <li>Participate in platform feedback and improvement initiatives</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Safety & Protection Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Child Safety</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Zero tolerance for content that exploits, endangers, or sexualizes minors.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All content featuring minors must have proper parental consent</li>
                  <li>Educational content about child safety is encouraged</li>
                  <li>Report suspected child exploitation immediately</li>
                  <li>Age-appropriate content ratings are strictly enforced</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Violence & Harmful Content</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fictional violence must be clearly contextualized and age-rated</li>
                  <li>No content promoting real-world violence or harm</li>
                  <li>Self-harm and suicide content requires careful handling and resources</li>
                  <li>Dangerous activities must include appropriate warnings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Privacy & Consent</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Obtain consent before featuring individuals in content</li>
                  <li>Respect privacy rights and avoid doxxing</li>
                  <li>Handle personal information responsibly</li>
                  <li>Provide clear opt-out mechanisms for participants</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Harassment & Hate Speech Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Prohibited Behavior</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Targeted harassment or bullying</li>
                    <li>Hate speech based on identity or beliefs</li>
                    <li>Doxxing or sharing private information</li>
                    <li>Coordinated harassment campaigns</li>
                    <li>Threats of violence or harm</li>
                    <li>Discriminatory content or slurs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">Encouraged Practices</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Constructive criticism and feedback</li>
                    <li>Respectful disagreement and debate</li>
                    <li>Supporting marginalized voices</li>
                    <li>Educational content about social issues</li>
                    <li>Promoting understanding and empathy</li>
                    <li>Celebrating diversity and inclusion</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Context Matters:</strong> We consider intent, context, and impact when evaluating content.
                  Educational, documentary, or artistic content addressing difficult topics may be permitted with proper
                  context and warnings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property & Fair Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Copyright Compliance</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Only upload content you own or have permission to use</li>
                  <li>Understand fair use limitations and transformative content rules</li>
                  <li>Provide proper attribution for licensed materials</li>
                  <li>Respond promptly to copyright claims and takedown requests</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Music & Audio</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use royalty-free music or obtain proper licensing</li>
                  <li>Credit all music and audio sources</li>
                  <li>Understand sync rights for visual content</li>
                  <li>Consider platform-provided music libraries</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Trademark & Branding</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Avoid unauthorized use of brand logos or trademarks</li>
                  <li>Clearly distinguish parody or commentary content</li>
                  <li>Respect brand guidelines in sponsored content</li>
                  <li>Disclose brand partnerships and sponsorships</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monetization & Commercial Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Revenue Sharing Ethics</h4>
                <div className="bg-primary/10 p-4 rounded-lg mb-3">
                  <p className="text-sm">
                    <strong>75% Creator / 25% Platform:</strong> Our revenue sharing model prioritizes creator success
                    while maintaining platform sustainability.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Transparent reporting of all revenue streams</li>
                  <li>Fair distribution based on actual performance metrics</li>
                  <li>No hidden fees or unexpected deductions</li>
                  <li>Clear communication about payment schedules</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sponsored Content & Advertising</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Clearly disclose all sponsored content and partnerships</li>
                  <li>Maintain editorial independence in sponsored content</li>
                  <li>Follow advertising standards and regulations</li>
                  <li>Avoid misleading or deceptive promotional practices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enforcement & Consequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    First Violation
                  </Badge>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Warning notification</li>
                    <li>Content review and guidance</li>
                    <li>Educational resources provided</li>
                    <li>Opportunity for correction</li>
                  </ul>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Repeated Violations
                  </Badge>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Content removal</li>
                    <li>Temporary account restrictions</li>
                    <li>Revenue sharing suspension</li>
                    <li>Required policy training</li>
                  </ul>
                </div>
                <div>
                  <Badge variant="destructive" className="mb-2">
                    Severe Violations
                  </Badge>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Immediate account suspension</li>
                    <li>Content library removal</li>
                    <li>Permanent platform ban</li>
                    <li>Legal action if necessary</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Appeals Process</h4>
                <p className="text-sm">
                  All enforcement actions can be appealed through your studio dashboard. We provide clear explanations
                  for decisions and offer opportunities for creators to address violations and restore their accounts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Reporting & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How to Report Violations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use the report button on any content or profile</li>
                  <li>Provide specific details about the violation</li>
                  <li>Include timestamps for video content</li>
                  <li>Submit evidence when available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Situations</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                    For immediate safety concerns:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>Contact local emergency services first</li>
                    <li>Report to platform immediately: emergency@streamflix.com</li>
                    <li>Provide all relevant information and evidence</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support Resources</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Community Guidelines:</strong> guidelines@streamflix.com
                    </p>
                    <p>
                      <strong>Content Appeals:</strong> appeals@streamflix.com
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Creator Support:</strong> creators@streamflix.com
                    </p>
                    <p>
                      <strong>Safety Team:</strong> safety@streamflix.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Building a Positive Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Our community standards are designed to create an environment where creativity thrives, diverse voices
                  are heard, and everyone feels safe to express themselves authentically.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Creator Initiatives</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Mentorship programs for new creators</li>
                      <li>Diversity and inclusion grants</li>
                      <li>Community collaboration projects</li>
                      <li>Educational workshops and resources</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Platform Commitments</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Transparent policy enforcement</li>
                      <li>Regular community feedback sessions</li>
                      <li>Continuous safety improvements</li>
                      <li>Support for creator well-being</li>
                    </ul>
                  </div>
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

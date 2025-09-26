"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Building2, Eye, EyeOff, ArrowLeft, ArrowRight, Check, CreditCard, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function StudioSignUpPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const router = useRouter()

  // Studio pricing
  const studioPrice = { monthly: 99, yearly: 990 }
  const savings = Math.round(studioPrice.monthly * 12 - studioPrice.yearly)

  // Form data
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    companyType: "",
    foundedYear: "",
    country: "",
    website: "",
    description: "",

    // Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessAddress: "",

    // Account Setup
    username: "",
    password: "",
    confirmPassword: "",

    // Payment Information
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    // Verification
    businessLicense: "",
    taxId: "",

    // Agreements
    termsAccepted: false,
    contentPolicy: false,
    revenueSharing: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/studio-dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] lg:w-[600px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">StreamFlix Studios</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {step === 1 && "Studio Plan & Pricing"}
              {step === 2 && "Company Information"}
              {step === 3 && "Contact & Account Details"}
              {step === 4 && "Payment & Verification"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Choose your billing cycle and get started"}
              {step === 2 && "Tell us about your production company or studio"}
              {step === 3 && "Set up your contact information and account"}
              {step === 4 && "Complete payment and verification"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                    step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && <div className={`h-1 w-12 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Step {step} of 4</CardTitle>
              <CardDescription className="text-center">Join our network of premium content creators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Studio Plan Card */}
                  <Card className="border-primary bg-primary/5">
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Building2 className="h-5 w-5" />
                        StreamFlix Studio Plan
                      </CardTitle>
                      <CardDescription>Professional content creation platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Billing Toggle */}
                      <div className="flex justify-center">
                        <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg">
                          <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              billingCycle === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground"
                            }`}
                          >
                            Yearly
                            <Badge variant="secondary" className="ml-2">
                              Save ${savings}
                            </Badge>
                          </button>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="text-center">
                        <div className="text-4xl font-bold">${studioPrice[billingCycle]}</div>
                        <div className="text-muted-foreground">per {billingCycle === "monthly" ? "month" : "year"}</div>
                        {billingCycle === "yearly" && (
                          <div className="text-sm text-green-600 font-medium">
                            Save ${savings} compared to monthly billing
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Unlimited content uploads</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">75% revenue share</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Advanced analytics & insights</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Custom branding & profile</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">4K streaming quality</span>
                        </div>
                      </div>

                      <div className="bg-primary/10 p-3 rounded-lg text-center">
                        <div className="text-sm font-medium text-primary">🎉 14-day free trial included</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button onClick={() => setStep(2)} className="w-full h-11 text-sm">
                    Continue with Studio Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your Studio Name"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyType">Company Type *</Label>
                      <Select
                        value={formData.companyType}
                        onValueChange={(value) => handleInputChange("companyType", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production-company">Production Company</SelectItem>
                          <SelectItem value="film-studio">Film Studio</SelectItem>
                          <SelectItem value="tv-network">TV Network</SelectItem>
                          <SelectItem value="streaming-service">Streaming Service</SelectItem>
                          <SelectItem value="independent-creator">Independent Creator</SelectItem>
                          <SelectItem value="animation-studio">Animation Studio</SelectItem>
                          <SelectItem value="documentary-producer">Documentary Producer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        placeholder="2020"
                        type="number"
                        min="1900"
                        max="2024"
                        value={formData.foundedYear}
                        onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="kr">South Korea</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourstudio.com"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your company, the type of content you create, your experience in the industry, and what makes your studio unique..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 text-sm">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-11 text-sm">
                      Continue to Contact Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleStep3Submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person Name *</Label>
                    <Input
                      id="contactName"
                      placeholder="John Doe"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Business Email *</Label>
                      <Input
                        id="contactEmail"
                        placeholder="contact@yourstudio.com"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address *</Label>
                    <Textarea
                      id="businessAddress"
                      placeholder="123 Studio Street, Hollywood, CA 90210, USA"
                      value={formData.businessAddress}
                      onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                      required
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Studio Username *</Label>
                    <Input
                      id="username"
                      placeholder="yourstudio"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      required
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">This will be your public studio name on StreamFlix</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Create a strong password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                          className="h-11 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-11 w-11"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                          className="h-11 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-11 w-11"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-11 text-sm">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-11 text-sm">
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  {/* Payment Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name *</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>StreamFlix Studio Plan</span>
                        <span>${studioPrice[billingCycle]}</span>
                      </div>

                      {billingCycle === "yearly" && (
                        <div className="flex justify-between text-green-600">
                          <span>Yearly Savings</span>
                          <span>-${savings}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${studioPrice[billingCycle]}</span>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• 14-day free trial included</p>
                        <p>• 75% revenue share</p>
                        <p>• Cancel anytime</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Verification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessLicense">Business License Number</Label>
                      <Input
                        id="businessLicense"
                        placeholder="BL123456789"
                        value={formData.businessLicense}
                        onChange={(e) => handleInputChange("businessLicense", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / EIN</Label>
                      <Input
                        id="taxId"
                        placeholder="12-3456789"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                        required
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/studio-terms" className="text-primary hover:underline">
                          Studio Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="contentPolicy"
                        checked={formData.contentPolicy}
                        onCheckedChange={(checked) => handleInputChange("contentPolicy", checked)}
                        required
                        className="mt-1"
                      />
                      <Label htmlFor="contentPolicy" className="text-sm leading-relaxed">
                        I agree to follow the{" "}
                        <Link href="/content-policy" className="text-primary hover:underline">
                          Content Guidelines and Community Standards
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="revenueSharing"
                        checked={formData.revenueSharing}
                        onCheckedChange={(checked) => handleInputChange("revenueSharing", checked)}
                        required
                        className="mt-1"
                      />
                      <Label htmlFor="revenueSharing" className="text-sm leading-relaxed">
                        I understand and accept the{" "}
                        <Link href="/revenue-sharing" className="text-primary hover:underline">
                          Revenue Sharing Agreement
                        </Link>{" "}
                        (75% creator, 25% platform)
                      </Label>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary/10 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                      <Check className="h-4 w-4" />
                      Application will be reviewed within 2-3 business days
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(3)} className="flex-1 h-11 text-sm">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" disabled={isLoading} className="flex-1 h-11 text-sm">
                      {isLoading ? "Processing Payment..." : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have a studio account?{" "}
            <Link href="/studio-signin" className="font-medium text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

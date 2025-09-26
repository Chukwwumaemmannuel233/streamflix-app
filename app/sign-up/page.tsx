"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Play, Eye, EyeOff, Check, CreditCard, Lock, ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const plans = {
  basic: {
    name: "Basic",
    price: "$4.99",
    yearlyPrice: "$49.99",
    features: ["1 Device", "HD Quality", "Limited Library"],
    savings: "Save $10/year",
  },
  premium: {
    name: "Premium",
    price: "$9.99",
    yearlyPrice: "$99.99",
    features: ["4 Devices", "4K Quality", "Full Library", "Downloads"],
    savings: "Save $20/year",
    popular: true,
  },
  family: {
    name: "Family",
    price: "$14.99",
    yearlyPrice: "$149.99",
    features: ["6 Devices", "4K Quality", "5 Profiles", "Parental Controls"],
    savings: "Save $30/year",
  },
}

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get("plan") || "premium")

  const currentPlan = plans[selectedPlan] || plans.premium
  const currentPrice = billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
              <Play className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">StreamFlix</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">
              {step === 1 ? "Create your account" : "Complete your subscription"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === 1 ? "Start your free trial today" : "Secure payment to activate your plan"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
          </div>

          <Card className="border-0 shadow-2xl">
            {step === 1 ? (
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl text-center">Account Details</CardTitle>
                  <CardDescription className="text-center">
                    Selected plan: <span className="font-semibold text-primary">{currentPlan.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Plan Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Choose your plan</Label>
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                      {Object.entries(plans).map(([key, plan]) => (
                        <motion.div
                          key={key}
                          className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                            selectedPlan === key ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPlan(key)}
                        >
                          <RadioGroupItem value={key} id={key} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor={key} className="font-medium cursor-pointer">
                                  {plan.name}
                                  {plan.popular && (
                                    <span className="ml-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                                      Popular
                                    </span>
                                  )}
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">{plan.features.join(" • ")}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  {billingCycle === "yearly" ? plan.yearlyPrice : plan.price}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  /{billingCycle === "yearly" ? "year" : "month"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Billing Cycle */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Billing cycle</Label>
                    <RadioGroup value={billingCycle} onValueChange={setBillingCycle}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">
                          Monthly
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly" className="cursor-pointer flex items-center gap-2">
                          Yearly
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {currentPlan.savings}
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="rounded-lg bg-primary/10 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                      <Check className="h-4 w-4" />
                      30-day free trial included
                    </div>
                  </div>

                  <form onSubmit={handleAccountSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Create a strong password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required className="mt-1" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full h-11 text-sm">
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl text-center">Payment Details</CardTitle>
                  <CardDescription className="text-center">
                    Complete your {currentPlan.name} subscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Summary */}
                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="font-medium">Order Summary</h3>
                    <div className="flex justify-between text-sm">
                      <span>
                        {currentPlan.name} Plan ({billingCycle})
                      </span>
                      <span>{currentPrice}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Yearly discount</span>
                        <span>-{currentPlan.savings.match(/\$\d+/)?.[0]}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Free trial (30 days)</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Due today</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Next billing date</span>
                      <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                          className="h-11 pl-10"
                        />
                        <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 h-11 text-sm"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button type="submit" disabled={isLoading} className="flex-1 h-11 text-sm">
                        {isLoading ? "Processing..." : "Start Free Trial"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

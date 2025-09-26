"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Star, Users, Zap, Shield, Smartphone, Tv, Monitor, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockVideos } from "@/lib/data"
import { LoadingSpinner } from "@/components/loading-spinner"
import { VideoModal } from "@/components/video-modal"
import type { VideoType } from "@/lib/types"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoClick = (video: VideoType) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  const trendingMovies = mockVideos.slice(0, 8)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"
          style={{ y, opacity }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="mb-6 flex justify-center" variants={fadeInUp}>
              <motion.div
                className="flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-4 w-4 fill-current" />
                10M+ Happy Streamers
              </motion.div>
            </motion.div>

            <motion.h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl" variants={fadeInUp}>
              Stream
              <motion.span
                className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {" "}
                Epic{" "}
              </motion.span>
              Content
            </motion.h1>

            <motion.p className="mb-8 text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto" variants={fadeInUp}>
              Unlimited movies, shows & originals. Watch anywhere, anytime.
            </motion.p>

            <motion.div className="flex flex-col gap-4 sm:flex-row sm:justify-center" variants={fadeInUp}>
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  asChild
                >
                  <Link href="/sign-up">
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Start Free Trial
                  </Link>
                </Button>
              </motion.div>

              <motion.div {...scaleOnHover}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent backdrop-blur-sm border-primary/20"
                  asChild
                >
                  <Link href="/sign-in">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p className="mt-6 text-sm text-muted-foreground" variants={fadeInUp}>
              Free for 30 days • Cancel anytime • No commitments
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trending Movies Section - Made smaller */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
            <p className="text-xl text-muted-foreground">What everyone's watching</p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {trendingMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
                onClick={() => handleVideoClick(movie)}
              >
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={movie.thumbnail || "/placeholder.svg?height=300&width=225&text=Movie"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <Play className="h-12 w-12 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold mb-1 line-clamp-1 text-sm">{movie.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{movie.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why StreamFlix?</h2>
            <p className="text-xl text-muted-foreground">Premium streaming experience</p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Zap, title: "4K Streaming", desc: "Crystal clear quality" },
              { icon: Shield, title: "Secure", desc: "Your data protected" },
              { icon: Users, title: "5 Profiles", desc: "Everyone gets their space" },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Device Support */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Watch Everywhere</h2>
            <p className="text-xl text-muted-foreground">All your devices covered</p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Tv, title: "Smart TV", desc: "Big screen experience" },
              { icon: Monitor, title: "Computer", desc: "Desktop & laptop" },
              { icon: Smartphone, title: "Mobile", desc: "On-the-go streaming" },
            ].map((device, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
                    <device.icon className="h-10 w-10 text-primary" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{device.title}</h3>
                <p className="text-muted-foreground">{device.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose your plan</p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Basic", price: "$4.99", features: ["1 Device", "HD Quality", "Limited Library"] },
              {
                name: "Premium",
                price: "$9.99",
                features: ["4 Devices", "4K Quality", "Full Library", "Downloads"],
                popular: true,
              },
              {
                name: "Family",
                price: "$14.99",
                features: ["6 Devices", "4K Quality", "5 Profiles", "Parental Controls"],
              },
            ].map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`relative border-2 ${plan.popular ? "border-primary shadow-2xl" : "border-border"} hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-primary/80" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href={`/sign-up?plan=${plan.name.toLowerCase()}`}>Choose {plan.name}</Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Stream?</h2>
            <p className="text-xl mb-8 opacity-90">Join millions of happy streamers today</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/sign-up">
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Start Free Trial
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

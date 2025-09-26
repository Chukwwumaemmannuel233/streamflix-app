"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  Users,
  Zap,
  Shield,
  Smartphone,
  Tv,
  Monitor,
  Check,
  Download,
  Crown,
  Building2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { VideoModal } from "@/components/video-modal";
import { mockVideos } from "@/lib/data";
import type { VideoType } from "@/lib/types";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (video: VideoType) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Get trending movies from mock data
  const trendingMovies = mockVideos.slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Movie Collage Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60 z-10" />
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 h-full opacity-20">
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.8 }}
              >
                <img
                  src={`/ceholder-svg-height-200-width-150-text-movie.jpg?height=200&width=150&text=Movie${
                    i + 1
                  }`}
                  alt={`Movie ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/40 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container relative z-30 max-w-6xl mx-auto">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="mb-4 sm:mb-6 flex justify-center"
              variants={fadeInUp}
            >
              <motion.div
                className="flex items-center gap-2 rounded-full bg-red-600/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-400 backdrop-blur-sm border border-red-600/30"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">
                  Premium Streaming Platform
                </span>
                <span className="sm:hidden">Premium Platform</span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight"
              variants={fadeInUp}
            >
              <span className="block sm:inline">The Future of </span>
              <motion.span
                className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Entertainment
              </motion.span>
            </motion.h1>

            <motion.p
              className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              Where studios, creators, and viewers unite. Stream exclusive
              content from top production companies and discover your next
              favorite show.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              variants={fadeInUp}
            >
              <motion.div {...scaleOnHover} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold"
                  asChild
                >
                  <Link href="/sign-up">
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Start Watching Now
                  </Link>
                </Button>
              </motion.div>

              <motion.div {...scaleOnHover} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/studio-signup">
                    <Building2 className="mr-2 h-4 w-4" />
                    Join as Studio
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 px-4"
              variants={fadeInUp}
            >
              30-day free trial • No contracts • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
              Join Our Platform
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Choose how you want to be part of the StreamFlix community
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden border-0 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group h-full">
                <CardContent className="p-6 sm:p-8 text-center">
                  <motion.div
                    className="mb-4 sm:mb-6 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-600/20">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    For Viewers
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                    Stream unlimited content from studios worldwide. Discover,
                    watch, and enjoy premium entertainment.
                  </p>
                  <ul className="text-left space-y-2 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Unlimited streaming</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Multiple device support</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Personalized recommendations</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Offline downloads</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link href="/sign-up?type=viewer">Sign Up as Viewer</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden border-2 border-red-600/50 bg-red-600/5 backdrop-blur-sm hover:bg-red-600/10 transition-all duration-300 group h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Content Creator
                  </span>
                </div>
                <CardContent className="p-6 sm:p-8 text-center">
                  <motion.div
                    className="mb-4 sm:mb-6 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600/20">
                      <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    For Studios & Creators
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                    Upload and monetize your content. Reach millions of viewers
                    and grow your audience globally.
                  </p>
                  <ul className="text-left space-y-2 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Upload unlimited content</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Revenue sharing program</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>Global distribution</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    asChild
                  >
                    <Link href="/studio-signup">Apply as Studio</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section - UPDATED WITH SMALLER CARDS AND MODAL */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
              Trending Now
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Most watched content from our partner studios
            </p>
          </motion.div>

          <motion.div
            className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
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
                <Card className="overflow-hidden border-0 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
                  <div className="relative">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={
                          movie.thumbnail ||
                          "/placeholder.svg?height=400&width=300&text=Movie"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2 left-2">
                        <img
                          src="/logo.png"
                          alt="Company Logo"
                          className="w-10 h-10 rounded-full shadow-md"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-bold mb-1 text-sm line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                      {movie.description}
                    </p>

                    {/* Studio Information */}
                    {movie.studio && (
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={
                            movie.studio.logo ||
                            "/placeholder.svg?height=20&width=20&text=S"
                          }
                          alt={movie.studio.name}
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="text-xs text-gray-500 truncate">
                          {movie.studio.name}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.duration}</span>
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
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
              Why Choose StreamFlix?
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              The ultimate streaming experience for everyone
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Zap,
                title: "4K Ultra HD",
                desc: "Crystal clear picture quality",
              },
              {
                icon: Download,
                title: "Download & Watch",
                desc: "Offline viewing anywhere",
              },
              {
                icon: Users,
                title: "Multiple Profiles",
                desc: "Up to 5 personalized profiles",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                desc: "Your data is protected",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <motion.div
                      className="mb-4 flex justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-600/20">
                        <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-sm sm:text-base font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Device Support */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
              Watch Everywhere
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Stream on all your favorite devices
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:gap-12 grid-cols-1 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Tv,
                title: "Smart TV",
                desc: "Apple TV, Roku, Chromecast",
                devices: ["Samsung", "LG", "Sony", "Apple TV"],
              },
              {
                icon: Monitor,
                title: "Computer",
                desc: "Any web browser or app",
                devices: ["Windows", "macOS", "Chrome", "Linux"],
              },
              {
                icon: Smartphone,
                title: "Mobile",
                desc: "iOS and Android apps",
                devices: ["iPhone", "iPad", "Android", "Tablet"],
              },
            ].map((device, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  className="mb-4 sm:mb-6 flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-600/20 to-orange-600/20">
                    <device.icon className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
                  </div>
                </motion.div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  {device.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 sm:mb-4">
                  {device.desc}
                </p>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  {device.devices.map((deviceName, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {deviceName}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
              Choose Your Plan
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Flexible pricing for every viewer
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Basic",
                price: "$8.99",
                features: [
                  "1 Device",
                  "HD Quality",
                  "Limited Ads",
                  "Basic Library",
                ],
                color: "gray",
              },
              {
                name: "Premium",
                price: "$15.99",
                features: [
                  "4 Devices",
                  "4K Ultra HD",
                  "No Ads",
                  "Full Library",
                  "Downloads",
                ],
                popular: true,
                color: "red",
              },
              {
                name: "Family",
                price: "$19.99",
                features: [
                  "6 Devices",
                  "4K Ultra HD",
                  "No Ads",
                  "5 Profiles",
                  "Parental Controls",
                ],
                color: "orange",
              },
            ].map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`relative border-2 ${
                    plan.popular
                      ? "border-red-600 bg-red-600/5"
                      : "border-gray-700 bg-gray-800/30"
                  } backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                      {plan.name}
                    </h3>
                    <div className="mb-4 sm:mb-6">
                      <span className="text-2xl sm:text-3xl font-bold">
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`w-full py-2 sm:py-3 text-sm ${
                          plan.popular
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        asChild
                      >
                        <Link
                          href={`/sign-up?plan=${plan.name.toLowerCase()}&type=viewer`}
                        >
                          Start Free Trial
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="container text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Start Streaming?
            </h2>
            <p className="text-sm sm:text-base mb-6 sm:mb-8 text-red-100">
              Join millions of viewers and creators worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm px-6 py-3 bg-white text-red-600 hover:bg-gray-100 font-bold"
                  asChild
                >
                  <Link href="/sign-up?type=viewer">
                    <User className="mr-2 h-4 w-4" />
                    Start as Viewer
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-sm px-6 py-3 bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/studio-signup">
                    <Building2 className="mr-2 h-4 w-4" />
                    Join as Studio
                  </Link>
                </Button>
              </motion.div>
            </div>
            <p className="mt-3 sm:mt-4 text-xs text-red-200">
              No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

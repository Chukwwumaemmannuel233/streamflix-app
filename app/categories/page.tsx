"use client"

import Link from "next/link"
import { ArrowRight, Compass, Crown, Flame, Tag } from "lucide-react"

import { LibraryHero, ViewerShell } from "@/components/viewer-library"
import { categories, mockVideos } from "@/lib/data"

export default function CategoriesPage() {
  const featured = mockVideos.find((video) => video.categories.includes("trending")) || mockVideos[0]

  return (
    <ViewerShell>
      <LibraryHero
        title="Browse by mood, genre, or premium access"
        eyebrow="Categories"
        description="Jump into the exact kind of story you want, from fast action and romance to premium originals and studio picks."
        featured={featured}
        icon={Compass}
        primaryHref="/movies"
        primaryLabel="Explore movies"
        stats={[`${categories.length} categories`, "Genre rails", "Premium marked clearly"]}
      />

      <section className="container py-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">All Categories</h2>
            <p className="mt-1 text-sm text-zinc-400">Each category opens into a full responsive content grid.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const categoryVideos = mockVideos.filter((video) => video.categories.includes(category.id))
            const premiumCount = categoryVideos.filter((video) => video.access === "premium").length
            const Icon = category.id === "trending" ? Flame : premiumCount > 0 ? Crown : Tag

            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-red-500/50 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600/15 text-red-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {categoryVideos.length || "New"} title{categoryVideos.length === 1 ? "" : "s"}
                  {premiumCount > 0 ? ` - ${premiumCount} premium` : " - standard and fresh picks"}
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </ViewerShell>
  )
}

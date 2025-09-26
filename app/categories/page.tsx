import Link from "next/link"
import { categories } from "@/lib/data"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Grid, List, Tag } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <PageHeader
          title="Categories"
          description="Browse videos by category to find exactly what you're looking for."
        />

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Tag className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold group-hover:text-accent-foreground">{category.name}</h3>
              <p className="text-sm text-muted-foreground">Explore {category.name.toLowerCase()} videos and series</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

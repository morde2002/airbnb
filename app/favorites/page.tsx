"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowLeft, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"

// Mock properties data (same as home page)
const properties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: ["/placeholder.svg?height=300&width=400"],
    host: { name: "Sarah Johnson", superhost: true },
    type: "Entire villa",
    beds: 4,
    baths: 3,
    guests: 8,
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 320,
    rating: 4.95,
    reviews: 203,
    images: ["/placeholder.svg?height=300&width=400"],
    host: { name: "Emily Rodriguez", superhost: true },
    type: "Entire cabin",
    beds: 3,
    baths: 2,
    guests: 6,
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id))

  const removeFavorite = (propertyId: number) => {
    const newFavorites = favorites.filter((id) => id !== propertyId)
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Wishlists</h1>
                <p className="text-muted-foreground">{favoriteProperties.length} saved properties</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {favoriteProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No saved properties yet</h2>
            <p className="text-muted-foreground mb-6">Start exploring and save your favorite places to stay</p>
            <Button onClick={() => router.push("/")}>Start exploring</Button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {favoriteProperties.map((property) => (
              <div
                key={property.id}
                className="group cursor-pointer"
                onClick={() => router.push(`/property/${property.id}`)}
              >
                {/* Property card content similar to home page */}
                <div className="relative">
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFavorite(property.id)
                    }}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <div className="mt-3">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-muted-foreground text-sm">{property.location}</p>
                  <p className="font-semibold mt-1">${property.price} / night</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

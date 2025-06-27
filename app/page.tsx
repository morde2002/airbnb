"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Star,
  Heart,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Waves,
  Coffee,
  Wind,
  Moon,
  Sun,
  Menu,
  Globe,
  User,
  X,
  Calendar,
  Bed,
  Bath,
  Utensils,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const properties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      "/bnb1.jpg?height=300&width=400",
      "/bnb2.png?height=300&width=400",
      "/bnb3.png?height=300&width=400",
    ],
    host: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      superhost: true,
    },
    amenities: ["Wifi", "Pool", "Beach Access", "Parking", "Kitchen"],
    type: "Entire villa",
    beds: 4,
    baths: 3,
    guests: 8,
    category: "Beachfront",
    instantBook: true,
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "New York, NY",
    price: 280,
    rating: 4.8,
    reviews: 89,
    images: [
      "/bnb4.png?height=300&width=400",
      "/bnb1.jpg?height=300&width=400",
      "/bnb5.png?height=300&width=400",
    ],
    host: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      superhost: false,
    },
    amenities: ["Wifi", "Gym", "Rooftop", "Parking", "Kitchen"],
    type: "Entire loft",
    beds: 2,
    baths: 2,
    guests: 4,
    category: "City",
    instantBook: false,
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 320,
    rating: 4.95,
    reviews: 203,
    images: [
      "/bnb6.png?height=300&width=400",
      "/bnb4.png?height=300&width=400",
      "/bnb2.png?height=300&width=400",
    ],
    host: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      superhost: true,
    },
    amenities: ["Wifi", "Fireplace", "Hot Tub", "Parking", "Kitchen"],
    type: "Entire cabin",
    beds: 3,
    baths: 2,
    guests: 6,
    category: "Cabins",
    instantBook: true,
  },
  {
    id: 4,
    title: "Stylish City Apartment",
    location: "San Francisco, CA",
    price: 195,
    rating: 4.7,
    reviews: 156,
    images: [
      "/bnb1.jpg?height=300&width=400",
      "/bnb2.png?height=300&width=400",
      "/bnb3.png?height=300&width=400",
    ],
    host: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      superhost: true,
    },
    amenities: ["Wifi", "Balcony", "City View", "Kitchen", "Workspace"],
    type: "Entire apartment",
    beds: 1,
    baths: 1,
    guests: 2,
    category: "City",
    instantBook: false,
  },
  {
    id: 5,
    title: "Tropical Paradise Resort",
    location: "Maui, Hawaii",
    price: 680,
    rating: 4.92,
    reviews: 94,
    images: [
      "/bnb6.png?height=300&width=400",
      "/bnb2.png?height=300&width=400",
      "/bnb4.png?height=300&width=400",
    ],
    host: {
      name: "Lisa Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      superhost: true,
    },
    amenities: ["Wifi", "Pool", "Beach Access", "Spa", "Restaurant"],
    type: "Resort suite",
    beds: 2,
    baths: 2,
    guests: 4,
    category: "Luxury",
    instantBook: true,
  },
  {
    id: 6,
    title: "Historic Brownstone",
    location: "Boston, MA",
    price: 240,
    rating: 4.6,
    reviews: 78,
    images: [
      "/bnb1.jpg?height=300&width=400",
      "/bnb6.png?height=300&width=400",
      "/bnb3.png?height=300&width=400",
    ],
    host: {
      name: "Mordecai Junior",
      avatar: "/me.jpg?height=40&width=40",
      superhost: false,
    },
    amenities: ["Wifi", "Garden", "Historic", "Kitchen", "Fireplace"],
    type: "Entire house",
    beds: 3,
    baths: 2,
    guests: 6,
    category: "Trending",
    instantBook: false,
  },
]

const categories = [
  { name: "All", icon: Grid3X3 },
  { name: "Beachfront", icon: Waves },
  { name: "Cabins", icon: Coffee },
  { name: "Trending", icon: Star },
  { name: "City", icon: Grid3X3 },
  { name: "Luxury", icon: Wind },
]

export default function HomePage() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [guests, setGuests] = useState(1)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [instantBookOnly, setInstantBookOnly] = useState(false)
  const [superhostOnly, setSuperhostOnly] = useState(false)

  useEffect(() => {
    // Load saved data from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    const savedUser = localStorage.getItem("currentUser")
    const savedTheme = localStorage.getItem("darkMode")

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
    if (savedTheme) setDarkMode(JSON.parse(savedTheme))
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (propertyId: number) => {
    if (!isLoggedIn) {
      alert("Please log in to save favorites")
      return
    }
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const handleLogin = () => {
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setCurrentUser(user)
    setIsLoggedIn(true)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("currentUser")
    setFavorites([])
  }

  // Filter properties based on all criteria
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || property.category === selectedCategory

    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => property.amenities.includes(amenity))

    const matchesInstantBook = !instantBookOnly || property.instantBook

    const matchesSuperhost = !superhostOnly || property.host.superhost

    const matchesGuests = property.guests >= guests

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesAmenities &&
      matchesInstantBook &&
      matchesSuperhost &&
      matchesGuests
    )
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setPriceRange([0, 1000])
    setSelectedAmenities([])
    setInstantBookOnly(false)
    setSuperhostOnly(false)
    setGuests(1)
    setCheckIn("")
    setCheckOut("")
  }

  const PropertyCard = ({ property }: { property: any }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }

    return (
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              onClick={() => toggleFavorite(property.id)}
            >
              <Heart
                className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>

            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {property.images.map((_: string, index: number) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
                ))}
            </div>
          </div>

          {property.host.superhost && (
            <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-white">Superhost</Badge>
          )}
          {property.instantBook && (
            <Badge className="absolute top-10 left-3 bg-pink-500 text-white">Instant Book</Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {property.location}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span>{property.type}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />
              {property.beds}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {property.baths}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg">${property.price}</span>
              <span className="text-muted-foreground text-sm">/ night</span>
            </div>
            <Button size="sm" onClick={() => router.push(`/property/${property.id}`)}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const FilterSheet = () => {
    const allAmenities = ["Wifi", "Pool", "Beach Access", "Parking", "Kitchen", "Gym", "Fireplace", "Hot Tub"]

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your search to find the perfect stay</SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold">Price Range</Label>
              <div className="mt-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Label className="text-base font-semibold">Amenities</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {allAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities([...selectedAmenities, amenity])
                        } else {
                          setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                        }
                      }}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Options */}
            <div>
              <Label className="text-base font-semibold">Booking Options</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instantBook"
                    checked={instantBookOnly}
                    onCheckedChange={(checked) => setInstantBookOnly(checked as boolean)}
                  />
                  <Label htmlFor="instantBook" className="text-sm">
                    Instant Book
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="superhost"
                    checked={superhostOnly}
                    onCheckedChange={(checked) => setSuperhostOnly(checked as boolean)}
                  />
                  <Label htmlFor="superhost" className="text-sm">
                    Superhost
                  </Label>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
                Clear All
              </Button>
              <Button className="flex-1">Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-pink-500">airbnb</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-full border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center px-4 py-2 border-r">
                <Input
                  placeholder="Where to?"
                  className="border-0 focus-visible:ring-0 bg-transparent w-32"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 py-2 border-r">
                <Input
                  type="date"
                  className="border-0 focus-visible:ring-0 bg-transparent w-32"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 py-2 border-r">
                <Input
                  type="date"
                  className="border-0 focus-visible:ring-0 bg-transparent w-32"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 py-2">
                <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
                  <SelectTrigger className="border-0 focus:ring-0 bg-transparent w-24">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} guest{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="icon" className="rounded-full bg-pink-500 hover:bg-pink-600 mr-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => router.push("/host")}>
                Become a host
              </Button>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 border rounded-full p-2 hover:shadow-md transition-shadow cursor-pointer">
                    <Menu className="h-4 w-4" />
                    <Avatar className="w-6 h-6">
                      {isLoggedIn ? (
                        <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/trips")}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Your trips
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/favorites")}>
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlists
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/host")}>
                        <Utensils className="mr-2 h-4 w-4" />
                        Host your home
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={handleLogin}>Login</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/signup")}>Sign up</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <FilterSheet />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`flex flex-col items-center gap-2 min-w-fit transition-colors group ${
                  selectedCategory === category.name
                    ? "text-pink-500 border-b-2 border-pink-500 pb-2"
                    : "hover:text-pink-500"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <category.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <FilterSheet />
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredProperties.length} stay{filteredProperties.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            {(searchQuery ||
              selectedCategory !== "All" ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000 ||
              selectedAmenities.length > 0 ||
              instantBookOnly ||
              superhostOnly) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
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

      {/* Properties Grid */}
      <main className="container mx-auto px-4 pb-8">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {filteredProperties.map((property, index) => (
            <div key={property.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="cursor-pointer hover:text-foreground">Help Center</p>
                <p className="cursor-pointer hover:text-foreground">Safety information</p>
                <p className="cursor-pointer hover:text-foreground">Cancellation options</p>
                <p className="cursor-pointer hover:text-foreground">Our COVID-19 Response</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="cursor-pointer hover:text-foreground">Airbnb.org: disaster relief housing</p>
                <p className="cursor-pointer hover:text-foreground">Support Afghan refugees</p>
                <p className="cursor-pointer hover:text-foreground">Combating discrimination</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hosting</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="cursor-pointer hover:text-foreground" onClick={() => router.push("/host")}>
                  Try hosting
                </p>
                <p className="cursor-pointer hover:text-foreground">AirCover for Hosts</p>
                <p className="cursor-pointer hover:text-foreground">Explore hosting resources</p>
                <p className="cursor-pointer hover:text-foreground">Visit our community forum</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="cursor-pointer hover:text-foreground">Newsroom</p>
                <p className="cursor-pointer hover:text-foreground">Learn about new features</p>
                <p className="cursor-pointer hover:text-foreground">Letter from our founders</p>
                <p className="cursor-pointer hover:text-foreground">Careers</p>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 Airbnb Clone. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground">Privacy</span>
              <span className="cursor-pointer hover:text-foreground">Terms</span>
              <span className="cursor-pointer hover:text-foreground">Sitemap</span>
              <span className="cursor-pointer hover:text-foreground">Company details</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

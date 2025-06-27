"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Star,
  Heart,
  Share,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Coffee,
  Wind,
  Users,
  Bed,
  Bath,
  Calendar,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock property data (in real app, this would come from API)
const properties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    host: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      superhost: true,
      joinedDate: "2019",
      responseRate: "100%",
      responseTime: "within an hour",
    },
    amenities: ["Wifi", "Pool", "Beach Access", "Parking", "Kitchen", "Air conditioning", "Washer", "Dryer"],
    type: "Entire villa",
    beds: 4,
    baths: 3,
    guests: 8,
    category: "Beachfront",
    instantBook: true,
    description:
      "Escape to this stunning beachfront villa in Malibu, where luxury meets the ocean. This spacious 4-bedroom, 3-bathroom home offers breathtaking views of the Pacific Ocean and direct beach access. Perfect for families or groups looking for an unforgettable coastal getaway.",
    houseRules: [
      "Check-in: 3:00 PM - 10:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No pets",
      "No parties or events",
      "Maximum 8 guests",
    ],
    cancellationPolicy: "Free cancellation for 48 hours",
  },
]

const reviews = [
  {
    id: 1,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "November 2024",
    comment:
      "Absolutely stunning property! The ocean views were incredible and the house had everything we needed. Sarah was an amazing host and very responsive. Would definitely stay here again!",
  },
  {
    id: 2,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "October 2024",
    comment:
      "Perfect location right on the beach. The house is exactly as described and the amenities were top-notch. Great for a family vacation!",
  },
  {
    id: 3,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "September 2024",
    comment:
      "Beautiful property with amazing views. Only minor issue was the WiFi was a bit slow, but overall fantastic stay.",
  },
]

export default function PropertyPage() {
  const router = useRouter()
  const params = useParams()
  const propertyId = Number.parseInt(params.id as string)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const property = properties.find((p) => p.id === propertyId)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => router.push("/")}>Go back home</Button>
        </div>
      </div>
    )
  }

  const toggleFavorite = () => {
    const newFavorites = favorites.includes(property.id)
      ? favorites.filter((id) => id !== property.id)
      : [...favorites, property.id]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates")
      return
    }
    setIsBooking(true)
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      alert("Booking confirmed! You will receive a confirmation email shortly.")
      router.push("/trips")
    }, 2000)
  }

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const subtotal = nights * property.price
    const cleaningFee = 75
    const serviceFee = Math.round(subtotal * 0.14)
    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      total: subtotal + cleaningFee + serviceFee,
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const amenityIcons: { [key: string]: any } = {
    Wifi: Wifi,
    Pool: Waves,
    "Beach Access": Waves,
    Parking: Car,
    Kitchen: Utensils,
    "Air conditioning": Wind,
    Washer: Coffee,
    Dryer: Coffee,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                <Heart
                  className={`h-4 w-4 mr-2 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""}`}
                />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Title and Rating */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviews} reviews)</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="relative aspect-[4/3] md:aspect-square">
            <Image src={property.images[0] || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} ${index + 2}`}
                  fill
                  className="object-cover"
                />
                {index === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      Show all photos
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{property.type}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {property.guests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.beds} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.baths} baths
                    </span>
                  </div>
                </div>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={property.host.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{property.host.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <Separator />
            </div>

            {/* Host Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={property.host.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{property.host.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Hosted by {property.host.name}</p>
                  <p className="text-sm text-muted-foreground">Joined in {property.host.joinedDate}</p>
                </div>
                {property.host.superhost && <Badge>Superhost</Badge>}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Response rate: {property.host.responseRate}</p>
                </div>
                <div>
                  <p className="font-medium">Response time: {property.host.responseTime}</p>
                </div>
              </div>
              <Separator className="mt-4" />
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              <Separator className="mt-6" />
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(showAllAmenities ? property.amenities : property.amenities.slice(0, 6)).map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Wifi
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5" />
                      <span>{amenity}</span>
                    </div>
                  )
                })}
              </div>
              {property.amenities.length > 6 && (
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? "Show less" : `Show all ${property.amenities.length} amenities`}
                </Button>
              )}
              <Separator className="mt-6" />
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviews} reviews)</span>
              </div>

              <div className="space-y-6">
                {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>

              {reviews.length > 2 && (
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? "Show less" : `Show all ${reviews.length} reviews`}
                </Button>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">${property.price}</span>
                    <span className="text-muted-foreground"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "MMM dd") : "Add date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "MMM dd") : "Add date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label>Guests</Label>
                  <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} guest{num > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" size="lg" onClick={handleBooking} disabled={isBooking}>
                  {isBooking ? "Processing..." : property.instantBook ? "Instant Book" : "Reserve"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>

                {checkInDate && checkOutDate && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>
                        ${property.price} × {calculateTotal().nights} nights
                      </span>
                      <span>${calculateTotal().subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>${calculateTotal().cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${calculateTotal().serviceFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().total}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* House Rules */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">House rules</h3>
          <div className="space-y-2">
            {property.houseRules.map((rule, index) => (
              <p key={index} className="text-muted-foreground">
                • {rule}
              </p>
            ))}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Cancellation policy</h3>
          <p className="text-muted-foreground">{property.cancellationPolicy}</p>
        </div>
      </div>
    </div>
  )
}

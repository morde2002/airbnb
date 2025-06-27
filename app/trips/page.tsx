"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Star, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock trips data
const trips = [
  {
    id: 1,
    property: {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, California",
      image: "/placeholder.svg?height=200&width=300",
      host: "Sarah Johnson",
    },
    checkIn: "2024-12-15",
    checkOut: "2024-12-20",
    guests: 4,
    total: 2625,
    status: "upcoming",
    confirmationCode: "AIRBNB-12345",
  },
  {
    id: 2,
    property: {
      id: 3,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      image: "/placeholder.svg?height=200&width=300",
      host: "Emily Rodriguez",
    },
    checkIn: "2024-10-10",
    checkOut: "2024-10-15",
    guests: 2,
    total: 1725,
    status: "completed",
    confirmationCode: "AIRBNB-67890",
    rating: 5,
    review: "Amazing stay! The cabin was perfect and Emily was a wonderful host.",
  },
]

export default function TripsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming")
  const pastTrips = trips.filter((trip) => trip.status === "completed")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const TripCard = ({ trip }: { trip: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={trip.property.image || "/placeholder.svg"}
              alt={trip.property.title}
              className="w-full h-48 md:h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{trip.property.title}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {trip.property.location}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Hosted by {trip.property.host}</p>
              </div>
              <Badge variant={trip.status === "upcoming" ? "default" : "secondary"}>
                {trip.status === "upcoming" ? "Upcoming" : "Completed"}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(trip.checkIn)} - {formatDate(trip.checkOut)}
              </span>
              <span>{trip.guests} guests</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Total: ${trip.total}</p>
                <p className="text-xs text-muted-foreground">Confirmation: {trip.confirmationCode}</p>
              </div>
              <div className="flex gap-2">
                {trip.status === "completed" && !trip.rating && (
                  <Button size="sm" variant="outline">
                    <Star className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                )}
                {trip.status === "upcoming" && (
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Host
                  </Button>
                )}
                <Button size="sm" onClick={() => router.push(`/property/${trip.property.id}`)}>
                  View Property
                </Button>
              </div>
            </div>

            {trip.rating && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-medium">Your review:</span>
                  <div className="flex">
                    {[...Array(trip.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{trip.review}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Trips</h1>
              <p className="text-muted-foreground">Your travel history and upcoming stays</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming ({upcomingTrips.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastTrips.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingTrips.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">No upcoming trips</h2>
                <p className="text-muted-foreground mb-6">Time to plan your next adventure!</p>
                <Button onClick={() => router.push("/")}>Start exploring</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastTrips.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">No past trips</h2>
                <p className="text-muted-foreground mb-6">Your travel history will appear here</p>
                <Button onClick={() => router.push("/")}>Book your first trip</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {pastTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

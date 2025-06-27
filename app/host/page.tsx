"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, DollarSign, Calendar, Users, Plus, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock host data
const hostProperties = [
  {
    id: 1,
    title: "Downtown Apartment",
    location: "New York, NY",
    price: 150,
    status: "active",
    bookings: 12,
    rating: 4.8,
    revenue: 1800,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Beach House",
    location: "Miami, FL",
    price: 300,
    status: "active",
    bookings: 8,
    rating: 4.9,
    revenue: 2400,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HostPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    type: "",
    beds: "",
    baths: "",
    guests: "",
  })

  const totalRevenue = hostProperties.reduce((sum, property) => sum + property.revenue, 0)
  const totalBookings = hostProperties.reduce((sum, property) => sum + property.bookings, 0)
  const averageRating = hostProperties.reduce((sum, property) => sum + property.rating, 0) / hostProperties.length

  const handleAddProperty = () => {
    // In a real app, this would make an API call
    console.log("Adding property:", newProperty)
    setShowAddProperty(false)
    setNewProperty({
      title: "",
      location: "",
      price: "",
      description: "",
      type: "",
      beds: "",
      baths: "",
      guests: "",
    })
    alert("Property added successfully!")
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
                <h1 className="text-2xl font-bold">Host Dashboard</h1>
                <p className="text-muted-foreground">Manage your properties and bookings</p>
              </div>
            </div>
            <Button onClick={() => setShowAddProperty(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${totalRevenue}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Properties</p>
                      <p className="text-2xl font-bold">{hostProperties.length}</p>
                    </div>
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                      <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">New booking for Downtown Apartment</p>
                      <p className="text-sm text-muted-foreground">Dec 15-20, 2024 • $750</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Review received for Beach House</p>
                      <p className="text-sm text-muted-foreground">5 stars • "Amazing property!"</p>
                    </div>
                    <Badge variant="secondary">Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className="absolute top-3 right-3"
                      variant={property.status === "active" ? "default" : "secondary"}
                    >
                      {property.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{property.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{property.location}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium ml-1">${property.price}/night</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-medium ml-1">{property.rating}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bookings:</span>
                        <span className="font-medium ml-1">{property.bookings}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium ml-1">${property.revenue}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Downtown Apartment</p>
                      <p className="text-sm text-muted-foreground">John Doe • Dec 15-20, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$750</p>
                      <Badge>Confirmed</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Beach House</p>
                      <p className="text-sm text-muted-foreground">Jane Smith • Dec 10-15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$1500</p>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Property Modal */}
        {showAddProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
              <CardHeader>
                <CardTitle>Add New Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per night</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select
                      value={newProperty.type}
                      onValueChange={(value) => setNewProperty({ ...newProperty, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="cabin">Cabin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input
                      id="beds"
                      type="number"
                      value={newProperty.beds}
                      onChange={(e) => setNewProperty({ ...newProperty, beds: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input
                      id="baths"
                      type="number"
                      value={newProperty.baths}
                      onChange={(e) => setNewProperty({ ...newProperty, baths: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Max Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={newProperty.guests}
                      onChange={(e) => setNewProperty({ ...newProperty, guests: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddProperty}>Add Property</Button>
                  <Button variant="outline" onClick={() => setShowAddProperty(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

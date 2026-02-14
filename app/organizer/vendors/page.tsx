'use client'

import Link from 'next/link'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Star, MapPin, DollarSign, Users, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const mockVendors = [
  {
    id: 1,
    name: 'Delicious Catering Co.',
    category: 'Catering',
    rating: 4.9,
    reviews: 127,
    location: 'Downtown',
    priceRange: '$2,500 - $5,000',
    minGuests: 50,
    maxGuests: 500,
    image: '👨‍🍳',
    featured: true,
    services: ['Full Catering', 'Bar Service', 'Setup & Cleanup'],
  },
  {
    id: 2,
    name: 'Snapshots Photography',
    category: 'Photography',
    rating: 4.8,
    reviews: 94,
    location: 'Midtown',
    priceRange: '$1,500 - $3,000',
    minGuests: 1,
    maxGuests: 1000,
    image: '📸',
    featured: true,
    services: ['Wedding Photography', 'Event Coverage', 'Editing'],
  },
  {
    id: 3,
    name: 'Elegant Venues',
    category: 'Venue',
    rating: 4.7,
    reviews: 156,
    location: 'Uptown',
    priceRange: '$3,000 - $8,000',
    minGuests: 100,
    maxGuests: 800,
    image: '🏛️',
    featured: false,
    services: ['Ballroom Rental', 'Parking', 'Catering Kitchen'],
  },
  {
    id: 4,
    name: 'Sound & Lights',
    category: 'Entertainment',
    rating: 4.6,
    reviews: 78,
    location: 'Downtown',
    priceRange: '$1,000 - $2,500',
    minGuests: 20,
    maxGuests: 500,
    image: '🎧',
    featured: false,
    services: ['DJ Service', 'Sound System', 'Lighting Design'],
  },
  {
    id: 5,
    name: 'Blooming Flowers',
    category: 'Decoration',
    rating: 4.9,
    reviews: 112,
    location: 'Uptown',
    priceRange: '$800 - $2,000',
    minGuests: 20,
    maxGuests: 500,
    image: '🌸',
    featured: true,
    services: ['Floral Arrangements', 'Centerpieces', 'Installation'],
  },
  {
    id: 6,
    name: 'Cake Art Studio',
    category: 'Catering',
    rating: 4.8,
    reviews: 89,
    location: 'Downtown',
    priceRange: '$300 - $800',
    minGuests: 1,
    maxGuests: 500,
    image: '🎂',
    featured: false,
    services: ['Custom Cakes', 'Dessert Platters', 'Design Consultation'],
  },
]

const categories = ['All', 'Catering', 'Photography', 'Venue', 'Entertainment', 'Decoration']

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = mockVendors
    .filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.reviews - a.reviews
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Vendors</h1>
          <p className="text-muted-foreground">Browse and connect with trusted vendors for your events</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-medium mb-3">Service Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Featured Vendors Banner */}
        {filtered.some(v => v.featured) && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Featured Vendors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.filter(v => v.featured).map((vendor) => (
                <Link key={vendor.id} href={`/organizer/vendors/${vendor.id}`}>
                  <div className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent rounded-xl overflow-hidden hover:shadow-lg transition-all h-full">
                    <div className="p-6 space-y-4 h-full flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="text-5xl">{vendor.image}</div>
                        <span className="text-xs font-bold px-2 py-1 bg-accent text-accent-foreground rounded-full">
                          Featured
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">{vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.category}</p>
                      </div>

                      <div className="space-y-2 py-4 border-t border-accent/20">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{vendor.rating}</span>
                          </div>
                          <span className="text-muted-foreground text-xs">({vendor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <DollarSign className="w-3 h-3" />
                          {vendor.priceRange}
                        </div>
                      </div>

                      <Button className="w-full mt-auto">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Vendors */}
        <div>
          <h2 className="text-lg font-bold mb-4">All Vendors ({filtered.length})</h2>
          <div className="space-y-4">
            {filtered.map((vendor) => (
              <Link key={vendor.id} href={`/organizer/vendors/${vendor.id}`}>
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start gap-6">
                    {/* Image */}
                    <div className="hidden md:flex bg-secondary/50 rounded-lg w-24 h-24 items-center justify-center flex-shrink-0">
                      <span className="text-4xl">{vendor.image}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-bold">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground">{vendor.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{vendor.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{vendor.reviews} reviews</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-foreground/80 mb-4">
                        {vendor.services.join(' • ')}
                      </p>

                      {/* Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border">
                        <div className="text-sm">
                          <p className="text-xs text-muted-foreground">Location</p>
                          <div className="flex items-center gap-1 font-medium mt-1">
                            <MapPin className="w-3 h-3" />
                            {vendor.location}
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-xs text-muted-foreground">Price Range</p>
                          <div className="flex items-center gap-1 font-medium mt-1">
                            <DollarSign className="w-3 h-3" />
                            {vendor.priceRange}
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-xs text-muted-foreground">Guest Range</p>
                          <div className="flex items-center gap-1 font-medium mt-1">
                            <Users className="w-3 h-3" />
                            {vendor.minGuests} - {vendor.maxGuests}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button size="sm" className="w-full gap-2">
                            Send Proposal <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}

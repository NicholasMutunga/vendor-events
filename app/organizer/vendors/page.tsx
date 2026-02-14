'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Star, MapPin, DollarSign, Users, ArrowRight } from 'lucide-react'

type BackendService = {
  id: number
  category?: string
  title?: string
  pricing?: number
  guest_count?: number
}

type BackendVendor = {
  id: number
  description?: string | null
  years_experience?: number
  location?: string | null
  rating?: number
  verified?: boolean
  user?: {
    full_name?: string | null
    email?: string | null
  }
  services?: BackendService[]
}

type UiVendor = {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  location: string
  priceRange: string
  minGuests: number
  maxGuests: number
  image: string
  featured: boolean
  services: string[]
}

const VENDOR_IMAGE = '/vendor-placeholder.svg'

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function normalizeVendor(vendor: BackendVendor): UiVendor {
  const services = vendor.services || []
  const pricing = services.map((s) => Number(s.pricing ?? 0)).filter((v) => v > 0)
  const guestCounts = services.map((s) => Number(s.guest_count ?? 0)).filter((v) => v > 0)

  const minPrice = pricing.length ? Math.min(...pricing) : 0
  const maxPrice = pricing.length ? Math.max(...pricing) : 0
  const minGuests = guestCounts.length ? Math.min(...guestCounts) : 0
  const maxGuests = guestCounts.length ? Math.max(...guestCounts) : 0

  const primaryCategory = services.find((s) => s.category)?.category || 'General'

  return {
    id: vendor.id,
    name: vendor.user?.full_name?.trim() || 'Unnamed Vendor',
    category: primaryCategory,
    rating: Number(vendor.rating ?? 0),
    reviews: services.length,
    location: vendor.location || 'N/A',
    priceRange: minPrice > 0 && maxPrice > 0 ? `${currency(minPrice)} - ${currency(maxPrice)}` : 'N/A',
    minGuests,
    maxGuests,
    image: VENDOR_IMAGE,
    featured: Boolean(vendor.verified) && Number(vendor.rating ?? 0) >= 4.7,
    services: services.map((s) => s.title || 'Unnamed Service'),
  }
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<UiVendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/vendor')
        const payload = response.data
        const rawVendors: BackendVendor[] = Array.isArray(payload) ? payload : payload?.vendors || payload?.data || []
        setVendors(rawVendors.map(normalizeVendor))
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = (err.response?.data as { message?: string } | undefined)?.message
          setError(message || 'Unable to load vendors. Please try again.')
        } else {
          setError('Unable to load vendors. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(vendors.map((v) => v.category).filter(Boolean))
    return ['All', ...Array.from(unique)]
  }, [vendors])

  const filtered = vendors
    .filter((vendor) => {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Vendors</h1>
          <p className="text-muted-foreground">Browse and connect with trusted vendors for your events</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

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
              <option value="reviews">Most Services</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading vendors...</div>
        ) : (
          <>
            {filtered.some((v) => v.featured) && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Featured Vendors</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.filter((v) => v.featured).map((vendor) => (
                    <Link key={vendor.id} href={`/organizer/vendors/${vendor.id}`}>
                      <div className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent rounded-xl overflow-hidden hover:shadow-lg transition-all h-full">
                        <div className="p-6 space-y-4 h-full flex flex-col">
                          <div className="flex items-start justify-between">
                            <img src={vendor.image} alt="Vendor" className="w-20 h-20 rounded-lg object-cover" />
                            <span className="text-xs font-bold px-2 py-1 bg-accent text-accent-foreground rounded-full">Featured</span>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold">{vendor.name}</h3>
                            <p className="text-sm text-muted-foreground">{vendor.category}</p>
                          </div>

                          <div className="space-y-2 py-4 border-t border-accent/20">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
                              </div>
                              <span className="text-muted-foreground text-xs">({vendor.reviews} services)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <DollarSign className="w-3 h-3" />
                              {vendor.priceRange}
                            </div>
                          </div>

                          <Button className="w-full mt-auto">View Profile</Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold mb-4">All Vendors ({filtered.length})</h2>
              <div className="space-y-4">
                {filtered.map((vendor) => (
                  <Link key={vendor.id} href={`/organizer/vendors/${vendor.id}`}>
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                      <div className="flex items-start gap-6">
                        <div className="hidden md:flex bg-secondary/50 rounded-lg w-24 h-24 items-center justify-center flex-shrink-0 overflow-hidden">
                          <img src={vendor.image} alt="Vendor" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-lg font-bold">{vendor.name}</h3>
                              <p className="text-sm text-muted-foreground">{vendor.category}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{vendor.rating.toFixed(1)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{vendor.reviews} services</p>
                            </div>
                          </div>

                          <p className="text-sm text-foreground/80 mb-4">{vendor.services.join(' | ') || 'No services yet'}</p>

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
                                {vendor.minGuests > 0 ? `${vendor.minGuests} - ${vendor.maxGuests}` : 'N/A'}
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
          </>
        )}
      </main>
    </div>
  )
}

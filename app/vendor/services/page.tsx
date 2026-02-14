'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import VendorSidebar from '@/components/vendor-sidebar'
import { apiClient } from '@/lib/api-client'
import { SERVICE_CATEGORIES } from '@/lib/service-categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, ShoppingBag, DollarSign, Users } from 'lucide-react'

type BackendService = {
  id?: string | number
  _id?: string | number
  category?: string
  title?: string
  description?: string
  pricing?: number
  guest_count?: number
}

type UiService = {
  id: string | number
  category: string
  title: string
  description: string
  pricing: number
  guest_count: number
}

type EventVendorInterest = {
  vendor_id: number
  status: string
  proposal: string
}

type EventVendorAgreement = {
  vendor_id: number
  status: string
}

type EventWithVendors = {
  id: number
  title: string
  interests: EventVendorInterest[]
  agreements: EventVendorAgreement[]
}

const ALL_CATEGORY = 'all'
const FILTER_CATEGORIES = [ALL_CATEGORY, ...SERVICE_CATEGORIES]
const EVENT_VENDOR_DATA: EventWithVendors[] = [
  {
    id: 1,
    title: 'Grand Corporate Gala',
    interests: [
      { vendor_id: 1, status: 'accepted', proposal: 'We can provide excellent service for your event - John Caterer' },
      { vendor_id: 2, status: 'pending', proposal: 'We can provide excellent service for your event - Sarah Decorator' },
      { vendor_id: 3, status: 'pending', proposal: 'We can provide excellent service for your event - Mike Photographer' },
      { vendor_id: 4, status: 'pending', proposal: 'We can provide excellent service for your event - Lisa Sound Engineer' },
    ],
    agreements: [
      { vendor_id: 2, status: 'confirmed' },
      { vendor_id: 1, status: 'confirmed' },
    ],
  },
  {
    id: 2,
    title: 'Wedding Reception',
    interests: [
      { vendor_id: 1, status: 'accepted', proposal: 'Perfect service for your wedding - John Caterer' },
      { vendor_id: 2, status: 'pending', proposal: 'Perfect service for your wedding - Sarah Decorator' },
      { vendor_id: 3, status: 'pending', proposal: 'Perfect service for your wedding - Mike Photographer' },
      { vendor_id: 4, status: 'pending', proposal: 'Perfect service for your wedding - Lisa Sound Engineer' },
      { vendor_id: 5, status: 'pending', proposal: 'Perfect service for your wedding - James Transport' },
    ],
    agreements: [
      { vendor_id: 7, status: 'pending' },
      { vendor_id: 1, status: 'confirmed' },
    ],
  },
  {
    id: 3,
    title: 'Product Launch',
    interests: [
      { vendor_id: 1, status: 'accepted', proposal: 'Excellent for your product launch - John Caterer' },
      { vendor_id: 2, status: 'accepted', proposal: 'Excellent for your product launch - Sarah Decorator' },
      { vendor_id: 3, status: 'accepted', proposal: 'Excellent for your product launch - Mike Photographer' },
      { vendor_id: 4, status: 'pending', proposal: 'Excellent for your product launch - Lisa Sound Engineer' },
      { vendor_id: 5, status: 'pending', proposal: 'Excellent for your product launch - James Transport' },
      { vendor_id: 6, status: 'pending', proposal: 'Excellent for your product launch - Amanda Security' },
    ],
    agreements: [
      { vendor_id: 3, status: 'confirmed' },
      { vendor_id: 4, status: 'confirmed' },
    ],
  },
]

function normalizeService(service: BackendService, index: number): UiService {
  const serviceId = service.id ?? service._id ?? `service-${index}`

  return {
    id: serviceId,
    category: service.category || 'Uncategorized',
    title: service.title || 'Untitled Service',
    description: service.description || 'No description provided.',
    pricing: Number(service.pricing ?? 0),
    guest_count: Number(service.guest_count ?? 0),
  }
}

export default function ServicesPage() {
  const [services, setServices] = useState<UiService[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>(ALL_CATEGORY)
  const [selectedEventId, setSelectedEventId] = useState<number | ''>('')
  const [selectedVendorId, setSelectedVendorId] = useState<number | ''>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const selectedEvent = useMemo(
    () => EVENT_VENDOR_DATA.find((event) => event.id === selectedEventId),
    [selectedEventId]
  )

  const vendorOptions = useMemo(() => {
    if (!selectedEvent) return []

    const map = new Map<number, { id: number; label: string; status: string }>()

    selectedEvent.interests.forEach((interest) => {
      const nameFromProposal = interest.proposal.split(' - ')[1] || `Vendor #${interest.vendor_id}`
      map.set(interest.vendor_id, {
        id: interest.vendor_id,
        label: nameFromProposal,
        status: interest.status,
      })
    })

    selectedEvent.agreements.forEach((agreement) => {
      if (!map.has(agreement.vendor_id)) {
        map.set(agreement.vendor_id, {
          id: agreement.vendor_id,
          label: `Vendor #${agreement.vendor_id}`,
          status: agreement.status,
        })
      }
    })

    return Array.from(map.values())
  }, [selectedEvent])

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/service')
        const payload = response.data
        const rawServices: BackendService[] = Array.isArray(payload) ? payload : payload?.data || []
        setServices(rawServices.map(normalizeService))
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = (err.response?.data as { message?: string } | undefined)?.message
          setError(message || 'Unable to load services. Please try again.')
        } else {
          setError('Unable to load services. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const filtered = services.filter((service) => {
    const matchesCategory = filterCategory === ALL_CATEGORY || service.category === filterCategory
    const keyword = searchTerm.trim().toLowerCase()
    const matchesSearch =
      keyword.length === 0 ||
      service.title.toLowerCase().includes(keyword) ||
      service.description.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Your Services</h1>
              <p className="text-muted-foreground">Manage your service offerings and pricing</p>
            </div>
            <Link href="/vendor/services/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat === ALL_CATEGORY ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold mb-4">Select Vendor From Event Data</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="eventSelect" className="block text-sm font-medium">
                Event
              </label>
              <select
                id="eventSelect"
                value={selectedEventId}
                onChange={(e) => {
                  const value = e.target.value
                  setSelectedEventId(value ? Number(value) : '')
                  setSelectedVendorId('')
                }}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Choose event...</option>
                {EVENT_VENDOR_DATA.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="vendorSelect" className="block text-sm font-medium">
                Vendor
              </label>
              <select
                id="vendorSelect"
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value ? Number(e.target.value) : '')}
                disabled={!selectedEvent}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              >
                <option value="">Choose vendor...</option>
                {vendorOptions.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.label} ({vendor.status})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading services...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <div key={service.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="bg-gradient-to-br from-accent/20 to-primary/20 h-32 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-foreground/70" />
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.category}</p>
                    </div>

                    <p className="text-sm text-foreground/80 line-clamp-3">{service.description}</p>

                    <div className="space-y-2 py-4 border-t border-border mt-auto">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>Pricing</span>
                        </div>
                        <span className="font-semibold">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(service.pricing)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>Guest Count</span>
                        </div>
                        <span className="font-semibold">{service.guest_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-muted-foreground mb-6">Add your first service to start receiving requests</p>
                <Link href="/vendor/services/create">
                  <Button>Add Service</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

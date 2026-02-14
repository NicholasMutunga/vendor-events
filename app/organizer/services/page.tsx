'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin, DollarSign, Users, BadgeCheck, ArrowLeft } from 'lucide-react'

type BackendService = {
  id: number
  category?: string
  title?: string
  description?: string
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
    phone_number?: string | null
  }
  services?: BackendService[]
}

type ServiceCard = {
  id: number
  category: string
  title: string
  description: string
  pricing: number
  guestCount: number
  vendorId: number
  vendorName: string
  vendorEmail: string
  vendorPhone: string
  vendorRating: number
  vendorVerified: boolean
  vendorLocation: string
  vendorExperience: number
}

function toCards(vendors: BackendVendor[]) {
  const cards: ServiceCard[] = []

  vendors.forEach((vendor) => {
    const services = vendor.services || []
    services.forEach((service) => {
      cards.push({
        id: service.id,
        category: service.category || 'General',
        title: service.title || 'Untitled Service',
        description: service.description || 'No description provided.',
        pricing: Number(service.pricing ?? 0),
        guestCount: Number(service.guest_count ?? 0),
        vendorId: vendor.id,
        vendorName: vendor.user?.full_name?.trim() || 'Unnamed Vendor',
        vendorEmail: vendor.user?.email || 'N/A',
        vendorPhone: vendor.user?.phone_number || 'N/A',
        vendorRating: Number(vendor.rating ?? 0),
        vendorVerified: Boolean(vendor.verified),
        vendorLocation: vendor.location || 'N/A',
        vendorExperience: Number(vendor.years_experience ?? 0),
      })
    })
  })

  return cards
}

export default function OrganizerServicesPage() {
  const [services, setServices] = useState<ServiceCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/vendor')
        const payload = response.data
        const vendors: BackendVendor[] = Array.isArray(payload) ? payload : payload?.vendors || payload?.data || []
        setServices(toCards(vendors))
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

    fetchVendors()
  }, [])

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return services

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(keyword) ||
        service.category.toLowerCase().includes(keyword) ||
        service.vendorName.toLowerCase().includes(keyword) ||
        service.description.toLowerCase().includes(keyword)
      )
    })
  }, [search, services])

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <Link href="/organizer/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hire Services</h1>
          <p className="text-muted-foreground">Browse services and hire vendors for your event.</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by service, category, or vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading services...</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <div key={service.id} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{service.category}</p>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                  </div>
                  {service.vendorVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-1 text-xs font-medium">
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </span>
                  ) : null}
                </div>

                <p className="text-sm text-foreground/80 line-clamp-3">{service.description}</p>

                <div className="space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground inline-flex items-center gap-1"><DollarSign className="w-4 h-4" /> Pricing</span>
                    <span className="font-semibold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(service.pricing)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground inline-flex items-center gap-1"><Users className="w-4 h-4" /> Guests</span>
                    <span className="font-semibold">{service.guestCount}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-sm font-semibold">Vendor: {service.vendorName}</p>
                  <p className="text-xs text-muted-foreground">{service.vendorEmail}</p>
                  <p className="text-xs text-muted-foreground">{service.vendorPhone}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {service.vendorLocation}</span>
                    <span>{service.vendorExperience} yrs exp</span>
                    <span className="inline-flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {service.vendorRating.toFixed(1)}</span>
                  </div>
                </div>

                <Link href={`/organizer/vendors/${service.vendorId}`}>
                  <Button className="w-full">Hire This Service</Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No services found.</div>
        ) : null}
      </main>
    </div>
  )
}

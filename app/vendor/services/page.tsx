'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VendorSidebar from '@/components/vendor-sidebar'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, ShoppingBag, DollarSign, Users } from 'lucide-react'

type BackendService = {
  id?: string | number
  _id?: string | number
  vendor_id?: string | number
  user_id?: string | number
  created_by?: string | number
  category?: string
  title?: string
  description?: string
  pricing?: number
  guest_count?: number
  vendor?: { id?: string | number }
  user?: { id?: string | number }
}

type UiService = {
  id: string | number
  category: string
  title: string
  description: string
  pricing: number
  guest_count: number
}

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/vendor/services')
        const payload = response.data
        const rawServices: BackendService[] = Array.isArray(payload)
          ? payload
          : payload?.services || payload?.data || []
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
    const keyword = searchTerm.trim().toLowerCase()
    if (keyword.length === 0) return true

    return (
      service.title.toLowerCase().includes(keyword) ||
      service.description.toLowerCase().includes(keyword)
    )
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

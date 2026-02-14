'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import VendorSidebar from '@/components/vendor-sidebar'
import { apiClient } from '@/lib/api-client'
import { SERVICE_CATEGORIES } from '@/lib/service-categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'

export default function CreateServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    category: SERVICE_CATEGORIES[0],
    title: '',
    description: '',
    pricing: '',
    guest_count: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await apiClient.post('/vendor/service/add', {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        pricing: Number(formData.pricing),
        guest_count: Number(formData.guest_count),
      })

      router.push('/vendor/services')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data as { message?: string } | undefined)?.message
        setError(message || 'Unable to create service. Please try again.')
      } else {
        setError('Unable to create service. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <Link href="/vendor/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </Link>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Add New Service</h1>
          <p className="text-muted-foreground mb-8">Create a service that organizers can discover and book.</p>

          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">Title *</label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Premium Wedding Catering"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe what is included in your service"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="pricing" className="block text-sm font-medium">Pricing *</label>
                  <Input
                    id="pricing"
                    name="pricing"
                    type="number"
                    min="0"
                    placeholder="2500"
                    value={formData.pricing}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="guest_count" className="block text-sm font-medium">Guest Count *</label>
                  <Input
                    id="guest_count"
                    name="guest_count"
                    type="number"
                    min="1"
                    placeholder="100"
                    value={formData.guest_count}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {error ? (
                <p className="text-sm text-destructive" role="alert">{error}</p>
              ) : null}

              <div className="flex gap-4 pt-2">
                <Link href="/vendor/services" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">Cancel</Button>
                </Link>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, MapPin, Users, FileText } from 'lucide-react'

export default function CreateEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    guestCount: '',
    description: '',
    budget: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const guestCount = Number(formData.guestCount)
      const budget = formData.budget ? Number(formData.budget) : undefined

      await apiClient.post('/events', {
        title: formData.name,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        guest_count: guestCount,
        description: formData.description || undefined,
        budget,
      })

      router.push('/organizer/events')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiMessage = (err.response?.data as { message?: string } | undefined)?.message
        setError(apiMessage || 'Unable to create event. Please try again.')
      } else {
        setError('Unable to create event. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <Link href="/organizer/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground mb-8">Fill in the details about your upcoming event</p>

          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Event Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Summer Wedding, Corporate Gala"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-medium">
                    Time *
                  </label>
                  <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location *
                </label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Venue name and address"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="guestCount" className="block text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Expected Guests *
                  </label>
                  <Input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    placeholder="100"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-medium">
                    Budget (Optional)
                  </label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="$5,000"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Event Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell us more about your event, theme, special requirements, etc."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex gap-4 pt-6">
                <Link href="/organizer/events" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-secondary/40 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> After creating your event, you'll be able to search for vendors, send them proposals, and
                manage all the details in one place.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

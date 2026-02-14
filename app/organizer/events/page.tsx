'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Calendar, MapPin, Clock, Users } from 'lucide-react'

type EventStatus = 'Planning' | 'In Progress' | 'Completed' | string

type BackendEvent = {
  id: string | number
  name?: string
  title?: string
  date?: string
  time?: string
  location?: string
  guests?: number
  guest_count?: number
  guests_count?: number
  vendors?: number
  vendor_count?: number
  budget?: number
  status?: string
}

type UiEvent = {
  id: string | number
  name: string
  date: string
  time: string
  location: string
  guests: number
  vendors: number
  budget?: number
  status: EventStatus
}

const EVENT_IMAGE = '/event-placeholder.svg'

function formatDateValue(rawDate?: string) {
  if (!rawDate) return 'TBD'

  const ymdMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (ymdMatch) {
    const [, year, month, day] = ymdMatch
    const localDate = new Date(Number(year), Number(month) - 1, Number(day))
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(localDate)
  }

  const parsed = new Date(rawDate)
  if (Number.isNaN(parsed.getTime())) return rawDate

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed)
}

function formatTimeValue(rawTime?: string) {
  if (!rawTime) return 'TBD'

  const timeMatch = rawTime.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
  if (timeMatch) {
    const hours = Number(timeMatch[1])
    const minutes = Number(timeMatch[2])
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const parsed = new Date(rawTime)
  if (Number.isNaN(parsed.getTime())) return rawTime

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed)
}

function toDisplayStatus(status?: string): EventStatus {
  const value = (status || '').toLowerCase().trim()
  if (value === 'planning') return 'Planning'
  if (value === 'in progress' || value === 'in-progress') return 'In Progress'
  if (value === 'completed') return 'Completed'
  return status || 'Planning'
}

function normalizeEvent(event: BackendEvent): UiEvent {
  return {
    id: event.id,
    name: event.name || event.title || 'Untitled Event',
    date: formatDateValue(event.date),
    time: formatTimeValue(event.time),
    location: event.location || 'TBD',
    guests: event.guests ?? event.guest_count ?? event.guests_count ?? 0,
    vendors: event.vendors ?? event.vendor_count ?? 0,
    budget: event.budget,
    status: toDisplayStatus(event.status),
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<UiEvent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'planning' | 'in-progress' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/events')
        const payload = response.data
        const rawEvents: BackendEvent[] = Array.isArray(payload) ? payload : payload?.data || []
        setEvents(rawEvents.map(normalizeEvent))
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = (err.response?.data as { message?: string } | undefined)?.message
          setError(message || 'Unable to load events. Please try again.')
        } else {
          setError('Unable to load events. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filtered = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || event.status.toLowerCase().replace(' ', '-') === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Events</h1>
              <p className="text-muted-foreground">Create and manage all your events</p>
            </div>
            <Link href="/organizer/events/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Event
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'planning', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as 'all' | 'planning' | 'in-progress' | 'completed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading events...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <Link key={event.id} href={`/organizer/events/${event.id}`}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all h-full">
                    <div className="h-40 overflow-hidden border-b border-border">
                      <img src={EVENT_IMAGE} alt="Event cover" className="h-full w-full object-cover" />
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Guests</p>
                          <p className="font-semibold flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.guests}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Vendors</p>
                          <p className="font-semibold">{event.vendors}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-700'
                              : event.status === 'Planning'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-6">Create your first event to get started</p>
                <Link href="/organizer/events/create">
                  <Button>Create Event</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

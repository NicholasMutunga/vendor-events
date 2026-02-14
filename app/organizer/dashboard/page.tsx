'use client'

import { useState } from 'react'
import Link from 'next/link'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Users, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'

// Mock data
const mockEvents = [
  {
    id: 1,
    name: 'Summer Wedding',
    date: 'June 15, 2024',
    vendors: 3,
    status: 'In Progress',
    color: 'bg-blue-100 text-blue-900',
  },
  {
    id: 2,
    name: 'Corporate Gala',
    date: 'July 22, 2024',
    vendors: 5,
    status: 'Planning',
    color: 'bg-purple-100 text-purple-900',
  },
  {
    id: 3,
    name: 'Birthday Party',
    date: 'August 10, 2024',
    vendors: 2,
    status: 'Completed',
    color: 'bg-green-100 text-green-900',
  },
]

const mockProposals = [
  {
    id: 1,
    vendorName: 'Delicious Catering Co.',
    service: 'Catering',
    event: 'Summer Wedding',
    status: 'Pending Review',
    avatar: '👨‍🍳',
  },
  {
    id: 2,
    vendorName: 'Snapshots Photography',
    service: 'Photography',
    event: 'Summer Wedding',
    status: 'Accepted',
    avatar: '📸',
  },
  {
    id: 3,
    vendorName: 'Elegant Venues',
    service: 'Venue',
    event: 'Corporate Gala',
    status: 'Pending Review',
    avatar: '🏛️',
  },
]

export default function OrganizerDashboard() {
  const user = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {}

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.fullName || 'Organizer'}!</h1>
          <p className="text-muted-foreground">Manage your events, vendors, and proposals all in one place</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: 'Total Events', value: '3', color: 'bg-blue-50 text-blue-600' },
            { icon: Users, label: 'Active Vendors', value: '8', color: 'bg-purple-50 text-purple-600' },
            { icon: MessageSquare, label: 'Messages', value: '12', color: 'bg-green-50 text-green-600' },
            { icon: TrendingUp, label: 'Completion Rate', value: '67%', color: 'bg-orange-50 text-orange-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <div className={`inline-block p-2 rounded-lg mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <Link href="/organizer/events/create">
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Event
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <Link key={event.id} href={`/organizer/events/${event.id}`}>
                    <div className="p-4 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.color}`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.vendors} vendors
                        </div>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/organizer/events">
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Proposals */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 h-full">
              <h2 className="text-xl font-bold mb-6">Recent Proposals</h2>

              <div className="space-y-4">
                {mockProposals.map((proposal) => (
                  <Link key={proposal.id} href={`/organizer/proposals/${proposal.id}`}>
                    <div className="p-3 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">{proposal.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{proposal.vendorName}</p>
                          <p className="text-xs text-muted-foreground truncate">{proposal.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{proposal.event}</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          proposal.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/organizer/proposals">
                <Button variant="outline" className="w-full mt-4">
                  View All Proposals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

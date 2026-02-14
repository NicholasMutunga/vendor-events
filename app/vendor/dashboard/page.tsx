'use client'

import Link from 'next/link'
import VendorSidebar from '@/components/vendor-sidebar'
import { Button } from '@/components/ui/button'
import { Plus, ShoppingBag, Calendar, Star, TrendingUp, Clock, ArrowRight } from 'lucide-react'

// Mock data
const mockServices = [
  {
    id: 1,
    name: 'Full Event Catering',
    category: 'Catering',
    price: '$2,500 - $5,000',
    availability: 'Weekends',
    requests: 5,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Professional Photography',
    category: 'Photography',
    price: '$1,500 - $3,000',
    availability: 'Weekdays & Weekends',
    requests: 8,
    status: 'Active',
  },
]

const mockProposals = [
  {
    id: 1,
    eventName: 'Summer Wedding',
    organizer: 'Sarah Johnson',
    requestType: 'Catering',
    date: 'June 15, 2024',
    status: 'Pending',
    avatar: '👰',
  },
  {
    id: 2,
    eventName: 'Corporate Gala',
    organizer: 'Michael Chen',
    requestType: 'Photography',
    date: 'July 22, 2024',
    status: 'Accepted',
    avatar: '🎩',
  },
  {
    id: 3,
    eventName: 'Product Launch',
    organizer: 'Tech Events Co.',
    requestType: 'Catering',
    date: 'September 5, 2024',
    status: 'Pending',
    avatar: '🚀',
  },
]

export default function VendorDashboard() {
  const user = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {}

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName || 'Vendor'}!</h1>
          <p className="text-muted-foreground">Manage your services, proposals, and client relationships</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: ShoppingBag, label: 'Active Services', value: '2', color: 'bg-purple-50 text-purple-600' },
            { icon: Clock, label: 'Pending Proposals', value: '3', color: 'bg-blue-50 text-blue-600' },
            { icon: Star, label: 'Avg Rating', value: '4.8', color: 'bg-yellow-50 text-yellow-600' },
            { icon: TrendingUp, label: 'Acceptance Rate', value: '85%', color: 'bg-green-50 text-green-600' },
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
          {/* Services */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Services</h2>
                <Link href="/vendor/services/create">
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Service
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockServices.map((service) => (
                  <Link key={service.id} href={`/vendor/services/${service.id}`}>
                    <div className="p-4 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.category}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {service.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Price Range</p>
                          <p className="font-medium">{service.price}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Availability</p>
                          <p className="font-medium text-sm">{service.availability}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Requests</p>
                          <p className="font-medium">{service.requests}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/vendor/services">
                <Button variant="outline" className="w-full mt-4">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Proposals */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 h-full">
              <h2 className="text-xl font-bold mb-6">Incoming Proposals</h2>

              <div className="space-y-4">
                {mockProposals.map((proposal) => (
                  <Link key={proposal.id} href={`/vendor/proposals/${proposal.id}`}>
                    <div className="p-3 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">{proposal.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{proposal.eventName}</p>
                          <p className="text-xs text-muted-foreground truncate">{proposal.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          <p>{proposal.requestType}</p>
                          <p>{proposal.date}</p>
                        </div>
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

              <Link href="/vendor/proposals">
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

'use client'

import Link from 'next/link'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, MapPin, DollarSign, Users, Calendar, Mail, Phone } from 'lucide-react'
import { useState } from 'react'

const mockVendor = {
  id: 1,
  name: 'Delicious Catering Co.',
  category: 'Catering',
  rating: 4.9,
  reviewCount: 127,
  location: 'Downtown',
  priceRange: '$2,500 - $5,000',
  minGuests: 50,
  maxGuests: 500,
  image: '👨‍🍳',
  contact: {
    email: 'info@deliciouscatering.com',
    phone: '(555) 123-4567',
  },
  description: 'We specialize in creating unforgettable culinary experiences for events of all sizes. With over 15 years of experience, our team of professional chefs and servers ensure every detail is perfect. We offer customizable menus, dietary accommodations, and elegant presentation.',
  services: [
    { name: 'Full Catering', description: 'Complete meal service with setup and cleanup' },
    { name: 'Bar Service', description: 'Professional bartenders and beverage selection' },
    { name: 'Setup & Cleanup', description: 'Full venue decoration and post-event cleanup' },
  ],
  galleryItems: ['🍽️', '🥘', '🍷', '🎂'],
  reviews: [
    { author: 'Sarah M.', rating: 5, text: 'Absolutely amazing! The food was delicious and the service was impeccable.' },
    { author: 'John D.', rating: 5, text: 'Best catering company we\'ve worked with. Highly recommended!' },
    { author: 'Emily T.', rating: 4, text: 'Great service and quality. Would use again!' },
  ],
}

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalData, setProposalData] = useState({
    eventName: '',
    eventDate: '',
    guestCount: '',
    notes: '',
  })

  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposalData(prev => ({ ...prev, [name]: value }))
  }

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Proposal sent! The vendor will review it shortly.')
    setProposalData({
      eventName: '',
      eventDate: '',
      guestCount: '',
      notes: '',
    })
    setShowProposalForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Back Button */}
        <Link href="/organizer/vendors" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vendors</span>
        </Link>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <div className="text-7xl">{mockVendor.image}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockVendor.name}</h1>
                <p className="text-muted-foreground text-lg mb-4">{mockVendor.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(mockVendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{mockVendor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({mockVendor.reviewCount} reviews)</span>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {mockVendor.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    {mockVendor.priceRange}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {mockVendor.minGuests} - {mockVendor.maxGuests} guests
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-right">
              <Button onClick={() => setShowProposalForm(true)} size="lg" className="gap-2">
                Send Proposal
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-foreground/90 leading-relaxed">{mockVendor.description}</p>
            </div>

            {/* Services */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Services Offered</h2>
              <div className="space-y-4">
                {mockVendor.services.map((service, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-4 gap-4">
                {mockVendor.galleryItems.map((item, i) => (
                  <div key={i} className="aspect-square bg-secondary rounded-lg flex items-center justify-center text-4xl hover:bg-primary/10 transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
              <div className="space-y-4">
                {mockVendor.reviews.map((review, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${mockVendor.contact.email}`} className="text-primary hover:underline text-sm break-all">
                    {mockVendor.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`tel:${mockVendor.contact.phone}`} className="text-primary hover:underline text-sm">
                    {mockVendor.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-secondary/40 border border-border rounded-xl p-6 space-y-3">
              <h3 className="font-bold">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  Available for weekend events
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  Perfect for groups of {mockVendor.minGuests}+
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  Highly rated by clients
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Proposal Modal */}
        {showProposalForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-2xl font-bold mb-6">Send Proposal to {mockVendor.name}</h2>

              <form onSubmit={handleSendProposal} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Event Name *</label>
                  <input
                    type="text"
                    name="eventName"
                    value={proposalData.eventName}
                    onChange={handleProposalChange}
                    placeholder="e.g., Summer Wedding"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={proposalData.eventDate}
                      onChange={handleProposalChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Expected Guests *</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={proposalData.guestCount}
                      onChange={handleProposalChange}
                      placeholder="100"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Special Requests (Optional)</label>
                  <textarea
                    name="notes"
                    value={proposalData.notes}
                    onChange={handleProposalChange}
                    placeholder="Tell us about any special requirements or preferences..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" type="button" className="flex-1" onClick={() => setShowProposalForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Send Proposal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

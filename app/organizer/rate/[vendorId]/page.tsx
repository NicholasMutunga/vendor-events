'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star } from 'lucide-react'

export default function RateVendorPage({ params }: { params: { vendorId: string } }) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const vendor = {
    name: 'Delicious Catering Co.',
    image: '👨‍🍳',
    event: 'Summer Wedding',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    setSubmitted(true)
    setTimeout(() => {
      router.push('/organizer/dashboard')
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <OrganizerSidebar />
        <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
          <div className="max-w-md mx-auto text-center py-12">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Thank you for rating!</h2>
            <p className="text-muted-foreground mb-6">Your review helps other organizers make better decisions.</p>
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="max-w-2xl bg-card border border-border rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <span className="text-6xl">{vendor.image}</span>
            <div>
              <h1 className="text-2xl font-bold mb-1">{vendor.name}</h1>
              <p className="text-muted-foreground">Event: {vendor.event}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Section */}
            <div>
              <label className="block text-lg font-bold mb-4">How would you rate this vendor?</label>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        value <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {rating === 0 && 'Click to rate'}
                {rating === 1 && 'Poor - Would not recommend'}
                {rating === 2 && 'Fair - Some issues'}
                {rating === 3 && 'Good - Satisfactory service'}
                {rating === 4 && 'Very Good - Highly recommend'}
                {rating === 5 && 'Excellent - Would definitely use again'}
              </p>
            </div>

            {/* Category Ratings */}
            <div className="space-y-6">
              <h3 className="font-bold">Rate these aspects:</h3>
              {[
                { label: 'Quality of Service', name: 'quality' },
                { label: 'Professionalism', name: 'professionalism' },
                { label: 'Communication', name: 'communication' },
                { label: 'Value for Money', name: 'value' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-2">{label}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className="p-1"
                      >
                        <Star className="w-6 h-6 text-muted-foreground hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-lg font-bold mb-4">
                Share your experience (Optional)
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell other event organizers about your experience with this vendor..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">{review.length} / 500 characters</p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <label className="block font-bold">Would you recommend this vendor?</label>
              <div className="space-y-2">
                {[
                  { value: 'yes', label: 'Yes, definitely recommend' },
                  { value: 'maybe', label: 'Maybe, with reservations' },
                  { value: 'no', label: 'No, would not recommend' },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer">
                    <input type="radio" name="recommend" value={value} className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <Link href="/organizer/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  Skip for Now
                </Button>
              </Link>
              <Button type="submit" className="flex-1" disabled={rating === 0}>
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

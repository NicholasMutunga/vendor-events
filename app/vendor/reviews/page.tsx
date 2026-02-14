'use client'

import VendorSidebar from '@/components/vendor-sidebar'
import { Star, TrendingUp } from 'lucide-react'

const mockReviews = [
  {
    id: 1,
    organizer: 'Sarah Johnson',
    event: 'Summer Wedding',
    rating: 5,
    date: 'June 20, 2024',
    text: 'Absolutely amazing! The catering was delicious and the service was impeccable. Our guests loved every dish. The team was professional and accommodating with our dietary requests. Highly recommend!',
    helpful: 24,
  },
  {
    id: 2,
    organizer: 'Michael Chen',
    event: 'Corporate Gala',
    rating: 5,
    date: 'June 15, 2024',
    text: 'Best catering company we\'ve worked with. They went above and beyond to make our corporate event special. The menu was creative, the presentation was beautiful, and the staff was attentive throughout the event.',
    helpful: 18,
  },
  {
    id: 3,
    organizer: 'Emily Torres',
    event: 'Birthday Party',
    rating: 4,
    date: 'June 10, 2024',
    text: 'Great service and quality food. The team was responsive and professional. The only minor issue was a slight delay in setup, but they made up for it with excellent service.',
    helpful: 12,
  },
  {
    id: 4,
    organizer: 'David Lee',
    event: 'Fundraiser Event',
    rating: 5,
    date: 'May 28, 2024',
    text: 'Outstanding experience from start to finish. They understood the vision for our event and delivered perfectly. Would definitely use them again for future events.',
    helpful: 8,
  },
]

const stats = {
  averageRating: 4.75,
  totalReviews: 127,
  ratingBreakdown: {
    5: 95,
    4: 22,
    3: 8,
    2: 2,
    1: 0,
  },
}

export default function VendorReviewsPage() {
  const ratingPercentages = {
    5: (stats.ratingBreakdown[5] / stats.totalReviews) * 100,
    4: (stats.ratingBreakdown[4] / stats.totalReviews) * 100,
    3: (stats.ratingBreakdown[3] / stats.totalReviews) * 100,
    2: (stats.ratingBreakdown[2] / stats.totalReviews) * 100,
    1: (stats.ratingBreakdown[1] / stats.totalReviews) * 100,
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reviews & Ratings</h1>
          <p className="text-muted-foreground">See what clients say about your service</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Rating Summary */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1">
            <h2 className="text-xl font-bold mb-6">Rating Summary</h2>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">{stats.averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {stats.totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${ratingPercentages[rating as keyof typeof ratingPercentages]}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown]}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Box */}
            <div className="mt-6 pt-6 border-t border-border space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Consistently praised for quality</span>
              </div>
              <p className="text-xs text-muted-foreground">
                75% of reviews mention excellent service and professionalism
              </p>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{review.organizer}</h3>
                    <p className="text-sm text-muted-foreground">{review.event}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-foreground/90 mb-4 leading-relaxed">{review.text}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Share
                  </button>
                  <span className="text-xs text-muted-foreground">{review.helpful} found this helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Insights */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Review Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Quality', value: '4.9/5', color: 'bg-blue-50 text-blue-600' },
              { label: 'Professionalism', value: '4.8/5', color: 'bg-purple-50 text-purple-600' },
              { label: 'Communication', value: '4.7/5', color: 'bg-green-50 text-green-600' },
              { label: 'Value for Money', value: '4.6/5', color: 'bg-orange-50 text-orange-600' },
            ].map((insight, i) => (
              <div key={i} className={`p-4 rounded-lg ${insight.color}`}>
                <p className="text-sm font-medium mb-1">{insight.label}</p>
                <p className="text-2xl font-bold">{insight.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Comments */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Frequently Mentioned Strengths</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Excellent food quality and taste',
              'Professional and attentive staff',
              'Great communication and responsiveness',
              'Creative menu options',
              'Beautiful presentation',
              'Accommodates dietary restrictions',
            ].map((strength, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-secondary/40 rounded-lg border border-border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

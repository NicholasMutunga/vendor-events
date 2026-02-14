'use client'

import VendorSidebar from '@/components/vendor-sidebar'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const mockBookings = [
  {
    date: new Date(2024, 5, 15),
    event: 'Summer Wedding',
    organizer: 'Sarah Johnson',
    status: 'confirmed',
  },
  {
    date: new Date(2024, 6, 22),
    event: 'Corporate Gala',
    organizer: 'Michael Chen',
    status: 'confirmed',
  },
  {
    date: new Date(2024, 8, 5),
    event: 'Product Launch',
    organizer: 'Tech Events Co.',
    status: 'pending',
  },
]

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export default function VendorCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showForm, setShowForm] = useState(false)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonth = days.slice(Math.max(0, days.length - firstDay), days.length)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)

  const getBookingForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return mockBookings.find(b => 
      b.date.getFullYear() === date.getFullYear() &&
      b.date.getMonth() === date.getMonth() &&
      b.date.getDate() === date.getDate()
    )
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  const selectedDateBooking = selectedDate ? getBookingForDate(selectedDate.getDate()) : null

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Availability Calendar</h1>
          <p className="text-muted-foreground">Manage your event bookings and availability</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {DAYS.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {blanks.map((_, i) => (
                  <div key={`blank-${i}`} className="aspect-square" />
                ))}
                {days.map(day => {
                  const booking = getBookingForDate(day)
                  const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`aspect-square rounded-lg flex items-center justify-center font-semibold transition-colors border ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : booking
                          ? 'bg-accent/20 border-accent text-accent-foreground'
                          : 'bg-secondary hover:bg-secondary/80 border-border'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm">{day}</div>
                        {booking && <div className="text-xs opacity-75">●</div>}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-border flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-accent/20 rounded border border-accent" />
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary rounded border border-border" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Availability */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Add Availability</h3>
              <Button className="w-full gap-2" onClick={() => setShowForm(!showForm)}>
                <Plus className="w-4 h-4" />
                Block Dates
              </Button>

              {showForm && (
                <div className="mt-4 space-y-3 pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-medium mb-2">From Date</label>
                    <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">To Date</label>
                    <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                      <option>Available</option>
                      <option>Unavailable</option>
                    </select>
                  </div>
                  <Button size="sm" className="w-full">Save</Button>
                </div>
              )}
            </div>

            {/* Selected Date Details */}
            {selectedDate && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                  {DAYS[selectedDate.getDay()]}, {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
                </h3>

                {selectedDateBooking ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                      <p className="text-sm font-semibold mb-1">{selectedDateBooking.event}</p>
                      <p className="text-xs text-muted-foreground mb-2">Organizer: {selectedDateBooking.organizer}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        selectedDateBooking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedDateBooking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">View Details</Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No bookings on this date</p>
                )}
              </div>
            )}

            {/* Upcoming Bookings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Upcoming Bookings</h3>
              <div className="space-y-3">
                {mockBookings.map((booking, i) => (
                  <div key={i} className="p-3 bg-secondary/40 rounded-lg border border-border text-sm">
                    <p className="font-medium mb-1">{booking.event}</p>
                    <p className="text-xs text-muted-foreground mb-1">{booking.organizer}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

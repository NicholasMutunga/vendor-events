'use client'

import { useState } from 'react'
import VendorSidebar from '@/components/vendor-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Bell, Shield, Briefcase, MapPin, Globe } from 'lucide-react'

export default function VendorSettingsPage() {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'John Smith',
    businessName: 'Delicious Catering Co.',
    email: 'john@deliciouscatering.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'www.deliciouscatering.com',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your vendor account and business information</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Business Profile */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Business Profile
              </h2>
              <Button
                variant={editMode ? 'outline' : 'default'}
                size="sm"
                onClick={() => editMode ? handleSave() : setEditMode(true)}
              >
                {editMode ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>

            <div className="space-y-4">
              {[
                { id: 'requests', label: 'New event requests', enabled: true },
                { id: 'messages', label: 'Messages from organizers', enabled: true },
                { id: 'bookings', label: 'Booking confirmations', enabled: true },
                { id: 'reminders', label: 'Event day reminders', enabled: true },
                { id: 'reviews', label: 'New reviews posted', enabled: true },
                { id: 'tips', label: 'Tips and recommendations', enabled: false },
              ].map(({ id, label, enabled }) => (
                <label key={id} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={enabled}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </h2>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Shield className="w-4 h-4" />
                Two-Factor Authentication
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-bold mb-3 text-sm">Profile Visibility</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input type="radio" name="visibility" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">Visible to all organizers</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="visibility" className="w-4 h-4" />
                  <span className="text-sm">Hidden from public listings</span>
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Account Actions</h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full" size="sm">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Delete Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Last login: Today at 3:45 PM
              <br />
              Member since: March 15, 2023
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

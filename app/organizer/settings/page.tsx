'use client'

import { useState } from 'react'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Bell, Shield, Mail, Phone } from 'lucide-react'

export default function OrganizerSettingsPage() {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Event Dreams Inc.',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
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
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Profile Information</h2>
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
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  name="company"
                  value={formData.company}
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
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  name="location"
                  value={formData.location}
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
                { id: 'proposals', label: 'New proposals from vendors', enabled: true },
                { id: 'messages', label: 'Messages from vendors', enabled: true },
                { id: 'confirmations', label: 'Event confirmations', enabled: true },
                { id: 'reminders', label: 'Event reminders', enabled: true },
                { id: 'updates', label: 'Service updates and tips', enabled: false },
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
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="w-4 h-4" />
                Email Preferences
              </Button>
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
              Last login: Today at 2:30 PM
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

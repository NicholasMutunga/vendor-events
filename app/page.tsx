'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, Calendar, MessageSquare } from 'lucide-react'

export default function LandingPage() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">V</div>
            <span className="font-bold text-lg">VendorHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/50 text-accent-foreground">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">The Modern Vendor Marketplace</span>
          </div> */}

          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            Connect Events with the Perfect Vendors
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            VendorHub bridges event organizers and service providers. Find trusted vendors, send proposals, manage calendars, and build lasting relationships - all in one platform.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup/organizer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 text-base gap-2 bg-primary hover:bg-primary/90">
                I'm an Organizer
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/signup/vendor" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 text-base gap-2">
                I'm a Vendor
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Both Sides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage vendor relationships and event services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                For Organizers
              </h3>
              <ul className="space-y-4">
                {[
                  'Create and manage multiple events',
                  'Browse vendors by service category',
                  'Send proposals with custom details',
                  'Track proposal status in real-time',
                  'Message vendors to negotiate',
                  'Rate vendors after events',
                  'Build trusted vendor networks',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-accent" />
                For Vendors
              </h3>
              <ul className="space-y-4">
                {[
                  'Showcase multiple service offerings',
                  'Manage availability calendar',
                  'Review incoming proposals',
                  'Accept or counter proposals',
                  'Real-time messaging with organizers',
                  'Rate organizers based on experience',
                  'Build your reputation and portfolio',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Seamless Communication',
                description: 'Send messages directly with vendors without ever leaving the platform',
              },
              {
                icon: Calendar,
                title: 'Availability Management',
                description: 'Vendors display their availability; organizers see real-time calendar conflicts',
              },
              {
                icon: Users,
                title: 'Trust & Ratings',
                description: 'Build reputation through verified ratings and reviews from both parties',
              },
            ].map((benefit, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Vendor Experience?</h2>
          <p className="text-lg opacity-90">
            Join hundreds of organizers and vendors already using VendorHub to streamline their event planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup/organizer">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Started as Organizer
              </Button>
            </Link>
            <Link href="/signup/vendor">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Join as Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">V</div>
                <span className="font-bold text-lg">VendorHub</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                VendorHub connects event organizers and service providers through one reliable marketplace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
                </li>
                <li>
                  <Link href="/signup/organizer" className="hover:text-foreground transition-colors">Organizer Signup</Link>
                </li>
                <li>
                  <Link href="/signup/vendor" className="hover:text-foreground transition-colors">Vendor Signup</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                </li>
                <li>
                  <a href="mailto:support@vendorhub.com" className="hover:text-foreground transition-colors">support@vendorhub.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/60 text-sm text-muted-foreground flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p>Copyright {currentYear} VendorHub. All rights reserved.</p>
            <p>Connecting events with trusted vendors.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import OrganizerSidebar from '@/components/organizer-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Search, Paperclip, MoreVertical } from 'lucide-react'

const mockConversations = [
  {
    id: 1,
    vendor: 'Delicious Catering Co.',
    avatar: '👨‍🍳',
    lastMessage: 'Great! We can accommodate that dietary requirement.',
    timestamp: '2 minutes ago',
    unread: 2,
    messages: [
      { sender: 'vendor', text: 'Hello! Thanks for the proposal.' },
      { sender: 'you', text: 'Hi! Are you available for June 15?' },
      { sender: 'vendor', text: 'Great! We can accommodate that dietary requirement.' },
    ],
  },
  {
    id: 2,
    vendor: 'Snapshots Photography',
    avatar: '📸',
    lastMessage: 'Looking forward to working with you!',
    timestamp: '1 hour ago',
    unread: 0,
    messages: [
      { sender: 'vendor', text: 'We offer several package options.' },
      { sender: 'you', text: 'What packages do you have?' },
      { sender: 'vendor', text: 'Looking forward to working with you!' },
    ],
  },
  {
    id: 3,
    vendor: 'Elegant Venues',
    avatar: '🏛️',
    lastMessage: 'Yes, we have availability!',
    timestamp: '3 hours ago',
    unread: 0,
    messages: [
      { sender: 'you', text: 'Is your venue available on July 20?' },
      { sender: 'vendor', text: 'Yes, we have availability!' },
    ],
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')

  const filtered = mockConversations.filter(conv =>
    conv.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      // Mock send message
      alert('Message sent!')
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)] gap-6">
          {/* Conversations List */}
          <div className="md:w-80 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filtered.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 border-b border-border hover:bg-secondary/50 transition-colors text-left ${
                    selectedConversation.id === conversation.id ? 'bg-secondary/80 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{conversation.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{conversation.vendor}</h3>
                        {conversation.unread > 0 && (
                          <span className="inline-block w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center flex-shrink-0">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedConversation.avatar}</span>
                <div>
                  <h3 className="font-bold">{selectedConversation.vendor}</h3>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {selectedConversation.messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'you'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="pr-12"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

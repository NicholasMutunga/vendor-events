'use client'

import { useState } from 'react'
import VendorSidebar from '@/components/vendor-sidebar'
import { Input } from '@/components/ui/input'
import { Send, Search, Paperclip, MoreVertical } from 'lucide-react'

const mockConversations = [
  {
    id: 1,
    organizer: 'Sarah Johnson',
    avatar: '👰',
    event: 'Summer Wedding',
    lastMessage: 'Perfect! See you on June 15th.',
    timestamp: '5 minutes ago',
    unread: 0,
    messages: [
      { sender: 'organizer', text: 'Hi! I love your catering menu.' },
      { sender: 'you', text: 'Thank you! We specialize in Italian cuisine.' },
      { sender: 'organizer', text: 'Perfect! See you on June 15th.' },
    ],
  },
  {
    id: 2,
    organizer: 'Michael Chen',
    avatar: '🎩',
    event: 'Corporate Gala',
    lastMessage: 'Can you do candid shots throughout the event?',
    timestamp: '2 hours ago',
    unread: 1,
    messages: [
      { sender: 'you', text: 'I\'d be happy to photograph your gala.' },
      { sender: 'organizer', text: 'Can you do candid shots throughout the event?' },
    ],
  },
  {
    id: 3,
    organizer: 'Tech Events Co.',
    avatar: '🚀',
    event: 'Product Launch',
    lastMessage: 'Great! We\'ll confirm the final details soon.',
    timestamp: '6 hours ago',
    unread: 0,
    messages: [
      { sender: 'organizer', text: 'We need catering for 300+ guests.' },
      { sender: 'you', text: 'We can definitely handle that!' },
      { sender: 'organizer', text: 'Great! We\'ll confirm the final details soon.' },
    ],
  },
]

export default function VendorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')

  const filtered = mockConversations.filter(conv =>
    conv.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.event.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      alert('Message sent!')
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebar />

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
                        <h3 className="font-semibold truncate">{conversation.organizer}</h3>
                        {conversation.unread > 0 && (
                          <span className="inline-block w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center flex-shrink-0">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.event}</p>
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
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedConversation.avatar}</span>
                  <div>
                    <h3 className="font-bold">{selectedConversation.organizer}</h3>
                    <p className="text-xs text-muted-foreground">{selectedConversation.event}</p>
                  </div>
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

/**
 * Dreams Page
 * Dream recording, analysis, and interpretation features
 */

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { useDreams, useCreateDream, useUpdateDream, useDeleteDream } from '@/lib/hooks/use-api'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Input } from '@/components/atoms/Input'
import { Navigation } from '@/components/organisms/Navigation'
import { trackFeatureUsage } from '@/lib/monitoring/analytics'

export default function DreamsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingDream, setEditingDream] = useState(null)
  const user = useAppStore((state) => state.user)
  
  const { data: dreams, isLoading } = useDreams(user?.id || '')
  const createDream = useCreateDream()
  const updateDream = useUpdateDream()
  const deleteDream = useDeleteDream()

  useEffect(() => {
    if (user) {
      trackFeatureUsage('dreams_page_view', user.id)
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access dream features</h1>
          <Button onClick={() => window.location.href = '/auth/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="lg:pl-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Dream Journal 💭
                </h1>
                <p className="text-muted-foreground">
                  Record and analyze your dreams to unlock hidden insights.
                </p>
              </div>
              <Button onClick={() => setShowForm(true)}>
                Record New Dream
              </Button>
            </div>
          </div>

          {/* Dream Form Modal */}
          {showForm && (
            <DreamForm 
              onClose={() => setShowForm(false)}
              onSubmit={createDream.mutate}
              loading={createDream.isPending}
            />
          )}

          {/* Dreams List */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dreams?.map((dream: any) => (
                <DreamCard 
                  key={dream.id}
                  dream={dream}
                  onEdit={setEditingDream}
                  onDelete={deleteDream.mutate}
                />
              ))}
            </div>
          )}

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {dreams?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Dreams</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Analysis Complete</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.2</div>
              <div className="text-sm text-muted-foreground">Avg. Clarity</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DreamForm({ onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    emotions: '',
    symbols: '',
    clarity: 5
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      userId: 'user-1',
      data: formData
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Record New Dream</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Dream Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Give your dream a title"
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dream Content
            </label>
            <textarea
              className="w-full min-h-[200px] p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Describe your dream in detail..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emotions Felt"
              value={formData.emotions}
              onChange={(e) => setFormData({ ...formData, emotions: e.target.value })}
              placeholder="e.g., fear, joy, confusion"
            />

            <Input
              label="Key Symbols"
              value={formData.symbols}
              onChange={(e) => setFormData({ ...formData, symbols: e.target.value })}
              placeholder="e.g., water, flying, animals"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dream Clarity (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.clarity}
              onChange={(e) => setFormData({ ...formData, clarity: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Vague</span>
              <span>{formData.clarity}</span>
              <span>Very Clear</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading}>
              Save Dream
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DreamCard({ dream, onEdit, onDelete }: any) {
  const [showAnalysis, setShowAnalysis] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{dream.title}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(dream.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(dream)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(dream.id)}>
            Delete
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {dream.content}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Badge variant="outline">Clarity: {dream.clarity}/10</Badge>
          {dream.emotions && (
            <Badge variant="secondary">{dream.emotions}</Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAnalysis(!showAnalysis)}
        >
          {showAnalysis ? 'Hide' : 'Analyze'}
        </Button>
      </div>

      {showAnalysis && (
        <div className="border-t border-border pt-4">
          <h4 className="font-semibold mb-2">AI Analysis</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Symbols:</strong> {dream.symbols || 'Water, flying, animals'}</p>
            <p><strong>Interpretation:</strong> This dream suggests a desire for freedom and emotional release. The water symbolizes your subconscious mind, while flying represents your aspirations.</p>
            <p><strong>Recommendation:</strong> Consider journaling about your current life situation and any feelings of being trapped or restricted.</p>
          </div>
        </div>
      )}
    </div>
  )
}
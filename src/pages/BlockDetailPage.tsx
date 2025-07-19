import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Block, Ticket } from '@/types'
import { BlockDashboard } from '@/components/Blocks'
import { TicketForm } from '@/components/Tickets'
import { ArrowLeft } from 'lucide-react'

// Mock data imports (replace with API calls)
import blocksData from '@/data/blocks.json'
import ticketsData from '@/data/tickets.json'

export default function BlockDetailPage() {
  const { blockId } = useParams<{ blockId: string }>()
  const navigate = useNavigate()
  
  const [blocks] = useState<Block[]>(blocksData as Block[])
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData as Ticket[])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const block = blocks.find(b => b.id === blockId)

  useEffect(() => {
    if (!block) {
      // If block is not found, redirect to blocks page
      navigate('/blocks', { replace: true })
    }
  }, [block, navigate])

  const handleCreateTicket = async (ticketData: Partial<Ticket>) => {
    if (!block) return
    
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTicket: Ticket = {
        id: `ticket-${Date.now()}`,
        ranchId: 'ranch-don-enrique',
        blockId: block.id,
        status: 'open',
        createdBy: 'manager-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...ticketData
      } as Ticket

      setTickets(prev => [newTicket, ...prev])
      setShowCreateForm(false)
    } catch (error) {
      console.error('Failed to create ticket:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!block) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Block not found</h2>
          <p className="text-gray-500 mb-4">The requested block could not be found.</p>
          <button
            onClick={() => navigate('/blocks')}
            className="text-ranch-600 hover:text-ranch-700 font-medium"
          >
            Return to Blocks →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/blocks')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blocks</span>
        </button>
        <div className="h-4 w-px bg-gray-300" />
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li className="text-gray-500">Blocks</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-gray-900">{block.name}</li>
          </ol>
        </nav>
      </div>

      {/* Block Dashboard */}
      <BlockDashboard
        block={block}
        tickets={tickets}
        onCreateTicket={() => setShowCreateForm(true)}
      />

      {/* Create Ticket Form */}
      {showCreateForm && (
        <TicketForm
          blocks={[block]} // Pre-select current block
          onSave={handleCreateTicket}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
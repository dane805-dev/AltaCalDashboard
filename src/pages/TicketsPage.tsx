import { useState, useMemo } from 'react'
import { Block, Ticket } from '@/types'
import { TicketCard, TicketForm, TicketFilters, TicketFilters as TFilters } from '@/components/Tickets'
import { Plus, SortAsc, SortDesc } from 'lucide-react'

// Mock data imports (replace with API calls)
import blocksData from '@/data/blocks.json'
import ticketsData from '@/data/tickets.json'

type SortField = 'updatedAt' | 'dueDate' | 'priority' | 'title'
type SortDirection = 'asc' | 'desc'

export default function TicketsPage() {
  const [blocks] = useState<Block[]>(blocksData as Block[])
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData as Ticket[])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [filters, setFilters] = useState<TFilters>({
    search: '',
    status: 'all',
    type: 'all',
    priority: 'all',
    blockId: 'all',
    assignedTo: 'all'
  })

  const [sorting, setSorting] = useState<{
    field: SortField
    direction: SortDirection
  }>({
    field: 'updatedAt',
    direction: 'desc'
  })

  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = !filters.search || 
        ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))

      const matchesStatus = filters.status === 'all' || ticket.status === filters.status
      const matchesType = filters.type === 'all' || ticket.type === filters.type
      const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority
      const matchesBlock = filters.blockId === 'all' || ticket.blockId === filters.blockId
      const matchesAssignee = filters.assignedTo === 'all' || ticket.assignedTo === filters.assignedTo

      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesBlock && matchesAssignee
    })

    // Sort tickets
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sorting.field) {
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          break
        case 'dueDate':
          const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
          const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
          comparison = aDue - bDue
          break
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
      }

      return sorting.direction === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [tickets, filters, sorting])

  const handleSort = (field: SortField) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleCreateTicket = async (ticketData: Partial<Ticket>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTicket: Ticket = {
        id: `ticket-${Date.now()}`,
        ranchId: 'ranch-don-enrique',
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

  const getSortIcon = (field: SortField) => {
    if (sorting.field !== field) return null
    return sorting.direction === 'asc' ? 
      <SortAsc className="h-4 w-4" /> : 
      <SortDesc className="h-4 w-4" />
  }

  const statusCounts = {
    all: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    pending_review: tickets.filter(t => t.status === 'pending_review').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    on_hold: tickets.filter(t => t.status === 'on_hold').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-gray-600">
            {filteredAndSortedTickets.length} of {tickets.length} tasks
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-ranch-500 text-white rounded-lg hover:bg-ranch-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilters(prev => ({ ...prev, status: status as any }))}
            className={`p-4 rounded-lg border transition-colors ${
              filters.status === status
                ? 'bg-ranch-50 border-ranch-200 text-ranch-700'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="text-lg font-semibold">{count}</div>
            <div className="text-xs text-gray-600 capitalize">
              {status === 'all' ? 'Total' : status.replace('_', ' ')}
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <TicketFilters
        filters={filters}
        onFiltersChange={setFilters}
        blocks={blocks.map(b => ({ id: b.id, name: b.name }))}
      />

      {/* Sort Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex space-x-2">
            {[
              { field: 'updatedAt' as SortField, label: 'Updated' },
              { field: 'dueDate' as SortField, label: 'Due Date' },
              { field: 'priority' as SortField, label: 'Priority' },
              { field: 'title' as SortField, label: 'Title' }
            ].map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                  sorting.field === field
                    ? 'bg-ranch-100 text-ranch-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{label}</span>
                {getSortIcon(field)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredAndSortedTickets.length > 0 ? (
          filteredAndSortedTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              showBlockName={true}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-2">
              <TicketIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {Object.values(filters).some(f => f !== 'all' && f !== '') 
                ? 'Try adjusting your filters to see more tasks.'
                : 'Create your first task to get started.'
              }
            </p>
            {Object.values(filters).some(f => f !== 'all' && f !== '') && (
              <button
                onClick={() => setFilters({
                  search: '',
                  status: 'all',
                  type: 'all',
                  priority: 'all',
                  blockId: 'all',
                  assignedTo: 'all'
                })}
                className="text-ranch-600 hover:text-ranch-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <TicketForm
          blocks={blocks}
          onSave={handleCreateTicket}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
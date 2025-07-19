import { useState } from 'react'
import { TicketStatus, TicketType, TicketPriority } from '@/types'
import { cn } from '@/lib/utils'
import { Filter, X, Search } from 'lucide-react'

export interface TicketFilters {
  search: string
  status: TicketStatus | 'all'
  type: TicketType | 'all'
  priority: TicketPriority | 'all'
  blockId: string | 'all'
  assignedTo: string | 'all'
}

interface TicketFiltersProps {
  filters: TicketFilters
  onFiltersChange: (filters: TicketFilters) => void
  blocks: Array<{ id: string; name: string }>
  className?: string
}

export default function TicketFiltersComponent({ 
  filters, 
  onFiltersChange, 
  blocks,
  className 
}: TicketFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = (key: keyof TicketFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      type: 'all',
      priority: 'all',
      blockId: 'all',
      assignedTo: 'all'
    })
  }

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.type !== 'all' ||
    filters.priority !== 'all' ||
    filters.blockId !== 'all' ||
    filters.assignedTo !== 'all'

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'on_hold', label: 'On Hold' }
  ]

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'irrigation', label: '💧 Irrigation' },
    { value: 'fertilization', label: '🌱 Fertilization' },
    { value: 'pest_control', label: '🛡️ Pest Control' },
    { value: 'pruning', label: '✂️ Pruning' },
    { value: 'harvest', label: '🥑 Harvest' },
    { value: 'planting', label: '🌿 Planting' },
    { value: 'maintenance', label: '🔧 Maintenance' },
    { value: 'inspection', label: '🔍 Inspection' },
    { value: 'other', label: '📋 Other' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
      {/* Search and filter toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500 focus:border-transparent"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
              showFilters || hasActiveFilters
                ? 'bg-ranch-50 text-ranch-700 border-ranch-200'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            )}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-ranch-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => updateFilter('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Block */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block
              </label>
              <select
                value={filters.blockId}
                onChange={(e) => updateFilter('blockId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                <option value="all">All Blocks</option>
                {blocks.map(block => (
                  <option key={block.id} value={block.id}>
                    {block.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To
              </label>
              <select
                value={filters.assignedTo}
                onChange={(e) => updateFilter('assignedTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                <option value="all">All Workers</option>
                <option value="worker-001">Worker 001</option>
                <option value="worker-002">Worker 002</option>
                <option value="worker-003">Worker 003</option>
                <option value="worker-004">Worker 004</option>
                <option value="manager-001">Manager 001</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="p-3 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700">
              Filters active
              {filters.search && ` • Search: "${filters.search}"`}
              {filters.status !== 'all' && ` • Status: ${filters.status}`}
              {filters.type !== 'all' && ` • Type: ${filters.type}`}
              {filters.priority !== 'all' && ` • Priority: ${filters.priority}`}
              {filters.blockId !== 'all' && ` • Block: ${blocks.find(b => b.id === filters.blockId)?.name || filters.blockId}`}
              {filters.assignedTo !== 'all' && ` • Assigned: ${filters.assignedTo}`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
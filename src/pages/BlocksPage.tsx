import { useState } from 'react'
import { Block, Ticket } from '@/types'
import { BlockCard } from '@/components/Blocks'
import { RanchMap } from '@/components/Map'
import { formatAcres } from '@/lib/utils'
import { Grid, Map, Filter, Search } from 'lucide-react'

// Mock data imports (replace with API calls)
import blocksData from '@/data/blocks.json'
import ticketsData from '@/data/tickets.json'

type ViewMode = 'grid' | 'map'
type SortOption = 'name' | 'area' | 'planted' | 'status'

export default function BlocksPage() {
  const [blocks] = useState<Block[]>(blocksData as Block[])
  const [tickets] = useState<Ticket[]>(ticketsData as Ticket[])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedBlockId, setSelectedBlockId] = useState<string>()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter and sort blocks
  const filteredBlocks = blocks.filter(block => {
    const matchesSearch = !searchQuery || 
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.metadata.variety?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.soilType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || block.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const sortedBlocks = [...filteredBlocks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'area':
        return b.area - a.area
      case 'planted':
        return new Date(a.plantingDate).getTime() - new Date(b.plantingDate).getTime()
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  // Calculate block statistics
  const totalArea = blocks.reduce((sum, block) => sum + block.area, 0)
  const activeBlocks = blocks.filter(block => block.status === 'active').length
  const avgArea = totalArea / blocks.length

  const statusCounts = {
    all: blocks.length,
    active: blocks.filter(b => b.status === 'active').length,
    maintenance: blocks.filter(b => b.status === 'maintenance').length,
    resting: blocks.filter(b => b.status === 'resting').length,
    replanting: blocks.filter(b => b.status === 'replanting').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Block Management</h1>
          <p className="text-gray-600">
            {filteredBlocks.length} of {blocks.length} blocks • {formatAcres(totalArea)} total
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'map'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="h-4 w-4" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Blocks</h3>
          <p className="text-2xl font-bold text-gray-900">{blocks.length}</p>
          <p className="text-sm text-gray-500">{formatAcres(totalArea)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Active Blocks</h3>
          <p className="text-2xl font-bold text-green-600">{activeBlocks}</p>
          <p className="text-sm text-gray-500">{((activeBlocks / blocks.length) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Average Size</h3>
          <p className="text-2xl font-bold text-gray-900">{avgArea.toFixed(1)}</p>
          <p className="text-sm text-gray-500">acres per block</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Active Tasks</h3>
          <p className="text-2xl font-bold text-blue-600">
            {tickets.filter(t => ['open', 'in_progress'].includes(t.status)).length}
          </p>
          <p className="text-sm text-gray-500">across all blocks</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="active">Active ({statusCounts.active})</option>
              <option value="maintenance">Maintenance ({statusCounts.maintenance})</option>
              <option value="resting">Resting ({statusCounts.resting})</option>
              <option value="replanting">Replanting ({statusCounts.replanting})</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ranch-500"
            >
              <option value="name">Sort by Name</option>
              <option value="area">Sort by Area</option>
              <option value="planted">Sort by Planting Date</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlocks.map(block => (
            <BlockCard 
              key={block.id} 
              block={block}
              className={selectedBlockId === block.id ? 'ring-2 ring-ranch-500' : ''}
            />
          ))}
        </div>
      ) : (
        /* Map View */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <RanchMap
              blocks={sortedBlocks}
              selectedBlockId={selectedBlockId}
              onBlockSelect={setSelectedBlockId}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Block Details</h3>
            {selectedBlockId ? (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {(() => {
                  const block = blocks.find(b => b.id === selectedBlockId)
                  if (!block) return <p className="text-gray-500">Block not found</p>
                  
                  const blockTickets = tickets.filter(t => 
                    t.blockId === block.id && 
                    ['open', 'in_progress'].includes(t.status)
                  )

                  return (
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{block.name}</h4>
                        <p className="text-sm text-gray-500">{formatAcres(block.area)}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium capitalize">{block.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Crop:</span>
                          <span className="font-medium">{block.metadata.variety || block.cropType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trees:</span>
                          <span className="font-medium">{block.metadata.trees || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Tasks:</span>
                          <span className="font-medium">{blockTickets.length}</span>
                        </div>
                      </div>

                      {block.metadata.notes && (
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600">{block.metadata.notes}</p>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-sm text-gray-500">Click on a block to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {sortedBlocks.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-2">
            <Grid className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No blocks found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to see more blocks.
          </p>
        </div>
      )}
    </div>
  )
}
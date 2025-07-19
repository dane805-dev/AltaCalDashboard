import { Block, Ticket } from '@/types'
import { formatDate, formatAcres, getTypeIcon } from '@/lib/utils'
import { Calendar, MapPin, Droplets, TreePine, Clock, User, Plus } from 'lucide-react'
import { TicketCard } from '@/components/Tickets'

interface BlockDashboardProps {
  block: Block
  tickets: Ticket[]
  onCreateTicket?: () => void
}

export default function BlockDashboard({ block, tickets, onCreateTicket }: BlockDashboardProps) {
  const recentTickets = tickets
    .filter(ticket => ticket.blockId === block.id)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const activeTickets = recentTickets.filter(ticket => 
    ['open', 'in_progress', 'pending_review'].includes(ticket.status)
  )

  const completedTickets = recentTickets.filter(ticket => 
    ticket.status === 'completed'
  )

  return (
    <div className="space-y-6">
      {/* Block Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{block.name}</h1>
            <p className="text-gray-600 mb-4">Rancho Don Enrique</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Block Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{formatAcres(block.area)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-gray-400" />
                    <span className="capitalize">{block.irrigationType} irrigation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Planted {formatDate(block.plantingDate)}</span>
                  </div>
                  {block.metadata.trees && (
                    <div className="flex items-center space-x-2">
                      <TreePine className="h-4 w-4 text-gray-400" />
                      <span>{block.metadata.trees} trees</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Crop Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Crop Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium capitalize">{block.cropType}</span>
                  </div>
                  {block.metadata.variety && (
                    <div>
                      <span className="text-gray-600">Variety:</span>
                      <span className="ml-2 font-medium">{block.metadata.variety}</span>
                    </div>
                  )}
                  {block.metadata.rootstock && (
                    <div>
                      <span className="text-gray-600">Rootstock:</span>
                      <span className="ml-2 font-medium">{block.metadata.rootstock}</span>
                    </div>
                  )}
                  {block.metadata.spacing && (
                    <div>
                      <span className="text-gray-600">Spacing:</span>
                      <span className="ml-2 font-medium">{block.metadata.spacing}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Soil:</span>
                    <span className="ml-2 font-medium">{block.soilType}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  {block.lastHarvest && (
                    <div>
                      <span className="text-gray-600">Last Harvest:</span>
                      <span className="ml-2 font-medium">{formatDate(block.lastHarvest)}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium capitalize">{block.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Active Tickets:</span>
                    <span className="ml-2 font-medium">{activeTickets.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="ml-2 font-medium">{formatDate(block.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {block.metadata.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                <p className="text-sm text-gray-600">{block.metadata.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Tickets */}
      {activeTickets.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Tasks</h2>
            {onCreateTicket && (
              <button
                onClick={onCreateTicket}
                className="flex items-center space-x-2 px-3 py-2 bg-ranch-500 text-white rounded-lg hover:bg-ranch-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Task</span>
              </button>
            )}
          </div>
          <div className="space-y-3">
            {activeTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} compact />
            ))}
          </div>
        </div>
      )}

      {/* Recent Completed Tasks */}
      {completedTickets.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Completed Tasks</h2>
          <div className="space-y-3">
            {completedTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} compact />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['irrigation', 'fertilization', 'pest_control', 'inspection'].map(type => (
            <button
              key={type}
              onClick={onCreateTicket}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2">{getTypeIcon(type)}</span>
              <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
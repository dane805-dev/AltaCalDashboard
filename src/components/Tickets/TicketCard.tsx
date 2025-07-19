import { Link } from 'react-router-dom'
import { Ticket } from '@/types'
import { formatDate, formatRelativeDate, getPriorityColor, getStatusColor, getTypeIcon, cn } from '@/lib/utils'
import { Calendar, Clock, User, MapPin } from 'lucide-react'

interface TicketCardProps {
  ticket: Ticket
  compact?: boolean
  showBlockName?: boolean
  className?: string
}

export default function TicketCard({ 
  ticket, 
  compact = false, 
  showBlockName = true,
  className 
}: TicketCardProps) {
  return (
    <div className={cn(
      'bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{getTypeIcon(ticket.type)}</span>
            <h3 className={cn(
              'font-semibold text-gray-900 truncate',
              compact ? 'text-sm' : 'text-base'
            )}>
              {ticket.title}
            </h3>
          </div>

          {!compact && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {ticket.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full border',
              getPriorityColor(ticket.priority)
            )}>
              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
            </span>
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full border',
              getStatusColor(ticket.status)
            )}>
              {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {ticket.type.replace('_', ' ')}
            </span>
          </div>

          <div className={cn(
            'flex flex-wrap items-center gap-4 text-xs text-gray-500',
            compact ? 'gap-2' : 'gap-4'
          )}>
            {showBlockName && ticket.blockId && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Block {ticket.blockId.split('-').pop()}</span>
              </div>
            )}

            {ticket.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Due {formatRelativeDate(ticket.dueDate)}</span>
              </div>
            )}

            {ticket.estimatedHours && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{ticket.estimatedHours}h estimated</span>
              </div>
            )}

            {ticket.assignedTo && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>Assigned</span>
              </div>
            )}

            <span>Updated {formatRelativeDate(ticket.updatedAt)}</span>
          </div>

          {!compact && ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {ticket.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                >
                  {tag}
                </span>
              ))}
              {ticket.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded">
                  +{ticket.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action menu placeholder */}
        <div className="ml-4 flex-shrink-0">
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
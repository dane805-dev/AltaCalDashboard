import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Block, Ticket, DashboardStats } from '@/types'
import { RanchMap } from '@/components/Map'
import { TicketCard } from '@/components/Tickets'
import { BlockCard } from '@/components/Blocks'
import { formatAcres } from '@/lib/utils'
import { MapPin, Ticket as TicketIcon, Calendar, TrendingUp, Plus } from 'lucide-react'

// Mock data imports (replace with API calls)
import blocksData from '@/data/blocks.json'
import ticketsData from '@/data/tickets.json'

export default function OverviewPage() {
  const [blocks] = useState<Block[]>(blocksData as Block[])
  const [tickets] = useState<Ticket[]>(ticketsData as Ticket[])
  const [selectedBlockId, setSelectedBlockId] = useState<string>()

  // Calculate dashboard stats
  const stats: DashboardStats = {
    ranchId: 'ranch-don-enrique',
    totalBlocks: blocks.length,
    activeTickets: tickets.filter(t => ['open', 'in_progress'].includes(t.status)).length,
    completedTicketsThisMonth: tickets.filter(t => 
      t.status === 'completed' && 
      new Date(t.completedDate || '').getMonth() === new Date().getMonth()
    ).length,
    upcomingTasks: tickets.filter(t => 
      t.dueDate && 
      new Date(t.dueDate) > new Date() &&
      new Date(t.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length,
    totalAcres: blocks.reduce((sum, block) => sum + block.area, 0)
  }

  const recentTickets = tickets
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const priorityTickets = tickets
    .filter(t => ['open', 'in_progress'].includes(t.status))
    .filter(t => ['urgent', 'high'].includes(t.priority))
    .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ranch Overview</h1>
          <p className="text-gray-600">Rancho Don Enrique Dashboard</p>
        </div>
        <Link
          to="/tickets"
          className="flex items-center space-x-2 px-4 py-2 bg-ranch-500 text-white rounded-lg hover:bg-ranch-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blocks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBlocks}</p>
            </div>
            <div className="h-12 w-12 bg-ranch-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-ranch-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {formatAcres(stats.totalAcres)} total
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTickets}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TicketIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {priorityTickets.length} high priority
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTicketsThisMonth}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Tasks completed
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingTasks}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Due this week
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ranch Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Ranch Map</h2>
              <Link
                to="/blocks"
                className="text-sm text-ranch-600 hover:text-ranch-700 font-medium"
              >
                View All Blocks →
              </Link>
            </div>
            <RanchMap
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onBlockSelect={setSelectedBlockId}
              className="border-0"
            />
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="space-y-6">
          {priorityTickets.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Priority Tasks</h2>
                <Link
                  to="/tickets"
                  className="text-sm text-ranch-600 hover:text-ranch-700 font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {priorityTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    compact
                    className="border-0 bg-gray-50"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Block Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Block Status</h2>
            </div>
            <div className="space-y-3">
              {blocks.slice(0, 4).map(block => (
                <div key={block.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{block.name}</p>
                    <p className="text-sm text-gray-500">{formatAcres(block.area)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm capitalize text-gray-600">{block.status}</p>
                    <p className="text-xs text-gray-500">
                      {tickets.filter(t => t.blockId === block.id && ['open', 'in_progress'].includes(t.status)).length} active tasks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Link
            to="/tickets"
            className="text-sm text-ranch-600 hover:text-ranch-700 font-medium"
          >
            View All Activity →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              compact
              className="border-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
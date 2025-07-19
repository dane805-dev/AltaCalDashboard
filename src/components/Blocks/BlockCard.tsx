import { Link } from 'react-router-dom'
import { Block } from '@/types'
import { formatDate, formatAcres, cn } from '@/lib/utils'
import { Calendar, MapPin, Droplets, TreePine } from 'lucide-react'

interface BlockCardProps {
  block: Block
  className?: string
  showRanchName?: boolean
}

export default function BlockCard({ block, className, showRanchName = false }: BlockCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'resting':
        return 'bg-gray-100 text-gray-800'
      case 'replanting':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCropTypeIcon = (cropType: string) => {
    switch (cropType) {
      case 'avocado':
        return '🥑'
      case 'citrus':
        return '🍊'
      case 'nuts':
        return '🥜'
      default:
        return '🌱'
    }
  }

  return (
    <Link
      to={`/blocks/${block.id}`}
      className={cn(
        'block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{block.name}</h3>
            <span className="text-2xl">{getCropTypeIcon(block.cropType)}</span>
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              getStatusColor(block.status)
            )}>
              {block.status.charAt(0).toUpperCase() + block.status.slice(1)}
            </span>
          </div>
          
          {showRanchName && (
            <p className="text-sm text-gray-500 mb-2">Rancho Don Enrique</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{formatAcres(block.area)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4" />
              <span className="capitalize">{block.irrigationType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Planted {formatDate(block.plantingDate, 'yyyy')}</span>
            </div>
            {block.metadata.trees && (
              <div className="flex items-center space-x-2">
                <TreePine className="h-4 w-4" />
                <span>{block.metadata.trees} trees</span>
              </div>
            )}
          </div>

          {block.metadata.variety && (
            <div className="mt-3 text-sm">
              <span className="font-medium text-gray-700">Variety:</span>
              <span className="ml-1 text-gray-600">{block.metadata.variety}</span>
              {block.metadata.rootstock && (
                <>
                  <span className="ml-2 text-gray-400">•</span>
                  <span className="ml-2 text-gray-600">{block.metadata.rootstock}</span>
                </>
              )}
            </div>
          )}

          {block.lastHarvest && (
            <div className="mt-2 text-sm text-gray-500">
              Last harvest: {formatDate(block.lastHarvest)}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
import { Block } from '@/types'
import { cn } from '@/lib/utils'

interface BlockShapeProps {
  block: Block
  isSelected?: boolean
  isHovered?: boolean
  showLabel?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function BlockShape({
  block,
  isSelected = false,
  isHovered = false,
  showLabel = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: BlockShapeProps) {
  // Convert points to SVG path
  const pathData = block.coordinates.points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z'

  // Determine fill color based on state and status
  const getFillColor = () => {
    if (isSelected) return '#57b757' // ranch-400
    if (isHovered) return '#8dd28d' // ranch-300
    
    switch (block.status) {
      case 'active':
        return '#bce5bc' // ranch-200
      case 'maintenance':
        return '#f59e0b' // amber-500
      case 'resting':
        return '#d1d5db' // gray-300
      case 'replanting':
        return '#fbbf24' // amber-400
      default:
        return '#bce5bc'
    }
  }

  const getStrokeColor = () => {
    if (isSelected) return '#359235' // ranch-500
    if (isHovered) return '#57b757' // ranch-400
    return '#359235'
  }

  return (
    <g>
      {/* Block polygon */}
      <path
        d={pathData}
        fill={getFillColor()}
        stroke={getStrokeColor()}
        strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
        className={cn(
          'transition-all duration-200',
          onClick && 'cursor-pointer'
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Block label */}
      {showLabel && (
        <text
          x={block.coordinates.center.x}
          y={block.coordinates.center.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-700 text-sm font-medium pointer-events-none select-none"
          style={{ fontSize: '12px' }}
        >
          {block.name}
        </text>
      )}

      {/* Area label */}
      {showLabel && (
        <text
          x={block.coordinates.center.x}
          y={block.coordinates.center.y + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-500 text-xs pointer-events-none select-none"
          style={{ fontSize: '10px' }}
        >
          {block.area.toFixed(1)} acres
        </text>
      )}

      {/* Status indicator for non-active blocks */}
      {block.status !== 'active' && (
        <circle
          cx={block.coordinates.center.x - 15}
          cy={block.coordinates.center.y - 15}
          r="4"
          fill={block.status === 'maintenance' ? '#f59e0b' : '#6b7280'}
          stroke="white"
          strokeWidth="1"
        />
      )}
    </g>
  )
}
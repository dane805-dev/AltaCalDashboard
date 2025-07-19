import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Block, MapViewState } from '@/types'
import { cn } from '@/lib/utils'
import BlockShape from './BlockShape'

interface RanchMapProps {
  blocks: Block[]
  className?: string
  selectedBlockId?: string
  onBlockSelect?: (blockId: string) => void
  interactive?: boolean
}

export default function RanchMap({ 
  blocks, 
  className,
  selectedBlockId,
  onBlockSelect,
  interactive = true
}: RanchMapProps) {
  const navigate = useNavigate()
  const [viewState, setViewState] = useState<MapViewState>({
    selectedBlockId,
    showLabels: true,
    showGrid: false,
    zoomLevel: 1
  })

  const handleBlockClick = (blockId: string) => {
    if (onBlockSelect) {
      onBlockSelect(blockId)
    } else if (interactive) {
      navigate(`/blocks/${blockId}`)
    }
    setViewState(prev => ({ ...prev, selectedBlockId: blockId }))
  }

  const handleBlockHover = (blockId: string | undefined) => {
    setViewState(prev => ({ ...prev, hoveredBlockId: blockId }))
  }

  // Calculate map bounds from all blocks
  const mapBounds = blocks.reduce((bounds, block) => {
    const { boundingBox } = block.coordinates
    return {
      minX: Math.min(bounds.minX, boundingBox.minX),
      maxX: Math.max(bounds.maxX, boundingBox.maxX),
      minY: Math.min(bounds.minY, boundingBox.minY),
      maxY: Math.max(bounds.maxY, boundingBox.maxY),
    }
  }, { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity })

  const mapWidth = mapBounds.maxX - mapBounds.minX + 100 // Add padding
  const mapHeight = mapBounds.maxY - mapBounds.minY + 100

  return (
    <div className={cn('relative bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex items-center space-x-2 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={viewState.showLabels}
              onChange={(e) => setViewState(prev => ({ ...prev, showLabels: e.target.checked }))}
              className="mr-1"
            />
            Labels
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={viewState.showGrid}
              onChange={(e) => setViewState(prev => ({ ...prev, showGrid: e.target.checked }))}
              className="mr-1"
            />
            Grid
          </label>
        </div>
      </div>

      {/* SVG Map */}
      <svg
        width="100%"
        height="400"
        viewBox={`${mapBounds.minX - 50} ${mapBounds.minY - 50} ${mapWidth} ${mapHeight}`}
        className="w-full h-full"
      >
        {/* Background */}
        <rect
          x={mapBounds.minX - 50}
          y={mapBounds.minY - 50}
          width={mapWidth}
          height={mapHeight}
          fill="#f9fafb"
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Grid (optional) */}
        {viewState.showGrid && (
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
            </pattern>
          </defs>
        )}
        {viewState.showGrid && (
          <rect
            x={mapBounds.minX - 50}
            y={mapBounds.minY - 50}
            width={mapWidth}
            height={mapHeight}
            fill="url(#grid)"
          />
        )}

        {/* Blocks */}
        {blocks.map((block) => (
          <BlockShape
            key={block.id}
            block={block}
            isSelected={viewState.selectedBlockId === block.id}
            isHovered={viewState.hoveredBlockId === block.id}
            showLabel={viewState.showLabels}
            onClick={() => interactive && handleBlockClick(block.id)}
            onMouseEnter={() => interactive && handleBlockHover(block.id)}
            onMouseLeave={() => interactive && handleBlockHover(undefined)}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Rancho Don Enrique</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-ranch-200 rounded mr-2"></div>
            Avocado Blocks
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-ranch-400 rounded mr-2"></div>
            Selected Block
          </div>
          <div className="text-gray-500 mt-1">
            Total: {blocks.reduce((sum, block) => sum + block.area, 0).toFixed(1)} acres
          </div>
        </div>
      </div>
    </div>
  )
}
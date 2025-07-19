import { type ClassValue, clsx } from 'clsx'
import { format, parseISO, isValid } from 'date-fns'

// Utility for merging CSS classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Date formatting utilities
export const formatDate = (date: string | Date, formatStr = 'MMM d, yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid date'
  } catch {
    return 'Invalid date'
  }
}

export const formatDateTime = (date: string | Date) => {
  return formatDate(date, 'MMM d, yyyy h:mm a')
}

export const formatRelativeDate = (date: string | Date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  } catch {
    return 'Unknown'
  }
}

// Ranch and block utilities
export const generateBlockId = (ranchSlug: string, blockNumber: number) => {
  return `${ranchSlug}-block-${blockNumber}`
}

export const parseBlockId = (blockId: string) => {
  const parts = blockId.split('-')
  if (parts.length >= 3 && parts[parts.length - 2] === 'block') {
    return {
      ranchSlug: parts.slice(0, -2).join('-'),
      blockNumber: parseInt(parts[parts.length - 1])
    }
  }
  return null
}

// Priority and status utilities
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'pending_review':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'on_hold':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'open':
    default:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
}

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'irrigation':
      return '💧'
    case 'fertilization':
      return '🌱'
    case 'pest_control':
      return '🛡️'
    case 'pruning':
      return '✂️'
    case 'harvest':
      return '🥑'
    case 'planting':
      return '🌿'
    case 'maintenance':
      return '🔧'
    case 'inspection':
      return '🔍'
    default:
      return '📋'
  }
}

// Number formatting
export const formatAcres = (acres: number) => {
  return `${acres.toFixed(1)} acres`
}

export const formatHours = (hours: number) => {
  if (hours < 1) return `${Math.round(hours * 60)} min`
  return `${hours.toFixed(1)} hrs`
}

// Data validation
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidBlockCoordinates = (coordinates: any) => {
  return (
    coordinates &&
    Array.isArray(coordinates.points) &&
    coordinates.points.length >= 3 &&
    coordinates.center &&
    typeof coordinates.center.x === 'number' &&
    typeof coordinates.center.y === 'number'
  )
}
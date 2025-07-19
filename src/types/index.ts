// Core data types for the Alta Cal Ranch Dashboard
// Designed to support multi-ranch expansion

export interface Ranch {
  id: string
  name: string
  slug: string // for URL routing, e.g., 'rancho-don-enrique'
  location: {
    lat: number
    lng: number
  }
  totalArea: number // in acres
  establishedDate: string
  description?: string
  isActive: boolean
}

export interface Block {
  id: string
  ranchId: string // Foreign key to Ranch
  name: string // e.g., "Block 1", "North Field"
  blockNumber: number
  area: number // in acres
  cropType: CropType
  plantingDate: string
  lastHarvest?: string
  soilType: string
  irrigationType: 'drip' | 'sprinkler' | 'flood' | 'none'
  coordinates: BlockCoordinates
  metadata: BlockMetadata
  status: BlockStatus
  createdAt: string
  updatedAt: string
}

export interface BlockCoordinates {
  // SVG coordinates for map visualization
  points: Array<{ x: number; y: number }>
  center: { x: number; y: number }
  boundingBox: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
}

export interface BlockMetadata {
  trees?: number
  variety?: string
  rootstock?: string
  spacing?: string
  notes?: string
}

export type BlockStatus = 'active' | 'resting' | 'replanting' | 'maintenance'

export type CropType = 'avocado' | 'citrus' | 'nuts' | 'vegetables' | 'fallow'

export interface Ticket {
  id: string
  ranchId: string
  blockId?: string // Optional - some tickets may be ranch-wide
  title: string
  description: string
  type: TicketType
  priority: TicketPriority
  status: TicketStatus
  assignedTo?: string
  createdBy: string
  estimatedHours?: number
  actualHours?: number
  dueDate?: string
  completedDate?: string
  tags: string[]
  attachments?: Attachment[]
  createdAt: string
  updatedAt: string
}

export type TicketType = 
  | 'irrigation'
  | 'fertilization'
  | 'pest_control'
  | 'pruning'
  | 'harvest'
  | 'planting'
  | 'maintenance'
  | 'inspection'
  | 'other'

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export type TicketStatus = 
  | 'open'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'cancelled'
  | 'on_hold'

export interface Attachment {
  id: string
  url: string
  filename: string
  type: 'image' | 'document' | 'video'
  size: number
  uploadedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  ranchAccess: string[] // Array of ranch IDs this user can access
  createdAt: string
  lastLogin?: string
}

export type UserRole = 'owner' | 'manager' | 'worker' | 'viewer'

// Dashboard and UI related types
export interface DashboardStats {
  ranchId: string
  totalBlocks: number
  activeTickets: number
  completedTicketsThisMonth: number
  upcomingTasks: number
  totalAcres: number
  harvestEstimate?: number
}

export interface MapViewState {
  selectedBlockId?: string
  hoveredBlockId?: string
  showLabels: boolean
  showGrid: boolean
  zoomLevel: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
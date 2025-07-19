import { useState } from 'react'
import { Ticket, TicketType, TicketPriority, Block } from '@/types'
import { cn } from '@/lib/utils'
import { X, Save } from 'lucide-react'

interface TicketFormProps {
  ticket?: Ticket
  blocks: Block[]
  onSave: (ticketData: Partial<Ticket>) => void
  onCancel: () => void
  isLoading?: boolean
}

export default function TicketForm({ 
  ticket, 
  blocks, 
  onSave, 
  onCancel, 
  isLoading = false 
}: TicketFormProps) {
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    description: ticket?.description || '',
    type: ticket?.type || 'maintenance' as TicketType,
    priority: ticket?.priority || 'medium' as TicketPriority,
    blockId: ticket?.blockId || '',
    assignedTo: ticket?.assignedTo || '',
    estimatedHours: ticket?.estimatedHours || '',
    dueDate: ticket?.dueDate ? ticket.dueDate.split('T')[0] : '',
    tags: ticket?.tags?.join(', ') || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.estimatedHours && isNaN(Number(formData.estimatedHours))) {
      newErrors.estimatedHours = 'Must be a valid number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const ticketData: Partial<Ticket> = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      priority: formData.priority,
      blockId: formData.blockId || undefined,
      assignedTo: formData.assignedTo || undefined,
      estimatedHours: formData.estimatedHours ? Number(formData.estimatedHours) : undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    }

    onSave(ticketData)
  }

  const typeOptions: { value: TicketType; label: string }[] = [
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

  const priorityOptions: { value: TicketPriority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'text-gray-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {ticket ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500',
                errors.title ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Brief description of the task"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500',
                errors.description ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Detailed description of what needs to be done"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
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
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block (Optional)
              </label>
              <select
                value={formData.blockId}
                onChange={(e) => handleChange('blockId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
              >
                <option value="">Select a block</option>
                {blocks.map(block => (
                  <option key={block.id} value={block.id}>
                    {block.name} ({block.area.toFixed(1)} acres)
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={formData.estimatedHours}
                onChange={(e) => handleChange('estimatedHours', e.target.value)}
                className={cn(
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500',
                  errors.estimatedHours ? 'border-red-300' : 'border-gray-300'
                )}
                placeholder="0.0"
              />
              {errors.estimatedHours && (
                <p className="mt-1 text-sm text-red-600">{errors.estimatedHours}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
              />
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => handleChange('assignedTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
                placeholder="Worker name or ID"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ranch-500"
              placeholder="Separate tags with commas (e.g., urgent, equipment, morning)"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-ranch-500 rounded-lg hover:bg-ranch-600 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
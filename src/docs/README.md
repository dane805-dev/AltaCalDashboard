# Alta Cal Ranch Dashboard

A comprehensive web application for planning, tracking, and managing work on avocado ranches. Built with React, TypeScript, and TailwindCSS, with Supabase for backend data and authentication.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Main app layout and navigation
│   ├── Map/             # Interactive SVG ranch map components
│   ├── Blocks/          # Block management components
│   └── Tickets/         # Task/ticket management components
├── pages/               # Main application views
│   ├── OverviewPage.tsx # Dashboard with stats and recent activity
│   ├── TicketsPage.tsx  # All tickets with filtering and sorting
│   ├── BlocksPage.tsx   # Block list with grid/map views
│   └── BlockDetailPage.tsx # Individual block dashboard
├── data/                # Sample data files (replace with API)
│   ├── ranches.json     # Ranch information
│   ├── blocks.json      # Block data with coordinates
│   └── tickets.json     # Task/ticket sample data
├── lib/                 # Utility functions and configurations
│   ├── supabase.ts      # Database client setup
│   └── utils.ts         # Helper functions and formatting
├── types/               # TypeScript type definitions
│   └── index.ts         # All application types
├── styles/              # CSS and styling
│   └── index.css        # Global styles and TailwindCSS
└── docs/                # Documentation and guides
    ├── README.md        # This file
    ├── STYLE_GUIDE.md   # UI/UX guidelines
    └── API_GUIDE.md     # Backend integration guide
```

## 🎯 Features

### Core Functionality
- **Ranch Overview Dashboard**: Real-time stats, priority tasks, and recent activity
- **Interactive Map**: SVG-based ranch visualization with clickable blocks
- **Block Management**: Detailed block information, status tracking, and metadata
- **Task System**: Complete ticketing system with priorities, assignments, and filtering
- **Multi-Ranch Support**: Architecture designed for multiple ranch expansion

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean design with ranch-themed colors and intuitive navigation
- **Advanced Filtering**: Search, sort, and filter across all data types
- **Real-time Updates**: Live data synchronization (with backend integration)

### Technical Features
- **TypeScript**: Full type safety and developer experience
- **Component Architecture**: Modular, reusable components
- **Performance Optimized**: Efficient rendering and state management
- **Accessibility**: WCAG compliant interface elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (for backend)
- Git

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd alta-cal-ranch-dashboard
npm install
```

2. **Environment setup**:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:5173`

## 📊 Data Models

### Ranch
- Basic ranch information (name, location, area)
- Support for multiple ranches with unique slugs
- Established date and description

### Block
- Geographic divisions within a ranch
- Crop information (type, variety, planting date)
- SVG coordinates for map visualization
- Metadata (trees, rootstock, spacing, notes)
- Status tracking (active, maintenance, resting, replanting)

### Ticket (Task)
- Work items with type, priority, and status
- Assignment and time tracking
- Block association (optional for ranch-wide tasks)
- Tag system for categorization
- Due dates and completion tracking

## 🎨 Design System

### Colors
- **Ranch Green**: Primary brand color for agricultural theme
- **Earth Tones**: Secondary colors inspired by soil and crops
- **Status Colors**: Semantic colors for different states
- **Neutral Grays**: Clean, modern interface elements

### Typography
- **Primary Font**: Inter for clean, modern readability
- **Font Weights**: 300, 400, 500, 600, 700 for hierarchy
- **Font Sizes**: Consistent scale from xs to 3xl

### Components
- **Cards**: White background with subtle borders and shadows
- **Buttons**: Consistent styling with hover and focus states
- **Forms**: Clean inputs with validation states
- **Badges**: Status indicators with semantic colors

## 🔧 Development Guidelines

### Component Structure
```typescript
interface ComponentProps {
  // Required props first
  data: DataType
  onAction: (param: string) => void
  
  // Optional props with defaults
  className?: string
  variant?: 'default' | 'compact'
}

export default function Component({ 
  data, 
  onAction, 
  className,
  variant = 'default' 
}: ComponentProps) {
  // Component logic
}
```

### State Management
- Use React's built-in `useState` and `useEffect`
- For complex state, consider `useReducer`
- Lift state up when shared between components
- Use context sparingly for truly global state

### File Naming
- **Components**: PascalCase (e.g., `BlockCard.tsx`)
- **Pages**: PascalCase with "Page" suffix (e.g., `OverviewPage.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: Match the main export (e.g., `types/index.ts`)

### Import Organization
```typescript
// React and external libraries
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Internal types
import { Block, Ticket } from '@/types'

// Internal components
import { BlockCard } from '@/components/Blocks'

// Utilities and data
import { formatDate } from '@/lib/utils'
import blocksData from '@/data/blocks.json'
```

## 🌐 Multi-Ranch Architecture

The application is designed to support multiple ranches from the ground up:

### Data Structure
- All data models include `ranchId` for separation
- URL routing supports ranch slugs: `/ranches/don-enrique/blocks`
- User permissions can be ranch-specific

### Scalability Considerations
- Component props accept ranch context
- API calls can be filtered by ranch
- Navigation can switch between ranches
- Data caching per ranch for performance

### Future Expansion
- Ranch selection dropdown in navigation
- Dashboard aggregation across ranches
- Shared resources and equipment tracking
- Cross-ranch reporting and analytics

## 🔌 Backend Integration

Currently uses JSON files for demo data. To integrate with Supabase:

1. **Database Schema**: See `docs/API_GUIDE.md` for table structures
2. **API Calls**: Replace JSON imports with Supabase queries
3. **Authentication**: Use Supabase Auth for user management
4. **Real-time**: Implement Supabase subscriptions for live updates

## 🧪 Testing Strategy

### Component Testing
- Test component rendering with different props
- Test user interactions and event handlers
- Test edge cases and error states

### Integration Testing
- Test page-level functionality
- Test navigation and routing
- Test data flow between components

### E2E Testing
- Test complete user workflows
- Test across different devices and browsers
- Test performance under load

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Ensure all environment variables are set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Hosting Options
- **Vercel**: Zero-config deployment with GitHub integration
- **Netlify**: Simple deployment with form handling
- **AWS S3**: Static hosting with CloudFront CDN
- **Self-hosted**: Any web server with static file support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow existing code style and patterns
- Add TypeScript types for all new code
- Include JSDoc comments for complex functions
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions, issues, or feature requests:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Tag with appropriate labels (bug, feature, question)
4. Provide steps to reproduce for bugs

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic ranch and block management
- ✅ Task/ticket system
- ✅ Interactive map visualization
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Supabase backend integration
- 🔄 User authentication and permissions
- 🔄 Real-time updates and notifications
- 🔄 Mobile app development

### Phase 3 (Future)
- 📋 Advanced reporting and analytics
- 📋 Equipment and resource management
- 📋 Financial tracking and budgeting
- 📋 Weather integration and predictions
- 📋 Multi-ranch management dashboard

---

Built with ❤️ for sustainable agriculture and efficient ranch management.
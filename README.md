# 🥑 Alta Cal Ranch Dashboard

A modern web application for planning, tracking, and managing work on avocado ranches. Built with **React**, **TypeScript**, **TailwindCSS**, and **Supabase**.

![Ranch Dashboard](https://img.shields.io/badge/Ranch-Management-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4)

## ✨ Features

### 🗺️ Interactive Ranch Map
- **SVG-based visualization** of ranch blocks with clickable areas
- **Real-time status updates** with color-coded block states
- **Detailed block information** on hover and click
- **Multi-zoom levels** for detailed and overview perspectives

### 📊 Comprehensive Dashboard
- **Real-time statistics** for blocks, tasks, and productivity
- **Priority task management** with visual indicators
- **Recent activity timeline** across all ranch operations
- **Quick action buttons** for common tasks

### 🎫 Advanced Task System
- **Complete ticketing system** with priorities, assignments, and due dates
- **Smart filtering and sorting** by status, type, priority, and assignee
- **Task templates** for common ranch operations (irrigation, fertilization, etc.)
- **Time tracking** with estimated vs. actual hours

### 🏞️ Block Management
- **Detailed block profiles** with crop info, planting dates, and metadata
- **Status tracking** (active, maintenance, resting, replanting)
- **Grid and map views** for different management perspectives
- **Block-specific task dashboards** with history and planning

### 🔄 Multi-Ranch Ready
- **Scalable architecture** designed for multiple ranch expansion
- **Ranch-specific data separation** with unique identifiers
- **Shared component library** for consistent experience
- **Future-proof data models** for growth

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/alta-cal-ranch-dashboard.git
cd alta-cal-ranch-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
alta-cal-ranch-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/         # App layout and navigation
│   │   ├── Map/            # Interactive SVG map components
│   │   ├── Blocks/         # Block management components
│   │   └── Tickets/        # Task/ticket management
│   ├── pages/              # Main application views
│   ├── types/              # TypeScript type definitions
│   ├── lib/                # Utilities and configurations
│   ├── data/               # Sample data (replace with API)
│   ├── styles/             # Global CSS and Tailwind
│   └── docs/               # Documentation
├── public/                 # Static assets
└── docs/                   # Additional documentation
```

## 🎯 Current Focus: Rancho Don Enrique

The application is currently configured for **Rancho Don Enrique** with:
- **4 production blocks** (125.5 acres total)
- **Hass avocado cultivation** with drip irrigation
- **Comprehensive task management** for all ranch operations
- **Sample data** demonstrating full functionality

## 📱 Screenshots

*Coming soon - screenshots of the dashboard, map view, and task management interface*

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern component-based UI
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### Backend (Ready for Integration)
- **Supabase** - PostgreSQL database and authentication
- **Real-time subscriptions** - Live data updates
- **Row Level Security** - Multi-user permissions

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 🎨 Design System

### Color Palette
- **Ranch Green** (`#359235`) - Primary agricultural theme
- **Earth Tones** (`#b8944f`) - Secondary natural colors
- **Semantic Colors** - Status and priority indicators
- **Neutral Grays** - Clean, modern interface

### Typography
- **Inter Font** - Clean, modern readability
- **Consistent Scale** - xs to 4xl with proper hierarchy
- **Weight Variants** - 300 to 700 for emphasis

### Component Library
- **Modular Components** - Reusable across the application
- **Consistent Patterns** - Cards, buttons, forms, badges
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG AA compliant

## 📖 Documentation

- **[Complete Documentation](src/docs/README.md)** - Comprehensive project guide
- **[Style Guide](src/docs/STYLE_GUIDE.md)** - UI/UX design standards
- **[API Guide](src/docs/API_GUIDE.md)** - Backend integration instructions

## 🔮 Roadmap

### Phase 1: Foundation (Current) ✅
- [x] Basic ranch and block management
- [x] Interactive SVG map visualization
- [x] Complete task/ticket system
- [x] Responsive design and modern UI
- [x] TypeScript and component architecture

### Phase 2: Backend Integration 🔄
- [ ] Supabase database setup and migration
- [ ] User authentication and role-based permissions
- [ ] Real-time data synchronization
- [ ] API integration replacing mock data

### Phase 3: Advanced Features 📋
- [ ] Multi-ranch management dashboard
- [ ] Advanced reporting and analytics
- [ ] Equipment and resource tracking
- [ ] Weather integration and alerts
- [ ] Mobile application development

### Phase 4: Scale & Optimize 🚀
- [ ] Performance optimization
- [ ] Advanced caching strategies
- [ ] Offline functionality
- [ ] Third-party integrations
- [ ] AI-powered insights

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow existing TypeScript and React patterns
- Maintain component modularity and reusability
- Add comprehensive documentation for new features
- Ensure responsive design across all devices
- Test functionality thoroughly before submission

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/alta-cal-ranch-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/alta-cal-ranch-dashboard/discussions)
- **Email**: support@altacalranch.com

## 🙏 Acknowledgments

- **Ranch Management Experts** - For domain knowledge and requirements
- **Open Source Community** - For the amazing tools and libraries
- **Beta Testers** - For feedback and feature requests

---

**Built with ❤️ for sustainable agriculture and efficient ranch management.**

*Helping ranchers grow better crops with better tools.*

# Alta Cal Ranch Dashboard Style Guide

This style guide ensures consistency across the Alta Cal Ranch Dashboard application. It covers design principles, color usage, typography, components, and interaction patterns.

## 🎨 Design Principles

### 1. Agricultural Heritage
- **Natural Colors**: Earth tones and ranch greens reflect agricultural roots
- **Organic Shapes**: Rounded corners and soft shadows for warmth
- **Practical Aesthetics**: Beauty serves function, not decoration

### 2. Clarity and Efficiency
- **Information Hierarchy**: Clear visual priorities guide user attention
- **Minimal Cognitive Load**: Simple, intuitive interfaces reduce mental effort
- **Task-Oriented Design**: Every element serves a specific ranch management purpose

### 3. Accessibility First
- **High Contrast**: Text maintains WCAG AA standards
- **Keyboard Navigation**: All interactive elements are accessible
- **Screen Reader Support**: Proper semantic markup and ARIA labels

### 4. Responsive Design
- **Mobile-First**: Optimized for field work on mobile devices
- **Progressive Enhancement**: Desktop features build upon mobile foundation
- **Touch-Friendly**: Adequate touch targets for farm equipment operators

## 🌈 Color Palette

### Primary Colors (Ranch Theme)
```css
/* Ranch Green - Primary brand color */
ranch-50:  #f0f9f0
ranch-100: #dcf2dc
ranch-200: #bce5bc
ranch-300: #8dd28d
ranch-400: #57b757  /* Primary accent */
ranch-500: #359235  /* Primary */
ranch-600: #2a7a2a
ranch-700: #246124
ranch-800: #1f4f1f
ranch-900: #1c421c
ranch-950: #0d250d
```

### Secondary Colors (Earth Tones)
```css
/* Earth - Secondary agricultural colors */
earth-50:  #faf8f3
earth-100: #f2eee1
earth-200: #e6dcc1
earth-300: #d5c399
earth-400: #c4a56f
earth-500: #b8944f  /* Secondary */
earth-600: #a77e43
earth-700: #8a6638
earth-800: #715334
earth-900: #5c442c
earth-950: #322317
```

### Semantic Colors
```css
/* Status Colors */
Success: #10b981 (green-500)
Warning: #f59e0b (amber-500)
Error:   #ef4444 (red-500)
Info:    #3b82f6 (blue-500)

/* Priority Colors */
Urgent:  #dc2626 (red-600)
High:    #ea580c (orange-600)
Medium:  #ca8a04 (yellow-600)
Low:     #6b7280 (gray-500)
```

### Neutral Colors
```css
/* Gray Scale */
gray-50:  #f9fafb
gray-100: #f3f4f6
gray-200: #e5e7eb
gray-300: #d1d5db
gray-400: #9ca3af
gray-500: #6b7280
gray-600: #4b5563
gray-700: #374151
gray-800: #1f2937
gray-900: #111827
```

## ✏️ Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Monospace**: 'SF Mono', Monaco, 'Cascadia Code', monospace

### Font Scale
```css
text-xs:   12px / 16px (letter-spacing: 0.05em)
text-sm:   14px / 20px
text-base: 16px / 24px (default body text)
text-lg:   18px / 28px
text-xl:   20px / 28px
text-2xl:  24px / 32px
text-3xl:  30px / 36px
text-4xl:  36px / 40px
```

### Font Weights
```css
font-light:     300 (sparingly, for large text)
font-normal:    400 (body text default)
font-medium:    500 (emphasis, labels)
font-semibold:  600 (headings, important text)
font-bold:      700 (page titles, major headings)
```

### Usage Guidelines
- **Headings**: Use semibold (600) or bold (700)
- **Body Text**: Regular (400) for readability
- **Labels**: Medium (500) for form labels and metadata
- **Emphasis**: Medium (500) or semibold (600), avoid italic

## 🧩 Component Patterns

### Cards
```css
/* Standard Card */
.card {
  background: white;
  border: 1px solid rgb(229 231 235); /* gray-200 */
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem; /* 24px */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* Hover States */
.card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: rgb(53 146 53); /* ranch-500 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: rgb(42 122 42); /* ranch-600 */
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: rgb(55 65 81); /* gray-700 */
  border: 1px solid rgb(209 213 219); /* gray-300 */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}
```

### Forms
```css
/* Input Fields */
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgb(209 213 219); /* gray-300 */
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 150ms ease;
}

.input-field:focus {
  outline: none;
  border-color: rgb(53 146 53); /* ranch-500 */
  box-shadow: 0 0 0 3px rgb(53 146 53 / 0.1);
}

/* Error State */
.input-field.error {
  border-color: rgb(239 68 68); /* red-500 */
}
```

### Status Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid transparent;
}

/* Status Variants */
.badge-success { background: rgb(220 252 231); color: rgb(22 101 52); border-color: rgb(187 247 208); }
.badge-warning { background: rgb(254 243 199); color: rgb(146 64 14); border-color: rgb(253 230 138); }
.badge-error   { background: rgb(254 226 226); color: rgb(153 27 27); border-color: rgb(252 165 165); }
.badge-info    { background: rgb(219 234 254); color: rgb(30 64 175); border-color: rgb(147 197 253); }
```

## 🎯 Icon Usage

### Icon Library
- **Primary**: Lucide React (consistent style, good variety)
- **Size Standards**: 16px (h-4), 20px (h-5), 24px (h-6)
- **Color**: Inherit from parent or use semantic colors

### Icon Guidelines
- **Consistency**: Use same icon family throughout
- **Context**: Icons should clarify, not decorate
- **Size**: Match text size or use standard increments
- **Color**: Gray-400 for inactive, gray-600 for active, semantic colors for status

### Common Icon Mappings
```typescript
// Navigation and Actions
Home: <Home className="h-5 w-5" />
Add:  <Plus className="h-4 w-4" />
Edit: <Edit2 className="h-4 w-4" />
Delete: <Trash2 className="h-4 w-4" />
Search: <Search className="h-4 w-4" />

// Ranch Management
Block:     <Map className="h-5 w-5" />
Task:      <CheckSquare className="h-5 w-5" />
Calendar:  <Calendar className="h-5 w-5" />
User:      <User className="h-5 w-5" />

// Task Types
Irrigation:    <Droplets className="h-4 w-4" />
Fertilization: <Sprout className="h-4 w-4" />
Pest Control:  <Shield className="h-4 w-4" />
Pruning:       <Scissors className="h-4 w-4" />
Harvest:       <Package className="h-4 w-4" />
Maintenance:   <Wrench className="h-4 w-4" />
```

## 📱 Responsive Design

### Breakpoints
```css
sm:  640px  /* Small tablets */
md:  768px  /* Large tablets */
lg:  1024px /* Small desktops */
xl:  1280px /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Layout Patterns
```css
/* Mobile-First Grid */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### Touch Targets
- **Minimum Size**: 44px × 44px (iOS guideline)
- **Recommended**: 48px × 48px (Material Design)
- **Spacing**: 8px minimum between touch targets

## 🎭 Animation and Transitions

### Timing Functions
```css
/* Ease Functions */
ease-out:     cubic-bezier(0, 0, 0.2, 1)     /* Default for entrances */
ease-in:      cubic-bezier(0.4, 0, 1, 1)     /* For exits */
ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)   /* For transforms */
```

### Duration Standards
```css
/* Animation Durations */
duration-75:   75ms   /* Very fast (micro-interactions) */
duration-150:  150ms  /* Fast (hover states, button presses) */
duration-300:  300ms  /* Medium (modal open/close, page transitions) */
duration-500:  500ms  /* Slow (complex animations) */
```

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    transform: translateY(10px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

/* Scale In */
@keyframes scaleIn {
  from { 
    transform: scale(0.95);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}
```

## 📐 Spacing System

### Spacing Scale
```css
/* TailwindCSS Spacing (4px base unit) */
0:    0px
0.5:  2px
1:    4px
1.5:  6px
2:    8px
2.5:  10px
3:    12px
3.5:  14px
4:    16px
5:    20px
6:    24px
7:    28px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

### Usage Guidelines
- **Component Padding**: 4, 6, or 8 units (16px, 24px, 32px)
- **Element Spacing**: 2, 3, or 4 units (8px, 12px, 16px)
- **Section Spacing**: 6, 8, or 12 units (24px, 32px, 48px)
- **Page Margins**: 4 or 6 units (16px, 24px) on mobile, 6 or 8 on desktop

## 🎪 State Management

### Visual States
```css
/* Default State */
.element {
  transition: all 150ms ease;
}

/* Hover State */
.element:hover {
  background-color: rgb(243 244 246); /* gray-100 */
}

/* Focus State */
.element:focus {
  outline: 2px solid rgb(53 146 53); /* ranch-500 */
  outline-offset: 2px;
}

/* Active State */
.element:active {
  transform: translateY(1px);
}

/* Disabled State */
.element:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Loading States
```css
/* Skeleton Loading */
.skeleton {
  background: linear-gradient(
    90deg,
    rgb(243 244 246) 25%,
    rgb(229 231 235) 50%,
    rgb(243 244 246) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 🧪 Testing Guidelines

### Visual Testing
- Test all components in light mode
- Verify responsive behavior at all breakpoints
- Check focus states with keyboard navigation
- Validate color contrast ratios

### Accessibility Testing
- Screen reader compatibility
- Keyboard-only navigation
- Color blindness simulation
- High contrast mode support

### Cross-Browser Testing
- Chrome (primary development browser)
- Safari (iOS compatibility)
- Firefox (standards compliance)
- Edge (Windows compatibility)

## 📋 Component Checklist

Before creating or modifying components, ensure:

### Visual Design
- [ ] Follows established color palette
- [ ] Uses consistent typography scale
- [ ] Implements proper spacing system
- [ ] Includes appropriate hover/focus states

### Functionality
- [ ] Responsive across all breakpoints
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Proper error states

### Code Quality
- [ ] TypeScript types defined
- [ ] Props interface documented
- [ ] Consistent naming conventions
- [ ] Reusable and modular design

---

This style guide is a living document. Update it as the application evolves to maintain consistency and quality across the Alta Cal Ranch Dashboard.
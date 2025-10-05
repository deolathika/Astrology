# 🌌 Daily Secrets - Navigation System Specification

## Navigation Architecture

### Primary Navigation
- **Logo/Brand**: Daily Secrets with cosmic icon
- **Main Menu**: Dashboard, Astrology, Numerology, Compatibility, Dreams, AI Chat
- **User Menu**: Profile, Settings, Notifications, Upgrade/Subscription
- **Language Selector**: EN, SI-LK, TA-IN, HI-IN, ZH-CN

### Secondary Navigation
- **Breadcrumbs**: Current page hierarchy
- **Quick Actions**: Most used features
- **Search**: Global search functionality
- **Help**: Contextual help and support

### Mobile Navigation
- **Bottom Tab Bar**: Primary features (Dashboard, Astrology, Numerology, Profile)
- **Hamburger Menu**: Secondary features and settings
- **Floating Action Button**: Quick access to AI Chat
- **Swipe Gestures**: Navigate between sections

### Role-Based Navigation

#### Guest Users
- **Landing Page**: Hero, features, sign up
- **Guest Dashboard**: Limited content, upgrade prompts
- **Authentication**: Sign in/sign up flows

#### Free Users  
- **Main Dashboard**: Personalized content, quick actions
- **Feature Pages**: Astrology, numerology, compatibility
- **Profile**: User settings, birth information
- **Upgrade Prompts**: Premium feature teasers

#### Premium Users
- **Premium Dashboard**: Advanced analytics, insights
- **Full Features**: All astrology/numerology features
- **AI Features**: Dream analysis, cosmic chat
- **Export**: PDF reports, social stories

#### Admin Users
- **Admin Dashboard**: System overview, metrics
- **User Management**: User roles, subscriptions
- **Content Management**: System settings, themes
- **Analytics**: Usage statistics, performance

### Navigation Components

#### App Shell
- **Header**: Logo, main nav, user menu, language selector
- **Sidebar**: Secondary navigation, quick actions
- **Main Content**: Page content with breadcrumbs
- **Footer**: Links, legal, social media

#### Navigation Items
- **Dashboard**: Home icon, personalized content
- **Astrology**: Star icon, birth charts, transits
- **Numerology**: Calculator icon, life path, destiny
- **Compatibility**: Heart icon, relationship analysis
- **Dreams**: Moon icon, dream analysis (premium)
- **AI Chat**: Message icon, cosmic guidance (premium)
- **Profile**: User icon, settings, preferences
- **Admin**: Shield icon, system management (admin only)

### Responsive Behavior

#### Desktop (1024px+)
- **Full Navigation**: All menu items visible
- **Sidebar**: Collapsible secondary navigation
- **Breadcrumbs**: Full hierarchy display
- **Search**: Global search bar

#### Tablet (768px - 1023px)
- **Condensed Navigation**: Essential items only
- **Collapsible Menu**: Secondary items in dropdown
- **Touch Optimization**: Larger touch targets
- **Swipe Support**: Gesture navigation

#### Mobile (320px - 767px)
- **Bottom Navigation**: Primary features only
- **Hamburger Menu**: Secondary features
- **Floating Actions**: Quick access buttons
- **Gesture Navigation**: Swipe between sections

### Accessibility Features

#### Keyboard Navigation
- **Tab Order**: Logical tab sequence
- **Skip Links**: Jump to main content
- **Focus Indicators**: Clear focus states
- **Keyboard Shortcuts**: Power user features

#### Screen Reader Support
- **ARIA Labels**: Descriptive navigation labels
- **Landmark Roles**: Navigation, main, complementary
- **Live Regions**: Dynamic content announcements
- **Semantic HTML**: Proper heading hierarchy

#### Visual Accessibility
- **High Contrast**: AA contrast ratios
- **Focus Indicators**: Clear focus states
- **Reduced Motion**: Respect user preferences
- **Text Scaling**: Support for text zoom

### Navigation States

#### Loading States
- **Skeleton Navigation**: Placeholder during load
- **Progressive Enhancement**: Core navigation first
- **Error States**: Fallback navigation options
- **Offline Mode**: Cached navigation structure

#### Interactive States
- **Hover**: Subtle hover effects
- **Active**: Current page indication
- **Selected**: Multi-select navigation
- **Disabled**: Unavailable features

### Performance Considerations

#### Navigation Speed
- **Preloading**: Critical navigation routes
- **Code Splitting**: Lazy load navigation components
- **Caching**: Navigation state persistence
- **Optimization**: Minimal navigation bundle

#### User Experience
- **Instant Navigation**: No loading delays
- **Smooth Transitions**: Animated navigation changes
- **Context Preservation**: Maintain navigation state
- **Quick Access**: Shortcuts to common features

### Navigation Analytics

#### User Behavior Tracking
- **Navigation Patterns**: Most used features
- **Drop-off Points**: Where users leave
- **Feature Discovery**: New feature adoption
- **Conversion Funnels**: Guest to premium flow

#### Performance Metrics
- **Navigation Speed**: Time to navigate
- **Error Rates**: Navigation failures
- **User Satisfaction**: Navigation feedback
- **Accessibility**: Screen reader compatibility

### Implementation Guidelines

#### Component Structure
```typescript
interface NavigationProps {
  user: User | null;
  role: 'guest' | 'free' | 'premium' | 'admin';
  currentPath: string;
  language: string;
  theme: 'light' | 'dark';
}
```

#### State Management
- **Navigation State**: Current page, breadcrumbs
- **User Context**: Role, permissions, preferences
- **Theme State**: Light/dark mode, mood themes
- **Language State**: Current locale, translations

#### Responsive Implementation
- **Mobile First**: Start with mobile navigation
- **Progressive Enhancement**: Add desktop features
- **Touch Optimization**: Larger touch targets
- **Gesture Support**: Swipe navigation

### Testing Requirements

#### Functional Testing
- **Navigation Flow**: All navigation paths work
- **Role Permissions**: Correct access control
- **Responsive Design**: All breakpoints work
- **Accessibility**: Screen reader compatibility

#### Performance Testing
- **Navigation Speed**: <200ms navigation
- **Bundle Size**: Minimal navigation bundle
- **Memory Usage**: Efficient state management
- **Loading Time**: Fast initial navigation

#### User Testing
- **Usability**: Intuitive navigation
- **Accessibility**: Screen reader friendly
- **Mobile Experience**: Touch-optimized
- **Cross-browser**: Consistent experience


# Portfolio Website - Replit Configuration

## Overview

This is a modern portfolio website built for Saukhyasheel Sardesai (Saukhya), an AI Engineer and Full Stack Developer. The application showcases professional experience, skills, and projects with a focus on AI/ML technologies and conversational agents.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme variables and dark mode support
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components including UI library
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and query client
│   │   └── pages/        # Page components
├── server/               # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer with memory fallback
│   └── vite.ts           # Development server integration
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and validation
└── migrations/           # Database migration files
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Zod Integration**: Runtime validation using drizzle-zod

### Authentication & Storage
- **Memory Storage**: Fallback implementation for development
- **Session Management**: PostgreSQL-backed sessions for production
- **User Management**: CRUD operations for user accounts

### UI Components
- **Design System**: Comprehensive component library with shadcn/ui
- **Theme Support**: Light/dark mode with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Radix UI primitives ensure ARIA compliance

### Contact Form
- **API Endpoint**: `/api/contact` for form submissions
- **Validation**: Server-side email format and required field validation
- **Error Handling**: Comprehensive error responses and logging

## Data Flow

1. **Client Requests**: React frontend makes API calls through TanStack Query
2. **Express Middleware**: Handles JSON parsing, CORS, and request logging
3. **Route Handlers**: Process business logic and interact with storage layer
4. **Database Operations**: Drizzle ORM executes type-safe SQL queries
5. **Response Handling**: Consistent JSON responses with error management

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: Accessible UI component primitives

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Static type checking and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

### Authentication & Sessions
- **connect-pg-simple**: PostgreSQL session store
- **bcrypt**: Password hashing (ready for implementation)

## Deployment Strategy

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Development**: `npm run dev` starts concurrent client/server
- **Production Build**: Vite builds client, ESBuild bundles server
- **Port Configuration**: Internal port 5000, external port 80
- **Autoscale**: Configured for automatic scaling

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection for development/production modes

### Build Process
1. **Development**: TSX executes TypeScript server directly
2. **Production**: Vite builds client assets, ESBuild creates server bundle
3. **Static Assets**: Client build output served from `/dist/public`
4. **Server Bundle**: Single ESM file in `/dist/index.js`

## Deployment Information

### Render Deployment
- Project configured for Render hosting
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment: Node.js production
- Port: Automatically configured for Render (process.env.PORT)

### Download Instructions
1. Download project as ZIP from Replit
2. Extract and push to GitHub repository
3. Connect GitHub repo to Render
4. Deploy with provided configuration

## Changelog
```
Changelog:
- June 23, 2025. Initial setup with modern React portfolio
- June 23, 2025. Added functional contact form with data collection
- June 23, 2025. Configured for Render deployment
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```
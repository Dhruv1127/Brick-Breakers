# Overview

This is a Brick Breaker Game built with pure HTML, CSS, and JavaScript. The application has been converted from a React/Three.js project to a vanilla web application featuring a 2D canvas-based game interface with modern CSS styling, particle effects, and audio integration. The game is a complete brick breaker experience with scoring, lives, and responsive controls.

# System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

## Frontend Architecture
- **Framework**: Pure HTML, CSS, and JavaScript (no frameworks)
- **Graphics**: HTML5 Canvas for 2D game rendering
- **UI**: Custom CSS with gradients, animations, and responsive design
- **Styling**: Modern CSS with flexbox, grid, and advanced animations
- **State Management**: JavaScript classes for game state management
- **Audio**: HTML5 Audio API for sound effects and background music

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Build Tool**: Vite for development and build processes

# Key Components

## Game System
- **Game State Management**: JavaScript GameState class managing game phases (ready, playing, ended)
- **Audio System**: AudioManager class with mute/unmute functionality and sound effects
- **2D Rendering**: HTML5 Canvas rendering with gradient effects and particles
- **UI Interface**: CSS-based overlay with game controls, score display, and start/game over screens

## Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod schemas for runtime type checking and validation

## Development Tools
- **Hot Reload**: Vite development server with HMR support
- **TypeScript**: Full type coverage across frontend, backend, and shared code
- **Database Migrations**: Drizzle Kit for schema management
- **Error Handling**: Runtime error overlay for development

# Data Flow

1. **Client Initialization**: React app bootstraps with Zustand stores and Three.js canvas
2. **Game State**: Game phases controlled through Zustand store subscriptions
3. **Audio Integration**: Audio files loaded and managed through dedicated audio store
4. **Server Communication**: API requests handled through TanStack Query with credential-based sessions
5. **Database Operations**: Type-safe database queries through Drizzle ORM abstractions

# External Dependencies

## Core Technologies
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for React Three Fiber
- **@react-three/postprocessing**: Post-processing effects for 3D scenes
- **@radix-ui/***: Headless UI component primitives
- **@tanstack/react-query**: Server state management
- **zustand**: Client state management

## Database & Backend
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: Type-safe database ORM
- **connect-pg-simple**: PostgreSQL session store
- **express**: Web application framework

## Development Dependencies
- **vite**: Build tool and development server
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production builds

# Deployment Strategy

The application is configured for deployment on Replit with autoscale capabilities:

- **Development**: `npm run dev` starts concurrent frontend and backend development servers
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production**: Node.js serves both static files and API endpoints
- **Port Configuration**: Backend runs on port 5000, mapped to external port 80
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

# Changelog

Changelog:
- June 20, 2025. Initial setup
- July 20, 2025. Converted from React/Three.js to pure HTML/CSS/JS architecture for better compatibility and simpler deployment

# User Preferences

Preferred communication style: Simple, everyday language.
UI/UX Style: Ultra HD quality with advanced animations, particle effects, and premium visual design.
Design Requirements: Advanced level selection, glass morphism effects, gradient animations, and modern gaming aesthetics.
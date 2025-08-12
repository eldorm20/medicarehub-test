# Overview

UzPharm Digital is a comprehensive AI-powered healthcare platform designed specifically for Uzbekistan's pharmaceutical market. The application serves as a digital pharmacy platform that integrates with Uzbekistan's official pharmacy registry, providing users with AI-powered medical consultations, prescription analysis, medicine search capabilities, and e-commerce functionality for pharmaceutical products.

The platform bridges the gap between traditional pharmacy services and modern digital healthcare by offering 24/7 AI medical assistance, real-time medicine availability tracking, and seamless ordering with delivery services. It supports multiple user roles including clients, pharmacy sellers, pharmacy owners, and super administrators, each with tailored dashboards and functionality.

## Recent Completion (January 2024)
The platform now features a complete working system with:
- ✅ Working authentication system with role-based access control
- ✅ Four distinct user role dashboards (Client, Pharmacy Seller, Pharmacy Owner, Super Admin)
- ✅ Complete homepage with proper authentication flow for unauthenticated users
- ✅ AI consultation interface with chat functionality
- ✅ Medicine search and prescription analysis pages
- ✅ Order management and checkout flow
- ✅ Comprehensive help center and support system
- ✅ Legal documentation (Terms of Service, Privacy Policy, Medical Disclaimer)
- ✅ Professional UI/UX with proper navigation and responsive design

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built as a modern React SPA using Vite as the build tool and bundler. The application uses TypeScript for type safety and follows a component-based architecture with shadcn/ui components for consistent UI design. The frontend implements:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom design tokens for medical/pharmaceutical theming
- **Internationalization**: Custom i18n system supporting Uzbek, Russian, and English
- **UI Components**: Radix UI primitives with shadcn/ui styling system

## Backend Architecture
The backend follows a Node.js/Express architecture with TypeScript, structured around service-oriented design patterns:

- **API Layer**: RESTful Express server with middleware for logging, authentication, and error handling
- **Service Layer**: Modular services for AI consultations, medicine management, payments, and delivery
- **Database Layer**: PostgreSQL with Drizzle ORM for type-safe database operations
- **File Handling**: Multer for prescription image uploads and analysis

## Data Storage Solutions
The application uses PostgreSQL as the primary database with the following key design decisions:

- **ORM**: Drizzle ORM chosen for type safety and performance over heavier alternatives like Prisma
- **Cloud Database**: Neon serverless PostgreSQL for scalability and managed infrastructure
- **Session Storage**: PostgreSQL-based session storage for authentication
- **Schema Design**: Comprehensive schema covering users, medicines, pharmacies, orders, prescriptions, AI consultations, and loyalty programs

## Authentication and Authorization
The system implements role-based access control with four distinct user roles:
- **Client**: Standard users for consultations and purchases
- **Pharmacy Seller**: Staff members with order management capabilities
- **Pharmacy Owner**: Business owners with inventory and analytics access
- **Super Admin**: Platform administrators with full system access

Session-based authentication is used with PostgreSQL session storage, providing secure and scalable user management.

## AI Integration Architecture
The platform integrates AI capabilities through multiple channels:
- **Local AI**: OLLAMA integration for on-premises AI medical consultations
- **Medical Prompting**: Specialized prompt engineering for medical advice and prescription analysis
- **Image Analysis**: AI-powered prescription image analysis and verification
- **Recommendation Engine**: AI-driven medicine recommendations based on symptoms and medical history

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for primary data storage
- **WebSocket Support**: Real-time capabilities through Neon's WebSocket connections

## AI and Machine Learning
- **OLLAMA**: Local AI model server for medical consultations and natural language processing
- **Custom AI Service**: Internal service layer for medical prompt engineering and response processing

## Payment Processing
- **Click**: Uzbekistan's primary digital payment system integration
- **Payme**: Secondary payment provider for comprehensive payment coverage

## Delivery Services
- **Yandex Delivery API**: Integration with Yandex's logistics network for medicine delivery throughout Uzbekistan

## Communication Services
- **SendGrid**: Email service for notifications, order confirmations, and prescription verifications

## Medicine Data
- **UzPharm Registry**: Integration with Uzbekistan's official pharmaceutical registry containing 462,000+ registered medicines
- **Real-time Inventory**: Pharmacy inventory management and real-time availability tracking

## Development and Deployment
- **Replit Integration**: Development environment optimizations and deployment tools
- **Vite Build System**: Fast development and optimized production builds
- **TypeScript**: Full-stack type safety and development experience enhancement

## Frontend Libraries
- **TanStack Query**: Advanced server state management and caching
- **Framer Motion**: Animation library for enhanced user experience
- **Radix UI**: Accessible primitive components for robust UI foundation
- **Tailwind CSS**: Utility-first CSS framework with custom medical/pharmaceutical design tokens
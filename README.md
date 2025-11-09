# ClearSkin Platform

> **Know what's in your skincare. Cut through the marketing hype.**

ClearSkin is a mobile-first Progressive Web App (PWA) that empowers users to analyze skincare product ingredients using AI, track products they've tried, and make informed decisions about their skincare routine.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The skincare industry is saturated with marketing hype, making it difficult for consumers to understand what products actually contain and whether they will work for their specific skin needs. ClearSkin solves this by providing:

- **Instant Analysis**: Scan product ingredient lists using your smartphone camera
- **AI-Powered Insights**: Get plain-language explanations powered by Google Gemini AI
- **Personal Tracking**: Track products you've tried and rate their effectiveness
- **Smart Comparisons**: Compare products side-by-side based on actual ingredients
- **Consumer-First**: No affiliate links, no product sales, just transparent information

### Target Market

- **Primary**: Health-conscious millennials and Gen Z (25-40 years old)
- **Secondary**: Anyone with sensitive skin or specific skin concerns
- **Geographic**: Global (starting with English-speaking markets)

### Value Proposition

Unlike competitors who focus on selling products or providing databases, ClearSkin is:
1. **Consumer-first**: No affiliate links, no product sales
2. **Personal**: Tracks YOUR experience, not crowdsourced reviews
3. **Transparent**: Plain language explanations of ingredients
4. **Free**: MVP will be free with potential premium features later

## ✨ Features

### MVP Features (Phase 1)

#### Landing Page
- Clean, minimal hero section with value proposition
- "Scan Your First Product" CTA
- Three key benefits highlighted
- Footer disclaimer: "Not medical advice"

#### Product Scanning & Analysis
- Take photo of ingredient list or upload from library
- AI analyzes ingredients (1-2 second processing)
- Results displayed in structured format:
  - Quick Summary (2-3 sentences)
  - Overall Rating (1-5 stars)
  - Suited For tags (skin types)
  - Key Ingredients (expandable cards)
  - Things to Consider (warnings/concerns)
- Save to My Products
- Rate This Product

#### Product History ("My Products")
- Quick Stats Dashboard (total products, avg rating, favorites)
- 2-column visual grid of product cards
- Each card shows: image, brand, name, rating, date added
- Click any card to view full analysis

#### Product Comparison
- Two side-by-side comparison slots
- Scan/upload new products or select from saved
- Key Insights: similarities, differences, recommendation
- Detailed comparison view

#### User Profile
- Basic information (name, email)
- Skin Profile (optional):
  - Skin Type: Normal, Dry, Oily, Combination, Sensitive
  - Skin Concerns: Acne, Aging, Hyperpigmentation, Redness, Texture, Dryness
- Settings placeholders
- Log Out option

### Future Features (Post-MVP)

**Phase 2:**
- Smart Recommendations based on products you loved
- Product Search by name or ingredient
- Routine Builder for morning/evening routines
- Expiration Tracking
- Price Tracking

**Phase 3:**
- Community Ratings (opt-in)
- Dermatologist Verification
- Ingredient Deep Dives (educational content)
- Sustainability Scores
- Duplicate Detection

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State Management**: React Context + Zustand (lightweight)
- **Icons**: Lucide React
- **PWA**: next-pwa plugin

### Backend
- **API**: Next.js API Routes (serverless functions)
- **Authentication**: Supabase Auth (Google OAuth, Email/Password, Magic Links)
- **Database**: Supabase (PostgreSQL)
- **File Storage**: AWS S3
- **AI Provider**: Google Gemini 1.5 Flash API

### DevOps & Deployment
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions → Vercel
- **Monitoring**: Vercel Analytics + Sentry (errors)
- **Version Control**: Git + GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Supabase account
- AWS account (for S3)
- Google Cloud account (for Gemini API)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Traangas/Claude-Projects.git
   cd Claude-Projects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your credentials (see [Environment Variables](#environment-variables))

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migration:
     ```bash
     # Copy the SQL from supabase/migrations/001_initial_schema.sql
     # Paste and run it in Supabase SQL Editor
     ```

5. **Set up AWS S3**
   - Create S3 bucket: `clearskin-ingredient-photos`
   - Set up CORS policy
   - Create IAM user with S3 access

6. **Get Gemini API Key**
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create new API key

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
clearskin/
├── .env.local              # Environment variables (not committed)
├── .gitignore
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
├── public/
│   ├── icons/              # PWA icons
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Landing page
│   │   ├── scan/
│   │   │   └── page.tsx    # Scan product page
│   │   ├── results/
│   │   │   └── [id]/
│   │   │       └── page.tsx # Analysis results page
│   │   ├── products/
│   │   │   └── page.tsx    # Product history page
│   │   ├── compare/
│   │   │   └── page.tsx    # Compare products page
│   │   ├── profile/
│   │   │   └── page.tsx    # User profile page
│   │   └── api/            # API routes
│   │       ├── analyze/
│   │       │   └── route.ts
│   │       ├── products/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       └── rate/
│   │       │           └── route.ts
│   │       ├── compare/
│   │       │   └── route.ts
│   │       └── user/
│   │           └── profile/
│   │               └── route.ts
│   ├── components/         # React components
│   │   ├── layout/
│   │   │   ├── HamburgerMenu.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductStats.tsx
│   │   ├── analysis/
│   │   │   ├── IngredientCard.tsx
│   │   │   ├── SummarySection.tsx
│   │   │   └── ConcernsSection.tsx
│   │   ├── comparison/
│   │   │   ├── ComparisonCard.tsx
│   │   │   ├── ComparisonSlot.tsx
│   │   │   └── InsightsSection.tsx
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── StarRating.tsx
│   │   └── providers/
│   │       └── AuthProvider.tsx
│   ├── lib/                # Utility functions
│   │   ├── supabase/
│   │   │   ├── client.ts   # Browser client
│   │   │   ├── server.ts   # Server client
│   │   │   └── types.ts    # Database types
│   │   ├── s3/
│   │   │   └── upload.ts   # S3 upload utilities
│   │   ├── ai/
│   │   │   └── gemini.ts   # Gemini API wrapper
│   │   └── utils.ts        # General utilities
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   └── styles/
│       └── globals.css     # Global styles + Tailwind imports
└── supabase/
    ├── migrations/         # Database migrations
    │   └── 001_initial_schema.sql
    └── config.toml         # Supabase configuration
```

## 💻 Development

### Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

2. **Commit & Push**
   ```bash
   git add .
   git commit -m "feature: add new feature"
   git push origin feature-branch
   ```

3. **Pull Request**
   - GitHub PR created
   - Vercel Preview Deploy triggered automatically
   - Review changes on preview URL

4. **Merge to Main**
   - PR merged to main branch
   - Vercel Production Deploy triggered automatically

5. **Live on Production**

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- Use TypeScript for all new code
- Follow Airbnb style guide
- Use Tailwind CSS utility classes
- Light font weights throughout
- Mobile-first responsive design

## 🌐 Deployment

### Vercel Deployment

The project is configured for automatic deployment on Vercel:

1. **Connect to Vercel**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**
   - Add all variables from `.env.local` to Vercel dashboard
   - Set for both Production and Preview environments

3. **Deploy**
   - Push to main branch for production
   - Create PR for preview deployments

### Vercel Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=clearskin-ingredient-photos

# Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# App
NEXT_PUBLIC_APP_URL=https://clearskin.app
```

## 🗄 Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- **user_profiles** - Extended user information
- **products** - Scanned products
- **ingredient_analyses** - AI analysis results
- **user_ratings** - User ratings for products

See `supabase/migrations/001_initial_schema.sql` for complete schema with Row Level Security (RLS) policies.

## 📊 Success Metrics

### MVP Success Criteria (Month 1)
- ✅ 100+ signups
- ✅ 500+ products scanned
- ✅ 80% of scans produce accurate results
- ✅ Average session time > 3 minutes
- ✅ < 5% error rate on analysis
- ✅ Mobile responsive on iOS and Android
- ✅ Page load time < 2 seconds

### Growth Metrics (Month 3)
- 🎯 1,000+ active users
- 🎯 5,000+ products scanned
- 🎯 30% return rate
- 🎯 Average 3+ products per user
- 🎯 4.5+ star rating in user feedback

## 📝 Legal & Compliance

### Important Disclaimers

**ClearSkin is NOT a medical device.** It provides educational information only.

Critical disclaimers are displayed on:
- Landing page footer
- Analysis results page
- Comparison page
- Terms of Service

Language to avoid: "treats", "cures", "diagnoses"
Use instead: "suitable for", "may help with", "commonly used for"

### GDPR Compliance

- Cookie consent banner
- Right to be forgotten (delete account + all data)
- Data export functionality
- Clear privacy policy

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Priorities

**Phase 1 (Weeks 1-2)**: Foundation
- ✅ Project setup
- ✅ Database & authentication
- ✅ Core utilities
- ✅ Landing & scan pages
- ✅ Analysis & results

**Phase 2 (Weeks 3-4)**: User Features
- Product history
- Rating system
- Profile management
- Product comparison

**Phase 3 (Weeks 5-6)**: Launch Preparation
- Security audit
- Content & legal
- User testing
- Production deployment

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com)

## 📄 License

This project is proprietary and confidential.

---

**Version**: 1.0
**Last Updated**: November 6, 2025
**Target Launch**: Q1 2026

---

Made with ❤️ for skincare transparency

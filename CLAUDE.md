# ClearSkin Platform - Claude Development Context

> **Session Context Document**
> Last Updated: March 4, 2026
> Current Branch: `claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB`

## 📋 Project Overview

**ClearSkin** is a mobile-first Progressive Web App (PWA) that empowers users to analyze skincare product ingredients using AI. Users can scan product ingredient lists, get AI-powered analysis, track products they've tried, and make informed skincare decisions.

**Target Market**: Health-conscious millennials and Gen Z (25-40 years old) with sensitive skin or specific skin concerns.

**Value Proposition**: Consumer-first platform with no affiliate links or product sales - just transparent ingredient information and personal tracking.

---

## ✅ What's Been Completed

### 1. Project Structure & Dependencies (✅ DONE)
- Next.js 14+ with TypeScript and App Router
- Tailwind CSS for styling
- All dependencies installed via npm:
  - Supabase for auth & database
  - AWS SDK for S3 storage
  - Google Generative AI (Gemini)
  - Zustand for state management
  - Lucide React for icons

### 2. AWS S3 Integration (✅ DONE)
**Status**: Fully implemented and tested

**What's Working**:
- S3 bucket configured: `wynandcode-storage-skinapp` (eu-west-1)
- Complete S3 service layer at `src/lib/s3/`
- API endpoints for file operations:
  - `/api/test-s3` - Connection test endpoint
  - `/api/files/presigned-url` - Generate presigned URLs
  - `/api/upload` - Direct file upload
  - `/api/files/delete` - Delete files from S3
- React hooks for easy S3 integration
- TypeScript types for S3 operations
- Example component showing upload usage

**File Structure**:
```
src/lib/s3/
├── config.ts          # S3 client configuration
├── service.ts         # Core S3 operations
├── hooks.ts           # React hooks for uploads
├── types.ts           # TypeScript definitions
├── index.ts           # Public exports
└── examples/
    └── ImageUploadExample.tsx
```

**Test Endpoint**:
```bash
curl http://localhost:3000/api/test-s3
# Returns: { success: true, message: "S3 connection successful" }
```

### 3. Environment Configuration (✅ DONE)
- `.env.example` template created
- `.env.local` configured (gitignored)
- All required API keys and credentials set up

### 4. Git Repository (✅ DONE)
- Repository initialized and connected to GitHub
- Branch: `claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB`
- All changes committed with descriptive messages
- Ready for development

---

## 🏗️ Tech Stack

### Frontend (NOT YET BUILT)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State**: React Context + Zustand
- **Icons**: Lucide React
- **PWA**: next-pwa plugin (to be configured)

### Backend (INFRASTRUCTURE READY)
- **API**: Next.js API Routes ✅
- **Auth**: Supabase Auth (needs setup)
- **Database**: Supabase PostgreSQL (needs setup)
- **File Storage**: AWS S3 ✅ WORKING
- **AI**: Google Gemini API (needs integration)

### Deployment
- **Hosting**: Vercel (not yet deployed)
- **CI/CD**: GitHub Actions → Vercel (to be configured)

---

## 🔑 Environment Variables

The `.env.local` file contains (DO NOT COMMIT):

```bash
# Supabase (TO BE SET UP)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AWS S3 (✅ WORKING)
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=<configured>
AWS_SECRET_ACCESS_KEY=<configured>
AWS_S3_BUCKET=wynandcode-storage-skinapp

# Google Gemini AI (TO BE SET UP)
GEMINI_API_KEY=your-gemini-api-key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**S3 Configuration**:
- Region: eu-west-1 (Europe - Ireland)
- Bucket: wynandcode-storage-skinapp
- Purpose: Storing scanned images, profile photos, file uploads

---

## 🚧 What Needs to Be Built

### NEXT STEP: Frontend Development

The backend infrastructure (S3) is ready. Now you need to build the frontend UI and user-facing features.

### Phase 1: Core UI Components (PRIORITY)

#### 1. Landing Page (`src/app/page.tsx`)
**Currently**: Basic placeholder exists
**Needs**:
- Hero section with value proposition
- "Scan Your First Product" CTA button
- Three key benefits section
- Footer with disclaimer: "Not medical advice"
- Mobile-first responsive design
- Light font weights (font-weight: 300-400)

#### 2. Layout Components
**Create**:
- `src/components/layout/Header.tsx` - Top navigation
- `src/components/layout/HamburgerMenu.tsx` - Mobile menu
- `src/components/layout/Footer.tsx` - Footer with disclaimers
- Update `src/app/layout.tsx` - Add providers, global layout

#### 3. Product Scanning Flow
**Files to Create**:
- `src/app/scan/page.tsx` - Camera/upload interface
- `src/components/scan/CameraCapture.tsx` - Camera component
- `src/components/scan/ImageUpload.tsx` - File upload UI
- Integration with existing S3 hooks from `src/lib/s3/hooks.ts`

**Flow**:
1. User clicks "Scan Product"
2. Choose: Take Photo OR Upload from Library
3. Image captured/selected
4. Upload to S3 using existing hooks
5. Send to AI for analysis
6. Display results

#### 4. Analysis Results Page
**Create**:
- `src/app/results/[id]/page.tsx` - Results display
- `src/components/analysis/SummarySection.tsx`
- `src/components/analysis/IngredientCard.tsx`
- `src/components/analysis/ConcernsSection.tsx`
- `src/components/ui/StarRating.tsx`

**Display**:
- Quick Summary (2-3 sentences)
- Overall Rating (1-5 stars)
- Suited For tags (skin types)
- Key Ingredients (expandable cards)
- Things to Consider (warnings)
- Save/Rate buttons

### Phase 2: User Features

#### 5. Product History Page
**Create**:
- `src/app/products/page.tsx`
- `src/components/products/ProductCard.tsx`
- `src/components/products/ProductGrid.tsx`
- `src/components/products/ProductStats.tsx`

**Features**:
- Quick stats dashboard
- 2-column grid of saved products
- Each card: image, brand, name, rating, date

#### 6. Comparison Feature
**Create**:
- `src/app/compare/page.tsx`
- `src/components/comparison/ComparisonSlot.tsx`
- `src/components/comparison/ComparisonCard.tsx`
- `src/components/comparison/InsightsSection.tsx`

**Features**:
- Side-by-side comparison
- Select from saved or scan new
- Key insights and differences

#### 7. User Profile
**Create**:
- `src/app/profile/page.tsx`
- `src/components/profile/SkinProfileForm.tsx`

**Features**:
- Basic info (name, email)
- Skin profile (type, concerns)
- Settings
- Logout

### Phase 3: Backend Integration

#### 8. Supabase Setup
**Tasks**:
1. Create Supabase project
2. Run database migration: `supabase/migrations/001_initial_schema.sql`
3. Set up authentication (Google OAuth, Email/Password)
4. Configure Row Level Security (RLS) policies
5. Update environment variables

**Files to Create**:
- `src/lib/supabase/client.ts` - Browser client
- `src/lib/supabase/server.ts` - Server client
- `src/lib/supabase/types.ts` - Database types
- `src/components/providers/AuthProvider.tsx`

#### 9. AI Integration (Gemini)
**Create**:
- `src/lib/ai/gemini.ts` - Gemini API wrapper
- `src/app/api/analyze/route.ts` - Analysis endpoint

**Flow**:
1. Receive image URL from S3
2. Extract text using Gemini Vision
3. Analyze ingredients using Gemini Pro
4. Return structured analysis

**Response Format**:
```typescript
{
  summary: string;
  rating: number; // 1-5
  suitedFor: string[]; // skin types
  ingredients: {
    name: string;
    purpose: string;
    concerns?: string;
  }[];
  warnings: string[];
}
```

#### 10. API Routes
**Create**:
- `src/app/api/products/route.ts` - List/create products
- `src/app/api/products/[id]/route.ts` - Get/update/delete product
- `src/app/api/products/[id]/rate/route.ts` - Rate product
- `src/app/api/compare/route.ts` - Compare products
- `src/app/api/user/profile/route.ts` - User profile CRUD

---

## 🎨 Design Guidelines

### Visual Style
- **Clean and minimal** - No clutter
- **Mobile-first** - Design for 375px width first
- **Light fonts** - font-weight: 300 (light) or 400 (regular)
- **High contrast** - For readability
- **Ample white space** - Don't cram content

### Color Palette (Suggested)
```css
/* Primary Colors */
--primary: #3B82F6;      /* Blue */
--secondary: #10B981;    /* Green */
--accent: #F59E0B;       /* Amber */

/* Neutrals */
--background: #FFFFFF;
--surface: #F9FAFB;
--text: #111827;
--text-muted: #6B7280;

/* Semantic */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
```

### Typography
```css
/* Headings */
h1: font-weight: 300, 2.5rem
h2: font-weight: 300, 2rem
h3: font-weight: 400, 1.5rem

/* Body */
body: font-weight: 300, 1rem
strong: font-weight: 400 (not bold!)

/* Buttons */
button: font-weight: 400, uppercase
```

---

## 📝 Important Notes & Decisions

### 1. Legal Disclaimers (CRITICAL)
**ClearSkin is NOT a medical device.** It provides educational information only.

**Required disclaimers**:
- Landing page footer: "Not medical advice. Consult a dermatologist."
- Analysis results: "This analysis is for educational purposes only."
- Comparison page: Same disclaimer

**Language to AVOID**:
- ❌ "treats", "cures", "diagnoses"

**Use instead**:
- ✅ "suitable for", "may help with", "commonly used for"

### 2. Image Upload Best Practices
- **Max file size**: 10MB
- **Accepted formats**: JPEG, PNG, HEIC
- **Compression**: Client-side before upload
- **Progress indicator**: Show upload progress
- **Error handling**: Clear error messages

### 3. AI Analysis Considerations
- **Response time**: Aim for 1-2 seconds
- **Error handling**: Graceful fallbacks if AI fails
- **Caching**: Consider caching analyses of identical products
- **Rate limiting**: Implement to prevent abuse

### 4. Mobile PWA Features (Future)
- Installable on home screen
- Offline capability (service worker)
- Push notifications (opt-in)
- Camera access for scanning

### 5. Authentication Flow
**Sign Up/Login Options**:
1. Email/Password (traditional)
2. Magic Link (passwordless email)
3. Google OAuth (fastest)

**Protected Routes**:
- `/scan` - Requires auth
- `/products` - Requires auth
- `/compare` - Requires auth
- `/profile` - Requires auth

**Public Routes**:
- `/` - Landing page (public)

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Test S3 connection
curl http://localhost:3000/api/test-s3
```

---

## 📚 Reference Documentation

### Complete Project Spec
See: `2025 11 06 - ClearSkin Platform - Complete Project Documentation.pdf`

### Key Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini API](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [AWS S3 SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

### Database Schema
Location: `supabase/migrations/001_initial_schema.sql`

**Main Tables**:
- `user_profiles` - Extended user info, skin profile
- `products` - Scanned products
- `ingredient_analyses` - AI analysis results
- `user_ratings` - User ratings for products

---

## 🚀 Quick Start for Next Session

### If continuing Frontend Development:

1. **Pull latest code**:
   ```bash
   git pull origin claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Begin with Landing Page**:
   - Edit `src/app/page.tsx`
   - Create layout components in `src/components/layout/`
   - Follow design guidelines above

4. **Use existing S3 integration**:
   ```typescript
   import { useS3Upload } from '@/lib/s3/hooks';

   const { upload, progress, error } = useS3Upload();
   ```

### If setting up Supabase:

1. **Create Supabase project** at https://app.supabase.com
2. **Copy SQL from** `supabase/migrations/001_initial_schema.sql`
3. **Run in Supabase SQL Editor**
4. **Update `.env.local`** with Supabase credentials
5. **Test connection**

### If integrating Gemini AI:

1. **Get API key** from https://ai.google.dev/
2. **Update `.env.local`**: `GEMINI_API_KEY=your-key`
3. **Create** `src/lib/ai/gemini.ts`
4. **Create** `src/app/api/analyze/route.ts`
5. **Test with sample image**

---

## 📊 Development Timeline

**MVP Target**: 6 weeks

- **Weeks 1-2**: ✅ Foundation complete
  - ✅ Project setup
  - ✅ S3 integration
  - ✅ Git repository

- **Weeks 3-4**: 🚧 Frontend Development (CURRENT)
  - Landing page
  - Scan & analysis flow
  - Product history
  - Comparison feature

- **Weeks 5-6**: 📅 Backend Integration & Launch
  - Supabase setup
  - AI integration
  - Testing & QA
  - Production deployment

---

## 🎯 Success Criteria

**MVP Launch Requirements**:
- ✅ Mobile-responsive on iOS and Android
- ✅ Can scan product and get analysis in < 5 seconds
- ✅ Analysis accuracy > 80%
- ✅ Secure authentication (Supabase Auth)
- ✅ S3 storage working (DONE)
- ✅ Error rate < 5%
- ✅ Page load time < 2 seconds

**User Metrics (Month 1)**:
- 100+ signups
- 500+ products scanned
- Average session time > 3 minutes
- 30% return rate

---

## 🐛 Known Issues & Limitations

### Current Limitations:
- No frontend UI built yet
- Supabase not configured
- Gemini AI not integrated
- No authentication flow
- No database schema deployed

### Technical Debt:
None yet - project is in early stages

### Future Enhancements:
- Offline support (PWA)
- Product search by name
- Routine builder
- Community ratings
- Price tracking

---

## 💡 Tips for Next Claude Session

1. **Read this file first** to understand context
2. **Check git log** to see recent commits
3. **Start with small, testable changes**
4. **Follow mobile-first approach**
5. **Use TypeScript strictly** - no `any` types
6. **Test on mobile viewport** (375px width)
7. **Keep it simple** - Don't over-engineer MVP
8. **Add disclaimers** where appropriate
9. **Handle errors gracefully** - User-friendly messages
10. **Commit frequently** with clear messages

### Before Starting:
```bash
# Check current state
git status
git log --oneline -5

# Ensure dependencies installed
npm install

# Start dev server
npm run dev
```

### During Development:
- Test S3 uploads early: `curl http://localhost:3000/api/test-s3`
- Keep mobile viewport open in DevTools
- Check TypeScript errors: `npm run type-check`
- Lint code: `npm run lint`

### Before Committing:
- Verify changes work on mobile
- Check for console errors
- Run type-check and lint
- Write clear commit message
- Push to branch: `claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB`

---

## 🙋 Questions for Consideration

If you're the next Claude session working on this project, here are some questions to think about:

1. **Landing Page Design**: Should we use a gradient background or keep it minimal white?
2. **Camera vs Upload**: Should camera be the default, or give equal weight to both options?
3. **Analysis Display**: Should ingredient cards be expanded by default or collapsed?
4. **Rating System**: 5-star rating or thumbs up/down for simplicity?
5. **Navigation**: Bottom tab bar or hamburger menu for mobile?
6. **Loading States**: Skeleton screens or spinners during AI analysis?
7. **Empty States**: What to show when user has no saved products yet?
8. **Onboarding**: Should we have a tutorial/walkthrough on first launch?

---

**That's everything! You should have full context to continue development.**

Good luck! 🚀

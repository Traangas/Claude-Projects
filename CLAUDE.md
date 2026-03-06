# ClearSkin Platform - Claude Development Context

> **Session Context Document**
> Last Updated: March 5, 2026
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
  - `@google/generative-ai` v0.24.1 (Gemini)
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

### 3. Environment Configuration (✅ DONE)
- `.env.example` template created
- `.env.local` configured (gitignored)
- All required API keys and credentials set up

### 4. Git Repository (✅ DONE)
- Repository initialized and connected to GitHub
- Branch: `claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB`
- All changes committed with descriptive messages

### 5. Core Scan UI (✅ DONE)
**Status**: Fully working end-to-end

**What's Working**:
- Single-page mobile-first scan interface at `src/app/page.tsx`
- Upload zone — tap to take photo or choose from library
- Image preview with reset button
- "Scan Ingredients" button sends image directly to Gemini (no S3 needed for this phase)
- Spinner with "Analysing ingredients…" loading state
- 4-section results display (see below)

**Results Sections**:
1. **Summary** — 2 factual sentences about the product based on ingredients only, no marketing language
2. **Ideal For** — Black pill tags (e.g. "dry skin", "acne-prone skin")
3. **Cautions** — Amber warning icons for allergens, irritants, comedogenic ingredients. Empty array if none.
4. **Full Ingredient List** — Numbered, exactly as they appear on the label

### 6. Gemini AI Integration (✅ DONE)
**Status**: Fully working

**Details**:
- Model: `gemini-2.5-flash` (required for new API keys — older models not available)
- SDK: `@google/generative-ai` v0.24.1
- API route: `src/app/api/analyze/route.ts`
- Image sent as base64 inline data (no S3 upload needed)
- Gemini returns structured JSON, parsed server-side before sending to client
- Markdown code fence stripping handled in case Gemini wraps the response

**API Response Format**:
```typescript
{
  summary: string;       // 2 factual sentences
  idealFor: string[];    // skin types / concerns
  cautions: string[];    // warnings (empty array if none)
  ingredients: string[]; // full list as on label
}
```

**Gemini Prompt Strategy**:
- Instructs Gemini to return raw JSON only (no markdown)
- Factual language enforced — no marketing terms
- Cautions only included for real concerns (allergens, UV sensitisers, comedogenic ingredients)
- Fallback: if no ingredient list visible, returns `{"error": "..."}`

---

## 🏗️ Tech Stack

### Frontend (✅ BASIC VERSION BUILT)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State**: React `useState` (Zustand available for future use)
- **Icons**: Lucide React
- **PWA**: next-pwa plugin (to be configured)

### Backend
- **API**: Next.js API Routes ✅
- **Auth**: Supabase Auth (needs setup)
- **Database**: Supabase PostgreSQL (needs setup)
- **File Storage**: AWS S3 ✅ WORKING
- **AI**: Google Gemini 2.5 Flash ✅ WORKING

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

# Google Gemini AI (✅ WORKING)
GEMINI_API_KEY=<configured>

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Gemini API Notes**:
- Requires a **paid/billing-enabled** Google AI account — free tier quota is 0 for `gemini-2.5-flash`
- Get/manage keys at: https://aistudio.google.com
- Model `gemini-2.0-flash` is NOT available to new API keys — use `gemini-2.5-flash`
- SDK version must be `^0.24.1` or higher — older versions (0.17.x) return 404 on current models

---

## 🚧 What Needs to Be Built

### Phase 2: User Features

#### 1. Product History Page
**Create**:
- `src/app/products/page.tsx`
- `src/components/products/ProductCard.tsx`
- `src/components/products/ProductGrid.tsx`

**Features**:
- 2-column grid of saved scans
- Each card: image thumbnail, summary, ideal-for tags, date

#### 2. Comparison Feature
**Create**:
- `src/app/compare/page.tsx`
- `src/components/comparison/ComparisonCard.tsx`

**Features**:
- Side-by-side ingredient comparison
- Highlight shared and unique ingredients

#### 3. User Profile
**Create**:
- `src/app/profile/page.tsx`
- `src/components/profile/SkinProfileForm.tsx`

**Features**:
- Skin type and concerns
- Settings and logout

### Phase 3: Backend Integration

#### 4. Supabase Setup
**Tasks**:
1. Create Supabase project at https://app.supabase.com
2. Run migration: `supabase/migrations/001_initial_schema.sql`
3. Set up auth (Google OAuth, Email/Password)
4. Configure Row Level Security (RLS) policies
5. Update `.env.local` with Supabase credentials

**Files to Create**:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/types.ts`
- `src/components/providers/AuthProvider.tsx`

#### 5. Persist Scan Results
- Save analysis results to Supabase after each scan
- Link results to logged-in user
- Enable history and comparison features

#### 6. Additional API Routes
- `src/app/api/products/route.ts` - List/create saved products
- `src/app/api/products/[id]/route.ts` - Get/update/delete
- `src/app/api/compare/route.ts` - Compare two products
- `src/app/api/user/profile/route.ts` - User profile CRUD

---

## 🎨 Design Guidelines

### Visual Style
- **Clean and minimal** - No clutter
- **Mobile-first** - Design for 375px width first
- **Light fonts** - font-weight: 300 (light) or 400 (regular)
- **High contrast** - For readability
- **Ample white space** - Don't cram content

### Established Patterns (already in use)
- Cards: `bg-gray-50 rounded-2xl p-5`
- Section labels: `text-xs uppercase tracking-widest text-gray-300`
- Body text: `text-sm font-light leading-6 text-gray-700`
- Tags/pills: `bg-black text-white text-xs font-light px-3 py-1.5 rounded-full`
- Warning items: amber `AlertTriangle` icon from lucide-react
- Primary button: `.btn-primary` (defined in globals.css)
- Reset/secondary actions: `text-xs text-gray-400 underline`

### Color Palette
```css
--background: #FFFFFF;
--surface: #F9FAFB;      /* bg-gray-50 */
--text: #111827;          /* text-gray-900 */
--text-muted: #6B7280;    /* text-gray-500 */
--text-faint: #D1D5DB;    /* text-gray-300 — labels */
--warning: #F59E0B;       /* amber-400 — cautions */
```

---

## 📝 Important Notes & Decisions

### 1. Legal Disclaimers (CRITICAL)
**ClearSkin is NOT a medical device.** It provides educational information only.

**Required disclaimers**:
- Page footer: "For educational use only. Not medical advice."
- Analysis results: factual language enforced via AI prompt

**Language to AVOID**:
- ❌ "treats", "cures", "diagnoses"

**Use instead**:
- ✅ "suitable for", "may help with", "commonly used for"

### 2. Gemini Image Handling
- Image is converted to base64 client-side from FileReader
- Sent as `inlineData` in the Gemini request (no S3 upload required for analysis)
- S3 upload can be added later when persisting results
- Max practical image size: ~4MB base64 (Gemini API limit)

### 3. AI Analysis Prompt Rules
- Always request raw JSON — strip markdown code fences server-side as a fallback
- Enforce factual-only language in the prompt
- Cautions array should be empty `[]` if no real concerns, not omitted
- If no ingredient list is visible, Gemini returns `{"error": "..."}` — handled as 422

### 4. Node.js Version
- **System Node.js is v16** — too old for Next.js 14
- **Use nvm Node.js v18.20.8**: `/Users/Wynand/.nvm/versions/node/v18.20.8/bin/node`
- `.claude/launch.json` is configured to use the correct node binary directly
- When running manually: `/Users/Wynand/.nvm/versions/node/v18.20.8/bin/node node_modules/.bin/next dev`

### 5. iCloud & node_modules
- `~/Documents` is synced by iCloud — this causes `ETIMEDOUT` errors when Node reads `node_modules`
- **Fix applied**: `node_modules` is a symlink → `node_modules.nosync` (iCloud ignores `.nosync` files)
- If the symlink ever breaks (e.g. after a restart), recreate it:
  ```bash
  cd /Users/Wynand/Documents/Claude-Projects
  rm -f node_modules && ln -s node_modules.nosync node_modules
  ```
- Never run `npm install` without checking the symlink exists first

---

## 🔧 Development Commands

```bash
# Activate correct Node.js version first
source ~/.nvm/nvm.sh && nvm use 18

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Test S3 connection
curl http://localhost:3000/api/test-s3

# Test Gemini analyze endpoint
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"imageBase64":"...","mimeType":"image/jpeg"}'
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

1. **Pull latest code**:
   ```bash
   git pull origin claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB
   ```

2. **Use correct Node.js version**:
   ```bash
   source ~/.nvm/nvm.sh && nvm use 18
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start dev server**:
   ```bash
   npm run dev
   ```
   > ⚠️ First compile takes 60-130 seconds on this machine. Wait for "Ready" before opening browser.

5. **Open**: http://localhost:3000

---

## 📊 Development Timeline

**MVP Target**: 6 weeks

- **Weeks 1-2**: ✅ Foundation complete
  - ✅ Project setup & S3 integration
  - ✅ Git repository

- **Weeks 3-4**: ✅ Core scan feature complete
  - ✅ Mobile scan UI
  - ✅ Gemini AI integration
  - ✅ Structured 4-section analysis
  - 🚧 Product history (next)
  - 🚧 Comparison feature (next)

- **Weeks 5-6**: 📅 Backend Integration & Launch
  - Supabase setup & auth
  - Persist scan results
  - Testing & QA
  - Production deployment (Vercel)

---

## 🎯 Success Criteria

**MVP Launch Requirements**:
- ✅ Mobile-responsive on iOS and Android
- ✅ Can scan product and get analysis (currently ~3-5 seconds)
- ✅ S3 storage ready
- ✅ Gemini AI working
- 🚧 Secure authentication (Supabase Auth)
- 🚧 Error rate < 5%
- 🚧 Page load time < 2 seconds

---

## 🐛 Known Issues & Limitations

### Current Limitations:
- No user authentication yet
- Scan results not persisted (lost on page refresh)
- Supabase not configured
- No product history or comparison yet
- Dev server takes 60-130 seconds to start on this machine (Node 18 via nvm)

### Technical Debt:
- S3 upload hooks exist but not yet wired into the scan flow (not needed until we persist results)

### Future Enhancements:
- Offline support (PWA / service worker)
- Product search by name
- Routine builder
- Community ratings
- Price tracking

---

## 💡 Tips for Next Claude Session

1. **Read this file first** — full context is here
2. **Node 18 is required** — system is Node 16, use nvm (see Quick Start)
3. **First server start is slow** — ~2 minutes, this is normal
4. **Gemini model must be `gemini-2.5-flash`** — older models 404 on new API keys
5. **Design patterns are established** — follow existing card/label/tag styles
6. **No S3 needed for scan** — image goes base64 → Gemini directly
7. **TypeScript strictly** — no `any` types
8. **Mobile-first** — test at 375px width
9. **Commit frequently** with clear messages
10. **Check git log** to see recent work: `git log --oneline -10`

---

**That's everything! You should have full context to continue development.**

Good luck! 🚀

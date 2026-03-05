# ClearSkin Platform

> **Know what's in your skincare. Cut through the marketing hype.**

ClearSkin is a mobile-first Progressive Web App (PWA) that lets users scan skincare product ingredient lists and get AI-powered analysis in plain language — no marketing spin, no affiliate links.

## 🌟 Overview

The skincare industry is saturated with marketing hype, making it hard for consumers to understand what's actually in their products. ClearSkin solves this by:

- **Instant scanning**: Photograph an ingredient list and get a breakdown in seconds
- **AI-powered analysis**: Google Gemini reads the label and provides factual, structured insights
- **Consumer-first**: No affiliate links, no product sales — just transparent information

### Target Market
Health-conscious millennials and Gen Z (25-40) with sensitive skin or specific skin concerns.

---

## ✨ Current Features

### ✅ Ingredient Scanner (Live)
- Take a photo or upload an image of any product's ingredient list
- Gemini AI analyzes the ingredients and returns:
  1. **Summary** — 2 factual sentences about what the product does
  2. **Ideal For** — Skin types and concerns this combination suits
  3. **Cautions** — Allergens, irritants, UV sensitisers, comedogenic ingredients
  4. **Full Ingredient List** — Every ingredient, numbered, exactly as on the label
- Fully mobile-optimised — designed for 375px width first

### 🚧 Coming Soon
- Product history (save & revisit past scans)
- Side-by-side product comparison
- User accounts (Supabase auth)
- Skin profile (personalised recommendations)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| AI | Google Gemini 2.5 Flash |
| Storage | AWS S3 (eu-west-1) |
| Auth / DB | Supabase (PostgreSQL) — coming soon |
| Hosting | Vercel — coming soon |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18.17.0 or higher** (v20 recommended)
- npm v10+
- A Google AI Studio account with a **billing-enabled** API key
- AWS account with S3 bucket configured (for file storage)

> ⚠️ **Node version note**: If you're on macOS with an older system Node, use [nvm](https://github.com/nvm-sh/nvm):
> ```bash
> nvm install 18 && nvm use 18
> ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Traangas/Claude-Projects.git
   cd Claude-Projects
   git checkout claude/setup-github-repo-011CUxeMQ1dQ3yxPqZk8ATYB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and fill in your credentials (see below).

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   > First compile takes ~60 seconds. Wait for "Ready" in the terminal before opening the browser.

5. **Open** [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

```bash
# Google Gemini AI (required for scanning)
# Get key at https://aistudio.google.com — billing must be enabled
GEMINI_API_KEY=your-gemini-api-key

# AWS S3 (required for file storage)
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=wynandcode-storage-skinapp

# Supabase (required for auth & database — coming soon)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Gemini API note**: Use model `gemini-2.5-flash`. Older models (`gemini-2.0-flash`, `gemini-1.5-flash`) return 404 or are unavailable to new API keys. A billing-enabled account is required — the free tier quota for current models is 0.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Main scan UI (single-page)
│   ├── layout.tsx                # Root layout
│   └── api/
│       ├── analyze/route.ts      # Gemini AI analysis endpoint
│       ├── upload/route.ts       # S3 file upload
│       ├── files/
│       │   ├── presigned-url/    # Generate S3 presigned URLs
│       │   └── delete/           # Delete S3 files
│       └── test-s3/route.ts      # S3 connection test
├── lib/
│   └── s3/                       # S3 service layer + hooks
└── styles/
    └── globals.css               # Global styles + Tailwind
```

---

## 💻 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # ESLint

# Test S3 connection
curl http://localhost:3000/api/test-s3
```

---

## 📊 Development Status

| Feature | Status |
|---|---|
| Project setup & dependencies | ✅ Done |
| AWS S3 integration | ✅ Done |
| Gemini AI integration | ✅ Done |
| Mobile scan UI | ✅ Done |
| Structured 4-section analysis | ✅ Done |
| User authentication (Supabase) | 🚧 Next |
| Save scan results to database | 🚧 Next |
| Product history page | 🚧 Next |
| Product comparison | 🚧 Next |
| Vercel deployment | 📅 Upcoming |

---

## 📝 Legal

**ClearSkin is NOT a medical device.** All analysis is for educational purposes only. Consult a dermatologist for skin concerns.

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Version**: 1.0.0 · **Last Updated**: March 5, 2026 · **License**: Proprietary

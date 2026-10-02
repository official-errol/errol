# Sidequest Studio

A personal multi-purpose platform: portfolio, blog, file sharing, and community space.

## Live Site

https://sidequeststudio.vercel.app

## Tech Stack

- Next.js (App Router, SSR)
- Supabase (Postgres, Auth, RLS)
- Cloudflare R2 (S3-compatible storage)
- Vercel (hosting)
- Tailwind CSS

## Features

- Public portfolio and project showcase
- Blog with authenticated comments and reactions
- File sharing with download management
- Admin dashboard for content and storage
- User authentication via Supabase

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase project
- Cloudflare R2 bucket

### Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in credentials
4. Run dev server: `npm run dev`

## Documentation

- `DESIGN.md` for the design system
- `docs/architecture.md` for architecture decisions

## License

MIT

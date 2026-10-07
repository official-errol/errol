# Architecture

## Overview

Errol separates concerns into three main systems:

- Supabase handles authentication, Postgres database, and Row Level Security
- Cloudflare R2 handles file storage with zero egress fees
- Vercel hosts the Next.js application

## Why Supabase for Database and Auth

Supabase provides Postgres with Row Level Security built in. RLS policies enforce authorization at the database layer, so application code is not the only line of defense. Auth is integrated with the same user model.

## Why Cloudflare R2 for Storage

R2 offers 10 GB free storage with zero egress fees. Supabase Storage's free tier is 1 GB with 5 GB monthly bandwidth and a 50 MB file size limit, which is too restrictive for a file-sharing feature.

## Why Vercel for Hosting

Vercel provides zero-config deployment for Next.js, preview branches per pull request, and edge middleware support for session refresh.

## Data Flow

1. User authenticates through Supabase Auth
2. Session tokens stored in cookies for SSR access
3. File uploads: client requests presigned URL from server, server verifies Supabase session, returns R2 presigned URL, client uploads directly to R2
4. File downloads: client requests download, server verifies session, returns short-lived presigned URL or public URL
5. File metadata stored in Supabase, file bytes stored in R2

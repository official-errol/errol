---
version: alpha
name: Errol
description: A personal multi-purpose platform for portfolio, blog, file-sharing, and community.

colors:
  background: "#FAFAF8"
  surface: "#FFFFFF"
  surface-elevated: "#F5F5F2"
  surface-subtle: "#F0F0EC"
  text-primary: "#1A1C1E"
  text-secondary: "#6C7278"
  text-tertiary: "#9CA3AF"
  text-inverse: "#FFFFFF"
  border: "#E5E7EB"
  border-strong: "#D1D5DB"
  primary: "#1A1C1E"
  accent: "#3B82F6"
  accent-hover: "#2563EB"
  accent-subtle: "#EFF6FF"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"

typography:
  heading-1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading-2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  heading-3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "JetBrains Mono, SFMono-Regular, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px

rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
---

# Errol Design System

A calm, technical, personal space for side projects, writing, and shared files.

## Overview

Errol is a personal multi-purpose platform. The visual language should feel like a well-organized workshop: functional but not cold, technical but not intimidating.

The design prioritizes readability for long-form content, clarity for file management and admin tasks, and warmth so it feels like a personal project.

## Colors

The palette uses a warm off-white background with a near-black primary. This creates high contrast for reading while avoiding the sterile feel of pure white and black.

| Token          | Value   | Role                                       |
| -------------- | ------- | ------------------------------------------ |
| background     | #FAFAF8 | Page background                            |
| surface        | #FFFFFF | Cards, panels, modals                      |
| text-primary   | #1A1C1E | Headings, body text                        |
| text-secondary | #6C7278 | Metadata, captions                         |
| accent         | #3B82F6 | Links, focus rings, interactive highlights |
| border         | #E5E7EB | Dividers, card borders                     |

Rule: Use accent sparingly. One accent per view.

## Typography

Inter for everything except code. JetBrains Mono for code blocks, file names, and technical metadata.

| Style      | Size | Weight | Use              |
| ---------- | ---- | ------ | ---------------- |
| Heading 1  | 48px | 700    | Page titles      |
| Heading 2  | 32px | 600    | Section headers  |
| Heading 3  | 24px | 600    | Card titles      |
| Body       | 16px | 400    | Paragraphs       |
| Body Small | 14px | 400    | Metadata         |
| Code       | 14px | 400    | Code, file paths |

Rule: Never use font sizes outside this scale.

## Layout and Spacing

Base unit: 4px.

| Token | Value | Use                        |
| ----- | ----- | -------------------------- |
| xs    | 4px   | Tight gaps, icon padding   |
| sm    | 8px   | Button padding, list gaps  |
| md    | 16px  | Card padding, form groups  |
| lg    | 24px  | Section padding, card gaps |
| xl    | 32px  | Major section spacing      |
| 2xl   | 48px  | Page section breaks        |
| 3xl   | 64px  | Hero spacing               |

Max content width: 720px for prose, 1200px for layout.

## Shapes and Depth

| Token | Value  | Use                         |
| ----- | ------ | --------------------------- |
| sm    | 6px    | Inputs, small buttons, tags |
| md    | 10px   | Buttons, cards              |
| lg    | 16px   | Modals, large cards, images |
| full  | 9999px | Avatars, pills              |

Elevation rule: Use borders, not shadows, for hierarchy. Shadows only for modals and dropdowns.

## Components

### Buttons

- Primary: background primary, color white, border-radius md, padding 8px 24px
- Secondary: transparent background, border 1px border, color text-primary
- Hover: primary shifts to accent; secondary gets surface-subtle background

### Cards

- background surface, border 1px border, border-radius lg, padding 24px
- No shadow by default
- On hover for clickable cards: border-color border-strong

### Inputs

- background surface, border 1px border, border-radius sm, padding 8px 16px
- Focus: border-color accent, box-shadow 0 0 0 3px accent-subtle

## Do's and Don'ts

Do:

- Use the off-white background for pages
- Keep prose to 720px max width
- Use text-secondary for metadata
- Use borders for card separation

Don't:

- Don't use pure black or pure white
- Don't add new font sizes without updating this file
- Don't use more than one accent color in a single view
- Don't add shadows to cards

## Agent Instructions

When generating UI for this project:

1. Read this file first
2. Use tokens, not raw values
3. When in doubt, choose the simpler option
4. Admin UI can be denser but must use the same tokens
5. File-sharing UI should emphasize clarity

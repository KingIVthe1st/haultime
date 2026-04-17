# Haul Time Dashboard Build Plan

## Goal
Build a premium mobile-first command-center dashboard that functions as:
- CRM
- lead inbox
- pipeline board
- callback / jobs organizer
- review and SEO engine
- Jade oversight console

## Stack recommendation
Stay in the existing Next.js app and add a private dashboard area.

### Recommended app structure
- `app/(public)/...` for the marketing site
- `app/(ops)/dashboard/...` for the private command center
- shared component system for both public and ops surfaces

### Suggested data/storage direction
Current live stack is enough for the public site, but the dashboard needs durable data.

Recommended next layer:
- Supabase Postgres or equivalent managed Postgres
- object storage for photos / attachments
- server-side auth for owner accounts
- structured event tables for lead and automation history

## Phase 1, must ship
### Dashboard shell
- mobile-first bottom nav
- desktop sidebar
- role-safe layout
- notifications center

### CRM / lead inbox
- all leads list
- source badges
- urgency scoring
- transcript timeline
- owner assignment
- notes
- next action

### Pipeline
- kanban on desktop
- stacked segmented list on mobile
- drag or status-change actions

### Lead detail
- contact block
- job details
- conversation history
- photos placeholder
- callback info
- tasks and reminders

### Jobs / callbacks
- today / tomorrow lists
- callback due board
- same-day opportunity section

### Analytics strip
- leads today
- response time
- quotes pending
- won this week
- reviews requested

### Jade panel
- chat volume
- flagged conversations
- top question themes
- fallback count

## Phase 2, high leverage
- photo uploads
- review workflow
- review response drafts
- SEO opportunity board
- FAQ mining from transcripts
- repeat/referral tracking
- website content suggestions from real lead patterns

## Phase 3, power layer
- Google Business Profile workflows
- local content publishing queue
- deeper attribution and funnel analytics
- automation rules builder
- richer calendar and schedule views

## Design system direction
- dark luxury base, high-clarity surfaces
- card-first layout system
- strong typography and spacing
- editorial density, not cramped density
- mobile default experience should feel native-app-like

## Immediate engineering priorities before dashboard UI polish
1. Durable lead storage
2. Owner auth
3. Dashboard data model
4. Shared CRM entities
5. Event logging for lead and automation changes
6. Photo attachment strategy

## Suggested routes
- `/dashboard`
- `/dashboard/inbox`
- `/dashboard/pipeline`
- `/dashboard/jobs`
- `/dashboard/reviews`
- `/dashboard/seo`
- `/dashboard/jade`
- `/dashboard/settings`

## Success test
Open the dashboard on a phone and the brothers should instantly know:
- who came in
- who is hot
- who needs a callback
- which leads are aging badly
- what Jade is doing
- what the business should do next

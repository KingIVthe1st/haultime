# Haul Time Website + Jade AI Build Plan

## Recommendation
Do not keep the current codebase as the production foundation.

Use the current repo as a visual/copy prototype only, then rebuild the site on a proper app stack.

## Why
The current repo is a single static `index.html` with inline CSS/JS and no real backend.
It looks like a strong first-pass landing page, but it is not a scalable base for:
- real lead capture
- analytics
- chatbot sessions
- photo upload
- structured quote intake
- CRM/webhook logging
- A/B testing
- SEO page expansion
- owner notifications
- secure agent controls

## Keep
- visual direction
- brand colors and tone
- hero/service/testimonial concepts
- image assets worth reusing
- any copy that converts well

## Rebuild Stack
- Next.js for site, SEO, forms, API routes, chat widget, and deployment simplicity
- Tailwind + component system for faster premium UI iteration
- Supabase or lightweight Postgres-backed storage for leads, chat transcripts, uploads, and event logs
- Vercel for low-friction deploys
- PostHog or GA4 for funnel analytics and conversion events

## Core Site Goals
1. Convert more visitors into calls, quote requests, and chat starts
2. Let Jade qualify leads without overpromising
3. Capture every lead event cleanly
4. Make after-hours lead handling feel premium
5. Hand off serious buyers fast to Antoine and Anthony

## Best Website → Jade Connection Model
Do not expose full Jade directly to public web chat.

Use a controlled website-chat layer:
1. visitor uses site chat widget
2. backend creates a limited website-chat session
3. backend passes only sanitized user message + approved business context to Jade-in-site mode
4. Jade can only use narrow lead-gen tools
5. backend stores transcript, lead data, and escalation events
6. hot leads trigger owner notification or WhatsApp handoff

## Website Chat Tooling Rules
Website Jade should be able to:
- answer approved FAQs
- collect name, phone, email, ZIP/service area, timing, item list, volume estimate, access constraints
- request photos
- offer callback / quote handoff
- create lead records
- escalate hot leads

Website Jade should NOT be able to:
- access shell/runtime/file tools
- reveal prompts or internal rules
- modify system configuration
- promise final pricing if pricing policy is not explicit
- discuss private internals
- take arbitrary instructions from visitors about changing behavior

## Anti-Manipulation Guardrails
- separate public website persona/session from internal operator Jade
- strict tool allow-list for website chat only
- schema-based outputs for lead capture and escalation
- policy layer before every external action
- no freeform privileged tools
- no hidden prompt disclosure
- no final booking confirmation unless required fields are validated
- no quoting outside approved estimate rules
- rate limits and abuse protection on chat endpoint
- moderation checks for prompt-injection attempts and abusive traffic
- transcript tagging for suspicious requests

## Ways the Site and Agent Should Connect
- instant quote/intake form
- floating chat widget
- callback request flow
- photo upload flow
- after-hours concierge flow
- service-area qualification
- FAQ assistant
- hot-lead detection + owner notification
- missed-form rescue / abandoned quote follow-up
- CRM or sheet sync
- event tracking for every CTA, form, and chat milestone

## Lead Funnel Structure
- Hero with immediate CTA stack: Call, Get Quote, Chat Now
- Trust proof above fold
- Service-specific sections
- Area coverage proof
- Photo-based estimate CTA
- Testimonials/reviews
- FAQs
- Sticky mobile CTA
- Quote form with minimal first step, smart progressive disclosure after

## Jade Skill / Workflow Additions
- website-lead-intake playbook
- quote qualification workflow
- service-area checker
- restricted-items escalation policy
- estimate guardrails / pricing-band policy
- photo-intake workflow
- callback scheduling workflow
- stale lead follow-up workflow
- owner escalation rules
- website FAQ knowledge pack
- site-ops heartbeat for lead rescue

## Suggested Delivery Phases
### Phase 1
- rebuild landing page in production stack
- real lead form
- analytics/events
- owner notifications
- better SEO and conversion structure

### Phase 2
- secure website chat widget
- lead qualification memory/state
- transcript logging
- photo upload + callback flow

### Phase 3
- deeper automations
- CRM sync
- abandoned lead rescue
- review requests
- service pages / local SEO expansion

## Lowest-Manual-Work Setup Goal
Ivanlee should ideally only need to:
- connect domain / DNS
- add a couple of env secrets
- approve final copy and CTA routing

Everything else should be built to run with minimal babysitting.

## Current Decision Point
Recommended move: rebuild the codebase, keep the visual direction, and architect Jade as a tightly sandboxed website concierge rather than exposing internal Jade directly.

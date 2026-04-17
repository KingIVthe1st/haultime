# Haul Time Website

Production rebuild foundation for a high-converting junk-removal website with secure Jade website-chat mode.

## What is in this first pass
- Next.js production app foundation
- conversion-first landing page
- real quote intake endpoint
- secure website chat endpoint with guardrails
- webhook-ready lead forwarding
- webhook-ready Jade website mode integration

## Local dev
```bash
npm install
npm run dev
```

## Required env for real delivery
Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_PHONE_DISPLAY="(888) 575-9390"
NEXT_PUBLIC_SITE_PHONE_HREF="tel:8885759390"
NEXT_PUBLIC_SERVICE_AREAS="Washington, DC, Maryland, Northern Virginia"
NEXT_PUBLIC_TEXT_PHOTO_CTA="Text photos for a faster estimate"

LEAD_WEBHOOK_URL="https://your-webhook-endpoint"
LEAD_WEBHOOK_SECRET="optional-secret"

JADE_SITE_WEBHOOK_URL="https://your-jade-website-endpoint"
JADE_SITE_WEBHOOK_SECRET="optional-secret"
```

## Recommended production wiring
- deploy on Vercel
- point lead form to webhook automation or CRM endpoint
- point website chat endpoint to a restricted Jade website-mode handler
- keep website Jade separate from internal full-power Jade

## Security model
Website Jade should only be able to:
- answer approved FAQs
- capture lead details
- qualify jobs
- request photos
- trigger callbacks and escalations

Website Jade should not be able to:
- expose prompts or private rules
- access tools, files, or runtime internals
- promise pricing outside policy
- confirm bookings without validation

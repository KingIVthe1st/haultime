# Haul Time Website Ops Playbook

## Purpose
Run the public website, the quote form, and Jade website mode without breaking lead flow or letting the public agent overpromise.

## Core rule
Treat this site as a lead machine first.
Every change must protect:
- conversion rate
- trust and readability
- fast mobile use
- clean handoff to Antoine and Anthony
- sandboxing between public Jade and internal operator Jade

## Source of truth
- Main page layout and section structure: `app/page.tsx`
- Site-wide styling and contrast: `app/globals.css`
- Business copy, FAQs, testimonials, phone, service areas: `lib/site.ts`
- Lead form UX and wording: `components/lead-form.tsx`
- Jade chat widget UX and quick prompts: `components/jade-chat-widget.tsx`
- Lead intake API route: `app/api/lead/route.ts`
- Website chat API route: `app/api/chat/route.ts`
- Lead forwarding and webhook bridge: `lib/leads.ts`
- Chat fallback logic and webhook bridge: `lib/chat.ts`
- Lead tiering and restricted-item rules: `lib/business-rules.ts`
- Website-mode contract and boundaries: `docs/jade-website-mode.md`
- Current audit status: `docs/system-audit.md`
- Current unresolved gaps: `docs/website-known-gaps.md`

## Default workflow for site updates
1. Identify the change type.
2. Edit the smallest correct surface.
3. Keep copy customer-facing. No strategy-deck language, no internal phrasing.
4. Keep mobile readability and contrast clean.
5. Run `npm run build` after every meaningful change.
6. Deploy with `npm run deploy` only after build passes.
7. Re-check the exact section that changed.
8. Log any new business-rule dependency in `docs/website-known-gaps.md` if the owners have not answered it yet.

## Change playbooks

### 1) Update reviews
- Edit `lib/site.ts`
- Replace placeholder testimonials with real ones
- Keep quote length tight and believable
- Prefer location attribution only if approved
- Do not invent star ratings, dates, or platforms

### 2) Update pictures
- Add new assets to `public/`
- Use real truck, crew, before/after, and job-site photos whenever possible
- Replace AI placeholders section by section in `app/page.tsx`
- Preserve image aspect ratio and check mobile crop behavior
- Rebuild and inspect the hero, showcase, and chat launcher avatar if touched

### 3) Change copy
- Edit `app/page.tsx`, `lib/site.ts`, or `components/lead-form.tsx` depending on where the words live
- Write like a customer is reading, not a marketer reviewing a deck
- Prefer clear promises over vague polish words
- Avoid unverifiable claims

### 4) Change design or layout
- Edit `app/page.tsx` and `app/globals.css`
- Protect CTA visibility, sticky mobile actions, and form clarity
- Do not sacrifice readability for aesthetic effects
- Test dark sections, white cards, and small text first

### 5) Change lead handling
- Edit `app/api/lead/route.ts`, `lib/leads.ts`, `lib/business-rules.ts`, and related docs
- Never silently drop leads
- If webhook delivery fails, fail loudly enough that the visitor knows to call
- Do not add pricing promises unless owner-approved pricing rules exist

### 6) Change Jade website behavior
- Edit `lib/chat.ts`, `app/api/chat/route.ts`, and `docs/jade-website-mode.md`
- Keep Jade in website-lead-intake mode only
- No tool expansion beyond FAQ, intake, escalation, and owner notification behavior
- No booking confirmation without approved logic
- No final pricing without approved pricing logic

## Lead-gen health checklist
Use this before calling the setup "tight":
- Quote form submits cleanly
- Lead webhook is reachable and authenticated
- Jade chat still answers with fallback behavior if webhook is slow or down
- Rate limiting still works
- Restricted-item detection still works
- Same-day / urgent language still routes people toward fastest contact path
- Phone number and CTA links still match the live business number
- Mobile CTA bar is visible and readable
- The form is readable on dark backgrounds and on smaller phones

## Deployment workflow
```bash
cd /root/.openclaw/workspace/projects/haultime
npm run build
npm run deploy
```

## Required env / secrets
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`
- `JADE_SITE_WEBHOOK_URL`
- `JADE_SITE_WEBHOOK_SECRET`
- public phone / URL / service-area vars

## Guardrails that must survive every update
- Public Jade stays isolated from internal Jade
- No prompt disclosure
- No privileged tools in public chat
- No quoting outside approved policy
- No booking promises outside approved policy
- No fake reviews, fake locations, or fake availability claims

## What still prevents a true 10/10 setup
If any of these are still missing, do not pretend operations are fully complete:
- Anthony direct notification number
- pricing bands or estimate rubric
- exact service-area inclusion and exclusion rules
- restricted / hazardous item policy
- after-hours callback rules
- photo upload storage pipeline
- CRM or dashboard destination

## Best next upgrades
1. Replace AI imagery with real crew / truck / before-after photos
2. Add photo upload storage and attach uploads to lead records
3. Add owner-facing lead dashboard or CRM sync
4. Add analytics for CTA clicks, form starts, form submits, and chat starts
5. Replace placeholder testimonials with real approved reviews

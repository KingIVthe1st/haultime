# Haul Time Website Known Gaps

## Operational blockers still open

### 1) Anthony notification routing
- Status: open
- Missing: Anthony's direct number
- Why it matters: lead notifications are not fully covering both owners yet

### 2) Pricing policy
- Status: open
- Missing: approved pricing bands, common-item pricing guide, and estimate guardrails
- Why it matters: Jade can qualify, but should not promise prices beyond rough intake without this

### 3) Service-area rules
- Status: open
- Missing: exact included ZIPs / cities plus edge-case handling outside the core DMV footprint
- Why it matters: Jade can collect ZIPs, but service qualification is still soft around the boundaries

### 4) Restricted-item policy
- Status: open
- Missing: business-approved do-not-haul list and escalation language
- Why it matters: current detection catches obvious hazardous language, but the real company policy is not fully captured

### 5) After-hours callback policy
- Status: open
- Missing: approved expectations for nights, weekends, and holiday lead response
- Why it matters: Jade should set correct expectations instead of vague follow-up timing

### 6) Photo upload pipeline
- Status: open
- Missing: actual upload storage, attachment handling, and owner review path
- Why it matters: the site asks for photos conceptually, but does not yet support direct upload flow

### 7) CRM / dashboard destination
- Status: open
- Missing: long-term system of record for leads and transcripts
- Why it matters: current webhook/log path works, but there is no owner-friendly pipeline view yet

### 8) Real reviews and photos
- Status: open
- Missing: approved real testimonials, truck photos, crew photos, and before/after job photos
- Why it matters: this is the biggest remaining credibility unlock for the public site

## Resolved in current build
- premium redesign is live
- mobile sticky CTA is live
- quote form is live
- Jade website chat is live
- public Jade is sandboxed from internal Jade
- prompt-injection filtering exists
- restricted-item keyword detection exists
- lead/chat webhooks are wired
- contrast issues found so far were fixed
- lead submission now fails loudly instead of pretending success if webhook delivery breaks
- website chat now falls back cleanly if Jade webhook is slow or unavailable

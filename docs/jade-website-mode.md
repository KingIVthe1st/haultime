# Jade Website Mode

## Purpose
A public-facing lead concierge mode for the website.

## Required workflows
- lead intake
- quote qualification
- callback request capture
- photo-estimate prompt
- service-area qualification
- after-hours triage
- owner escalation for hot leads
- restricted-item escalation
- pricing guardrails

## Guardrails
- public website sessions must be isolated from internal operator sessions
- no privileged tools
- schema-first lead capture
- reply with business-safe next steps only
- no final pricing unless approved pricing logic exists
- no booking confirmation without owner-approved rules

## Recommended next additions
- service-area dataset
- restricted item policy
- pricing bands or estimate rubric
- owner-notification webhook target
- photo upload storage
- CRM sync
- private dashboard / CRM command center
- owner auth and role-safe views
- review and SEO workflow surfaces

## Future operating model
Public Jade should stay narrow and safe.
Private Jade should become the business operator inside the command center.

That means:
- website Jade captures and qualifies
- private dashboard Jade helps triage, follow up, rescue stale leads, draft review requests, and surface SEO opportunities
- public chat never gets privileged access just because the internal dashboard becomes smarter

## Dashboard handoff principle
When the command center is live, every public website interaction should aim to land in structured CRM state:
- lead record
- conversation timeline
- urgency / tier
- next action
- owner assignment
- review / nurture eligibility later

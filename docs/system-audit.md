# Haul Time Website + Jade Audit

## What is live now
- Cloudflare Workers public site
- secure `/api/lead` endpoint
- secure `/api/chat` endpoint
- Jade website-mode webhook server on Jade VPS
- HTTPS bridge in front of Jade website-mode webhook
- lead logging and chat logging on Jade VPS
- quote form -> Jade website ops flow
- chat widget -> Jade website mode flow
- fallback behavior for public Jade if the Jade webhook is slow or down
- timeout handling on lead and chat webhook calls
- honest form failure behavior if lead delivery breaks instead of fake success
- site-management playbook and Jade-facing site-management skill scaffolded for ongoing operations

## Notification status
- Ivanlee: live
- Antoine: live
- Anthony: pending direct number confirmation

## What still blocks a true 10/10 operations finish
- Anthony's notification number
- exact pricing bands for common jobs
- service-area inclusion / exclusion rules
- restricted / hazardous item business policy
- after-hours callback policy
- photo upload storage pipeline
- CRM destination / owner dashboard preference

## Current guardrails
- no prompt disclosure
- no privileged tool access from public chat
- no pricing promises outside policy
- no booking confirmation without owner-approved rules
- restricted-item escalation language
- website mode isolated from internal Jade operations

## Current recommendation
The stack is materially stronger now, but it is not honest to call it a true 10/10 until the missing business-policy inputs are filled in. The engineering layer is in solid shape for the current scope. The remaining weak points are mostly owner-data and operations-policy gaps, plus the lack of photo upload and CRM visibility.

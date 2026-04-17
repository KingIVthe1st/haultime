# Haul Time Command Center Vision

## What this needs to be
Not a boring admin panel.
Not a generic CRM.
Not a spreadsheet with lipstick on it.

This should be the operating system for the brothers' business.
One place where they can:
- see every lead
- know what needs attention now
- move quotes faster
- protect follow-up discipline
- keep jobs and callbacks from slipping
- watch what the website and Jade are doing
- grow reviews, SEO presence, and repeat business
- actually feel proud showing it to people

## North star
Build a mobile-first command center that feels like:
- an elite field-service CRM
- a luxury business cockpit
- a shared owner dashboard
- an AI-assisted operating layer

The emotional effect should be:
- calm control
- immediate clarity
- obvious next actions
- premium trust
- "damn, this business is really buttoned up"

## Product position
This is a hybrid of:
- CRM
- lead inbox
- follow-up system
- quote pipeline
- job board
- review and SEO machine
- Jade control panel
- owner intelligence dashboard

## Core users
### Antoine
Likely cares most about:
- inbound leads
- quote speed
- same-day opportunities
- callbacks
- jobs getting closed

### Anthony
Likely cares most about:
- operational clarity
- who needs follow-up
- where jobs stand
- whether money is moving
- whether the business looks organized

### Jade
Needs structured access to:
- lead records
- conversation history
- follow-up status
- review-request status
- service-area / restricted-item / pricing policy once supplied
- SEO/content queue

## Product principles
1. Mobile first, always
   - Most owner-operators live in their phones.
   - The first design pass should feel like an iPhone app, not a shrunken desktop page.

2. Decision-first UI
   - Every screen should answer: what matters now, what changed, what do I do next.

3. Beautiful but fast
   - Cinematic polish is good.
   - Slow, crowded, over-animated nonsense is not.

4. Fewer, stronger modules
   - Better to have 7 killer modules than 20 weak ones.

5. AI should move work, not just talk
   - Jade should generate drafts, reminders, categorizations, follow-up suggestions, SEO tasks, and review prompts.

## Recommended navigation
### Mobile bottom nav
1. Home
2. Inbox
3. Pipeline
4. Jobs
5. More

### More menu
- Reviews
- SEO
- Analytics
- Jade
- Contacts
- Settings

### Desktop nav
Left rail:
- Home
- Inbox
- Pipeline
- Jobs
- Reviews
- SEO
- Analytics
- Jade
- Contacts
- Settings

Top utility bar:
- search
- quick add
- notifications
- owner switch / filter
- date range / view toggles

## Core modules

### 1) Home, Command Center
The default landing screen.

It should show:
- leads needing action now
- unread or hot conversations
- today’s callbacks
- quotes waiting to go out
- stale leads at risk
- today / this week jobs
- revenue snapshot
- review request status
- SEO / website pulse
- Jade alerts or flagged chats

This is the "open the app and know the business in 10 seconds" screen.

### 2) Inbox
Unified lead inbox for:
- website form leads
- Jade chat leads
- manual leads
- call leads if later integrated
- referral leads if manually added

Each lead card should show:
- source
- urgency
- status
- when they came in
- service type
- location
- photos indicator
- last contact time
- next recommended move

### 3) Pipeline
Stages should be opinionated for junk removal:
- New
- Contacted
- Qualified
- Estimate Needed
- Quote Sent
- Awaiting Customer
- Won / Scheduled
- Lost
- Nurture
- Review Requested

This should work as kanban on desktop and stacked segmented cards on mobile.

### 4) Jobs / Schedule
This is not full dispatch software in v1.
But they still need:
- upcoming jobs
- estimate appointments
- callbacks
- same-day opportunities
- basic calendar / list view

This module should answer:
- what is today
- what is tomorrow
- what is at risk
- what can still be slotted in

### 5) Lead / Customer detail view
Every lead record should have:
- contact info
- job summary
- source
- tags
- transcript timeline
- notes
- photos / attachments
- quote notes
- follow-up history
- reminders
- assigned owner
- status changes
- review status
- repeat-customer marker

This page should feel like the source of truth.

### 6) Reviews / Reputation
This is huge for a junk-removal business.

Include:
- recent reviews
- pending review requests
- automations sent / pending
- review response drafts from Jade
- before/after candidates worth turning into proof
- top five-star quote snippets to reuse on site

### 7) SEO / Growth
This is where the dashboard starts to feel dangerous in a good way.

Include:
- service page backlog
- location page backlog
- FAQ mining from real leads
- review velocity
- top objections heard by Jade
- content ideas for Google Business Profile posts
- local keyword targets by city/service
- proof gaps, for example no photos for appliance removal or no testimonials for office cleanouts
- pages / content that Jade recommends updating based on real lead questions

### 8) Jade Control Center
Give them confidence that Jade is helping, not freelancing.

Show:
- chat volume
- lead capture rate
- flagged conversations
- restricted-item escalations
- fallback usage
- common questions
- suggestions for new FAQs
- suggestions for site copy updates
- suggested automations to add

## Home screen card stack, recommended order
For mobile:
1. Today snapshot
2. Hot leads
3. Today’s callbacks
4. Quotes waiting
5. Schedule / jobs today
6. Review requests
7. SEO opportunities
8. Jade pulse

For desktop:
- hero command strip across top
- left column: leads / callbacks / quotes
- center: pipeline + schedule
- right rail: reviews / SEO / Jade pulse

## Design direction
### Visual feel
- Deep navy / obsidian foundation
- Steel blue and orange as controlled accents
- Glass and glow used sparingly
- Larger card radius
- Rich depth, but not gaudy
- Serious typography hierarchy
- Strong contrast and clean spacing

### Texture
- app-like surfaces
- soft gradients in headers only
- dense but breathable cards
- tiny premium micro-interactions
- subtle motion, no noisy gimmicks

### Avoid
- rainbow analytics trash
- overcrowded admin tables as the default view
- tiny text
- overuse of neon/glass just because it looks expensive
- generic bootstrap SaaS dashboard energy

## Mobile UX rules
- Thumb-friendly bottom nav
- One dominant action per screen
- Cards should stack with strong scannability
- Critical alerts appear high, not hidden in filters
- No modal-heavy flow hell
- Quick actions always reachable in one thumb zone

## Desktop UX rules
- More density, but still elegant
- Split-pane lead detail is ideal
- Keyboard shortcuts later, not v1 requirement
- Make multi-column views feel editorial, not cramped

## Core data model
### Entities
- Lead
- Contact
- Conversation
- Message
- Quote
- Job
- Task / Reminder
- Review Request
- Review
- SEO Opportunity
- FAQ Insight
- Site Update Suggestion
- Automation Event
- Attachment / Photo
- Note

### Must-have fields on Lead
- id
- createdAt
- source
- leadTier
- status
- contact info
- serviceType
- job summary
- zip / city
- timeline urgency
- restricted flag
- photos flag
- owner assignment
- lastContactAt
- nextActionAt
- outcome

## Automations worth building
1. Hot lead push rules
2. Same-day callback reminders
3. Stale lead rescue at 2h / 24h / 72h
4. Quote follow-up nudges
5. Lost-lead reason capture
6. Review request after completed job
7. FAQ mining from chat and form details
8. SEO queue generation from repeated questions
9. Testimonial extraction from reviews
10. Before/after photo reminder workflow

## SEO features that actually matter for them
- city + service opportunity board
- local landing page backlog
- Google Business Profile post ideas
- review velocity tracking
- service-area proof gaps
- FAQ harvesting from real questions
- page update suggestions based on conversion friction
- content gaps by service line, such as appliance removal, office cleanouts, estate cleanouts

## What Jade should be able to do once the dashboard exists
- score and categorize leads
- draft callback and follow-up messages
- draft quote prep summaries
- recommend status changes
- flag at-risk leads
- surface missing info for qualification
- draft review request texts
- suggest FAQ additions
- suggest SEO/content tasks from actual conversations
- suggest site updates when patterns show up repeatedly

## What not to build in v1
- full accounting
- payroll
- route optimization engine
- advanced dispatch logistics
- inventory system
- giant reports nobody will read
- overcomplicated permissions
- full-blown marketing automation suite

## Best v1 build slice
### Phase 1
- dashboard shell
- command center home
- lead inbox
- lead detail view
- pipeline
- basic jobs/callback schedule
- Jade activity panel
- review request tracker
- simple analytics strip

### Phase 2
- photo upload and attachment handling
- owner task/reminder layer
- SEO opportunity board
- FAQ mining
- review response drafts
- referral / repeat customer tracking

### Phase 3
- Google Business Profile integration
- content publishing workflows
- deeper analytics
- service-area map views
- richer automations and rescue flows

## Wow factor
If we do this right, the brothers should feel like:
- their business is more organized than competitors
- they have a real system, not just texts and memory
- Jade is actively making them money
- they are operating with infrastructure beyond what a normal local junk-removal company has

# Haul Time Growth Operations Memo
## Dashboard, CRM & AI Agent Strategy for Owner-Operator Scale

**The Core Insight:** In junk removal, speed wins. The first responders to a lead book 60-70% of jobs. Your dashboard isn't reporting—it's a revenue weapon built around **<5 minute lead response times** and **zero mental overhead** for two operators hauling 10-hour days.

---

## Phase 1: Must-Have Modules (Build First)

### 1. Speed-to-Lead War Room
**The Problem:** Leads decay exponentially. A 5-minute response is 10x more effective than 30 minutes.

**Dashboard Elements:**
- **Live Lead Ticker:** Real-time feed from website, GBP calls, Yelp, Angi with source tagging
- **Response Timer:** Countdown from lead receipt (target: <5 min)
- **One-Touch Actions:** Click-to-call, auto-SMS templates, "Claim Lead" to prevent double-work
- **Lead Scoring:** Auto-tag Urgent (estate cleanout, eviction), Standard (basement cleanout), Low (single item)

**Key Automation:**
- Instant SMS auto-reply: *"Hi [Name]—Haul Time here. Got your request for [service]. Reply CALL to connect now or UPLOAD for a no-visit quote."*
- Missed call SMS trigger within 90 seconds

---

### 2. Quote-To-Cash Accelerator
**The Problem:** Most junk removal quotes require a site visit—massive friction. Customers want ballpark numbers now.

**Dashboard Elements:**
- **Photo-Based Estimator:** Customer SMS link → upload photos → AI/item recognition → instant range quote
- **Pricing Matrix:** Built-in volume calculator (truckload fractions) + surcharges (stairs, heavy items)
- **Quote Status Pipeline:** Photo Received → Estimate Sent → Accepted → Scheduled → Completed
- **Digital Booking:** Text-to-pay deposit capability (reduces no-shows 40%)

**Key Automation:**
- Photo upload SMS: *"Upload 3-5 photos of what needs to go. We'll text your estimate within 10 min."*
- Follow-up cascade: Quote sent → +4 hours: "Questions?" → +24 hours: "Still interested?" → +72 hours: "Ready when you are"

---

### 3. Review Generation Engine
**The Problem:** One bad review pulls down GBP ranking; consistent 5-stars = page-one placement.

**Dashboard Elements:**
- **Review Dashboard:** Unified inbox for Google, Yelp, Facebook with sentiment scoring
- **Review Funnel Tracker:** Shows who's been asked, who reviewed, who ignored
- **Response Templates:** One-click responses to positive/negative reviews

**Key Automation:**
- Post-job SMS (2 hours after truck leaves): *"We cleared out [Address]. Hope we exceeded expectations. A quick review helps other [City] homeowners find us. [Google Review Link]"*
- Negative review alert → immediate manager notification for damage control

---

### 4. Google Business Profile Optimizer
**The Problem:** GBP is your #1 SEO asset but requires weekly nurturing most owners skip.

**Dashboard Elements:**
- **Update Scheduler:** Queue posts, photos, Q&A responses
- **Ranking Tracker:** Local pack position for "junk removal [city]" keywords
- **Competitor Watch:** Alerts when rivals post/promote

**Key Automation:**
- Weekly GBP post auto-generated from completed jobs (with customer permission): *"Cleared a 3-bedroom estate in [Neighborhood] today. Spring cleanouts booking fast—call [Number]."*
- Auto-respond to Q&A entries within 2 hours

---

### 5. Referral & Repeat Pipeline
**The Problem:** Past customers and realtors are goldmines—if you remember to mine them.

**Dashboard Elements:**
- **Customer Lifecycle View:** Last job date, lifetime value, referral source tracking
- **Referral Partner CRM:** Realtors, property managers, estate cleanout companies with contact cadence
- **Re-engagement Queue:** Customers hitting 12-month mark since last service

**Key Automation:**
- Annual "Spring Cleanout Reminder" to past customers: *"Hi [Name]—it's been a year since we hauled for you. Need another clear-out? Returning customers get 10% off."*
- Realtor nurture: Monthly check-in with market stats + "Just closed? We clear out the junk before listing."

---

## Phase 2: AI Agent Capabilities (The Force Multiplier)

Your two operators can't be texting while driving or hauling. An AI agent handles the "in-between" work.

### Agent: Jade (Lead Qualifier)
**Trigger:** New lead enters system
**Actions:**
1. Sends immediate SMS acknowledgment (<90 seconds)
2. Asks qualifying questions: "What type of items? Any stairs? Timeline?"
3. Prompts photo upload for estimate
4. Books directly to calendar if standard job
5. Flags complex jobs for human callback

**Key Phrase Recognition:**
- "Estate sale", "eviction", "probate" → Priority flag, suggest phone call
- "Today", "ASAP", "emergency" → Immediate operator alert
- "Just price shopping" → Send auto-quote range, low-priority follow-up

### Agent: Callback Discipline Bot
**Trigger:** Operator marks "Call back later" or quote sent
**Actions:**
1. Schedules follow-up SMS at optimal time (skip if customer already replied)
2. Escalates to phone call reminder if 2+ SMS touches with no response
3. Moves dead leads to "Long-term nurture" after 14 days (quarterly check-in)

### Agent: Review Chaser
**Trigger:** Job marked complete in system
**Actions:**
1. Waits 2 hours (lets emotion settle)
2. Sends personalized SMS with direct GBP link
3. If no review in 48 hours: gentle second ask
4. Tracks who reviewed vs. who didn't

### Agent: Route Optimizer
**Trigger:** Daily at 6 PM (next-day prep)
**Actions:**
1. Analyzes confirmed jobs for geographic clustering
2. Suggests optimal route by neighborhood
3. Identifies gaps for same-day add-on opportunities
4. Alerts if large/complex jobs need extra crew confirmation

---

## Phase 3: Analytics That Actually Matter

Skip vanity metrics. Track the needle-movers:

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Lead Response Time | <5 min avg | Conversion rate predictor |
| Quote-to-Book Rate | >40% | Pricing/relevance indicator |
| Photo Upload Rate | >60% | Quote accuracy, less site visits |
| Review Velocity | 4+ new/month | GBP ranking fuel |
| Customer LTV | $450+ | Repeat + referral value indicator |
| Referral % of Revenue | >25% | Sustainable growth signal |

**Weekly Operator View:**
- Jobs scheduled this week
- Open quotes needing follow-up
- Jobs completed + review requests sent
- Revenue vs. target

---

## Junk-Specific Implementation Insights

### Volume vs. Weight Economy
Junk removal pricing is volume-based (truck space), not weight. Your quote engine should show customers visual fractions: *"You need about 1/4 truckload—typically 2-3 couches or a room of boxes."*

### The "While You're Here" Upsell
Train the agent to ask: *"Since we're sending a truck, anything else you've been wanting to get rid of?"* Average ticket increases 30% with this prompt.

### Seasonality Patterns
- **Spring (Mar-May):** Estate sales, cleanouts, moving season
- **Summer (Jun-Aug):** Construction debris, garage cleanouts
- **Fall (Sep-Nov):** Pre-holiday purges, tenant turnover
- **Winter (Dec-Feb):** Emergency hauls, storage unit clearouts

Dashboard should show seasonal pipeline vs. prior year to anticipate demand.

### The Realtor Whisperer Strategy
One top-producing realtor = 5-10 jobs/year (move-out cleanouts, pre-listing junk removal). Your CRM should track:
- Last agent contact date
- Referrals sent this year
- Birthday/holiday nurture cadence

### The Trust Issue
Junk removal customers worry about: *Will they show up? Will they damage my house? Is this price fair?*

Your dashboard should surface **trust signals**: insurance cert, license number, average rating, jobs completed this month. Agent scripts should proactively address these concerns.

---

## Execution Priority

**Week 1-2:** Speed-to-Lead War Room + instant SMS auto-reply
**Week 3-
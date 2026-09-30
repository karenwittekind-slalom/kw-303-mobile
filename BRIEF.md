# P303: WholeStory Health
## Mobile-First Patient Health Intelligence Experience

---

# Product Name

# WholeStory Health

### Tagline

> **See the whole person. Understand the whole story.**

---

# Product Vision

WholeStory Health is a mobile-first care experience that helps healthcare teams understand the complete picture of a patient's health by bringing together clinical data, patient-reported experiences, and care history into a connected, accessible, and actionable story.

Rather than presenting disconnected charts, records, and notes, WholeStory Health helps care teams understand both:

### Clinical Evidence

- Lab results
- Test results
- Medication history
- Provider observations
- Appointment notes
- Care plans

and

### Patient Experience

- Symptoms
- Pain
- Sleep quality
- Mobility
- Energy levels
- Daily check-ins
- Quality-of-life impacts
- Personal health observations

The experience should demonstrate how care improves when healthcare teams can understand the complete story behind a patient's health.

---

# Project Overview

Build a mobile-first responsive web experience for care teams reviewing patient-reported health updates and ongoing health history.

This is not a traditional healthcare dashboard.

This is a healthcare storytelling experience.

The product should help clinicians, care coordinators, and support teams answer three critical questions:

## What changed?

## Why does it matter?

## What should happen next?

Every screen, workflow, and interaction should support this progression.

---

# Project Goals

The application should demonstrate:

- Mobile UX Strategy
- Patient-Centered Design
- Clinical Workflow Design
- Responsive Design
- Information Architecture
- Data Storytelling
- Accessibility-First Thinking
- Modern Product Design
- Front-End Engineering Quality

The application does not need to demonstrate:

- Production readiness
- EHR integration
- Authentication
- HIPAA compliance
- Backend architecture
- FHIR integration
- AI decision making

This is a portfolio-quality specification project designed to create the illusion of a sophisticated healthcare product while minimizing technical complexity.

---

# Core Experience

The user receives a patient update and needs to quickly understand:

- What changed
- Whether the change matters
- How it compares to recent history
- What the patient is experiencing
- What action should be taken

The application should connect:

- Symptoms
- Labs
- Tests
- Appointments
- Provider notes
- Patient updates
- Care-team actions

into a single narrative.

---

# Primary User

## Care Coordinator

Primary users include:

- Care Coordinators
- Nurses
- Clinical Support Staff
- Patient Navigators
- Care Managers

---

# User Context

Users may be:

- Walking between appointments
- Reviewing information quickly
- Using one hand
- Frequently interrupted
- Managing multiple patients

Their primary question is:

> What changed and does it require action?

---

# Core User Flow

## Step 1

Review incoming patient updates.

### User Needs

- Which patients need review
- Why they need review
- What changed

---

## Step 2

Open patient overview.

### User Needs

- Current patient status
- Recent changes
- Patient concerns
- Clinical context

---

## Step 3

Understand the health story.

Review:

- Symptoms
- Trends
- Notes
- Labs
- Visits
- Provider actions

through a connected timeline.

---

## Step 4

Take action.

Actions include:

- Contact Patient
- Schedule Follow-Up
- Route For Review
- Add Note
- Mark Reviewed

---

## Step 5

See the action reflected in the patient's history.

The system should document both:

- The patient's story
- The care team's response

---

# Design Principles

## Start With What Changed

Never force users to hunt for critical information.

Surface:

- New symptoms
- Worsening conditions
- Abnormal results
- Recent actions

immediately.

---

## Preserve Patient Voice

Patient quotes and observations should carry equal importance as measured values.

Examples:

> "It's much harder to walk today."

> "The swelling kept me awake all night."

> "My energy is lower even though everything looks normal."

The patient's voice should be visible throughout the experience.

---

## Tell A Story

This is not a dashboard.

This is a narrative-driven healthcare experience.

Users should quickly understand:

1. What happened
2. Why it matters
3. What happened next

---

## Support Human Judgment

The system may:

- Organize
- Summarize
- Highlight

The system must not:

- Diagnose
- Prescribe
- Determine urgency
- Replace clinicians

---

## Design For Interruption

Users should be able to:

- Leave screens
- Return later
- Continue where they left off

without losing context.

---

# Mobile-First Experience Strategy

All design decisions should begin with mobile.

Target starting viewport:

```plaintext
375px
```

The experience should feel excellent on mobile first and scale beautifully to larger screens.

---

# Mobile Navigation

Use bottom navigation.

```plaintext
Updates
Patients
Tasks
Profile
```

Always visible.

---

# Mobile Interaction Patterns

Use:

- Bottom sheets
- Expandable cards
- Progressive disclosure
- Sticky actions
- Floating filters
- Swipe interactions where appropriate

Avoid:

- Complex tables
- Hover interactions
- Dense enterprise screens
- Desktop-first layouts

---

# Responsive Experience Strategy

## Mobile

```plaintext
Single Column
Bottom Navigation
Sticky Actions
```

---

## Tablet

```plaintext
Two-Column Layouts
Expanded Charts
Side-by-Side Context
```

---

## Desktop

```plaintext
Patient List | Patient Detail
```

Use larger screens to improve comprehension, not to redesign workflows.

The application should feel premium on desktop while remaining fundamentally mobile-first.

---

# Application Screens

## 1. Welcome Screen

Displays:

- WholeStory Health branding
- Demo disclaimer
- Continue action

Example:

```plaintext
WholeStory Health

See the whole person.
Understand the whole story.

DEMO APPLICATION

All patient information shown in this demo
is fictional and for demonstration purposes only.

[ Continue ]
```

---

## 2. Patient Queue

Displays patients requiring review.

Patient cards include:

- Name
- Care context
- Status
- Change summary
- Last update time

Example:

```plaintext
Maya Thompson

Pain: 3 → 6
Swelling worsening

Needs Review
```

---

## 3. Patient Overview

Displays:

- Health Summary
- Patient Voice
- Key Insights
- Current Concerns
- Suggested Next Action

---

## 4. Trends

Interactive visualizations for:

- Pain
- Sleep
- Energy
- Mobility
- Symptom Severity
- Medication Adherence

---

## 5. Timeline

Unified patient history.

Includes:

- Check-ins
- Symptoms
- Labs
- Care-Team Actions
- Appointments
- Notes
- Medication Changes

---

## 6. Report Detail

Displays:

- Symptom Information
- Severity
- Duration
- Impact
- Location
- Patient Notes
- Related Events

---

## 7. Action Workflow

Allows users to:

- Contact Patient
- Route Issue
- Add Clinical Note
- Create Follow-Up
- Mark Reviewed

---

## 8. Completion State

Displays:

- Outcome
- Timestamp
- Assignee
- Updated Status

---

# Interactive Data Requirements

Every visual element should be powered by data.

Avoid static placeholder content.

Charts, filters, statuses, insights, and timelines should update dynamically based on the selected data.

---

# Data Categories

## Patient Data

- Demographics
- Conditions
- Medications
- Care Plans

---

## Check-In Data

- Pain
- Sleep
- Mobility
- Energy
- Symptoms
- Patient Notes

---

## Clinical Data

- Provider Notes
- Appointments
- Care Plans
- Medication Changes

---

## Diagnostic Data

- Labs
- Tests
- Biometrics

---

## Workflow Data

- Reviews
- Escalations
- Tasks
- Follow-Ups

---

# Cross-Filtering Requirements

Interactions should update multiple areas of the interface.

### Selecting A Symptom

Updates:

- Timeline
- Charts
- Notes
- Insights

---

### Selecting A Date Range

Updates:

- Metrics
- Visualizations
- Event Lists
- Trend Calculations

---

### Selecting A Chart Point

Displays:

- Related Note
- Related Event
- Context
- Source Information

---

# Recommended Dataset Size

## Patients

```plaintext
6
```

---

## Daily Check-Ins Per Patient

```plaintext
30
```

---

## Timeline Events Per Patient

```plaintext
15–20
```

---

## Provider Notes Per Patient

```plaintext
3–5
```

---

## Lab Results Per Patient

```plaintext
3–5
```

---

## Care-Team Actions Per Patient

```plaintext
4–6
```

This provides rich storytelling and interactivity while keeping token usage low.

---

# Demonstration Scenarios

## 1. Worsening Recovery

Pain increasing after surgery.

---

## 2. Medication Side Effects

GI symptoms following medication changes.

---

## 3. Stable Chronic Care

Minimal intervention required.

---

## 4. Improving Recovery

Positive recovery trends.

---

## 5. Silent Risk

Abnormal labs without symptoms.

---

## 6. Hidden Concern

Measurements appear normal, but patient-reported experiences reveal declines in quality of life.

---

# Technical Requirements

## Delivery Workflow

```plaintext
VS Code (Copilot Chat + Terminal)
        ↓
      GitHub
        ↓
      Vercel
```

The project should optimize for rapid local development and simple deployment.

---

# Technology Stack

## Framework

```plaintext
Vue 3
TypeScript
Vite
```

---

## UI Framework

```plaintext
Vuetify
```

Used for:

- Layouts
- Navigation
- Forms
- Cards
- Responsive Design
- Theme System

---

## State Management

```plaintext
Pinia
```

Used for:

- Patient Data
- Filters
- Queue State
- User Preferences
- Timeline State

---

## Data Visualization

```plaintext
Apache ECharts
vue-echarts
```

Used for:

- Pain Trends
- Sleep Trends
- Lab Trends
- Symptom Tracking

---

## Typography

```plaintext
Inter
```

---

## Icons

```plaintext
Material Design Icons
```

---

# API Policy

## Goal

Zero API Keys.

The entire application should run with:

```bash
pnpm install
pnpm dev
```

---

## Allowed

- Static JSON
- Browser APIs
- localStorage
- Open Source Libraries

---

## Avoid

- OpenAI APIs
- Gemini APIs
- Anthropic APIs
- Epic APIs
- FHIR APIs
- External Services Requiring Keys

---

# Data Storage Strategy

```plaintext
src/
 ├── mock-data/
 │   ├── patients.json
 │   ├── checkins.json
 │   ├── labs.json
 │   ├── timeline.json
 │   ├── actions.json
 │   └── careplans.json
```

---

# Component Strategy

Limit the MVP to approximately 10 reusable components.

```plaintext
PatientCard
PatientHeader
PatientVoiceCard
TrendCard
HealthMetricChart
InsightCard
TimelineEvent
StatusChip
LabResultCard
ClinicalActionBar
```

Build everything from these reusable primitives.

---

# Accessibility-First Experience Strategy

## Core Principle

Accessibility is not a feature.

Accessibility is a foundational requirement.

WholeStory Health should be usable by the widest possible range of users regardless of age, ability, environment, or device.

---

# Accessibility Goals

Target:

```plaintext
WCAG 2.2 AA+
```

The experience should be:

- Perceivable
- Operable
- Understandable
- Robust

---

# Theme System

## Light Mode

Clean, calm, trustworthy.

---

## Dark Mode

A fully designed experience optimized for:

- Reduced eye strain
- Long sessions
- Chart readability

---

## High Contrast Mode

Enhanced accessibility mode with:

- Strong contrast
- Strong borders
- Reduced visual ambiguity

---

# Cohesive Color Story

## Primary

Clinical Blue

```plaintext
#0E4D92
```

---

## Secondary

Teal

```plaintext
#14B8A6
```

---

## Success

```plaintext
#16A34A
```

---

## Attention

```plaintext
#D97706
```

---

## Critical

```plaintext
#DC2626
```

---

## Light Background

```plaintext
#F8FAFC
```

---

## Dark Background

```plaintext
#0F172A
```

---

## Light Surface

```plaintext
#FFFFFF
```

---

## Dark Surface

```plaintext
#1E293B
```

---

# Accessibility Settings

Accessible from the Profile section.

Persist preferences using:

```plaintext
localStorage
```

---

## Theme

```plaintext
Light
Dark
High Contrast
```

---

## Text Size

```plaintext
Standard
Large
Extra Large
```

Should affect:

- Navigation
- Cards
- Forms
- Timelines
- Charts
- Dialogs

without breaking layouts.

---

## Display Density

```plaintext
Compact
Comfortable
```

Comfortable mode increases whitespace and readability.

---

## Motion

```plaintext
Standard
Reduced Motion
```

Reduced Motion disables:

- Chart Animations
- Route Transitions
- Decorative Motion

while preserving functionality.

---

# Typography Standards

Use:

```plaintext
Inter
```

Minimum sizes:

```plaintext
Body: 16px
Actions: 16px
Headings: 20px+
Large Text: 18–22px+
```

---

# Mobile Accessibility

Minimum target size:

```plaintext
44 × 44px
```

Preferred:

```plaintext
48 × 48px
```

for all interactive controls.

---

# Accessible Charts

Every visualization should include:

- Current Value
- Trend Direction
- Change Summary
- Plain-Language Interpretation

Example:

> Pain increased from 3 to 6 over the past seven days following a missed physical therapy session.

Users should never need to interpret charts alone.

---

# Status Communication

Never rely solely on color.

Use:

- Labels
- Icons
- Shapes
- Color

Examples:

```plaintext
✅ Improving
⚠ Needs Review
🔴 Urgent Follow-Up
```

---

# Screen Reader Support

Support:

- VoiceOver
- NVDA
- JAWS
- TalkBack

Requirements:

- Semantic HTML
- ARIA Labels
- Heading Hierarchy
- Accessible Forms
- Skip Navigation

---

# Keyboard Accessibility

Every feature must be usable without a mouse.

Include:

- Focus Management
- Tab Navigation
- Accessible Dialogs
- Visible Focus States

---

# Cognitive Accessibility

Reduce cognitive load through:

## Progressive Disclosure

```plaintext
What changed?
↓
Why does it matter?
↓
What should happen next?
```

---

## Plain Language

Prefer:

```plaintext
Needs Review
```

instead of:

```plaintext
Clinical Escalation Required
```

whenever possible.

---

## Action-Oriented Design

Every insight should help users answer:

> What is the next best action?

---

# Prototype Guardrails

## Use Fictional Data Only

No real patient information.

---

## Demo Label

```plaintext
WholeStory Health
Demo Environment

All patient information is fictional.
Not for clinical use.
```

---

## Avoid

- Diagnoses
- Treatment Recommendations
- Risk Scores
- Autonomous Clinical Decisions

The experience should support care teams, not replace them.

---

# Success Criteria

The experience succeeds when users can:

1. Understand why a patient requires attention.
2. Quickly identify what changed.
3. View clinical and patient-reported information together.
4. Understand the patient's story.
5. Take meaningful action.
6. See actions reflected in patient history.
7. Use the experience comfortably on mobile.
8. Enjoy the responsive desktop experience.
9. Personalize accessibility settings.
10. Experience a healthcare product that feels modern, inclusive, and human.

---

# North Star

> **WholeStory Health helps care teams see beyond symptoms and clinical records to understand the complete story of a patient's health, enabling more informed, compassionate, and connected care.**

The final experience should feel less like a dashboard and more like a living patient narrative system that is accessible, responsive, beautiful, and centered on the whole person.
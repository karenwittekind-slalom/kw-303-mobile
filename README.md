# WholeStory Health

---

## Overview

This experience was created as a Protogen P303 Project.

> **See the whole person. Understand the whole story.**

WholeStory Health is a mobile-first healthcare experience that explores a simple but powerful idea:

**Better care decisions happen when care teams can understand both the clinical facts and the human experiences behind them.**

Traditional healthcare systems often excel at collecting data but struggle to communicate the complete picture of a patient's health. Symptoms, care plans, labs, appointments, provider notes, and patient-reported experiences frequently exist in separate systems, making it difficult for care teams to quickly understand what changed, why it matters, and what should happen next.

WholeStory Health brings these pieces together into a connected story that helps care teams see beyond the chart and understand the whole person.

---

## Live Demo

**[Experience the live prototype](https://kw-303-mobile.vercel.app/)**

---

## Project Background

This project was created as part of a mobile-first experience challenge focused on designing a responsive web application for users completing meaningful tasks on mobile devices.

Rather than building another healthcare dashboard, the goal was to explore:

- Patient-centered healthcare experiences
- Mobile-first clinical workflows
- Accessible health data visualization
- Narrative-driven information architecture
- Whole-person healthcare
- Care-team decision support

The resulting concept focuses on a care coordinator reviewing patient-reported health updates and determining appropriate next steps.

---

# The Problem

A patient's health is more than:

- Lab results
- Vital signs
- Diagnoses
- Appointment notes

Equally important are:

- Pain levels
- Symptoms
- Mobility challenges
- Sleep quality
- Daily experiences
- Personal observations
- Quality-of-life concerns

Clinical data may show one story.

Patient experiences may tell another.

WholeStory Health explores what healthcare could look like if both perspectives were viewed together.

---

# Product Vision

WholeStory Health helps healthcare teams understand the complete picture of a patient's health by connecting:

### Clinical Evidence

- Test results
- Lab results
- Medications
- Provider observations
- Care plans
- Appointment history

### Patient Experience

- Symptoms
- Pain tracking
- Energy levels
- Sleep quality
- Mobility
- Daily check-ins
- Personal health observations

The result is a unified, contextual understanding of a patient's current health journey.

---

# Core Concept

Every interaction in WholeStory Health revolves around three questions:

## What changed?

A patient reports new symptoms, worsening pain, changes in sleep quality, or other health updates.

---

## Why does it matter?

The experience provides historical context, related events, lab results, provider notes, and previous updates to help the care team understand the significance of that change.

---

## What should happen next?

The care team can review information, document actions, contact the patient, or initiate follow-up workflows.

---

# Primary User

The current MVP focuses on:

### Care Coordinators

### Nurses

### Care Managers

### Clinical Support Staff

Users are often:

- Reviewing updates between tasks
- Working on a mobile device
- Managing multiple patients
- Interrupted frequently
- Looking for actionable information quickly

The experience is intentionally optimized for these constraints.

---

# Experience Highlights

## Branded Story Introduction

The experience opens with a responsive brand moment that previews the product's core interaction model before entering the care-team workspace.

The introduction combines:

- WholeStory Health's heart-handshake identity
- A representative patient story
- Patient voice, current signals, and source events
- The progression from change to context to action
- Responsive layouts for mobile and desktop

The intro respects high-contrast and reduced-motion preferences.

---

## Care-Team Workspace

Persistent bottom navigation organizes the prototype into four focused destinations:

- **Updates** — prioritized patient changes requiring review
- **Patients** — searchable and filterable patient directory
- **Tasks** — time-ordered follow-ups with due dates and contextual actions
- **My Profile** — workload summary and accessibility preferences

Opening a patient preserves the originating context so users can return to the workflow they were completing.

---

## Mobile-First by Design

WholeStory Health was designed mobile-first from the beginning.

Rather than shrinking a desktop application onto a small screen, the experience prioritizes:

- One-handed use
- Progressive disclosure
- Touch-friendly interactions
- Fast scanning
- Quick actions
- Responsive layouts

The same design system scales elegantly across:

- Mobile
- Tablet
- Desktop

while maintaining a consistent workflow.

---

## Patient Storytelling

Instead of emphasizing charts and metrics first, WholeStory Health begins with the patient's story.

Patient voice is treated as evidence.

Examples include:

> "It's harder to walk today."

> "The swelling kept me up all night."

> "My energy is lower even though everything seems normal."

These observations are displayed inside a continuous, document-like patient story alongside current status, a concise summary, recommended next action, trend evidence, and source history.

---

## Connected Timeline

Patient information is presented as a connected narrative rather than disconnected records.

The timeline combines:

- Daily check-ins
- Symptoms
- Labs
- Tests
- Provider notes
- Appointment history
- Medication changes
- Care-team actions

This allows clinicians to understand both the sequence and context of events.

---

## At-a-Glance Health Trends

The current prototype visualizes four patient-reported measures:

- Pain
- Sleep
- Mobility
- Energy

Each measure includes:

- Current score
- Change from the beginning of the period
- Improving, worsening, or stable direction
- A seven-day comparative chart

The trend interpretation correctly treats lower pain as improvement while higher sleep, mobility, and energy scores indicate progress.

Users can quickly understand how health indicators evolve over time and connect those changes to important events.

---

## Accessibility-First Design

Accessibility is treated as a core product requirement rather than a compliance checklist.

Features include:

### Theme Support

- Light Mode
- Dark Mode
- High Contrast Mode

For users without a saved preference, the default theme responds to local time:

- Light from 6:00 AM through 4:59 PM
- Dark from 5:00 PM through 5:59 AM

An explicitly selected theme always overrides the automatic default.

### Adjustable Text Sizes

- Standard
- Large
- Extra Large

### Display Preferences

- Comfortable Density
- Compact Density

### Reduced Motion

Support for users sensitive to animation and motion effects.

### Accessible Interaction Design

- Large touch targets
- Keyboard navigation
- Semantic HTML
- Screen reader support
- Semantic regions and descriptive labels
- Visible focus states
- Plain-language communication

The goal is to create a healthcare experience that is usable by the widest possible audience.

---

# Design Philosophy

WholeStory Health was inspired by the belief that:

> Modern healthcare systems should help people understand patients, not just manage records.

The interface emphasizes:

- Clarity
- Trust
- Empathy
- Readability
- Accessibility
- Calm interaction patterns

Visual inspiration draws more heavily from modern consumer experiences than traditional EHR systems.

Think:

- Apple Health
- Oura
- Modern wellness products
- Human-centered healthcare platforms

rather than legacy enterprise healthcare software.

---

# Technical Approach

The project intentionally prioritizes simplicity.

The goal was not to recreate a production healthcare platform.

Instead, the goal was to create a compelling, realistic, portfolio-quality prototype with a focus on design quality, front-end engineering, and product thinking.

## Front-End Stack

- Vue 3
- TypeScript
- Vite
- Vuetify
- Pinia
- Apache ECharts

## Data Strategy

All patient information is locally hosted mock data.

No external healthcare integrations are required.

No authentication is required.

No API keys are required.

The experience can be run locally with minimal setup.

## Current Prototype Scope

The latest build includes:

- Six fictional patient scenarios
- Prioritized update cards with semantic status colors
- Searchable patient directory with status filters
- Narrative patient story pages
- Directional health signals and comparative charts
- Unified source timelines
- Sorted care-team tasks with due dates and contextual calls to action
- Light, dark, and high-contrast themes
- Text size, density, and reduced-motion preferences
- Responsive mobile, tablet, and desktop layouts

---

# Local Development

## Install Dependencies

```bash
pnpm install
```

## Run Development Server

```bash
pnpm dev
```

## Build for Production

```bash
pnpm build
```

## Preview the Production Build

```bash
pnpm preview
```

---

# Fictional Data Disclaimer

This project uses entirely fictional patient information.

No real patient data was used in the design, development, testing, or demonstration of this experience.

This project is:

- A design and engineering prototype
- A portfolio project
- A healthcare experience concept

This project is not:

- A medical product
- A clinical decision support tool
- An electronic health record
- Intended for real-world clinical use

---

# Attribution

The WholeStory Health logo adapts the **Heart handshake symbol** designed by Ravi Poovaiah, Professor, IDC, IIT Bombay. IIT Bombay permits use and modification with attribution.

Full source and permission details are documented in [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

---

# Future Roadmap

The current experience focuses on the care-team perspective.

Future iterations could expand WholeStory Health into a connected healthcare ecosystem.

---

## Patient Experience

Build a companion patient view that allows users to:

- Complete daily check-ins
- Track symptoms
- View trends
- Review care plans
- Receive follow-up requests
- Understand how their information is being used

This would create a powerful dual-sided demo showing both perspectives of the healthcare relationship.

---

## Shared Patient-Care Team Journey

Introduce cross-experience storytelling where:

- Patients submit updates
- Care teams review information
- Actions appear in both experiences
- Care becomes more transparent

---

## Personalized Care Narratives

Generate richer story summaries that connect:

- Symptoms
- Health events
- Appointments
- Outcomes

into meaningful patient journeys.

---

## Advanced Accessibility Modes

Expand support for:

- Neurodivergent users
- Cognitive accessibility
- Simplified reading modes
- Voice-first interactions

---

## Richer Health Signals

Add additional data sources such as:

- Wearables
- Home monitoring devices
- Activity tracking
- Nutrition logging
- Behavioral health indicators

while preserving the patient-centered storytelling approach.

---

## Care Team Collaboration

Enable additional workflows:

- Escalations
- Shared notes
- Team communication
- Follow-up ownership tracking
- Coordinated care journeys

---

## Scenario-Based Demonstrations

Expand the mock data ecosystem with additional healthcare stories including:

- Chronic disease management
- Behavioral health
- Oncology
- Pediatrics
- Post-operative care
- Preventive health journeys

---

# Key Takeaway

WholeStory Health is ultimately an exploration of a simple question:

> What if healthcare experiences focused as much on understanding people as they do on recording data?

By bringing together clinical evidence and lived experience, WholeStory Health demonstrates a vision for more connected, compassionate, accessible, and patient-centered care.

---

### WholeStory Health

**See the whole person. Understand the whole story.**
# BloodDrop — Clinical Report Processing

## Overview

BloodDrop is a frontend prototype created for the Artigence Healthcare internship assessment. It demonstrates a calm, professional workflow for receiving a clinical report, communicating simulated processing progress, and presenting fictional interpretation content for professional clinical review.

The prototype is intentionally focused on the report-processing experience. It does not upload files, persist data, or provide clinical decision-making.

## Features

- Report upload simulation for PDF and DOCX files
- Upload confirmation with selected-report details
- Staged processing workflow and timeline
- 35-second processing simulation based on elapsed time
- Meaningful circular processing visualization
- Long-wait handling after 30 seconds
- Interpretation-ready state
- Fictional AI clinical interpretation view
- Responsive design for desktop, tablet, and mobile
- Keyboard-accessible interactions and visible focus states
- Reduced-motion support

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Production Build

```bash
npm run build
npm start
```

## Processing Timeline

| Elapsed time | Processing stage |
| --- | --- |
| 0–5 seconds | Report received |
| 5–12 seconds | Extracting report information |
| 12–22 seconds | Analyzing findings |
| 22–35 seconds | Generating clinical interpretation |
| 35+ seconds | Interpretation ready |

## Design Decisions

- **Staged timeline:** Makes current, completed, and upcoming work clear throughout the simulated workflow.
- **Custom processing visualization:** Combines circular workflow progress, elapsed time, and a stage indicator instead of relying on a generic spinner alone.
- **Long-wait state:** Reassures the user after 30 seconds without presenting a false failure.
- **Clinical wording:** Uses measured, precise language and avoids claims of diagnosis or confirmed conditions.
- **Restrained motion:** Small fades, transitions, and progress motion communicate state changes without distraction.
- **Clinical review notice:** Clearly states that the fictional AI-generated interpretation supports professional review and does not replace clinical judgment.

## Accessibility

- Keyboard navigation for the upload area and application actions
- Visible, high-contrast focus states
- Semantic HTML, labelled file input, and accessible buttons
- Status and alert announcements for meaningful state changes
- Colour palette designed for readable text and controls
- `prefers-reduced-motion` support that retains information while reducing movement

## Assumptions

- This is a frontend-only prototype.
- File selection is simulated locally; reports are never uploaded to a server.
- Processing is simulated using elapsed time rather than an external service.
- All interpretation content and report observations are fictional placeholders.
- No backend, database, authentication, API keys, or real AI model are used.

## Trade-offs

- A backend was not implemented because persistent uploads and processing services are outside the assessment prototype scope.
- A real AI service was not connected to avoid presenting generated clinical output as live medical analysis.
- Patient management was excluded to keep the experience centered on a single report workflow.
- Dashboard functionality was excluded in favor of a focused, end-to-end processing flow.

## Testing

The following checks were completed during development:

- `npm install` dependency setup
- `npm run typecheck` TypeScript validation
- `npm run build` production compilation and static-page generation
- `npm run dev` local server startup and HTTP availability check
- Responsive layout review of desktop, tablet, and mobile-oriented layouts
- Processing-stage, elapsed-time, long-wait, and 35-second ready-state logic review
- Keyboard, focus, semantic-state, invalid-file, and reduced-motion implementation review

## Figma

Figma Design:  
[https://www.figma.com/design/PAZgJiIdfHBiQ5oGF0sPH5/BloodDrop-%E2%80%94-Clinical-Processing-Design-Reference?node-id=2-54]

## Live Deployment

Live Demo:  
[https://blooddrop-clinical-processing.vercel.app/]




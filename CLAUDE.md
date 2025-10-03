# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevDussey Portfolio is a modern, React-based portfolio website showcasing web development services, projects, and capabilities. Built with TypeScript, React Router, and Framer Motion for smooth animations.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Backend Integration**: Supabase (configured, contact form placeholder only)
- **Styling**: CSS Modules (component-level stylesheets)

## Architecture

### Routing Structure

The app uses client-side routing with the following pages:

- `/` - Hero landing page
- `/about` - About section
- `/services` - Services overview
- `/portfolio` - Selected work showcase
- `/projects` - Active builds and experiments
- `/contact` - Contact form and social links

**Navigation** (`src/components/Navigation.tsx:1`): Sticky header with scroll detection, active route highlighting.

### Component Organization

```
src/
├── App.tsx              # Main router setup with scroll-to-top on navigation
├── main.tsx             # React DOM entry point
├── types/index.ts       # Shared TypeScript interfaces (Project, ContactMessage)
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   └── Footer.tsx       # Site footer
└── sections/            # Page-level section components
    ├── Hero.tsx         # Landing page with feature grid
    ├── About.tsx
    ├── Services.tsx     # Service offerings grid
    ├── Portfolio.tsx    # Project showcase with static data
    ├── CurrentProjects.tsx  # Active projects timeline
    └── Contact.tsx      # Form with Framer Motion animations
```

### Key Patterns

1. **Scroll-to-Top on Route Change**: Implemented in `App.tsx:16` using `useLocation` + `useEffect`

2. **Static Content with Typed Arrays**: All sections use static data arrays (projects, services, features) rather than API fetches. Example in `Portfolio.tsx:3`

3. **Framer Motion Animations**: Contact form uses scroll-triggered animations with `whileInView` for progressive reveal (`Contact.tsx:39`)

4. **Navigation Active State**: Uses `useLocation()` to highlight current route in nav menu (`Navigation.tsx:36`)

5. **Form Handling**: Contact form currently simulates async submission with setTimeout (`Contact.tsx:20`). Supabase integration is included but not wired to the form.

### Asset Management

- Public assets live in `/public/` and are referenced with absolute paths (e.g., `/DevDusseyHome.gif`)
- Each section has a corresponding animated GIF for visual polish
- Logo: `/DevDusseyLogo2.svg`

### TypeScript Configuration

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- JSX transform: `react-jsx` (automatic runtime)
- Module resolution: `bundler` (Vite-optimized)

## Important Implementation Notes

- **Supabase**: Installed (`@supabase/supabase-js`) but not actively used. Contact form submits locally. To enable real submissions, wire `Contact.tsx:20` to Supabase client.

- **Responsive Design**: Each section has dedicated CSS with mobile-first breakpoints

- **Performance**: Images use `loading="lazy"` attribute for deferred loading

- **Accessibility**: Decorative images marked with `aria-hidden="true"`

## Deployment

Project includes `public/_redirects` for SPA routing on static hosts (e.g., Netlify). Build output goes to `dist/` directory.

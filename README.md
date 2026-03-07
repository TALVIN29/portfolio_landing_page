# Talvin's Portfolio

A high-performance, minimalist personal portfolio landing page built with React, Vite, Tailwind CSS, and Framer Motion.

## Features
- **Minimalist Aesthetic:** Clean #090909 dark mode with high-contrast, premium components.
- **GitHub Sync:** Automatically fetches and displays the latest public repositories directly from the GitHub API. 
- **Modular Data:** Uses a scalable layout for adding new projects, links, and featured code.
- **Interactive UI:** Framer motion stagger animations, seamless hover transitions, and an interactive "Coming Soon" section to collect ideas.

## Local Development

### Prerequisites
- Node.js (v18+ recommended)
- Optional: Git

### Installation

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the Vite development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

## Deployment
This project is fully ready to be deployed on static hosting platforms like Vercel, Netlify, or GitHub Pages. 

To create a production build, run:
```bash
npm run build
```
This generates the optimized static files in the `dist` directory.

## Data & Security
- This project doesn't use a backend database natively; the 'Idea Request' form is a UI component ready to be tied to a service like Resend, Supabase, or Formspree. 
- **Note:** Standard frontend deployment means all code inside the `src` folder is bundled and shipped to the browser. Avoid placing secret API keys (like AWS keys or private database tokens) directly in the frontend code.

---
Built by Talvin Lee.

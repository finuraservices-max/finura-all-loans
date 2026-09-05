# Finura — All Loans Starter Site

This repository contains a simple, mobile-friendly static site scaffold for Finura — an "All Loans" provider. It includes an EMI calculator, loan product pages, and an apply form placeholder.

Quick start

1. Replace the placeholder logo
   - Add your uploaded logo to `assets/logo.png` (recommended 512×512 PNG or SVG). A placeholder file is included — replace it with your actual logo to see it in the site preview.
2. (Optional) Add a favicon at `assets/favicon.png`.

Run locally

- Open `index.html` in a browser for a static preview.
- For a local dev server: `npx serve .` or `python -m http.server` from the project root.

Deploy

- Deploy to Netlify, Vercel, GitHub Pages, or any static host.
- To capture apply form submissions, either:
  - Add a backend endpoint and update `apply.html` form action,
  - Or integrate Netlify Forms / Formspree by following their docs.

Customization

- Update copy in `index.html`.
- Adjust colors in `styles.css` (CSS variables).
- Replace the currency formatting in `emi-calculator.js` if you prefer a different currency locale.

Accessibility & SEO checklist

- Replace meta description and og:image with final content.
- Ensure the logo `alt` is descriptive.
- Add structured data (JSON-LD) for Organization or LocalBusiness if you have a public office address.
- Run Lighthouse audit and address any accessibility/performance suggestions.

What's included in this commit

- index.html
- styles.css
- emi-calculator.js
- apply.html
- README.md
- assets/logo-placeholder.svg (placeholder — replace with your real logo)

Next steps I can do for you

- Integrate Netlify Forms and add a serverless function for notifications.
- Add structured data (JSON-LD) to `index.html`.
- Convert to React/Next.js and push a ready-to-deploy starter.
- Run a Lighthouse audit and propose fixes.

If you want me to add the actual uploaded logo file into the repo, tell me and I will add it (I have a copy from the conversation).
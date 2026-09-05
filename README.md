# Finura — All Loans Starter Site

This repository contains a simple, mobile-friendly static site for Finura — an "All Loans" provider. The site includes:

- Home page with quick EMI calculator
- Home Loan calculator (detailed) with amortization schedule
- Apply form with Netlify Forms-ready markup
- JSON-LD LocalBusiness schema for SEO
- Open Graph / Twitter meta tags
- robots.txt and sitemap.xml
- Netlify serverless function example for notifications

Quick start

1. Replace the placeholder logo
   - The repo uses `assets/logo.png` as the site logo and favicon. Replace it with your actual logo (recommended 512×512 PNG or SVG).

2. Local preview

- Clone the repo:
  ```bash
  git clone https://github.com/finuraservices-max/finura-all-loans.git
  cd finura-all-loans
  ```
- Start a simple local server:
  - Python: `python -m http.server 8000`
  - or: `npx serve .`
- Open `http://localhost:8000` in your browser.

Deploy (recommended: Netlify)

1. Create a Netlify account (https://app.netlify.com) and connect your GitHub account.
2. New site → Import from Git → select `finura-all-loans`.
3. Build settings: none (static site), publish directory = `/`.
4. Deploy. Netlify will automatically capture forms marked with `data-netlify="true"`.
5. Optionally add the netlify/functions/send-notification.js as a serverless function to send emails — configure API keys in Netlify environment variables.

Notes & next steps

- Forms: the contact and apply forms are Netlify-ready. After deploying to Netlify, check Site → Forms to see submissions.
- SEO: JSON-LD LocalBusiness schema is added — fill in the address and phone in index.html and home-loan.html JSON-LD blocks.
- Accessibility: updated color contrast and keyboard focus outlines were added.
- Analytics: add your analytics snippet (Google Analytics, Plausible) into `index.html` before the closing `</head>`.
- OG image: we use the logo as og:image. For better social previews consider adding a 1200×630 px image with title overlay.

If you want, I can:
- Deploy the repo to Netlify and connect the Netlify function to send email notifications.
- Generate a 1200×630 OG preview image using your logo and push it to the repo.
- Convert this to a React/Next.js app and push a new repo.

Tell me which of the above you want me to handle next and I will proceed.
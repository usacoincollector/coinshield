# Coin Shield

Manufacturer website for Coin Shield, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Product management

Edit product content in `src/data/products.ts`.

## Email delivery

The wholesale and contact forms send email through Mailgun. Set these environment variables in Vercel:

- `MAILGUN_API_KEY`
- `MAILGUN_DOMAIN`
- `MAILGUN_API_BASE_URL` (`https://api.mailgun.net` for US, `https://api.eu.mailgun.net` for EU)
- `INQUIRY_TO_EMAIL`
- `INQUIRY_FROM_EMAIL`

## Data sheets

Add PDF files to `public/datasheets/` using the product slug as the filename:

- `2x2-cardboard-coin-flip.pdf`
- `2x2-double-pocket-plastic-coin-flip.pdf`
- `modern-currency-toploader.pdf`
- `2x2x9-coin-storage-box.pdf`

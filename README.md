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

The wholesale and contact forms send email through Resend. Set these environment variables in Vercel:

- `RESEND_API_KEY`
- `RESEND_API_BASE_URL` (`https://api.resend.com`)
- `INQUIRY_TO_EMAIL`
- `INQUIRY_FROM_EMAIL`

## Data sheets

Add PDF files to `public/datasheets/` using the product slug as the filename:

- `2x2-cardboard-coin-flip.pdf`
- `2x2-double-pocket-plastic-coin-flip.pdf`
- `modern-currency-toploader.pdf`
- `2x2x9-coin-storage-box.pdf`

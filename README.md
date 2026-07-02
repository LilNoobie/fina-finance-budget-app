# Fina — Personal Finance Tracker

A single-file personal finance app for tracking monthly spending against budgets, uploading credit card statements, and monitoring net worth.

## Features

- **Planned vs. Actual (PVA)** — set monthly budgets per card and category; see spending vs. budget at a glance
- **Statement parsing** — upload PNG screenshots of credit card statements; Claude AI maps transactions to your existing categories
- **Multi-card support** — personal cards (AMEX, Chase Freedom, etc.) are pooled for budget tracking; shared cards (Capital One VentureX, etc.) tracked separately
- **Dashboard** — donut chart of top spending categories, movers (over/under budget), and net worth trend
- **Net worth tracking** — log assets and liabilities monthly to track NW over time
- **Transactions tab** — searchable, filterable transaction history with category editing
- **Drag-and-drop** — reorder PVA budget categories within each card panel
- **Auth** — Supabase email/password login with data synced across devices

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — single `index.html`, no build step |
| Auth & DB | [Supabase](https://supabase.com) (Postgres + RLS) |
| AI parsing | Anthropic Claude via a Netlify serverless function |
| Hosting | [Netlify](https://netlify.com) |

## Project structure

```
index.html                  # Entire frontend — all CSS and JS inline
netlify/functions/parse.js  # Serverless proxy for Anthropic API (verifies Supabase JWT)
netlify.toml                # Build config + security headers
```

## Local development

No build step needed — just open `index.html` in a browser. For statement parsing you'll need the Netlify function running locally:

```bash
npm install -g netlify-cli
netlify dev
```

## Environment variables

Set these in Netlify (never commit them):

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key for statement parsing |

The Supabase URL and anon/publishable key live in `index.html` — they are intentionally public (Supabase anon keys are safe to expose; RLS policies enforce access control).

## Deployment

Connect this repo to Netlify. Every push to `main` auto-deploys.

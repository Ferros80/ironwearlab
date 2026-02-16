# Roadmap MVP – Custom Hats & Apparel

## Milestone 1: Foundation & Layout
- Struttura `src/` con App Router
- Layout root con font streetwear, metadata SEO
- Navbar con menu + CTA "Richiedi custom"
- Footer con social
- Stile base: CSS vars, tipografia, spacing

**DoD:** Navigazione funzionante, stile coerente su tutte le pagine.

---

## Milestone 2: Pagine Vetrina
- Home: hero, valore, CTA
- Gallery: grid categorie (cappelli, giubbotti, scarpe), mock data, placeholder
- Gifted: social proof con artisti + placeholder
- About: storia/identità
- Contact: pagina contatto

**DoD:** Tutte le pagine renderizzano correttamente, layout responsive.

---

## Milestone 3: Form Custom Request
- Pagina `/custom-request` con tutti i campi richiesti
- Validazione client + server (Zod)
- Honeypot + rate limit in-memory per IP
- UI: loading, success, error
- POST `/api/custom-request` → Resend (email HTML)

**DoD:** Form inviabile, email ricevuta, anti-spam attivo.

---

## Milestone 4: Polish & DevX
- SEO: metadata, OpenGraph per ogni pagina
- Micro-animazioni CSS leggere
- `.env.local.example`, README con setup
- Placeholder locali, nessun asset esterno

**DoD:** Progetto deployabile, README chiaro, build senza errori.

---

## Definition of Done (MVP)
- Tutte le pagine accessibili e navigabili
- Form custom-request invia email via Resend
- Validazione Zod client + server
- Honeypot e rate limit implementati
- Mobile-first, responsive
- SEO metadata su ogni pagina
- `npm run build` passa
- `.env.local.example` documentato
- README con comandi e config Resend

---

# Struttura cartelle

```
sito-tommaso/
├── public/
│   ├── placeholder.svg
│   └── ...
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── custom-request/
│   │   │       └── route.ts
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── custom-request/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── gifted/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── lib/
│       ├── email.ts
│       ├── mockData.ts
│       ├── rateLimit.ts
│       └── validators.ts
├── .env.local.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── ROADMAP.md
└── tsconfig.json
```

## File da creare/modificare

| Azione | File |
|--------|------|
| Crea | `src/app/layout.tsx` |
| Crea | `src/app/page.tsx` |
| Crea | `src/app/globals.css` |
| Crea | `src/app/gallery/page.tsx` |
| Crea | `src/app/gifted/page.tsx` |
| Crea | `src/app/about/page.tsx` |
| Crea | `src/app/custom-request/page.tsx` |
| Crea | `src/app/contact/page.tsx` |
| Crea | `src/app/api/custom-request/route.ts` |
| Crea | `src/components/Navbar.tsx` |
| Crea | `src/components/Footer.tsx` |
| Crea | `src/lib/mockData.ts` |
| Crea | `src/lib/validators.ts` |
| Crea | `src/lib/rateLimit.ts` |
| Crea | `src/lib/email.ts` |
| Crea | `public/placeholder.svg` |
| Crea | `.env.local.example` |
| Modifica | `README.md` |
| Modifica | `tsconfig.json` (paths) |
| Elimina | `app/` (root) dopo migrazione a `src/app/` |

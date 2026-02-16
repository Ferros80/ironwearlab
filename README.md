# Custom Hats & Apparel

Sito vetrina streetwear/rap per personalizzazioni di cappellini New Era e accessori (strass, patch, ricami). Include backoffice admin per gestione contenuti e base e-commerce.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma + SQLite (sviluppo) — compatibile Postgres per produzione
- NextAuth v5 (Auth.js) — Credentials Provider, ruoli ADMIN/EDITOR
- Resend — invio email
- Zod — validazione

## Setup

```bash
# Installa dipendenze (già incluse: prisma, next-auth, bcryptjs, zod, resend)
npm install

# Copia e configura le variabili d'ambiente
cp .env.local.example .env.local
# Modifica .env.local (vedi sotto)

# Inizializza il database
npx prisma db push

# Crea l'utente admin iniziale (email: admin@example.com, password: Admin123!)
npm run db:seed

# Avvia in development
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). Per il backoffice: [http://localhost:3000/admin](http://localhost:3000/admin).

## Configurazione .env.local

| Variabile | Descrizione |
|-----------|-------------|
| `DATABASE_URL` | SQLite: `"file:./dev.db"` (relativo a prisma/) |
| `AUTH_SECRET` | Genera con `npx auth secret` |
| `RESEND_API_KEY` | API key da [resend.com](https://resend.com) |
| `RESEND_FROM` | Email mittente (es. `onboarding@resend.dev`) |
| `RESEND_TO` | Email destinatario richieste custom |

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvio development server |
| `npm run build` | Build produzione |
| `npm run start` | Avvio server produzione |
| `npm run db:push` | Applica schema Prisma al DB |
| `npm run db:migrate` | Crea migration |
| `npm run db:seed` | Esegue seed (crea admin) |
| `npm run db:studio` | Apre Prisma Studio |

## Pagine pubbliche

- `/` — Home
- `/gallery` — Galleria (cappelli, giubbotti, scarpe) — legge da DB, fallback mock
- `/gifted` — Social proof — legge da DB, fallback mock
- `/about` — Chi siamo
- `/custom-request` — Form richiesta personalizzazione (salva su DB + email Resend)
- `/contact` — Contatti

## Backoffice (/admin)

- `/admin/login` — Login (email + password)
- `/admin` — Dashboard
- `/admin/gallery` — CRUD gallery
- `/admin/gifted` — CRUD gifted
- `/admin/requests` — Lista richieste custom + dettaglio + cambio status
- `/admin/products` — CRUD prodotti + varianti
- `/admin/orders` — Lista ordini (stub)
- `/admin/users` — Gestione utenti (solo ADMIN)

## Upload media

I file caricati dall'admin vengono salvati in `/public/uploads`. La cartella è creata automaticamente al primo upload. Tipo supportati: image/*, video/*. Max 10MB.

## Creazione utente admin

Dopo `npm run db:seed`:

- **Email:** admin@example.com
- **Password:** Admin123!

Cambia la password dopo il primo accesso.

## Migrazione a Postgres

1. In `.env`: `DATABASE_URL="postgresql://user:pass@host:5432/db"`
2. `npx prisma migrate dev` per creare le migration
3. Nessuna modifica al codice richiesta (schema compatibile)

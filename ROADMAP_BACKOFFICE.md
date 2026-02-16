# Roadmap Backoffice Completo

## File creati/modificati

**Creati:**
- prisma/schema.prisma, prisma/seed.ts
- src/lib/db.ts, src/lib/gallery.ts, src/lib/gifted.ts
- src/auth.ts
- src/middleware.ts
- src/components/SessionProvider.tsx, LayoutWrapper.tsx
- src/components/admin/Sidebar.tsx, AdminShell.tsx, MediaLibrary.tsx
- src/app/api/auth/[...nextauth]/route.ts
- src/app/api/upload/route.ts, src/app/api/media/route.ts
- src/app/admin/layout.tsx, admin/page.tsx, admin/login/page.tsx
- src/app/admin/gallery/page.tsx, gallery/new/page.tsx, gallery/[id]/page.tsx, gallery/GalleryForm.tsx, gallery/GalleryDeleteBtn.tsx, gallery/MediaUpload.tsx
- src/app/admin/gifted/page.tsx, gifted/new/page.tsx, gifted/[id]/page.tsx, gifted/GiftedForm.tsx, gifted/GiftedDeleteBtn.tsx
- src/app/admin/requests/page.tsx, requests/[id]/page.tsx, requests/[id]/RequestStatusForm.tsx
- src/app/admin/products/page.tsx, products/new/page.tsx, products/[id]/page.tsx, products/[id]/VariantForm.tsx, products/ProductForm.tsx, products/ProductDeleteBtn.tsx
- src/app/admin/orders/page.tsx, admin/users/page.tsx, admin/users/UserCreateForm.tsx, admin/users/UserDeleteBtn.tsx
- src/actions/gallery.ts, gifted.ts, requests.ts, products.ts, users.ts
- public/uploads/.gitkeep

**Modificati:**
- src/app/layout.tsx (SessionProvider, LayoutWrapper)
- src/app/gallery/page.tsx (fetch da DB)
- src/app/gifted/page.tsx (fetch da DB)
- src/app/api/custom-request/route.ts (salvataggio su DB)
- package.json (scripts db:*)
- .env.local.example
- README.md

---

## Step 1: Database & Prisma
- [x] Prisma schema con tutti i modelli (User, Media, GalleryItem, GiftedItem, CustomRequest, Product, ProductVariant, Order, OrderItem)
- [x] SQLite per sviluppo, struttura compatibile Postgres
- [x] Script npm: db:push, db:migrate, db:seed, db:studio
- [x] Seed: utente ADMIN iniziale (password hashata con bcrypt)
- [x] src/lib/db.ts (singleton PrismaClient)

## Step 2: Auth & Middleware
- [x] NextAuth v5 (Auth.js) con Credentials Provider
- [x] Ruoli ADMIN, EDITOR
- [x] src/lib/auth.ts (config auth)
- [x] src/app/api/auth/[...nextauth]/route.ts
- [x] src/middleware.ts: protezione /admin/*, redirect /admin/login
- [x] Pagina login /admin/login

## Step 3: Media Upload
- [x] POST /api/upload: upload file in /public/uploads
- [x] Validazione type (image/*, video/*), size (max 10MB)
- [x] Naming univoco (timestamp + random)
- [x] Salvataggio metadati in tabella Media
- [x] GET /api/media: lista media per library
- [x] Componente MediaLibrary per admin (select esistente)

## Step 4: Admin UI
- [x] Layout admin con sidebar, logout
- [x] /admin - dashboard
- [x] /admin/gallery - CRUD (lista, new, edit)
- [x] /admin/gifted - CRUD
- [x] /admin/requests - lista + dettaglio + cambio status
- [x] /admin/products - CRUD prodotti + varianti
- [x] /admin/orders - lista stub
- [x] /admin/users - solo ADMIN
- [x] Server actions per CRUD (gallery, gifted, products, requests, users, media)
- [x] Tabelle con ricerca e filtri

## Step 5: Integrazione Sito Pubblico
- [x] Gallery: fetch da DB, fallback mock se vuoto
- [x] Gifted: fetch da DB, fallback mock
- [x] Custom request API: salva su DB + invia email Resend
- [x] Mantieni rate limit e honeypot

## Checklist finale
- [ ] npm install
- [ ] cp .env.local.example .env.local
- [ ] Configura NEXTAUTH_SECRET, RESEND_*, DATABASE_URL
- [ ] npx prisma db push
- [ ] npm run db:seed
- [ ] npm run dev
- [ ] Accedi a /admin/login con credenziali seed

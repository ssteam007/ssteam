# SSTEAM GUESS — Target 90% (Backtest Based)

**Proper (non-demo) system** using **Next.js + Supabase Postgres + Prisma**:

- User registers → stored in DB (inactive by default)
- Admin approves/activates user
- Admin can set **PREMIUM (7 days)** → expiry stored in DB
- Expired premium is blocked automatically on login

## 1) Create Supabase database (FREE)
1. Create a Supabase project
2. Copy the **Postgres connection string** (Database settings → Connection string)

## 2) Configure environment variables
Create `.env` in project root:

```env
DATABASE_URL="PASTE_SUPABASE_POSTGRES_URL_HERE"

ADMIN_USERNAME="mirza"
ADMIN_PASSWORD="Gujrat123@"

# Used to secure admin APIs + bootstrap
ADMIN_PANEL_KEY="SSTEAM_SECRET_9021"
```

## 3) Install dependencies
```bash
npm install
```

## 4) Run migrations
```bash
npx prisma migrate dev --name init
```

## 5) Create the single admin (ONE time)
Start dev server:
```bash
npm run dev
```

Then run:
```bash
curl -X POST http://localhost:3000/api/admin/bootstrap -H "x-admin-key: SSTEAM_SECRET_9021"
```

Admin credentials (from `.env`):
- Username: `mirza`
- Password: `Gujrat123@`

## 6) Use the app
- Register: `/register`
- Login: `/login`
- Dashboard: `/dashboard`
- Admin panel: `/admin` (paste Admin Key: `SSTEAM_SECRET_9021`)

## 7) Deploy FREE on Vercel
1. Push this repo to GitHub
2. Import in Vercel
3. Add env vars in Vercel Project Settings:
   - DATABASE_URL
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
   - ADMIN_PANEL_KEY
4. Deploy
5. Bootstrap admin ONCE using your Vercel URL:
```bash
curl -X POST https://YOURAPP.vercel.app/api/admin/bootstrap -H "x-admin-key: SSTEAM_SECRET_9021"
```

After bootstrap, you can delete/disable the bootstrap route if you want extra hardening.

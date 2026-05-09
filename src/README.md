# Bella Africa Store 🌍

An African food e-commerce store built with React, Tailwind CSS, and Base44.

## Tech Stack

- **Frontend:** React 18, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Base44 (entities, functions, auth)
- **Database:** Base44 built-in + Supabase (connected via OAuth)
- **Payments/Orders:** WhatsApp-based ordering flow

---

## Getting Started Locally

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- A [Base44](https://base44.com) account with access to this app

### 2. Clone the repo

After setting up GitHub Sync in Base44 Dashboard → Settings → GitHub Sync:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

```bash
cp .env.example .env
```

Then fill in your `.env` file:

| Variable | Where to find it |
|---|---|
| `VITE_BASE44_APP_ID` | Base44 Dashboard → Settings → App ID |
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API |

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── pages/              # Route-level page components
│   ├── admin/          # Admin dashboard pages
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Checkout.jsx
│   └── ...
├── components/
│   ├── admin/          # Admin UI components
│   ├── home/           # Homepage sections
│   ├── store/          # Shared store components
│   └── ui/             # shadcn/ui base components
├── functions/          # Base44 backend functions (Deno)
├── entities/           # Base44 entity schemas (JSON)
├── lib/                # Utilities, stores, services
└── api/                # Base44 client setup
```

---

## Key Features

- 🛒 Shopping cart with WhatsApp checkout
- 📦 Product catalog with categories & search
- 🔐 Admin dashboard (password protected)
- 📊 Supabase project viewer (admin)
- 🚚 Canada-wide delivery info
- 📱 Fully responsive (mobile-first)

---

## Admin Access

Navigate to `/admin` in your browser. The default admin credentials are set locally — check `components/admin/AdminLogin.jsx` for the storage key and reset logic.

---

## Deployment

This app is hosted on Base44. Push changes via:
- **Base44 editor** (auto-deploys)
- **GitHub Sync** (push to main branch → auto-deploys)

---

## Contact

For order inquiries: [WhatsApp +1 438-836-5678](https://wa.me/14388365678)  
Email: olasubomiadekanbi@gmail.com
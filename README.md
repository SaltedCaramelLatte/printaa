# Next.js + Supabase Starterkit

> **Production-ready starterkit** dengan Supabase Auth + RLS sudah configured, admin panel CRUD lengkap, dan komponen UI reusable. **Seperti Laravel Breeze untuk Next.js!**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20RLS-green)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

---

## ✨ Apa yang Sudah Termasuk

### 🔐 Supabase Auth + RLS (Sudah Configured!) ⭐
- **JWT-based authentication** dengan Supabase
- **3-tier role system:** super_admin, admin, kontributor
- **RLS policies** di setiap table
- **Helper functions** untuk permission checks (`is_admin()`, `is_super_admin()`)
- **Auto-profile creation** via database trigger
- **Race condition handling** di auth context
- **Profile fetch retry logic** untuk database trigger delay
- **Ini adalah bagian paling rumit - dan sudah selesai!**

### 🎨 Admin Panel CRUD Lengkap ⭐
- ✅ **Articles management** (dengan TipTap markdown editor)
- ✅ **Events management**
- ✅ **Members management**
- ✅ **Leadership management**
- ✅ **Users management** (super_admin only)
- ✅ **Site settings**
- ✅ **Dashboard** dengan statistik
- ✅ **Role-based access control**
- ✅ **Consistent CRUD patterns** - mudah di-replicate

### 📝 Rich Text Editor (Production Ready) ⭐
- **TipTap integration** dengan Markdown support
- **Image upload** capability
- **Tables, links, code blocks**
- **Preview mode**
- **Siap pakai tanpa setup tambahan**

### 🎭 UI Components Library ⭐
**Animations:**
- ParallaxHero - Parallax scrolling effect
- TiltCard - 3D tilt on hover
- SpotlightCard - Spotlight effect
- ScrollReveal - Scroll-triggered animations

**Layouts:**
- FloatingDock - Modern navigation dock
- Header & Footer - Responsive layouts
- MobileMenu - Off-canvas mobile navigation

**Content:**
- MarkdownContent - Markdown renderer dengan syntax highlighting
- Skeleton components - Loading states
- Empty states & error boundaries

### 🌐 Public Pages (Sudah Terintegrasi) ⭐
- Homepage (hero, features, stats, CTA)
- Articles listing & detail pages
- Events listing & detail pages
- Members directory
- Leadership page
- **Sudah include data fetching dari Supabase:**
  - Client-side fetching examples
  - Server-side fetching examples
  - Direct Supabase queries dengan type-safe

### 🏗️ Simplified Architecture ⭐
- **Feature-based organization** untuk code clarity
- **Direct Supabase queries** di lib/api layer
- **Type-safe** di seluruh codebase
- **Straightforward data flow:**
  - Component → lib/api → Supabase Client → PostgreSQL + RLS
- **Consistent patterns** yang mudah di-copy untuk entity baru
- **Focus on productivity** - simple dan langsung ke inti

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn
- Akun Supabase (gratis di [supabase.com](https://supabase.com))

### 1. Clone & Install
```bash
git clone https://github.com/efisiendev/nextjs-supabase-starterkit.git
cd nextjs-supabase-starterkit
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan credentials Supabase Anda:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Organization"
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789
```

### 3. Run Database Migration
1. Buka **SQL Editor** di Supabase Dashboard
2. Copy isi file `supabase/migrations/20240122000000_initial_schema.sql`
3. Paste dan **Run**

Migration ini akan create:
- ✅ Tables (articles, events, members, leadership, profiles)
- ✅ RLS policies untuk semua tables
- ✅ Helper functions (`is_admin()`, `is_super_admin()`)
- ✅ Trigger untuk auto-create profile

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

### 5. Create First Admin
1. Signup via [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Di Supabase Dashboard → **Authentication** → **Users**
3. Click user → Edit → Tambahkan di `raw_app_meta_data`:
   ```json
   {
     "role": "super_admin"
   }
   ```
4. Save → Logout → Login kembali

---

## 📚 Yang Anda Dapatkan

### Auth System
| Feature | Status | Description |
|---------|--------|-------------|
| JWT Auth | ✅ | Supabase Auth dengan JWT tokens |
| 3 User Roles | ✅ | super_admin, admin, kontributor |
| RLS Policies | ✅ | Row-level security di semua tables |
| Protected Routes | ✅ | Middleware + client-side guards |
| Permission Helpers | ✅ | `hasPermission()`, `canManageUsers()`, dll |
| Race Condition Handling | ✅ | Queue-based profile fetching |
| Profile Retry Logic | ✅ | Auto-retry jika trigger delay |

### Admin Panel Features
| Feature | super_admin | admin | kontributor |
|---------|-------------|-------|-------------|
| Dashboard | ✅ | ✅ | ✅ |
| View Articles/Events | ✅ | ✅ | ✅ (own only) |
| Create Articles/Events | ✅ | ✅ | ✅ |
| Publish Articles/Events | ✅ | ✅ | ❌ |
| Manage Members | ✅ | ✅ | ❌ |
| Manage Leadership | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ |
| Site Settings | ✅ | ✅ | ❌ |

### Data Flow
```
User Request
    ↓
Component (React)
    ↓
lib/api functions (getArticles, getEvents, etc)
    ↓
Supabase Client
    ↓
PostgreSQL + RLS
```

**Contoh:**
```typescript
// Component
import { getArticles } from '@/lib/api/articles';

const articles = await getArticles(); // Simple & straightforward!
```

### Permission Helpers Usage
```typescript
import { useAuth } from '@/lib/auth/AuthContext';

function AdminPanel() {
  const { hasPermission, canManageUsers, canPublishArticles } = useAuth();

  // Check multiple roles
  if (hasPermission(['admin', 'super_admin'])) {
    // Allow action
  }

  // Check specific permission
  if (canManageUsers()) {
    // Super admin only
  }

  // Check content ownership
  if (canEditOwnContent(article.author_id)) {
    // Kontributor can edit own drafts
  }
}
```

---

## 🎯 Kenapa Starterkit Ini?

### ❌ Tanpa Starterkit Ini
- ⏱️ **2-3 hari** setup Supabase Auth + RLS dari nol
- 😰 Debugging RLS policies yang strict dan rumit
- 🔁 Copy-paste CRUD patterns berkali-kali
- 📚 Baca dokumentasi Supabase berulang kali
- 🐛 Handle edge cases (race conditions, profile creation delay, token refresh)

### ✅ Dengan Starterkit Ini
- ⚡ **5 menit** clone → setup → run
- 🎯 Auth + RLS sudah configured dengan benar
- 📋 CRUD patterns jelas dan konsisten
- 🚀 Langsung fokus ke fitur bisnis
- 💪 Built-in best practices dan error handling
- 📖 Dokumentasi lengkap inline (JSDoc)

---

## 🛠️ Tech Stack

**Core:**
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL + Auth + RLS + Storage)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3

**Libraries:**
- **Editor:** TipTap (rich text + markdown)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Notifications:** Sonner (toast)
- **Icons:** Lucide React
- **Date:** date-fns dengan locale Indonesia

**Architecture:**
- **Pattern:** Feature-based organization
- **Data Access:** Direct Supabase queries (lib/api layer)
- **State:** React Context (Auth)
- **Type Safety:** Full TypeScript coverage

---

## 📖 Documentation

Dokumentasi lengkap tersedia di folder `docs/`:

- **[SETUP.md](docs/SETUP.md)** - Setup guide detail step-by-step
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Penjelasan struktur project & data flow
- **[SUPABASE.md](docs/SUPABASE.md)** - Auth flow, RLS policies, data fetching
- **[NEW_ENTITY.md](docs/NEW_ENTITY.md)** - Tutorial menambah entity baru

---

## 🏗️ Project Structure

```
├── config/                    # ⭐ Configuration files (easy to customize)
│   ├── site.config.ts        # Site metadata, contact info
│   ├── domain.config.ts      # Categories, divisions, business domain
│   └── navigation.config.ts  # Routes definitions
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (public)/         # Public pages
│   │   ├── admin/            # Admin panel pages
│   │   └── api/              # API routes
│   ├── features/             # Feature-based components
│   │   ├── articles/         # Article-related components
│   │   ├── events/           # Event-related components
│   │   └── members/          # Member-related components
│   ├── shared/               # Shared/reusable components
│   │   ├── ui/               # UI components
│   │   └── animations/       # Animation components
│   ├── infrastructure/       # Infrastructure utilities
│   │   └── validators/       # Validation schemas
│   └── lib/
│       ├── auth/             # ⭐ Auth context (fully documented)
│       ├── api/              # ⭐ Data fetching functions (articles, events, etc)
│       ├── supabase/         # Supabase client configs
│       └── utils/            # Helper functions
└── supabase/
    └── migrations/           # ⭐ Database schema + RLS policies
```

---

## 🎨 Customization

### 1. Site Information (5 menit)
Edit `config/site.config.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Print AA',
  fullName: 'Print 7 Fotocopy AA',
  email: 'contact@yoursite.com',
  whatsappNumber: '6285343971885',
  instagram: '@yourorg',
  address: 'Jalan rajawali Asr Lompobattang No.12A Blok A, Panambungan, Kec. Mariso, Kota Makassar, Sumatera Selatan 90124',
};
```

### 2. Categories & Divisions (5 menit)
Edit `config/domain.config.ts`:
```typescript
export const ARTICLE_CATEGORIES = {
  news: 'News',
  tutorial: 'Tutorial',
  announcement: 'Announcement',
} as const;

export const DIVISIONS = {
  'tech': 'Technology',
  'marketing': 'Marketing',
  'finance': 'Finance',
} as const;
```

### 3. Navigation Routes (2 menit)
Edit `config/navigation.config.ts`:
```typescript
export const ROUTES = {
  home: '/',
  blog: '/blog',
  products: '/products',
  contact: '/contact',
} as const;
```

### 4. Tambah Entity Baru (30-60 menit)
Ikuti tutorial lengkap di **[docs/NEW_ENTITY.md](docs/NEW_ENTITY.md)**

Contoh: Menambah entity **Products**
1. Create migration untuk table `products` dengan RLS policies
2. Create TypeScript types untuk `Product`
3. Create `lib/api/products.ts` dengan data fetching functions
4. Create admin CRUD pages di `app/admin/products/`
5. Create public pages di `app/(public)/products/`
6. Copy patterns dari articles atau events - simple & straightforward!

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Build locally first
npm run build

# Deploy
vercel --prod
```

**Environment Variables:**
Set di Vercel Dashboard → Project → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env.local my-app
```

---

## 📝 Scripts

```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

---

## 💡 Tips & Best Practices

1. **Pelajari admin panel terlebih dahulu** - Semua CRUD patterns ada di sana
2. **Copy pattern yang sudah ada** ketika menambah entity baru
3. **Gunakan lib/api functions** untuk semua data access - consistent & type-safe
4. **Jangan bypass RLS** kecuali di API routes dengan service role key
5. **Test permissions di setiap role** sebelum deploy production
6. **Baca inline documentation** di AuthContext dan lib/api files
7. **Gunakan config files** di `config/` untuk customization cepat

---

## 🤝 Contributing

Contributions welcome! Steps:

1. Fork repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

**Branch Strategy:**
- `main` - Production-ready code
- `starterkit-refactor` - Current refactoring work
- `feat/*` - Feature branches
- `fix/*` - Bug fix branches

Baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk guidelines lengkap.

---

## 📄 License

MIT License - Bebas digunakan untuk project komersial maupun personal.

---

## 🙋 Support & Community

- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation:** [docs/](docs/)

---

## 🎓 Learning Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Row Level Security (RLS):** https://supabase.com/docs/guides/auth/row-level-security
- **TypeScript Best Practices:** https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html

---

**Dibuat dengan ❤️ menggunakan Next.js + Supabase**

**Ready untuk production. Clone, customize, deploy!** 🚀

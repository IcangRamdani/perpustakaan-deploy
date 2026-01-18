# Frontend Deployment Guide

Panduan untuk deploy frontend aplikasi Perpustakaan di Railway.

## Option 1: Serve dari Backend (Recommended untuk Full Stack)

### Setup

1. File HTML, CSS, JS sudah siap
2. Backend (`backend/server.js`) sudah update untuk serve static files
3. Environment: Production mode di Railway

### Update API URL

File: `api.js` (baris 6)

**Development:**
```javascript
const API_URL = 'http://localhost:3000/api';
```

**Production (Railway):**
```javascript
const API_URL = 'https://your-railway-backend.railway.app/api';
```

### Deployment

Frontend akan otomatis di-serve bersama backend dari Railway service yang sama.

---

## Option 2: Deploy Frontend Separately (Recommended untuk SPA)

Jika ingin frontend dan backend di domain terpisah.

### A. Menggunakan Vercel (Free, Recommended)

**Advantages:**
- Free tier yang bagus
- Fast CDN global
- Automatic deployments dari GitHub
- Custom domains mudah

**Steps:**

1. Buka https://vercel.com
2. Klik "New Project"
3. Import repository `perpustakaan-appv1`
4. Vercel akan auto-detect
5. Configure:
   - Framework Preset: "Other"
   - Build Command: Skip (static files)
   - Output Directory: `.` atau kosongkan
6. Deploy

**Update API URL:**
```javascript
// api.js
const API_URL = 'https://your-railway-backend.railway.app/api';
```

**Custom Domain (opsional):**
1. Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS settings

---

### B. Menggunakan Netlify (Free)

**Advantages:**
- Simple setup
- Good free tier
- Good support

**Steps:**

1. Buka https://netlify.com
2. "New site from Git"
3. Connect GitHub
4. Select repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` atau custom
6. Deploy

**Update API URL:**
```javascript
const API_URL = 'https://your-railway-backend.railway.app/api';
```

---

### C. Menggunakan GitHub Pages (Free)

**Advantages:**
- Already on GitHub
- Completely free
- Simple

**Steps:**

1. Push code to GitHub
2. Go to Settings → Pages
3. Select source: `main` branch
4. Save
5. Site akan published di: `https://username.github.io/perpustakaan-appv1`

**Update API URL:**
```javascript
const API_URL = 'https://your-railway-backend.railway.app/api';
```

**Custom Domain (opsional):**
1. Buy domain (e.g., Cloudflare, Namecheap)
2. Settings → Pages → Custom domain
3. Add domain
4. Update DNS to GitHub

---

### D. Menggunakan Railway Static Hosting

Railway juga punya static hosting, tapi lebih complicated.

---

## Configuration Steps

### 1. Update API_URL

Depending on your deployment choice:

**If serving from backend:**
```javascript
const API_URL = 'https://your-railway-backend.railway.app/api';
```

**If frontend separate domain:**
```javascript
// Vercel/Netlify/GitHub Pages URL
const API_URL = 'https://your-railway-backend.railway.app/api';
// Same as above - API URL always points to Railway backend
```

### 2. Update Backend CORS

File: `backend/server.js` → Update CORS origins:

```javascript
const allowedOrigins = [
  'https://your-frontend-domain.com',      // Vercel/Netlify
  'https://username.github.io',             // GitHub Pages
  'https://your-railway-backend.railway.app', // If serve from backend
  'http://localhost:3000',                  // Local development
  'http://localhost:5500'                   // Live Server
];
```

Or use environment variable:
```javascript
const allowedOrigins = [process.env.CORS_ORIGIN || 'http://localhost'];
```

### 3. Railway Backend Variables

Update di Railway Dashboard → Backend Service → Variables:

```
CORS_ORIGIN=https://your-frontend-domain.com
```

---

## Recommended Combination

### Best Setup: Vercel Frontend + Railway Backend

**Why?**
- Frontend: Fast global CDN (Vercel)
- Backend: Reliable hosting (Railway)
- Database: Managed MySQL (Railway)
- Cost: Mostly free

**Steps:**

1. **Frontend deployment (Vercel):**
   - Deploy to Vercel
   - Update `api.js` dengan Railway backend URL
   - Note Vercel URL

2. **Backend configuration:**
   - Deploy to Railway ✅ (done)
   - Add CORS_ORIGIN variable dengan Vercel URL
   - Verify database connected

3. **Testing:**
   ```bash
   # Test Vercel frontend
   curl https://your-vercel-domain.com
   
   # Test Railway API
   curl https://your-railway-backend.railway.app/api/health
   ```

4. **Update CORS:**
   - Backend → Variables:
     ```
     CORS_ORIGIN=https://your-vercel-domain.com
     ```

---

## Frontend-Only Changes Needed

### 1. api.js

Update API URL ke Railway backend:

```javascript
// BEFORE
const API_URL = 'http://localhost:3000/api';

// AFTER
const API_URL = 'https://[railway-url].railway.app/api';
```

### 2. No other changes needed

- HTML files tetap sama
- CSS tetap sama
- JavaScript logic tetap sama
- Hanya update API_URL

---

## Testing Frontend

### Before deployment (local):

```bash
# Start backend
cd backend && npm start

# Open frontend
# Option 1: Python simple server
cd ..
python -m http.server 5500

# Option 2: VS Code Live Server
# Right-click index.html → Open with Live Server

# Test: http://localhost:5500
```

### After deployment:

1. Buka frontend URL
2. Check console (F12 → Console)
3. Verify no CORS errors
4. Try login
5. Try fetch data

---

## Common Frontend Issues

### Issue: "Cannot fetch data" / CORS error

**Check:**
1. API_URL correct di api.js
2. Backend CORS configured
3. No typos di API endpoint paths

**Fix:**
```javascript
// api.js - line 6
const API_URL = 'https://your-railway-backend.railway.app/api';
```

---

### Issue: "404 Not Found" untuk pages

**If using GitHub Pages:**
- Static site, dapat't do client-side routing
- Use hash routing: `index.html#/dashboard`
- Or serve index.html untuk semua 404s

**If using Vercel/Netlify:**
- Auto-configured untuk client-side routing
- No changes needed

---

### Issue: Page takes long time to load

**Check:**
1. API response time (Check Railway metrics)
2. Frontend bundle size (too large images/files)
3. Database query performance

**Optimize:**
- Compress images
- Minimize CSS/JS
- Add loading indicators
- Cache API responses (frontend side)

---

## Deployment Checklist

### Before Frontend Deploy:

- [ ] API_URL updated
- [ ] No localhost references
- [ ] No console errors
- [ ] All pages load
- [ ] Forms work
- [ ] API calls successful
- [ ] Authentication flow works

### After Frontend Deploy:

- [ ] Frontend loads
- [ ] API calls work
- [ ] Login/authentication works
- [ ] Data fetches correctly
- [ ] No CORS errors
- [ ] Performance acceptable
- [ ] Mobile responsive (check)

---

## URLs Reference

| Component | Local Dev | Production |
|-----------|-----------|-----------|
| Frontend | http://localhost:5500 | https://your-domain.com |
| Backend API | http://localhost:3000/api | https://railway-url.railway.app/api |
| Database | localhost:3306 | Railway MySQL |

---

## Next Steps

1. **Choose deployment option** (Vercel recommended)
2. **Update api.js** dengan Railway backend URL
3. **Deploy frontend** ke pilihan platform
4. **Update CORS** di Railway
5. **Test everything**

---

**Tips:**
- Keep API_URL centralized (dalam api.js)
- Use environment variables jika possible
- Test locally dulu sebelum deploy
- Monitor Railway metrics
- Keep frontend simple jika bisa

---

For issues, lihat TROUBLESHOOTING.md

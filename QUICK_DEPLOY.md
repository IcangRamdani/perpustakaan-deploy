# Quick Deployment Guide - Railway

Panduan cepat untuk deploy di Railway dalam 5 langkah mudah.

## Step 1: Siapkan Repository GitHub ⚙️

```bash
cd perpustakaan-appv1
git init
git add .
git commit -m "Ready for Railway deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/perpustakaan-appv1.git
git push -u origin main
```

## Step 2: Buat Project di Railway 🚀

1. Buka https://railway.app
2. Login/Sign Up dengan GitHub
3. Klik "Create New Project"
4. Pilih "Deploy from GitHub"
5. Pilih repository `perpustakaan-appv1`

## Step 3: Tambah MySQL Database 🗄️

1. Di Railway Project Dashboard, klik "+ New"
2. Pilih "Database" → "MySQL"
3. Tunggu selesai
4. Copy credentials dari tab "Connect"

## Step 4: Set Environment Variables 🔑

Di Railway Backend Service, buka tab "Variables":

```
NODE_ENV=production
PORT=3000
MYSQLHOST=[dari MySQL Connect tab]
MYSQLUSER=[dari MySQL Connect tab]
MYSQLPASSWORD=[dari MySQL Connect tab]
MYSQLDATABASE=railway
JWT_SECRET=[buat random string, contoh: sk-1234567890abcdef]
CORS_ORIGIN=https://[your-railway-url].railway.app
```

## Step 5: Import Database Schema 📊

Akses MySQL Workbench atau phpMyAdmin melalui Railway, import file:
```
backend/database.sql
```

## Testing ✅

Test endpoint:
```
GET https://[your-railway-url].railway.app/api/health
```

Response yang diharapkan:
```json
{"status":"OK","message":"Server is running"}
```

---

## Update Frontend API URL 🌐

File: `api.js` (di root directory)

Ganti:
```javascript
const API_URL = 'http://localhost:3000/api';
```

Menjadi:
```javascript
const API_URL = 'https://[your-railway-url].railway.app/api';
```

---

## Dokumentasi Lengkap 📚

Untuk panduan detail, baca: **DEPLOY_RAILWAY.md**

---

**Important:** Railway memberikan quota gratis $5/bulan untuk setiap project. Cukup untuk hosting aplikasi kecil-menengah.

Untuk info lebih: https://railway.app/pricing

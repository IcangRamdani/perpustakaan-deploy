# Panduan Deploy di Railway ✈️

Tutorial lengkap untuk mendeploy aplikasi Sistem Perpustakaan di platform Railway.

## 📋 Daftar Isi
1. [Prasyarat](#prasyarat)
2. [Langkah 1: Setup Railway Account](#langkah-1-setup-railway-account)
3. [Langkah 2: Setup Database MySQL](#langkah-2-setup-database-mysql)
4. [Langkah 3: Deploy Backend](#langkah-3-deploy-backend)
5. [Langkah 4: Deploy Frontend](#langkah-4-deploy-frontend)
6. [Langkah 5: Konfigurasi Environment Variables](#langkah-5-konfigurasi-environment-variables)
7. [Langkah 6: Testing](#langkah-6-testing)
8. [Troubleshooting](#troubleshooting)

---

## Prasyarat

Sebelum memulai, pastikan Anda memiliki:

- ✅ Git terinstal di komputer
- ✅ GitHub account (atau provider git lain)
- ✅ Railway account (gratis di https://railway.app)
- ✅ Node.js 14+ terinstal (untuk testing lokal)
- ✅ Source code aplikasi di GitHub

### Instalasi Railway CLI (Opsional, tapi Recommended)

```bash
# Windows (menggunakan npm)
npm install -g @railway/cli

# Atau Windows (menggunakan chocolatey)
choco install railway
```

---

## Langkah 1: Setup Railway Account

### 1.1 Daftar di Railway
1. Buka https://railway.app
2. Klik **"Login"** → **"Sign up"**
3. Pilih salah satu:
   - Sign up dengan GitHub
   - Sign up dengan Email

**Recommended**: Gunakan GitHub untuk kemudahan integrasi

### 1.2 Verifikasi Email
- Cek email Anda dan verifikasi akun
- Setelah terverifikasi, login ke Railway dashboard

### 1.3 Buat Project Baru
1. Di Railway Dashboard, klik **"Create New Project"**
2. Pilih template atau **"Blank Project"**
3. Beri nama project, contoh: `perpustakaan-system`
4. Klik **"Create Project"**

---

## Langkah 2: Setup Database MySQL

### 2.1 Tambah MySQL Database
1. Di Project Dashboard, klik **"+ New"**
2. Pilih **"Database"** → **"MySQL"**
3. Tunggu beberapa saat hingga database terbuat
4. Database akan otomatis dikonfigurasi

### 2.2 Konfigurasi Database Connection
1. Buka tab MySQL database yang baru dibuat
2. Di tab **"Connect"**, copy informasi koneksi:
   - **Host**
   - **User**
   - **Password**
   - **Database name** (default: `railway`)

3. Catat atau copy semua informasi ini (akan digunakan nanti)

### 2.3 Import Database Schema
1. Di Railway MySQL, klik **"Connect"** tab
2. Lihat "MySQL Client" command, copy yang sesuai OS Anda

**Contoh untuk Windows:**
```bash
mysql -h your-host.railway.internal -u root -p < backend/database.sql
```

Atau gunakan GUI seperti:
- phpMyAdmin (akses via Railway)
- MySQL Workbench
- DBeaver

**Langkah-langkah dengan phpMyAdmin:**
1. Di Railway MySQL tab, klik **"MySQL Client"**
2. Gunakan credentials yang tercantum
3. Import file `backend/database.sql`

---

## Langkah 3: Deploy Backend

### 3.1 Push Code ke GitHub

Jika belum ada di GitHub:

```bash
cd perpustakaan-appv1
git init
git add .
git commit -m "Initial commit - ready for Railway deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/perpustakaan-appv1.git
git push -u origin main
```

### 3.2 Koneksikan Railway dengan GitHub

1. Di Railway Dashboard, klik **"+ New"**
2. Pilih **"GitHub Repo"**
3. Jika belum terhubung:
   - Klik **"Authorize GitHub"**
   - Izinkan Railway untuk akses repository
4. Pilih repository `perpustakaan-appv1`
5. Klik **"Deploy"**

### 3.3 Tunggu Deploy

- Railway akan otomatis:
  - Download source code dari GitHub
  - Install dependencies (npm install)
  - Build aplikasi
  - Start server

Lihat progress di **"Deployments"** tab

---

## Langkah 4: Deploy Frontend

Ada 2 pilihan untuk frontend:

### Opsi A: Deploy Static Files (Recommended untuk HTML)

Untuk aplikasi HTML/CSS/JS statis, gunakan hosting statis seperti:

#### Menggunakan Railway Static Hosting:
1. Buat folder baru di project root
2. Copy semua file HTML, CSS, JS, assets ke folder tersebut
3. Push ke GitHub
4. Di Railway, tambah service baru dengan static hosting

**Atau gunakan alternatif (lebih mudah):**

#### Menggunakan Vercel (Free)
```bash
npm install -g vercel
vercel
# Follow interactive setup
```

#### Menggunakan Netlify (Free)
1. Buka https://netlify.com
2. Connect GitHub
3. Deploy

#### Menggunakan GitHub Pages (Free)
1. Push ke GitHub
2. Pergi ke Settings → Pages
3. Set source ke `main` branch
4. Publish

### Opsi B: Serve Frontend dari Backend

Edit `backend/server.js` untuk serve frontend files:

```javascript
const path = require('path');
const express = require('express');
const app = express();

// Serve static files dari root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve file HTML untuk spa routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ... rest of your API routes ...
```

---

## Langkah 5: Konfigurasi Environment Variables

### 5.1 Set Environment Variables di Railway

1. Di Railway Dashboard, buka Backend service
2. Klik tab **"Variables"**
3. Tambah variable satu per satu:

```
NODE_ENV = production
PORT = 3000
DB_HOST = [dari MySQL connection info]
DB_USER = [dari MySQL connection info]
DB_PASSWORD = [dari MySQL connection info]
DB_NAME = perpustakaan
JWT_SECRET = [buat random secret, misal: your-super-secret-key-12345]
CORS_ORIGIN = https://your-frontend-url.railway.app
```

### 5.2 Mengambil Database Credentials dari Railway

1. Buka tab MySQL service
2. Klik **"Connect"**
3. Lihat bagian **"Variables"**
4. Copy nilai untuk:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

5. Sesuaikan dengan nama variable yang digunakan di code

### 5.3 Update Backend Code (Opsional)

Jika diperlukan, update `backend/config.js`:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'perpustakaan',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  maxIdle: 10
});

module.exports = pool;
```

---

## Langkah 6: Testing

### 6.1 Test Backend Health Check

1. Cari URL service di Railway Dashboard
2. Buka: `https://your-backend-url.railway.app/api/health`
3. Harusnya response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 6.2 Test Database Connection

URL endpoint: `https://your-backend-url.railway.app/api/user/login`

Coba login dengan user admin:
```bash
curl -X POST https://your-backend-url.railway.app/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@perpustakaan.com","password":"admin123"}'
```

### 6.3 Test Frontend

Update URL API di frontend:

File: `api.js`
```javascript
const API_URL = 'https://your-backend-url.railway.app/api';
// Ganti 'your-backend-url' dengan URL yang digenerate Railway
```

---

## Troubleshooting

### ❌ Error: "Cannot find module"

**Solusi:**
```bash
# Di local
rm -rf node_modules
npm install
git add .
git commit -m "Fix dependencies"
git push
```

### ❌ Error: "Database connection failed"

**Solusi:**
1. Verifikasi credentials di Railway Variables tab
2. Pastikan MySQL service di-add ke project
3. Check database name di `MYSQLDATABASE` variable
4. Pastikan schema sudah di-import

### ❌ Error: 502 Bad Gateway

**Solusi:**
1. Check logs di Railway → Deployments → View Logs
2. Pastikan PORT variable set
3. Restart deployment

### ❌ CORS Error di Frontend

**Solusi:**
Update `CORS_ORIGIN` di backend variables:
```
CORS_ORIGIN=https://your-frontend-url.railway.app
```

Atau update di `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### ❌ Deployment Gagal

**Solusi:**
1. Check "Build Logs" di Railway
2. Pastikan `package.json` ada di root `backend/` folder
3. Pastikan `Procfile` atau `railway.json` configured
4. Check Node.js version compatibility

---

## Informasi Penting

### Database Backup
Railway memiliki backup otomatis. Untuk backup manual:

```bash
# Export dari Railway MySQL
mysqldump -h your-host -u your-user -p your-database > backup.sql
```

### Monitoring

1. Di Railway Dashboard, lihat metrics:
   - CPU usage
   - Memory usage
   - Request count
   - Response time

2. Setup alerts (opsional):
   - Railway → Settings → Alerts

### Environment Variables Aman

JANGAN commit `.env` ke GitHub!
Selalu gunakan:
```
.env (local only)
.env.example (untuk template)
```

Pastikan `.gitignore` includes:
```
.env
node_modules/
*.log
```

---

## Useful Links

- 📖 Railway Docs: https://docs.railway.app
- 🔐 MySQL Security: https://dev.mysql.com/doc/
- 🚀 Deployment Best Practices: https://railway.app/blog
- 📊 Monitoring Guide: https://docs.railway.app/deploy/monitoring

---

## Support

Jika ada masalah:
1. Check Railway docs
2. Check build logs di Railway
3. Join Railway community di Discord
4. Post di Railway discussions

---

**Last Updated:** January 2026
**Status:** Ready for Production

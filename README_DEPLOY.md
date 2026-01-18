# 🚀 PANDUAN DEPLOY DI RAILWAY - RINGKASAN CEPAT

Panduan lengkap untuk deploy aplikasi Perpustakaan ke Railway dalam bahasa Indonesia.

---

## 📚 Dokumentasi yang Tersedia

Saya sudah membuat 8 dokumentasi lengkap untuk Anda:

| File | Deskripsi |
|------|-----------|
| **RAILWAY_QUICK_REF.md** | ⭐ Mulai dari sini! Referensi cepat |
| **QUICK_DEPLOY.md** | 5 langkah deploy dalam 5 menit |
| **DEPLOY_RAILWAY.md** | Panduan lengkap 60+ KB |
| **DATABASE_SETUP.md** | Setup database MySQL di Railway |
| **FRONTEND_DEPLOYMENT.md** | Deploy frontend (HTML/CSS/JS) |
| **PRE_DEPLOYMENT_CHECKLIST.md** | Checklist sebelum deploy |
| **TROUBLESHOOTING.md** | Solusi masalah umum |
| **deployment-checklist.sh** | Script untuk verifikasi |

---

## 🎯 START HERE - 5 LANGKAH DEPLOY

### LANGKAH 1: Siapkan GitHub
```bash
cd c:\pribadi\iso\perpustakaan-appv1
git add -A
git commit -m "Ready for Railway deployment"
git push origin main
```

### LANGKAH 2: Buat Project Railway
1. Buka https://railway.app
2. Login dengan GitHub
3. Klik "Create New Project"
4. Pilih "Deploy from GitHub Repo"
5. Pilih repository `perpustakaan-appv1`
6. Klik "Deploy"

**Rails akan:**
- Download code dari GitHub
- Install dependencies (npm)
- Mulai backend service

### LANGKAH 3: Tambah Database MySQL
1. Di Railway Dashboard
2. Klik "+ New"
3. Pilih "Database" → "MySQL"
4. Tunggu ~2 menit hingga ready
5. Copy credentials dari tab "Connect"

**Catat informasi berikut:**
```
MYSQLHOST = (hostname dari Railway)
MYSQLUSER = (username)
MYSQLPASSWORD = (password)
MYSQLDATABASE = railway
```

### LANGKAH 4: Set Environment Variables
1. Buka Backend Service di Railway Dashboard
2. Klik tab "Variables"
3. Tambahkan variables berikut:

```
NODE_ENV = production
PORT = 3000
MYSQLHOST = [dari step 3]
MYSQLUSER = [dari step 3]
MYSQLPASSWORD = [dari step 3]
MYSQLDATABASE = railway
JWT_SECRET = [buat random string panjang, contoh: my-super-secret-key-12345678]
CORS_ORIGIN = https://[railway-backend-url].railway.app
```

**Cara mendapatkan railway-backend-url:**
- Railway Dashboard → Backend Service
- Tab "Deployments"
- Lihat "Service URL" (contoh: `perpustakaan-xyz.railway.app`)

### LANGKAH 5: Import Database
Ada 3 cara:

**CARA A: Railway CLI (Termudah)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Connect ke project
railway link

# Connect ke MySQL
railway connect --service mysql

# Import database
mysql -h $(railway variables | grep MYSQLHOST) \
       -u $(railway variables | grep MYSQLUSER) \
       -p$(railway variables | grep MYSQLPASSWORD) \
       railroad < backend/database.sql
```

**CARA B: MySQL Workbench (GUI)**
1. Buka MySQL Workbench
2. Create new connection dengan credentials dari Railway
3. File → Open SQL Script → `backend/database.sql`
4. Execute script

**CARA C: phpMyAdmin (Browser)**
- Railways kadang provide phpMyAdmin
- Login dengan credentials
- Import file `backend/database.sql`

---

## ✅ Verifikasi Deployment

### Test Backend API
```bash
curl https://[railway-backend-url].railway.app/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Test Database Connection
```bash
railway connect --service mysql
SHOW TABLES;
SELECT * FROM user;
```

### Test Login API
```bash
curl -X POST https://[railway-backend-url].railway.app/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@perpustakaan.com","password":"admin123"}'
```

---

## 🌐 Deploy Frontend (Optional)

Frontend bisa di-deploy terpisah atau langsung serve dari backend.

### OPSI A: Serve dari Backend (Paling Mudah)
- Backend sudah configured untuk serve static files
- HTML/CSS/JS akan di-serve otomatis
- Frontend akan accessible di: `https://[railway-backend-url].railway.app`

**Yang perlu diupdate:**
- File: `api.js` (baris 6)
- Ganti: `const API_URL = 'http://localhost:3000/api';`
- Jadi: `const API_URL = 'https://[railway-backend-url].railway.app/api';`

### OPSI B: Deploy ke Vercel (Recommended)
1. Buka https://vercel.com
2. "New Project" → Import `perpustakaan-appv1` dari GitHub
3. Vercel akan auto-deploy
4. Update `api.js` dengan Railway backend URL

**Keuntungan:**
- Lebih cepat (global CDN)
- Terpisah dari backend
- Mudah untuk scale

### OPSI C: Deploy ke GitHub Pages (Free)
1. Push ke GitHub (sudah done!)
2. Settings → Pages → pilih `main` branch
3. Site akan published di: `https://[username].github.io/perpustakaan-appv1`
4. Update `api.js` dengan Railway backend URL

---

## 🔑 Update CORS Configuration

Setelah frontend deployed, update CORS di Railway:

1. Backend Service → Variables tab
2. Update `CORS_ORIGIN` ke frontend URL

**Contoh:**
```
CORS_ORIGIN=https://vercel-app.vercel.app
```

atau

```
CORS_ORIGIN=https://[username].github.io/perpustakaan-appv1
```

---

## 🐛 Jika Ada Error

### "Cannot connect to database"
- [ ] Check credentials di Variables
- [ ] Verify MySQL service running
- [ ] Pastikan database.sql sudah di-import

### "CORS error di frontend"
- [ ] Update `CORS_ORIGIN` di Variables
- [ ] Pastikan frontend URL benar
- [ ] Clear browser cache

### "404 Not Found untuk endpoint"
- [ ] Check routes di `backend/routes/`
- [ ] Verify API_URL di frontend benar
- [ ] Check Procfile dan start command

### "502 Bad Gateway"
- [ ] Check logs: Dashboard → Deployments → View Logs
- [ ] Verify environment variables set
- [ ] Restart deployment

**Untuk masalah lain, lihat: TROUBLESHOOTING.md**

---

## 📊 Monitoring

Setelah deploy, monitor application:

1. **Railway Dashboard:**
   - Lihat CPU, Memory, Bandwidth usage
   - Check error logs
   - Monitor deployment status

2. **Health Checks:**
   ```bash
   # Regular
   curl https://[url].railway.app/api/health
   ```

3. **Logs:**
   ```bash
   # Via Railway CLI
   railway logs
   
   # Via Dashboard
   Deployments → View Logs
   ```

---

## 💰 Biaya Railway

Railway membership:
- **Free Tier:** $5/bulan credit
- **Pro Tier:** $20/bulan

Untuk aplikasi sederhana, free tier sudah cukup!

---

## 📋 Checklist Final

Sebelum declare "Success":

- [ ] Backend running tanpa error
- [ ] Database connected
- [ ] API health check returns 200
- [ ] Login works
- [ ] All CRUD operations work
- [ ] Frontend loads dan responsive
- [ ] No CORS errors
- [ ] Database.sql sudah di-import
- [ ] Environment variables all set

---

## 🎓 Learning Resources

Setelah deploy:

- 📖 [Railway Documentation](https://docs.railway.app)
- 🐛 [Railway Discord Community](https://railway.app/chat)
- 💬 [GitHub Issues](https://github.com/your-repo/issues)
- 🔗 [Express.js Guide](https://expressjs.com)
- 🗄️ [MySQL Documentation](https://dev.mysql.com/doc)

---

## 🆘 Support

Jika stuck, cek docs dalam urutan ini:

1. **QUICK_DEPLOY.md** - Apakah semua step sudah done?
2. **RAILWAY_QUICK_REF.md** - Referensi cepat
3. **TROUBLESHOOTING.md** - Ada solution untuk error Anda?
4. **DEPLOY_RAILWAY.md** - Baca bagian yang relevan
5. **Railway Docs** - https://docs.railway.app

---

## 🎉 Sukses Deploy!

Jika sudah sampai sini dan semua berjalan lancar:

✅ Aplikasi berjalan di cloud
✅ Database tersimpan aman
✅ API accessible dari manapun
✅ Frontend responsive
✅ Siap untuk pengguna

**Selamat! 🚀**

---

## Apa Next?

Setelah deploy berhasil:

1. **Setup Custom Domain** (opsional)
   - Beli domain
   - Configure di Railway
   - Point DNS ke Railway

2. **Setup Monitoring** (opsional)
   - Railway alerts
   - Uptime monitoring
   - Error tracking

3. **Optimize Performance** (opsional)
   - Add caching
   - Compress assets
   - Optimize database queries

4. **Add CI/CD** (opsional)
   - Auto-deploy on git push
   - Run tests before deploy

5. **User Access**
   - Share aplikasi ke users
   - Monitor usage
   - Get feedback

---

**Status:** ✅ Siap Deploy ke Railway

**Estimated Time:** 30-45 menit

**Need Help?** Cek dokumentasi atau Railway Discord

---

Created: January 2026
Last Updated: January 2026

Dokumentasi lengkap ada di folder ini. Selamat ngoding! 🚀

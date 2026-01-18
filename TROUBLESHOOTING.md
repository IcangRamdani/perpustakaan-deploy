# Troubleshooting Guide - Railway Deployment

Panduan lengkap untuk mengatasi masalah yang sering terjadi saat deploy di Railway.

## 🔴 Common Issues & Solutions

---

## 1. Build Failures

### Issue: "Cannot find module 'xxx'"

**Root Cause:** Dependency tidak terinstall atau package.json error

**Solutions:**

```bash
# Local debugging
rm -rf backend/node_modules
rm backend/package-lock.json
npm install --prefix backend

# Verify package.json
cat backend/package.json
```

**Push to GitHub:**
```bash
git add -A
git commit -m "Fix dependencies"
git push
```

**Triggers new build di Railway - seharusnya berhasil**

---

### Issue: "Port 3000 already in use"

**Root Cause:** Ada process lain yang pakai port yang sama

**Solutions:**

1. Di Railway Variables, ubah PORT:
```
PORT=5000
```

2. Or update `backend/server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

---

### Issue: Build timeout atau stuck

**Solutions:**

1. Check build logs di Railway → Deployments
2. Check package.json install scripts
3. Remove unnecessary dependencies
4. Rebuild dengan Railway dashboard: Deployments → Redeploy

---

## 2. Database Connection Issues

### Issue: "Cannot connect to database"

**Symptoms:**
- 502 Bad Gateway
- "Cannot acquire connection from pool" di logs

**Solutions:**

**Step 1: Verify credentials**
```bash
# Check Railway MySQL variables
# Dashboard → MySQL service → Variables tab
# Verify: MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE
```

**Step 2: Update backend config**

File: `backend/config.js`
```javascript
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  // ... rest config
});
```

**Step 3: Check in Railway**
1. Backend service → Variables tab
2. Verify all DB_ variables set correctly
3. Rebuild deployment

**Step 4: Test connection**
```bash
# Local test
mysql -h railway-host -u root -p -D railway
```

---

### Issue: "Unknown database 'xxx'"

**Root Cause:** Database belum di-create atau nama salah

**Solutions:**

1. Check database name di Variables:
```
MYSQLDATABASE=railway
```

2. Create database if not exist:
```sql
CREATE DATABASE IF NOT EXISTS railway;
```

3. Verify koneksi ke benar database:
```bash
railway connect --service mysql
SHOW DATABASES;
```

---

### Issue: "No database tables found"

**Root Cause:** Database ada tapi tables belum di-import

**Solutions:**

1. Import database schema:
```bash
# Using Railway CLI
railway connect --service mysql < backend/database.sql

# Or manually via phpMyAdmin/Workbench
```

2. Verify tables exist:
```sql
USE railway;
SHOW TABLES;
```

3. If empty, create tables manually (see DATABASE_SETUP.md)

---

## 3. API Connection Issues

### Issue: "Failed to fetch" / CORS errors

**Symptoms:**
- Frontend error: "Access to XMLHttpRequest blocked by CORS policy"
- Logs show CORS error

**Solutions:**

**Step 1: Update frontend API URL**

File: `api.js` atau dimana API_URL didefinisikan
```javascript
// BEFORE
const API_URL = 'http://localhost:3000/api';

// AFTER
const API_URL = 'https://your-railway-backend.railway.app/api';
```

**Step 2: Update CORS di backend**

File: `backend/server.js`
```javascript
const allowedOrigins = [
  'https://your-frontend-url.railway.app',
  'https://your-other-domain.com',
  'http://localhost:3000' // untuk local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Step 3: Update Railway variables**

Backend service → Variables:
```
CORS_ORIGIN=https://your-frontend-domain.railway.app
```

**Step 4: Rebuild**
```bash
git add -A
git commit -m "Fix CORS configuration"
git push
```

---

### Issue: "404 Not Found" untuk endpoint

**Symptoms:**
- GET /api/health → 404
- POST /api/user/login → 404

**Solutions:**

1. Check routes di `backend/routes/`
2. Verify routes registered di `server.js`
3. Check typo di API URL
4. Verify port di environment

**Test locally first:**
```bash
cd backend
npm start
# Test: curl http://localhost:3000/api/health
```

---

## 4. Authentication Issues

### Issue: "Login gagal" / "Wrong password"

**Root Cause:** Database user tidak ada atau password hash error

**Solutions:**

1. Check user ada di database:
```sql
SELECT * FROM user WHERE email = 'admin@perpustakaan.com';
```

2. Reset admin password:

File: `backend/reset-admin-password.js`
```bash
cd backend
node reset-admin-password.js
```

3. Or update manually:
```sql
-- Generate hash dengan bcrypt (use online tool atau code)
UPDATE user SET password_hash = '$2a$10$...' 
WHERE email = 'admin@perpustakaan.com';
```

---

### Issue: "Invalid token" / "Token expired"

**Symptoms:**
- Login works, but subsequent requests fail
- "Unauthorized" errors

**Solutions:**

1. Check JWT_SECRET consistent:
   - Local: di `.env`
   - Railway: di Variables

2. Verify JWT configuration:
```javascript
// backend/routes/user.js
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

3. Update `CORS_ORIGIN` dan `JWT_SECRET` di Railway

---

## 5. Performance Issues

### Issue: "Slow response times" / Timeout

**Symptoms:**
- API responses > 5 seconds
- Frequent timeouts
- "Connection pool exhausted" errors

**Solutions:**

**Step 1: Check database indexes**
```sql
SHOW INDEX FROM buku;
SHOW INDEX FROM user;
SHOW INDEX FROM peminjaman;
```

**Step 2: Optimize connection pool**

File: `backend/config.js`
```javascript
const pool = mysql.createPool({
  connectionLimit: 10,  // Reduce jika memory limited
  waitForConnections: true,
  enableKeepAlive: true,
  enableTcpKeepAlive: true,
  maxIdle: 30000
});
```

**Step 3: Monitor in Railway**
- Dashboard → Metrics
- Check CPU, Memory, Database usage

**Step 4: Upgrade Railway plan jika needed**

---

### Issue: Memory leak / "Out of memory"

**Symptoms:**
- Server crashes randomly
- Railway restarts frequently

**Solutions:**

1. Check for connection leaks:
```javascript
// Ensure connections released
connection.release();
```

2. Check for event listener leaks:
```javascript
// Avoid: emitter.on() without off()
// Use: emitter.once() atau removeListener()
```

3. Monitor in Railway:
- Dashboard → Metrics
- Check memory growth over time

4. Increase Railway memory allocation

---

## 6. Deployment Issues

### Issue: "Build failed" / "Deployment cancelled"

**Solutions:**

1. Check build logs:
   - Railway → Deployments → View Logs

2. Common causes:
   - Syntax error di code
   - Missing dependencies
   - Environment variable required
   - Disk space full

3. Try redeploy:
   - Dashboard → Deployments → Redeploy

---

### Issue: "Service not starting" / Crashed

**Symptoms:**
- Status: "crashed" atau "failed"
- 502 Bad Gateway

**Solutions:**

1. Check logs:
```bash
railway logs --service backend
```

2. Test locally:
```bash
npm start
```

3. Verify environment variables set

4. Check for startup errors

---

## 7. Static Files Issues

### Issue: "HTML files not serving" / 404 untuk index.html

**Symptoms:**
- API works (/api/health OK)
- But HTML returns 404

**Solutions:**

**Option 1: Serve from backend**

Update `backend/server.js`:
```javascript
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
```

**Option 2: Deploy frontend separately**

Use Vercel, Netlify, atau GitHub Pages untuk frontend.

Update frontend API URL ke Railway backend.

---

## 8. General Troubleshooting Steps

### For ANY issue:

1. **Check Logs**
   ```bash
   railway logs
   # atau di dashboard: Deployments → View Logs
   ```

2. **Check Variables**
   - Dashboard → Backend Service → Variables
   - Verify semua required variables set

3. **Check Database**
   ```bash
   railway connect --service mysql
   SELECT version();
   ```

4. **Redeploy**
   ```bash
   git push origin main
   # Railway auto-redeploy
   
   # Or manual redeploy di dashboard
   ```

5. **Check Health**
   ```bash
   curl https://your-backend.railway.app/api/health
   ```

6. **Local Testing**
   ```bash
   # Clone fresh, test locally
   npm install --prefix backend
   cd backend && npm start
   ```

---

## 📞 Getting Help

### Useful Links

- 📖 Railway Docs: https://docs.railway.app
- 🐛 Railway Discord: https://railway.app/chat
- 📚 GitHub Issues: [Your repo issues]
- 💬 Stack Overflow: tag [railway]

### Debugging Best Practices

1. **Always check logs first**
2. **Test locally before pushing**
3. **Use console.log strategically**
4. **Monitor Railway metrics**
5. **Keep deployment history clean**

---

## ✅ Quick Checklist

Sebelum contact support:

- [ ] Checked Railway logs
- [ ] Verified environment variables
- [ ] Tested database connection
- [ ] Verified API endpoints
- [ ] Checked CORS configuration
- [ ] Tested locally
- [ ] Searched existing issues
- [ ] Provided detailed error messages

---

**Last Updated:** January 2026

Untuk issue yang tidak tercakup, baca:
- DEPLOY_RAILWAY.md (panduan lengkap)
- QUICK_DEPLOY.md (setup cepat)
- DATABASE_SETUP.md (database configuration)

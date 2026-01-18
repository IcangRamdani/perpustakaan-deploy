# 🔧 Complete Troubleshooting Guide - Perpustakaan App

## ✅ Fixes Applied

### 1. **CORS Configuration Improved** (Backend)
- ✅ Enhanced CORS middleware dengan multiple allowed origins
- ✅ Added explicit preflight OPTIONS handler
- ✅ Added security headers untuk cross-origin requests
- ✅ Support untuk both environment variable dan hardcoded origins

### 2. **Admin User Auto-Initialization** (Backend)
- ✅ Automatic admin user creation on first startup
- ✅ Default: username=`admin`, password=`admin123`
- ✅ Only creates if doesn't exist

### 3. **API URLs Updated** (Frontend)
- ✅ `index.html` → Production URL
- ✅ `admin-login-bersih.html` → Production URL
- ✅ `admin-dashboard.html` → Production URL
- ✅ `register.html` → Production URL

### 4. **Diagnostic Endpoints Added** (Backend)
- ✅ `/api/health` - Basic health check
- ✅ `/api/status` - Detailed status with DB info

---

## 🧪 Testing Checklist

### Test 1: Backend Server Status
```bash
# Check if backend is running
curl https://perpustakaan-deploy-production.up.railway.app/api/health
```
Expected Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Test 2: Detailed Status Check
```bash
# Check database and admin status
curl https://perpustakaan-deploy-production.up.railway.app/api/status
```
Expected Response:
```json
{
  "status": "OK",
  "database": "Connected",
  "totalUsers": 1,
  "adminExists": true,
  "environment": "production",
  "corsOrigins": [...]
}
```

### Test 3: Admin Login
```bash
# Test admin login endpoint
curl -X POST https://perpustakaan-deploy-production.up.railway.app/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```
Expected Response:
```json
{
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "nama": "Administrator",
    "username": "admin",
    "role": "admin"
  }
}
```

### Test 4: User Registration
```bash
# Test registration endpoint
curl -X POST https://perpustakaan-deploy-production.up.railway.app/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "nama":"Test User",
    "nim":"123456",
    "username":"testuser",
    "password":"test123"
  }'
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "CORS policy error"
**Symptom:** Browser console shows CORS error
```
Access to fetch has been blocked by CORS policy
```

**Solution:**
1. Ensure Railway backend is running
2. Check if preflight OPTIONS requests get 200 response
3. Verify environment variables are set:
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://perpustakaan-frontend-production.up.railway.app`

**Debug:**
Open DevTools (F12) → Network tab → Check OPTIONS request headers

### Issue 2: "Username tidak ditemukan / User doesn't exist"
**Symptom:** Admin login fails with "Username tidak ditemukan"
```
error: "Username tidak ditemukan"
```

**Solution:**
1. Check if admin user exists in database:
   ```sql
   SELECT * FROM users WHERE username='admin';
   ```
2. If not found, manually create:
   ```bash
   # SSH into Railway container or use database client
   mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME
   ```
   Then run:
   ```sql
   INSERT INTO users (nama, username, password, role, nim) 
   VALUES ('Administrator', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36MMlaIm', 'admin', NULL);
   ```

### Issue 3: "Koneksi server gagal / Connection Failed"
**Symptom:** All requests fail with connection error
```
Koneksi server gagal
TypeError: Failed to fetch
```

**Solution:**
1. Check backend is deployed and running on Railway
2. Verify backend URL in frontend is correct:
   - Should be: `https://perpustakaan-deploy-production.up.railway.app/api`
   - NOT `http://` (must be HTTPS on Railway)
3. Check Railway logs for backend errors
4. Ensure database is connected

### Issue 4: "Database connection failed"
**Symptom:** Backend logs show database error
```
❌ Database connection failed
```

**Solution:**
1. Check Railway MySQL database is running
2. Verify environment variables:
   - `MYSQLHOST` or `DB_HOST`
   - `MYSQLUSER` or `DB_USER`
   - `MYSQLPASSWORD` or `DB_PASSWORD`
   - `MYSQLDATABASE` or `DB_NAME`
3. Check database schema exists:
   ```sql
   SHOW TABLES FROM perpustakaan;
   ```

---

## 🚀 Environment Variables Setup (Railway)

Go to Railway → Project Settings → Environment Variables

Add these variables:

```
NODE_ENV=production
DB_HOST=your-railway-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=perpustakaan
PORT=3000
CORS_ORIGIN=https://perpustakaan-frontend-production.up.railway.app
FRONTEND_URL=https://perpustakaan-frontend-production.up.railway.app
```

---

## 📊 Verifying Fixes

### From Browser Console (While logged in):
```javascript
// Check if API URL is correct
console.log(API_URL);
// Should output: https://perpustakaan-deploy-production.up.railway.app/api

// Test fetch to health endpoint
fetch('https://perpustakaan-deploy-production.up.railway.app/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend OK:', d))
  .catch(e => console.error('❌ Backend Error:', e))
```

### From Network Tab (DevTools):
1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Look for login POST request
5. Check Response Headers for:
   ```
   Access-Control-Allow-Origin: https://perpustakaan-frontend-production.up.railway.app
   Access-Control-Allow-Methods: GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS
   Access-Control-Allow-Credentials: true
   ```

---

## 🔄 Re-deployment Checklist

After fixing environment variables on Railway:

- [ ] Commit changes to git
- [ ] Push to GitHub
- [ ] Railway should auto-deploy
- [ ] Check Railway deployment status
- [ ] Check backend logs in Railway
- [ ] Test health endpoint
- [ ] Test login in frontend

---

## 📝 Files Modified

### Backend (`backend/`)
- ✅ `server.js` - Enhanced CORS, admin init, diagnostic endpoints
- ✅ `diagnose.js` - New diagnostic script
- ✅ `test-all-endpoints.js` - New test script

### Frontend (`perpustakaan-frontend/`)
- ✅ `index.html` - Updated API_URL
- ✅ `admin-login-bersih.html` - Updated API_URL
- ✅ `admin-dashboard.html` - Updated API_URL
- ✅ `register.html` - Updated API_URL

---

## 🆘 Still Having Issues?

1. **Check Railway Logs:**
   - Go to Railway → Backend Project → Logs
   - Look for `✓ CORS allowed origins:` message
   - Look for `✅ Admin user` messages

2. **Run Diagnostic:**
   ```bash
   npm run diagnose
   # or
   node backend/diagnose.js
   ```

3. **Test Endpoints Manually:**
   - Use Postman or curl
   - Test: `/api/health`
   - Test: `/api/status`
   - Test: `/api/user/login` (with credentials)

4. **Check Frontend Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Try login and check errors

---

**Last Updated:** January 18, 2026

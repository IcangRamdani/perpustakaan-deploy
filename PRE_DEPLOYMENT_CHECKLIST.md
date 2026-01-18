# Pre-Deployment Checklist ✅

Sebelum deploy ke Railway, pastikan semua checklist di bawah sudah completed.

## 📋 Code Preparation

### Repository Setup
- [ ] Code sudah di GitHub
- [ ] .gitignore created dan configure properly
- [ ] No secrets/credentials di code
- [ ] README.md ada dan informative
- [ ] License file ada (opsional)

### Backend Setup
- [ ] `backend/package.json` sudah ada
- [ ] Dependencies correct di package.json:
  - [ ] express
  - [ ] cors
  - [ ] dotenv
  - [ ] mysql2
  - [ ] jsonwebtoken
  - [ ] bcryptjs
- [ ] `backend/server.js` configured untuk production
- [ ] `backend/config.js` uses environment variables
- [ ] `backend/env-config.js` sudah ada
- [ ] All routes properly implemented

### Frontend Setup
- [ ] HTML files di root directory
- [ ] CSS file sudah linked properly
- [ ] `api.js` updated dengan correct API_URL
- [ ] Assets folder structure correct
- [ ] No hardcoded localhost references

### Environment Configuration
- [ ] `.env.example` created dan documented
- [ ] `Procfile` created dengan correct start command
- [ ] `railway.json` created (opsional tapi recommended)
- [ ] `.gitignore` includes `.env`
- [ ] No `.env` file di repository

### Database
- [ ] `database.sql` file ada
- [ ] Schema sudah correct
- [ ] Sample data ada (opsional)
- [ ] No production data di backup

---

## 🔧 Code Quality

### Performance
- [ ] No infinite loops
- [ ] Connection pooling configured
- [ ] Indexes added di database
- [ ] No N+1 queries
- [ ] API responses reasonable speed

### Security
- [ ] No SQL injection vulnerabilities
- [ ] Passwords hashed dengan bcrypt
- [ ] JWT tokens implemented
- [ ] CORS properly configured
- [ ] Input validation di place
- [ ] Error messages tidak leak info

### Error Handling
- [ ] Try-catch blocks di place
- [ ] Error messages user-friendly
- [ ] 404 handler implemented
- [ ] 500 error handler implemented
- [ ] Database error handled gracefully

---

## 📦 Railway Specific

### Files Created
- [ ] Procfile ✅
- [ ] .env.example ✅
- [ ] railway.json ✅
- [ ] DEPLOY_RAILWAY.md ✅
- [ ] QUICK_DEPLOY.md ✅
- [ ] DATABASE_SETUP.md ✅
- [ ] TROUBLESHOOTING.md ✅

### Configuration
- [ ] PORT environment variable used
- [ ] DATABASE credentials dari environment
- [ ] JWT_SECRET dari environment
- [ ] CORS_ORIGIN dari environment
- [ ] NODE_ENV set correctly

### Build Requirements
- [ ] Node.js version compatible (14+)
- [ ] package.json di backend folder
- [ ] No system dependencies yang kompleks
- [ ] Installation script jangan terlalu lama
- [ ] Start command di Procfile

---

## 🧪 Testing

### Local Testing
- [ ] `npm start` di backend works
- [ ] All API endpoints accessible
- [ ] Database connections working
- [ ] Authentication/login working
- [ ] Frontend displays correctly
- [ ] No console errors

### API Testing
- [ ] GET /api/health → 200
- [ ] GET /api/buku → returns books
- [ ] POST /api/user/login → works
- [ ] Protected endpoints require token
- [ ] Invalid requests handled
- [ ] CORS headers present

### Frontend Testing
- [ ] Page loads completely
- [ ] API calls work
- [ ] Forms submit correctly
- [ ] Authentication flow works
- [ ] No hardcoded URLs
- [ ] Responsive design (opsional)

---

## 📝 Documentation

### README
- [ ] Project overview
- [ ] Tech stack listed
- [ ] Local setup instructions
- [ ] API documentation link
- [ ] Deployment instructions

### Deployment Docs
- [ ] DEPLOY_RAILWAY.md complete
- [ ] QUICK_DEPLOY.md simple and clear
- [ ] DATABASE_SETUP.md covers all methods
- [ ] TROUBLESHOOTING.md covers common issues

### Code Comments
- [ ] Complex logic documented
- [ ] API endpoints have comments
- [ ] Environment variables documented
- [ ] Database schema documented (dalam DATABASE_SETUP.md)

---

## 🚀 Deployment Steps

### Step 1: Final Git Push
```bash
# [ ] Verify no uncommitted changes
git status

# [ ] Add all files
git add -A

# [ ] Commit
git commit -m "Ready for Railway deployment"

# [ ] Push
git push origin main
```

### Step 2: Railway Setup
- [ ] Railway project created
- [ ] GitHub connected
- [ ] Backend service added
- [ ] MySQL database added

### Step 3: Environment Variables
- [ ] DB_HOST set (dari MySQL)
- [ ] DB_USER set
- [ ] DB_PASSWORD set (dari MySQL)
- [ ] DB_NAME set (default: railway)
- [ ] JWT_SECRET set (strong random string)
- [ ] CORS_ORIGIN set
- [ ] NODE_ENV set to "production"
- [ ] PORT set to 3000

### Step 4: Database Import
- [ ] Database schema imported
- [ ] Tables verified
- [ ] Admin user created
- [ ] Sample data added (opsional)

### Step 5: Testing
- [ ] Build completed successfully
- [ ] No deployment errors
- [ ] Health check passes (GET /api/health)
- [ ] Database connection works
- [ ] API endpoints accessible
- [ ] Frontend loads
- [ ] Login works

---

## ⚠️ Critical Points

### DO:
- ✅ Use environment variables untuk semua secrets
- ✅ Test locally sebelum push
- ✅ Monitor logs di Railway
- ✅ Keep backups dari database
- ✅ Use strong passwords
- ✅ Keep dependencies updated
- ✅ Document your setup

### DON'T:
- ❌ Commit .env file
- ❌ Hardcode credentials
- ❌ Use localhost di production
- ❌ Trust user input without validation
- ❌ Store sensitive data di frontend
- ❌ Use weak passwords
- ❌ Deploy tanpa testing

---

## 📊 Verification

### Services Running
```bash
# Check backend
curl https://your-backend.railway.app/api/health

# Check database
# Via Railway connect atau GUI
SHOW TABLES;

# Check all variables set
# Via Railway dashboard Variables tab
```

### Expected Responses
```bash
# Health check
{"status":"OK","message":"Server is running"}

# Login success
{"token":"jwt-token-here","user":{...}}

# Buku list
[{"id":1,"judul":"...","penulis":"..."}]
```

---

## 🎯 Success Criteria

Deployment considered successful when:

- ✅ All services running tanpa error
- ✅ API health check returns 200
- ✅ Database connections established
- ✅ Authentication/login working
- ✅ All CRUD operations functional
- ✅ Frontend accessible dan responsive
- ✅ No critical errors di logs
- ✅ Performance acceptable

---

## 📞 Support

Jika ada yang error, lihat:
1. TROUBLESHOOTING.md
2. Railway logs (Dashboard → Deployments)
3. Database status (Dashboard → MySQL)
4. Environment variables (Dashboard → Variables)

---

**Checklist Status:** Ready when ALL items checked ✅

**Estimated Time:** 30 minutes untuk lengkap checklist

**Last Updated:** January 2026

# Railway Deployment - Quick Reference

## 🚀 Fastest Deploy Path (5 Steps)

```bash
# 1. Prepare repository
git add -A && git commit -m "Deploy ready" && git push

# 2. Railway create project
# Go to https://railway.app → Create New → GitHub

# 3. Add MySQL
# Railway Dashboard → + New → MySQL

# 4. Set variables
# Backend service → Variables tab → Paste these:
NODE_ENV=production
PORT=3000
MYSQLHOST=[from MySQL]
MYSQLUSER=[from MySQL]
MYSQLPASSWORD=[from MySQL]
MYSQLDATABASE=railway
JWT_SECRET=random-strong-string-here
CORS_ORIGIN=https://your-railway-url.railway.app

# 5. Import database
# Via MySQL Workbench or Railway CLI:
mysql -h host -u user -p database < backend/database.sql
```

## Files Created ✅

- ✅ `Procfile` - Start command
- ✅ `railway.json` - Configuration
- ✅ `.env.example` - Example variables
- ✅ `.gitignore` - Hide secrets
- ✅ `DEPLOY_RAILWAY.md` - Full guide (60+ KB)
- ✅ `QUICK_DEPLOY.md` - 5-minute setup
- ✅ `DATABASE_SETUP.md` - DB configuration
- ✅ `TROUBLESHOOTING.md` - Problem solving
- ✅ `PRE_DEPLOYMENT_CHECKLIST.md` - Before deploy

## Code Updates ✅

- ✅ `backend/server.js` - Updated CORS, static files
- ✅ `backend/config.js` - Support Railway MySQL env vars
- ✅ `backend/env-config.js` - Environment configuration

## Testing API

```bash
# Health check
curl https://your-railway-url.railway.app/api/health

# Expected: {"status":"OK","message":"Server is running"}
```

## Next Steps

1. Push code to GitHub
2. Create Railway project
3. Connect GitHub repo
4. Add MySQL database
5. Set environment variables
6. Import database.sql
7. Test endpoints
8. Update frontend API_URL

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| Cannot connect to DB | Check MySQL credentials in Variables |
| 502 Bad Gateway | Check logs, verify PORT variable |
| CORS errors | Update CORS_ORIGIN variable |
| 404 endpoints | Verify API routes registered |
| Login fails | Check JWT_SECRET, admin user exists |

## Support

- 📖 Full Guide: `DEPLOY_RAILWAY.md`
- 🐛 Issues: `TROUBLESHOOTING.md`
- 🗄️ Database: `DATABASE_SETUP.md`
- ✅ Checklist: `PRE_DEPLOYMENT_CHECKLIST.md`

---

**Status:** Ready for Railway deployment ✈️

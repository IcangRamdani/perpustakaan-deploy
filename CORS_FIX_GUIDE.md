# CORS Error Fix Guide

## Problem
When login/fetch requests are made from the frontend to the backend API, you get:
```
CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause
The backend server was not properly handling:
1. Preflight OPTIONS requests
2. Multiple origin domains
3. Proper CORS headers in responses

## Solution Applied

### Changes Made to `backend/server.js`:

1. **Updated CORS Configuration** (Lines 17-45):
   - Now includes hardcoded list of allowed origins
   - Adds dynamic function-based origin validation
   - Includes `https://perpustakaan-frontend-production.up.railway.app` explicitly
   - Added `optionsSuccessStatus: 200` for better compatibility

2. **Added Explicit OPTIONS Handler**:
   ```javascript
   app.options('*', cors());
   ```
   - This ensures ALL preflight requests are handled correctly

## Environment Variables Required on Railway

Make sure these are set in your Railway project:

```
NODE_ENV=production
CORS_ORIGIN=https://perpustakaan-frontend-production.up.railway.app
```

Optional (already has defaults):
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=perpustakaan
JWT_SECRET=your_secret_key
```

## How to Deploy

1. Commit the changes:
   ```bash
   git add backend/server.js
   git commit -m "fix: Add proper CORS configuration"
   git push
   ```

2. Railway will auto-deploy the changes

## Testing the Fix

### From Frontend Console:
```javascript
fetch('https://perpustakaan-deploy-production.up.railway.app/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

You should see: `{status: 'OK', message: 'Server is running'}`

### From Browser Network Tab:
When attempting login:
- Look for preflight request (OPTIONS /api/user/login)
- Should see `Access-Control-Allow-Origin: https://perpustakaan-frontend-production.up.railway.app`
- Main POST request should succeed after that

## What to Check if Still Failing

1. **Check Railway backend logs**:
   - Look for: `✓ CORS allowed origins:` message
   - Should list your frontend URL

2. **Test backend health**:
   - Visit: `https://perpustakaan-deploy-production.up.railway.app/api/health`
   - Should return JSON (not CORS error)

3. **Check if backend is running**:
   - Look at Railway deployment status
   - Check recent logs for errors

4. **Verify frontend URL**:
   - Make sure `https://perpustakaan-frontend-production.up.railway.app` is exact
   - No trailing slashes
   - Check actual deployed URL matches the hardcoded value

## Additional Security Notes

Current configuration allows:
- ✅ `localhost` (development)
- ✅ `127.0.0.1` (development)
- ✅ `https://perpustakaan-frontend-production.up.railway.app` (production)
- ✅ Any other origins sent via `CORS_ORIGIN` env var

If you deploy frontend to a different URL, update the hardcoded origin or set via `CORS_ORIGIN` environment variable.

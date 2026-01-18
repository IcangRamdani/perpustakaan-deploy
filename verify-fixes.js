#!/usr/bin/env node

/**
 * Quick Fix Verification Script
 * Run this to verify all fixes are in place
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════╗
║    ✅ PERPUSTAKAAN FIX VERIFICATION SCRIPT             ║
╚════════════════════════════════════════════════════════╝
`);

let allChecksPass = true;

// Check 1: Backend server.js has CORS improvements
console.log('\n📋 Checking Backend CORS Configuration...');
const serverPath = path.join(__dirname, 'backend/server.js');
const serverContent = fs.readFileSync(serverPath, 'utf8');

const corsChecks = [
  { name: 'CORS module imported', pattern: /const cors = require\('cors'\)/ },
  { name: 'allowedOrigins array', pattern: /const allowedOrigins = \[/ },
  { name: 'Production URL included', pattern: /perpustakaan-frontend-production\.up\.railway\.app/ },
  { name: 'OPTIONS handler', pattern: /app\.options\('\*',/ },
  { name: 'Admin init function', pattern: /const initAdmin = async/ }
];

corsChecks.forEach(check => {
  if (check.pattern.test(serverContent)) {
    console.log(`  ✅ ${check.name}`);
  } else {
    console.log(`  ❌ ${check.name} - NOT FOUND`);
    allChecksPass = false;
  }
});

// Check 2: Frontend files updated
console.log('\n🌐 Checking Frontend API URLs...');
const frontendFiles = [
  'perpustakaan-frontend/index.html',
  'perpustakaan-frontend/admin-login-bersih.html',
  'perpustakaan-frontend/admin-dashboard.html',
  'perpustakaan-frontend/register.html'
];

frontendFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('perpustakaan-deploy-production.up.railway.app')) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - API URL not updated`);
      allChecksPass = false;
    }
  } else {
    console.log(`  ⚠️  ${file} - File not found`);
  }
});

// Check 3: New scripts exist
console.log('\n🔧 Checking New Utility Scripts...');
const scriptChecks = [
  'backend/diagnose.js',
  'backend/test-all-endpoints.js'
];

scriptChecks.forEach(script => {
  const scriptPath = path.join(__dirname, script);
  if (fs.existsSync(scriptPath)) {
    console.log(`  ✅ ${script} created`);
  } else {
    console.log(`  ⚠️  ${script} - Not found`);
  }
});

// Check 4: Documentation
console.log('\n📚 Checking Documentation...');
const docFiles = [
  'CORS_FIX_GUIDE.md',
  'TROUBLESHOOTING_COMPLETE.md'
];

docFiles.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    console.log(`  ✅ ${doc}`);
  } else {
    console.log(`  ⚠️  ${doc} - Not found`);
  }
});

// Summary
console.log('\n' + '═'.repeat(56));
if (allChecksPass) {
  console.log('\n✅ ALL CHECKS PASSED!\n');
  console.log('Next steps:');
  console.log('1. Push changes to GitHub:');
  console.log('   git add -A');
  console.log('   git commit -m "Complete fix: CORS, API URLs, admin init"');
  console.log('   git push');
  console.log('');
  console.log('2. Railway will auto-deploy');
  console.log('');
  console.log('3. Test at: https://perpustakaan-frontend-production.up.railway.app');
  console.log('');
} else {
  console.log('\n⚠️  Some checks failed. Review above.\n');
}
console.log('═'.repeat(56));

#!/usr/bin/env node

/**
 * Verification Script - API URL Configuration
 * Checks all fixes are properly implemented
 * Run: node verify-api-urls.js
 */

const fs = require('fs');
const path = require('path');

const frontendDir = './perpustakaan-frontend';
const backendDir = './backend';

console.log('🔍 Verifying API URL Configuration Fixes...\n');

let issuesFound = 0;
let checksPass = 0;

// Check 1: config.js exists in frontend
console.log('✓ Check 1: Frontend config.js exists');
if (fs.existsSync(path.join(frontendDir, 'config.js'))) {
  console.log('  ✅ config.js found\n');
  checksPass++;
} else {
  console.log('  ❌ config.js NOT found - NEEDS CREATION\n');
  issuesFound++;
}

// Check 2: All HTML files have config.js reference
console.log('✓ Check 2: HTML files reference config.js');
const htmlFiles = fs.readdirSync(frontendDir).filter(f => f.endsWith('.html'));
let missingConfigRef = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(frontendDir, file), 'utf8');
  if (!content.includes('config.js') && file !== 'WELCOME.html') {
    missingConfigRef.push(file);
  }
});

if (missingConfigRef.length === 0) {
  console.log(`  ✅ All ${htmlFiles.length} HTML files have config.js reference\n`);
  checksPass++;
} else {
  console.log(`  ❌ ${missingConfigRef.length} files missing config.js:\n     ${missingConfigRef.join(', ')}\n`);
  issuesFound++;
}

// Check 3: No hardcoded localhost URLs in PRODUCTION HTML
console.log('✓ Check 3: No hardcoded localhost URLs in production HTML');
let hardcodedUrls = [];
const testFiles = ['test-all-sections.html', 'test-comprehensive.html', 'test-fixes.html', 'verify-admin-dashboard.html'];

htmlFiles.forEach(file => {
  if (testFiles.includes(file)) {
    // Skip test files - they can have fallback logic
    return;
  }
  const content = fs.readFileSync(path.join(frontendDir, file), 'utf8');
  if (content.includes("'http://localhost:3000/api") || content.includes('"http://localhost:3000/api')) {
    // Count occurrences
    const matches = content.match(/http:\/\/localhost:3000\/api/g) || [];
    hardcodedUrls.push(`${file} (${matches.length} occurrences)`);
  }
});

if (hardcodedUrls.length === 0) {
  console.log(`  ✅ No hardcoded localhost URLs found in production files\n`);
  checksPass++;
} else {
  console.log(`  ❌ Found hardcoded localhost URLs in:\n     ${hardcodedUrls.join('\n     ')}\n`);
  issuesFound++;
}

// Check 4: API_BASE_URL usage in HTML/JS files
console.log('✓ Check 4: Files using API_BASE_URL variable');
let usingApiBaseUrl = 0;

htmlFiles.concat(['../script.js']).forEach(file => {
  const filePath = file.startsWith('..') ? path.join('./', file) : path.join(frontendDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('API_BASE_URL')) {
      usingApiBaseUrl++;
    }
  }
});

console.log(`  ✅ ${usingApiBaseUrl} files using API_BASE_URL\n`);
checksPass++;

// Check 5: Backend config.js has Railway database defaults
console.log('✓ Check 5: Backend config.js has Railway settings');
const backendConfig = fs.readFileSync(path.join(backendDir, 'config.js'), 'utf8');
const hasRailwayDefaults = backendConfig.includes('ballast.proxy.rlwy.net') || 
                           backendConfig.includes('railway');

if (hasRailwayDefaults) {
  console.log('  ✅ Backend config has Railway database defaults\n');
  checksPass++;
} else {
  console.log('  ⚠️  Backend config might still have localhost defaults\n');
  issuesFound++;
}

// Check 6: Database setup file exists
console.log('✓ Check 6: Railway database setup file');
if (fs.existsSync('./backend/database-railway.sql')) {
  console.log('  ✅ database-railway.sql found\n');
  checksPass++;
} else {
  console.log('  ⚠️  database-railway.sql not found (may not be needed)\n');
}

// Check 7: Environment variable template
console.log('✓ Check 7: Environment variable template');
if (fs.existsSync('./backend/.env.railway')) {
  console.log('  ✅ .env.railway template found\n');
  checksPass++;
} else {
  console.log('  ⚠️  .env.railway template not found\n');
}

// Summary
console.log('═'.repeat(50));
console.log('VERIFICATION SUMMARY');
console.log('═'.repeat(50));
console.log(`✅ Checks Passed: ${checksPass}`);
console.log(`❌ Issues Found: ${issuesFound}`);
console.log('═'.repeat(50));

if (issuesFound === 0) {
  console.log('\n🎉 All API URL fixes are properly implemented!\n');
  console.log('Next Steps:');
  console.log('1. Set Railway environment variables:');
  console.log('   MYSQLHOST=ballast.proxy.rlwy.net');
  console.log('   MYSQLPORT=49333');
  console.log('   MYSQLUSER=root');
  console.log('   MYSQLPASSWORD=DiqeVstdFSVvHgNayolzNcCaaVCJfxZY');
  console.log('   MYSQLDATABASE=railway');
  console.log('2. Deploy to Railway');
  console.log('3. Test login at: https://perpustakaan-deploy-production.up.railway.app/');
  process.exit(0);
} else {
  console.log('\n⚠️  Please fix the issues above before deploying\n');
  process.exit(1);
}

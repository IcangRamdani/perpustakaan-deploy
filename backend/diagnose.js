#!/usr/bin/env node

/**
 * Diagnostic dan Setup Script untuk Perpustakaan
 * Checks dan fixes semua issues
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════╗
║    🔍 PERPUSTAKAAN DIAGNOSTIC & SETUP SCRIPT           ║
║    Environment Checker & Fixer                         ║
╚════════════════════════════════════════════════════════╝
`);

// 1. Check NODE_ENV
console.log('\n📋 Checking Environment Variables...');
const env = process.env;

const requiredEnv = [
  'NODE_ENV',
  'DB_HOST',
  'DB_USER', 
  'DB_PASSWORD',
  'DB_NAME'
];

const missingEnv = [];
requiredEnv.forEach(key => {
  if (env[key]) {
    console.log(`  ✅ ${key}: ${key === 'DB_PASSWORD' ? '***' : env[key]}`);
  } else {
    console.log(`  ❌ ${key}: NOT SET`);
    missingEnv.push(key);
  }
});

if (env.CORS_ORIGIN) {
  console.log(`  ✅ CORS_ORIGIN: ${env.CORS_ORIGIN}`);
} else {
  console.log(`  ⚠️  CORS_ORIGIN: NOT SET (using defaults)`);
}

// 2. Check .env file
console.log('\n📄 Checking .env file...');
const envFilePath = path.join(__dirname, '.env');
if (fs.existsSync(envFilePath)) {
  console.log(`  ✅ .env file exists`);
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  const lines = envContent.split('\n').filter(l => l.trim());
  console.log(`     Contains ${lines.length} configuration lines`);
} else {
  console.log(`  ❌ .env file NOT found`);
  console.log(`     Create it with: NODE_ENV=production`);
}

// 3. Check dependencies
console.log('\n📦 Checking Dependencies...');
try {
  require('express');
  console.log(`  ✅ express`);
  require('cors');
  console.log(`  ✅ cors`);
  require('mysql2/promise');
  console.log(`  ✅ mysql2`);
  require('bcryptjs');
  console.log(`  ✅ bcryptjs`);
  require('jsonwebtoken');
  console.log(`  ✅ jsonwebtoken`);
} catch (e) {
  console.log(`  ❌ Missing dependencies: ${e.message}`);
}

// 4. Check routes
console.log('\n🛣️  Checking Routes...');
const routesDir = path.join(__dirname, 'routes');
const routeFiles = ['buku.js', 'user.js', 'peminjaman.js', 'denda.js'];
routeFiles.forEach(file => {
  const filePath = path.join(routesDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ routes/${file}`);
  } else {
    console.log(`  ❌ routes/${file} NOT FOUND`);
  }
});

// 5. Summary
console.log('\n' + '═'.repeat(56));
console.log('\n📊 SETUP RECOMMENDATIONS:\n');

if (missingEnv.length > 0) {
  console.log(`1. Set Missing Environment Variables:`);
  console.log(`   In Railway Project Settings, add:`);
  missingEnv.forEach(key => {
    console.log(`   - ${key}`);
  });
  console.log();
}

console.log(`2. Ensure CORS is configured:`);
console.log(`   Set CORS_ORIGIN environment variable to:`);
console.log(`   https://perpustakaan-frontend-production.up.railway.app`);
console.log();

console.log(`3. Database must have admin user:`);
console.log(`   Username: admin`);
console.log(`   Password: admin123`);
console.log();

console.log(`4. All Frontend URLs must use production domain:`);
console.log(`   https://perpustakaan-deploy-production.up.railway.app/api`);
console.log();

console.log('═'.repeat(56));
console.log('\n✨ Run: npm start\n');

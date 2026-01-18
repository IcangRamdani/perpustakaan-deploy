#!/usr/bin/env node

/**
 * Test All Endpoints
 * Runs dari Railway untuk test semua API endpoints
 */

const http = require('http');

const API_BASE = 'http://localhost:3000';

const tests = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/api/health'
  },
  {
    name: 'Register New User',
    method: 'POST',
    path: '/api/user/register',
    body: {
      nama: 'Test User ' + Date.now(),
      nim: 'TEST' + Math.floor(Math.random() * 10000),
      username: 'testuser' + Date.now(),
      password: 'testpass123'
    }
  },
  {
    name: 'Check Admin User Exists',
    method: 'GET',
    path: '/api/user/check-username?username=admin'
  },
  {
    name: 'Login as Admin',
    method: 'POST',
    path: '/api/user/login',
    body: {
      username: 'admin',
      password: 'admin123'
    }
  },
  {
    name: 'Get All Users',
    method: 'GET',
    path: '/api/user'
  },
  {
    name: 'Get All Books',
    method: 'GET',
    path: '/api/buku'
  }
];

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing All Endpoints...\n');

  for (const test of tests) {
    try {
      console.log(`📍 Testing: ${test.name}`);
      console.log(`   ${test.method} ${test.path}`);
      
      const result = await makeRequest(test.method, test.path, test.body);
      
      console.log(`   ✅ Status: ${result.status}`);
      console.log(`   Response: ${JSON.stringify(result.body).substring(0, 100)}...`);
      console.log();
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log();
    }
  }

  console.log('✅ Test complete!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

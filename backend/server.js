const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./config');
const config = require('./env-config');

// Routes
const bukuRoutes = require('./routes/buku');
const userRoutes = require('./routes/user');
const peminjamanRoutes = require('./routes/peminjaman');
const dendaRoutes = require('./routes/denda');

const app = express();

// Middleware - CORS Configuration
const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:3000',
  'https://perpustakaan-frontend-production.up.railway.app',
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('✓ CORS allowed origins:', allowedOrigins);

// CORS Options
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS request from unauthorized origin: ${origin}`);
      callback(null, true); // Allow anyway but log it
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Range'],
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 hours
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files dari root directory (untuk production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..')));
}

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize admin user on startup
const initAdmin = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id FROM users WHERE username = ? LIMIT 1', ['admin']);
    
    if (rows.length === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await connection.query(
        'INSERT INTO users (nama, username, password, role, nim) VALUES (?, ?, ?, ?, ?)',
        ['Administrator', 'admin', hashedPassword, 'admin', null]
      );
      console.log('✅ Admin user created: username=admin, password=admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
    connection.release();
  } catch (error) {
    console.warn('⚠️  Could not initialize admin user:', error.message);
  }
};

// Call init on startup
initAdmin();

// Routes
app.use('/api/buku', bukuRoutes);
app.use('/api/user', userRoutes);
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/denda', dendaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Status endpoint for debugging
app.get('/api/status', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT COUNT(*) as total FROM users');
    const [adminCheck] = await connection.query('SELECT id FROM users WHERE username = ? LIMIT 1', ['admin']);
    connection.release();
    
    res.json({
      status: 'OK',
      database: 'Connected',
      totalUsers: users[0].total,
      adminExists: adminCheck.length > 0,
      environment: process.env.NODE_ENV,
      corsOrigins: allowedOrigins
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = config.PORT;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║     🎉 PERPUSTAKAAN API SERVER RUNNING                ║
║     ✅ Server: http://localhost:${PORT}              ║
║     ✅ Database: Connected                           ║
║     ✅ Environment: ${config.NODE_ENV}               ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

module.exports = app;

// Database Configuration
const mysql = require('mysql2/promise');

// Railway uses these environment variables by default
// If using custom database credentials, set them in Railway environment
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'ballast.proxy.rlwy.net',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 49333,
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  maxIdle: 10
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully!');
    console.log(`📊 Database: ${process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway'}`);
    console.log(`🖥️  Host: ${process.env.MYSQLHOST || process.env.DB_HOST || 'ballast.proxy.rlwy.net'}`);
    connection.release();
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error.message);
    console.error('Attempting to connect with:');
    console.error(`  Host: ${process.env.MYSQLHOST || process.env.DB_HOST || 'ballast.proxy.rlwy.net'}`);
    console.error(`  Port: ${process.env.MYSQLPORT || process.env.DB_PORT || 49333}`);
    console.error(`  User: ${process.env.MYSQLUSER || process.env.DB_USER || 'root'}`);
    console.error(`  Database: ${process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway'}`);
  });

module.exports = pool;

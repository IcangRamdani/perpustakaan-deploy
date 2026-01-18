const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function resetAdminPassword() {
  const pool = mysql.createPool({
    host: 'ballast.proxy.rlwy.net',
    port: 49333,
    user: 'root',
    password: 'DiqeVstdFSVvHgNayolzNcCaaVCJfxZY',
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
  });

  try {
    const connection = await pool.getConnection();
    
    // Test password yang akan digunakan
    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    console.log('🔐 Password Reset Admin');
    console.log('========================');
    console.log(`Plain Password: ${plainPassword}`);
    console.log(`Hashed Password: ${hashedPassword}\n`);
    
    // Update password di database
    const [result] = await connection.query(
      'UPDATE users SET password = ? WHERE username = ? AND role = ?',
      [hashedPassword, 'admin', 'admin']
    );
    
    console.log(`✅ Updated ${result.affectedRows} admin user(s)\n`);
    
    // Verify dengan melakukan test login
    console.log('🧪 Testing Login...');
    const [rows] = await connection.query(
      'SELECT id, username, password, role FROM users WHERE username = ? AND role = ?',
      ['admin', 'admin']
    );
    
    if (rows.length > 0) {
      const user = rows[0];
      console.log(`Username: ${user.username}`);
      console.log(`Role: ${user.role}`);
      console.log(`ID: ${user.id}`);
      
      // Test bcrypt compare
      const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
      console.log(`\n✅ Password Match Test: ${isPasswordValid ? 'BERHASIL ✓' : 'GAGAL ✗'}`);
      
      if (isPasswordValid) {
        console.log(`\n🎉 Admin dapat login dengan:`);
        console.log(`   Username: admin`);
        console.log(`   Password: admin123`);
      } else {
        console.log(`\n❌ Password tidak match, ada masalah dengan hash`);
      }
    } else {
      console.log('❌ Admin user tidak ditemukan di database!');
    }
    
    connection.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();

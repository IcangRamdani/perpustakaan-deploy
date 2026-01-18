const bcrypt = require('bcryptjs');

// Generate hash untuk password yang berbeda
async function generatePasswords() {
  const passwords = {
    'admin123': await bcrypt.hash('admin123', 10),
    'password123': await bcrypt.hash('password123', 10),
    'admin': await bcrypt.hash('admin', 10),
    'perp2024': await bcrypt.hash('perp2024', 10),
  };

  console.log('Password Hashes:');
  console.log('================\n');
  Object.entries(passwords).forEach(([pwd, hash]) => {
    console.log(`Password: ${pwd}`);
    console.log(`Hash: ${hash}\n`);
  });
}

generatePasswords();

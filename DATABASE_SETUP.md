# Database Setup untuk Railway

Panduan setup dan import database di Railway MySQL.

## Metode 1: Menggunakan Railway CLI (Recommended)

### 1.1 Install Railway CLI

```bash
# macOS / Linux
curl -fsSL https://railway.app/install.sh | bash

# Windows (PowerShell)
iwr https://railway.app/install.ps1 -useb | iex
```

### 1.2 Login ke Railway

```bash
railway login
```

### 1.3 Connect ke Project

```bash
railway link
# Pilih project Anda
```

### 1.4 Connect ke MySQL

```bash
railway connect --service mysql
```

### 1.5 Import Database

```bash
# Dari direktori project
mysql -h $(railway variables | grep MYSQLHOST) \
       -u $(railway variables | grep MYSQLUSER) \
       -p$(railway variables | grep MYSQLPASSWORD) \
       $(railway variables | grep MYSQLDATABASE) \
       < backend/database.sql
```

---

## Metode 2: Menggunakan MySQL Workbench (GUI)

### 2.1 Setup Connection di MySQL Workbench

1. Buka MySQL Workbench
2. Klik **"+"** untuk create new connection
3. Isi data:
   - **Connection Name**: Railway Perpustakaan
   - **Hostname**: [dari Railway MySQL Connect tab]
   - **Port**: 3306
   - **Username**: [dari Railway MySQL Connect tab]
   - **Password**: Klik "Store in Vault" dan masukkan password

4. Klik **"Test Connection"**
5. Klik **"OK"**

### 2.2 Import SQL File

1. Buka connection yang baru dibuat
2. Pilih menu **"Server"** → **"Data Import"**
3. Pilih **"Import from Self-Contained File"**
4. Browse ke file: `backend/database.sql`
5. Di bawah, pilih schema target atau buat baru
6. Klik **"Start Import"**

---

## Metode 3: Menggunakan phpMyAdmin (Browser)

Railway kadang menyediakan phpMyAdmin access:

1. Di Railway Dashboard, buka MySQL service
2. Cari URL phpMyAdmin (jika tersedia)
3. Login dengan credentials dari Connect tab
4. Pilih database
5. Klik **"Import"**
6. Upload file `backend/database.sql`
7. Klik **"Go"**

---

## Metode 4: Manual SQL Queries

Jika tidak ada file backup, buat manual:

### 4.1 Create Database

```sql
CREATE DATABASE IF NOT EXISTS railway;
USE railway;
```

### 4.2 Create Tables

```sql
-- Tabel Buku
CREATE TABLE buku (
  id INT PRIMARY KEY AUTO_INCREMENT,
  judul VARCHAR(255) NOT NULL,
  penulis VARCHAR(255) NOT NULL,
  penerbit VARCHAR(255),
  isbn VARCHAR(20) UNIQUE,
  tahun_terbit INT,
  kategori VARCHAR(100),
  stok INT DEFAULT 0,
  lokasi_rak VARCHAR(50),
  status_buku ENUM('tersedia', 'rusak', 'hilang') DEFAULT 'tersedia',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel User (Members)
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  no_anggota VARCHAR(50) UNIQUE,
  tgl_lahir DATE,
  alamat TEXT,
  no_telepon VARCHAR(20),
  role ENUM('member', 'admin') DEFAULT 'member',
  status ENUM('aktif', 'nonaktif', 'suspended') DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Peminjaman
CREATE TABLE peminjaman (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  buku_id INT NOT NULL,
  tgl_pinjam DATE NOT NULL,
  tgl_kembali_rencana DATE NOT NULL,
  tgl_kembali_aktual DATE,
  status ENUM('dipinjam', 'dikembalikan', 'hilang') DEFAULT 'dipinjam',
  denda_total DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (buku_id) REFERENCES buku(id)
);

-- Tabel Denda
CREATE TABLE denda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  peminjaman_id INT NOT NULL,
  user_id INT NOT NULL,
  jumlah_hari_telat INT,
  tarif_per_hari DECIMAL(10, 2),
  total_denda DECIMAL(10, 2),
  status ENUM('belum_bayar', 'sudah_bayar', 'dihapus') DEFAULT 'belum_bayar',
  tgl_pembayaran DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (peminjaman_id) REFERENCES peminjaman(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Create indexes
CREATE INDEX idx_buku_kategori ON buku(kategori);
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_role ON user(role);
CREATE INDEX idx_peminjaman_user ON peminjaman(user_id);
CREATE INDEX idx_peminjaman_status ON peminjaman(status);
CREATE INDEX idx_denda_user ON denda(user_id);
CREATE INDEX idx_denda_status ON denda(status);
```

### 4.3 Insert Sample Data

```sql
-- Insert Admin User
INSERT INTO user (nama, email, password_hash, no_anggota, role) VALUES
('Admin Perpustakaan', 'admin@perpustakaan.com', '$2a$10$...', 'ADM001', 'admin');

-- Insert Sample Books
INSERT INTO buku (judul, penulis, penerbit, isbn, tahun_terbit, kategori, stok, status_buku) VALUES
('Database Design', 'John Smith', 'Tech Press', '978-1234567890', 2020, 'Teknologi', 5, 'tersedia'),
('Python Programming', 'Guido van Rossum', 'O Reilly', '978-0987654321', 2019, 'Teknologi', 3, 'tersedia');
```

---

## Verifikasi Database

### Check Connection

```bash
# Dari terminal, test connection
mysql -h your-host -u your-user -p your-password
```

### Verify Tables

```sql
USE railway;
SHOW TABLES;
SELECT COUNT(*) as total_buku FROM buku;
SELECT COUNT(*) as total_user FROM user;
```

---

## Troubleshooting

### ❌ Cannot connect to MySQL

**Solutions:**
1. Verify credentials dari Railway Connect tab
2. Pastikan MySQL service berjalan di Railway
3. Check firewall/network settings
4. Gunakan public host jika available

### ❌ Import fails

**Solutions:**
1. Check SQL syntax di database.sql
2. Pastikan charset compatible (UTF-8)
3. Split file menjadi smaller chunks jika too large
4. Check disk space di Railway

### ❌ Slow queries

**Solutions:**
1. Add indexes (sudah ada di schema)
2. Optimize queries di application
3. Check Railway MySQL tier
4. Monitor dengan Railway metrics

---

## Best Practices

### Security
- ✅ Use strong password untuk MySQL user
- ✅ Limit connections
- ✅ Use environment variables (jangan hardcode)
- ✅ Regular backups

### Performance
- ✅ Add appropriate indexes
- ✅ Limit query results
- ✅ Use connection pooling (sudah di code)
- ✅ Monitor slow queries

### Maintenance
- ✅ Regular backups (Railway auto-backup)
- ✅ Monitor disk usage
- ✅ Clean up old logs
- ✅ Update MySQL regularly

---

**Resources:**
- [Railway MySQL Docs](https://docs.railway.app/databases/mysql)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Database Design Best Practices](https://www.mysql.com/why-mysql/design/)

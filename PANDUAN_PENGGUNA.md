# 📚 Panduan Pengguna - Aplikasi Perpustakaan Digital

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Memulai Aplikasi](#memulai-aplikasi)
3. [Registrasi & Login](#registrasi--login)
4. [Dashboard](#dashboard)
5. [Katalog Buku](#katalog-buku)
6. [Peminjaman Buku](#peminjaman-buku)
7. [Riwayat Peminjaman](#riwayat-peminjaman)
8. [Manajemen Denda](#manajemen-denda)
9. [Laporan Perpustakaan](#laporan-perpustakaan)
10. [Notifikasi](#notifikasi)
11. [Troubleshooting](#troubleshooting)

---

## Pendahuluan

Aplikasi Perpustakaan Digital adalah sistem manajemen perpustakaan berbasis web yang memudahkan anggota perpustakaan untuk:
- Menjelajahi dan mencari koleksi buku
- Melakukan peminjaman buku
- Melacak riwayat peminjaman
- Mengelola denda keterlambatan
- Melihat laporan perpustakaan
- Menerima notifikasi

### Fitur Utama
✅ **500+ Koleksi Buku** - Akses ribuan literatur akademik
✅ **1000+ Member Aktif** - Komunitas pembelajar yang berkembang
✅ **24/7 Online Access** - Akses kapan saja, di mana saja
✅ **User-Friendly Interface** - Antarmuka yang mudah digunakan

---

## Memulai Aplikasi

### Persyaratan Sistem
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet stabil
- Resolusi layar minimal 320px (mobile-responsive)

### Mengakses Aplikasi
1. Buka browser web Anda
2. Masukkan URL aplikasi: `http://localhost:3000` atau sesuai dengan domain yang telah dikonfigurasi
3. Anda akan diarahkan ke halaman login

---

## Registrasi & Login

### Registrasi Akun Baru

#### Langkah-Langkah:
1. **Klik "Daftar Sekarang"** di halaman login
2. **Isi Form Registrasi:**
   - **Nama Lengkap**: Masukkan nama Anda dengan benar
   - **NIM/ID**: Nomor identitas akademik (misalnya: 12345678)
   - **Username**: Pilih username unik (min. 4 karakter)
   - **Password**: Buat password yang kuat (min. 6 karakter)
3. **Klik "Daftar"** untuk menyelesaikan pendaftaran
4. Anda akan diarahkan ke halaman login

> **💡 Tips Keamanan:**
> - Gunakan password yang kuat (kombinasi huruf, angka, simbol)
> - Jangan bagikan password dengan siapa pun
> - Catat username dan password Anda di tempat yang aman

### Login ke Aplikasi

#### Langkah-Langkah:
1. **Masukkan Username**: Ketikkan username yang terdaftar
2. **Masukkan Password**: Ketikkan password Anda
3. **Klik "Masuk Sekarang"** untuk login
4. Jika berhasil, Anda akan masuk ke Dashboard

#### Troubleshooting Login:
- ❌ **"Username atau password salah"** → Periksa kembali username dan password Anda
- ❌ **"Koneksi server tidak tersedia"** → Pastikan server backend sedang berjalan
- ❌ **Lupa password?** → Hubungi admin perpustakaan untuk reset password

> **⚠️ Keamanan:**
> - Selalu logout sebelum meninggalkan komputer
> - Jangan gunakan password yang mudah ditebak
> - Perbarui password secara berkala

---

## Dashboard

Dashboard adalah halaman utama yang menampilkan ringkasan aktivitas perpustakaan Anda.

### Elemen Dashboard

#### 📊 Statistik Utama
Menampilkan 4 kartu informasi penting:
- **📚 Total Buku** - Jumlah buku dalam koleksi perpustakaan
- **✅ Stok Tersedia** - Jumlah buku yang masih dapat dipinjam
- **📤 Buku Dipinjam** - Jumlah buku yang sedang Anda pinjam
- **⚠️ Denda Menunggu** - Total denda yang belum dibayar

#### 📋 Peminjaman Terakhir
Menampilkan daftar 5 peminjaman terbaru dengan informasi:
- Judul buku
- Tanggal peminjaman
- Tanggal kembali yang dijadwalkan
- Status peminjaman

#### 🏆 Buku Populer
Menampilkan buku-buku yang paling sering dipinjam:
- Judul buku
- Pengarang
- Jumlah peminjaman

#### 📈 Statistik Kategori
Grafik/tabel yang menampilkan distribusi buku berdasarkan kategori:
- Teknologi
- Fiksi
- Non-Fiksi
- Referensi
- Lainnya

#### ⚡ Aksi Cepat
Tombol pintas untuk navigasi cepat:
- 📚 **Jelajahi Katalog** - Menuju halaman katalog
- 📤 **Pinjam Buku** - Menuju form peminjaman
- 📋 **Lihat Riwayat** - Menuju riwayat peminjaman
- ⚠️ **Cek Denda** - Menuju halaman denda

### Cara Menggunakan Dashboard
1. Setiap kali login, Anda akan masuk ke dashboard
2. Periksa statistik utama untuk overview kondisi
3. Gunakan aksi cepat untuk navigasi ke fitur lain
4. Refresh halaman untuk update data terbaru

---

## Katalog Buku

Katalog adalah tempat mencari dan menjelajahi seluruh koleksi buku perpustakaan.

### Fitur Pencarian

#### 🔍 Pencarian Teks
1. **Klik kolom pencarian** di bagian atas
2. **Ketik kata kunci** (judul, pengarang, atau ISBN)
3. **Hasil pencarian** akan muncul secara otomatis
4. **Tekan Enter** atau tunggu hasil loading

**Contoh Pencarian:**
- Ketik "Python" untuk cari buku tentang Python
- Ketik "J.K. Rowling" untuk cari buku penulis tertentu
- Ketik "978-3-16-148410-0" untuk cari berdasarkan ISBN

#### 📂 Filter Kategori
1. **Pilih dropdown kategori** di sebelah pencarian
2. **Pilih kategori yang diinginkan:**
   - Semua Kategori (tampilkan semua)
   - Teknologi
   - Fiksi
   - Non-Fiksi
   - Referensi
3. **Hasil akan disaring** sesuai kategori

#### 🔄 Reset Filter
- Klik tombol **"Reset"** untuk menghapus semua filter dan pencarian

### Tampilan Buku

Setiap buku ditampilkan dalam kartu dengan informasi:
- **Sampul Buku** - Gambar cover buku
- **Judul** - Nama buku
- **Pengarang** - Nama penulis
- **ISBN** - Nomor identitas buku
- **Kategori** - Jenis kategori buku
- **Stok** - Jumlah buku tersedia
- **Rating** - Penilaian buku (jika ada)

### Cara Meminjam dari Katalog

1. **Temukan buku yang diinginkan** menggunakan pencarian/filter
2. **Klik buku** untuk membuka detail buku
3. **Baca deskripsi lengkap** tentang buku
4. **Jika ada stok (stok > 0)**, tekan tombol **"Pinjam"**
5. Anda akan diarahkan ke form peminjaman

### Statistik Katalog

Kartu statistik menampilkan:
- **📚 Total Buku** - Jumlah semua buku dalam katalog
- **✅ Stok Tersedia** - Total buku yang tersedia untuk dipinjam
- **🏆 Paling Dipinjam** - Buku yang paling sering dipinjam

### Pagination

Jika buku lebih dari jumlah yang ditampilkan per halaman:
1. **Lihat angka halaman** di bagian bawah
2. **Klik nomor halaman** untuk lanjut/kembali
3. **Next/Previous** untuk navigasi otomatis

---

## Peminjaman Buku

Fitur peminjaman memungkinkan Anda mengajukan permohonan peminjaman buku.

### Form Peminjaman

#### Langkah-Langkah Peminjaman:

1. **Pilih Buku**
   - Klik dropdown "Pilih Buku"
   - Scroll untuk mencari buku yang ingin dipinjam
   - Klik buku untuk dipilih
   - ℹ️ *Hanya buku dengan stok tersedia yang dapat dipilih*

2. **Tentukan Tanggal Pinjam**
   - Klik field "Tanggal Pinjam"
   - Pilih tanggal kapan Anda ingin mulai meminjam
   - Tanggal tidak bisa sebelum hari ini

3. **Tentukan Tanggal Kembali**
   - Klik field "Tanggal Kembali"
   - Pilih tanggal kapan Anda akan mengembalikan buku
   - Tanggal kembali harus setelah tanggal pinjam
   - ⚠️ *Keterlambatan akan dikenakan denda*

4. **Keterangan (Opsional)**
   - Masukkan catatan tambahan jika diperlukan
   - Misalnya: alasan peminjaman, penggunaan khusus, dll

5. **Ajukan Peminjaman**
   - Klik tombol **"Ajukan Peminjaman"**
   - Tunggu konfirmasi sistem
   - Peminjaman berhasil jika muncul pesan sukses

### Riwayat Peminjaman di Form

Tabel di bawah form menampilkan semua peminjaman Anda:
- **No** - Nomor urut
- **Buku** - Judul buku yang dipinjam
- **Tgl Pinjam** - Tanggal awal peminjaman
- **Tgl Kembali** - Tanggal target pengembalian
- **Status** - Kondisi peminjaman (Dipinjam/Dikembalikan)
- **Aksi** - Tombol aksi (Kembalikan/Detail)

### Mekanisme Persetujuan

- **Peminjaman Baru** → Status "Tertunda" (menunggu persetujuan admin)
- **Disetujui** → Status berubah "Dipinjam"
- **Ditolak** → Status "Ditolak" + notifikasi alasan

> **📌 Catatan Penting:**
> - Setiap peminjaman harus disetujui admin terlebih dahulu
> - Durasi peminjaman standar adalah 7-14 hari (sesuai kebijakan)
> - Maksimal 3-5 buku dapat dipinjam secara bersamaan
> - Buku harus dikembalikan tepat waktu untuk menghindari denda

---

## Riwayat Peminjaman

Halaman riwayat menampilkan semua peminjaman Anda (historis).

### Fitur Riwayat

#### Tampilan Data
Tabel dengan kolom:
- **No** - Nomor urut
- **Buku** - Judul buku yang dipinjam
- **Pengarang** - Nama penulis buku
- **Tgl Pinjam** - Tanggal awal peminjaman
- **Tgl Kembali** - Tanggal buku dikembalikan
- **Durasi** - Lama peminjaman (hari)
- **Status** - Status peminjaman (Dipinjam/Dikembalikan/Keterlambat)

#### Filter Status
Tombol filter untuk menampilkan riwayat berdasarkan:
- **Semua** - Tampilkan semua riwayat
- **Dipinjam** - Hanya peminjaman aktif
- **Dikembalikan** - Hanya yang sudah dikembalikan
- **Keterlambat** - Hanya peminjaman yang melewati deadline

#### Pencarian Riwayat
- Gunakan kolom pencarian untuk cari judul buku
- Hasil akan disaring secara real-time

### Cara Mengembalikan Buku

1. **Temukan peminjaman aktif** (status: Dipinjam)
2. **Klik tombol "Kembalikan Buku"** di kolom Aksi
3. **Konfirmasi pengembalian** - Buku akan dikembalikan
4. **Status berubah** menjadi "Dikembalikan"
5. **Denda dihitung** jika ada keterlambatan

### Interpretasi Status

| Status | Arti | Aksi |
|--------|------|------|
| 📤 Dipinjam | Buku sedang Anda pinjam | Kembalikan Buku |
| ✅ Dikembalikan | Buku sudah dikembalikan | Lihat Detail |
| ⏰ Keterlambat | Pengembalian melewati deadline | Bayar Denda |
| ⏳ Tertunda | Menunggu persetujuan admin | Tunggu |
| ❌ Ditolak | Permohonan ditolak | Ajukan Lagi |

---

## Manajemen Denda

Halaman denda menampilkan daftar denda keterlambatan Anda.

### Apa itu Denda?

Denda adalah biaya yang dikenakan jika Anda mengembalikan buku melewati batas waktu yang ditentukan.

**Perhitungan Denda:**
```
Denda = Jumlah Hari Terlambat × Tarif per Hari
Contoh: 5 hari terlambat × Rp 5.000/hari = Rp 25.000
```

### Tampilan Denda

#### Statistik Denda
Kartu-kartu yang menampilkan:
- **⚠️ Denda Belum Dibayar** - Jumlah denda yang masih menunggu
- **✅ Denda Sudah Dibayar** - Jumlah denda yang sudah lunas
- **💰 Total Denda Belum Bayar** - Total rupiah denda yang harus dibayar

#### Tabel Denda Detail
Menampilkan daftar denda dengan kolom:
- **ID Denda** - Nomor identitas denda
- **Buku** - Judul buku yang terlambat
- **Peminjaman ID** - Nomor peminjaman terkait
- **Hari Terlambat** - Berapa hari keterlambatan
- **Tarif/Hari** - Biaya denda per hari
- **Nominal Denda** - Total denda yang harus dibayar
- **Status** - Belum Dibayar / Sudah Dibayar
- **Aksi** - Tombol pembayaran/detail

### Pembayaran Denda

#### Langkah-Langkah Pembayaran:

1. **Lihat daftar denda** yang belum dibayar
2. **Klik tombol "Bayar Denda"** pada denda yang ingin dibayar
3. **Konfirmasi pembayaran** dengan informasi:
   - Nominal denda
   - Metode pembayaran
   - Tanggal pembayaran
4. **Proses pembayaran** sesuai instruksi
5. **Status berubah** menjadi "Sudah Dibayar"

#### Metode Pembayaran
- 💳 Transfer Bank
- 💵 Tunai ke Kasir
- 📱 E-Wallet (jika tersedia)
- 🏪 Pembayaran di Loket Perpustakaan

> **💡 Tips:**
> - Bayar denda segera untuk menghindari akumulasi
> - Tanyakan kepada admin jika ada negosiasi/keringanan
> - Simpan bukti pembayaran

### Kebijakan Denda

- **Tarif Standard:** Rp 5.000 - Rp 10.000 per hari
- **Maksimal Denda:** Sesuai kebijakan perpustakaan
- **Grace Period:** Biasanya tidak ada (denda mulai H+1)
- **Penghapusan:** Tidak ada, kecuali persetujuan khusus admin

---

## Laporan Perpustakaan

Halaman laporan menampilkan statistik dan analisis perpustakaan secara menyeluruh.

### Statistik Utama

Empat kartu statistik menampilkan:
- **📚 Total Buku** - Jumlah semua buku dalam koleksi
- **👥 Total Member** - Jumlah anggota perpustakaan
- **📤 Total Peminjaman** - Total peminjaman sepanjang waktu
- **💰 Total Denda** - Akumulasi denda yang ada

### Laporan Peminjaman

#### Ringkasan Peminjaman
- **📋 Peminjaman Aktif** - Buku yang sedang dipinjam
- **✅ Sudah Dikembalikan** - Buku yang sudah kembali
- **🏆 Buku Paling Dipinjam** - Judul buku paling populer

#### Tabel Detail Peminjaman
Menampilkan setiap transaksi peminjaman:
- **Buku ID** - ID buku dalam sistem
- **User ID** - ID anggota yang meminjam
- **Tgl Pinjam** - Tanggal awal peminjaman
- **Tgl Kembali** - Tanggal pengembalian
- **Status** - Status peminjaman (Dipinjam/Dikembalikan)

### Laporan Denda

#### Ringkasan Denda
- **⚠️ Denda Belum Dibayar** - Jumlah denda yang outstanding
- **✅ Denda Sudah Dibayar** - Jumlah denda yang terselesaikan
- **💰 Total Denda Belum Bayar** - Total nominal denda outstanding

#### Tabel Detail Denda
- **ID** - Nomor denda
- **Peminjaman ID** - Terkait peminjaman mana
- **Nominal** - Jumlah denda
- **Status** - Belum/Sudah Dibayar

### Laporan Kategori Buku

#### Distribusi Kategori
Menampilkan grafik/tabel:
- **Kategori** - Jenis kategori buku
- **Jumlah** - Berapa buku di kategori tersebut
- **Persentase** - Proporsi dari total

Contoh:
```
Teknologi     : 150 buku (30%)
Non-Fiksi     : 100 buku (20%)
Fiksi         : 150 buku (30%)
Referensi     : 100 buku (20%)
```

### Cara Menggunakan Laporan

1. **Periksa statistik utama** untuk overview
2. **Analisis laporan peminjaman** untuk trend
3. **Identifikasi buku populer** untuk koleksi baru
4. **Monitor denda outstanding** untuk penagihan
5. **Evaluasi distribusi kategori** untuk keseimbangan koleksi

> **📊 Kegunaan Laporan:**
> - Bahan evaluasi kinerja perpustakaan
> - Dasar pengambilan keputusan koleksi
> - Identifikasi buku yang kurang populer
> - Monitoring kesehatan finansial (denda)
> - Perencanaan pengadaan buku baru

---

## Notifikasi

Sistem notifikasi memberitahu Anda tentang event penting perpustakaan.

### Jenis Notifikasi

#### 📬 Notifikasi Peminjaman
- **Permohonan Disetujui** - Peminjaman Anda telah disetujui
- **Permohonan Ditolak** - Alasan penolakan peminjaman
- **Batas Waktu Dekat** - Reminder 1-2 hari sebelum deadline
- **Buku Terlambat** - Notifikasi keterlambatan pengembalian

#### 💰 Notifikasi Denda
- **Denda Terbuat** - Denda baru dibuat
- **Reminder Pembayaran** - Pengingat pembayaran denda
- **Pembayaran Diterima** - Denda berhasil dibayar

#### 🎯 Notifikasi Umum
- **Berita & Pengumuman** - Dari admin perpustakaan
- **Promo & Kegiatan** - Event perpustakaan
- **Pemeliharaan Sistem** - Schedule maintenance

### Mengakses Notifikasi

1. **Klik menu Notifikasi** di navbar
2. **Lihat daftar notifikasi** yang masuk
3. **Klik notifikasi** untuk detail lebih lengkap
4. **Tandai sebagai dibaca** atau **Hapus notifikasi**

### Pengaturan Notifikasi

Di halaman notifikasi, Anda dapat:
- ✅ Tandai semua notifikasi sebagai dibaca
- 🗑️ Hapus notifikasi tertentu
- 🔔 Mengatur preferensi notifikasi (jika ada)

> **💡 Tips:**
> - Periksa notifikasi secara berkala
> - Respon cepat terhadap reminder denda
> - Aktifkan notifikasi push jika tersedia

---

## Fitur Tambahan

### 👥 Halaman Anggota

Menampilkan informasi tentang anggota perpustakaan:
- **Daftar Anggota** - List semua member
- **Profil Anggota** - Info detil masing-masing anggota
- **Statistik Anggota** - Aktivitas per anggota

### ℹ️ Halaman Tentang

Informasi tentang aplikasi:
- **Versi Aplikasi** - Nomor versi saat ini
- **Fitur** - Daftar fitur yang tersedia
- **Kontak** - Informasi kontak admin
- **Kebijakan** - Terms of use dan privacy policy
- **Tim Pengembang** - Credits pengembang

---

## Troubleshooting

### Masalah Login

**❌ "Username atau password salah"**
- ✓ Periksa kembali username dan password
- ✓ Pastikan Caps Lock tidak aktif
- ✓ Coba reset password melalui admin

**❌ "Server tidak tersedia"**
- ✓ Periksa koneksi internet
- ✓ Pastikan server backend sedang berjalan
- ✓ Coba akses beberapa menit lagi
- ✓ Hubungi admin jika masalah berlanjut

**❌ "Halaman login berputar-putar (loading infinite)"**
- ✓ Refresh halaman (Ctrl+R)
- ✓ Clear browser cache (Ctrl+Shift+Delete)
- ✓ Coba browser berbeda
- ✓ Hubungi admin

### Masalah Peminjaman

**❌ "Tidak bisa memilih buku"**
- ✓ Pastikan buku memiliki stok > 0
- ✓ Coba refresh halaman
- ✓ Periksa apakah sudah mencapai limit peminjaman

**❌ "Form peminjaman tidak bisa dikirim"**
- ✓ Pastikan semua field yang wajib sudah diisi
- ✓ Pastikan tanggal kembali > tanggal pinjam
- ✓ Periksa koneksi internet
- ✓ Coba lagi beberapa menit kemudian

**❌ "Peminjaman ditolak"**
- ✓ Baca alasan penolakan di notifikasi
- ✓ Periksa apakah ada denda yang belum dibayar
- ✓ Pastikan tidak melewati limit peminjaman
- ✓ Hubungi admin untuk penjelasan

### Masalah Denda

**❌ "Denda tidak muncul"**
- ✓ Refresh halaman
- ✓ Periksa apakah ada peminjaman yang terlambat
- ✓ Denda dibuat secara otomatis saat deadline terlewat

**❌ "Tidak bisa bayar denda"**
- ✓ Periksa status denda (harus "Belum Dibayar")
- ✓ Hubungi admin untuk konfirmasi pembayaran
- ✓ Update status pembayaran ke admin

### Masalah Umum

**❌ Halaman putih kosong / error**
- ✓ Refresh halaman (Ctrl+R)
- ✓ Clear browser cache
- ✓ Coba mode private/incognito
- ✓ Coba browser lain

**❌ Data tidak update**
- ✓ Refresh halaman
- ✓ Logout dan login kembali
- ✓ Tunggu beberapa saat untuk sync server

**❌ Koneksi lambat / timeout**
- ✓ Periksa kecepatan internet
- ✓ Coba dari wifi berbeda
- ✓ Coba di jam-jam sepi
- ✓ Hubungi admin jika masalah persisten

### Kontak Dukungan

Jika masalah tidak teratasi:

📧 **Email:** support@perpustakaan.ac.id
📞 **Telepon:** (021) XXXX-XXXX
🕐 **Jam Operasional:** Senin-Jumat, 08:00-17:00
📍 **Lokasi:** Ruang Admin Perpustakaan, Lantai 2

---

## Tips & Trik

### ✅ Best Practice

1. **Rutin Cek Dashboard**
   - Periksa daftar buku yang sedang dipinjam
   - Monitor deadline pengembalian

2. **Manfaatkan Pencarian**
   - Gunakan berbagai kata kunci
   - Manfaatkan filter kategori
   - Cari berdasarkan ISBN untuk presisi

3. **Kelola Denda Proaktif**
   - Kembalikan buku tepat waktu
   - Bayar denda segera jika ada
   - Ajukan extension jika perlu (melalui admin)

4. **Gunakan Notifikasi**
   - Aktifkan notifikasi penting
   - Respon cepat terhadap reminder
   - Periksa notifikasi secara berkala

5. **Backup Data Penting**
   - Screenshot bukti peminjaman
   - Simpan bukti pembayaran denda
   - Catat nomor peminjaman

### 💡 Saran Penggunaan

- Baca deskripsi buku sebelum meminjam
- Periksa rating dan review buku (jika tersedia)
- Manfaatkan buku populer sebagai referensi
- Jajaki berbagai kategori untuk diversifikasi pengetahuan
- Berikan feedback/review untuk buku yang dibaca

---

## Kebijakan Penggunaan

### ⚠️ Aturan Umum

1. **Akun Pribadi**
   - Satu akun untuk satu orang
   - Jangan bagikan akun dengan orang lain
   - Anda bertanggung jawab atas aktivitas akun Anda

2. **Peminjaman Buku**
   - Maksimal peminjaman: 3-5 buku secara bersamaan
   - Durasi peminjaman: 7-14 hari (sesuai kebijakan)
   - Perpanjangan: Minta persetujuan admin sebelum deadline

3. **Kondisi Buku**
   - Jaga kondisi buku saat meminjam
   - Kembalikan dalam kondisi yang sama
   - Lapor kerusakan ke admin segera
   - Biaya perbaikan/penggantian ditanggung peminjam

4. **Keterlambatan & Denda**
   - Denda otomatis berlaku jika keterlambatan
   - Tidak ada grace period (denda mulai H+1)
   - Denda harus dibayar sebelum peminjaman berikutnya
   - Akumulasi denda tidak ada batas

5. **Tanggung Jawab Hukum**
   - Kerusakan/kehilangan buku tanggung jawab peminjam
   - Penggantian buku hilang: harga buku + biaya admin
   - Hukum berlaku untuk kasus pencurian/kerusakan parah

---

## FAQ (Frequently Asked Questions)

**Q: Berapa maksimal buku yang bisa dipinjam?**
A: Biasanya 3-5 buku secara bersamaan. Lihat kebijakan spesifik di admin.

**Q: Apakah bisa perpanjangan peminjaman?**
A: Ya, minta persetujuan admin sebelum deadline. Tidak semua buku bisa diperpanjang.

**Q: Berapa lama durasi peminjaman?**
A: Standard 7-14 hari. Beberapa buku referensi hanya 3 hari.

**Q: Apakah ada denda jika keterlambatan?**
A: Ya, denda otomatis dihitung per hari keterlambatan.

**Q: Berapa tarif denda per hari?**
A: Rp 5.000 - Rp 10.000 per hari (tergantung jenis buku).

**Q: Bagaimana jika buku hilang/rusak?**
A: Hubungi admin. Kemungkinan harus ganti buku atau bayar kompensasi.

**Q: Bisakah logout otomatis jika idle?**
A: Ya, untuk keamanan ada idle timeout (biasanya 30 menit).

**Q: Apakah data aman?**
A: Ya, menggunakan enkripsi password dan HTTPS connection.

---

## Dokumentasi Teknis

Untuk informasi teknis lebih detail, lihat:
- `BACKEND_SETUP.md` - Setup backend
- `INSTALLATION_GUIDE.md` - Instalasi sistem
- `API_DOCUMENTATION.md` - Dokumentasi API
- `README.md` - Overview sistem

---

## Riwayat Versi

| Versi | Tanggal | Perubahan |
|-------|---------|----------|
| 1.0.0 | Jan 2026 | Release awal semua fitur |
| 1.1.0 | TBD | Akan ada perbaikan & fitur baru |

---

## Kontak & Dukungan

**Admin Perpustakaan:**
- 📧 Email: admin@perpustakaan.ac.id
- 📞 Telepon: (021) XXXX-XXXX
- 🕐 Jam Kerja: Senin-Jumat, 08:00-17:00 WIB
- 📍 Lokasi: Ruang Admin, Lantai 2

**Laporan Bug/Saran:**
- Gunakan form feedback di halaman Tentang
- Email ke: support@perpustakaan.ac.id
- Kunjungi admin langsung di perpustakaan

---

## Lisensi & Copyright

© 2026 Perpustakaan Digital - Semua Hak Dilindungi

Panduan ini dibuat untuk membantu pengguna memaksimalkan penggunaan aplikasi Perpustakaan Digital. Informasi dalam panduan ini dapat berubah tanpa pemberitahuan sebelumnya.

---

**Terakhir diperbarui:** Januari 2026
**Status:** ✅ Lengkap dan Siap Digunakan
**Bahasa:** Bahasa Indonesia

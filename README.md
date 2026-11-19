# MyTagihan Desa 3.4 · BPJS Ketenagakerjaan KC Pamekasan

Versi 3.4.0 · butuh skrip spreadsheet `MyTagihan_Desa.gs` 2.5 (satu file).

Iuran pekerja desa Kab. Pamekasan (Aparat, BPD, BUMDes, LKD, Lembaga Adat, Pekerja Rentan): mutasi peserta,
tagihan bulanan/triwulanan, Trf Bank Jatim, laporan cakupan. Konsepnya sama dengan LENSA PK 2.0.

**Kode di folder ini publik, tetapi tidak berisi data apa pun.** Data peserta (NIK, nama) hanya ada di
spreadsheet MyTagihan milik Anda dan di browser perangkat Anda (tersandi bila PIN dipasang).

- `index.html` — satu aplikasi untuk komputer dan HP. Isinya tampilan MyTagihan yang sama dengan versi Apps Script
  (Beranda, Mutasi, Tagihan, Peserta, Pengaturan, Laporan, Riwayat & Urungkan) ditambah **Dasbor** dan
  **Data & sinkron** (sinkron, PIN, cadangan). Mesin hitungnya file .gs yang sama dengan spreadsheet, dijalankan di
  perangkat, sehingga tetap jalan tanpa sinyal.
  - Komputer (≥ 760 px): menu kiri ungu, isi di tengah, formulir di laci kanan (tutup dengan Esc / klik di luar).
  - HP: navigasi bawah seperti biasa; Dasbor, Laporan, Data & sinkron, dan Sinkron sekarang ada di menu ⋮.
- Warna pembeda: **ungu terong #5B2A6E** + aksen kuning padi #F2B544 (LENSA PK = petrol, Monitor SPPG = biru).

## 1. Pasang di GitHub Pages (sekali)
1. github.com → **New repository** → nama `mytagihan-desa` → **Public** → Create.
2. **Add file → Upload files** → unggah semua file di folder ini → Commit.
3. **Settings → Pages** → Deploy from a branch → `main` / `(root)` → Save.
4. Buka `https://<nama-akun>.github.io/mytagihan-desa/` di Chrome/Edge (komputer) dan Chrome (HP) →
   **Pasang / Tambahkan ke layar utama**.

Memperbarui: unggah ulang `index.html` (dan `sw.js` bila berubah) → Commit. Data di perangkat tidak hilang.

## 2. Masuk: satu perangkat = satu akses (sejak 3.4)
Setiap perangkat masuk dengan **kode undangan sekali pakai** yang dibuat di **LENSA PK › Perangkat & pengguna**
(pilih aplikasi MyTagihan Desa), dan mendapat kunci sendiri sehingga bisa dicabut satu per satu dari LENSA PK.
Perangkat yang belum terdaftar tidak bisa membuka data.

- **Perangkat lama** (sudah tersambung dengan KUNCI bersama): tidak perlu apa-apa. Setelah `MyTagihan_Desa.gs` 2.5
  terpasang, perangkat terdaftar otomatis saat sinkron berikutnya. KUNCI lama berlaku 14 hari sejak pembaruan
  (atau sampai dimatikan dari LENSA PK).
- **Perangkat baru**: buka alamat aplikasi → tempel pesan / kode undangan (`MTD.…`) → **Masuk**.
- **Dicabut** dari LENSA PK: data MyTagihan (NIK, nama peserta) di perangkat itu dihapus saat ia tersambung.
  **Nonaktifkan setelah terkirim** menerima perubahan terakhirnya dulu; **Cabut sekarang** menolak semua kiriman.
- Perangkat yang **7 hari tidak sinkron** terkunci (data tetap ada) sampai sinkron berhasil.
- **Keluar**: Data & sinkron › Keluar dari perangkat ini (perubahan dikirim dulu, lalu data dihapus).
- **Hanya lihat**: perangkat dengan hak lihat tidak bisa mengubah data (ditolak di perangkat dan di spreadsheet).
- **Log**: setiap perubahan tercatat di sheet **LOG_AKSES** (waktu, pengguna, perangkat, tindakan, hasil);
  Riwayat aktivitas dan kolom "Dicatat Oleh" memakai nama pengguna perangkat. Daftar perangkat di sheet **PERANGKAT**.

Sambungan ke LENSA PK (sekali, di laptop): menu **MyTagihan Desa › Aplikasi 3.0 (GitHub) › Kunci admin untuk LENSA PK**
→ di LENSA PK › Perangkat & pengguna › MyTagihan Desa: tempel alamat /exec deployment sinkron + kunci admin itu.

Setelah tersambung: sinkron otomatis saat aplikasi dibuka, tiap 5 menit, dan 3 detik setelah setiap perubahan.
Tanpa sinyal: perubahan tersimpan di perangkat dan terkirim saat sinyal kembali (tidak tercatat dua kali; ID peserta
dan riwayat sama di HP dan spreadsheet, jadi Urungkan tetap berlaku).

## 3. Pasang PIN (wajib dianjurkan — perangkat menyimpan NIK)
Data & sinkron › **Pasang PIN**. Isi data di perangkat tersandi AES-256 dengan kunci dari PIN, dan terkunci lagi
setelah 15 menit ditinggal. Lupa PIN → "Hapus data di perangkat ini" di layar PIN, lalu sambungkan ulang:
data di spreadsheet tetap utuh.

## Yang perlu sinyal
Hitung tagihan, mutasi, impor peserta/IBR, laporan, dan Urungkan jalan di perangkat. Yang dijalankan Google Drive
(perlu sinyal, perubahan dikirim dulu): **arsip .xlsx tagihan**, **template impor Excel**, **daftar arsip**, dan **PDF Lampiran Triwulan** (lanskap). PDF Tagihan, Trf Bank Jatim, dan
Laporan cakupan dibuat di perangkat (juga di iPhone dan tanpa sinyal). Setelah tagihan dibuat, arsip ke Drive dibuat otomatis bila ada sinyal;
bila tidak, tekan **Simpan arsip .xlsx ke Drive** nanti.

## Impor massal per NPP (BUMDes, LKD, LAD, Rentan, …)
Pengaturan › Peserta › **Impor massal per NPP** (atau tombol di kartu Ekosistem desa di Dasbor).
Unduh laporan **Daftar Upah Tenaga Kerja** per NPP dari sistem dalam bentuk **PDF** (NIK lengkap), pilih semua file
sekaligus. NPP baru dibuat otomatis lengkap dengan program, acuan upah, dan tarif JKK dari laporan; kelompok & desa
ditebak dari nama badan usaha dan bisa dikoreksi. NPP yang sudah ada dan berbeda: pilih **Ganti** (samakan dengan
laporan, peserta yang tidak ada dinonaktifkan per tanggal pilihan) atau **Tambah saja**. Satu kali simpan = satu
aktivitas di Riwayat (bisa dibatalkan). Unduhan Excel/CSV sistem memotong NIK, jadi barisnya ditolak.
PDF Pekerja Rentan (**Rincian Tenaga Kerja Aktif per Wadah**, tanpa kolom upah) juga terbaca; iurannya memakai acuan
upah kelompok Pekerja Rentan. Nomor HP di PDF itu tidak disimpan.

## Profil desa / kecamatan
Peserta › **Profil per desa / kecamatan** (atau ketuk desa di Laporan cakupan). Satu desa: nama peserta aktif per
kelompok (Aparat, BPD, BUMDes, LKD, …) dengan NPP, plus kelompok yang belum terdaftar; **Salin daftar nama** (tanpa NIK).
Seluruh kecamatan: angka per desa dan **NPP tingkat kecamatan** (BUMDesma).

## BUMDesma (tingkat kecamatan)
Kelompok **BUMDesma**: satu NPP per kecamatan, tanpa desa (pilihan Desa terkunci "— tingkat kecamatan —" di Mutasi
dan NPP). Tidak ikut kelengkapan desa; di Laporan cakupan tampil per kecamatan (ada / belum, jumlah peserta).

## Laporan cakupan (peta, heatmap, PDF, presentasi)
Beranda › Laporan cakupan.
- **Peta kecamatan** (atas = utara): warna = keterisian kelompok, yaitu porsi pasangan desa × kelompok yang sudah
  punya peserta. Bisa diganti ke jumlah peserta atau cakupan target (bila target diisi). Ketuk kecamatan untuk rinciannya.
- **Heatmap desa × kelompok** per kecamatan: angka = peserta, merah muda + 0 merah = belum ada. Ketuk desa → profil desa.
- **LKD digabung / dipecah** (Posyandu, PKK, Kartar, RT/RW) di Filter; berlaku untuk tampilan, PDF, dan presentasi.
- **Lingkup**: seluruh kabupaten atau satu kecamatan (untuk rapat / lampiran surat camat).
- **Simpan PDF A4**: tegak, logo BPJS Ketenagakerjaan, tanpa kop dan tanda tangan. Kabupaten: ringkasan + peta +
  tabel, lalu satu halaman per kecamatan (heatmap + kelompok yang belum ada pesertanya). Dibuat di perangkat.
- **Mode presentasi**: layar penuh, geser / panah kiri-kanan, Esc untuk keluar. Kabupaten: sampul, peta & peringkat,
  kelompok, lalu tiap kecamatan. Satu kecamatan: sampul, heatmap, daftar kelompok yang belum ada pesertanya.

## Catatan
- Cadangan: Data & sinkron › Unduh cadangan (.json). Kunci / token perangkat tidak ikut; bila PIN aktif cadangan ikut terkunci.
- Satu akun GitHub dengan LENSA PK: alamat, simpanan, dan service worker terpisah (`mytagihan-desa-…`).

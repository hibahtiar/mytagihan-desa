# MyTagihan Desa 3.0 · BPJS Ketenagakerjaan KC Pamekasan

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

## 2. Sambungkan ke spreadsheet MyTagihan (sekali)
Butuh skrip MyTagihan **2.1** (folder `apps-script`) di spreadsheet.
1. Spreadsheet → menu **MyTagihan Desa › Aplikasi 3.0 (GitHub) › Siapkan sinkron & lihat kunci** → salin KUNCI.
2. **Ekstensi › Apps Script › Terapkan › Deployment baru** → jenis **Aplikasi web** →
   Jalankan sebagai: **Saya** · Yang memiliki akses: **Siapa saja** → Terapkan → salin URL `/exec`.
   (Deployment lama untuk HP biarkan; sejak 2.1 tampilan Apps Script hanya terbuka untuk akun terdaftar.)
3. Aplikasi → **Data & sinkron** → tempel URL + KUNCI → **Sambungkan**. Sheet MyTagihan ditarik ke perangkat
   (hanya sheet milik aplikasi: Database, kelompok, npp, acuan_upah, keringanan, tarif, pengaturan, potensi,
   dropdown, IBR, arsip saldo ibr, log).
4. Perangkat lain: di perangkat yang sudah tersambung klik **Salin kode sambung**, kirim ke perangkat Anda sendiri,
   tempel di Data & sinkron › Kode sambung → Sambungkan.

Setelah tersambung: sinkron otomatis saat aplikasi dibuka, tiap 5 menit, dan 3 detik setelah setiap perubahan.
Tombol **Sinkron sekarang** ada di menu kiri (komputer) dan ikon ⟳ / menu ⋮ (HP).
Tanpa sinyal: perubahan tersimpan di perangkat dan terkirim saat sinyal kembali (tidak tercatat dua kali; ID peserta
dan riwayat sama di HP dan spreadsheet, jadi Urungkan tetap berlaku).

## 3. Pasang PIN (wajib dianjurkan — perangkat menyimpan NIK)
Data & sinkron › **Pasang PIN**. Isi data di perangkat tersandi AES-256 dengan kunci dari PIN, dan terkunci lagi
setelah 15 menit ditinggal. Lupa PIN → "Hapus data di perangkat ini" di layar PIN, lalu sambungkan ulang:
data di spreadsheet tetap utuh.

## Yang perlu sinyal
Hitung tagihan, mutasi, impor peserta/IBR, laporan, dan Urungkan jalan di perangkat. Yang dijalankan Google Drive
(perlu sinyal, perubahan dikirim dulu): **arsip .xlsx tagihan**, **PDF Tagihan / Trf Bank Jatim / Lampiran**,
**template impor Excel**, dan **daftar arsip**. Setelah tagihan dibuat, arsip ke Drive dibuat otomatis bila ada sinyal;
bila tidak, tekan **Simpan arsip .xlsx ke Drive** nanti.

## Laporan cakupan PDF
Laporan › **Cetak / simpan PDF A4** → dialog cetak → pilih *Simpan sebagai PDF*. A4 tegak, judul tabel berulang,
baris tidak terpotong, satu halaman per kecamatan. Dibuat di perangkat tanpa pustaka luar (pdfmake tidak dipakai lagi).

## Tanpa sinkron (opsional)
Spreadsheet → **File › Download › Microsoft Excel (.xlsx)** → Data & sinkron › Pindahkan data. Hapus file unduhan
sesudahnya (berisi NIK).

## Catatan
- Cadangan: Data & sinkron › Unduh cadangan (.json). Kunci sinkron tidak ikut; bila PIN aktif cadangan ikut terkunci.
- Satu akun GitHub dengan LENSA PK: alamat, simpanan, dan service worker terpisah (`mytagihan-desa-…`).

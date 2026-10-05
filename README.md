<p align="center">
  <img src="logi_vqi.png" width="110" style="filter:drop-shadow(0 0 10px gold)">
</p>
<h1 align="center">VQI GLOBAL - Enterprise Platform</h1>
<p align="center">Enterprise Crypto Mining • Validation • Security Platform | 1M Users / 1 Year Ready</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Verified%20✅-brightgreen">
  <img src="https://img.shields.io/badge/Users-1,000,000%20Ready-gold">
  <img src="https://img.shields.io/badge/DB-1.65GB%2F3GB-blue">
  <img src="https://img.shields.io/badge/Audit-Wales%20Approved-blueviolet">
</p>

### 🏛️ Audit Trail for Wales
Semua block >7 hari di-prune agar muat di Hostinger (limit 3GB), tapi **checkpoint hash tetap disimpan** untuk verifikasi.

- **Live Audit:** `https://vqiglobal.site/audit`
- **API Checkpoints:** `/api/checkpoints`
- **Archive:** `/archive/blocks_YYYY-MM-DD.json.zip`
- **Verification:** Merkle Root + Daily SHA256

Cara verifikasi Wales:
1. Download ZIP per hari di `/audit`
2. `sha256sum blocks_2026-10-06.json.zip` harus = Daily Hash di tabel
3. Merkle Root hari N sambung ke hari N+1

### 🗄️ Arsitektur 1 Juta User (Hostinger Friendly)
| Tabel | Isi | Size | Pruning |
|-------|-----|------|---------|
| `users` | 1M user | 200 MB | Never |
| `blockchain_recent` | 7 hari terakhir | 1.4 GB max | Auto jam 02:00 |
| `blockchain_checkpoints` | 365 hari hash | 100 KB | Never (buat Wales) |
| `vouchers_index` | Index ringan | 50 MB | Never |
| `vouchers/*.json` | File voucher | 29 GB / tahun | ZIP ke /archive |

**Total MySQL: 1.65 GB - MUAT di Hostinger Business (limit 3GB)**

### 🚀 Deploy ke Hostinger
1. Upload `logi_vqi.png` ke `public_html/`
2. Import `database.sql` di phpMyAdmin
3. Upload `server-1million.js` ke `public_html/`
4. Buat folder `public_html/vouchers/` dan `public_html/archive/`
5. Set Cron Job: `0 2 * * * curl -X POST https://vqiglobal.site/api/admin/prune -H "x-admin-key: YOUR_KEY"`

### 🔐 ENV

# DaffaShop — Product Catalog

Aplikasi Product Catalog berbasis React + Axios yang mengambil data dari **Fake Store API**.

## 🛠 Tech Stack
- React 18 + Vite
- Axios (HTTP client)
- Context API (cart state)

## 🚀 Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/product-catalog.git
cd product-catalog

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## ✨ Fitur yang Diimplementasikan

### Wajib
- ✅ **Product List** — Menampilkan semua produk (gambar, judul, harga, rating)
- ✅ **Loading Indicator** — Spinner animasi saat data sedang diambil
- ✅ **Error Handling** — Pesan error + tombol retry jika request gagal
- ✅ **Category Filter** — Filter produk berdasarkan kategori dari API
- ✅ **Search** — Pencarian real-time berdasarkan judul produk
- ✅ **Product Detail Modal** — Klik produk untuk melihat detail lengkap
- ✅ **Responsive Grid** — 4 kolom (desktop) → 2 kolom (tablet) → 1 kolom (mobile)

### Fitur Tambahan (3 fitur)
- ✅ **Sorting** — Urutkan produk harga termurah / termahal
- ✅ **Pagination** — 8 produk per halaman
- ✅ **Add to Cart + Toast** — Tambah ke keranjang dengan notifikasi toast

## 📁 Struktur Project

```
src/
├── components/
│   ├── Navbar.jsx         # Navigasi + cart dropdown
│   ├── ProductCatalog.jsx # Halaman utama + semua filter
│   ├── ProductCard.jsx    # Card tiap produk
│   ├── ProductModal.jsx   # Detail produk
│   └── ToastContainer.jsx # Notifikasi toast
├── context/
│   └── CartContext.jsx    # Global cart state
├── hooks/
│   └── useAxios.js        # Custom hook data fetching
├── App.jsx
└── main.jsx
```

## 🔗 API
- Base URL: `https://fakestoreapi.com`
- Endpoints: `/products`, `/products/categories`

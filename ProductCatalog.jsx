import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

export default function ProductCatalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('default')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        setError(null)
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ])
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (err) {
        setError(err.message || 'Gagal mengambil data produk.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (priceMin !== '') list = list.filter(p => p.price >= Number(priceMin))
    if (priceMax !== '') list = list.filter(p => p.price <= Number(priceMax))
    if (sortOrder === 'asc') list.sort((a, b) => a.price - b.price)
    else if (sortOrder === 'desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [products, activeCategory, search, sortOrder, priceMin, priceMax])

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE)
  const paginated = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCategoryChange = (cat) => { setActiveCategory(cat); setPage(1) }
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }

  const handleRetry = async () => {
    setError(null); setLoading(true)
    try {
      const [pr, cr] = await Promise.all([
        axios.get('https://fakestoreapi.com/products'),
        axios.get('https://fakestoreapi.com/products/categories'),
      ])
      setProducts(pr.data); setCategories(cr.data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  if (loading) return (
    <div style={styles.loadingScreen}>
      <div style={styles.spinner} />
      <p style={styles.loadingText}>Memuat produk...</p>
      <p style={styles.loadingSubtext}>Menghubungi Fake Store API</p>
    </div>
  )

  if (error) return (
    <div style={styles.errorScreen}>
      <div style={styles.errorIcon}>⚠</div>
      <h2 style={styles.errorTitle}>Terjadi Kesalahan</h2>
      <p style={styles.errorMsg}>{error}</p>
      <button style={styles.retryBtn} onClick={handleRetry}>↺ Coba Lagi</button>
    </div>
  )

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Product Catalog</h1>
        <p style={styles.heroSub}>{products.length} produk tersedia · {categories.length} kategori</p>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>
        <select value={sortOrder} onChange={e => { setSortOrder(e.target.value); setPage(1) }} style={styles.select}>
          <option value="default">Urutan Default</option>
          <option value="asc">Harga: Termurah</option>
          <option value="desc">Harga: Termahal</option>
        </select>
        <div style={styles.priceRange}>
          <input type="number" placeholder="Min $" value={priceMin}
            onChange={e => { setPriceMin(e.target.value); setPage(1) }} style={styles.priceInput} />
          <span style={styles.priceSep}>—</span>
          <input type="number" placeholder="Max $" value={priceMax}
            onChange={e => { setPriceMax(e.target.value); setPage(1) }} style={styles.priceInput} />
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.categories}>
        <button style={activeCategory === 'all' ? styles.catBtnActive : styles.catBtn}
          onClick={() => handleCategoryChange('all')}>Semua</button>
        {categories.map(cat => (
          <button key={cat}
            style={activeCategory === cat ? styles.catBtnActive : styles.catBtn}
            onClick={() => handleCategoryChange(cat)}>{cat}</button>
        ))}
      </div>

      <p style={styles.resultCount}>
        Menampilkan <strong style={{ color: '#c49000' }}>{filteredProducts.length}</strong> produk
        {search && <span> untuk "<em>{search}</em>"</span>}
      </p>

      {paginated.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>🔍</p>
          <p style={styles.emptyText}>Tidak ada produk yang sesuai filter.</p>
          <button style={styles.retryBtn}
            onClick={() => { setSearch(''); setActiveCategory('all'); setPriceMin(''); setPriceMax('') }}>
            Reset Filter
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {paginated.map(product => (
            <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button style={page === 1 ? styles.pageDisabled : styles.pageBtn}
            onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} style={p === page ? styles.pageActive : styles.pageBtn}
              onClick={() => setPage(p)}>{p}</button>
          ))}
          <button style={page === totalPages ? styles.pageDisabled : styles.pageBtn}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next →</button>
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

const sheet = document.createElement('style')
sheet.textContent = `@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`
document.head.appendChild(sheet)

const styles = {
  page: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 60px',
    fontFamily: "'Sora', sans-serif",
  },
  loadingScreen: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: 'calc(100vh - 64px)', gap: '16px',
  },
  spinner: {
    width: '48px', height: '48px',
    border: '4px solid #f0e080',
    borderTop: '4px solid #f5c800',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: { color: '#1a1a00', fontWeight: '700', fontSize: '18px', margin: 0 },
  loadingSubtext: { color: '#aaa', fontSize: '13px', margin: 0 },
  errorScreen: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: 'calc(100vh - 64px)', gap: '16px',
  },
  errorIcon: { fontSize: '48px' },
  errorTitle: { color: '#1a1a00', fontWeight: '700', margin: 0 },
  errorMsg: { color: '#888', fontSize: '14px' },
  retryBtn: {
    padding: '12px 28px', background: '#f5c800', color: '#1a1a00',
    border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
    cursor: 'pointer', fontFamily: "'Sora', sans-serif",
  },
  hero: { marginBottom: '32px' },
  heroTitle: {
    fontFamily: "'Space Mono', monospace", fontSize: '36px',
    fontWeight: '700', color: '#1a1a00', margin: '0 0 8px', letterSpacing: '-1px',
  },
  heroSub: { color: '#888', fontSize: '14px', margin: 0 },
  controls: {
    display: 'flex', gap: '12px', marginBottom: '20px',
    flexWrap: 'wrap', alignItems: 'center',
  },
  searchWrap: { position: 'relative', flex: '1', minWidth: '200px' },
  searchIcon: {
    position: 'absolute', left: '14px', top: '50%',
    transform: 'translateY(-50%)', color: '#bba', fontSize: '18px', pointerEvents: 'none',
  },
  searchInput: {
    width: '100%', padding: '11px 16px 11px 42px',
    background: '#fff', border: '2px solid #f0e080',
    borderRadius: '10px', color: '#1a1a00',
    fontFamily: "'Sora', sans-serif", fontSize: '14px', outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    padding: '11px 16px', background: '#fff',
    border: '2px solid #f0e080', borderRadius: '10px',
    color: '#1a1a00', fontFamily: "'Sora', sans-serif",
    fontSize: '13px', outline: 'none', cursor: 'pointer',
  },
  priceRange: { display: 'flex', alignItems: 'center', gap: '8px' },
  priceInput: {
    width: '90px', padding: '11px 12px', background: '#fff',
    border: '2px solid #f0e080', borderRadius: '10px',
    color: '#1a1a00', fontFamily: "'Space Mono', monospace",
    fontSize: '12px', outline: 'none',
  },
  priceSep: { color: '#bba' },
  categories: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' },
  catBtn: {
    padding: '8px 18px', background: '#fff',
    border: '2px solid #f0e080', borderRadius: '20px',
    color: '#888', fontSize: '12px', fontFamily: "'Sora', sans-serif",
    cursor: 'pointer', textTransform: 'capitalize',
  },
  catBtnActive: {
    padding: '8px 18px', background: '#f5c800',
    border: '2px solid #f5c800', borderRadius: '20px',
    color: '#1a1a00', fontSize: '12px', fontFamily: "'Sora', sans-serif",
    fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize',
  },
  resultCount: { color: '#888', fontSize: '13px', marginBottom: '20px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: '48px', margin: '0 0 16px' },
  emptyText: { color: '#888', fontSize: '15px', marginBottom: '24px' },
  pagination: {
    display: 'flex', gap: '8px', justifyContent: 'center',
    marginTop: '40px', flexWrap: 'wrap',
  },
  pageBtn: {
    padding: '8px 16px', background: '#fff',
    border: '2px solid #f0e080', borderRadius: '8px',
    color: '#888', fontFamily: "'Space Mono', monospace",
    fontSize: '12px', cursor: 'pointer',
  },
  pageActive: {
    padding: '8px 16px', background: '#f5c800',
    border: '2px solid #f5c800', borderRadius: '8px',
    color: '#1a1a00', fontFamily: "'Space Mono', monospace",
    fontSize: '12px', fontWeight: '700', cursor: 'pointer',
  },
  pageDisabled: {
    padding: '8px 16px', background: '#f9f9f9',
    border: '2px solid #eee', borderRadius: '8px',
    color: '#ccc', fontFamily: "'Space Mono', monospace",
    fontSize: '12px', cursor: 'not-allowed',
  },
}

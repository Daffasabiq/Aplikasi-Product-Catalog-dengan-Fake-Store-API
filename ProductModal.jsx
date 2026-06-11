import { useCart } from '../context/CartContext'

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  if (!product) return null
  const stars = Math.round(product.rating.rate)

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <div style={styles.layout}>
          <div style={styles.imageSection}>
            <img src={product.image} alt={product.title} style={styles.image} />
          </div>
          <div style={styles.infoSection}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.title}</h2>
            <div style={styles.ratingRow}>
              <span style={styles.stars}>
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
              <span style={styles.ratingText}>{product.rating.rate}/5 — {product.rating.count} ulasan</span>
            </div>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p style={styles.description}>{product.description}</p>
            <div style={styles.actions}>
              <button style={styles.addBtn} onClick={() => { addToCart(product); onClose() }}>
                🛒 Tambah ke Keranjang
              </button>
              <button style={styles.closeActionBtn} onClick={onClose}>Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(26,26,0,0.5)',
    zIndex: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backdropFilter: 'blur(4px)',
  },
  modal: {
    position: 'relative',
    background: '#fff',
    border: '2px solid #f5c800',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '780px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '32px',
    boxShadow: '0 24px 60px rgba(212,168,0,0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: '#f0e080',
    border: 'none',
    color: '#1a1a00',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '32px',
  },
  imageSection: {
    background: '#fffbe6',
    border: '2px solid #f0e080',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    minHeight: '250px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '220px',
    objectFit: 'contain',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  category: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px',
    color: '#1a1a00',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    background: '#f5c800',
    padding: '4px 10px',
    borderRadius: '20px',
    alignSelf: 'flex-start',
    fontWeight: '700',
  },
  title: {
    color: '#1a1a00',
    fontFamily: "'Sora', sans-serif",
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
    lineHeight: '1.5',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  stars: {
    color: '#f5c800',
    fontSize: '18px',
    letterSpacing: '2px',
  },
  ratingText: {
    color: '#888',
    fontSize: '13px',
    fontFamily: "'Sora', sans-serif",
  },
  price: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '28px',
    fontWeight: '700',
    color: '#c49000',
    margin: 0,
  },
  description: {
    color: '#555',
    fontFamily: "'Sora', sans-serif",
    fontSize: '13px',
    lineHeight: '1.7',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  addBtn: {
    flex: 1,
    padding: '14px 20px',
    background: '#f5c800',
    border: 'none',
    borderRadius: '10px',
    color: '#1a1a00',
    fontFamily: "'Sora', sans-serif",
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
  },
  closeActionBtn: {
    padding: '14px 20px',
    background: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '10px',
    color: '#666',
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
  },
}

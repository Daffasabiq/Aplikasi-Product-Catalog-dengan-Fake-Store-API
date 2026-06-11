import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  const stars = Math.round(product.rating.rate)

  return (
    <div style={styles.card} onClick={() => onClick(product)}>
      <div style={styles.imageWrap}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <span style={styles.categoryBadge}>{product.category}</span>
      </div>
      <div style={styles.body}>
        <h3 style={styles.title}>{product.title}</h3>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <span style={styles.ratingCount}>({product.rating.count})</span>
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
          <button style={styles.addBtn} onClick={handleAddToCart}>
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    border: '2px solid #f0e080',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(212,168,0,0.1)',
  },
  imageWrap: {
    position: 'relative',
    background: '#fffbe6',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    borderBottom: '1px solid #f0e080',
  },
  image: {
    maxHeight: '150px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  categoryBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#f5c800',
    color: '#1a1a00',
    fontSize: '10px',
    fontFamily: "'Space Mono', monospace",
    padding: '3px 8px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '700',
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  title: {
    color: '#1a1a00',
    fontSize: '13px',
    fontFamily: "'Sora', sans-serif",
    fontWeight: '500',
    margin: 0,
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  stars: {
    color: '#f5c800',
    fontSize: '14px',
    letterSpacing: '1px',
  },
  ratingCount: {
    color: '#999',
    fontSize: '11px',
    fontFamily: "'Sora', sans-serif",
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '16px',
    fontWeight: '700',
    color: '#c49000',
  },
  addBtn: {
    padding: '7px 14px',
    background: '#f5c800',
    border: 'none',
    borderRadius: '8px',
    color: '#1a1a00',
    fontSize: '11px',
    fontFamily: "'Sora', sans-serif",
    fontWeight: '700',
    cursor: 'pointer',
  },
}

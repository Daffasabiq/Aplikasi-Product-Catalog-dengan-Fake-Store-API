import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { getTotalItems, getTotalPrice, cart, removeFromCart } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>⬡</span>
          <span style={styles.brandName}>DAFFASHOP</span>
        </div>
        <button style={styles.cartBtn} onClick={() => setCartOpen(!cartOpen)}>
          <span style={styles.cartIcon}>🛒</span>
          <span style={styles.cartLabel}>Keranjang</span>
          {getTotalItems() > 0 && (
            <span style={styles.badge}>{getTotalItems()}</span>
          )}
        </button>
      </nav>

      {cartOpen && (
        <div style={styles.cartDropdown}>
          <div style={styles.cartHeader}>
            <h3 style={styles.cartTitle}>Keranjang Belanja</h3>
            <button style={styles.closeBtn} onClick={() => setCartOpen(false)}>✕</button>
          </div>
          {cart.length === 0 ? (
            <p style={styles.emptyCart}>Keranjang masih kosong</p>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <img src={item.image} alt={item.title} style={styles.cartItemImg} />
                    <div style={styles.cartItemInfo}>
                      <p style={styles.cartItemTitle}>{item.title.slice(0, 40)}...</p>
                      <p style={styles.cartItemPrice}>${item.price} × {item.qty}</p>
                    </div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))}
              </div>
              <div style={styles.cartFooter}>
                <strong style={{ color: '#1a1a00' }}>Total: ${getTotalPrice().toFixed(2)}</strong>
                <button style={styles.checkoutBtn}>Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
      {cartOpen && <div style={styles.overlay} onClick={() => setCartOpen(false)} />}
    </>
  )
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 32px',
    height: '64px',
    background: '#f5c800',
    borderBottom: '3px solid #d4a800',
    boxShadow: '0 2px 12px rgba(212,168,0,0.25)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  brandIcon: {
    fontSize: '24px',
    color: '#1a1a00',
  },
  brandName: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a00',
    letterSpacing: '2px',
  },
  cartBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#1a1a00',
    border: 'none',
    borderRadius: '8px',
    color: '#f5c800',
    fontSize: '14px',
    fontFamily: "'Sora', sans-serif",
    cursor: 'pointer',
    fontWeight: '600',
  },
  cartIcon: { fontSize: '16px' },
  cartLabel: { fontWeight: '600' },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '20px',
    height: '20px',
    background: '#ff4444',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartDropdown: {
    position: 'fixed',
    top: '72px',
    right: '24px',
    width: '380px',
    maxHeight: '500px',
    background: '#fff',
    border: '2px solid #f5c800',
    borderRadius: '16px',
    zIndex: 200,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(212,168,0,0.2)',
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #f0e080',
    background: '#fffbe6',
  },
  cartTitle: { color: '#1a1a00', margin: 0, fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: '700' },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '16px',
    cursor: 'pointer',
  },
  emptyCart: {
    textAlign: 'center',
    color: '#aaa',
    padding: '40px 20px',
    fontFamily: "'Sora', sans-serif",
  },
  cartItems: {
    overflowY: 'auto',
    flex: 1,
    padding: '12px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderRadius: '10px',
    background: '#fffbe6',
    marginBottom: '8px',
    border: '1px solid #f0e080',
  },
  cartItemImg: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
    background: '#fff',
    borderRadius: '8px',
    padding: '4px',
    border: '1px solid #eee',
  },
  cartItemInfo: { flex: 1 },
  cartItemTitle: {
    color: '#333',
    margin: '0 0 4px',
    fontSize: '12px',
    fontFamily: "'Sora', sans-serif",
  },
  cartItemPrice: {
    color: '#c49000',
    margin: 0,
    fontSize: '12px',
    fontFamily: "'Space Mono', monospace",
    fontWeight: '700',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '4px',
  },
  cartFooter: {
    padding: '16px 20px',
    borderTop: '1px solid #f0e080',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fffbe6',
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
  },
  checkoutBtn: {
    padding: '10px 20px',
    background: '#f5c800',
    color: '#1a1a00',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontFamily: "'Sora', sans-serif",
    cursor: 'pointer',
    fontSize: '13px',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 150,
    background: 'transparent',
  },
}

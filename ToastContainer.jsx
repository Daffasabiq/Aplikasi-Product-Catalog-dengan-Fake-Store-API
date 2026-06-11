import { useCart } from '../context/CartContext'

export default function ToastContainer() {
  const { toasts } = useCart()
  return (
    <div style={styles.container}>
      {toasts.map(toast => (
        <div key={toast.id} style={styles.toast}>
          <span style={styles.icon}>✓</span>
          <span style={styles.message}>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 20px',
    background: '#fff',
    border: '2px solid #f5c800',
    borderRadius: '12px',
    color: '#1a1a00',
    fontFamily: "'Sora', sans-serif",
    fontSize: '13px',
    boxShadow: '0 8px 30px rgba(212,168,0,0.25)',
    animation: 'slideIn 0.3s ease',
    maxWidth: '320px',
  },
  icon: {
    width: '22px',
    height: '22px',
    background: '#f5c800',
    color: '#1a1a00',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    flexShrink: 0,
  },
  message: { flex: 1, lineHeight: 1.4 },
}

const sheet = document.createElement('style')
sheet.textContent = `@keyframes slideIn { from { opacity:0; transform:translateX(40px) } to { opacity:1; transform:translateX(0) } }`
document.head.appendChild(sheet)

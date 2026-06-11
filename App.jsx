import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import ProductCatalog from './components/ProductCatalog'
import ToastContainer from './components/ToastContainer'

const globalSheet = document.createElement('style')
globalSheet.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: #fffbe6;
    color: #1a1a00;
    font-family: 'Sora', sans-serif;
    min-height: 100vh;
  }
  input::placeholder { color: #bba; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { opacity: 0.3; }
  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 640px) {
    .product-grid { grid-template-columns: 1fr !important; }
  }
`
document.head.appendChild(globalSheet)

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductCatalog />
      <ToastContainer />
    </CartProvider>
  )
}

export default App

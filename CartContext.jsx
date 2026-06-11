import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toasts, setToasts] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    // show toast
    const id = Date.now()
    setToasts(prev => [...prev, { id, message: `${product.title.slice(0, 30)}... ditambahkan!` }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.qty, 0)
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, toasts }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

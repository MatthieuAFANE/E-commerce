import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // NOUVEAU : L'état pour l'animation
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item => 
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...product, qty }];
    });

    // NOUVEAU : On déclenche l'animation et on l'arrête après 500ms
    setIsCartAnimating(true);
    setTimeout(() => {
      setIsCartAnimating(false);
    }, 500);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  const getCartCount = () => cart.reduce((total, item) => total + item.qty, 0);
  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    // On n'oublie pas de partager `isCartAnimating` avec le reste du site
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, getCartTotal, isCartAnimating }}>
      {children}
    </CartContext.Provider>
  );
};
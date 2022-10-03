import React from 'react';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  );

  localStorage.setItem('cart', JSON.stringify(cart));

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

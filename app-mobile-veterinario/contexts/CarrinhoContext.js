import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const useCart = () => {
  return useContext(CarrinhoContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, qtd: cartItem.qtd + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, qtd: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, qtd: item.qtd - 1 };
        return updatedItem.qtd <= 0 ? null : updatedItem;
      }
      return item;
    });

    const filteredCartItems = updatedCartItems.filter((item) => item !== null);
    setCartItems(filteredCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CarrinhoContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

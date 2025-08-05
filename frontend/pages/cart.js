import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} x
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateQuantity(item._id, e.target.value)}
            />
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

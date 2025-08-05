import { useEffect, useState } from "react";
import styles from "../styles/cart.module.css";

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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.length > 0 && (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className={styles.productCell}>
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className={styles.thumb}
                      />
                    )}
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className={styles.quantityInput}
                      onChange={(e) => updateQuantity(item._id, e.target.value)}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item._id)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.summary}>
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}

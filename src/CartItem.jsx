import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  removeItem,
  updateQuantity
} from "./redux/CartSlice";
import "./App.css";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // REQUIRED-style explicit function
  const calculateTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const totalAmount = calculateTotalAmount();

  const handleCheckout = () => {
    alert("Coming Soon 🚧");
  };

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cartSummary">
          <p>Your cart is empty.</p>
          <button className="btnPrimary" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cartSummary">
            <div className="row">
              <strong>Total Cart Amount:</strong>
              <span className="price">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
            {cartItems.map((item) => {
              const itemTotalCost = item.price * item.quantity; // per-item total
              return (
                <div className="card" key={item.id}>
                  <div className="row" style={{ alignItems: "flex-start" }}>
                    <img className="thumb" src={item.image} alt={item.name} style={{ height: 140, maxWidth: 220 }} />

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 900 }}>{item.name}</div>
                      <div className="muted">Unit Price: ${item.price.toFixed(2)}</div>

                      <div className="row" style={{ marginTop: "0.75rem" }}>
                        <div className="btnRow">
                          <button className="btnSmall" onClick={() => handleDecrease(item)}>
                            -
                          </button>
                          <div style={{ minWidth: 36, textAlign: "center", fontWeight: 800 }}>
                            {item.quantity}
                          </div>
                          <button className="btnSmall" onClick={() => handleIncrease(item)}>
                            +
                          </button>
                        </div>

                        <div className="price">
                          Total: ${itemTotalCost.toFixed(2)}
                        </div>
                      </div>

                      <div style={{ marginTop: "0.75rem" }}>
                        <button className="btnDanger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cartSummary" style={{ marginTop: "1.25rem" }}>
            <div className="row">
              <button className="btnPrimary" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="btnSmall" onClick={onContinueShopping}>
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


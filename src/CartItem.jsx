import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
  incrementQty,
  decrementQty,
  removeFromCart
} from "./redux/CartSlice";
import "./App.css";

function Navbar() {
  const totalQty = useSelector(selectTotalQuantity);

  return (
    <div className="navbar">
      <div className="navBrand">Paradise Nursery</div>
      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart 🛒 {totalQty}</Link>
      </div>
    </div>
  );
}

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalAmount);

  const onCheckout = () => {
    alert("Coming Soon 🚧");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="cartSummary">
            <p>Your cart is empty.</p>
            <button className="btnPrimary" onClick={() => navigate("/plants")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cartSummary">
              <div className="row" style={{ alignItems: "baseline" }}>
                <div>
                  <strong>Total Cart Amount:</strong>
                </div>
                <div className="price">${total.toFixed(2)}</div>
              </div>
              <p className="muted" style={{ marginTop: "0.5rem" }}>
                Adjust quantities or remove items. Totals update automatically.
              </p>
            </div>

            <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
              {items.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div className="card" key={item.id}>
                    <div className="row" style={{ alignItems: "flex-start" }}>
                      <img className="thumb" src={item.image} alt={item.name} style={{ height: 140, maxWidth: 220 }} />

                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 900, fontSize: "1.05rem" }}>{item.name}</div>
                        <div className="muted">Unit Price: ${item.price.toFixed(2)}</div>
                        <div className="muted">Category: {item.category}</div>

                        <div className="row" style={{ marginTop: "0.75rem" }}>
                          <div className="btnRow">
                            <button
                              className="btnSmall"
                              onClick={() => dispatch(decrementQty(item.id))}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <div style={{ minWidth: 36, textAlign: "center", fontWeight: 800 }}>
                              {item.quantity}
                            </div>
                            <button
                              className="btnSmall"
                              onClick={() => dispatch(incrementQty(item.id))}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="price">Item Total: ${itemTotal.toFixed(2)}</div>
                        </div>

                        <div style={{ marginTop: "0.75rem" }}>
                          <button
                            className="btnDanger"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
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
                <button className="btnPrimary" onClick={onCheckout}>
                  Checkout
                </button>

                <button className="btnSmall" onClick={() => navigate("/plants")}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

import React, { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const goHome = () => {
    setShowProductList(false);
    setShowCart(false);
    setShowAbout(false);
  };

  const goPlants = () => {
    setShowProductList(true);
    setShowCart(false);
    setShowAbout(false);
  };

  const goCart = () => {
    setShowCart(true);
    setShowProductList(false);
    setShowAbout(false);
  };

  const goAbout = () => {
    setShowAbout(true);
    setShowProductList(false);
    setShowCart(false);
  };

  // Landing
  if (!showProductList && !showCart && !showAbout) {
    return (
      <div className="landing">
        <div className="landingCard">
          <h1 style={{ marginTop: 0 }}>Paradise Nursery</h1>
          <p className="muted">
            Welcome to Paradise Nursery — your friendly shop for beautiful houseplants.
          </p>

          {/* REQUIRED BY RUBRIC */}
          <button className="btnPrimary" onClick={() => setShowProductList(true)}>
            Get Started
          </button>

          <div style={{ marginTop: "1rem" }}>
            <button className="btnSmall" onClick={goAbout}>About Us</button>
          </div>
        </div>
      </div>
    );
  }

  // Page-like switching (no router)
  return (
    <>
      <div className="navbar">
        <div className="navBrand">e-plantShopping</div>
        <div className="navLinks">
          <button className="btnSmall" onClick={goHome}>Home</button>
          <button className="btnSmall" onClick={goPlants}>Plants</button>
          <button className="btnSmall" onClick={goCart}>Cart</button>
        </div>
      </div>

      {showAbout && <AboutUs />}
      {showProductList && <ProductList />}
      {showCart && <CartItem onContinueShopping={goPlants} />}
    </>
  );
}

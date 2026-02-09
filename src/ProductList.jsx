import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems, selectTotalQuantity } from "./redux/CartSlice";
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

const PLANTS = [
  // Low Light (6)
  { id: "ll-1", category: "Low Light", name: "ZZ Plant", price: 24.99, image: "https://images.unsplash.com/photo-1614594858509-8d0b5f8573c5?auto=format&fit=crop&w=800&q=80" },
  { id: "ll-2", category: "Low Light", name: "Snake Plant", price: 19.99, image: "https://images.unsplash.com/photo-1614594895301-1b845a70d820?auto=format&fit=crop&w=800&q=80" },
  { id: "ll-3", category: "Low Light", name: "Pothos", price: 14.99, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80" },
  { id: "ll-4", category: "Low Light", name: "Peace Lily", price: 21.99, image: "https://images.unsplash.com/photo-1615486363874-3c2efc6a4c0a?auto=format&fit=crop&w=800&q=80" },
  { id: "ll-5", category: "Low Light", name: "Cast Iron Plant", price: 28.99, image: "https://images.unsplash.com/photo-1615486364307-1db7a4f1e5e2?auto=format&fit=crop&w=800&q=80" },
  { id: "ll-6", category: "Low Light", name: "Chinese Evergreen", price: 23.99, image: "https://images.unsplash.com/photo-1615486364405-1aa3b9c4f9a6?auto=format&fit=crop&w=800&q=80" },

  // Easy Care (6)
  { id: "ec-1", category: "Easy Care", name: "Spider Plant", price: 12.99, image: "https://images.unsplash.com/photo-1587500154541-1cafd74f0efc?auto=format&fit=crop&w=800&q=80" },
  { id: "ec-2", category: "Easy Care", name: "Aloe Vera", price: 13.99, image: "https://images.unsplash.com/photo-1611077546841-1f3b9d0a4e6f?auto=format&fit=crop&w=800&q=80" },
  { id: "ec-3", category: "Easy Care", name: "Rubber Plant", price: 26.99, image: "https://images.unsplash.com/photo-1614594902447-0b5e4e7b4c2b?auto=format&fit=crop&w=800&q=80" },
  { id: "ec-4", category: "Easy Care", name: "Jade Plant", price: 17.99, image: "https://images.unsplash.com/photo-1611077546845-5f8d64d0fa4e?auto=format&fit=crop&w=800&q=80" },
  { id: "ec-5", category: "Easy Care", name: "Philodendron", price: 18.99, image: "https://images.unsplash.com/photo-1614594901751-f10b9d7c1d12?auto=format&fit=crop&w=800&q=80" },
  { id: "ec-6", category: "Easy Care", name: "Dracaena", price: 22.99, image: "https://images.unsplash.com/photo-1614594900406-4f3f3f2ed18b?auto=format&fit=crop&w=800&q=80" },

  // Pet Friendly (6)
  { id: "pf-1", category: "Pet Friendly", name: "Areca Palm", price: 29.99, image: "https://images.unsplash.com/photo-1615486364671-0a742d89f5cb?auto=format&fit=crop&w=800&q=80" },
  { id: "pf-2", category: "Pet Friendly", name: "Calathea", price: 25.99, image: "https://images.unsplash.com/photo-1615486364588-1a1c4f84c2c8?auto=format&fit=crop&w=800&q=80" },
  { id: "pf-3", category: "Pet Friendly", name: "Prayer Plant", price: 19.49, image: "https://images.unsplash.com/photo-1615486364716-2d7f5e3ab3fd?auto=format&fit=crop&w=800&q=80" },
  { id: "pf-4", category: "Pet Friendly", name: "Bamboo Palm", price: 27.49, image: "https://images.unsplash.com/photo-1615486364933-9f5f6a7a2dc1?auto=format&fit=crop&w=800&q=80" },
  { id: "pf-5", category: "Pet Friendly", name: "Peperomia", price: 15.99, image: "https://images.unsplash.com/photo-1615486364560-0d6b6fb2e2ef?auto=format&fit=crop&w=800&q=80" },
  { id: "pf-6", category: "Pet Friendly", name: "Polka Dot Plant", price: 11.99, image: "https://images.unsplash.com/photo-1615486364660-1e8c5a2890c1?auto=format&fit=crop&w=800&q=80" }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const inCartSet = useMemo(() => {
    return new Set(cartItems.map((i) => i.id));
  }, [cartItems]);

  const grouped = useMemo(() => {
    return PLANTS.reduce((acc, plant) => {
      acc[plant.category] = acc[plant.category] || [];
      acc[plant.category].push(plant);
      return acc;
    }, {});
  }, []);

  const handleAdd = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Plants</h1>
        <p className="muted">
          Browse by category and add items to your cart. “Add to Cart” disables after adding.
        </p>

        {Object.entries(grouped).map(([category, plants]) => (
          <div key={category}>
            <h2 className="categoryTitle">{category}</h2>
            <div className="grid">
              {plants.map((plant) => {
                const alreadyAdded = inCartSet.has(plant.id);
                return (
                  <div className="card" key={plant.id}>
                    <img className="thumb" src={plant.image} alt={plant.name} />
                    <div className="row">
                      <div style={{ fontWeight: 800 }}>{plant.name}</div>
                      <div className="price">${plant.price.toFixed(2)}</div>
                    </div>

                    <button
                      className="btnPrimary"
                      onClick={() => handleAdd(plant)}
                      disabled={alreadyAdded}
                      title={alreadyAdded ? "Already in cart" : "Add to cart"}
                    >
                      {alreadyAdded ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


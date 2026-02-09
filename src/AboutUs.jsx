
---

## Task 2 — `src/AboutUs.jsx`
```jsx
import React from "react";

export default function AboutUs() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1>About Paradise Nursery</h1>
      <p>
        Welcome to <strong>Paradise Nursery</strong> — your friendly neighborhood
        destination for beautiful, healthy houseplants. We believe plants make
        every space calmer, cleaner, and more inspiring.
      </p>

      <p>
        Our mission is simple: help you find the right plant for your home and
        give you the confidence to care for it. Whether you’re just starting out
        or building a jungle in your living room, we’ve got something for you.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Curated indoor plants grouped by category</li>
        <li>Easy shopping with a simple, reliable cart experience</li>
        <li>Plant selections designed for real life (low light, low maintenance, etc.)</li>
      </ul>

      <p>
        Thanks for visiting Paradise Nursery — let’s grow something great
        together.
      </p>
    </div>
  );
}


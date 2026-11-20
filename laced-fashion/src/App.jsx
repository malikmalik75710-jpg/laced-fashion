
import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Premium #000000 Sneakers", category: "Shoes", price: 4500, old: 6000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700" },
  { id: 2, name: "Classic Street Sneakers", category: "Shoes", price: 5200, old: 6800, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700" },
  { id: 3, name: "Luxury Black Shirt", category: "Shirts", price: 2800, old: 3500, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700" },
  { id: 4, name: "Casual #000000 Shirt", category: "Shirts", price: 2500, old: 3200, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=700" },
  { id: 5, name: "Baggy Denim Jeans", category: "Jeans", price: 4200, old: 5500, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=700" },
  { id: 6, name: "Streetwear Jacket", category: "Jackets", price: 6500, old: 8000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700" },
  { id: 7, name: "Gurkha Style Pants", category: "Pants", price: 3800, old: 4800, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700" },
  { id: 8, name: "Premium Fashion Bag", category: "Bags", price: 3500, old: 4500, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700" },
  { id: 9, name: "Modern Running Shoes", category: "Shoes", price: 4900, old: 6200, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700" },
  { id: 10, name: "Urban Cargo Pants", category: "Pants", price: 3900, old: 5000, image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=700" },
  { id: 11, name: "Oversized Hoodie", category: "Shirts", price: 3200, old: 4200, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700" },
  { id: 12, name: "Classic Shoulder Bag", category: "Bags", price: 2900, old: 3800, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700" }
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = product => {
    setCart(old => [...old, product]);
    setMessage("Product added to your bag!");
  };

  const toggleWishlist = id => {
    setWishlist(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  };

  const placeOrder = () => {
    if (!cart.length) return setMessage("Your bag is empty!");
    setOrders(old => [...old, ...cart]);
    setCart([]);
    setMessage("Your order has been placed!");
  };

  const cancelOrder = index => {
    setOrders(old => old.filter((_, i) => i !== index));
    setMessage("Order cancelled.");
  };

  const money = amount => "Rs. " + amount.toLocaleString("en-PK");

  return (
    <div>
      <header className="navbar">
        <a href="#" className="logo">LACED<span>.</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#cart" className="cart-link">BAG ({cart.length})</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">THE NEW FASHION DESTINATION</p>
          <h1>STYLE THAT<br /><i>SETS YOU APART.</i></h1>
          <p>Discover premium streetwear, footwear and everyday essentials.</p>
          <a href="#shop" className="hero-btn">EXPLORE COLLECTION ↗</a>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1100" alt="Fashion model" />
          <span className="image-tag">NEW SEASON / 2026</span>
        </div>
      </section>

      <section className="benefits">
        <span>✦ PREMIUM QUALITY</span>
        <span>✦ LATEST COLLECTION</span>
        <span>✦ DELIVERY AVAILABLE</span>
        <span>✦ GREAT PRICES</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED FOR YOUR STYLE</p>
            <h2>THE COLLECTION<span>.</span></h2>
          </div>
          <input
            className="search"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          {["All", "Shoes", "Shirts", "Pants", "Jeans", "Jackets", "Bags"].map(c =>
            <button key={c} onClick={() => setCategory(c)}
              className={category === c ? "filter active" : "filter"}>{c}</button>
          )}
        </div>

        {message && <p className="notice">{message}</p>}

        <div className="product-grid">
          {filtered.map(p => (
            <article className="product-card" key={p.id}>
              <div className="product-image">
                <img src={p.image} alt={p.name} />
                <button className="heart" onClick={() => toggleWishlist(p.id)}>
                  {wishlist.includes(p.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="product-info">
                <span className="category-label">{p.category}</span>
                <h3>{p.name}</h3>
                <p className="price">{money(p.price)} <del>{money(p.old)}</del></p>
                <button className="order-btn" onClick={() => addToCart(p)}>ADD TO BAG +</button>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p>No products found.</p>}
      </section>

      <section className="cart-section" id="cart">
        <p className="eyebrow">YOUR SELECTION</p>
        <h2>YOUR SHOPPING BAG<span>.</span></h2>
        {cart.length === 0 ? <p>Your shopping bag is currently empty.</p> : (
          <>
            {cart.map((p, i) => (
              <div className="cart-item" key={i}>
                <span>{p.name}</span>
                <strong>{money(p.price)}</strong>
                <button className="remove-btn" onClick={() => setCart(old => old.filter((_, n) => n !== i))}>Remove</button>
              </div>
            ))}
            <h3>Total: {money(cart.reduce((sum, p) => sum + p.price, 0))}</h3>
            <button className="order-btn checkout" onClick={placeOrder}>PLACE ORDER</button>
          </>
        )}
      </section>

      <section className="orders-section">
        <p className="eyebrow">ORDER MANAGEMENT</p>
        <h2>YOUR ORDERS<span>.</span></h2>
        {orders.length === 0 ? <p>No orders placed yet.</p> : orders.map((p, i) => (
          <div className="cart-item" key={i}>
            <span>{p.name} — {money(p.price)}</span>
            <button className="cancel-btn" onClick={() => cancelOrder(i)}>CANCEL ORDER</button>
          </div>
        ))}
      </section>

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">MORE THAN JUST CLOTHING</p>
          <h2>WEAR YOUR<br /><i>CONFIDENCE.</i></h2>
        </div>
        <p>LACED brings together modern streetwear and timeless everyday fashion. Find your style, make it yours.</p>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <h2 className="logo">LACED<span>.</span></h2>
          <p>YOUR STYLE. YOUR STATEMENT.</p>
        </div>
        <div className="contact-details">
          <p>CONTACT: Malik Hussnain</p>
          <p>PHONE: 03078888550</p>
          <p>EMAIL: HUSSNAINMALIK740@GMAIL.COM</p>
          <a href="https://wa.me/923078888550" target="_blank" rel="noreferrer">CONTACT ON WHATSAPP ↗</a>
        </div>
        <p className="copyright">© 2026 LACED FASHION. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default App;

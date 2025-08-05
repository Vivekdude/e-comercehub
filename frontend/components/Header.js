import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [search, setSearch] = useState("");
  const categories = ["Electronics", "Fashion", "Home", "Books"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search navigation here if needed
  };

  return (
    <header className="header">
      <div className="top">
        <Link href="/" className="logo">
          E-Commerce Hub
        </Link>
        <form onSubmit={handleSubmit} className="search">
          <input
            type="text"
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="icons">
          <Link href="/cart" aria-label="Cart">
            🛒
          </Link>
          <Link href="/login" aria-label="User">
            👤
          </Link>
        </div>
      </div>
      <nav className="categories">
        {categories.map((c) => (
          <Link key={c} href={`/products?category=${encodeURIComponent(c)}`}>
            {c}
          </Link>
        ))}
      </nav>
    </header>
  );
}

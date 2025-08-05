import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const featured = products.slice(0, 4);

  return (
    <div>
      <h1>E-Commerce Hub</h1>
      <section>
        <h2>Featured Products</h2>
        <ul>
          {featured.map((product) => (
            <li key={product._id}>
              <Link href={`/product/${product._id}`}>{product.name}</Link> - ${product.price}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>
      <Link href="/products">View All Products</Link>
    </div>
  );
}

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const filtered = products.filter(
    (p) => category === "all" || p.category === category
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label>Filter by category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label style={{ marginLeft: "1rem" }}>Sort by price: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">None</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>
      <ul>
        {sorted.map((product) => (
          <li key={product._id}>
            <Link href={`/product/${product._id}`}>{product.name}</Link> - ${
              product.price
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
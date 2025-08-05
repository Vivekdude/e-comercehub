import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("none");
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const maxPrice = data.length ? Math.max(...data.map((p) => p.price)) : 0;
        setPriceRange([0, maxPrice]);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products.filter((p) => {
    const inCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return inCategory && inPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const maxPriceValue = products.length
    ? Math.max(...products.map((p) => p.price))
    : 0;

  return (
    <div className={styles.productsPage}>
      <aside className={styles.sidebar}>
        <div className={styles.filterCard}>
          <h3>Categories</h3>
          {categories.map((c) => (
            <label key={c} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() => handleCategoryChange(c)}
              />
              {c}
            </label>
          ))}
        </div>

        <div className={styles.filterCard}>
          <h3>Price</h3>
          <div className={styles.sliderGroup}>
            <input
              type="range"
              min="0"
              max={maxPriceValue}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className={styles.slider}
            />
            <input
              type="range"
              min="0"
              max={maxPriceValue}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className={styles.slider}
            />
            <span>
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>

        <div className={styles.filterCard}>
          <h3>Sort by price</h3>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="price-asc">Low to High</option>
            <option value="price-desc">High to Low</option>
          </select>
        </div>
      </aside>

      <section className={styles.grid}>
        {sorted.map((product) => {
          const averageRating =
            product.reviews && product.reviews.length
              ? (
                  product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                  product.reviews.length
                ).toFixed(1)
              : "No ratings";
          const discount = product.discount || product.discountPercentage;
          return (
            <div key={product._id} className={styles.productCard}>
              <img
                src={
                  product.images && product.images[0]
                    ? product.images[0]
                    : "/placeholder.png"
                }
                alt={product.name}
                className={styles.productImage}
              />
              <Link href={`/product/${product._id}`}>{product.name}</Link>
              <div className={styles.priceSection}>
                <span className={styles.price}>${product.price}</span>
                {discount && (
                  <span className={styles.discount}>{discount}% off</span>
                )}
              </div>
              <div className={styles.rating}>
                {averageRating}
                {averageRating !== "No ratings" && " ★"}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

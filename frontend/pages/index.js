import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );
  const featured = products.slice(0, 4);

  const banners = [
    "https://via.placeholder.com/800x300?text=Banner+1",
    "https://via.placeholder.com/800x300?text=Banner+2",
    "https://via.placeholder.com/800x300?text=Banner+3",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % banners.length),
      3000
    );
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {banners.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Banner ${idx + 1}`}
            className={`${styles.slide} ${
              idx === currentSlide ? styles.active : ""
            }`}
          />
        ))}
      </div>

      <section className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div key={category} className={styles.categoryTile}>
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.featuredGrid}>
          {featured.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className={styles.card}
            >
              <img
                src={
                  product.images?.[0] ||
                  "https://via.placeholder.com/200?text=No+Image"
                }
                alt={product.name}
                className={styles.cardImage}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardPrice}>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link href="/products" className={styles.viewAll}>
        View All Products
      </Link>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/productDetail.module.css";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      })
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  if (!product) return <div>Loading...</div>;

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  const discountPercent = 10;
  const originalPrice = (
    product.price / (1 - discountPercent / 100)
  ).toFixed(2);

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImageWrapper}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
            />
          )}
        </div>
        <div className={styles.thumbnails}>
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className={styles.thumbnail}
              onMouseEnter={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.rating}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={styles.star}>
              {i < Math.round(avgRating) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.price}>₹{product.price}</span>
          <span className={styles.originalPrice}>₹{originalPrice}</span>
          <span className={styles.discountBadge}>{discountPercent}% off</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          <button className={styles.addToCart} onClick={addToCart}>
            Add to Cart
          </button>
          <button className={styles.buyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

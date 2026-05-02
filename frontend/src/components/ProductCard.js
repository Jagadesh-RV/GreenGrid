export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
    </div>
  );
}
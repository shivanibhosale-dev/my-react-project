import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatUSD, formatINR } from "../utils/currency";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const productInCart = cartItems.find(
    (item) => item.id === product.id
  );

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="page">

      <div className="container">

        <div className="product-detail">

          <div className="product-detail-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="product-detail-content">

            <h1 className="product-detail-name">
              {product.name}
            </h1>

            <div className="product-detail-price">
              <div>{formatUSD(product.price)}</div>

              <div className="price-inr">
                {formatINR(product.price)}
              </div>
            </div>

            <p className="product-detail-description">
              {product.description}
            </p>

            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantityLabel}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
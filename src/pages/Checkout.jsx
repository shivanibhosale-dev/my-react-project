import { useCart } from "../context/CartContext";
import { formatUSD, formatINR } from "../utils/currency";

export default function Checkout() {
  const {
    getCartItemsWithProducts,
    addToCart,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  const cartItems = getCartItemsWithProducts();

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <div className="page">

      <div className="container">

        <h1 className="page-title">
          Checkout
        </h1>

        <div className="checkout-container">

          {/* LEFT SIDE */}

          <div className="checkout-items">

            <h2 className="checkout-section-title">
              Order Summary
            </h2>

            {cartItems.map((item) => {

              const productTotal =
                item.product.price * item.quantity;

              return (
                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-product">

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="checkout-item-image"
                    />

                    <div className="checkout-item-details">

                      <div className="checkout-item-name">
                        {item.product.name}
                      </div>

                      <div className="checkout-item-price">
                        {formatUSD(item.product.price)} each
                      </div>

                      <div className="checkout-item-price price-inr">
                        {formatINR(item.product.price)} each
                      </div>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}

                  <div className="checkout-actions">

                    <div className="quantity-controls">

                      <button
                        className="quantity-button"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span className="quantity-number">
                        {item.quantity}
                      </span>

                      <button
                        className="quantity-button"
                        onClick={() =>
                          addToCart(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <div className="checkout-total-box">

                      <span>Total</span>

                      <strong>
                        {formatUSD(productTotal)}
                      </strong>

                      <strong className="price-inr">
                        {formatINR(productTotal)}
                      </strong>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* RIGHT SIDE */}

          <div className="order-total-box">

            <h2>
              Order Total
            </h2>

            <div className="total-row">

              <span>
                Subtotal
              </span>

              <div>
                <strong>
                  {formatUSD(subtotal)}
                </strong>

                <br />

                <strong className="price-inr">
                  {formatINR(subtotal)}
                </strong>
              </div>

            </div>

            <div className="total-row">

              <span>
                Total
              </span>

              <div>
                <strong>
                  {formatUSD(total)}
                </strong>

                <br />

                <strong className="price-inr">
                  {formatINR(total)}
                </strong>
              </div>

            </div>

            <button className="place-order-button">
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { useSelector } from "react-redux";
import { APIHost } from "../../API";
import { useEffect } from "react";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const hasSearched = useSelector((state) => state.searchpro.hasSearched);
  const searchResults = useSelector((state) => state.searchpro.searchResults);

  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate ).toFixed(2);
  const dispatch = useDispatch();

  const [sellingTime, setSellingTime] = useState("");
// console.log("enddddddddddddddddddddddddddddddddddd",product?.FlashDeal?.endTime)
  // useEffect(() => {
  //   const fetchSellingTime = async () => {
  //     try {
  //       const response = await fetch(`${APIHost}/api/order`);
  //       const data = await response.json();

  //       const currentTime = new Date();
  //       const order = data.find((order) =>
  //         order.orderItems.some((item) => item.productId === product.id)
  //       );
  //       if (order) {
  //         const orderCreatedAt = new Date(order.createdAt);
  //         const timeDifference = currentTime - orderCreatedAt;
  //         let sellingTime;
  //         if (timeDifference < 60 * 1000) {
  //           sellingTime = "just now";
  //         } else if (timeDifference < 60 * 60 * 1000) {
  //           const minutes = Math.floor(timeDifference / (60 * 1000));
  //           sellingTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  //         } else if (timeDifference < 24 * 60 * 60 * 1000) {
  //           const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  //           sellingTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  //         } else {
  //           const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  //           sellingTime = `${days} day${days > 1 ? "s" : ""} ago`;
  //         }
  //         setSellingTime(sellingTime);
  //         console.log("sellingggggg",sellingTime);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching selling time:", error);
  //     }
  //   };

  //   fetchSellingTime();
  // }, [product.id]);

  useEffect(() => {
    const fetchSellingTime = async () => {
      try {
        const response = await fetch(`${APIHost}/api/order`);
        const data = await response.json();

        const currentTime = new Date();
        const latestOrder = data
          .filter((order) =>
            order.orderItems.some((item) => item.productId === product.id)
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        if (latestOrder) {
          const orderCreatedAt = new Date(latestOrder.createdAt);
          const timeDifference = currentTime - orderCreatedAt;
          let sellingTime;
          if (timeDifference < 60 * 1000) {
            sellingTime = "just now";
          } else if (timeDifference < 60 * 60 * 1000) {
            const minutes = Math.floor(timeDifference / (60 * 1000));
            sellingTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
          } else if (timeDifference < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(timeDifference / (60 * 60 * 1000));
            sellingTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
          } else {
            const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
            sellingTime = `${days} day${days > 1 ? "s" : ""} ago`;
          }
          setSellingTime(sellingTime);
          // console.log("sellingggggg",sellingTime);
        }
      } catch (error) {
        console.error("Error fetching selling time:", error);
      }
    };

    fetchSellingTime();

    // Set up a timer to fetch selling time every minute
    const interval = setInterval(fetchSellingTime, 60000);
    return () => clearInterval(interval);
  }, [product.id]);

 // Use the endTime from your API response

//  const [timeLeft, setTimeLeft] = useState(0);

//   useEffect(() => {
//     const endTime = new Date(product.FlashDeal.endTime).getTime();
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const timeLeft = endTime - now;
//       setTimeLeft(timeLeft);
//       console.log("remaning TImeeeee",timeLeft);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [product.FlashDeal.endTime]);

//   const formatTime = (time) => {
//     if (time < 0) {
//       return 'Sale ended';
//     }

//     const days = Math.floor(time / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((time % (1000 * 60)) / 1000);

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };




  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img ">
          <Link
            to={process.env.PUBLIC_URL + "/product-tab-right/" + product.id}
          >
            {product?.productImages?.[0]?.images?.[0] ? (
              <img
                className="default-img"
                src={`${APIHost}${product?.productImages?.[0]?.images?.[0]}`}
                alt="Product"
              />
            ) : (
              <img
                className="default-img"
                src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg"
                alt="Dummy Image"
              />
            )}

            {product.productImages.length > 1 ? (
              <img
                className="hover-img"
                src={`${APIHost}${product?.productImages[0]?.images[0]}`}
                alt="Product Hover"
              />
            ) : (
              ""
            )}
          </Link>

          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}
          {/* {console.log()} */}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {sellingTime && <p>Sold {sellingTime}</p>}</div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            { product.SalePrice !== 0 ? (
              <Fragment>
                <span style={{background:"#CC0C39",color:"white", marginRight:"50px",padding:"2px",borderRadius:"2px"}}>{product.discount} % off </span>
                <span></span>
                <br></br>
                <span>{currency.currencySymbol  + product.SalePrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;

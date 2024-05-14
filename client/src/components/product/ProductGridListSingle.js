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

  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();

  const [sellingTime, setSellingTime] = useState("");

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

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let flashDeal = product.FlashDeal;

    // Check if FlashDeal is an array, if yes, find the deal with the matching DealId
    if (Array.isArray(product.FlashDeal)) {
      flashDeal = product.FlashDeal.find(
        (deal) => deal.DealId === product.DealId
      );
    }

    if (!flashDeal) {
      setRemainingTime("");
      return;
    }

    // const calculateRemainingTime = () => {
    //   const startTime = new Date(product?.FlashDeal?.startTime);
    //   const endTime = new Date(product?.FlashDeal?.endTime);
     
    //   const currentTime = new Date();

    //   const startTimeDifference = startTime - currentTime;

    //   if (startTimeDifference > 0) {
    //     const startHours = Math.floor(
    //       (startTimeDifference / (1000 * 60 * 60)) % 24
    //     );
    //     const startMinutes = Math.floor(
    //       (startTimeDifference / (1000 * 60)) % 60
    //     );
    //     const startSeconds = Math.floor((startTimeDifference / 1000) % 60);
    //     setRemainingTime(` ${startHours} : ${startMinutes} : ${startSeconds} `);
    //   } else {
    //     const timeDifference = endTime - currentTime;
    //     if (timeDifference > 0) {
    //       const remainingHours = Math.floor(
    //         (timeDifference / (1000 * 60 * 60)) % 24
    //       );
    //       const remainingMinutes = Math.floor(
    //         (timeDifference / (1000 * 60)) % 60
    //       );
    //       const remainingSeconds = Math.floor((timeDifference / 1000) % 60);
    //       setRemainingTime( `${remainingHours} : ${remainingMinutes} : ${remainingSeconds}`);
    //     } else {
    //       setRemainingTime("Deal expired");
    //     }
    //   }
    // };
    const calculateRemainingTime = () => {
      const startTime = new Date(product?.FlashDeal?.startTime);
      const endTime = new Date(product?.FlashDeal?.endTime);
      const currentTime = new Date();
    
      const startTimeDifference = startTime - currentTime;
    
      if (startTimeDifference > 0) {
        const startHours = String(Math.floor((startTimeDifference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const startMinutes = String(Math.floor((startTimeDifference / (1000 * 60)) % 60)).padStart(2, '0');
        const startSeconds = String(Math.floor((startTimeDifference / 1000) % 60)).padStart(2, '0');
        setRemainingTime(`${startHours}:${startMinutes}:${startSeconds}`);
      } else {
        const timeDifference = endTime - currentTime;
        if (timeDifference > 0) {
          const remainingHours = String(Math.floor((timeDifference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
          const remainingMinutes = String(Math.floor((timeDifference / (1000 * 60)) % 60)).padStart(2, '0');
          const remainingSeconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
          setRemainingTime(`${remainingHours}:${remainingMinutes}:${remainingSeconds}`);
        } else {
          setRemainingTime("Deal expired");
        }
      }
    };
    

    calculateRemainingTime(); // Initial call to calculate remaining time

    const timer = setInterval(() => {
      calculateRemainingTime(); // Update remaining time every second
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [product]);

  // console.log('Remaining Time:', new Date());

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
        {remainingTime.length>0?(
        <div style={{background:"#fef2f2"}}>
          {remainingTime !== null ? (
            <span className="">Lightning deal | {remainingTime}</span>
          ) : (
            ""
          )}
        </div>
  ):(
    ""
  )}
        <div className="product-content d-flex">
          <div className="product-price">
            {product.SalePrice !== 0 ? (
              <Fragment>
                <span>{currency.currencySymbol + product.SalePrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )}
          </div>
          <div>{sellingTime && <p>Sold {sellingTime}</p>}</div>
          <div>
            {product.discount!==0  && product.SalePrice?(
          <span
                  style={{
                    marginLeft:"10px",
                    padding:"0 4px",
                    color: "rgb(251, 119, 1)",
                    border:"1px solid rgb(251, 119, 1)",
                    borderRadius: "2px",
                    alignItems:"center",
                  }}
                >
                  {product.discount} % {" "}
                </span>
            ):(
              ""
            )}
          </div>
        </div>
          <div className="product-content">
          <h3 style={{lineHeight:"15px"}}>
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

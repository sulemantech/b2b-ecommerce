import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { logoutAsync } from "../../store/slices/Auth-Action";
import { APIHost } from "../../API";

const Cart = () => {
  let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logoutAsync(authToken));
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-15 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                {/* <div></div> */}
                <div className="row">
                  <div className="col-12 border p-3 rounded">
                    <h3 className="cart-page-title">Your cart items</h3>
                    {cartItems.map((cartItem, key) => {
                      const discountedPrice = getDiscountPrice(
                        cartItem.price,
                        cartItem.discount
                      );
                      const finalProductPrice = (
                        cartItem.price * currency.currencyRate
                      ).toFixed(2);
                      const finalDiscountedPrice = (
                        discountedPrice * currency.currencyRate
                      ).toFixed(2);

                      discountedPrice != null
                        ? (cartTotalPrice +=
                            finalDiscountedPrice * cartItem.quantity)
                        : (cartTotalPrice +=
                            finalProductPrice * cartItem.quantity);

                      return (
                        <div key={key} className="d-flex pt-2 pb-2 border-top">
                          <div className="cart-img">
                            <Link
                              to={
                                process.env.PUBLIC_URL +
                                "/product/" +
                                cartItem.id
                              }
                            >
                              <img
                                className="img-fluid"
                                src={`${APIHost}${cartItem?.productImages[0].images} `}
                              />
                            </Link>
                          </div>
                          <div className=" p-2 ml-5 d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-column flex-grow-1">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    cartItem.id
                                  }
                                >
                                  {cartItem.name}
                                </Link>
                              </div>
                              <div className="product-delete">
                                <button
                                  onClick={() =>
                                    dispatch(
                                      deleteFromCart(cartItem.cartItemId)
                                    )
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                            <div className="variant-btn">
                              <button>Size</button>
                            </div>

                            <div className=" d-flex justify-content-betweend-flex">
                              <div className="d-flex flex-column flex-grow-1">

                              <div className="product-price-car">
                                {discountedPrice !== null ? (
                                  <Fragment>
                                    <span className="amount old">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalDiscountedPrice}
                                    </span>
                                  </Fragment>
                                ) : (
                                  <span className="amount">
                                    {currency.currencySymbol +
                                      finalProductPrice}
                                  </span>
                                )}
                              </div>
                              </div>
                                <div className="product-quantity ">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(decreaseQuantity(cartItem))
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...cartItem,
                                            quantity: quantityCount,
                                          })
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                            </div>

                            <div></div>
                          </div>
                        </div>
                      );
                    })}
                    {/* <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>stock</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        `${APIHost}${cartItem?.productImages[0].images
                                         } `}
                                     
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                  cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(decreaseQuantity(cartItem))
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(addToCart({
                                          ...cartItem,
                                          quantity: quantityCount
                                        }))
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td>{cartItem.stock}</td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice * cartItem.quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(deleteFromCart(cartItem.cartItemId))
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-lg-4 col-md-12 text-white"></div>
                  <div className="col-lg-4 col-md-12 text-white"></div> */}
                  <div className="col-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      {isLoggedIn ? (
                        <Link to={process.env.PUBLIC_URL + "/checkout"}>
                          Proceed to Checkout
                        </Link>
                      ) : (
                        <Link to={process.env.PUBLIC_URL + "/login-register"}>
                          Proceed to Checkout
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;

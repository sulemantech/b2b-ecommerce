import { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from 'axios';
import { useEffect, useState } from "react";

const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const storedToken = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);

/////////////////////////////////////
const [orderPlaced, setOrderPlaced] = useState(false);
console.log(cartItems);
const handlePlaceOrder = async () => {
  // Assuming you have the user's token stored in localStorage or any other way
 
console.log(storedToken);
  // Assuming your backend API endpoint is 'https://your-backend-api.com/placeOrder'
  const backendApiUrl = 'http://localhost:5001/api/order/';

  // Extracting cart items data from the frontend code
  const cartItemsData = cartItems.map(cartItem => ({
    address: cartItem.name,
    quantity: cartItem.quantity,
    price: cartItem.price,
    discount: cartItem.discount,
    totalPrice: currency.currencySymbol +
    cartTotalPrice.toFixed(2)
  }));

  console.log("cart items data1",cartItemsData);

  // Building the request payload
  const requestData = {
    // orderDetails: {
    //   // Include any other relevant data from your frontend here
    //   totalPrice: currency.currencySymbol + cartTotalPrice.toFixed(2),
    // },
    cartItems: cartItemsData,
  };
  console.log("cartItemsDataloop",cartItemsData );

  // Configuring headers with the authorization token
  const headers = {
    Authorization: `Bearer ${storedToken}`,
    'Content-Type': 'application/json',
  };

  try {
    console.log("requested data", requestData.cartItems);
    // Sending the POST request to the backend API
    const response = await axios.post(backendApiUrl, requestData, { headers });

    // Handle the response from the backend as needed
    console.log('Order placed successfully:', response.data);
  } catch (error) {
    // Handle errors, such as network issues or backend errors
    console.error('Error placing order:', error.message);
  }
};



  // console.log("ccccccccccccccc",cartItems[0].name);
  //////////////
 

  const getUserInformation = async (storedToken) => {
    try {
      if (storedToken) {
        const response = await fetch('http://localhost:5001/api/signin/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('User Information:', data);
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching user information in myaccount:', error);
    }
  };
  /////////////////

  useEffect(() => {
    getUserInformation(storedToken);
    
  }, [storedToken]);
  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" name="" value={users.firstname} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" name="" value={users.lastname} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" name="" value={users.companyName} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="" value={users.address}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" name="" value={users.contactNumber} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" name="" value={users.email}/>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
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
                                console.log("finalDiscountedPrice",finalDiscountedPrice* cartItem.quantity);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                    <button className="btn-hover" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
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

export default Checkout;

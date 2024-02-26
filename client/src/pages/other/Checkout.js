import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { placeOrder } from "../../API";
import { getUserInformation } from "../../API";

const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const storedToken = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
console.log(cartItems);

const [formvalue,setvalue]= useState({
  zipCode:"",
  shippingAddress:"",
  additionalInfo:"",
  city:"",
  country:"",

})

  const handlePlaceOrder = async () => {
    const cartItemsData = cartItems.map((cartItem) => ({
      productId: cartItem.id,
      quantity: cartItem.quantity,
      price: cartItem.price,
      discount: cartItem.discount,
      totalPrice: (cartItem.price - cartItem.discount) * cartItem.quantity,
    }));

    const orderData = {
      address: users.address,
      totalPrice: 3,
      // status: "pending",
      discount: 5,
      paymentMethod: "Cash on delivery",
      trackingNumber: Math.floor(Math.random() * 1000000),
      orderItems: cartItemsData,
      name: users.firstname,
      lastName: users.lastname,
      country: formvalue.country,
      city: formvalue.city,
      zipCode: formvalue.zipCode,
      contactNumber: users.contactNumber,
      email: users.email,
      additionalInfo: formvalue.additionalInfo,
      shippingAddress: formvalue.shippingAddress,
    };

    try {
      const response = await placeOrder(storedToken, orderData);
      console.log("Order placed successfully:", response);
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserInformation(storedToken);
        setUsers(userData);
      } catch (error) {
      }
    };

    fetchUser(); 
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
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" name="" value={users.companyName} />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        {/* <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div> */}
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>shippingAddress</label>
                          <input
                            className="billing-address"
                            required
                            placeholder="House number and street name"
                            type="text"
                            onChange={(e)=>setvalue({...formvalue,shippingAddress: e.target.value})}
                            formvalue={formvalue.shippingAddress}
                            // name="" value={users.address}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>city</label>
                          <input type="text" 
                          placeholder="city"
                          onChange={(e)=>setvalue({...formvalue,city:e.target.value})}
                          formvalue={formvalue.city}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" 
                          onChange={(e)=>setvalue({...formvalue,country:e.target.value})}
                          formvalue={formvalue.country}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>zipCode</label>
                          <input type="text"    onChange={(e) =>
                                setvalue({ ...formvalue, zipCode: e.target.value })
                          }
                                formvalue={formvalue.zipCode}
                  />
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
                      <h4>additionalInfo</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          onChange={(e)=>setvalue({...formvalue,additionalInfo:e.target.value})}
                          formvalue={formvalue.additionalInfo}
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
                                  
                                  <span>
                                    {"hellllooo" + cartItem.id}

                                  </span>
                                  
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

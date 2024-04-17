import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { logoutAsync } from "../../store/slices/Auth-Action";
import { useState, useEffect } from "react";
import Editdata from "./sub-components/UpdateNotification";
// import { logoutAsync } from "../../store/slices/API";

const IconGroup = ({ iconWhiteClass }) => {
  const [notifi, setNotifi] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  const [notificationCount, setNotificationCount] = useState(null);

  const handleLogout = () => {
    dispatch(logoutAsync(authToken));
  };
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const notificatiohandker = () => {
    setNotifi(!notifi);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationResponse = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notifications/specific`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const notifications = await notificationResponse.json();
        // const notificationCount = notifications.length;
        console.log("NotificationCount", notificationCount);
        setNotificationCount(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [authToken]);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting  d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-Order"}>
                    My Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to={process.env.PUBLIC_URL + "/logout"}
                    onClick={handleLogout}
                  >
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i class="fa fa-bell position-relative border-0" aria-hidden="true">
            <span className="count-style">
              {notificationCount && notificationCount.length
                ? notificationCount.length
                : 0}
            </span>
          </i>
        </button>
        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              notificationCount &&
              notificationCount.map((notification) => (
              <Link to={`/product-tab-right/${notification.id}`}>
                <li key={notification.id}>
                  {notification.notificationType.typeName}
                </li>
                </Link>
              ))
            ) : (
              <li>no notification</li>
            )}
          </ul>
        </div>
        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              notificationCount &&
              notificationCount.map((notification) => (
              <Link to={`/product-tab-right/${notification.id}`}>
                <li key={notification.id}>
                  {notification.notificationType.typeName}
                </li>
                </Link>
              ))
            ) : (
              <li>no notification</li>
            )}
          </ul>
        </div>
      </div>
      <div>
            <Editdata />

      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;

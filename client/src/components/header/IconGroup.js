import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { logoutAsync } from "../../store/slices/Auth-Action";
import { useState, useEffect } from "react";
import Editdata from "./sub-components/UpdateNotification";
// import { logoutAsync } from "../../store/slices/API";
import { fetchNotifications } from "../../API";

const IconGroup = ({ iconWhiteClass }) => {
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

  

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const notifications = await fetchNotifications(authToken);
        setNotificationCount(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    getNotifications();
  }, [authToken]);
  
  return (
    <div className={clsx("header-right-wrap align-items-center mt-0", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block ml-0">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search m-0" />
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
      <div className="same-style account-setting  d-lg-block ml-0">
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
      <div className="same-style header-compare mt-1">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist mt-1">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block mt-1">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-none d-lg-block mt-1 mr-10">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i
            className="fa fa-bell position-relative border-0"
            aria-hidden="true"
          >
            <span className="count-style">
              {notificationCount && notificationCount.length
                ? notificationCount.filter(
                    (notification) => notification.is_read === false
                  ).length
                : 0}
            </span>
          </i>
        </button>

        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              Array.isArray(notificationCount) &&
              notificationCount.length > 0 ? (
                notificationCount.map((notification) => (
                  <li key={notification.id}>
                    <Editdata
                      name={notification.notificationType.typeName}
                      filteredData={notification}
                    />
                  </li>
                ))
              ) : (
                <li>no notification</li>
              )
            ) : (
              <li>no notification</li>
            )}
          </ul>
        </div>
      </div>
      <div></div>
      <div className="same-style cart-wrap d-block d-lg-none mt-1">
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

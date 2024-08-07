import { login, logout } from "./Auth-slice";
import { deleteAllFromCart } from "../slices/cart-slice";
import { deleteAllFromWishlist } from "./wishlist-slice";
import { post } from "../../API";

export const navigateAction = (navigate, path) => {
  navigate(path);
};

export const submitLoginAsync =
  (values, navigate, setError) => async (dispatch) => {
    try {
      const result = await post("/login", values);

      dispatch(
        login({ user: result.user, token: result.token, role: result.role })
      );
      console.log("Login successful:", result.token);
      navigate("/shop-grid-standard");

      const now = Date.now();
      const expirationTime24Hours = now + 24 * 60 * 60 * 1000;
      // Set a timeout to automatically log out the user after 24 hours
      const tokenExpirationTimeout = setTimeout(() => {
        dispatch(logout());
        localStorage.clear();
        dispatch(deleteAllFromCart());
        dispatch(deleteAllFromWishlist());
        console.log("Token expired. User logged out.");
      }, expirationTime24Hours - now);

      // Store the token expiration timeout in localStorage
      localStorage.setItem("tokenExpirationTimeout", tokenExpirationTimeout);
      // Redirect based on role
      if (result.role === "admin") {
        console.log("Login roleeee:", result.role);
        console.log("admin running");
      } else if (result.role === "supplier") {
        console.log("user running");
      }
    } catch (error) {
      console.error(
        "Internal Server Error in login:",
        error.response?.data?.message
      );
      setError(error.response?.data?.message || "An error occurred");
    }
  };

export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(logout());
    localStorage.clear();
    const tokenExpirationTimeout = localStorage.getItem(
      "tokenExpirationTimeout"
    );
    if (tokenExpirationTimeout) {
      clearTimeout(tokenExpirationTimeout);
      localStorage.removeItem("tokenExpirationTimeout");
    }

    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());

    // console.log("Logout successful:", result.success);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

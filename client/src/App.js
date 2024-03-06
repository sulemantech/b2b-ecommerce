import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./pages/other/Order";
import OrderSuccess from "./pages/other/SuccefullOrder";
import ShopPage from "./components/product/ShopPage";
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const Firebase = lazy(() => import("./pages/other/Firebase"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));
// import { logoutAsync } from "../src/store/slices/Auth-Action";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  // const handleLogout = () => {
  //   dispatch(logoutAsync(authToken));
  // };

  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route
              // path={process.env.PUBLIC_URL + "/"}
              // element={<HomeFashion/>}
              path={process.env.PUBLIC_URL + "/"}
              element={<ShopGridStandard />}
            />

            {/* product pages */}
            <Route
              path={process.env.PUBLIC_URL + "/product/:id"}
              element={<Product />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
              element={<ProductTabRight />}
            />

            {/* Shop pages */}
            <Route
              path={process.env.PUBLIC_URL + "/shop-grid-standard"}
              element={<ShopGridStandard />}
            />
            

            {/* Blog pages */}
            <Route
              path={process.env.PUBLIC_URL + "/blog-standard"}
              element={<BlogStandard />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
              element={<BlogNoSidebar />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
              element={<BlogRightSidebar />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-details-standard"}
              element={<BlogDetailsStandard />}
            />

            {/* Other pages */}
            <Route
              path={process.env.PUBLIC_URL + "/about"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/firebase"}
              element={<Firebase />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/my-account"}
              element={<MyAccount />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login-register"}
              element={<LoginRegister />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
            <Route
              path={process.env.PUBLIC_URL + "/wishlist"}
              element={<Wishlist />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/compare"}
              element={<Compare />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={
                isLoggedIn ?<Checkout /> : <Navigate to="/shop-grid-standard"/>}
            />

            <Route
              path={process.env.PUBLIC_URL + "/my-Order"}
              element={
                isLoggedIn ? <Order /> : <Navigate to="/shop-grid-standard" />
              }
            />
               <Route
              path={process.env.PUBLIC_URL + "/order/success"}
              element={< OrderSuccess/>}
            />
            <Route
              path={process.env.PUBLIC_URL + "/logout"}
              element={<LoginRegister />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;

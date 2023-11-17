import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = lazy(() => import("./pages/home/HomeFashionEight"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeFurnitureFour = lazy(() => import("./pages/home/HomeFurnitureFour"));
const HomeFurnitureFive = lazy(() => import("./pages/home/HomeFurnitureFive"));
const HomeFurnitureSix = lazy(() => import("./pages/home/HomeFurnitureSix"));
const HomeFurnitureSeven = lazy(() =>
  import("./pages/home/HomeFurnitureSeven")
);
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeElectronicsThree = lazy(() =>
  import("./pages/home/HomeElectronicsThree")
);
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
const HomeBookStoreTwo = lazy(() => import("./pages/home/HomeBookStoreTwo"));
const HomePlants = lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeFlowerShopTwo = lazy(() => import("./pages/home/HomeFlowerShopTwo"));
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));
const HomeMedicalEquipment = lazy(() =>
  import("./pages/home/HomeMedicalEquipment")
);
const HomeChristmas = lazy(() => import("./pages/home/HomeChristmas"));
const HomeBlackFriday = lazy(() => import("./pages/home/HomeBlackFriday"));
const HomeBlackFridayTwo = lazy(() =>
  import("./pages/home/HomeBlackFridayTwo")
);
const HomeValentinesDay = lazy(() => import("./pages/home/HomeValentinesDay"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
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
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
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
                path={process.env.PUBLIC_URL + "/"}
                element={<HomeFashion/>}
              />

              {/* Homepages */}
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion"}
                element={<HomeFashion/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-two"}
                element={<HomeFashionTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-three"}
                element={<HomeFashionThree/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-four"}
                element={<HomeFashionFour/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-five"}
                element={<HomeFashionFive/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-six"}
                element={<HomeFashionSix/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-seven"}
                element={<HomeFashionSeven/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion-eight"}
                element={<HomeFashionEight/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-kids-fashion"}
                element={<HomeKidsFashion/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-cosmetics"}
                element={<HomeCosmetics/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture"}
                element={<HomeFurniture/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-two"}
                element={<HomeFurnitureTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-three"}
                element={<HomeFurnitureThree/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-four"}
                element={<HomeFurnitureFour/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-five"}
                element={<HomeFurnitureFive/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-six"}
                element={<HomeFurnitureSix/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture-seven"}
                element={<HomeFurnitureSeven/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-electronics"}
                element={<HomeElectronics/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-electronics-two"}
                element={<HomeElectronicsTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-electronics-three"}
                element={<HomeElectronicsThree/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-book-store"}
                element={<HomeBookStore/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-book-store-two"}
                element={<HomeBookStoreTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-plants"}
                element={<HomePlants/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-flower-shop"}
                element={<HomeFlowerShop/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-flower-shop-two"}
                element={<HomeFlowerShopTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-organic-food"}
                element={<HomeOrganicFood/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-organic-food-two"}
                element={<HomeOrganicFoodTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-onepage-scroll"}
                element={<HomeOnepageScroll/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-grid-banner"}
                element={<HomeGridBanner/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-auto-parts"}
                element={<HomeAutoParts/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-cake-shop"}
                element={<HomeCakeShop/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-handmade"}
                element={<HomeHandmade/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-pet-food"}
                element={<HomePetFood/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-medical-equipment"}
                element={<HomeMedicalEquipment/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-christmas"}
                element={<HomeChristmas/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-black-friday"}
                element={<HomeBlackFriday/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-black-friday-two"}
                element={<HomeBlackFridayTwo/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-valentines-day"}
                element={<HomeValentinesDay/>}
              />

              {/* Shop pages */}
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                element={<ShopGridStandard/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                element={<ShopGridFilter/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                element={<ShopGridTwoColumn/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}
                element={<ShopGridNoSidebar/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-full-width"}
                element={<ShopGridFullWidth/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                element={<ShopGridRightSidebar/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-standard"}
                element={<ShopListStandard/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-full-width"}
                element={<ShopListFullWidth/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-two-column"}
                element={<ShopListTwoColumn/>}
              />

              {/* Shop product pages */}
              <Route
                path={process.env.PUBLIC_URL + "/product/:id"}
                element={<Product />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                element={<ProductTabLeft/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                element={<ProductTabRight/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                element={<ProductSticky/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-slider/:id"}
                element={<ProductSlider/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                element={<ProductFixedImage/>}
              /> 

              {/* Blog pages */}
              <Route
                path={process.env.PUBLIC_URL + "/blog-standard"}
                element={<BlogStandard/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                element={<BlogNoSidebar/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                element={<BlogRightSidebar/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-details-standard"}
                element={<BlogDetailsStandard/>}
              /> 

              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                element={<Contact/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={<MyAccount/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login-register"}
                element={<LoginRegister/>}
              />

              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                element={<Wishlist/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/compare"}
                element={<Compare/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                element={<Checkout/>}
              /> 

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;
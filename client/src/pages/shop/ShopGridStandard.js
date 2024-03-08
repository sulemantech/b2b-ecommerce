import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { fetchProducts } from "../../store/slices/ProductsActions";
import { fetchProductsByCategories } from "../../API";
import { setProducts } from "../../store/slices/product-slice";

const ShopGridStandard = () => {
  const dispatch = useDispatch();
  const [categoryIds, setCategoryIds] = useState([]);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);
  const categories = useSelector((state) => state.category.Categories);
  const pageLimit = 15;
  let { pathname } = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const categoryIds = categories.map((category) => category.id);

  useEffect(() => {
    if (Array.isArray(categories)) { // Check if categories is an array
      const ids = categories.map(category => category.id);
      setCategoryIds(ids);
    }
  }, [categories]);  
  


  const handleSortParams = (type, value) => {
    if (type === "category") {
      if (Array.isArray(value)) {
        setSelectedCategories([value]);

        const allCategoriesButton = document.getElementById(
          "allCategoriesButton"
        );
        allCategoriesButton.classList.add("active");
      } else if (selectedCategories.length >= 0 && !Array.isArray(value)) {
        const [first, ...rest] = selectedCategories;
        if (Array.isArray(first)) {
          const filterButtons = document.querySelectorAll(
            ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
          );
          filterButtons.forEach((item) => {
            if (item.id == "allCategoriesButton") {
              item.classList.remove("active");
            }
          });
          const updatedCategories = [...rest];
          const categoryIndex = updatedCategories.indexOf(value);
          if (categoryIndex !== -1) {
            updatedCategories.splice(categoryIndex, 1);
          } else {
            updatedCategories.push(value);
          }
          setSelectedCategories(updatedCategories);
        } else {
          const updatedCategories = [...selectedCategories];
          const categoryIndex = updatedCategories.indexOf(value);
          if (categoryIndex !== -1) {
            updatedCategories.splice(categoryIndex, 1);
          } else {
            updatedCategories.push(value);
          }
          const isMatch = updatedCategories.every(
            (value) =>
              categoryIds.includes(value) &&
              updatedCategories.length === categoryIds.length
          );
          if (isMatch) {
            const filterButtons = document.querySelectorAll(
              ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
            );
            filterButtons.forEach((item) => {
              if (item.id == "allCategoriesButton") {
                item.classList.add("active");
              }
            });
          } else {
            const filterButtons = document.querySelectorAll(
              ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
            );
            filterButtons.forEach((item) => {
              if (item.id == "allCategoriesButton") {
                item.classList.remove("active");
              }
            });
          }
          setSelectedCategories(updatedCategories);
        }
      }
    }

    console.log(type,value);
  };


  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
    if (sortValue === "priceHighToLow") {
      setCurrentData((ArraySort) =>
        [...ArraySort].sort((a, b) => b.price - a.price)
      );
    } else if (sortValue === "priceLowToHigh") {
      setCurrentData((prevData) =>
        [...prevData].sort((a, b) => a.price - b.price)
      );
    }
  };

  const tagFilterSortParams=(tag,value)=>{
    setSortType(sortType);
    setSortValue(sortValue);
    console.log(tag,value);

  }

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchData = async () => {
        try {
          const data = await fetchProductsByCategories(
            `${selectedCategories}`,
            offset,
            sortValue
          );
          dispatch(setProducts(data));
          setCurrentData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [offset, sortValue, selectedCategories, dispatch]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filteredProducts = products.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    } else {
      setCurrentData(products);
    }
  }, [products, selectedCategories]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

 

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
}, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);


  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={handleSortParams}
                  selectedCategories={selectedCategories}
                  tagFilterSortParams={tagFilterSortParams}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />
                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;

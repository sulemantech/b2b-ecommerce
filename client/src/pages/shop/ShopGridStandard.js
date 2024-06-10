import { Fragment, useState, useEffect, useMemo } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveSort } from "../../helpers/product";
import { APIHost } from "../../API";
import axios from "axios";
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
  const [subcategory,setSubcategory]=useState(false);
  const categoryIds = categories.map((category) => category.id);

  const handleSortParams = (type, value, isSubcategory = false) => {
    if (type !== "category") {
      return;
    }

    if (Array.isArray(value)) {
      setSelectedCategories([value]);
      const allCategoriesButton = document.getElementById(
        "allCategoriesButton"
      );
      allCategoriesButton?.classList.add("active");
    } else {
      let updatedCategories;
      if (selectedCategories.includes(value)) {
        updatedCategories = selectedCategories.filter((cat) => cat !== value);
      } else {
        updatedCategories = [...selectedCategories, value];
      }

      setSelectedCategories(updatedCategories);

      const isAllCategoriesSelected =
        updatedCategories.length === categoryIds.length &&
        updatedCategories.every((cat) => categoryIds.includes(cat));

      const allCategoriesButton = document.getElementById(
        "allCategoriesButton"
      );
      if (isAllCategoriesSelected || updatedCategories.length === 0) {
        allCategoriesButton?.classList.add("active");
      } else {
        allCategoriesButton?.classList.remove("active");
      }
    }

    if (isSubcategory) {
      // Handle subcategory request
      // console.log("Subcategory clicked:", value);
      setSelectedCategories([value]);
      setSubcategory(true);
    }else {
      setSubcategory(false); // Reset isSubcategory state when selecting a single category
    }

    // console.log(value);
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchData = async () => {
        try {
          const data = await fetchProductsByCategories(
            selectedCategories,
            subcategory,// Consider it as a subcategory if only one category is selected
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
      setCurrentData(filteredProducts);
    } else {
      setCurrentData(products);
    }
  }, [products, selectedCategories]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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

  const tagFilterSortParams = (tag, value) => {
    setSortType(sortType);
    setSortValue(sortValue);
    console.log(tag, value);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    window.scrollTo({ top: 0 });
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of MetaMart from metafront.net."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pb-20 ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 order-2 order-lg-1 p-0 bg-gray">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={handleSortParams}
                  selectedCategories={selectedCategories}
                  tagFilterSortParams={tagFilterSortParams}
                  // subcategories={subcategories}
                />
              </div>
              <div
                className="col-lg-10 order-1 order-lg-2 p-3"
                style={{ zIndex: 2 }}
              >
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
      <div className="position-absolute top-0 w-full h-full bg-black-2">
        <div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopGridStandard;

import { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { fetchProducts } from '../../store/slices/ProductsActions';
// import { fetchCategory } from '../../store/slices/CategoryAction';


const ShopGridStandard = () => {
    const dispatch=useDispatch();
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    //  const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state) => state.product);
    const pageLimit = 15;
    let { pathname } = useLocation();

 useEffect(()=>{
        dispatch(fetchProducts(dispatch));
    },[]);
 
    
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSortParams = (type, value) => {
    // Implement sorting logic as needed
    if (type === "category") {
      const updatedCategories = [...selectedCategories];
      const categoryIndex = updatedCategories.indexOf(value);
      console.log(" typeeeeeeee in shop grid standord",selectedCategories); 
      if (categoryIndex !== -1) {
        // Category is already selected, remove it
        updatedCategories.splice(categoryIndex, 1);
      } else {
        // Category is not selected, add it
        updatedCategories.push(value);
      }
      

      setSelectedCategories(updatedCategories);
    }
  };


    const getLayout = (layout) => {
        setLayout(layout)
    }
    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }
    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        fetch(`http://localhost:5001/api/products/${selectedCategories.join(',')}`) 
        .then((response) => response.json())
        .then((data) => {
        //   console.log('Products from API in SGS:11111', data);    
          setCurrentData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));

        dispatch(fetchProducts());
    }, [offset, sortValue, selectedCategories]);


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
                        {label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {label: "Shop", path: process.env.PUBLIC_URL + pathname }
                    ]} 
                />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={products} getSortParams={handleSortParams}
                                             selectedCategories={selectedCategories}/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams}
                                 productCount={products.length}
                                  sortedProductCount={currentData.length}
                                   />
                                  {console.log("CURRENTDATA.....",currentData)
}                                {/* shop page content default */}
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
    )
}


export default ShopGridStandard;
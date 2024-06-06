import PropTypes from "prop-types";
import clsx from "clsx";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../../store/slices/CategoryAction";
import { propTypes } from "react-hooks-paginator";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass ,subcategories , selectedCategories ,tagFilterSortParams}) => {


  const uniqueColors = getIndividualColors(products);
  const uniqueSizes = getProductsIndividualSizes(products);
  const uniqueTags = getIndividualTags(products);
  const dispatch=useDispatch();
  const uniqueCategories=useSelector((state)=>state.category);
  // const uniqueCategories = getIndividualCategories(uniqueCategory?.categories);
  

  useEffect(()=>{
dispatch(fetchCategory(dispatch))
  },[dispatch])

  return (
    <div className={clsx("sidebar-style bg-gray", sideSpaceClass)} style={{paddingLeft:"0px",position:"flex"}}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
         categories={uniqueCategories}
         selectedCategories={selectedCategories}
        getSortParams={getSortParams}
        subcategories={subcategories}
      />

      {/* filter by color */}
      <ShopColor colors={uniqueColors} getSortParams={getSortParams} />

      {/* filter by size */}
      <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams}  tagFilterSortParams={tagFilterSortParams}/>
    
      <div>

      </div>
    </div>
  );
};


ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
  tagFilterSortParams:PropTypes.func
};

export default ShopSidebar;

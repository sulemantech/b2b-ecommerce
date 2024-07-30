import PropTypes from "prop-types";

import { setActiveLayout } from "../../helpers/product";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {



  return (
    <div className="shop-top-bar ">
      <div className="select-shoing-wrap m-auto">
        <p className="mb-1 mx-1">
          Showing {sortedProductCount} of {productCount} result
        </p>
      </div>

      <div className="shop-tab d-flex justify-content-between">
      <div className="select-shoing-wrap">
        
      <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={e => {
            getLayout("col-lg-3 col-md-4 col-sm-6 col-12 p-3 gap-2");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("col-lg-2 col-md-3 col-sm-4 col-6 p-3 gap-2");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
        className="hidden"
          onClick={e => {
            getLayout("flex p-3 gap-2 scale-50");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
        </div>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;

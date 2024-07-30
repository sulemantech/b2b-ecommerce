import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout }) => {
 



  return (
    <div className="shop-bottom-area mt-30">
      <div className={clsx("row")}>
        <ProductgridList products={products} layout={layout} spaceBottomClass="mb-25" />
        
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;

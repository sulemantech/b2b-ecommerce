import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";
import { useSelector } from "react-redux";

const ShopProducts = ({ products, layout }) => {
//   const searchResults = useSelector((state) => state.search.searchResults);

//  console.log("resulttttttttttttttt",searchResults?.data?.search[0]?.name);
//  console.log("resulttttttttttttttt",searchResults?.data?.search[0]?.description);


  return (
      <>
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
        
      </div>
    </div>
    
    </>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;

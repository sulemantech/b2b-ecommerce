import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout }) => {
  //  console.log("resulttttttttttttttt",searchResults?.data?.search[0]?.name);
  //  console.log("resulttttttttttttttt",searchResults?.data?.search[0]?.description);
  //  console.log("resulttttttttttttttt",searchResults?.data?.search[0]?.productImages[0].images);



  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
        
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;

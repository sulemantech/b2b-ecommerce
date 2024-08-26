import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGridList = ({ products, spaceBottomClass }) => {
  const hasSearched = useSelector((state) => state.searchpro.hasSearched);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const searchResults = useSelector((state) => state.searchpro.searchResults);
  const filteredProducts = products;

  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <Fragment>
      {hasSearched ? (
        Array.isArray(searchResults.data?.search) && searchResults.data.search.length > 0 && (
          <div className="col-xl-2 col-md-3 col-sm-4 col-6" key={searchResults.data.search[0].id}>
            <ProductGridListSingle
              spaceBottomClass={spaceBottomClass}
              product={searchResults.data.search[0]}
              currency={currency}
              cartItem={cartItems.find(cartItem => cartItem.id === searchResults.data.search[0].id)}
              wishlistItem={wishlistItems.find(wishlistItem => wishlistItem.id === searchResults.data.search[0].id)}
              compareItem={compareItems.find(compareItem => compareItem.id === searchResults.data.search[0].id)}
            />
          </div>
        )
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="col-xl-3 col-md-3 col-sm-4 col-12 p-3 gap-2"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
            style={{
              // border: hoveredProductId === product.id ? '1px solid #000' : 'none',
              transition: 'border 0.3s ease-in-out', borderRadius:'10px', 
              boxShadow: hoveredProductId === product.id ? '0px 0px 10px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          >
            <ProductGridListSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={cartItems.find((cartItem) => cartItem.id === product.id)}
              wishlistItem={wishlistItems.find((wishlistItem) => wishlistItem.id === product.id)}
              compareItem={compareItems.find((compareItem) => compareItem.id === product.id)}
            />
          </div>
        ))
      )}
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;

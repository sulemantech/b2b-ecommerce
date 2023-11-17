import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/slices/ProductsActions";

const HeroSliderOneSingle = ({ data }) => {
  const dispatch = useDispatch();
const product = useSelector((state) => {
  const products = state.product.products;
  if (products.length > 0) {
    const firstProduct = products[0];
    if (firstProduct.productImages && firstProduct.productImages.length > 0) {
      const firstProductImage = firstProduct.productImages[0];
      if (firstProductImage.images && firstProductImage.images.length > 0) {
        return firstProductImage.images[0];
      }
    }
  }
  return null; // or any default value you prefer
});
  useEffect(() => {
    dispatch(fetchProducts(dispatch));
    
  }, [dispatch]);

  return (
    <div className="single-slider slider-height-1 bg-purple">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 className="animated">{}</h3>
              <h1 className="animated">{data.subtitle}</h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid"
                src={product}
                // src="/assets/products/sku_2/images-1700052313416-994921738.jpg"

                alt=""
              />
              {/* {console.log("productttttttt",)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;

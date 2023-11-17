import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/slices/ProductsActions";

const HeroSliderOneSingle = ({ data }) => {
   const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  // console.log("prooo", product)
  // Move this line outside of curly braces

  useEffect(() => {
    dispatch(fetchProducts(dispatch));
    
  }, []);

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
                src={`http://localhost:5000/${product?.products[4]?.image}`}
                
                alt=""
              />
              {/* product?.products[0]?.image */}
               {console.log("Image Path:", `http://localhost:5000/${product?.products[4]?.image}`)}
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

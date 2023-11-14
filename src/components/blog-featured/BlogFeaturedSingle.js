import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/ProductsActions";

const BlogFeaturedSingle = ({ singlePost }) => {
  const dispatch=useDispatch();
  const products=useSelector(state=>state.product.products);
  debugger
  {console.log("product Path:", products)}
  useEffect(()=>{
dispatch(fetchProducts(dispatch));
  },[])
  return (
    <div className="blog-wrap mb-30 scroll-zoom">
      <div className="blog-img">
        <Link to={process.env.PUBLIC_URL + singlePost.url}>
          {/* <img src={process.env.PUBLIC_URL + singlePost.image} alt="" /> */}
          {products.slice(0, 1).map((produc, index) => (
            <img
              key={index}
              src={`http://localhost:5000/` + singlePost.image}
              alt={`Product ${index + 1}`}
            />
          
          ))}

        </Link>
        <div className="blog-category-names">
          {singlePost.category.map((singleCategory, key) => {
            return (
              <span className="purple" key={key}>
                {singleCategory}
              </span>
            );
          })}
        </div>
      </div>
      <div className="blog-content-wrap">
        <div className="blog-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + singlePost.url}>
              {products[3].name}
            </Link>
          </h3>
          <span>
            By{" "}
            <Link to={process.env.PUBLIC_URL + singlePost.authorUrl}>
              {singlePost.author}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.shape({})
};

export default BlogFeaturedSingle;

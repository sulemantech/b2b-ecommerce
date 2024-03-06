import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { STORE_NAME } from "../../config";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL +"/"}>
      <h1 style={{color: "#555252", opacity:"0.9"}}>{STORE_NAME}</h1>
      </Link>
      {/* <Link to={process.env.PUBLIC_URL + "/"}>
        <img alt="" src={process.env.PUBLIC_URL + imageUrl} />
      </Link> */}
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;

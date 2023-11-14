import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-thirty-two.json";
import BannerThirtyTwoSingle from "../../components/banner/BannerThirtyTwoSingle.js";

const BannerThirtyTwo = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerThirtyTwoSingle
                data={single}
                spaceBottomClass="mb-30"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerThirtyTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyTwo;

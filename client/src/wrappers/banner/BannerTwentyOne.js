import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-one.json";
import BannerTwentyOneSingle from "../../components/banner/BannerTwentyOneSingle.js";

const BannerTwentyOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerTwentyOneSingle
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

BannerTwentyOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwentyOne;

import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-thirty-eight.json";
import BannerThirtyEightSingle from "../../components/banner/BannerThirtyEightSingle.js";

const BannerThirtyEight = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-sm-6 col-12 mb-30" key={key}>
              <BannerThirtyEightSingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerThirtyEight.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyEight;

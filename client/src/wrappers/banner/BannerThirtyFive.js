import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-thirty-five.json";
import BannerThirtyFiveSingle from "../../components/banner/BannerThirtyFiveSingle";

const BannerThirtyFive = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass
}) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass, bgColorClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerThirtyFiveSingle
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

BannerThirtyFive.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyFive;

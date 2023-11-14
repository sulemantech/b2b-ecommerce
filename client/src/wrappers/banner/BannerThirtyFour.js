import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-thirty-four.json";
import BannerThirtyFourSingle from "../../components/banner/BannerThirtyFourSingle";

const BannerThirtyFour = ({
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
              <BannerThirtyFourSingle
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

BannerThirtyFour.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyFour;

import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-thirty-three.json";
import BannerThirtyThreeSingle from "../../components/banner/BannerThirtyThreeSingle.js";

const BannerThirtyThree = ({ spaceBottomClass, bgColorClass }) => {
  return (
    <div className={clsx("banner-area", bgColorClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerThirtyThreeSingle
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

BannerThirtyThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  bgColorClass: PropTypes.string
};

export default BannerThirtyThree;

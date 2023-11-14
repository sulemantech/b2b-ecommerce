import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-nine.json";
import BannerNineSingle from "../../components/banner/BannerNineSingle.js";

const BannerNine = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerNineSingle
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

BannerNine.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerNine;

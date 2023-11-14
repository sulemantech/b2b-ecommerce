import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-three.json";
import BannerThreeSingle from "../../components/banner/BannerThreeSingle.js";

const BannerThree = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) =>  (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerThreeSingle
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

BannerThree.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerThree;

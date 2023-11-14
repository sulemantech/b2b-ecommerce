import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-three.json";
import BannerTwentyThreeSingle from "../../components/banner/BannerTwentyThreeSingle.js";

const BannerTwentyThree = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-sm-6 col-12" key={key}>
              <BannerTwentyThreeSingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTwentyThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwentyThree;

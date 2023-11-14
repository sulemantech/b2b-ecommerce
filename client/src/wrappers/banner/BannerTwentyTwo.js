import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-two.json";
import BannerTwentyTwoSingle from "../../components/banner/BannerTwentyTwoSingle.js";

const BannerTwentyTwo = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-sm-6 col-12" key={key}>
              <BannerTwentyTwoSingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTwentyTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwentyTwo;

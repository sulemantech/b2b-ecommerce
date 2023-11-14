import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty.json";
import BannerTwentySingle from "../../components/banner/BannerTwentySingle.js";

const BannerTwenty = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="row no-gutters">
        {bannerData.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerTwentySingle data={single} />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerTwenty.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerTwenty;

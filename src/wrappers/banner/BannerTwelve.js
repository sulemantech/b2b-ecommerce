import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-twelve.json";
import BannerTwelveSingle from "../../components/banner/BannerTwelveSingle.js";

const BannerTwelve = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="row no-gutters">
        {bannerData?.map((single, key) => (
          <div className="col-lg-4 col-md-12" key={key}>
            <BannerTwelveSingle
              data={single}
              spaceBottomClass="mb-30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerTwelve.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerTwelve;

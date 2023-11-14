import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-eleven.json";
import BannerElevenSingle from "../../components/banner/BannerElevenSingle.js";

const BannerEleven = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="row no-gutters">
        {bannerData?.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerElevenSingle data={single} />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerEleven.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerEleven;

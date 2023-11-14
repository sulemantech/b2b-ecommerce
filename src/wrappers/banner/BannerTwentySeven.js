import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-seven.json";
import BannerTwentySevenSingle from "../../components/banner/BannerTwentySevenSingle.js";

const BannerTwentySeven = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("banner-area hm9-section-padding", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerTwentySevenSingle
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

BannerTwentySeven.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwentySeven;

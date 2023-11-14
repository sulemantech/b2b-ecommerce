import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-ten.json";
import BannerTenSingle from "../../components/banner/BannerTenSingle.js";

const BannerTen = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area banner-area-2", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row gx-md-4 gx-lg-2">
          {bannerData?.map((single, key) => (
            <div className="col-xl-3 col-md-6" key={key}>
              <BannerTenSingle
                spaceBottomClass="mb-10"
                data={single}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTen;
